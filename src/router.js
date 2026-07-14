import { renderHomePage } from './pages/HomePage.js'
import { renderActivity1 } from './pages/Activity1.js'

const pages = {
  home: renderHomePage,
  activity1: renderActivity1,
}

export function navigate(pageName) {
  const renderPage = pages[pageName]

  if (typeof renderPage !== 'function') {
    console.error(`Cannot open page: ${pageName}`)
    return
  }

  window.scrollTo(0, 0)
  renderPage()
}