import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchClientLogos, fetchProjects } from '../api/content';
import slide1 from '../assets/101.jpg';
import slide2 from '../assets/102.jpg';
import slide3 from '../assets/103.jpg';
import './Home.css';

const SLIDES = [slide1, slide2, slide3];
const INTERVAL = 5000;

const FEATURED = [
  { slug: 'amcham',              cat: 'Campaign Communication', num: '01' },
  { slug: 'hivos',               cat: 'Campaign Communication', num: '02' },
  { slug: 'womankind-worldwide', cat: 'Knowledge Publication',  num: '03' },
  { slug: 'krk-advocates',       cat: 'Brand System',           num: '04' },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const fillRef = useRef(null);
  const timerRef = useRef(null);

  const resetProgress = useCallback(() => {
    const fill = fillRef.current;
    if (!fill) return;
    fill.style.transition = 'none';
    fill.style.width = '0%';
    // double rAF to force reflow before restarting transition
    requestAnimationFrame(() => requestAnimationFrame(() => {
      fill.style.transition = 'width 4.8s linear';
      fill.style.width = '100%';
    }));
  }, []);

  const goTo = useCallback((n) => {
    setCurrent((n + SLIDES.length) % SLIDES.length);
    resetProgress();
  }, [resetProgress]);

  const startAuto = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % SLIDES.length;
        resetProgress();
        return next;
      });
    }, INTERVAL);
  }, [resetProgress]);

  useEffect(() => {
    resetProgress();
    startAuto();
    return () => clearInterval(timerRef.current);
  }, [resetProgress, startAuto]);

  return (
    <section
      className="hero"
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={startAuto}
    >
      <div className="hero__canvas">
        {/* Sliding backgrounds */}
        <div className="hero__slides" aria-hidden="true">
          {SLIDES.map((src, i) => (
            <div
              key={i}
              className={`hero__slide${i === current ? ' is-active' : ''}`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="container hero__content">
          <span className="hero__index">Knowledge&nbsp;/ Design&nbsp;/ Communication</span>
          <h1 className="hero__title">
            Clarity is<br />
            <em>structure.</em>
          </h1>
          <div className="hero__footer">
            <p className="hero__lead">
              AKSENT translates complex work into communication people understand.
              Research, institutions, and brands rely on clarity to move ideas across audiences.
            </p>
            <div className="hero__actions">
              <Link to="/work" className="btn-primary">View our work</Link>
              <Link to="/contact" className="btn-ghost">Start a conversation</Link>
            </div>
          </div>
        </div>

        {/* Carousel nav */}
        <nav className="hero__nav" aria-label="Hero slides">
          <div className="hero__progress">
            <div className="hero__progress-fill" ref={fillRef} />
          </div>
          <div className="hero__nav-dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
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
    const bySlug = new Map((projects || []).map((p) => [p.slug, p]));
    return FEATURED.map(({ slug, cat, num }) => {
      const p = bySlug.get(slug);
      return p ? { slug, cat, num, title: p.title, image: p.images?.[0] } : null;
    }).filter(Boolean);
  }, [projects]);

  return (
    <>
      {/* ── Hero ── */}
      <HeroCarousel />

      {/* ── Selected work ── */}
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

      {/* ── Services ── */}
      <section className="services">
        <div className="container">
          <span className="section-label services__label">What we do</span>
          <div className="services__layout">
            <div>
              <p className="services__headline">
                We work with organisations that produce{' '}
                <em>complex knowledge.</em>
              </p>
            </div>
            <div>
              <ul className="services__list">
                {[
                  'Campaign communication',
                  'Research and publication design',
                  'Institutional storytelling',
                  'Brand and communication systems',
                ].map((item, i) => (
                  <li key={item} className="services__item">
                    <span className="services__num">0{i + 1}</span>
                    <span className="services__name">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pull quote ── */}
      <section className="pull-quote">
        <div className="container">
          <p className="pull-quote__text">Design is structure.</p>
        </div>
      </section>

      {/* ── Clients ── */}
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

      {/* ── CTA ── */}
      <section className="cta">
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
    </>
  );
}
