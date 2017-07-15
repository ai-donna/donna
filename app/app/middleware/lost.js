import Navigo from 'navigo'

const lost = (routes, beforeHook) => {
  if (beforeHook === undefined) beforeHook = () => { return false }
  let currentRouteElement = null
  const routerRoot = null
  const routerUseHash = true
  const routerHash = '#!'
  if (window.location.hash.length === 0) {
    window.location = `/${routerHash}`
  }
  const router = new Navigo(routerRoot, routerUseHash, routerHash)
  const doNavigate = (route) => {
    router.navigate(`/${route}`)
  }
  const doRender = (route, parameters) => {
    if (currentRouteElement !== null) {
      document.body.removeChild(currentRouteElement)
    }
    currentRouteElement = document.createElement(route)
    Object.keys(parameters || {}).forEach(
      parameter => currentRouteElement.setAttribute(parameter, parameters[parameter])
    )
    document.body.appendChild(currentRouteElement)
    if (currentRouteElement.shadowRoot === null) {
      console.warn(`appended element ${route} but it isn't a custom element (no shadowRoot)!`)
      return
    }
    currentRouteElement.shadowRoot.querySelectorAll("[data-donna-route]").forEach(routeLink => {
      if (routeLink.dataset.hasOwnProperty("hRoute")) {
        // A - USE HREF
        if (routeLink.tagName === "A") {
          const route = routeLink.getAttribute("href")
          routeLink.setAttribute("href", "javascript:void(0)")
          routeLink.addEventListener('click', e => {
            e.preventDefault()
            doNavigate(route)
          })
        }
        // INPUT/BUTTON - USE DATA ATTRIBUTE
        if (routeLink.tagName === "INPUT" || routeLink.tagName === "BUTTON") {
          const route = routeLink.dataset.hRoute
          routeLink.addEventListener('click', e => {
            e.preventDefault()
            doNavigate(route)
          })
        }
      }
    })
  }
  router.hooks({
    before: (done, parameters) => {
      const route = beforeHook(done, parameters)
      if (typeof route === 'string') {
        done(false)
        doNavigate(route)
      } else {
        return done()
      }
    }
  })
  Object.keys(routes).forEach(route => {
    router.on(route, parameters => doRender(routes[route], parameters))
  })
  router.notFound(query => {
    if (Object.keys(routes).includes('not-found') === false) {
      return console.warn('no `not found` route specified! you are seeing a blank page')
    }
    return doRender(routes['not-found'])
  })
  router.resolve()
  return {
    go: (route) => {
      return doNavigate(route)
    }
  }
}

export default lost
