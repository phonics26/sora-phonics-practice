import './style.css'

import {
  navigate,
  registerPage,
} from './router.js'

import { renderActivity1 } from './pages/Activity1.js'
import { renderActivity2 } from './pages/Activity2.js'
import { renderActivity3 } from './pages/Activity3.js'
import { renderResultsPage } from './pages/ResultsPage.js'
import { renderHomePage } from './pages/HomePage.js'

const app = document.querySelector('#app')

if (!app) {
  throw new Error(
    'The #app element was not found. Check index.html.'
  )
}

registerPage('home', renderHomePage)
registerPage('activity1', renderActivity1)
registerPage('activity2', renderActivity2)
registerPage('activity3', renderActivity3)
registerPage('results', renderResultsPage)

navigate('home')
