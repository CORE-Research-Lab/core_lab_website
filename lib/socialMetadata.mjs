/**
 * Link-preview metadata (Open Graph and Twitter cards) for a page, so a shared
 * link shows that page's own picture: a profile photo, a project image, a
 * poster. Without a usable image the page uses the site-wide CORE Lab card
 * from app/opengraph-image.jsx.
 *
 * `image` is a static image import ({ src, width, height }). SVGs are skipped:
 * Slack, LinkedIn, and most other previewers do not render them, and the
 * default profile placeholder is one.
 *
 * `square` suits a portrait or logo, which previewers show as a thumbnail
 * beside the text rather than a wide banner above it.
 */
// Previewers cap image size (LinkedIn at about 5 MB) and some originals here
// are larger, so a preview points at the site's image optimizer at this width
// instead of the full file. 1200 is one of Next's default widths and 75 its
// only allowed quality (anything else is refused with a 400); a smaller
// original is served at its own size.
const previewWidth = 1200

const previewImage = (image, alt) => {
  const scale = Math.min(1, previewWidth / image.width)
  return {
    url: `/_next/image?url=${encodeURIComponent(image.src)}&w=${previewWidth}&q=75`,
    width: Math.round(image.width * scale),
    height: Math.round(image.height * scale),
    alt,
  }
}

// Spelled out rather than inherited: a page that sets its own preview details
// no longer picks up app/opengraph-image.jsx on its own.
const siteCard = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'CORE Lab: Computational Research and Education at the University of Toronto and McMaster University',
}

export const socialMetadata = ({ title, description, image, imageAlt, square = false }) => {
  const usable = image?.src && !String(image.src).toLowerCase().endsWith('.svg')
  const images = [usable ? previewImage(image, imageAlt || title) : siteCard]
  const isSquareImage = usable && square

  return {
    openGraph: {
      title,
      description,
      siteName: 'CORE Lab',
      type: 'website',
      images,
    },
    twitter: {
      card: isSquareImage ? 'summary' : 'summary_large_image',
      title,
      description,
      images: images.map(entry => entry.url),
    },
  }
}
