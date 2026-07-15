import './style.css'

import {
  navigate,
  registerPage,
} from './router.js'

import { renderActivity1 } from './pages/Activity1.js'
import { renderActivity2 } from './pages/Activity2.js'

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

        <p class="setup-test-brand">SORA ADVENTURE</p>

        <h1>Activity Test Page</h1>

        <p>
          Test both activities before we create Activity 3.
        </p>

        <button
          id="open-activity-one"
          type="button"
        >
          Open Letter Goal
        </button>

        <button
          id="open-activity-two"
          type="button"
        >
          Open Animal Match
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
}

registerPage('home', renderTestHome)
registerPage('activity1', renderActivity1)
registerPage('activity2', renderActivity2)

navigate('home')