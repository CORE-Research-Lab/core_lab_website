# Homepage photos

Drop photos in this folder and they appear in the carousel at the end of the
homepage. Nothing else to edit.

- JPG, PNG, WebP, or AVIF. iPhone HEIC files need exporting as JPG first.
- Full-size originals are fine; the site resizes them on the fly. Landscape
  photos fill the frame best; portrait ones are fitted inside it, not cropped.
- They show in filename order, so number them to set the order: `01-retreat.jpg`, `02-sigcse.jpg`, ...
- The filename becomes the image's alt text (`02-sigcse-2026-booth.jpg` reads as
  "sigcse 2026 booth"), so a short descriptive name beats `IMG_4821.jpg`.
- In `npm run dev` a new photo shows on the next page refresh. The live site
  picks it up on the next build.
