import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Supabase URL or publishable key is missing.'
  )
}

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)

export async function createAdventurePlayer({
  parentEmail = null,
  registrationType = 'guest',
  couponEmailConsent = false,
  marketingEmailConsent = false,
} = {}) {
  let {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const { data, error } =
      await supabase.auth.signInAnonymously()

    if (error) {
      throw error
    }

    user = data.user
  }

  if (!user) {
    throw new Error('Could not create the player account.')
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      parent_email: parentEmail || null,
      registration_type: registrationType,
      coupon_email_consent: couponEmailConsent,
      marketing_email_consent: marketingEmailConsent,
      updated_at: new Date().toISOString(),
    })

  if (profileError) {
    throw profileError
  }

  return user
}
