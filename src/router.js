const pages = {}

export function registerPage(pageName, renderFunction) {
  if (typeof renderFunction !== 'function') {
    console.error(
      `Cannot register "${pageName}". The page must be a function.`
    )
    return
  }

  pages[pageName] = renderFunction
}

export function navigate(pageName) {
  const renderPage = pages[pageName]

  if (typeof renderPage !== 'function') {
    console.error(`Page not found: ${pageName}`)
    return
  }

  window.scrollTo(0, 0)
  renderPage()
}