import fs from 'node:fs';
import path from 'node:path';

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

