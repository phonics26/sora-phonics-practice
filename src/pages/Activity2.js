import '../styles/activity2.css'
import { navigate } from '../router.js'

const TOTAL_ROUNDS = 10

const rounds = [
  {
    target: 'cat',
    choices: [
      { name: 'cat', icon: '🐱' },
      { name: 'dog', icon: '🐶' },
      { name: 'fish', icon: '🐟' },
    ],
  },
  {
    target: 'dog',
    choices: [
      { name: 'bird', icon: '🐦' },
      { name: 'dog', icon: '🐶' },
      { name: 'pig', icon: '🐷' },
    ],
  },
  {
    target: 'fish',
    choices: [
      { name: 'fish', icon: '🐟' },
      { name: 'duck', icon: '🦆' },
      { name: 'cat', icon: '🐱' },
    ],
  },
  {
    target: 'bird',
    choices: [
      { name: 'frog', icon: '🐸' },
      { name: 'bird', icon: '🐦' },
      { name: 'dog', icon: '🐶' },
    ],
  },
  {
    target: 'pig',
    choices: [
      { name: 'pig', icon: '🐷' },
      { name: 'rabbit', icon: '🐰' },
      { name: 'duck', icon: '🦆' },
    ],
  },
  {
    target: 'duck',
    choices: [
      { name: 'cat', icon: '🐱' },
      { name: 'duck', icon: '🦆' },
      { name: 'frog', icon: '🐸' },
    ],
  },
  {
    target: 'frog',
    choices: [
      { name: 'fish', icon: '🐟' },
      { name: 'rabbit', icon: '🐰' },
      { name: 'frog', icon: '🐸' },
    ],
  },
  {
    target: 'rabbit',
    choices: [
      { name: 'rabbit', icon: '🐰' },
      { name: 'pig', icon: '🐷' },
      { name: 'bird', icon: '🐦' },
    ],
  },
  {
    target: 'bird',
    choices: [
      { name: 'dog', icon: '🐶' },
      { name: 'bird', icon: '🐦' },
      { name: 'cat', icon: '🐱' },
    ],
  },
  {
    target: 'rabbit',
    choices: [
      { name: 'frog', icon: '🐸' },
      { name: 'pig', icon: '🐷' },
      { name: 'rabbit', icon: '🐰' },
    ],
  },
]

let currentRound = 0
let score = 0
let acceptingAnswer = true
let currentAnimalAudio = null

const mascotPath =
  `${import.meta.env.BASE_URL}mascot/cloud_smile_clean.png`

export function renderActivity2() {
  currentRound = 0
  score = 0
  acceptingAnswer = true

  renderGame()
  loadRound()
}

function renderGame() {
  document.querySelector('#app').innerHTML = `
    <main class="animal-game-page">
      <section class="animal-game-window">
        <header class="animal-header">
          <button
            id="animal-home-button"
            class="animal-back-button"
            type="button"
            aria-label="Return home"
          >
            ←
          </button>

          <div class="animal-title">
            <p>SORA ADVENTURE</p>
            <h1>Animal Match</h1>
          </div>

          <div class="animal-score-box">
            <span>Score</span>
            <strong id="animal-score">0 / ${TOTAL_ROUNDS}</strong>
          </div>
        </header>

        <div class="animal-progress-track">
          <div
            id="animal-progress-bar"
            class="animal-progress-bar"
          ></div>
        </div>

        <section class="animal-coach">
          <img
            id="animal-mascot"
            class="animal-mascot"
            src="${mascotPath}"
            alt="SORA cloud mascot"
          />

          <div class="animal-speech-bubble">
            <p id="animal-coach-message">
              Listen and point to the correct animal!
            </p>
          </div>
        </section>

        <section class="animal-instruction">
          <p>
            Round <span id="animal-round-number">1</span>
            of ${TOTAL_ROUNDS}
          </p>

          <h2>Which animal did you hear?</h2>

          <button
            id="animal-listen-button"
            class="animal-listen-button"
            type="button"
          >
            🔊 Hear it again
          </button>
        </section>

        <section
          id="animal-choices"
          class="animal-choices"
          aria-label="Animal choices"
        ></section>

        <p
          id="animal-feedback"
          class="animal-feedback"
          aria-live="polite"
        >
          Choose one animal.
        </p>
      </section>
    </main>
  `

  document
    .querySelector('#animal-home-button')
    .addEventListener('click', () => {
      stopAnimalAudio()
      navigate('home')
    })

  document
    .querySelector('#animal-listen-button')
    .addEventListener('click', speakInstruction)
}

function loadRound() {
  acceptingAnswer = true

  const round = rounds[currentRound]

  document.querySelector('#animal-round-number').textContent =
    currentRound + 1

  document.querySelector('#animal-score').textContent =
    `${score} / ${TOTAL_ROUNDS}`

  document.querySelector('#animal-progress-bar').style.width =
    `${(currentRound / TOTAL_ROUNDS) * 100}%`

  document.querySelector('#animal-coach-message').textContent =
    `Point to the ${round.target}!`

  document.querySelector('#animal-feedback').textContent =
    'Choose one animal.'

  document.querySelector('#animal-feedback').className =
    'animal-feedback'

  const choices = document.querySelector('#animal-choices')

  choices.innerHTML = round.choices
    .map(
      (animal) => `
        <button
          class="animal-choice"
          type="button"
          data-animal="${animal.name}"
          aria-label="${animal.name}"
        >
          <span class="animal-icon">${animal.icon}</span>
          <strong>${animal.name}</strong>
        </button>
      `
    )
    .join('')

  document
    .querySelectorAll('.animal-choice')
    .forEach((button) => {
      button.addEventListener('click', () => {
        checkAnswer(button)
      })
    })

  setTimeout(speakInstruction, 450)
}

function speakInstruction() {
  const round = rounds[currentRound]

  if (!round) {
    return
  }

  stopAnimalAudio()

  const recordingPath =
    `${import.meta.env.BASE_URL}audio/animals/${round.target}.wav`

  currentAnimalAudio = new Audio(recordingPath)
  currentAnimalAudio.preload = 'auto'
  currentAnimalAudio.volume = 1

  currentAnimalAudio.addEventListener('ended', () => {
    currentAnimalAudio = null
  }, { once: true })

  currentAnimalAudio.play().catch(() => {
    currentAnimalAudio = null
  })
}

function stopAnimalAudio() {
  if (!currentAnimalAudio) {
    return
  }

  currentAnimalAudio.pause()
  currentAnimalAudio.currentTime = 0
  currentAnimalAudio = null
}

function checkAnswer(button) {
  if (!acceptingAnswer) {
    return
  }

  const round = rounds[currentRound]
  const selectedAnimal = button.dataset.animal
  const feedback = document.querySelector('#animal-feedback')
  const coach = document.querySelector('#animal-coach-message')
  const mascot = document.querySelector('#animal-mascot')

  if (selectedAnimal === round.target) {
    acceptingAnswer = false
    score += 1

    button.classList.add('animal-correct')
    mascot.classList.add('animal-celebrate')

    feedback.textContent = 'Great job! +1 ⭐'
    feedback.className =
      'animal-feedback animal-correct-feedback'

    coach.textContent = 'Fantastic! You found it!'

    document.querySelector('#animal-score').textContent =
      `${score} / ${TOTAL_ROUNDS}`

    setTimeout(() => {
      mascot.classList.remove('animal-celebrate')
      currentRound += 1

      if (currentRound >= TOTAL_ROUNDS) {
        finishActivity()
      } else {
        loadRound()
      }
    }, 900)
  } else {
    button.classList.add('animal-wrong')

    feedback.textContent =
      'Almost! Listen and try again.'

    feedback.className =
      'animal-feedback animal-wrong-feedback'

    coach.textContent = 'You can do it!'

    setTimeout(() => {
      button.classList.remove('animal-wrong')
    }, 500)
  }
}

function finishActivity() {
  stopAnimalAudio()

  sessionStorage.setItem(
    'activity2Score',
    String(score)
  )

  sessionStorage.setItem(
    'activity2Complete',
    'true'
  )

  document.querySelector('#app').innerHTML = `
    <main class="animal-game-page">
      <section class="animal-results-window">
        <div class="animal-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="animal-results-mascot"
          src="${mascotPath}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 2 COMPLETE</p>

        <h1>Amazing Animal Match!</h1>

        <div class="animal-final-score">
          <strong>${score}</strong>
          <span>out of ${TOTAL_ROUNDS}</span>
        </div>

        <p>
          You earned ${score} more stars toward your
          SORA English reward!
        </p>

        <button
          id="animal-return-home"
          class="animal-primary-button"
          type="button"
        >
          🔓 次のクエストをアンロック
        </button>

        <button
          id="animal-play-again"
          class="animal-secondary-button"
          type="button"
        >
          🔄 Play Again
        </button>
      </section>
    </main>
  `

  document
    .querySelector('#animal-return-home')
    .addEventListener('click', () => {
      navigate('home')
    })

  document
    .querySelector('#animal-play-again')
    .addEventListener('click', renderActivity2)
}
