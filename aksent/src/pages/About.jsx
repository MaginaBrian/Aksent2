import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContent';
import './Page.css';
import './About.css';

export default function About() {
  const { site } = useSite();
  const about = site?.about;
  const slides = about?.carouselImages ?? [];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => setBgIndex(i => (i + 1) % slides.length), 4500);
    return () => clearInterval(id);
  }, [slides.length]);

  if (!about) return null;

  return (
    <>
      <section className="page-hero page-hero--compact">
        <div className="container">
          <span className="page-hero__label">{about.heroLabel}</span>
          <h1 className="page-hero__title">
            {about.heroTitleLine1} <em>{about.heroTitleEmphasis}</em>
          </h1>
        </div>
      </section>

      {slides.length > 0 && (
        <div className="about-carousel" aria-hidden="true">
          {slides.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`about-carousel__slide${i === bgIndex ? ' is-active' : ''}`}
            />
          ))}
        </div>
      )}

      <section className="founding">
        <div className="founding__year-col">
          <span className="founding__year">{about.foundingYear}</span>
        </div>
        <div className="founding__text">
          <p className="founding__lead">{about.foundingLead}</p>
          <div className="founding__body">
            {(about.foundingParagraphs ?? []).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="about-stats__grid">
          {(about.stats ?? []).map((stat, i) => (
            <div key={i} className="about-stat">
              <span
                className="about-stat__value"
                dangerouslySetInnerHTML={{ __html: stat.valueHtml || stat.value }}
              />
              <span className="about-stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="how">
        <div className="container">
          <span className="section-label how__label">{about.howLabel}</span>
          <div className="how__layout">
            <div>
              <h2 className="how__headline">
                {about.howHeadlineLine1}<br /><em>{about.howHeadlineEmphasis}</em>
              </h2>
            </div>
            <div className="how__body">
              {(about.howParagraphs ?? []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <div className="cta__inner">
            <div>
              <h2 className="cta__heading">
                {about.ctaHeadingLine1}<br /><em>{about.ctaHeadingEmphasis}</em>
              </h2>
              <p className="cta__sub">{about.ctaSub}</p>
            </div>
            <Link to="/contact" className="btn-primary">{about.ctaButton}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
