# Homepage photos

Drop photos in this folder and they appear in the photo album at the end of
the homepage, one photo per page. Nothing else to edit.

- JPG, PNG, WebP, or AVIF. iPhone HEIC files need exporting as JPG first.
- Use lowercase, hyphen-separated names: event, year when known, then a short
  description (for example `iticse-2026-replication-studies-talk.jpg`). Use `.jpg`
  for JPEGs and lowercase extensions for all formats.
- Full-size originals are fine; the site resizes them on the fly. Each photo gets
  a print cut to its own shape, so portrait and landscape shots both work and
  nothing is cropped. Landscape photos print largest.
- They show in a random order, reshuffled on every visit.
- The filename becomes the image's alt text and its handwritten caption (`02-sigcse-2026-booth.jpg` reads as
  "sigcse 2026 booth"), so a short descriptive name beats `IMG_4821.jpg`.
- In `npm run dev` a new photo shows on the next page refresh. The live site
  picks it up on the next build.
