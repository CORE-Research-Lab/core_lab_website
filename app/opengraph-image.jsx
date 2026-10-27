import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

/**
 * The image every page shares when its link is posted (Slack, iMessage,
 * LinkedIn, …): the CORE Lab logo, the same for every page. Rendered once at
 * build time from the high-resolution logo, edge to edge at its own size, so
 * its grey background is the whole image rather than a box on another colour.
 */
export const alt = 'CORE Lab logo'
export const size = { width: 844, height: 810 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const logo = await readFile(path.join(process.cwd(), 'data/navigation/assets/core_logo-high.png'))
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex' }}>
        <img src={logoSrc} width={size.width} height={size.height} alt='' />
      </div>
    ),
    size
  )
}
