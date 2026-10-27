import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

/**
 * The CORE Lab card shown when a link to the site is shared (Slack, iMessage,
 * LinkedIn, …). Pages with an image of their own — a profile photo, a project
 * image, a poster — use that instead; see lib/socialMetadata.mjs. Rendered
 * once at build time.
 */
export const alt = 'CORE Lab: Computational Research and Education at the University of Toronto and McMaster University'
export const size = { width: 1200, height: 630 }
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
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #00172f 0%, #0b3a72 100%)',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <img src={logoSrc} width={112} height={112} alt='' style={{ borderRadius: 9999 }} />
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -1 }}>CORE Lab</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 44, fontWeight: 600, lineHeight: 1.2, maxWidth: 980 }}>
            Computational Research and Education
          </div>
          <div style={{ fontSize: 30, color: '#c7d7ec', lineHeight: 1.35, maxWidth: 980 }}>
            How people learn, teach, and work in computationally driven fields, and the adaptive AI
            systems that support them.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#c7d7ec' }}>
          <span>University of Toronto · McMaster University</span>
          <span>computationalresearch.ca</span>
        </div>
      </div>
    ),
    size
  )
}
