import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContent';
import './Footer.css';

export default function Footer() {
  const { site } = useSite();
  const g = site?.global ?? {};

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div>
            <p className="site-footer__brand">{g.footerBrand || 'Aksent'}</p>
            <p className="site-footer__tagline">
              {g.footerTagline || 'Knowledge Systems · Strategic Communication · Design Intelligence'}
            </p>
          </div>
          <div className="site-footer__contact">
            {g.footerPhone && (
              <a href={`tel:${String(g.footerPhoneTel || g.footerPhone).replace(/\s/g, '')}`}>
                {g.footerPhone}
              </a>
            )}
            {g.footerEmail && <a href={`mailto:${g.footerEmail}`}>{g.footerEmail}</a>}
            {g.footerAddress && <span>{g.footerAddress}</span>}
            {g.footerWebUrl && (
              <a href={g.footerWebUrl} target="_blank" rel="noopener noreferrer">
                {g.footerWebLabel || g.footerWebUrl}
              </a>
            )}
          </div>
        </div>
        <div className="site-footer__bottom">
          <p className="site-footer__copy">{g.copyright || '© AKSENT. All rights reserved.'}</p>
          <nav className="site-footer__nav">
            <Link to="/work">Work</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
