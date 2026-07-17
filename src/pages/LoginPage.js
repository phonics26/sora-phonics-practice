import '../styles/loginPage.css'
import { navigate } from '../router.js'

const mascotPath =
  `${import.meta.env.BASE_URL}mascot/cloud_blue_transparent.png`

export function renderLoginPage() {
  const app = document.querySelector('#app')

  app.innerHTML = `
    <main class="login-page">
      <section class="login-window">

        <div class="login-sparkle sparkle-one">⭐</div>
        <div class="login-sparkle sparkle-two">✨</div>

        <header class="login-hero">
          <img
            class="login-mascot"
            src="${mascotPath}"
            alt="SORA cloud mascot"
          />

          <p class="login-brand">SORA ADVENTURE</p>

          <h1>Play, Learn and Win!</h1>

<p class="login-introduction">
  Play three fun English games, collect stars, and unlock a surprise SORA reward.
</p>
        </header>

        <section class="professional-quest-preview">

          <article class="professional-quest-card">
            <div class="professional-quest-icon letter-goal-icon">
              <div class="professional-letter">A</div>
              <div class="professional-goal">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="professional-ball"></div>
            </div>

            <div class="professional-quest-text">
              <small>QUEST 1</small>
              <strong>Letter Goal</strong>
              <span>Match letters through play.</span>
            </div>
          </article>

          <article class="professional-quest-card">
            <div class="professional-quest-icon animal-match-icon">
              <div class="professional-sound">
                <span></span>
                <span></span>
              </div>

              <div class="professional-animal animal-one">
                <span></span>
              </div>

              <div class="professional-animal animal-two">
                <span></span>
              </div>
            </div>

            <div class="professional-quest-text">
              <small>QUEST 2</small>
              <strong>Animal Match</strong>
              <span>Listen and choose the animal.</span>
            </div>
          </article>

          <article class="professional-quest-card">
            <div class="professional-quest-icon word-builder-icon">
              <div class="professional-sentence">
                The <span></span> is red.
              </div>

              <div class="professional-word-row">
                <b>cat</b>
                <b>dog</b>
                <b>pig</b>
              </div>
            </div>

            <div class="professional-quest-text">
              <small>QUEST 3</small>
              <strong>Word Builder</strong>
              <span>Complete a simple sentence.</span>
            </div>
          </article>

        </section>

        <button
          id="start-adventure-button"
          class="start-adventure-button"
          type="button"
        >
        <div class="reward-preview">
    🎁 Complete Quests to unlock a surprise SORA reward!
</div>
          Start Adventure
          <span aria-hidden="true">→</span>
        </button>

        <p class="login-privacy-note">
          No sign-in required. A parent email is optional at the end.
        </p>

      </section>
    </main>
  `

  document
    .querySelector('#start-adventure-button')
    .addEventListener('click', () => {
      sessionStorage.setItem('soraPlayerMode', 'guest')
      resetAdventureProgress()
      navigate('home')
    })
}

function resetAdventureProgress() {
  const progressKeys = [
    'activity1Score',
    'activity2Score',
    'activity3Score',
    'activity1Complete',
    'activity2Complete',
    'activity3Complete',
    'soraFinalResultSaved',
    'soraRewardCode',
  ]

  progressKeys.forEach((key) => {
    sessionStorage.removeItem(key)
  })
}