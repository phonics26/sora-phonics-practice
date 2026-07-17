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

let draggedBall = null
let dragClone = null
let originalBallRect = null
let pointerOffsetX = 0
let pointerOffsetY = 0

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
            <p>SORA ADVENTURE</p>
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
              Drag the ball into the correct goal!
            </p>
          </div>
        </section>

        <section class="soccer-instruction">
          <p>
            Kick <span id="soccer-kick-number">1</span>
            of ${TOTAL_KICKS}
          </p>

          <h2>Which letter did you hear?</h2>

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
          aria-label="Letter goals"
        ></section>

        <p class="soccer-drag-instruction">
          Touch and drag the ball into the correct goal.
        </p>

        <div class="soccer-ball-area">
          <button
            id="soccer-ball"
            class="soccer-ball"
            type="button"
            aria-label="Drag the soccer ball"
          >
            ⚽
          </button>
        </div>

        <p
          id="soccer-feedback"
          class="soccer-feedback"
          aria-live="polite"
        >
          Drag the ball into a goal!
        </p>
      </section>
    </main>
  `

  document
    .querySelector('#soccer-home-button')
    .addEventListener('click', () => {
      cancelSpeech()
      cleanUpBallDrag()
      navigate('home')
    })

  document
    .querySelector('#soccer-listen-button')
    .addEventListener('click', speakInstruction)

  document
    .querySelector('#soccer-ball')
    .addEventListener('pointerdown', startBallDrag)
}

function loadRound() {
  cleanUpBallDrag()
  acceptingAnswer = true

  const round = rounds[currentKick]

  document.querySelector('#soccer-kick-number').textContent =
    currentKick + 1

  document.querySelector('#soccer-score').textContent =
    `${score} / ${TOTAL_KICKS}`

  document.querySelector('#soccer-progress-bar').style.width =
    `${(currentKick / TOTAL_KICKS) * 100}%`

  document.querySelector('#soccer-coach-message').textContent = round.target

  document.querySelector('#soccer-feedback').textContent =
    'Drag the ball into a goal!'

  document.querySelector('#soccer-feedback').className =
    'soccer-feedback'

  const goalsContainer =
    document.querySelector('#soccer-goals')

  goalsContainer.innerHTML = round.goals
    .map(
      (letter, index) => `
        <div
          class="soccer-goal soccer-goal-${index + 1}"
          data-letter="${letter}"
          data-position="${index}"
          aria-label="Goal ${letter}"
        >
          <span class="soccer-goal-net">🥅</span>
          <strong>${letter}</strong>
        </div>
      `
    )
    .join('')

  resetBall()
  window.setTimeout(speakInstruction, 450)
}

function startBallDrag(event) {
  if (!acceptingAnswer || dragClone) {
    return
  }

  event.preventDefault()

  draggedBall = event.currentTarget
  originalBallRect = draggedBall.getBoundingClientRect()

  pointerOffsetX =
    event.clientX - originalBallRect.left

  pointerOffsetY =
    event.clientY - originalBallRect.top

  dragClone = draggedBall.cloneNode(true)

  dragClone.classList.add('soccer-ball-clone')

  dragClone.style.width =
    `${originalBallRect.width}px`

  dragClone.style.height =
    `${originalBallRect.height}px`

  document.body.appendChild(dragClone)

  draggedBall.classList.add('soccer-ball-placeholder')

  moveBallClone(event.clientX, event.clientY)

  window.addEventListener(
    'pointermove',
    handleBallMove
  )

  window.addEventListener(
    'pointerup',
    handleBallDrop,
    { once: true }
  )

  window.addEventListener(
    'pointercancel',
    handleBallCancel,
    { once: true }
  )
}

function handleBallMove(event) {
  if (!dragClone) {
    return
  }

  event.preventDefault()

  moveBallClone(event.clientX, event.clientY)

  document
    .querySelectorAll('.soccer-goal')
    .forEach((goal) => {
      if (
        isPointInsideElement(
          event.clientX,
          event.clientY,
          goal
        )
      ) {
        goal.classList.add('soccer-goal-active')
      } else {
        goal.classList.remove('soccer-goal-active')
      }
    })
}

function handleBallDrop(event) {
  window.removeEventListener(
    'pointermove',
    handleBallMove
  )

  const goals =
    [...document.querySelectorAll('.soccer-goal')]

  goals.forEach((goal) => {
    goal.classList.remove('soccer-goal-active')
  })

  const droppedGoal = goals.find((goal) =>
    isPointInsideElement(
      event.clientX,
      event.clientY,
      goal
    )
  )

  if (droppedGoal) {
    checkDroppedGoal(droppedGoal)
  } else {
    returnBallToStart()
  }
}

function handleBallCancel() {
  window.removeEventListener(
    'pointermove',
    handleBallMove
  )

  returnBallToStart()
}

function checkDroppedGoal(goal) {
  const round = rounds[currentKick]
  const selectedLetter = goal.dataset.letter

  const feedback =
    document.querySelector('#soccer-feedback')

  const coach =
    document.querySelector('#soccer-coach-message')

  const mascot =
    document.querySelector('#soccer-mascot')

  if (selectedLetter === round.target) {
    acceptingAnswer = false
    score += 1

    moveCloneIntoGoal(goal)
    goal.classList.add('soccer-correct-goal')
    mascot.classList.add('soccer-mascot-celebrate')

    feedback.textContent =
      'GOAL! Fantastic! +1 ⭐'

    feedback.className =
      'soccer-feedback soccer-correct-feedback'

    coach.textContent = 'Amazing goal!'

    document.querySelector('#soccer-score').textContent =
      `${score} / ${TOTAL_KICKS}`

    window.setTimeout(() => {
      mascot.classList.remove(
        'soccer-mascot-celebrate'
      )

      currentKick += 1

      if (currentKick >= TOTAL_KICKS) {
        finishActivity()
      } else {
        loadRound()
      }
    }, 1100)
  } else {
    goal.classList.add('soccer-wrong-goal')

    feedback.textContent =
      'Almost! Try another goal.'

    feedback.className =
      'soccer-feedback soccer-wrong-feedback'

    coach.textContent = 'Try again!'

    returnBallToStart()

    window.setTimeout(() => {
      goal.classList.remove('soccer-wrong-goal')
    }, 500)
  }
}

function moveCloneIntoGoal(goal) {
  if (!dragClone) {
    return
  }

  const goalRect = goal.getBoundingClientRect()

  dragClone.classList.add('soccer-ball-scored')

  dragClone.style.left =
    `${goalRect.left + goalRect.width / 2 -
      originalBallRect.width / 2}px`

  dragClone.style.top =
    `${goalRect.top + goalRect.height / 2 -
      originalBallRect.height / 2}px`

  window.setTimeout(() => {
    removeBallClone()

    if (draggedBall) {
      draggedBall.classList.remove(
        'soccer-ball-placeholder'
      )
    }

    draggedBall = null
    originalBallRect = null
  }, 650)
}

function returnBallToStart() {
  if (!dragClone || !originalBallRect) {
    cleanUpBallDrag()
    return
  }

  dragClone.classList.add(
    'soccer-ball-returning'
  )

  dragClone.style.left =
    `${originalBallRect.left}px`

  dragClone.style.top =
    `${originalBallRect.top}px`

  window.setTimeout(() => {
    cleanUpBallDrag()
  }, 220)
}

function moveBallClone(clientX, clientY) {
  if (!dragClone) {
    return
  }

  dragClone.style.left =
    `${clientX - pointerOffsetX}px`

  dragClone.style.top =
    `${clientY - pointerOffsetY}px`
}

function isPointInsideElement(
  clientX,
  clientY,
  element
) {
  const rect = element.getBoundingClientRect()

  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  )
}

function removeBallClone() {
  if (dragClone) {
    dragClone.remove()
    dragClone = null
  }
}

function cleanUpBallDrag() {
  window.removeEventListener(
    'pointermove',
    handleBallMove
  )

  removeBallClone()

  if (draggedBall) {
    draggedBall.classList.remove(
      'soccer-ball-placeholder'
    )
  }

  document
    .querySelectorAll('.soccer-goal')
    .forEach((goal) => {
      goal.classList.remove('soccer-goal-active')
    })

  draggedBall = null
  originalBallRect = null
}

function resetBall() {
  const ball = document.querySelector('#soccer-ball')

  if (ball) {
    ball.className = 'soccer-ball'
  }
}

function speakInstruction() {
  const round = rounds[currentKick]

  if (!round) {
    return
  }

  speak(round.target)
}

function speak(text) {
  if (!('speechSynthesis' in window)) {
    return
  }

  window.speechSynthesis.cancel()

  const speech =
    new SpeechSynthesisUtterance(text)

  speech.rate = 0.82
  speech.pitch = 1.05
  speech.volume = 1

  window.speechSynthesis.speak(speech)
}

function cancelSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}

function finishActivity() {
  cancelSpeech()
  cleanUpBallDrag()

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
    .addEventListener(
      'click',
      renderActivity1
    )
}