# Research Lab Website

Showcases CORE research lab!

## Structure
- **/app** – Routes for the website (`/projects`, `/publications`, `/team`)
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

## Updating Publications
Publication metadata can be synced from Semantic Scholar:

```bash
npm run sync:publications
```

Before running the sync, add `semanticScholarAuthorIds` to each director or current student who should act as a publication source in `data/members/index.js`. The team-group configuration marks those members with `publicationSource`; collaborator papers enter the archive only when they are coauthored with one of these source members.
The publication JSON is regenerated from those Semantic Scholar author IDs, so legacy local bibliography records are not preserved automatically.
Set `SEMANTIC_SCHOLAR_KEY` in your local environment if you have an API key; the script will still run without one, but Semantic Scholar may rate-limit unauthenticated requests.

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
