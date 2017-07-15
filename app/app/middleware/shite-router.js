const shiteRouter = (element) => {
  const init = () => {
    Array.from(element.querySelectorAll("*[data-shite-route]")).forEach(eachElement => {
      eachElement.style.display = 'none'
    })
  }
  init()
  return {
    go: route => {
      init()
      element.querySelector(`*[data-shite-route='${route}']`).style.display = 'block'
    }
  }
}


export default shiteRouter
