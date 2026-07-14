import '../styles/homePage.css'
import { navigate } from '../router.js'

export function renderHomePage() {
  const app = document.querySelector('#app')

  const activity1Score = Number(
    sessionStorage.getItem('activity1Score') || 0
  )

  const activity1Complete =
    sessionStorage.getItem('activity1Complete') === 'true'

  const totalStars = activity1Score
  const progressPercentage = Math.min(
    (totalStars / 30) * 100,
    100
  )

  app.innerHTML = `
    <main class="home-page">
      <section class="home-window">
        <header class="home-header">
          <div>
            <p class="home-brand">SORA KIDS</p>
            <h1>English Adventure</h1>
          </div>

          <button
            id="home-menu-button"
            class="home-menu-button"
            type="button"
            aria-label="Open menu"
          >
            ☰
          </button>
        </header>

        <section class="home-coach">
          <div class="home-mascot-glow"></div>

          <img
            class="home-mascot"
            src="/sora-phonics-practice/mascot/cloud_smile_clean.png"
            alt="SORA cloud mascot"
          />

          <div class="home-speech">
            <strong>Welcome!</strong>
            <p>
              Complete three games to unlock your SORA English reward!
            </p>
          </div>
        </section>

        <section class="progress-card">
          <div class="progress-heading">
            <div>
              <p>Your progress</p>
              <strong id="star-total">
                ${totalStars} / 30 Stars
              </strong>
            </div>

            <span class="progress-star">⭐</span>
          </div>

          <div class="home-progress-track">
            <div
              id="home-progress-bar"
              class="home-progress-bar"
              style="width: ${progressPercentage}%"
            ></div>
          </div>
        </section>

        <section class="activity-section">
          <div class="section-heading">
            <div>
              <p class="section-label">TODAY'S ADVENTURE</p>
              <h2>Choose a game</h2>
            </div>

            <span>
              ${activity1Complete ? '2' : '1'} of 3 unlocked
            </span>
          </div>

          <div class="activity-list">
            <article class="activity-card activity-unlocked">
              <div class="activity-number">
                ${activity1Complete ? '✓' : '1'}
              </div>

              <div class="activity-icon letter-icon">
                ABC
              </div>

              <div class="activity-information">
                <p>ACTIVITY 1</p>
                <h3>Letter Smash</h3>
                <span>
                  ${
                    activity1Complete
                      ? `Completed — ${activity1Score} stars earned.`
                      : 'Listen and tap the correct letter.'
                  }
                </span>
              </div>

              <button
                id="activity-one-button"
                class="play-button"
                type="button"
              >
                ${activity1Complete ? 'Play Again' : 'Play'}
              </button>
            </article>

            <article
              class="activity-card ${
                activity1Complete
                  ? 'activity-unlocked'
                  : 'activity-locked'
              }"
            >
              <div class="activity-number">2</div>

              <div class="activity-icon goal-icon">
                ⚽
              </div>

              <div class="activity-information">
                <p>ACTIVITY 2</p>
                <h3>Sound Goal</h3>
                <span>
                  ${
                    activity1Complete
                      ? 'Ready to play.'
                      : 'Complete Activity 1 to unlock.'
                  }
                </span>
              </div>

              ${
                activity1Complete
                  ? `
                    <button
                      id="activity-two-button"
                      class="play-button"
                      type="button"
                    >
                      Play
                    </button>
                  `
                  : `
                    <div class="lock-badge" aria-label="Locked">
                      🔒
                    </div>
                  `
              }
            </article>

            <article class="activity-card activity-locked">
              <div class="activity-number">3</div>

              <div class="activity-icon match-icon">
                🧩
              </div>

              <div class="activity-information">
                <p>ACTIVITY 3</p>
                <h3>Memory Match</h3>
                <span>
                  Complete Activity 2 to unlock.
                </span>
              </div>

              <div class="lock-badge" aria-label="Locked">
                🔒
              </div>
            </article>
          </div>
        </section>

        <section class="reward-card">
          <div class="reward-symbol">🎁</div>

          <div class="reward-information">
            <p>YOUR SORA REWARD</p>
            <h2>Complete all three games</h2>
            <span>
              Unlock an eligible ASEP lesson, Coffee Hours session,
              or FUNdation offer.
            </span>
          </div>

          <div class="reward-stars">
            <strong>${totalStars}</strong>
            <span>/ 30 ⭐</span>
          </div>
        </section>

        <p
          id="home-message"
          class="home-message"
          aria-live="polite"
        ></p>
      </section>
    </main>
  `

  const activityOneButton = document.querySelector(
    '#activity-one-button'
  )

  activityOneButton.addEventListener('click', () => {
    navigate('activity1')
  })

  const activityTwoButton = document.querySelector(
    '#activity-two-button'
  )

  if (activityTwoButton) {
    activityTwoButton.addEventListener('click', () => {
      navigate('activity2')
    })
  }

  const menuButton = document.querySelector(
    '#home-menu-button'
  )

  const message = document.querySelector('#home-message')

  menuButton.addEventListener('click', () => {
    message.textContent =
      'The menu will be added later.'
  })
}