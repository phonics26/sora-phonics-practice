import './style.css'

import {
  navigate,
  registerPage,
} from './router.js'

import { renderActivity1 } from './pages/Activity1.js'

const app = document.querySelector('#app')

if (!app) {
  throw new Error(
    'The #app element was not found. Check index.html.'
  )
}

function renderTestHome() {
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

        <p class="setup-test-brand">SORA KIDS</p>

        <h1>Activity 1 Test</h1>

        <p>
          Press the button to test the soccer game.
        </p>

        <button
          id="open-activity-button"
          type="button"
        >
          Open Letter Goal
        </button>
      </section>
    </main>
  `

  document
    .querySelector('#open-activity-button')
    .addEventListener('click', () => {
      navigate('activity1')
    })
}

registerPage('home', renderTestHome)
registerPage('activity1', renderActivity1)

navigate('home')