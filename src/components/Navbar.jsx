import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

export default function Navbar({ onMenuToggle }) {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  const toggleLang = () => {
    const next = lang === 'es' ? 'en' : 'es';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
    setLang(next);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Left: burger + logo */}
        <div className="navbar-left">
          <button
            id="menu-toggle"
            className="btn-ghost navbar-burger"
            onClick={onMenuToggle}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <Link to="/" className="navbar-logo">
            <span className="navbar-logo-icon">⚛️</span>
            <span className="gradient-text">LearnReact</span>
          </Link>
        </div>

        {/* Center nav links */}
        <nav className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/roadmap" className={({ isActive }) => isActive ? 'active' : ''}>
            {t('nav.roadmap')}
          </NavLink>
        </nav>

        {/* Right: language toggle */}
        <div className="navbar-right">
          <button id="lang-toggle" className="lang-btn" onClick={toggleLang}>
            <span className="lang-flag">{lang === 'es' ? '🇲🇽' : '🇺🇸'}</span>
            <span className="lang-text">{lang.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
