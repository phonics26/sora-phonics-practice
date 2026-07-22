import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "jsr:@supabase/server@^1";
import { createClient } from "npm:@supabase/supabase-js@2";

const LINE_TOKEN_URL = "https://api.line.me/oauth2/v2.1/token";
const LINE_VERIFY_ID_TOKEN_URL =
  "https://api.line.me/oauth2/v2.1/verify";
const LINE_FRIENDSHIP_URL =
  "https://api.line.me/friendship/v1/status";
const LINE_PUSH_URL = "https://api.line.me/v2/bot/message/push";
const supabaseAdmin = createAdminClient();

export default {
  fetch: withSupabase({ auth: "none" }, async (req) => {
    try {
      if (req.method === "GET") {
        return await handleLineLoginCallback(req, supabaseAdmin);
      }

      if (req.method === "POST") {
        return await handleLineWebhook(req);
      }

      return Response.json(
        { message: "Method not allowed" },
        { status: 405 },
      );
    } catch (error) {
      console.error("LINE integration error", error);

      return Response.json(
        { message: "LINE integration failed" },
        { status: 500 },
      );
    }
  }),
};

function createAdminClient() {
  const secretKeys = JSON.parse(
    requiredSecret("SUPABASE_SECRET_KEYS"),
  );
  const secretKey = secretKeys.default;

  if (!secretKey) {
    throw new Error("The default Supabase secret key is missing.");
  }

  return createClient(
    requiredSecret("SUPABASE_URL"),
    secretKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

async function handleLineWebhook(req: Request) {
  const signature = req.headers.get("x-line-signature") || "";
  const body = await req.text();
  const channelSecret = requiredSecret(
    "LINE_MESSAGING_CHANNEL_SECRET",
  );

  const signatureIsValid = await verifyLineSignature(
    body,
    signature,
    channelSecret,
  );

  if (!signatureIsValid) {
    return Response.json(
      { message: "Invalid LINE signature" },
      { status: 401 },
    );
  }

  // LINE follow and message events are accepted here. Personalized coupon
  // delivery occurs after the LINE Login callback has linked the game result.
  return Response.json({ ok: true });
}

async function handleLineLoginCallback(req: Request, supabaseAdmin: any) {
  const requestUrl = new URL(req.url);
  const authorizationError = requestUrl.searchParams.get("error");

  if (authorizationError) {
    return redirectToApp("cancelled");
  }

  const code = requestUrl.searchParams.get("code") || "";
  const state = requestUrl.searchParams.get("state") || "";

  if (!code || !isUuid(state)) {
    return redirectToApp("invalid_request");
  }

  const lineLoginChannelId = requiredSecret(
    "LINE_LOGIN_CHANNEL_ID",
  );
  const lineLoginChannelSecret = requiredSecret(
    "LINE_LOGIN_CHANNEL_SECRET",
  );
  const callbackUrl = getCallbackUrl();

  const tokenResponse = await fetch(LINE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: callbackUrl,
      client_id: lineLoginChannelId,
      client_secret: lineLoginChannelSecret,
    }),
  });

  if (!tokenResponse.ok) {
    console.error("LINE token exchange failed", await tokenResponse.text());
    return redirectToApp("token_exchange_failed");
  }

  const tokenData = await tokenResponse.json();
  const accessToken = String(tokenData.access_token || "");
  const idToken = String(tokenData.id_token || "");

  const lineUserId = await verifyAndGetLineUserId(
    idToken,
    lineLoginChannelId,
  );

  if (!lineUserId) {
    return redirectToApp("identity_failed");
  }

  const friendshipResponse = await fetch(LINE_FRIENDSHIP_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const friendship = friendshipResponse.ok
    ? await friendshipResponse.json()
    : { friendFlag: false };

  if (!friendship.friendFlag) {
    await updateDeliveryStatus(
      supabaseAdmin,
      state,
      lineUserId,
      "friend_required",
      "The SORA Official Account was not added as a friend.",
    );

    return redirectToApp("friend_required");
  }

  const { data: result, error: resultError } = await supabaseAdmin
    .from("sora_adventure_results")
    .select(
      "submission_token, line_user_id, activity1_score, activity2_score, activity3_score, total_score, reward_name, coupon_code, coupon_expiry_date",
    )
    .eq("submission_token", state)
    .single();

  if (resultError || !result) {
    console.error("Game result lookup failed", resultError);
    return redirectToApp("result_not_found");
  }

  if (result.line_user_id && result.line_user_id !== lineUserId) {
    return redirectToApp("already_claimed");
  }

  const { error: linkError } = await supabaseAdmin
    .from("sora_adventure_results")
    .update({
      line_user_id: lineUserId,
      line_connected_at: new Date().toISOString(),
      line_delivery_status: "sending",
      line_delivery_error: null,
    })
    .eq("submission_token", state);

  if (linkError) {
    console.error("LINE user link failed", linkError);
    return redirectToApp("link_failed");
  }

  const message = buildCouponMessage(result);
  const sendResponse = await fetch(LINE_PUSH_URL, {
    method: "POST",
    headers: {
      Authorization:
        `Bearer ${requiredSecret("LINE_MESSAGING_ACCESS_TOKEN")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: lineUserId,
      messages: [{ type: "text", text: message }],
    }),
  });

  if (!sendResponse.ok) {
    const sendError = await sendResponse.text();
    console.error("LINE coupon delivery failed", sendError);

    await updateDeliveryStatus(
      supabaseAdmin,
      state,
      lineUserId,
      "failed",
      sendError.slice(0, 1000),
    );

    return redirectToApp("send_failed");
  }

  await supabaseAdmin
    .from("sora_adventure_results")
    .update({
      line_delivery_status: "sent",
      line_coupon_sent_at: new Date().toISOString(),
      line_delivery_error: null,
      coupon_sent: true,
    })
    .eq("submission_token", state);

  return redirectToApp("success");
}

async function verifyAndGetLineUserId(
  idToken: string,
  channelId: string,
) {
  if (!idToken) return "";

  const response = await fetch(LINE_VERIFY_ID_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      id_token: idToken,
      client_id: channelId,
    }),
  });

  if (!response.ok) {
    console.error("LINE ID token verification failed", await response.text());
    return "";
  }

  const verifiedToken = await response.json();
  return String(verifiedToken.sub || "");
}

async function updateDeliveryStatus(
  supabaseAdmin: any,
  submissionToken: string,
  lineUserId: string,
  status: string,
  errorMessage: string,
) {
  await supabaseAdmin
    .from("sora_adventure_results")
    .update({
      line_user_id: lineUserId,
      line_connected_at: new Date().toISOString(),
      line_delivery_status: status,
      line_delivery_error: errorMessage,
    })
    .eq("submission_token", submissionToken);
}

function buildCouponMessage(result: Record<string, unknown>) {
  const expirationDate = formatJapaneseDate(
    String(result.coupon_expiry_date || "2026-10-31"),
  );

  return [
    "🎉 SORA Adventureクリアおめでとうございます！",
    "",
    "ゲーム結果：",
    `Letter Goal Quest：${Number(result.activity1_score || 0)}/10`,
    `Animal Sound Safari：${Number(result.activity2_score || 0)}/10`,
    `Word Magic Builder：${Number(result.activity3_score || 0)}/10`,
    "",
    `合計スコア：${Number(result.total_score || 0)}/30`,
    "",
    "獲得したごほうび：",
    String(result.reward_name || "SORA Adventure特典"),
    "",
    "クーポン番号：",
    String(result.coupon_code || ""),
    "",
    "有効期限：",
    expirationDate,
    "",
    "無料クラスの開始可能日について、連絡を希望します。",
    "",
    "楽しく英語を学べることを楽しみにしています！",
    "よろしくお願いします😊",
  ].join("\n");
}

function formatJapaneseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return value;
  return `${year}年${month}月${day}日`;
}

function getCallbackUrl() {
  return `${requiredSecret("SUPABASE_URL")}/functions/v1/line-webhook`;
}

function redirectToApp(status: string) {
  const appUrl = new URL(requiredSecret("APP_URL"));
  appUrl.searchParams.set("line", status);

  return Response.redirect(appUrl.toString(), 302);
}

function requiredSecret(name: string) {
  const value = Deno.env.get(name);

  if (!value) {
    throw new Error(`Missing required secret: ${name}`);
  }

  return value;
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    .test(value);
}

async function verifyLineSignature(
  body: string,
  signature: string,
  channelSecret: string,
) {
  if (!signature) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(channelSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const digest = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(body),
  );

  const expectedSignature = btoa(
    String.fromCharCode(...new Uint8Array(digest)),
  );

  if (expectedSignature.length !== signature.length) return false;

  let difference = 0;
  for (let index = 0; index < signature.length; index += 1) {
    difference |=
      expectedSignature.charCodeAt(index) ^ signature.charCodeAt(index);
  }

  return difference === 0;
}
