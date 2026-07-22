import '../styles/homePage.css'
import { navigate } from '../router.js'

const mascotPath =
  `${import.meta.env.BASE_URL}mascot/cloud_wink_clean.png`

export function renderHomePage() {
  const app = document.querySelector('#app')

  const activity1Score = getScore('activity1Score')
  const activity2Score = getScore('activity2Score')
  const activity3Score = getScore('activity3Score')

  const activity1Complete = isComplete('activity1Complete')
  const activity2Complete = isComplete('activity2Complete')
  const activity3Complete = isComplete('activity3Complete')

  const quest2Unlocked = activity1Complete
  const quest3Unlocked = activity2Complete

  const totalStars =
    activity1Score +
    activity2Score +
    activity3Score

  const progressPercentage = Math.min(
    (totalStars / 30) * 100,
    100
  )

  const playerMode =
    sessionStorage.getItem('soraPlayerMode') || 'guest'

  const parentEmail =
    sessionStorage.getItem('soraParentEmail') || ''

  const completedActivities = [
    activity1Complete,
    activity2Complete,
    activity3Complete,
  ].filter(Boolean).length

  const currentReward =
    getRewardPreview(completedActivities)

  app.innerHTML = `
    <main class="adventure-home-page">
      <section class="adventure-home-window">
        <div class="home-decoration home-star-one">⭐</div>
        <div class="home-decoration home-star-two">✨</div>
        <div class="home-decoration home-star-three">⭐</div>

        <header class="adventure-home-header">
          <div>
            <p class="adventure-brand">
              SORA ADVENTURE
            </p>

            <h1>Choose Your Quest!</h1>

            <p class="player-status">
              ${
                playerMode === 'email'
                  ? `Playing with parent email: ${escapeHtml(parentEmail)}`
                  : 'Playing as a guest adventurer'
              }
            </p>
          </div>

          <img
            class="adventure-home-mascot"
            src="${mascotPath}"
            alt="SORA cloud mascot"
          />
        </header>

        <section class="adventure-progress-card">
          <div class="adventure-progress-heading">
            <div>
              <p>YOUR ADVENTURE</p>
              <strong>
                ${completedActivities}/3 クエスト完了
              </strong>
            </div>

            <div class="adventure-star-total">
              <span>⭐</span>
              <strong>${totalStars}/30</strong>
            </div>
          </div>

          <div class="adventure-progress-track">
            <div
              class="adventure-progress-bar"
              style="width: ${progressPercentage}%"
            ></div>
          </div>

          <p class="adventure-next-reward">
            ${currentReward}
          </p>
        </section>

        <section class="quest-map">
          ${renderActivityOne({
            complete: activity1Complete,
            score: activity1Score,
          })}

          ${renderActivityTwo({
            complete: activity2Complete,
            score: activity2Score,
            unlocked: quest2Unlocked,
          })}

          ${renderActivityThree({
            complete: activity3Complete,
            score: activity3Score,
            unlocked: quest3Unlocked,
          })}
        </section>

        <section class="reward-ladder">
          <div class="reward-ladder-heading">
            <div>
              <p>COMPLETE THE QUESTS</p>
              <h2>Unlock Your Surprise Reward!</h2>
            </div>

            <span class="reward-gift">🎁</span>
          </div>

          <div class="reward-levels">
            <article class="${
              completedActivities >= 1
                ? 'reward-level reward-unlocked'
                : 'reward-level'
            }">
              <div class="reward-level-icon">🌱</div>
              <p>LEVEL 1</p>
              <strong>Explorer</strong>
              <span>1 quest completed</span>
              <small>ASEP英語クラス1週間無料！</small>
            </article>

            <article class="${
              completedActivities >= 2
                ? 'reward-level reward-unlocked'
                : 'reward-level'
            }">
              <div class="reward-level-icon">🏆</div>
              <p>LEVEL 2</p>
              <strong>Champion</strong>
              <span>2 quests completed</span>
              <small>ASEP英語クラス2週間無料！</small>
            </article>

            <article class="${
              completedActivities >= 3
                ? 'reward-level reward-unlocked'
                : 'reward-level'
            }">
              <div class="reward-level-icon">🌟</div>
              <p>LEVEL 3</p>
              <strong>SORA Star</strong>
              <span>3 quests completed</span>
              <small>First month of ASEP free</small>
            </article>
          </div>
        </section>

        ${
          completedActivities > 0
            ? `
              <button
                id="view-results-button"
                class="view-results-button"
                type="button"
              >
                <span>🎁</span>
                Open My Surprise Reward
              </button>
            `
            : `
              <div class="locked-results-message">
                <span>🔒</span>

                <p>
                  Complete any quest to open your surprise reward.
                </p>
              </div>
            `
        }

      </section>
    </main>
  `

  addButtonListeners({
    activity1Complete,
    activity2Complete,
    activity3Complete,
    quest2Unlocked,
    quest3Unlocked,
  })
}

function renderActivityOne({ complete, score }) {
  return `
    <article class="quest-card quest-one quest-unlocked">
      <div class="quest-number">
        ${complete ? '✓' : '1'}
      </div>

      <div class="quest-picture soccer-picture">
        <div class="mini-goal">🥅</div>
        <div class="mini-ball">⚽</div>
        <div class="mini-letter">A</div>
      </div>

      <div class="quest-information">
        <p>QUEST 1</p>
        <h2>Letter Goal Quest</h2>

        <span>
          サッカーボールを正しい文字のゴールに入れよう！
        </span>

        ${
          complete
            ? `
              <div class="quest-score">
                ⭐ ${score}/10 stars earned
              </div>
            `
            : `
              <div class="quest-ready">
                Ready to begin!
              </div>
            `
        }
      </div>

      <div class="quest-actions">
        <button id="activity-one-button" class="quest-play-button" type="button">
          ${complete ? '🎁 Open Your Reward' : 'Start Quest'}
        </button>
        ${complete ? `<button id="activity-one-replay-button" class="quest-replay-button" type="button">🔄 Play Again</button>` : ''}
      </div>
    </article>
  `
}

function renderActivityTwo({ complete, score, unlocked }) {
  return `
    <article class="quest-card quest-two ${unlocked ? 'quest-unlocked' : 'quest-locked'}">
      <div class="quest-number">
        ${complete ? '✓' : '2'}
      </div>

      <div class="quest-picture animal-picture">
        <span>🐶</span>
        <span>🐱</span>
        <span>🐰</span>
        <div class="sound-symbol">🔊</div>
      </div>

      <div class="quest-information">
        <p>QUEST 2</p>
        <h2>Animal Sound Safari</h2>

        <span>
          ${unlocked
            ? '🔓 アンロック完了！今すぐスタート！'
            : '🔒 クエスト1をクリアすると遊べるようになります'}
        </span>

        ${
          complete
            ? `
              <div class="quest-score">
                ⭐ ${score}/10 stars earned
              </div>
            `
            : `
              <div class="quest-ready">
                ${unlocked ? '🔓 Unlocked' : '🔒 Locked'}
              </div>
            `
        }
      </div>

      <div class="quest-actions">
        <button id="activity-two-button" class="quest-play-button ${unlocked ? '' : 'locked'}" type="button" ${unlocked ? '' : 'disabled'}>
          ${unlocked ? (complete ? '🎁 Open Your Reward' : '▶️ Start Quest') : '🔒 Locked'}
        </button>
        ${complete ? `<button id="activity-two-replay-button" class="quest-replay-button" type="button">🔄 Play Again</button>` : ''}
      </div>
    </article>
  `
}

function renderActivityThree({ complete, score, unlocked }) {
  return `
    <article class="quest-card quest-three ${unlocked ? 'quest-unlocked' : 'quest-locked'}">
      <div class="quest-number">
        ${complete ? '✓' : '3'}
      </div>

      <div class="quest-picture word-picture">
        <div class="word-sentence">
          The <span>___</span> is here.
        </div>

        <div class="word-pieces">
          <span>cat</span>
          <span>dog</span>
          <span>pig</span>
        </div>
      </div>

      <div class="quest-information">
        <p>FINAL QUEST</p>
        <h2>Word Magic Builder</h2>

        <span>
          ${unlocked
            ? '🔓 アンロック完了！今すぐスタート！'
            : '🔒 クエスト2をクリアすると遊べるようになります'}
        </span>

        ${
          complete
            ? `
              <div class="quest-score">
                ⭐ ${score}/10 stars earned
              </div>
            `
            : `
              <div class="quest-ready">
                ${unlocked ? '🔓 Unlocked' : '🔒 Locked'}
              </div>
            `
        }
      </div>

      <div class="quest-actions">
        <button id="activity-three-button" class="quest-play-button ${unlocked ? '' : 'locked'}" type="button" ${unlocked ? '' : 'disabled'}>
          ${unlocked ? (complete ? '🎁 Open Your Reward' : '▶️ Start Quest') : '🔒 Locked'}
        </button>
        ${complete ? `<button id="activity-three-replay-button" class="quest-replay-button" type="button">🔄 Play Again</button>` : ''}
      </div>
    </article>
  `
}

function addButtonListeners({
  activity1Complete,
  activity2Complete,
  activity3Complete,
  quest2Unlocked,
  quest3Unlocked,
}) {
  document
    .querySelector('#activity-one-button')
    ?.addEventListener('click', () => {
      navigate(activity1Complete ? 'results' : 'activity1')
    })

  document
    .querySelector('#activity-two-button')
    ?.addEventListener('click', () => {
      if (!quest2Unlocked) {
        return
      }

      navigate(activity2Complete ? 'results' : 'activity2')
    })

  document
    .querySelector('#activity-three-button')
    ?.addEventListener('click', () => {
      if (!quest3Unlocked) {
        return
      }

      navigate(activity3Complete ? 'results' : 'activity3')
    })

  document
    .querySelector('#activity-one-replay-button')
    ?.addEventListener('click', () => navigate('activity1'))

  document
    .querySelector('#activity-two-replay-button')
    ?.addEventListener('click', () => navigate('activity2'))

  document
    .querySelector('#activity-three-replay-button')
    ?.addEventListener('click', () => navigate('activity3'))

  const resultsButton =
    document.querySelector('#view-results-button')

  if (resultsButton) {
    resultsButton.addEventListener('click', () => {
      navigate('results')
    })
  }

}

function getScore(key) {
  return Number(
    sessionStorage.getItem(key) || 0
  )
}

function isComplete(key) {
  return sessionStorage.getItem(key) === 'true'
}

function getRewardPreview(completedActivities) {
  if (completedActivities >= 3) {
    return '🌟 レベル3達成！ASEP英語クラス1か月無料！'
  }

  if (completedActivities >= 2) {
    return '🏆 レベル2達成！ASEP英語クラス2週間無料！'
  }

  if (completedActivities >= 1) {
    return '🌱 レベル1達成！ASEP英語クラス1週間無料！'
  }

  return 'クエストを1つクリアすると、最初のごほうびがもらえるよ！'
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
