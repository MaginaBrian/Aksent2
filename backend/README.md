# AKSENT Backend

Lightweight CMS-style API for the AKSENT site.

## Run

```bash
cd backend
npm install
AKSENT_ADMIN_TOKEN=devtoken PORT=3001 npm run start
```

Then open the admin UI:

- `http://localhost:3001/admin/admin.html`

## Data + uploads

- Data file: `backend/data.json` (override with `AKSENT_DATA_PATH`)
- Uploads dir: `aksent/public/uploads/` (override with `AKSENT_UPLOADS_DIR`)

## Auth

All write endpoints require:

`Authorization: Bearer <AKSENT_ADMIN_TOKEN>`

## Endpoints (summary)

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

