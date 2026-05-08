# Aksent2

AKSENT is a React + Vite website (`aksent/`) with a lightweight CMS-style backend (`backend/`) for managing **Projects** and **Client logos**.

## Run locally (recommended)

In one terminal (backend API + admin):

```bash
cd backend
npm install
AKSENT_ADMIN_TOKEN=devtoken PORT=3001 npm run start
```

In another terminal (frontend):

```bash
cd aksent
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`
- Admin dashboard: `http://localhost:3001/admin/admin.html`

## Backend (CMS-style content)

### What it manages

- **Projects**: `slug`, `title`, `description`, optional `primaryCapability`, and `images[]`
- **Client logos**: `{ name, logo }`

### Where data is stored

- **Data file**: `backend/data.json` (override with `AKSENT_DATA_PATH`)
- **Uploads**: `aksent/public/uploads/` (override with `AKSENT_UPLOADS_DIR`)

Uploads are served under `/uploads/...` (e.g. `/uploads/projects/<slug>/file.jpg`).

### Auth

All write endpoints require a bearer token:

`Authorization: Bearer <AKSENT_ADMIN_TOKEN>`

### Key endpoints

Public:

- `GET /api/projects`
- `GET /api/projects/:slug`
- `GET /api/client-logos`

Admin:

- `POST /api/projects`
- `PUT /api/projects/:slug`
- `DELETE /api/projects/:slug`
- `POST /api/projects/:slug/images` (multipart field `file`)
- `POST /api/client-logos/upload` (multipart fields `name`, `file`)
- `DELETE /api/client-logos?name=...`

