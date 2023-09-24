export const getArrayIndexes = (length, limit, offet) => {
  let pages = Math.ceil(length / limit)
  let from = (offet - 1) * limit
  let to = (offet === pages ? length : from + limit) - 1

  return { from, to }
}
