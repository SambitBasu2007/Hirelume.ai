'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <nav className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" id="nav-logo">
          <div className="w-8 h-8 rounded-lg bg-[#0076df] flex items-center justify-center transition-shadow group-hover:shadow-[0_0_20px_rgba(0,118,223,0.4)]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 4h12M2 8h8M2 12h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white">Hirelume</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: '/#features', label: 'Features' },
            { href: '/#how-it-works', label: 'How it works' },
            { href: '/upload', label: 'Analyze Resume' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex">
          <Link
            href="/upload"
            id="nav-cta"
            className="btn-solid text-sm font-semibold px-5 py-2 rounded-lg"
          >
            Try for free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-zinc-400 hover:text-white transition-colors p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          id="nav-mobile-toggle"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5 px-6 pb-6 flex flex-col gap-1">
          {[
            { href: '/#features', label: 'Features' },
            { href: '/#how-it-works', label: 'How it works' },
            { href: '/upload', label: 'Analyze Resume' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors py-3.5 border-b border-white/5 last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/upload"
            className="btn-solid text-sm font-semibold px-5 py-3 rounded-lg text-center mt-3"
            onClick={() => setMenuOpen(false)}
          >
            Try for free
          </Link>
        </div>
      )}
    </header>
  );
}
