/**
 * Squarified treemap layout (Bruls, Huizing & van Wijk, 2000).
 *
 * Pure and deterministic: given the same values it returns the same rectangles,
 * so the layout can be computed once at build time instead of measured in the
 * browser. Rectangles come back as percentages of the container, which keeps the
 * areas proportional at every width — only the tile shapes stretch if the
 * container's aspect ratio differs from `aspect`.
 */

const worstAspectRatio = (row, side) => {
  if (row.length === 0) return Infinity

  const sum = row.reduce((total, value) => total + value, 0)
  const max = Math.max(...row)
  const min = Math.min(...row)
  const sideSquared = side * side
  const sumSquared = sum * sum

  return Math.max((sideSquared * max) / sumSquared, sumSquared / (sideSquared * min))
}

/** Places one row along the shorter side and returns the leftover rectangle. */
const placeRow = (row, free, placed) => {
  const sum = row.reduce((total, item) => total + item.area, 0)
  const alongWidth = free.width >= free.height

  if (alongWidth) {
    const rowWidth = sum / free.height
    let y = free.y

    for (const item of row) {
      const height = item.area / rowWidth
      placed.push({ index: item.index, x: free.x, y, width: rowWidth, height })
      y += height
    }

    return { ...free, x: free.x + rowWidth, width: free.width - rowWidth }
  }

  const rowHeight = sum / free.width
  let x = free.x

  for (const item of row) {
    const width = item.area / rowHeight
    placed.push({ index: item.index, x, y: free.y, width, height: rowHeight })
    x += width
  }

  return { ...free, y: free.y + rowHeight, height: free.height - rowHeight }
}

/**
 * @param values positive numbers, in the order they should be laid out
 * @param aspect width/height the layout is optimised for
 * @returns one `{ index, x, y, width, height }` per value, in percent
 */
export const squarifiedTreemap = (values, { aspect = 2.4 } = {}) => {
  const total = values.reduce((sum, value) => sum + value, 0)
  if (!total) return []

  const box = { x: 0, y: 0, width: aspect, height: 1 }
  const items = values.map((value, index) => ({
    index,
    area: (value / total) * box.width * box.height,
  }))

  const placed = []
  let free = box
  let row = []

  for (const item of items) {
    const side = Math.min(free.width, free.height)
    const areas = row.map(rowItem => rowItem.area)

    if (row.length > 0 && worstAspectRatio([...areas, item.area], side) > worstAspectRatio(areas, side)) {
      free = placeRow(row, free, placed)
      row = []
    }

    row.push(item)
  }

  if (row.length > 0) placeRow(row, free, placed)

  return placed
    .sort((a, b) => a.index - b.index)
    .map(rect => ({
      index: rect.index,
      x: (rect.x / box.width) * 100,
      y: (rect.y / box.height) * 100,
      width: (rect.width / box.width) * 100,
      height: (rect.height / box.height) * 100,
    }))
}
