import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchClientLogos, fetchProjects } from '../api/content';
import { useSite } from '../context/SiteContent';
import './Home.css';

const INTERVAL = 5000;

function HeroCarousel({ home }) {
  const slides = home?.heroSlides?.length ? home.heroSlides : [];
  const [current, setCurrent] = useState(0);
  const fillRef = useRef(null);
  const timerRef = useRef(null);

  const resetProgress = useCallback(() => {
    const fill = fillRef.current;
    if (!fill) return;
    fill.style.transition = 'none';
    fill.style.width = '0%';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      fill.style.transition = 'width 4.8s linear';
      fill.style.width = '100%';
    }));
  }, []);

  const goTo = useCallback((n) => {
    if (!slides.length) return;
    setCurrent((n + slides.length) % slides.length);
    resetProgress();
  }, [resetProgress, slides.length]);

  const startAuto = useCallback(() => {
    if (!slides.length) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % slides.length;
        resetProgress();
        return next;
      });
    }, INTERVAL);
  }, [resetProgress, slides.length]);

  useEffect(() => {
    if (!slides.length) return;
    resetProgress();
    startAuto();
    return () => clearInterval(timerRef.current);
  }, [resetProgress, startAuto, slides]);

  if (!slides.length) return null;

  return (
    <section
      className="hero"
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={startAuto}
    >
      <div className="hero__canvas">
        <div className="hero__slides" aria-hidden="true">
          {slides.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className={`hero__slide${i === current ? ' is-active' : ''}`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
        <div className="container hero__content">
          <span className="hero__index">{home.heroIndexLabel}</span>
          <h1 className="hero__title">
            {home.heroTitleLine1}<br />
            <em>{home.heroTitleEmphasis}</em>
          </h1>
          <div className="hero__footer">
            <p className="hero__lead">{home.heroLead}</p>
            <div className="hero__actions">
              <Link to="/work" className="btn-primary">{home.heroCtaPrimary}</Link>
              <Link to="/contact" className="btn-ghost">{home.heroCtaSecondary}</Link>
            </div>
          </div>
        </div>
        <nav className="hero__nav" aria-label="Hero slides">
          <div className="hero__progress">
            <div className="hero__progress-fill" ref={fillRef} />
          </div>
          <div className="hero__nav-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`hero__dot${i === current ? ' is-active' : ''}`}
                aria-label={`Slide ${i + 1}`}
                onClick={() => { goTo(i); startAuto(); }}
              />
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
}

export default function Home() {
  const { site } = useSite();
  const home = site?.home;
  const [projects, setProjects] = useState([]);
  const [clientLogos, setClientLogos] = useState([]);

  useEffect(() => {
    let alive = true;
    fetchProjects()
      .then((rows) => { if (alive) setProjects(Array.isArray(rows) ? rows : []); })
      .catch(() => { if (alive) setProjects([]); });
    fetchClientLogos()
      .then((rows) => { if (alive) setClientLogos(Array.isArray(rows) ? rows : []); })
      .catch(() => { if (alive) setClientLogos([]); });
    return () => { alive = false; };
  }, []);

  const featuredWork = useMemo(() => {
    const featured = home?.featured ?? [];
    const bySlug = new Map((projects || []).map((p) => [p.slug, p]));
    return featured.map(({ slug, cat, num }) => {
      const p = bySlug.get(slug);
      return p ? { slug, cat, num, title: p.title, image: p.images?.[0] } : null;
    }).filter(Boolean);
  }, [projects, home?.featured]);

  const servicesItems = home?.servicesItems ?? [];

  return (
    <>
      {home && <HeroCarousel home={home} />}

      <section className="work-section">
        <div className="container">
          <div className="work-section__header">
            <span className="section-label" style={{ marginBottom: 0 }}>Selected work</span>
            <Link to="/work" className="work-section__all">All projects →</Link>
          </div>
          <div className="work-list">
            {featuredWork.map(({ slug, cat, num, title, image }) => (
              <Link key={slug} to={`/work/${slug}`} className="work-row">
                <div className="work-row__media">
                  {image && <img src={image} alt={title} />}
                </div>
                <div className="work-row__body">
                  <div className="work-row__top">
                    <span className="work-row__num">{num}</span>
                    <span className="work-row__cat">{cat}</span>
                    <h3 className="work-row__name">{title}</h3>
                  </div>
                  <span className="work-row__cta">View project →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {home && (
        <section className="services">
          <div className="container">
            <span className="section-label services__label">{home.servicesLabel}</span>
            <div className="services__layout">
              <div>
                <p className="services__headline">
                  We work with organisations that produce{' '}
                  <em>{home.servicesHeadlineEmphasis || 'complex knowledge.'}</em>
                </p>
              </div>
              <div>
                <ul className="services__list">
                  {servicesItems.map((item, i) => (
                    <li key={`${item}-${i}`} className="services__item">
                      <span className="services__num">0{i + 1}</span>
                      <span className="services__name">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {home?.pullQuote && (
        <section className="pull-quote">
          <div className="container">
            <p className="pull-quote__text">{home.pullQuote}</p>
          </div>
        </section>
      )}

      <section className="clients">
        <div className="container">
          <span className="section-label">Trusted by</span>
          <div className="clients__grid">
            {clientLogos.map(({ name, logo }) => (
              <div key={name} className="client-item">
                <img src={logo} alt={name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {home && (
        <section className="cta">
          <div className="container">
            <div className="cta__inner">
              <div>
                <h2 className="cta__heading">
                  {home.ctaHeadingLine1}<br /><em>{home.ctaHeadingEmphasis}</em>
                </h2>
                <p className="cta__sub">{home.ctaSub}</p>
              </div>
              <Link to="/contact" className="btn-primary">{home.ctaButton}</Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
