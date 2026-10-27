import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

/**
 * The image every page shares when its link is posted (Slack, iMessage,
 * LinkedIn, …): the CORE Lab logo on a white square, the same for every page.
 * Rendered once at build time.
 *
 * The logo file is 88×88, and several previewers skip images under 200px, so
 * it is drawn larger on a 400×400 canvas. Swap in a larger original of
 * `core_logo.png` and it sharpens without any other change.
 */
export const alt = 'CORE Lab logo'
export const size = { width: 400, height: 400 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const logo = await readFile(path.join(process.cwd(), 'data/navigation/assets/core_logo.png'))
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
        }}
      >
        <img src={logoSrc} width={300} height={300} alt='' />
      </div>
    ),
    size
  )
}
