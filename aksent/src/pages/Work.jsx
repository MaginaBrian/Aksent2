import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../api/content';
import './Page.css';
import './Work.css';

const CAPABILITIES = [
  { id: 'all',           label: 'All' },
  { id: 'brand',         label: 'Brand Systems' },
  { id: 'campaign',      label: 'Campaign Communication' },
  { id: 'publications',  label: 'Knowledge Publications' },
  { id: 'institutional', label: 'Institutional Platforms' },
];

const CAP_LABEL = {
  campaign:      'Campaign Communication',
  publications:  'Knowledge Publication',
  brand:         'Brand System',
  institutional: 'Institutional Platform',
};

function derivePrimary(project) {
  if (project.primaryCapability) return project.primaryCapability;
  const text = `${project.title} ${project.description}`.toLowerCase();
  if (text.includes('campaign')) return 'campaign';
  if (text.includes('publication') || text.includes('publish') || text.includes('profile')) return 'publications';
  if (text.includes('brand') || text.includes('identity') || text.includes('experience')) return 'brand';
  if (text.includes('research') || text.includes('dissemination') || text.includes('platform') || text.includes('knowledge')) return 'institutional';
  return 'campaign';
}

export default function Work() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lbProject,   setLbProject]   = useState(null);
  const [lbIndex,     setLbIndex]     = useState(0);
  const [lbOpen,      setLbOpen]      = useState(false);
  const triggerRef = useRef(null);
  const closeRef   = useRef(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setLoadError(null);
    fetchProjects()
      .then((rows) => { if (alive) setProjects(Array.isArray(rows) ? rows : []); })
      .catch((e) => { if (alive) setLoadError(e); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  const enriched = useMemo(
    () => (projects || []).map((p) => ({ ...p, cap: derivePrimary(p) })),
    [projects],
  );

  const counts = useMemo(() => {
    return enriched.reduce((acc, p) => {
      acc[p.cap] = (acc[p.cap] || 0) + 1;
      return acc;
    }, { all: enriched.length });
  }, [enriched]);

  const filtered = useMemo(
    () => (activeFilter === 'all' ? enriched : enriched.filter((p) => p.cap === activeFilter)),
    [activeFilter, enriched],
  );

  /* ── Lightbox helpers ── */
  const openLb = useCallback((project, el) => {
    triggerRef.current = el;
    setLbProject(project);
    setLbIndex(0);
    setLbOpen(true);
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeRef.current?.focus(), 50);
  }, []);

  const closeLb = useCallback(() => {
    setLbOpen(false);
    document.body.style.overflow = '';
    triggerRef.current?.focus();
  }, []);

  const goTo = useCallback((i) => {
    if (!lbProject) return;
    setLbIndex(Math.max(0, Math.min(i, lbProject.images.length - 1)));
  }, [lbProject]);

  useEffect(() => {
    if (!lbOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape')     closeLb();
      if (e.key === 'ArrowLeft')  setLbIndex(i => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setLbIndex(i => lbProject ? Math.min(i + 1, lbProject.images.length - 1) : i);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [lbOpen, lbProject, closeLb]);

  useEffect(() => () => { document.body.style.overflow = ''; }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="container">
          <span className="page-hero__label">Selected projects</span>
          <h1 className="page-hero__title">Our <em>work.</em></h1>
          <p className="page-hero__lead">
            We structure complex work into communication systems that move across audiences, institutions, and public space.
          </p>
        </div>

        {/* Filters flush at bottom of hero — no horizontal container padding */}
        <div className="work-filters-wrap">
          <div className="work-filters" role="tablist" aria-label="Filter projects by capability">
            {CAPABILITIES.map(cap => (
              <button
                key={cap.id}
                role="tab"
                aria-selected={activeFilter === cap.id}
                className={`work-filter-btn${activeFilter === cap.id ? ' is-active' : ''}`}
                onClick={() => setActiveFilter(cap.id)}
              >
                {cap.label}
                <span className="work-filter-count">{counts[cap.id] ?? 0}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work rows ── */}
      <section className="work-page-section">
        <div className="work-page-list">
          {loading && (
            <div className="container" style={{ padding: '24px 0' }}>
              <p>Loading projects…</p>
            </div>
          )}
          {!loading && loadError && (
            <div className="container" style={{ padding: '24px 0' }}>
              <p>Could not load projects.</p>
            </div>
          )}
          {filtered.map((project, vi) => {
            const isEven = vi % 2 === 1;
            return (
              <button
                key={project.slug}
                className={`work-row${isEven ? ' work-row--even' : ''}`}
                onClick={e => openLb(project, e.currentTarget)}
                aria-label={`Open ${project.title} gallery`}
              >
                <div className="work-row__media">
                  {project.images[0] && <img src={project.images[0]} alt="" />}
                </div>
                <div className="work-row__body">
                  <div className="work-row__top">
                    <span className="work-row__num">{String(vi + 1).padStart(2, '0')}</span>
                    <span className="work-row__cat">{CAP_LABEL[project.cap]}</span>
                    <h2 className="work-row__name">{project.title}</h2>
                    <p className="work-row__desc">{project.description}</p>
                  </div>
                  <span className="work-row__cta">View project →</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="work-cta">
        <div className="container">
          <div className="cta__inner">
            <div>
              <h2 className="cta__heading">
                Ready to work<br /><em>together?</em>
              </h2>
              <p className="cta__sub">
                We translate complex work into communication people understand.
                Clarity is not a finish — it is a foundation.
              </p>
            </div>
            <Link to="/contact" className="btn-primary">Start a conversation</Link>
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lbProject && (
        <div
          className={`lb${lbOpen ? ' is-open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Project gallery"
          aria-hidden={!lbOpen}
          onClick={e => { if (e.target === e.currentTarget) closeLb(); }}
        >
          <div className="lb__bar">
            <div className="lb__meta">
              <span className="lb__cat">{CAP_LABEL[lbProject.cap]}</span>
              <span className="lb__title">{lbProject.title}</span>
            </div>
            <button ref={closeRef} className="lb__close" onClick={closeLb} aria-label="Close gallery">
              <span className="lb__close-icon" aria-hidden="true">×</span> Close
            </button>
          </div>

          <div className="lb__stage">
            <button
              className="lb__arrow lb__arrow--prev"
              onClick={() => goTo(lbIndex - 1)}
              disabled={lbIndex === 0}
              aria-label="Previous image"
            >←</button>

            <img
              key={`${lbProject.slug}-${lbIndex}`}
              className="lb__img"
              src={lbProject.images[lbIndex]}
              alt={`${lbProject.title} — image ${lbIndex + 1}`}
            />

            <button
              className="lb__arrow lb__arrow--next"
              onClick={() => goTo(lbIndex + 1)}
              disabled={lbIndex === lbProject.images.length - 1}
              aria-label="Next image"
            >→</button>
          </div>

          <div className="lb__foot">
            <span className="lb__counter">{lbIndex + 1} / {lbProject.images.length}</span>
            <div className="lb__dots" role="tablist">
              {lbProject.images.map((_, i) => (
                <button
                  key={i}
                  className={`lb__dot${i === lbIndex ? ' is-active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to image ${i + 1}`}
                  aria-selected={i === lbIndex}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
