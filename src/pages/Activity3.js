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
    sentenceEnd: 'can run.',
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

let draggedWord = null
let dragClone = null
let originalRectangle = null
let pointerOffsetX = 0
let pointerOffsetY = 0
let currentSentenceAudio = null

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
  const app = document.querySelector('#app')

  app.innerHTML = `
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
            <h1>Word Builder</h1>
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
              Drag the correct word into the blank!
            </p>
          </div>
        </section>

        <section class="cvc-instruction">
          <p>
            Round
            <span id="cvc-round-number">1</span>
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

            <span
              id="cvc-drop-zone"
              class="cvc-drop-zone"
            >
              Drop here
            </span>

            <span id="cvc-sentence-end"></span>
          </p>
        </section>

        <p class="cvc-drag-instruction">
          Touch and drag one word into the blank.
        </p>

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
          Drag one word into the blank.
        </p>
      </section>
    </main>
  `

  document
    .querySelector('#cvc-home-button')
    .addEventListener('click', () => {
      cancelSpeech()
      cleanUpDrag()
      navigate('home')
    })

  document
    .querySelector('#cvc-listen-button')
    .addEventListener('click', speakMissingSentence)
}

function loadRound() {
  cleanUpDrag()
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
    ` ${round.sentenceEnd}`

  document.querySelector('#cvc-coach-message').textContent =
    'Drag the correct word into the blank!'

  const feedback = document.querySelector('#cvc-feedback')

  feedback.textContent =
    'Drag one word into the blank.'

  feedback.className = 'cvc-feedback'

  const dropZone = document.querySelector('#cvc-drop-zone')

  dropZone.textContent = 'Drop here'
  dropZone.className = 'cvc-drop-zone'

  const choicesContainer =
    document.querySelector('#cvc-choices')

  choicesContainer.innerHTML = round.choices
    .map(
      (word) => `
        <button
          class="cvc-choice"
          type="button"
          data-word="${word}"
          aria-label="Drag the word ${word}"
        >
          ${word}
        </button>
      `
    )
    .join('')

  document
    .querySelectorAll('.cvc-choice')
    .forEach((button) => {
      button.addEventListener(
        'pointerdown',
        startDrag
      )
    })

  window.setTimeout(speakMissingSentence, 450)
}

function startDrag(event) {
  if (!acceptingAnswer || draggedWord) {
    return
  }

  event.preventDefault()

  draggedWord = event.currentTarget
  originalRectangle =
    draggedWord.getBoundingClientRect()

  pointerOffsetX =
    event.clientX - originalRectangle.left

  pointerOffsetY =
    event.clientY - originalRectangle.top

  dragClone = draggedWord.cloneNode(true)

  dragClone.classList.add('cvc-drag-clone')

  dragClone.style.width =
    `${originalRectangle.width}px`

  dragClone.style.height =
    `${originalRectangle.height}px`

  document.body.appendChild(dragClone)

  draggedWord.classList.add('cvc-choice-placeholder')

  moveClone(event.clientX, event.clientY)

  window.addEventListener(
    'pointermove',
    handlePointerMove
  )

  window.addEventListener(
    'pointerup',
    handlePointerUp,
    { once: true }
  )

  window.addEventListener(
    'pointercancel',
    handlePointerCancel,
    { once: true }
  )
}

function handlePointerMove(event) {
  if (!dragClone) {
    return
  }

  event.preventDefault()

  moveClone(event.clientX, event.clientY)

  const dropZone =
    document.querySelector('#cvc-drop-zone')

  if (
    isPointInsideElement(
      event.clientX,
      event.clientY,
      dropZone
    )
  ) {
    dropZone.classList.add(
      'cvc-drop-zone-active'
    )
  } else {
    dropZone.classList.remove(
      'cvc-drop-zone-active'
    )
  }
}

function handlePointerUp(event) {
  window.removeEventListener(
    'pointermove',
    handlePointerMove
  )

  const dropZone =
    document.querySelector('#cvc-drop-zone')

  dropZone.classList.remove(
    'cvc-drop-zone-active'
  )

  const droppedInside =
    isPointInsideElement(
      event.clientX,
      event.clientY,
      dropZone
    )

  if (droppedInside && draggedWord) {
    checkDroppedWord(draggedWord)
  } else {
    returnWordToChoices()
  }
}

function handlePointerCancel() {
  window.removeEventListener(
    'pointermove',
    handlePointerMove
  )

  returnWordToChoices()
}

function moveClone(clientX, clientY) {
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
  const rectangle = element.getBoundingClientRect()

  return (
    clientX >= rectangle.left &&
    clientX <= rectangle.right &&
    clientY >= rectangle.top &&
    clientY <= rectangle.bottom
  )
}

function checkDroppedWord(button) {
  const round = rounds[currentRound]
  const selectedWord = button.dataset.word

  const dropZone =
    document.querySelector('#cvc-drop-zone')

  const feedback =
    document.querySelector('#cvc-feedback')

  const coach =
    document.querySelector('#cvc-coach-message')

  const mascot =
    document.querySelector('#cvc-mascot')

  if (selectedWord === round.target) {
    acceptingAnswer = false
    score += 1

    removeDragClone()

    button.classList.remove(
      'cvc-choice-placeholder'
    )

    button.classList.add('cvc-correct')

    dropZone.textContent = round.target

    dropZone.classList.add(
      'cvc-drop-zone-correct'
    )

    feedback.textContent = 'Excellent! +1 ⭐'

    feedback.className =
      'cvc-feedback cvc-correct-feedback'

    coach.textContent =
      `${round.sentenceStart} ${round.target} ${round.sentenceEnd}`

    mascot.classList.add('cvc-celebrate')

    document.querySelector('#cvc-score').textContent =
      `${score} / ${TOTAL_ROUNDS}`

    speakCompletedSentence(round)

    draggedWord = null
    originalRectangle = null

    window.setTimeout(() => {
      mascot.classList.remove('cvc-celebrate')

      currentRound += 1

      if (currentRound >= TOTAL_ROUNDS) {
        finishActivity()
      } else {
        loadRound()
      }
    }, 1300)
  } else {
    removeDragClone()

    button.classList.remove(
      'cvc-choice-placeholder'
    )

    button.classList.add('cvc-wrong')

    dropZone.classList.add(
      'cvc-drop-zone-wrong'
    )

    feedback.textContent =
      'Almost! Try another word.'

    feedback.className =
      'cvc-feedback cvc-wrong-feedback'

    coach.textContent = 'Try again!'

    draggedWord = null
    originalRectangle = null

    window.setTimeout(() => {
      button.classList.remove('cvc-wrong')

      dropZone.classList.remove(
        'cvc-drop-zone-wrong'
      )
    }, 550)
  }
}

function returnWordToChoices() {
  if (!draggedWord || !dragClone) {
    cleanUpDrag()
    return
  }

  dragClone.classList.add(
    'cvc-drag-returning'
  )

  dragClone.style.left =
    `${originalRectangle.left}px`

  dragClone.style.top =
    `${originalRectangle.top}px`

  window.setTimeout(() => {
    if (draggedWord) {
      draggedWord.classList.remove(
        'cvc-choice-placeholder'
      )
    }

    cleanUpDrag()
  }, 220)
}

function removeDragClone() {
  if (dragClone) {
    dragClone.remove()
    dragClone = null
  }
}

function cleanUpDrag() {
  window.removeEventListener(
    'pointermove',
    handlePointerMove
  )

  removeDragClone()

  if (draggedWord) {
    draggedWord.classList.remove(
      'cvc-choice-placeholder'
    )
  }

  draggedWord = null
  originalRectangle = null
}

function speakMissingSentence() {
  const round = rounds[currentRound]

  if (!round) {
    return
  }

  playSentenceRecording(round.target, 'prompt')
}

function speakCompletedSentence(round) {
  playSentenceRecording(round.target, 'complete')
}

function playSentenceRecording(target, version) {
  cancelSpeech()

  const recordingPath =
    `${import.meta.env.BASE_URL}audio/sentences/${target}-${version}.wav`

  currentSentenceAudio = new Audio(recordingPath)
  currentSentenceAudio.preload = 'auto'
  currentSentenceAudio.volume = 1

  currentSentenceAudio.addEventListener('ended', () => {
    currentSentenceAudio = null
  }, { once: true })

  currentSentenceAudio.play().catch(() => {
    currentSentenceAudio = null
  })
}

function cancelSpeech() {
  if (currentSentenceAudio) {
    currentSentenceAudio.pause()
    currentSentenceAudio.currentTime = 0
    currentSentenceAudio = null
  }
}

function finishActivity() {
  cancelSpeech()
  cleanUpDrag()

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

        <h1>Fantastic Word Building!</h1>

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
          🎁 View My Rewards
        </button>

        <button
          id="cvc-play-again"
          class="cvc-secondary-button"
          type="button"
        >
          🔄 Play Again
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
    .addEventListener(
      'click',
      renderActivity3
    )
}
