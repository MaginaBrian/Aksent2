import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSite } from '../context/SiteContent';
import './Header.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Our Work' },
  { to: '/contact', label: 'Contact' },
];

const ADMIN_CLICKS = 3;
const ADMIN_CLICK_WINDOW_MS = 2000;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { site } = useSite();
  const g = site?.global;
  const logoUrl = g?.logoUrl;
  const siteName = g?.siteName || 'Aksent';

  const logoClickCount = useRef(0);
  const logoClickTimer = useRef(null);

  const goToAdmin = () => {
    const url = `${window.location.origin}/admin`;
    let embedded = false;
    try {
      embedded = window.self !== window.top;
    } catch {
      embedded = true;
    }
    // Embedded previews (Cursor Simple Browser) cannot navigate top to another origin.
    if (embedded) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    window.location.assign(url);
  };

  const handleLogoClick = (e) => {
    logoClickCount.current += 1;
    clearTimeout(logoClickTimer.current);
    if (logoClickCount.current >= ADMIN_CLICKS) {
      logoClickCount.current = 0;
      e.preventDefault();
      goToAdmin();
      return;
    }
    logoClickTimer.current = setTimeout(() => {
      logoClickCount.current = 0;
    }, ADMIN_CLICK_WINDOW_MS);
  };

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link
          to="/"
          className="site-header__logo"
          onClick={handleLogoClick}
          aria-label={`${siteName} home`}
        >
          {logoUrl ? (
            <img src={logoUrl} alt={siteName} className="site-header__logo-img" />
          ) : (
            siteName
          )}
        </Link>

        <button
          type="button"
          className={`site-header__toggle${menuOpen ? ' is-open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>

        <nav
          id="site-nav"
          className={`site-nav${menuOpen ? ' site-nav--open' : ''}`}
        >
          <ul className="site-nav__list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`site-nav__link${location.pathname === to ? ' site-nav__link--active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
