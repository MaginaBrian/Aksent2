import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED_DATA_PATH = path.resolve(__dirname, '..', 'data.json');

const DATA_PATH = process.env.AKSENT_DATA_PATH
  ? path.resolve(process.env.AKSENT_DATA_PATH)
  : path.resolve(process.cwd(), 'data.json');

const DEFAULT_DATA = {
  projects: [],
  clientLogos: [],
};

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

/** Copy bundled backend/data.json when runtime data is missing or empty. */
export function ensureDataSeeded() {
  if (!fs.existsSync(SEED_DATA_PATH)) return;

  let needsSeed = !fs.existsSync(DATA_PATH);
  if (!needsSeed) {
    try {
      const raw = fs.readFileSync(DATA_PATH, 'utf8');
      const data = JSON.parse(raw);
      const projects = Array.isArray(data.projects) ? data.projects : [];
      const clientLogos = Array.isArray(data.clientLogos) ? data.clientLogos : [];
      needsSeed = projects.length === 0 && clientLogos.length === 0;
    } catch {
      needsSeed = true;
    }
  }

  if (!needsSeed) return;
  ensureDir(DATA_PATH);
  fs.copyFileSync(SEED_DATA_PATH, DATA_PATH);
  console.log(`[aksent-backend] seeded data: ${DATA_PATH}`);
}

export function readData() {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf8');
    const data = JSON.parse(raw);
    return {
      projects: Array.isArray(data.projects) ? data.projects : [],
      clientLogos: Array.isArray(data.clientLogos) ? data.clientLogos : [],
    };
  } catch {
    return { ...DEFAULT_DATA };
  }
}

export function writeData(next) {
  ensureDir(DATA_PATH);
  fs.writeFileSync(DATA_PATH, JSON.stringify(next, null, 2) + '\n', 'utf8');
}

export function updateData(mutator) {
  const current = readData();
  const next = mutator(structuredClone(current)) ?? current;
  writeData(next);
  return next;
}

