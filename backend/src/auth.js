import crypto from 'node:crypto';

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const sessions = new Map();

function getAdminCredentials() {
  return {
    email: String(process.env.AKSENT_ADMIN_EMAIL || 'hello@aksent.co.ke').trim().toLowerCase(),
    password: String(process.env.AKSENT_ADMIN_PASSWORD || 'aksent-admin'),
  };
}

function pruneSessions() {
  const now = Date.now();
  for (const [token, session] of sessions) {
    if (session.expiresAt <= now) sessions.delete(token);
  }
}

export function createSession(email) {
  pruneSessions();
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, {
    email,
    expiresAt: Date.now() + SESSION_TTL_MS,
  });
  return token;
}

export function destroySession(token) {
  sessions.delete(token);
}

function getBearerToken(req) {
  const header = req.headers.authorization || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

export function getSession(req) {
  const token = getBearerToken(req);
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;
  if (session.expiresAt <= Date.now()) {
    sessions.delete(token);
    return null;
  }
  return { token, email: session.email };
}

export function loginWithPassword(email, password) {
  const creds = getAdminCredentials();
  const normalized = String(email || '').trim().toLowerCase();
  if (normalized !== creds.email || String(password || '') !== creds.password) {
    return null;
  }
  return createSession(normalized);
}

export function requireAdmin(req, res, next) {
  const session = getSession(req);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.adminSession = session;
  next();
}
