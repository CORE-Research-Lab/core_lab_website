# Research Lab Website

Showcases CORE research lab!

## Structure
- **/app** – Routes for the website (`/research`, `/research/project/<slug>`, `/team`, `/artwork`)
- **/Components** – Reusable components used across `/app`
- **/data** – Curated site content and local image assets
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

Projects live on the research page: a looping rail of project cards above the posters and papers, each linking to `/research/project/<slug>`. Adding one takes two files.

1. Add an entry to `projectEntries` in `data/projects/index.js`. Alongside the copy and the image, it carries:
   - `people` – team **slugs**, not names. Each slug is looked up in `data/members/index.js`, so a project page links straight to the member page and can never disagree with it. An unknown slug fails the build rather than dropping someone silently. The page splits them itself: everyone outside the *Frequent Collaborators* group is listed under CORE Lab, and collaborators are listed with their institution.
   - `publications` – imported from `Papers/Projects/<slug>_papers.json`.
2. Add a `projects.<slug>` block to `Papers/semantic-scholar.config.json` naming that output file and selecting the project's papers by DOI, Semantic Scholar paper ID, or exact title. The next sync writes the JSON.

A member's institution comes from the end of their `position` ("role — Institution"). Set `institution` explicitly on the few whose position names none.

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
