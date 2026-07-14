import '../styles/activity1.css'
import { navigate } from '../router.js'

const letters = ['A', 'B', 'C', 'D', 'E']
const totalRounds = 10

let currentRound = 0
let score = 0
let correctLetter = ''
let acceptingAnswer = true

export function renderActivity1() {
  currentRound = 0
  score = 0
  acceptingAnswer = true

  renderGame()
  createRound()
}

function renderGame() {
  document.querySelector('#app').innerHTML = `
    <main class="smash-page">
      <section class="smash-window">
        <header class="smash-header">
          <button
            id="smash-home-button"
            class="smash-back-button"
            type="button"
          >
            ←
          </button>

          <div class="smash-title">
            <span>SORA KIDS</span>
            <strong>Letter Smash</strong>
          </div>

          <div class="smash-score">
            <span>Score</span>
            <strong id="smash-score-value">0 / ${totalRounds}</strong>
          </div>
        </header>

        <div class="smash-progress-track">
          <div id="smash-progress-bar" class="smash-progress-bar"></div>
        </div>

        <section class="smash-coach">
          <img
            id="smash-mascot"
            class="smash-mascot"
            src="/sora-phonics-practice/mascot/cloud_smile_clean.png"
            alt="SORA mascot"
          />

          <div class="smash-speech">
            <p id="smash-coach-message">
              Listen carefully and tap the correct letter!
            </p>
          </div>
        </section>

        <section class="smash-instructions">
          <p>
            Round <span id="smash-round-number">1</span>
            of ${totalRounds}
          </p>

          <h1>Which letter did you hear?</h1>

          <button
            id="smash-sound-button"
            class="smash-sound-button"
            type="button"
          >
            🔊 Hear it again
          </button>
        </section>

        <section
          id="smash-letter-grid"
          class="smash-letter-grid"
        ></section>

        <p
          id="smash-feedback"
          class="smash-feedback"
          aria-live="polite"
        >
          Choose one letter.
        </p>
      </section>
    </main>
  `

  document
    .querySelector('#smash-home-button')
    .addEventListener('click', () => {
      navigate('home')
    })

  document
    .querySelector('#smash-sound-button')
    .addEventListener('click', speakLetter)
}

function createRound() {
  acceptingAnswer = true

  correctLetter =
    letters[Math.floor(Math.random() * letters.length)]

  const shuffledLetters = shuffle([...letters])

  document.querySelector('#smash-round-number').textContent =
    currentRound + 1

  document.querySelector('#smash-score-value').textContent =
    `${score} / ${totalRounds}`

  document.querySelector('#smash-progress-bar').style.width =
    `${(currentRound / totalRounds) * 100}%`

  document.querySelector('#smash-feedback').textContent =
    'Choose one letter.'

  document.querySelector('#smash-feedback').className =
    'smash-feedback'

  document.querySelector('#smash-coach-message').textContent =
    'Listen carefully and tap the correct letter!'

  const grid = document.querySelector('#smash-letter-grid')

  grid.innerHTML = shuffledLetters
    .map(
      (letter) => `
        <button
          class="smash-letter-button"
          type="button"
          data-letter="${letter}"
        >
          <span class="smash-letter">${letter}</span>
        </button>
      `
    )
    .join('')

  document
    .querySelectorAll('.smash-letter-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        checkAnswer(button)
      })
    })

  setTimeout(speakLetter, 400)
}

function speakLetter() {
  if (!('speechSynthesis' in window)) {
    document.querySelector('#smash-feedback').textContent =
      `Tap the letter ${correctLetter}.`
    return
  }

  window.speechSynthesis.cancel()

  const speech = new SpeechSynthesisUtterance(
    `Tap the letter ${correctLetter}`
  )

  speech.rate = 0.8
  speech.pitch = 1.05
  speech.volume = 1

  window.speechSynthesis.speak(speech)
}

function checkAnswer(button) {
  if (!acceptingAnswer) {
    return
  }

  const selectedLetter = button.dataset.letter
  const feedback = document.querySelector('#smash-feedback')
  const coachMessage = document.querySelector(
    '#smash-coach-message'
  )

  if (selectedLetter === correctLetter) {
    acceptingAnswer = false
    score += 1

    button.classList.add('smash-correct')

    feedback.textContent = 'SMASH! Great job! +1'
    feedback.className = 'smash-feedback smash-success'

    coachMessage.textContent = 'Amazing! You found it!'

    document.querySelector('#smash-score-value').textContent =
      `${score} / ${totalRounds}`

    setTimeout(() => {
      currentRound += 1

      if (currentRound >= totalRounds) {
        finishActivity()
      } else {
        createRound()
      }
    }, 850)
  } else {
    button.classList.add('smash-wrong')

    feedback.textContent = 'Almost! Try again.'
    feedback.className = 'smash-feedback smash-error'

    coachMessage.textContent = 'You can do it!'

    setTimeout(() => {
      button.classList.remove('smash-wrong')
    }, 450)
  }
}

function finishActivity() {
  sessionStorage.setItem('activity1Score', String(score))
  sessionStorage.setItem('activity1Complete', 'true')

  document.querySelector('#app').innerHTML = `
    <main class="smash-page">
      <section class="smash-results">
        <img
          class="smash-results-mascot"
          src="/sora-phonics-practice/mascot/cloud_smile_clean.png"
          alt="Happy SORA mascot"
        />

        <p class="smash-results-label">ACTIVITY COMPLETE</p>

        <h1>Fantastic Smashing!</h1>

        <div class="smash-final-score">
          <strong>${score}</strong>
          <span>out of ${totalRounds}</span>
        </div>

        <p>
          You earned ${score} stars toward your SORA reward.
        </p>

        <button
          id="smash-results-home"
          class="smash-primary-button"
          type="button"
        >
          Return Home
        </button>

        <button
          id="smash-play-again"
          class="smash-secondary-button"
          type="button"
        >
          Play Again
        </button>
      </section>
    </main>
  `

  document
    .querySelector('#smash-results-home')
    .addEventListener('click', () => {
      navigate('home')
    })

  document
    .querySelector('#smash-play-again')
    .addEventListener('click', renderActivity1)
}

function shuffle(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))

    ;[items[index], items[randomIndex]] = [
      items[randomIndex],
      items[index],
    ]
  }

  return items
}