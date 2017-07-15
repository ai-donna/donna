const poke = {}

poke.isEnabled = () => {
  return (typeof(window.Storage) !== "undefined")
}

poke.get = (name) => {
  if (!poke.isEnabled()) return null
  let item = window.localStorage.getItem(name)
  if (item === null) return null
  if (item.substring(0, "json:".length) === "json:") item = JSON.parse(item.substring("json:".length))
  return item
}

poke.set = (name, value) => {
  if (!poke.isEnabled()) return false
  if (typeof value === "object") value = `json:${JSON.stringify(value)}`
  window.localStorage.setItem(name, value)
}

poke.delete = (name) => {
  if (!poke.isEnabled()) return false
  window.localStorage.removeItem(name)
}

poke.clear = () => {
  if (!poke.isEnabled()) return false
  window.localStorage.clear()
}

export default poke
