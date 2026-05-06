# AKSENT Backend

Lightweight CMS-style API for the AKSENT site.

## Run

```bash
cd backend
npm install
AKSENT_ADMIN_TOKEN=devtoken PORT=3001 npm run start
```

## Data + uploads

- Data file: `backend/data.json` (override with `AKSENT_DATA_PATH`)
- Uploads dir: `aksent/public/uploads/` (override with `AKSENT_UPLOADS_DIR`)

## Auth

All write endpoints require:

`Authorization: Bearer <AKSENT_ADMIN_TOKEN>`

