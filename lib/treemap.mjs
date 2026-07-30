import { hierarchy, treemap, treemapSquarify } from 'd3-hierarchy'

/**
 * Squarified treemap layout (Bruls, Huizing & van Wijk, 2000), by way of
 * `d3-hierarchy`.
 *
 * Pure and deterministic: given the same values it returns the same rectangles,
 * so the layout can be computed once at build time instead of measured in the
 * browser. Rectangles come back as percentages of the container, which keeps the
 * areas proportional at every width — only the tile shapes stretch if the
 * container's aspect ratio differs from `aspect`.
 *
 * Two knobs here look like the same thing and are not. `aspect` is the shape of
 * the whole board, passed as the layout's `size` so tiles are solved for the
 * box they'll actually be drawn in. d3's own `ratio` is the shape each
 * individual tile aims for, and is pinned to 1 — the paper squarifies toward
 * squares, while d3 defaults to the golden ratio.
 */

const TILE = treemapSquarify.ratio(1)

/**
 * @param values positive numbers, in the order they should be laid out
 * @param aspect width/height the layout is optimised for
 * @returns one `{ index, x, y, width, height }` per value, in percent
 */
export const squarifiedTreemap = (values, { aspect = 2.4 } = {}) => {
  const total = values.reduce((sum, value) => sum + value, 0)
  if (!total) return []

  // `sum` is what gives the leaves their area, so it has to run before the
  // layout. No `sort`: the caller has already ordered the values, and d3 would
  // otherwise be free to reorder them out from under the colour ramp, which is
  // indexed by position.
  const root = hierarchy({
    children: values.map((value, index) => ({ index, value })),
  }).sum(node => node.value)

  treemap().tile(TILE).size([aspect, 1]).round(false)(root)

  return root
    .leaves()
    .map(leaf => ({
      index: leaf.data.index,
      x: (leaf.x0 / aspect) * 100,
      y: leaf.y0 * 100,
      width: ((leaf.x1 - leaf.x0) / aspect) * 100,
      height: (leaf.y1 - leaf.y0) * 100,
    }))
    .sort((a, b) => a.index - b.index)
}
