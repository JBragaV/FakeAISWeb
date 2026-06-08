'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import styles from './header.module.css';

const NAV_LINKS = [
  { label: 'METAR', href: '/metar' },
  { label: 'TAF', href: '/taf' },
  { label: 'Mapa', href: '/mapa' },
  { label: 'Aeródromos', href: '/aerodromes' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`${styles.header_root}${scrolled ? ` ${styles.scrolled}` : ''}`}
      >
        <div className={styles.header_inner}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logo__icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="none"
                stroke="#9bc5eb"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7H9l2-7H7l-2 2H3l1-4-1-4h2l2 2h4L9 3h3z" />
              </svg>
            </div>
            <div className={styles.logo__text}>
              <span className={styles.logo__name}>AEROMET</span>
              <span className={styles.logo__sub}>Meteorologia Aeronáutica</span>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className={styles.nav_desktop} aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.nav_link}
              >
                {link.label}
              </Link>
            ))}

            <div className={styles.nav_divider} aria-hidden="true" />

            {/* Status ao vivo */}
            <div
              className={styles.status_badge}
              title="Dados atualizados em tempo real"
            >
              <span className={styles.status_dot} aria-hidden="true" />
              <span className={styles.status_text}>AO VIVO</span>
            </div>

            {/* CTA */}
            <Link href="/buscar" className={styles.cta_btn}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              Buscar aeródromo
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className={styles.menu_btn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`${styles.mobile_menu}${menuOpen ? ` ${styles.open}` : ''}`}
          role="navigation"
          aria-label="Menu mobile"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobile_nav_link}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.mobile_cta}>
            <Link
              href="/buscar"
              className={styles.cta_btn}
              style={{ justifyContent: 'center' }}
              onClick={() => setMenuOpen(false)}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                style={{
                  width: 14,
                  height: 14,
                  stroke: 'currentColor',
                  fill: 'none',
                  strokeWidth: 2,
                }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              Buscar aeródromo
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
