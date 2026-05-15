import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensureDataSeeded, readData, updateData } from './storage.js';
import { requireAdmin } from './auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');

const PORT = Number(process.env.PORT || 3001);
const FRONTEND_PUBLIC_DIR = path.resolve(repoRoot, 'aksent', 'public');
const FRONTEND_DIST_DIR = path.resolve(repoRoot, 'aksent', 'dist');
const ADMIN_PUBLIC_DIR = path.resolve(repoRoot, 'backend', 'public');

// Where uploaded assets live (served as static files).
const UPLOADS_DIR = process.env.AKSENT_UPLOADS_DIR
  ? path.resolve(process.env.AKSENT_UPLOADS_DIR)
  : path.resolve(FRONTEND_PUBLIC_DIR, 'uploads');

fs.mkdirSync(UPLOADS_DIR, { recursive: true });
ensureDataSeeded();

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Admin UI (simple static page)
app.use('/admin', express.static(ADMIN_PUBLIC_DIR));

// Serve uploaded assets (and any existing public assets).
app.use('/uploads', express.static(UPLOADS_DIR));
app.use(express.static(FRONTEND_PUBLIC_DIR));

function slugify(input) {
  return String(input || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function ensureProjectShape(p) {
  return {
    slug: String(p.slug || ''),
    title: String(p.title || ''),
    description: String(p.description || ''),
    primaryCapability: p.primaryCapability ? String(p.primaryCapability) : undefined,
    images: Array.isArray(p.images) ? p.images.map(String) : [],
  };
}

function projectUploadDir(slug) {
  return path.join(UPLOADS_DIR, 'projects', slug);
}

function logoUploadDir() {
  return path.join(UPLOADS_DIR, 'client-logos');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, UPLOADS_DIR);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname || '').slice(0, 12);
      const base = slugify(path.basename(file.originalname || 'file', ext)).slice(0, 80);
      cb(null, `${Date.now()}-${base || 'file'}${ext}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// ----- Projects -----
app.get('/api/projects', (req, res) => {
  const data = readData();
  res.json(data.projects);
});

app.get('/api/projects/:slug', (req, res) => {
  const data = readData();
  const p = data.projects.find((x) => x.slug === req.params.slug) ?? null;
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

app.post('/api/projects', requireAdmin, (req, res) => {
  const body = req.body ?? {};
  const slug = slugify(body.slug || body.title);
  if (!slug) return res.status(400).json({ error: 'slug (or title) is required' });
  if (!body.title) return res.status(400).json({ error: 'title is required' });

  const created = ensureProjectShape({
    ...body,
    slug,
    images: body.images ?? [],
  });

  const next = updateData((d) => {
    if (d.projects.some((p) => p.slug === slug)) {
      throw new Error('exists');
    }
    d.projects.unshift(created);
    return d;
  });

  res.status(201).json(next.projects.find((p) => p.slug === slug));
});

app.put('/api/projects/:slug', requireAdmin, (req, res) => {
  const slug = req.params.slug;
  const body = req.body ?? {};

  let updated = null;
  updateData((d) => {
    const idx = d.projects.findIndex((p) => p.slug === slug);
    if (idx < 0) return d;
    const existing = d.projects[idx];
    const next = ensureProjectShape({
      ...existing,
      ...body,
      slug: existing.slug,
      images: body.images ?? existing.images,
    });
    d.projects[idx] = next;
    updated = next;
    return d;
  });

  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

app.delete('/api/projects/:slug', requireAdmin, (req, res) => {
  const slug = req.params.slug;
  let removed = null;
  updateData((d) => {
    const idx = d.projects.findIndex((p) => p.slug === slug);
    if (idx < 0) return d;
    removed = d.projects[idx];
    d.projects.splice(idx, 1);
    return d;
  });
  if (!removed) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

// Upload one project image. Adds it to project.images (end of array).
app.post('/api/projects/:slug/images', requireAdmin, upload.single('file'), (req, res) => {
  const slug = req.params.slug;
  if (!req.file) return res.status(400).json({ error: 'file is required (multipart field "file")' });

  const destDir = projectUploadDir(slug);
  fs.mkdirSync(destDir, { recursive: true });
  const destPath = path.join(destDir, req.file.filename);
  fs.renameSync(req.file.path, destPath);

  const url = `/uploads/projects/${slug}/${req.file.filename}`;

  let updated = null;
  updateData((d) => {
    const idx = d.projects.findIndex((p) => p.slug === slug);
    if (idx < 0) return d;
    const p = ensureProjectShape(d.projects[idx]);
    p.images = [...(p.images ?? []), url];
    d.projects[idx] = p;
    updated = p;
    return d;
  });

  if (!updated) return res.status(404).json({ error: 'Project not found' });
  res.status(201).json({ url, project: updated });
});

// ----- Client logos -----
app.get('/api/client-logos', (req, res) => {
  const data = readData();
  res.json(data.clientLogos);
});

app.post('/api/client-logos', requireAdmin, (req, res) => {
  const body = req.body ?? {};
  const name = String(body.name || '').trim();
  const logo = String(body.logo || '').trim();
  if (!name) return res.status(400).json({ error: 'name is required' });
  if (!logo) return res.status(400).json({ error: 'logo is required (URL path)' });

  const created = { name, logo };
  updateData((d) => {
    d.clientLogos.push(created);
    return d;
  });
  res.status(201).json(created);
});

app.post('/api/client-logos/upload', requireAdmin, upload.single('file'), (req, res) => {
  const name = String(req.body?.name || '').trim();
  if (!name) return res.status(400).json({ error: 'name is required' });
  if (!req.file) return res.status(400).json({ error: 'file is required (multipart field "file")' });

  const destDir = logoUploadDir();
  fs.mkdirSync(destDir, { recursive: true });
  const destPath = path.join(destDir, req.file.filename);
  fs.renameSync(req.file.path, destPath);
  const url = `/uploads/client-logos/${req.file.filename}`;

  const created = { name, logo: url };
  updateData((d) => {
    d.clientLogos.push(created);
    return d;
  });

  res.status(201).json(created);
});

app.delete('/api/client-logos', requireAdmin, (req, res) => {
  const name = String(req.query?.name || '').trim();
  if (!name) return res.status(400).json({ error: 'name query param is required' });
  let removed = false;
  updateData((d) => {
    const before = d.clientLogos.length;
    d.clientLogos = d.clientLogos.filter((x) => x.name !== name);
    removed = d.clientLogos.length !== before;
    return d;
  });
  if (!removed) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

// Production: serve built frontend if present.
app.use(express.static(FRONTEND_DIST_DIR));
app.get('*', (req, res) => {
  const indexPath = path.join(FRONTEND_DIST_DIR, 'index.html');
  if (fs.existsSync(indexPath)) return res.sendFile(indexPath);
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`[aksent-backend] listening on :${PORT}`);
  console.log(`[aksent-backend] uploads: ${UPLOADS_DIR}`);
});

