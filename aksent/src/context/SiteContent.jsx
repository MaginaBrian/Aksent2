import { createContext, useContext, useEffect, useState } from 'react';
import { fetchSite } from '../api/content';

const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchSite()
      .then((data) => { if (alive) setSite(data); })
      .catch(() => { if (alive) setSite(null); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  return (
    <SiteContentContext.Provider value={{ site, loading }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContentContext);
}
