# Aksent

AKSENT is a custom React + Vite website (not WordPress). Content is implemented as React components and project data in the codebase.

## Latest production build

`npm run build` generates the production-ready site into `dist/`.
This repo currently outputs updated artifacts under `dist/` after running the build.

## Web pages (high level)

Routes are defined in `src/App.jsx`:

- `/` -> `src/pages/Home.jsx`
  - Selected work grid
  - "What we do" (lime section)
  - "Trusted by" logo strip
  - CTA to contact
- `/work` -> `src/pages/Work.jsx`
  - "Our Work" page hero
  - Inline capability filters:
    - Campaign Communication
    - Knowledge Publications
    - Brand Systems
    - Institutional Platforms
  - Project grid filtered by each project's primary capability
- `/work/:slug` -> `src/pages/WorkProject.jsx`
  - Project image viewer (next/prev)
  - Project title + description
- `/about` -> `src/pages/About.jsx`
  - About hero (moving background image carousel)
  - Studio copy + stats
- `/contact` -> `src/pages/Contact.jsx`
  - Contact phone/email/address and supporting CTA

Note: `src/pages/Forum.jsx`, `src/pages/Studio.jsx`, and `src/pages/Systems.jsx` exist as pages, but they are not currently wired in `src/App.jsx`.

## Component + folder structure

Key folders:

- `src/components/`
  - `Header.jsx` / `Header.css` (site navigation + responsive logo)
  - `Footer.jsx` / `Footer.css` (site footer + address)
  - `Layout.jsx` (page chrome: header + footer + routed content via `Outlet`)
- `src/pages/`
  - `Home.jsx`, `Work.jsx`, `WorkProject.jsx`, `About.jsx`, `Contact.jsx`
  - page-level CSS modules imported per page (e.g. `Work.css`, `About.css`)
- `src/data/`
  - `projects.js`
    - `PROJECTS` array drives the Work grid + WorkProject image viewer
    - some projects include `primaryCapability` for correct anchor/category placement
- `public/`
  - Static assets served by Vite
  - `public/projects/<slug>/` holds project images
  - `public/client-logos/` holds "Trusted by" logo images
- `dist/`
  - Production build output (generated; not source-controlled)

## Data-driven projects

`src/data/projects.js` exports `PROJECTS` and helper `getProjectBySlug(slug)`.

Each project has:
- `slug`
- `title`
- `description`
- `images` (ordered list of image URLs under `/projects/<slug>/...`)
- optional `primaryCapability` (used for filtering + the card category label)

## Development / build

Prerequisites: Node.js.

Commands:

- Install dependencies:
  - `npm install`
- Start dev server:
  - `npm run dev`
- Build production output:
  - `npm run build`
- Preview production build:
  - `npm run preview`

## Backend (CMS-style content)

This repo includes a lightweight backend API for managing:

- projects (title/description/primaryCapability + image URLs)
- client logos (name + image URL)

The backend stores data in `backend/data.json` and supports file uploads into `aksent/public/uploads/`.

### Run backend locally

In one terminal:

- `cd backend`
- `AKSENT_ADMIN_TOKEN=devtoken PORT=3001 npm run start`

In another terminal (frontend):

- `cd aksent`
- `npm run dev`

Vite proxies `/api/*` to `http://localhost:3001`.

### API overview

Public (no auth):

- `GET /api/projects`
- `GET /api/projects/:slug`
- `GET /api/client-logos`

Admin (requires `Authorization: Bearer <AKSENT_ADMIN_TOKEN>`):

- `POST /api/projects`
- `PUT /api/projects/:slug`
- `DELETE /api/projects/:slug`
- `POST /api/projects/:slug/images` (multipart form field `file`)
- `POST /api/client-logos` (JSON `{ name, logo }`)
- `POST /api/client-logos/upload` (multipart form fields `name`, `file`)
- `DELETE /api/client-logos?name=...`

## Notes

- The site is deployed as a static frontend build (Vite `dist/`).
- The backend provides CMS-style content editing; the frontend loads projects/logos from the API.
