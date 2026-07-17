import '../styles/loginPage.css'
import { navigate } from '../router.js'
import { supabase } from '../services/supabase.js'

const mascotPath =
`${import.meta.env.BASE_URL}mascot/cloud_blue_transparent.png`

export function renderLoginPage() {
  const app = document.querySelector('#app')

  app.innerHTML = `
    <main class="login-page">
      <section class="login-window">
        <div class="login-sparkle sparkle-one">⭐</div>
        <div class="login-sparkle sparkle-two">✨</div>
        <div class="login-sparkle sparkle-three">⭐</div>

        <section class="login-hero">
          <div class="login-mascot-glow"></div>

          <img
            class="login-mascot"
            src="${mascotPath}"
            alt="SORA cloud mascot"
          />

          <p class="login-brand">SORA ADVENTURE</p>

          <h1>Play, Learn and Win!</h1>

          <p class="login-introduction">
            Complete three fun English games, collect up to
            30 stars and unlock a surprise SORA reward.
          </p>
        </section>

<section class="achievement-preview">

  <article class="achievement-level quest-preview-card quest-preview-one">
      <div class="quest-picture soccer-picture">

        <div class="mini-goal">🥅</div>

        <div class="mini-ball">⚽</div>

        <div class="mini-letter">A</div>

      </div>

    <div class="quest-preview-content">
      <p>QUEST 1</p>
      <strong>Letter Goal</strong>
      <span>

    </div>
  </article>

  <article class="achievement-level quest-preview-card quest-preview-two">
      <div class="quest-picture animal-picture">
        <span>🐶</span>
        <span>🐱</span>
        <span>🐰</span>
        <div class="sound-symbol">🔊</div>
      </div>

    <div class="quest-preview-content">
      <p>QUEST 2</p>
      <strong>Animal Match</strong>
      <span>

    </div>
  </article>

  <article class="achievement-level quest-preview-card quest-preview-three">
    <div class="quest-preview-picture word-preview">
      <div class="preview-sentence">
        The <span>___</span> is here.
      </div>

      <div class="preview-words">
        <span>cat</span>
        <span>dog</span>
        <span>pig</span>
      </div>
    </div>

    <div class="quest-preview-content">
      <p>QUEST 3</p>
      <strong>Word Builder</strong>
      <span>

    </div>
  </article>

</section>

<section class="surprise-card">
          <div class="surprise-gift">🎁</div>

          <div>
            <p>SURPRISE REWARD</p>
            <strong>Complete the adventure to reveal it!</strong>
            <span>
              Eligible rewards may include an ASEP lesson,
              Coffee Hours session or FUNdation offer.
            </span>
          </div>
        </section>

        <form id="parent-login-form" class="parent-login-form">
          <div class="form-heading">
            <p>PARENT OR GUARDIAN</p>
            <h2>Send me the result and reward</h2>
          </div>

          <label for="parent-email">
            Parent or guardian email
          </label>

          <input
            id="parent-email"
            name="email"
            type="email"
            placeholder="parent@example.com"
            autocomplete="email"
          />

          <label class="login-checkbox">
            <input
              id="result-consent"
              type="checkbox"
            />

            <span>
              Email me the child's result and available reward.
            </span>
          </label>

          <label class="login-checkbox optional-consent">
            <input
              id="marketing-consent"
              type="checkbox"
            />

            <span>
              Send me future SORA news and special offers.
              <small>Optional</small>
            </span>
          </label>

          <button
            class="parent-start-button"
            type="submit"
          >
            <span>Start with Parent Email</span>
            <span aria-hidden="true">▶</span>
          </button>
        </form>

        <div class="login-divider">
          <span>or</span>
        </div>

        <button
          id="guest-start-button"
          class="guest-start-button"
          type="button"
        >
          Play Without Email
        </button>

        <p class="guest-explanation">
          Guest players can complete all three games.
          We will ask for a parent email at the end only
          if they want to receive the reward.
        </p>

        <p
          id="login-message"
          class="login-message"
          aria-live="polite"
        ></p>
      </section>
    </main>
  `

  const form =
    document.querySelector('#parent-login-form')

  const guestButton =
    document.querySelector('#guest-start-button')

  const message =
    document.querySelector('#login-message')

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const email = document
      .querySelector('#parent-email')
      .value
      .trim()

    const resultConsent = document
      .querySelector('#result-consent')
      .checked

    const marketingConsent = document
      .querySelector('#marketing-consent')
      .checked

    if (!email) {
      showLoginError(
        message,
        'Please enter a parent or guardian email.'
      )
      return
    }

    if (!resultConsent) {
      showLoginError(
        message,
        'Please agree to receive the result and reward email.'
      )
      return
    }

    message.textContent = 'Saving your email...'
    message.className = 'login-message'

    const { error } = await supabase
      .from('sora_adventure_results')
      .insert({
        email,
        player_mode: 'email',
        marketing_consent: marketingConsent,
      })

    if (error) {
      console.error(
        'Supabase email save error:',
        error
      )

      showLoginError(
        message,
        'We could not save the email. Please try again.'
      )
      return
    }

    sessionStorage.setItem(
      'soraPlayerMode',
      'email'
    )

    sessionStorage.setItem(
      'soraParentEmail',
      email
    )

    sessionStorage.setItem(
      'soraResultConsent',
      'true'
    )

    sessionStorage.setItem(
      'soraMarketingConsent',
      String(marketingConsent)
    )

    resetAdventureProgress()
    navigate('home')
  })

  guestButton.addEventListener('click', () => {
    sessionStorage.setItem(
      'soraPlayerMode',
      'guest'
    )

    sessionStorage.removeItem(
      'soraParentEmail'
    )

    sessionStorage.setItem(
      'soraResultConsent',
      'false'
    )

    sessionStorage.setItem(
      'soraMarketingConsent',
      'false'
    )

    resetAdventureProgress()
    navigate('home')
  })
}

function showLoginError(messageElement, text) {
  messageElement.textContent = text
  messageElement.className =
    'login-message login-message-error'
}

function resetAdventureProgress() {
  const progressKeys = [
    'activity1Score',
    'activity2Score',
    'activity3Score',
    'activity1Complete',
    'activity2Complete',
    'activity3Complete',
  ]

  progressKeys.forEach((key) => {
    sessionStorage.removeItem(key)
  })
}