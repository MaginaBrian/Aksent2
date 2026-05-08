import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div>
            <p className="site-footer__brand">Aksent</p>
            <p className="site-footer__tagline">
              Knowledge Systems · Strategic Communication · Design Intelligence
            </p>
          </div>
          <div className="site-footer__contact">
            <a href="tel:+254722311089">+254 722 311 089</a>
            <a href="mailto:hello@aksent.co.ke">hello@aksent.co.ke</a>
            <span>Jabavu Road, Kilimani · Nairobi, Kenya</span>
            <a href="https://www.aksent.co.ke" target="_blank" rel="noopener noreferrer">
              www.aksent.co.ke
            </a>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p className="site-footer__copy">© AKSENT. All rights reserved.</p>
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
