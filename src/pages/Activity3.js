import '../styles/activity3.css'
import { navigate } from '../router.js'

const TOTAL_ROUNDS = 10

const rounds = [
  {
    sentenceStart: 'The',
    sentenceEnd: 'is on the mat.',
    target: 'cat',
    choices: ['cat', 'dog', 'pig'],
    picture: '🐱',
  },
  {
    sentenceStart: 'I see a',
    sentenceEnd: '.',
    target: 'dog',
    choices: ['fox', 'dog', 'hen'],
    picture: '🐶',
  },
  {
    sentenceStart: 'The',
    sentenceEnd: 'is hot.',
    target: 'sun',
    choices: ['sun', 'bus', 'cup'],
    picture: '☀️',
  },
  {
    sentenceStart: 'The',
    sentenceEnd: 'can hop.',
    target: 'fox',
    choices: ['pig', 'hen', 'fox'],
    picture: '🦊',
  },
  {
    sentenceStart: 'The',
    sentenceEnd: 'is pink.',
    target: 'pig',
    choices: ['dog', 'pig', 'cat'],
    picture: '🐷',
  },
  {
    sentenceStart: 'The',
    sentenceEnd: 'has a lid.',
    target: 'pot',
    choices: ['pot', 'bed', 'map'],
    picture: '🍲',
  },
  {
    sentenceStart: 'I sit on the',
    sentenceEnd: '.',
    target: 'bed',
    choices: ['bus', 'bed', 'cup'],
    picture: '🛏️',
  },
  {
    sentenceStart: 'The',
    sentenceEnd: 'is red.',
    target: 'bus',
    choices: ['hat', 'bus', 'sun'],
    picture: '🚌',
  },
  {
    sentenceStart: 'The',
    sentenceEnd: 'is in the box.',
    target: 'hen',
    choices: ['hen', 'fox', 'pig'],
    picture: '🐔',
  },
  {
    sentenceStart: 'I have a',
    sentenceEnd: '.',
    target: 'hat',
    choices: ['map', 'hat', 'cup'],
    picture: '🧢',
  },
]

let currentRound = 0
let score = 0
let acceptingAnswer = true

const mascotPath =
  `${import.meta.env.BASE_URL}mascot/cloud_smile_clean.png`

export function renderActivity3() {
  currentRound = 0
  score = 0
  acceptingAnswer = true

  renderGame()
  loadRound()
}

function renderGame() {
  document.querySelector('#app').innerHTML = `
    <main class="cvc-game-page">
      <section class="cvc-game-window">
        <header class="cvc-header">
          <button
            id="cvc-home-button"
            class="cvc-back-button"
            type="button"
            aria-label="Return home"
          >
            ←
          </button>

          <div class="cvc-title">
            <p>SORA ADVENTURE</p>
            <h1>Sentence Builder</h1>
          </div>

          <div class="cvc-score-box">
            <span>Score</span>
            <strong id="cvc-score">0 / ${TOTAL_ROUNDS}</strong>
          </div>
        </header>

        <div class="cvc-progress-track">
          <div
            id="cvc-progress-bar"
            class="cvc-progress-bar"
          ></div>
        </div>

        <section class="cvc-coach">
          <img
            id="cvc-mascot"
            class="cvc-mascot"
            src="${mascotPath}"
            alt="SORA cloud mascot"
          />

          <div class="cvc-speech-bubble">
            <p id="cvc-coach-message">
              Choose the missing word!
            </p>
          </div>
        </section>

        <section class="cvc-instruction">
          <p>
            Round <span id="cvc-round-number">1</span>
            of ${TOTAL_ROUNDS}
          </p>

          <h2>Complete the sentence</h2>

          <button
            id="cvc-listen-button"
            class="cvc-listen-button"
            type="button"
          >
            🔊 Hear the sentence
          </button>
        </section>

        <section class="cvc-question-card">
          <div
            id="cvc-picture"
            class="cvc-picture"
            aria-hidden="true"
          ></div>

          <p class="cvc-sentence">
            <span id="cvc-sentence-start"></span>

            <span class="cvc-blank">___</span>

            <span id="cvc-sentence-end"></span>
          </p>
        </section>

        <section
          id="cvc-choices"
          class="cvc-choices"
          aria-label="Word choices"
        ></section>

        <p
          id="cvc-feedback"
          class="cvc-feedback"
          aria-live="polite"
        >
          Choose one word.
        </p>
      </section>
    </main>
  `

  document
    .querySelector('#cvc-home-button')
    .addEventListener('click', () => {
      window.speechSynthesis?.cancel()
      navigate('home')
    })

  document
    .querySelector('#cvc-listen-button')
    .addEventListener('click', speakSentence)
}

function loadRound() {
  acceptingAnswer = true

  const round = rounds[currentRound]

  document.querySelector('#cvc-round-number').textContent =
    currentRound + 1

  document.querySelector('#cvc-score').textContent =
    `${score} / ${TOTAL_ROUNDS}`

  document.querySelector('#cvc-progress-bar').style.width =
    `${(currentRound / TOTAL_ROUNDS) * 100}%`

  document.querySelector('#cvc-picture').textContent =
    round.picture

  document.querySelector('#cvc-sentence-start').textContent =
    `${round.sentenceStart} `

  document.querySelector('#cvc-sentence-end').textContent =
    round.sentenceEnd

  document.querySelector('#cvc-coach-message').textContent =
    'Which word completes the sentence?'

  document.querySelector('#cvc-feedback').textContent =
    'Choose one word.'

  document.querySelector('#cvc-feedback').className =
    'cvc-feedback'

  const choicesContainer =
    document.querySelector('#cvc-choices')

  choicesContainer.innerHTML = round.choices
    .map(
      (word) => `
        <button
          class="cvc-choice"
          type="button"
          data-word="${word}"
        >
          ${word}
        </button>
      `
    )
    .join('')

  document
    .querySelectorAll('.cvc-choice')
    .forEach((button) => {
      button.addEventListener('click', () => {
        checkAnswer(button)
      })
    })

  setTimeout(speakSentence, 450)
}

function speakSentence() {
  const round = rounds[currentRound]

  if (!round) {
    return
  }

  const fullSentence =
    `${round.sentenceStart} ${round.target} ${round.sentenceEnd}`

  if (!('speechSynthesis' in window)) {
    document.querySelector('#cvc-feedback').textContent =
      fullSentence
    return
  }

  window.speechSynthesis.cancel()

  const speech =
    new SpeechSynthesisUtterance(fullSentence)

  speech.rate = 0.78
  speech.pitch = 1.03
  speech.volume = 1

  window.speechSynthesis.speak(speech)
}

function checkAnswer(button) {
  if (!acceptingAnswer) {
    return
  }

  const round = rounds[currentRound]
  const selectedWord = button.dataset.word

  const feedback =
    document.querySelector('#cvc-feedback')

  const coach =
    document.querySelector('#cvc-coach-message')

  const mascot =
    document.querySelector('#cvc-mascot')

  if (selectedWord === round.target) {
    acceptingAnswer = false
    score += 1

    button.classList.add('cvc-correct')
    mascot.classList.add('cvc-celebrate')

    feedback.textContent = 'Excellent! +1 ⭐'
    feedback.className =
      'cvc-feedback cvc-correct-feedback'

    coach.textContent =
      `${round.sentenceStart} ${round.target} ${round.sentenceEnd}`

    document.querySelector('#cvc-score').textContent =
      `${score} / ${TOTAL_ROUNDS}`

    setTimeout(() => {
      mascot.classList.remove('cvc-celebrate')
      currentRound += 1

      if (currentRound >= TOTAL_ROUNDS) {
        finishActivity()
      } else {
        loadRound()
      }
    }, 1000)
  } else {
    button.classList.add('cvc-wrong')

    feedback.textContent =
      'Almost! Listen and try again.'

    feedback.className =
      'cvc-feedback cvc-wrong-feedback'

    coach.textContent = 'You can do it!'

    setTimeout(() => {
      button.classList.remove('cvc-wrong')
    }, 500)
  }
}

function finishActivity() {
  window.speechSynthesis?.cancel()

  sessionStorage.setItem(
    'activity3Score',
    String(score)
  )

  sessionStorage.setItem(
    'activity3Complete',
    'true'
  )

  document.querySelector('#app').innerHTML = `
    <main class="cvc-game-page">
      <section class="cvc-results-window">
        <div class="cvc-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="cvc-results-mascot"
          src="${mascotPath}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 3 COMPLETE</p>

        <h1>Fantastic Sentence Building!</h1>

        <div class="cvc-final-score">
          <strong>${score}</strong>
          <span>out of ${TOTAL_ROUNDS}</span>
        </div>

        <p>
          You completed all three SORA Adventure activities!
        </p>

        <button
          id="cvc-results-button"
          class="cvc-primary-button"
          type="button"
        >
          View Results
        </button>

        <button
          id="cvc-play-again"
          class="cvc-secondary-button"
          type="button"
        >
          Play Again
        </button>
      </section>
    </main>
  `

  document
    .querySelector('#cvc-results-button')
    .addEventListener('click', () => {
      navigate('results')
    })

  document
    .querySelector('#cvc-play-again')
    .addEventListener('click', renderActivity3)
}