import './style.css'

import {
  navigate,
  registerPage,
} from './router.js'

import { renderLoginPage } from './pages/LoginPage.js'
import { renderActivity1 } from './pages/Activity1.js'
import { renderActivity2 } from './pages/Activity2.js'
import { renderActivity3 } from './pages/Activity3.js'
import { renderResultsPage } from './pages/ResultsPage.js'

const app = document.querySelector('#app')

if (!app) {
  throw new Error(
    'The #app element was not found. Check index.html.'
  )
}

function renderTemporaryHome() {
  const playerMode =
    sessionStorage.getItem('soraPlayerMode')

  const parentEmail =
    sessionStorage.getItem('soraParentEmail')

  app.innerHTML = `
    <main class="setup-test-page">
      <section class="setup-test-card">
        <img
          class="setup-test-mascot"
          src="${
            import.meta.env.BASE_URL
          }mascot/cloud_smile_clean.png"
          alt="SORA mascot"
        />

        <p class="setup-test-brand">
          SORA ADVENTURE
        </p>

        <h1>Choose an Activity</h1>

        <p>
          ${
            playerMode === 'email'
              ? `Parent email saved: ${parentEmail}`
              : 'Playing as a guest'
          }
        </p>

        <button id="open-activity-one" type="button">
          1. Letter Goal
        </button>

        <button id="open-activity-two" type="button">
          2. Animal Match
        </button>

        <button id="open-activity-three" type="button">
          3. Word Builder
        </button>

        <button id="return-to-login" type="button">
          Return to Parent Entry
        </button>
      </section>
    </main>
  `

  document
    .querySelector('#open-activity-one')
    .addEventListener('click', () => {
      navigate('activity1')
    })

  document
    .querySelector('#open-activity-two')
    .addEventListener('click', () => {
      navigate('activity2')
    })

  document
    .querySelector('#open-activity-three')
    .addEventListener('click', () => {
      navigate('activity3')
    })

  document
    .querySelector('#return-to-login')
    .addEventListener('click', () => {
      navigate('login')
    })
}

registerPage('login', renderLoginPage)
registerPage('home', renderTemporaryHome)
registerPage('activity1', renderActivity1)
registerPage('activity2', renderActivity2)
registerPage('activity3', renderActivity3)
registerPage('results', renderResultsPage)

navigate('login')