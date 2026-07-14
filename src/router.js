export function navigate(pageName) {
  const page = pages[pageName]

  if (typeof page !== 'function') {
    console.error(`Page not found: ${pageName}`)
    return
  }

  window.scrollTo(0, 0)
  page()
}