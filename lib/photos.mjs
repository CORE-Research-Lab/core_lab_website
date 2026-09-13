import { readdir } from 'node:fs/promises'
import path from 'node:path'

/**
 * The homepage photo carousel is fed straight from a folder: drop image files
 * into `public/photos/` and they show up, in filename order, with no data file
 * to edit. This lists that folder on the server at build time.
 *
 * The folder lives in `public` rather than `data` because the photos are
 * served by URL instead of imported, which is what lets the list be discovered
 * instead of declared. Next's image optimizer still resizes them on demand, so
 * full-size originals are fine to drop in.
 */

const photoDirectory = path.join(process.cwd(), 'public', 'photos')
const photoUrlBase = '/photos'

// What the image optimizer can read. HEIC, straight off an iPhone, is not on
// the list, so those need exporting as JPG first.
const photoExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

// Housekeeping files that live in the folder on purpose.
const ignoredFiles = new Set(['README.md', '.gitkeep'])

// Natural order, so `photo-2` comes before `photo-10`.
const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })

/**
 * Alt text from the filename: `03_lab-retreat 2025.jpg` reads as
 * "lab retreat 2025". A leading number is taken as ordering, not meaning.
 */
export const describePhoto = (filename) => {
  const name = path
    .parse(filename)
    .name.replace(/^\d+[\s_-]+/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  // A camera or upload name (IMG 4307, a timestamp, a hash) says nothing worth
  // reading out, so it gets the generic text instead.
  const meaningless = /^(?:\d*|[0-9a-f]{16,}|(?:img|dsc|dscf|pxl|image|photo)[\s\d]*)$/i

  return meaningless.test(name) ? 'Lab photo' : name
}

export async function getLabPhotos() {
  let entries
  try {
    entries = await readdir(photoDirectory, { withFileTypes: true })
  } catch (error) {
    if (error.code === 'ENOENT') return []
    throw error
  }

  const names = entries
    .filter((entry) => entry.isFile() && !entry.name.startsWith('.') && !ignoredFiles.has(entry.name))
    .map((entry) => entry.name)
    .sort(collator.compare)

  const photos = names.filter((name) => photoExtensions.has(path.extname(name).toLowerCase()))

  for (const name of names) {
    if (!photos.includes(name)) {
      console.warn(`[photos] Skipping public/photos/${name}: not a JPG, PNG, WebP, or AVIF image.`)
    }
  }

  return photos.map((name) => ({
    src: `${photoUrlBase}/${encodeURIComponent(name)}`,
    alt: describePhoto(name),
  }))
}
