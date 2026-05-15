async function apiGet(path) {
  const res = await fetch(path, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Request failed ${res.status}: ${text || res.statusText}`);
  }
  return await res.json();
}

export async function fetchProjects() {
  return await apiGet('/api/projects');
}

export async function fetchProjectBySlug(slug) {
  return await apiGet(`/api/projects/${encodeURIComponent(slug)}`);
}

export async function fetchClientLogos() {
  return await apiGet('/api/client-logos');
}

export async function fetchSite() {
  return await apiGet('/api/site');
}

