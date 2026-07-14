import { renderHomePage } from './pages/HomePage.js'
import { renderActivity1 } from './pages/Activity1.js'

const pages = {
  home: renderHomePage,
  activity1: renderActivity1,
}

export function navigate(pageName) {
  const page = pages[pageName]

  if (typeof page !== 'function') {
    console.error(`Page not found: ${pageName}`)
    return
  }

  window.scrollTo(0, 0)
  page()
}