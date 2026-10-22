import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ME } from '../data.js';
import { getLenis } from '../hooks.js';

const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
export const Icon = {
  arrow: (p) => <svg width="17" height="17" viewBox="0 0 24 24" {...s} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>,
  left: (p) => <svg width="17" height="17" viewBox="0 0 24 24" {...s} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>,
  ne: (p) => <svg width="17" height="17" viewBox="0 0 24 24" {...s} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>,
  close: (p) => <svg width="17" height="17" viewBox="0 0 24 24" {...s} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>,
  mail: (p) => <svg width="17" height="17" viewBox="0 0 24 24" {...s} {...p}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>,
  phone: (p) => <svg width="17" height="17" viewBox="0 0 24 24" {...s} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>,
  github: (p) => <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7 3.6 3.6 0 0 1 .1-2.7s.8-.3 2.8 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A10 10 0 0 0 12 2z" /></svg>,
  pin: (p) => <svg width="17" height="17" viewBox="0 0 24 24" {...s} {...p}><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>,
  folder: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H10l2 2h7.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" /></svg>,
  sun: (p) => <svg width="17" height="17" viewBox="0 0 24 24" {...s} {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>,
  moon: (p) => <svg width="17" height="17" viewBox="0 0 24 24" {...s} {...p}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>,
  menu: (p) => <svg width="18" height="18" viewBox="0 0 24 24" {...s} {...p}><path d="M4 8h16M4 16h16" /></svg>,
  play: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M7 4.5v15l13-7.5z" /></svg>,
};

export function Loader({ onDone }) {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDone(true); onDone(); return; }
    let i = 0;
    const id = setInterval(() => {
      i += 1 + Math.round(Math.random());
      setN(Math.min(20, i));
      if (i >= 20) { clearInterval(id); setTimeout(() => { setDone(true); onDone(); }, 200); }
    }, 45);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={`loader ${done ? 'done' : ''}`} aria-hidden={done}>
      <div className="loader-box">
        <div className="loader-row"><span>MEGA.EXE</span><span>{n * 5}%</span></div>
        <div className="loader-bar">{Array.from({ length: 20 }, (_, i) => <span key={i} className={i < n ? 'on' : ''} />)}</div>
        <div className="loader-row"><span>LOADING PORTFOLIO</span><span>KTM</span></div>
      </div>
    </div>
  );
}

export function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  const [label, setLabel] = useState('');
  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    let x = -100, y = -100, rx = -100, ry = -100, raf;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      const el = e.target.closest?.('[data-cursor], a, button, input, textarea, canvas');
      const l = el?.getAttribute?.('data-cursor') || '';
      setLabel(l);
      ring.current?.classList.toggle('hot', !!el && !l);
      ring.current?.classList.toggle('label', !!l);
    };
    const tick = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, []);
  return <><div className="cur" ref={dot} aria-hidden="true" /><div className="cur-ring" ref={ring} aria-hidden="true"><span>{label}</span></div></>;
}

const MARK = [1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 2];
export function LogoMark() {
  return <span className="logo-mark" aria-hidden="true">{MARK.map((v, i) => <span key={i} style={{ background: v === 1 ? 'var(--fg)' : v === 2 ? 'var(--accent)' : 'transparent' }} />)}</span>;
}

const LINKS = [['home', 'Home'], ['about', 'About'], ['work', 'Work'], ['skills', 'Skills'], ['contact', 'Contact']];

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const l = getLenis();
  if (l) l.scrollTo(el, { offset: id === 'home' ? 0 : -40, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
};

export function Nav({ theme, onToggle }) {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    LINKS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > 400 && y > last + 2) setHide(true);
      if (y < last - 2 || y < 400) setHide(false);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);
  const go = (e, id) => { e.preventDefault(); setOpen(false); scrollToId(id); };
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''} ${hide && !open ? 'hide' : ''}`}>
      <div className="wrap">
        <a className="logo" href="#home" onClick={(e) => go(e, 'home')} aria-label="Mega Chaudhary, back to top">
          <LogoMark /><span>MEGA<br />CHAUDHARY</span>
        </a>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {LINKS.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'active' : ''} onClick={(e) => go(e, id)}>
                {active === id && <motion.span layoutId="navbr" className="nav-br" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <span className="status"><i className="status-dot" />{ME.status}</span>
          <button className="toggle" aria-pressed={theme === 'dark'} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} onClick={onToggle}>
            <span>{theme === 'dark' ? <Icon.moon width="12" height="12" /> : <Icon.sun width="12" height="12" />}</span>
          </button>
          <button className="menu-btn" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>{open ? <Icon.close /> : <Icon.menu />}</button>
        </div>
      </div>
    </header>
  );
}

export function Marquee() {
  const words = ['UI/UX Design', 'FacultyHub', 'Wireframes', 'Memora', 'Prototyping', 'Raksha', 'Vibe Coding', 'Higanbana', 'three.js', 'Particle Heart'];
  const row = [...words, ...words];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{row.map((w, i) => <span key={i}>{w}</span>)}</div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-big rv">
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToId('contact'); }} data-cursor="Say hi">
            Let’s build<br /><span className="o">together</span><span className="dot">.</span>
          </a>
        </div>
        <div className="foot-row">
          <span>© 2026 {ME.name} · Designed in Figma, built with React + three.js</span>
          <nav>
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToId('home'); }}>Back to top ↑</a>
            <a href={ME.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={`mailto:${ME.email}`}>Email</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
