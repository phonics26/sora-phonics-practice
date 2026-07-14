import './style.css'

document.querySelector('#app').innerHTML = `
  <main class="login-page">
    <section class="login-card">
      <div class="logo-badge">SORA</div>

      <p class="eyebrow">KIDS PHONICS</p>

      <h1>Listen. Play. Score!</h1>

      <p class="intro">
        Complete three fun English activities and unlock a Coffee Hours discount.
      </p>

      <form id="login-form">
        <label for="email">Parent or guardian email</label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="parent@example.com"
          autocomplete="email"
          required
        />

        <label class="checkbox-row">
          <input id="coupon-consent" type="checkbox" required />
          <span>Send my result and discount coupon by email.</span>
        </label>

        <label class="checkbox-row optional">
          <input id="marketing-consent" type="checkbox" />
          <span>Send me future SORA news and offers. Optional.</span>
        </label>

        <button type="submit" class="primary-button">
          Start SORA Kids
        </button>
      </form>

      <div class="divider">
        <span>or</span>
      </div>

      <button id="guest-button" class="guest-button">
        Continue as Guest
      </button>

      <p id="message" class="message" aria-live="polite"></p>
    </section>
  </main>
`

const form = document.querySelector('#login-form')
const guestButton = document.querySelector('#guest-button')
const message = document.querySelector('#message')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const email = document.querySelector('#email').value.trim()

  message.textContent = `Email accepted: ${email}`
})

guestButton.addEventListener('click', () => {
  message.textContent = 'Guest mode selected.'
})