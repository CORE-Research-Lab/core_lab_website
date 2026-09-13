# Research Lab Website

Showcases CORE research lab!

## Structure
- **/app** – Routes for the website (`/projects`, `/projects/<slug>`, `/publications`, `/publications/<slug>`, `/team`, `/artwork`)
- **/Components** – Reusable components used across `/app`
- **/data** – Curated site content and local image assets
- **/public/photos** – Drop-in folder for the homepage photo carousel
- **/Papers** – Generated publication JSON plus Semantic Scholar sync configuration

## Tech Stack
- [React](https://reactjs.org/) with [Next.js](https://nextjs.org/)  
- JavaScript  
- [Tailwind CSS](https://tailwindcss.com/)  

## Getting Started
To run the project locally:
```bash
git clone <repo-url>
cd core_lab_website
npm install
npm run dev
```

## Adding a Project

Projects have their own page at `/projects`, listed top to bottom in the order they appear in the data, each linking to `/projects/<slug>`. Adding one takes two files.

1. Add an entry to `projectEntries` in `data/projects/index.js`. Alongside the copy and the image, it carries:
   - `people` – team **slugs**, not names. Each slug is looked up in `data/members/index.js`, so a project page links straight to the member page and can never disagree with it. An unknown slug fails the build rather than dropping someone silently. The page splits them itself: everyone outside the *Frequent Collaborators* group is listed under CORE Lab, and collaborators are listed with their institution.
   - `publications` – imported from `Papers/Projects/<slug>_papers.json`.
2. Add a `projects.<slug>` block to `Papers/semantic-scholar.config.json` naming that output file and selecting the project's papers by DOI, Semantic Scholar paper ID, or exact title. The next sync writes the JSON.

A member's institution comes from the end of their `position` ("role — Institution"). Set `institution` explicitly on the few whose position names none.

## Adding a Poster

Posters live in the *Poster Showcase* on the publications page, each with its own page at `/publications/<slug>` showing the poster, its abstract, and its citation. The venue is a free-text label on each poster, so a poster from any conference is added the same way.

1. Save the poster image (PNG or JPG, the full-resolution export is fine) in `data/publications/assets/`.
2. Add an entry to `posterItems` in `data/publications/index.js`: a `slug` for the URL, the `conference` label to show (for example `SIGCSE TS 2026`), the `title`, the imported `image`, and the `doi` if the paper has one (or an `eventUrl` for the venue's page if it has none).
3. Give it a citation. Add a selector for the paper to `posters.selectors` in `Papers/semantic-scholar.config.json`, then run `npm run sync:publications` to write it into `Papers/Posters/poster_papers.json`.
   - **The paper is on Semantic Scholar** – select it by `doi` (or `paperId`). The sync fills in authors, venue, year, abstract, and BibTeX.
   - **It is not indexed yet** – add the record to `Papers/Posters/poster_papers.json` by hand and select it by `title` in the config. For a published paper, `title`, `author`, `year`, `booktitle`, and `abstract` are enough. For a poster that is not published, give only `title`, `author`, and `year` — no venue and no `bibtex` — and its page lists the authors instead of a citation. The sync keeps a selected record it cannot find upstream, so the hand-written entry survives later runs; it prints a `Used existing poster publication` warning each time as a reminder. Once the paper is indexed, switch the selector to its DOI and the next sync replaces the record.

The website matches a poster to its citation by DOI, falling back to the exact title, so a poster without a DOI still gets its abstract and citation.

## Adding Photos

The homepage ends with a photo carousel fed straight from `public/photos/`. Drop JPG, PNG, WebP, or AVIF files in that folder and they appear on the next build (in `npm run dev`, on the next refresh). There is no data file to edit; the folder is read at build time in `lib/photos.mjs`. An empty folder hides the section.

- Photos show in filename order, so number them to set the order (`01-retreat.jpg`, `02-sigcse.jpg`).
- The filename becomes the alt text, with a leading number and any dashes or underscores dropped, so name files descriptively rather than `IMG_4821.jpg`.
- Full-size originals are fine: Next resizes them on demand. iPhone HEIC files are skipped with a warning during the build, so export those as JPG first.

The carousel shows one photo at a time in a frame sized by the screen width alone, with each photo fitted inside rather than cropped, so the page does not shift as the photos change.

## Updating Publications
Publication metadata can be synced from Semantic Scholar:

```bash
npm run sync:publications
```

Before running the sync, add `semanticScholarAuthorIds` to each director or current student who should act as a publication source in `data/members/index.js`. The team-group configuration marks those members with `publicationSource`; collaborator papers enter the archive only when they are coauthored with one of these source members.
Set `SEMANTIC_SCHOLAR_KEY` in your local environment if you have an API key; the script will still run without one, but Semantic Scholar may rate-limit unauthenticated requests.

### Local edits win

A paper already in `Papers/papers.json` is left exactly as it is. The sync only appends papers it has never seen, so corrections made by hand are safe to make directly in the JSON and survive every later run. Records are matched on DOI, then Semantic Scholar paper ID, then title — the title comparison ignores the year, so a paper that moves from preprint to proceedings is recognised as the same paper instead of returning as a duplicate.

When the API disagrees with a record we kept, the run prints a `KEPT LOCAL VERSION, UPSTREAM DIFFERS` section listing the fields. Take those changes with `--refresh`, which replaces every record with the API's version and discards all local edits — there is no per-paper override, so prefer editing the JSON by hand.

### Correcting a record

Semantic Scholar often has no venue for recent papers, which leaves them uncategorised on the homepage. Fix them on the record itself:

- **Published at a venue** – set `booktitle` (conferences) or `journal` (journals) to the venue name, and `ENTRYTYPE` to `inproceedings` or `article`. Do this for accepted papers too, as soon as the venue is known.
- **Preprint** – set `journal` to `ArXiv` (or another preprint server). It is counted under *To submit*.
- **Neither** – a record with no venue at all is counted under *Unlisted*, which is the signal that it still needs one of the above.

Venue names are matched to their acronyms by the rule list in `lib/publications.mjs`. A venue with no rule keeps its full proceedings title, so add a pattern there when a new conference shows up — otherwise a long title can reach the homepage treemap.

The sync keeps the website's existing JSON data contract:
- `Papers/papers.json` powers the publications list, search, filtering, and team pages.
- `Papers/Posters/poster_papers.json` powers poster detail citations.
- `Papers/Projects/*_papers.json` powers project publication lists.

Project and poster membership is intentionally configured by DOI, Semantic Scholar paper ID, or exact title in `Papers/semantic-scholar.config.json`. That keeps publication metadata automated while preserving curated website grouping.

Useful checks:

```bash
npm run sync:publications -- --dry-run
npm run sync:publications -- --from-file Papers/papers.json --dry-run
```

## Homepage Venue Treemap

The "Where we publish" treemap on the homepage is derived from `Papers/papers.json` at build time, so it updates on its own whenever publications are synced — tile areas, ranking, colours, and the totals beside it all come from the same list as the headline publication count.

Two constants set how much it shows:

- `venueRamp` in `Components/Home/VenueTreemap.jsx` caps how many venues can be named; everything else pools into *Other venues*. Its steps are a validated ordinal ramp (monotone lightness, a visible step between neighbours, and a label colour clearing 4.5:1 on each fill), and the light end already sits at the edge of what the card surface allows — adding a step means re-stepping the whole ramp, not appending one.
- `layouts` in the same file holds one squarified solve per breakpoint. A treemap is solved for a single aspect ratio and tile count, so phones name six venues and wider screens name eight; at phone width a 2.5% tile is about 44px across, too small to hold a label.
