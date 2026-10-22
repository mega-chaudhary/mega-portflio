import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage blocked */ } },
};

/** dark | light, remembered per browser, follows the OS until the visitor picks. */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = store.get('mc-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  const toggle = () => setTheme((t) => { const n = t === 'dark' ? 'light' : 'dark'; store.set('mc-theme', n); return n; });
  return [theme, toggle];
}

export function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

let lenis = null;
export const getLenis = () => lenis;
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenis = null; };
  }, []);
}

export function useInView(options = { rootMargin: '120px' }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), options);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

/** Elements with .rv fade up when scrolled into view. Anything already on screen stays visible. */
export function useReveal(ready) {
  useEffect(() => {
    if (!ready || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = [...document.querySelectorAll('.rv')];
    const vh = window.innerHeight;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.remove('pre'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px' });
    els.forEach((el) => { if (el.getBoundingClientRect().top > vh) { el.classList.add('pre'); io.observe(el); } });
    return () => io.disconnect();
  }, [ready]);
}

export async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}

/** Live Kathmandu time, e.g. "17:42" */
export function useKtmTime() {
  const fmt = () => {
    try { return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kathmandu' }).format(new Date()); }
    catch { return ''; }
  };
  const [t, setT] = useState(fmt);
  useEffect(() => { const id = setInterval(() => setT(fmt()), 15000); return () => clearInterval(id); }, []);
  return t;
}
