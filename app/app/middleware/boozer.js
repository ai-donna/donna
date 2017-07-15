const element = document.createElement("SPAN")

const publish = (name, detail) => {
  element.dispatchEvent(new CustomEvent(`pub-sub-event-${name}`, {detail}))
}

const subscribe = (name, handler) => {
  const logic = e => handler(e.detail)
  element.addEventListener(`pub-sub-event-${name}`, logic, false)
  return {
    unsubscribe: () => element.removeEventListener(`pub-sub-event-${name}`, logic)
  }
}

const boozer = {
  publish,
  subscribe
}

export default boozer
