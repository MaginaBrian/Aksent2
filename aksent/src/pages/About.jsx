import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './Page.css';
import './About.css';

const CAROUSEL_IMAGES = [
  '/about-carousel/01.png',
  '/about-carousel/02.png',
  '/about-carousel/03.png',
  '/about-carousel/04.png',
  '/about-carousel/05.png',
  '/about-carousel/06.png',
  '/about-carousel/07.png',
  '/about-carousel/08.png',
];

export default function About() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setBgIndex(i => (i + 1) % CAROUSEL_IMAGES.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* ── Page hero ── */}
      <section className="page-hero page-hero--compact">
        <div className="container">
          <span className="page-hero__label">About AKSENT</span>
          <h1 className="page-hero__title">Who we <em>are.</em></h1>
        </div>
      </section>

      {/* ── Carousel strip ── */}
      <div className="about-carousel" aria-hidden="true">
        {CAROUSEL_IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`about-carousel__slide${i === bgIndex ? ' is-active' : ''}`}
          />
        ))}
      </div>

      {/* ── Founding ── */}
      <section className="founding">
        <div className="founding__year-col">
          <span className="founding__year">2009</span>
        </div>
        <div className="founding__text">
          <p className="founding__lead">
            Founded as a design studio. Built into a knowledge communication practice.
          </p>
          <div className="founding__body">
            <p>Over time the practice expanded beyond traditional design work into the field of knowledge communication — helping organisations translate complex research, programmes, and institutional work into communication that people can understand.</p>
            <p>Today AKSENT operates at the intersection of design, knowledge systems, and institutional storytelling.</p>
            <p>We work with research organisations, foundations, and mission-driven businesses that produce complex ideas and need those ideas to travel clearly across audiences.</p>
            <p>Our role is to build the structures that allow that communication to happen — through publications, campaigns, and visual systems that make knowledge usable.</p>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="about-stats">
        <div className="about-stats__grid">
          <div className="about-stat">
            <span className="about-stat__value">15<em>+</em></span>
            <span className="about-stat__label">Years of design practice</span>
          </div>
          <div className="about-stat">
            <span className="about-stat__value">Cross<em>-</em>sector</span>
            <span className="about-stat__label">Climate, gender equity, research, finance, and hospitality.</span>
          </div>
          <div className="about-stat">
            <span className="about-stat__value"><em>Global</em></span>
            <span className="about-stat__label">Projects delivered across Africa, Europe, and global institutional networks.</span>
          </div>
        </div>
      </section>

      {/* ── How we work ── */}
      <section className="how">
        <div className="container">
          <span className="section-label how__label">How we work</span>
          <div className="how__layout">
            <div>
              <h2 className="how__headline">
                Design as<br /><em>structure.</em>
              </h2>
            </div>
            <div className="how__body">
              <p>AKSENT approaches design as structure. We organise information, shape narrative, and build visual systems that allow complex work to move clearly across audiences.</p>
              <p>We don't decorate — we construct. Every brief begins with a question about how knowledge travels: who needs to receive it, in what form, and across what distance.</p>
              <p>The answer shapes everything from the publication layout to the campaign arc to the brand architecture.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta">
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
