export function requireAdmin(req, res, next) {
  const token = process.env.AKSENT_ADMIN_TOKEN;
  if (!token) {
    return res.status(500).json({
      error: 'Server misconfigured: AKSENT_ADMIN_TOKEN is not set',
    });
  }

  const header = req.headers.authorization || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match || match[1] !== token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}

