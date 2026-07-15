import '../styles/activity1.css'
import { navigate } from '../router.js'

const TOTAL_KICKS = 10

const rounds = [
  { target: 'A', goals: ['A', 'C', 'D'] },
  { target: 'B', goals: ['E', 'B', 'C'] },
  { target: 'C', goals: ['D', 'A', 'C'] },
  { target: 'D', goals: ['B', 'D', 'E'] },
  { target: 'E', goals: ['E', 'C', 'A'] },
  { target: 'A', goals: ['D', 'A', 'B'] },
  { target: 'C', goals: ['C', 'E', 'B'] },
  { target: 'B', goals: ['A', 'D', 'B'] },
  { target: 'E', goals: ['C', 'E', 'D'] },
  { target: 'D', goals: ['B', 'A', 'D'] },
]

let currentKick = 0
let score = 0
let acceptingAnswer = true

const mascotPath =
  `${import.meta.env.BASE_URL}mascot/cloud_smile_clean.png`

export function renderActivity1() {
  currentKick = 0
  score = 0
  acceptingAnswer = true

  renderGameScreen()
  loadRound()
}

function renderGameScreen() {
  document.querySelector('#app').innerHTML = `
    <main class="soccer-game-page">
      <section class="soccer-game-window">
        <header class="soccer-game-header">
          <button
            id="soccer-home-button"
            class="soccer-back-button"
            type="button"
            aria-label="Return home"
          >
            ←
          </button>

          <div>
            <p>SORA KIDS</p>
            <h1>Letter Goal</h1>
          </div>

          <div class="soccer-score-box">
            <span>Score</span>
            <strong id="soccer-score">0 / ${TOTAL_KICKS}</strong>
          </div>
        </header>

        <div class="soccer-progress-track">
          <div
            id="soccer-progress-bar"
            class="soccer-progress-bar"
          ></div>
        </div>

        <section class="soccer-coach">
          <img
            id="soccer-mascot"
            class="soccer-mascot"
            src="${mascotPath}"
            alt="SORA cloud mascot"
          />

          <div class="soccer-speech-bubble">
            <p id="soccer-coach-message">
              Listen carefully!
            </p>
          </div>
        </section>

        <section class="soccer-instruction">
          <p>
            Kick <span id="soccer-kick-number">1</span>
            of ${TOTAL_KICKS}
          </p>

          <h2 id="soccer-question">
            Which letter did you hear?
          </h2>

          <button
            id="soccer-listen-button"
            class="soccer-listen-button"
            type="button"
          >
            🔊 Hear it again
          </button>
        </section>

        <section
          id="soccer-goals"
          class="soccer-goals"
          aria-label="Choose a letter goal"
        ></section>

        <div class="soccer-ball-area">
          <div id="soccer-ball" class="soccer-ball">⚽</div>
        </div>

        <p
          id="soccer-feedback"
          class="soccer-feedback"
          aria-live="polite"
        >
          Tap the correct goal!
        </p>
      </section>
    </main>
  `

  document
    .querySelector('#soccer-home-button')
    .addEventListener('click', () => {
      window.speechSynthesis?.cancel()
      navigate('home')
    })

  document
    .querySelector('#soccer-listen-button')
    .addEventListener('click', speakInstruction)
}

function loadRound() {
  acceptingAnswer = true

  const round = rounds[currentKick]

  document.querySelector('#soccer-kick-number').textContent =
    currentKick + 1

  document.querySelector('#soccer-score').textContent =
    `${score} / ${TOTAL_KICKS}`

  document.querySelector('#soccer-progress-bar').style.width =
    `${(currentKick / TOTAL_KICKS) * 100}%`

  document.querySelector('#soccer-coach-message').textContent =
    `Kick the ball into the ${round.target} goal!`

  document.querySelector('#soccer-feedback').textContent =
    'Tap the correct goal!'

  document.querySelector('#soccer-feedback').className =
    'soccer-feedback'

  const goalsContainer =
    document.querySelector('#soccer-goals')

  goalsContainer.innerHTML = round.goals
    .map(
      (letter, index) => `
        <button
          class="soccer-goal soccer-goal-${index + 1}"
          type="button"
          data-letter="${letter}"
          data-position="${index}"
          aria-label="Goal ${letter}"
        >
          <span class="soccer-goal-net">🥅</span>
          <strong>${letter}</strong>
        </button>
      `
    )
    .join('')

  document.querySelectorAll('.soccer-goal').forEach((goal) => {
    goal.addEventListener('click', () => {
      checkGoal(goal)
    })
  })

  resetBall()
  setTimeout(speakInstruction, 450)
}

function speakInstruction() {
  const round = rounds[currentKick]

  if (!round) {
    return
  }

  if (!('speechSynthesis' in window)) {
    document.querySelector('#soccer-feedback').textContent =
      `Kick the ball into the ${round.target} goal.`
    return
  }

  window.speechSynthesis.cancel()

  const speech = new SpeechSynthesisUtterance(
    `Kick the ball into the letter ${round.target} goal`
  )

  speech.rate = 0.82
  speech.pitch = 1.05
  speech.volume = 1

  window.speechSynthesis.speak(speech)
}

function checkGoal(goal) {
  if (!acceptingAnswer) {
    return
  }

  const round = rounds[currentKick]
  const chosenLetter = goal.dataset.letter

  if (chosenLetter === round.target) {
    acceptingAnswer = false
    score += 1

    animateBallToGoal(goal)
    goal.classList.add('soccer-correct-goal')

    document.querySelector('#soccer-score').textContent =
      `${score} / ${TOTAL_KICKS}`

    document.querySelector('#soccer-feedback').textContent =
      'GOAL! Fantastic! +1 ⭐'

    document.querySelector('#soccer-feedback').className =
      'soccer-feedback soccer-correct-feedback'

    document.querySelector('#soccer-coach-message').textContent =
      'Amazing goal!'

    setTimeout(() => {
      currentKick += 1

      if (currentKick >= TOTAL_KICKS) {
        finishActivity()
      } else {
        loadRound()
      }
    }, 1100)
  } else {
    goal.classList.add('soccer-wrong-goal')

    document.querySelector('#soccer-feedback').textContent =
      'Almost! Listen and try again.'

    document.querySelector('#soccer-feedback').className =
      'soccer-feedback soccer-wrong-feedback'

    document.querySelector('#soccer-coach-message').textContent =
      'You can do it!'

    setTimeout(() => {
      goal.classList.remove('soccer-wrong-goal')
    }, 500)
  }
}

function animateBallToGoal(goal) {
  const ball = document.querySelector('#soccer-ball')
  const position = Number(goal.dataset.position)

  ball.classList.remove(
    'ball-to-left',
    'ball-to-centre',
    'ball-to-right'
  )

  void ball.offsetWidth

  if (position === 0) {
    ball.classList.add('ball-to-left')
  } else if (position === 1) {
    ball.classList.add('ball-to-centre')
  } else {
    ball.classList.add('ball-to-right')
  }
}

function resetBall() {
  const ball = document.querySelector('#soccer-ball')

  ball.className = 'soccer-ball'
}

function finishActivity() {
  window.speechSynthesis?.cancel()

  sessionStorage.setItem(
    'activity1Score',
    String(score)
  )

  sessionStorage.setItem(
    'activity1Complete',
    'true'
  )

  document.querySelector('#app').innerHTML = `
    <main class="soccer-game-page">
      <section class="soccer-results-window">
        <div class="soccer-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="soccer-results-mascot"
          src="${mascotPath}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 1 COMPLETE</p>

        <h1>Fantastic Goals!</h1>

        <div class="soccer-final-score">
          <strong>${score}</strong>
          <span>out of ${TOTAL_KICKS}</span>
        </div>

        <p>
          You earned ${score} stars toward your
          SORA English reward!
        </p>

        <button
          id="soccer-return-home"
          type="button"
        >
          Return to Home
        </button>

        <button
          id="soccer-play-again"
          type="button"
        >
          Play Again
        </button>
      </section>
    </main>
  `

  document
    .querySelector('#soccer-return-home')
    .addEventListener('click', () => {
      navigate('home')
    })

  document
    .querySelector('#soccer-play-again')
    .addEventListener('click', renderActivity1)
}