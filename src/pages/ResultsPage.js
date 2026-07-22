import '../styles/resultsPage.css'
import { navigate } from '../router.js'
import { supabase } from '../services/supabase.js'

const mascotPath =
  `${import.meta.env.BASE_URL}mascot/cloud_smile_clean.png`

const COUPON_EXPIRY_DATE = '2026-10-31'
const COUPON_EXPIRY_LABEL = 'October 31, 2026'
const SORA_ADVENTURE_URL =
  'https://phonics26.github.io/sora-phonics-practice/'
const SORA_WEBSITE_URL = 'https://sora.business/'
const LINE_LOGIN_CHANNEL_ID = '2010793604'
const LINE_CALLBACK_URL =
  'https://iuazjlwhzcbbrihfypqn.supabase.co/functions/v1/line-webhook'

export function renderResultsPage() {
  const activity1Score = Number(
    sessionStorage.getItem('activity1Score') || 0
  )

  const activity2Score = Number(
    sessionStorage.getItem('activity2Score') || 0
  )

  const activity3Score = Number(
    sessionStorage.getItem('activity3Score') || 0
  )

  const totalScore =
    activity1Score +
    activity2Score +
    activity3Score

  const playerMode =
    sessionStorage.getItem('soraPlayerMode') || 'guest'

  const savedEmail =
    sessionStorage.getItem('soraParentEmail') || ''

  const marketingConsent =
    sessionStorage.getItem('soraMarketingConsent') === 'true'

  const completedQuestCount = getCompletedQuestCount()
  const reward = getReward(completedQuestCount)

  document.querySelector('#app').innerHTML = `
    <main class="results-page">
      <section class="results-window">
        <img
          class="results-mascot"
          src="${mascotPath}"
          alt="Happy SORA cloud mascot"
        />

        <p class="results-brand">
          SORA ADVENTURE COMPLETE
        </p>

        <h1>Congratulations!</h1>

        <p class="results-introduction">
          🎉 You completed ${completedQuestCount} of 3 English quests!
        </p>

        <p
          class="results-quest-badge"
          style="margin:0.35rem 0 0;font-weight:700;color:#3b82f6;"
        >
          🏅 <strong>${completedQuestCount}/3 quests completed</strong>
        </p>

        <div class="results-star-medal" aria-hidden="true">
          <span class="results-medal-ribbon results-medal-ribbon-left"></span>
          <span class="results-medal-ribbon results-medal-ribbon-right"></span>
          <div class="results-medal-face">
            <span>★</span>
          </div>
        </div>

        <section class="results-score-card">
          <span>Your total score</span>

          <div>
            <strong>${totalScore}</strong>
            <small>/ 30 stars</small>
          </div>

          <p>
            Achievement Level ${reward.level}:
            <strong>${reward.title}</strong>
          </p>
        </section>

        <section class="results-breakdown">
          <article>
            <span>⚽</span>
            <p>Letter Goal</p>
            <strong>${activity1Score}/10</strong>
          </article>

          <article>
            <span>🐶</span>
            <p>Animal Match</p>
            <strong>${activity2Score}/10</strong>
          </article>

          <article>
            <span>📚</span>
            <p>Word Builder</p>
            <strong>${activity3Score}/10</strong>
          </article>
        </section>

        <section
          id="mystery-reward"
          class="mystery-reward"
        >
          <p class="mystery-label">
            YOUR SURPRISE REWARD
          </p>

          <button
            id="open-reward-button"
            class="reward-present-button"
            type="button"
            aria-label="Open your surprise reward"
          >
            <span class="reward-present">🎁</span>
            <strong>Tap to Open</strong>
          </button>

          <p class="mystery-hint">
            You earned this reward by completing ${completedQuestCount} quest${completedQuestCount === 1 ? '' : 's'} in the adventure!
          </p>
        </section>

        <section
          id="reward-reveal"
          class="reward-reveal reward-hidden"
        >
          <div class="reward-celebration">
            🎉 ⭐ 🎉
          </div>

          <p>
            LEVEL ${reward.level} REWARD
          </p>

          <h2>${reward.title}</h2>

          <strong class="reward-prize">
            ${reward.rewardName}
          </strong>

          <span>
            ${reward.message}
          </span>

          <div class="reward-code-card">
            <small>Your reward reference</small>
            <strong id="reward-code">
              ${reward.couponCode}
            </strong>
            <span class="reward-expiry-date">
              📅 Valid until ${COUPON_EXPIRY_LABEL}
            </span>
          </div>
        </section>

        <div
          id="reward-claim-area"
          class="reward-claim-area reward-hidden"
        >
          ${
            playerMode === 'guest'
              ? renderGuestEmailForm()
              : renderSavedEmailConfirmation(savedEmail)
          }

          ${renderLineClaimOption()}
        </div>

        <p
          id="results-message"
          class="results-message"
          aria-live="polite"
        ></p>

        <button
          id="results-home-button"
          class="results-home-button"
          type="button"
        >
          <span class="results-button-icon" aria-hidden="true">🏠</span>
          <span>Return to Home</span>
        </button>

        <button
          id="share-with-friends-button"
          class="share-game-button"
          type="button"
        >
          <span class="results-button-icon" aria-hidden="true">👫</span>
          <span>Share with Friends</span>
        </button>

        <button
          id="results-restart-button"
          class="results-restart-button"
          type="button"
        >
          <span class="results-button-icon" aria-hidden="true">🚀</span>
          <span>Start a New Adventure</span>
        </button>

        <p
          id="shareMessage"
          class="share-message"
        ></p>
      </section>
    </main>
  `

  const openRewardButton =
    document.querySelector('#open-reward-button')

  if (openRewardButton) {
    openRewardButton.addEventListener('click', async () => {
      revealReward()

      if (playerMode === 'email' && savedEmail) {
        await saveCompletedResult({
          email: savedEmail,
          playerMode: 'email',
          marketingConsent,
          activity1Score,
          activity2Score,
          activity3Score,
          totalScore,
          completedQuests: completedQuestCount,
          reward,
        })
      }
    })
  }

  if (playerMode === 'guest') {
    const guestForm =
      document.querySelector('#reward-email-form')

    guestForm?.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault()

        await saveGuestReward({
          activity1Score,
          activity2Score,
          activity3Score,
          totalScore,
          completedQuests: completedQuestCount,
          reward,
        })
      }
    )
  }

  if (playerMode === 'email' && savedEmail) {
    document
      .querySelector('#saved-coupon-email-button')
      ?.addEventListener('click', () => {
        openCouponEmail({
          email: savedEmail,
          couponCode: reward.couponCode,
          rewardName: reward.rewardName,
          totalScore,
          completedQuests: completedQuestCount,
        })
      })
  }

  document
    .querySelector('#line-coupon-button')
    ?.addEventListener('click', async () => {
      await startAutomaticLineCoupon({
        email: savedEmail,
        playerMode,
        marketingConsent,
        activity1Score,
        activity2Score,
        activity3Score,
        totalScore,
        completedQuests: completedQuestCount,
        reward,
      })
    })

  document
    .querySelector('#results-home-button')
    ?.addEventListener('click', () => {
      navigate('home')
    })

  document
    .querySelector('#results-restart-button')
    ?.addEventListener('click', () => {
      clearAdventureSession()
      navigate('home')
    })

  attachShareButtonHandler(
    reward,
    totalScore,
    completedQuestCount
  )
}

function revealReward() {
  const mysteryReward =
    document.querySelector('#mystery-reward')

  const rewardReveal =
    document.querySelector('#reward-reveal')

  const rewardClaimArea =
    document.querySelector('#reward-claim-area')

  mysteryReward?.classList.add('reward-opening')

  window.setTimeout(() => {
    mysteryReward?.classList.add('reward-hidden')
    rewardReveal?.classList.remove('reward-hidden')
    rewardClaimArea?.classList.remove('reward-hidden')
  }, 550)
}

function renderGuestEmailForm() {
  return `
    <form
      id="reward-email-form"
      class="reward-email-form"
    >
      <div class="reward-email-heading">
        <span>📧</span>

        <div>
          <p>CLAIM YOUR REWARD</p>
          <h2>おうちの人にお願いしてね</h2>
        </div>
      </div>

      <p class="reward-email-description">
        無料ASEPクラスのクーポンを受け取るために、おうちの人のメールアドレスを入力してください。
      </p>

      <label for="reward-parent-email">
        Parent or guardian email
      </label>

      <input
        id="reward-parent-email"
        type="email"
        placeholder="parent@example.com"
        autocomplete="email"
        required
      />

      <label class="reward-checkbox">
        <input
          id="reward-marketing-consent"
          type="checkbox"
        />

        <span>
          SORAからのお知らせや特別なご案内を受け取る
          <small>（任意）</small>
        </span>
      </label>

      <button
        id="claim-reward-button"
        type="submit"
      >
        ✉️ メールでクーポンを受け取る
      </button>
    </form>
  `
}

function renderLineClaimOption() {
  return `
    <section class="line-claim-option">
      <div class="line-claim-divider">
        <span>または</span>
      </div>

      <p>
        LINEからクーポンを受け取ることもできます。
      </p>

      <button
        id="line-coupon-button"
        class="line-coupon-button"
        type="button"
      >
        LINEでクーポンを受け取る
      </button>

      <small>
        SORA公式LINEを友だち追加すると、結果とクーポンが自動で届きます。
      </small>
    </section>
  `
}

async function startAutomaticLineCoupon({
  email,
  playerMode,
  marketingConsent,
  activity1Score,
  activity2Score,
  activity3Score,
  totalScore,
  completedQuests,
  reward,
}) {
  const button =
    document.querySelector('#line-coupon-button')
  const message =
    document.querySelector('#results-message')
  const achievementLevel = Math.min(completedQuests, 3)
  const submissionToken = getSubmissionToken()

  if (button) {
    button.disabled = true
    button.textContent = 'LINEに接続しています…'
  }

  if (message) {
    message.textContent = '結果を保存しています…'
    message.className = 'results-message'
  }

  const { error } = await supabase
    .from('sora_adventure_results')
    .upsert({
      email: email || null,
      player_mode: playerMode,
      marketing_consent: marketingConsent,
      activity1_score: activity1Score,
      activity2_score: activity2Score,
      activity3_score: activity3Score,
      total_score: totalScore,
      completed_quests: completedQuests,
      achievement_level: achievementLevel,
      coupon_percentage: 0,
      coupon_code:
        reward?.couponCode || createRewardCode(achievementLevel),
      coupon_earned: true,
      coupon_sent: false,
      coupon_expiry_date: COUPON_EXPIRY_DATE,
      reward_name: getRewardNameFromCount(completedQuests),
      submission_token: submissionToken,
      line_delivery_status: 'pending_login',
      line_delivery_error: null,
    }, {
      onConflict: 'submission_token',
    })

  if (error) {
    console.error('LINE reward save error:', error)

    if (button) {
      button.disabled = false
      button.textContent = 'LINEでクーポンを受け取る'
    }

    showResultsError(
      message,
      '結果を保存できませんでした。もう一度お試しください。'
    )
    return
  }

  const authorizationUrl = new URL(
    'https://access.line.me/oauth2/v2.1/authorize'
  )

  authorizationUrl.search = new URLSearchParams({
    response_type: 'code',
    client_id: LINE_LOGIN_CHANNEL_ID,
    redirect_uri: LINE_CALLBACK_URL,
    state: submissionToken,
    scope: 'openid profile',
    bot_prompt: 'aggressive',
  }).toString()

  window.location.href = authorizationUrl.toString()
}

function renderSavedEmailConfirmation(email) {
  return `
    <section class="results-email-confirmation">
      <span>📧</span>

      <div>
        <p>
          Your result and reward have been connected to:
        </p>

        <strong>${escapeHtml(email)}</strong>

        <small>
          Your coupon email will be addressed to this account.
        </small>

        <button
          id="saved-coupon-email-button"
          class="saved-coupon-email-button"
          type="button"
        >
          ✉️ Email My Coupon
        </button>
      </div>
    </section>
  `
}

async function saveGuestReward({
  activity1Score,
  activity2Score,
  activity3Score,
  totalScore,
  completedQuests,
  reward,
}) {


  const message =
    document.querySelector('#results-message')

  const submitButton =
    document.querySelector('#claim-reward-button')

  const emailInput =
    document.querySelector('#reward-parent-email')

  const email = emailInput?.value?.trim() || ''

  const marketingConsent =
    document.querySelector('#reward-marketing-consent')
      ?.checked || false

  if (!email) {
    showResultsError(
      message,
      'Please enter a parent or guardian email.'
    )
    return
  }

  if (submitButton) {
    submitButton.disabled = true
    submitButton.textContent = 'Saving...'
  }

  message.textContent =
    'Saving your result and reward...'

  message.className = 'results-message'

  const achievementLevel =
    completedQuests >= 3
      ? 3
      : completedQuests === 2
        ? 2
        : completedQuests === 1
          ? 1
          : 0

  const rewardName =
    getRewardNameFromCount(completedQuests)

const { error } = await supabase
  .from('sora_adventure_results')
  .upsert({
    email,
    player_mode: 'guest',
    marketing_consent: marketingConsent,
    activity1_score: activity1Score,
    activity2_score: activity2Score,
    activity3_score: activity3Score,
    total_score: totalScore,
    completed_quests: completedQuests,
    achievement_level: achievementLevel,
    coupon_percentage: 0,
    coupon_code:
      reward?.couponCode || createRewardCode(achievementLevel),
    coupon_earned: true,
    coupon_sent: false,
    coupon_expiry_date: COUPON_EXPIRY_DATE,
    reward_name: rewardName,
    submission_token: getSubmissionToken(),
  }, {
    onConflict: 'submission_token',
  })

  if (error) {
    console.error('Guest reward save error:', error)

    if (submitButton) {
      submitButton.disabled = false
      submitButton.textContent =
        '✉️ Email My Coupon'
    }

    showResultsError(
      message,
      error?.message ||
        'We could not save the reward. Please try again.'
    )
    return
  }

  sessionStorage.setItem('soraParentEmail', email)
  sessionStorage.setItem('soraPlayerMode', 'email')
  sessionStorage.setItem(
    'soraFinalResultSaved',
    'true'
  )
  sessionStorage.setItem(
    'soraCompletedQuests',
    String(completedQuests)
  )

  message.textContent =
    'Your coupon email is ready. Press Send in your email app! ✉️'

  message.className =
    'results-message results-message-success'

  const rewardForm =
    document.querySelector('#reward-email-form')

  if (rewardForm) {
    rewardForm.innerHTML = `
      <div class="reward-claimed-message">
        <span>✅</span>

        <div>
          <strong>Reward claimed!</strong>
          <p>
            Your email app is opening. Press Send to email
            the coupon to ${escapeHtml(email)}.
          </p>
        </div>
      </div>
    `
  }

  openCouponEmail({
    email,
    couponCode:
      reward?.couponCode || createRewardCode(achievementLevel),
    rewardName,
    totalScore,
    completedQuests,
  })
}

function openCouponEmail({
  email,
  couponCode,
  rewardName,
  totalScore,
  completedQuests,
}) {
  const subject = encodeURIComponent(
    '🎁 Your SORA Adventure Coupon'
  )

  const body = encodeURIComponent(
    `Congratulations! 🎉\n\nYou completed ${completedQuests} SORA Adventure quest${completedQuests === 1 ? '' : 's'} and scored ${totalScore}/30.\n\nYour reward:\n${rewardName}\n\nYour coupon code:\n${couponCode}\n\n📅 Valid until ${COUPON_EXPIRY_LABEL}\n\nPlease show this coupon to SORA when claiming your free ASEP class.\n\nLearn more about SORA:\n${SORA_WEBSITE_URL}`
  )

  window.location.href =
    `mailto:${encodeURIComponent(email)}?subject=${subject}&body=${body}`
}

async function saveCompletedResult({
  email,
  playerMode,
  marketingConsent,
  activity1Score,
  activity2Score,
  activity3Score,
  totalScore,
  completedQuests,
  reward,
}) {


  const message =
    document.querySelector('#results-message')

  message.textContent =
    'Saving your completed result...'

  message.className = 'results-message'

  const achievementLevel =
    completedQuests >= 3
      ? 3
      : completedQuests === 2
        ? 2
        : completedQuests === 1
          ? 1
          : 0

  const rewardName =
    getRewardNameFromCount(completedQuests)

const { error } = await supabase
  .from('sora_adventure_results')
  .upsert({
    email,
    player_mode: playerMode,
    marketing_consent: marketingConsent,
    activity1_score: activity1Score,
    activity2_score: activity2Score,
    activity3_score: activity3Score,
    total_score: totalScore,
    completed_quests: completedQuests,
    achievement_level: achievementLevel,
    coupon_percentage: 0,
    coupon_code:
      reward?.couponCode || createRewardCode(achievementLevel),
    coupon_earned: true,
    coupon_sent: false,
    coupon_expiry_date: COUPON_EXPIRY_DATE,
    reward_name: rewardName,
    submission_token: getSubmissionToken(),
  }, {
    onConflict: 'submission_token',
  })

  if (error) {
    console.error('Completed result save error:', error)

    showResultsError(
      message,
      error?.message ||
        'Your score is displayed, but it could not be saved.'
    )
    return
  }

  sessionStorage.setItem(
    'soraFinalResultSaved',
    'true'
  )
  sessionStorage.setItem(
    'soraCompletedQuests',
    String(completedQuests)
  )

  message.textContent =
    'Your result and reward were saved successfully! 🎉'

  message.className =
    'results-message results-message-success'
}

function getCompletedQuestCount() {
  const completedCount = [
    sessionStorage.getItem('activity1Complete') === 'true' ||
      Number(sessionStorage.getItem('activity1Score') || 0) > 0,

    sessionStorage.getItem('activity2Complete') === 'true' ||
      Number(sessionStorage.getItem('activity2Score') || 0) > 0,

    sessionStorage.getItem('activity3Complete') === 'true' ||
      Number(sessionStorage.getItem('activity3Score') || 0) > 0,
  ].filter(Boolean).length

  sessionStorage.setItem(
    'soraCompletedQuests',
    String(completedCount)
  )

  return completedCount
}

function getRewardNameFromCount(completedQuestCount) {
  if (completedQuestCount >= 3) {
    return '🎉 ASEP英語クラス1か月無料！'
  }

  if (completedQuestCount === 2) {
    return '🎉 ASEP英語クラス2週間無料！'
  }

  if (completedQuestCount === 1) {
    return '🎉 ASEP英語クラス1週間無料！'
  }

  return 'No reward yet'
}

function getReward(completedQuestCount) {
  const rewardName = getRewardNameFromCount(completedQuestCount)

  if (completedQuestCount >= 3) {
    return {
      level: 3,
      title: 'SORA Star',
      rewardName,
      message:
        'Amazing work! You reached the highest SORA Adventure level — celebration time! 🎉',
      couponCode: createRewardCode(3),
    }
  }

  if (completedQuestCount === 2) {
    return {
      level: 2,
      title: 'Champion',
      rewardName,
      message:
        'Fantastic job! You completed a major milestone and earned a brilliant reward! 🎉',
      couponCode: createRewardCode(2),
    }
  }

  if (completedQuestCount === 1) {
    return {
      level: 1,
      title: 'Explorer',
      rewardName,
      message:
        'Wonderful effort! You unlocked your first amazing reward! 🎉',
      couponCode: createRewardCode(1),
    }
  }

  return {
    level: 0,
    title: 'Not Started',
    rewardName: 'No reward yet',
    message:
      'Complete at least one quest to unlock your reward.',
    couponCode: '',
  }
}

function getSubmissionToken() {
  let token = sessionStorage.getItem('soraSubmissionToken')

  if (!token) {
    token = crypto.randomUUID()
    sessionStorage.setItem('soraSubmissionToken', token)
  }

  return token
}

function createRewardCode(level) {
  const savedCode =
    sessionStorage.getItem('soraRewardCode')

  if (savedCode) {
    return savedCode
  }

  const randomPart = Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()

  const code = `SORA-L${level}-${randomPart}`

  sessionStorage.setItem('soraRewardCode', code)

  return code
}
function showResultsError(element, text) {
  if (!element) return

  element.textContent = text
  element.className =
    'results-message results-message-error'
}

function clearAdventureSession() {
const keys = [
  'soraPlayerMode',
  'soraParentEmail',
  'soraResultConsent',
  'soraMarketingConsent',
  'soraFinalResultSaved',
  'soraRewardCode',
  'soraSubmissionToken',
  'soraCompletedQuests',
  'activity1Score',
  'activity2Score',
  'activity3Score',
  'activity1Complete',
  'activity2Complete',
  'activity3Complete',
]

  keys.forEach((key) => {
    sessionStorage.removeItem(key)
  })
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function attachShareButtonHandler(reward, totalScore, completedQuestCount) {
  const button = document.getElementById('share-with-friends-button')
  if (!button) return

  if (button.dataset.shareBound === 'true') return
  button.dataset.shareBound = 'true'

  button.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()

    showShareWithFriendsModal({
      rewardName: reward.rewardName,
      score: totalScore,
      completedQuests: completedQuestCount,
    })
  })
}

function showShareWithFriendsModal({
  rewardName,
  score,
  completedQuests,
}) {
  const existingModal =
    document.getElementById('share-friends-modal')
  if (existingModal) existingModal.remove()

  const backdrop = document.createElement('div')
  backdrop.id = 'share-friends-modal'
  backdrop.style.position = 'fixed'
  backdrop.style.top = '0'
  backdrop.style.left = '0'
  backdrop.style.width = '100%'
  backdrop.style.height = '100%'
  backdrop.style.background = 'rgba(15, 23, 42, 0.6)'
  backdrop.style.display = 'flex'
  backdrop.style.alignItems = 'center'
  backdrop.style.justifyContent = 'center'
  backdrop.style.zIndex = '99999'
  backdrop.style.padding = '1rem'

  backdrop.innerHTML = `
    <div style="
      width:min(100%, 420px);
      background:#ffffff;
      border-radius:1rem;
      padding:1.25rem;
      box-shadow:0 16px 40px rgba(0,0,0,0.2);
      font-family:Arial, sans-serif;
    ">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
        <h3 style="margin:0;color:#111827;">👫 Invite a Friend to SORA</h3>
        <button
          id="share-friends-close"
          type="button"
          style="
            border:none;
            background:transparent;
            font-size:1.3rem;
            cursor:pointer;
            color:#6b7280;
          "
        >
          ×
        </button>
      </div>

      <p style="margin:0 0 0.8rem;color:#4b5563;line-height:1.4;">
        Invite a friend to play the English quests and have an opportunity to win a free ASEP class. We’ll open your email app with the invitation ready to send.
      </p>

      <label
        for="share-friend-email"
        style="display:block;margin-bottom:0.35rem;font-weight:700;color:#111827;"
      >
        Friend's email address
      </label>

      <input
        id="share-friend-email"
        type="email"
        placeholder="friend@example.com"
        style="
          width:100%;
          box-sizing:border-box;
          padding:0.75rem;
          border:1px solid #d1d5db;
          border-radius:0.6rem;
          margin-bottom:0.75rem;
        "
      />

      <div style="display:flex;justify-content:flex-end;gap:0.6rem;">
        <button
          id="share-friends-cancel"
          type="button"
          style="
            padding:0.7rem 0.95rem;
            border:1px solid #d1d5db;
            border-radius:0.6rem;
            background:#f9fafb;
            color:#374151;
            cursor:pointer;
            font-weight:600;
          "
        >
          Cancel
        </button>

        <button
          id="share-friends-send"
          type="button"
          style="
            padding:0.7rem 0.95rem;
            border:none;
            border-radius:0.6rem;
            background:#2563eb;
            color:#ffffff;
            cursor:pointer;
            font-weight:600;
          "
        >
          ✉️ Send Invitation
        </button>
      </div>
    </div>
  `

  document.body.appendChild(backdrop)

  const closeModal = () => {
    backdrop.remove()
  }

  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) {
      closeModal()
    }
  })

  document
    .getElementById('share-friends-close')
    ?.addEventListener('click', closeModal)

  document
    .getElementById('share-friends-cancel')
    ?.addEventListener('click', closeModal)

  document
    .getElementById('share-friends-send')
    ?.addEventListener('click', () => {
      const emailInput =
        document.getElementById('share-friend-email')
      const friendEmail = emailInput?.value?.trim() || ''

      if (!isValidEmail(friendEmail)) {
        emailInput.style.borderColor = '#ef4444'
        emailInput.focus()
        return
      }

      const subject = encodeURIComponent(
        '👫 Try the SORA Adventure and win a free ASEP class!'
      )

      const body = encodeURIComponent(
        `👫 Hi, friend!\n\nI just completed the SORA Adventure and earned ${rewardName}! 🎉 I scored ${score}/30 and completed ${completedQuests} quest${completedQuests === 1 ? '' : 's'}.\n\nYou can play the fun English quests too for an opportunity to win a free ASEP class:\n${SORA_ADVENTURE_URL}\n\nLearn more about SORA and its English programs:\n${SORA_WEBSITE_URL}\n\nGood luck on your adventure! 🌟`
      )

      window.location.href =
        `mailto:${friendEmail}?subject=${subject}&body=${body}`

      closeModal()
    })
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
