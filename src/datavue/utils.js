export const getArrayIndexes = (length, limit, offet) => {
  let pages = Math.ceil(length / limit)
  let from = (offet - 1) * limit
  let to = (offet === pages ? length : from + limit) - 1

  return { from, to }
}

const getParams = () => new URLSearchParams(window.location.search)

export const addToHistory = (key, value) => {
  let params = getParams()
  params.set(key, value)
  history.pushState({}, '', `?${params.toString()}`)
}

export const getFromHistory = (val, defaultValue = null) => {
  let params = getParams()
  let value = params.has(val) ? params.get(val) : defaultValue
  return isNaN(value) ? value : parseInt(value)
}
