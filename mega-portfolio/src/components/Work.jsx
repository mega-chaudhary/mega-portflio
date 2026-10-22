import { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data.js';
import { Icon } from './Chrome.jsx';
import { Browser, Phone } from './Mockup.jsx';
import ProjectPage from './ProjectPage.jsx';
import { useInView } from '../hooks.js';

const N = PROJECTS.length;
const wrapRel = (v) => ((v % N) + N + N / 2) % N - N / 2;
export const themeVars = (t) => ({ '--p-bg': t.bg, '--p-bg2': t.bg2, '--p-ink': t.ink, '--p-accent': t.accent, '--p-soft': t.soft });
const isLive = (p) => /live|built/i.test(p.status);

export function CardArt({ p }) {
  const c = p.cover;
  if (c.kind === 'browser') return <><span className="glow" /><Browser src={c.src} url={c.url} dark={p.theme.dark} alt={`${p.title} screenshot`} /></>;
  const second = p.gallery.find((g) => g.kind === 'phone' && g.src !== c.src);
  return (
    <>
      <span className="glow" />
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6%', height: '100%', justifyContent: 'center', width: '100%' }}>
        <Phone src={c.src} alt={`${p.title} screen`} style={{ height: '112%', transform: 'translateY(16%)' }} />
        {second && <Phone src={second.src} alt="" style={{ height: '96%', transform: 'translateY(30%)', opacity: .95 }} />}
      </div>
    </>
  );
}

export default function Work() {
  const [pos, setPos] = useState(0);
  const [open, setOpen] = useState(null);
  const [dims, setDims] = useState({ cw: 620, ch: 470, sp: .62, dz: 300 });
  const [stageRef, inView] = useInView({ rootMargin: '0px' });
  const drag = useRef(null), moved = useRef(false), hover = useRef(false);
  const target = useRef(0), anim = useRef(0);
  const front = ((Math.round(pos) % N) + N) % N;

  useEffect(() => {
    const fit = () => {
      const w = window.innerWidth;
      if (w <= 700) setDims({ cw: Math.min(340, Math.round(w * .84)), ch: 470, sp: .52, dz: 220 });
      else if (w < 1100) setDims({ cw: 500, ch: 420, sp: .6, dz: 260 });
      else setDims({ cw: 640, ch: 480, sp: .64, dz: 320 });
    };
    fit(); window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  const animateTo = useCallback((to) => {
    target.current = to;
    cancelAnimationFrame(anim.current);
    const tick = () => {
      setPos((p) => {
        const d = target.current - p;
        if (Math.abs(d) < .002) return target.current;
        anim.current = requestAnimationFrame(tick);
        return p + d * .12;
      });
    };
    anim.current = requestAnimationFrame(tick);
  }, []);
  const go = (dir) => animateTo(Math.round(target.current) + dir);
  const goTo = (i) => { const cur = Math.round(target.current); animateTo(cur + wrapRel(i - cur)); };

  useEffect(() => {
    if (!inView || open !== null || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => { if (!hover.current && !drag.current) go(1); }, 4600);
    return () => clearInterval(id);
  }, [inView, open]);

  const onDown = (e) => { drag.current = { x: e.clientX, p: target.current }; moved.current = false; cancelAnimationFrame(anim.current); };
  useEffect(() => {
    const move = (e) => {
      if (!drag.current) return;
      const dx = e.clientX - drag.current.x;
      if (Math.abs(dx) > 6) moved.current = true;
      if (!moved.current) return;
      const p = drag.current.p - dx / (dims.cw * dims.sp * 1.1);
      target.current = p; setPos(p);
    };
    const up = () => { if (!drag.current) return; drag.current = null; animateTo(Math.round(target.current)); };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); };
  }, [animateTo, dims]);

  const onCard = (i) => {
    if (moved.current) { moved.current = false; return; }
    if (i === front) setOpen(i); else goTo(i);
  };

  return (
    <section className="section work" id="work">
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <p className="idx"><b>02</b><i />Selected work · {N} projects</p>
            <h2 className="h2">Things I’ve<br /><span className="o">designed &amp; built.</span></h2>
          </div>
          <p className="lede">Every screenshot here comes from the real project: the running build, the live site or the Figma file. Open one for the full story.</p>
        </div>

        <div className="cf-stage rv" ref={stageRef} onPointerDown={onDown}
          onPointerEnter={() => { hover.current = true; }} onPointerLeave={() => { hover.current = false; }}
          onKeyDown={(e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); }}
          style={{ '--cw': `${dims.cw}px`, '--ch': `${dims.ch}px` }}>
          <div className="cf">
            {PROJECTS.map((p, i) => {
              const rel = wrapRel(i - pos), a = Math.abs(rel);
              const x = rel * dims.cw * dims.sp + Math.sign(rel) * Math.min(a, 1) * dims.cw * .16;
              const rot = -Math.max(-1, Math.min(1, rel)) * 38 - (a > 1 ? Math.sign(rel) * (a - 1) * 6 : 0);
              const z = -Math.min(a, 2.2) * dims.dz;
              return (
                <button key={p.id} className="card" data-cursor={i === front ? 'Open' : 'View'}
                  style={{ ...themeVars(p.theme), transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rot}deg)`, zIndex: 100 - Math.round(a * 10), '--shade': Math.min(.7, a * .3), visibility: a > 2.4 ? 'hidden' : 'visible' }}
                  onClick={() => onCard(i)} tabIndex={i === front ? 0 : -1}
                  aria-label={`${p.title}: ${p.kicker}. ${i === front ? 'Open project' : 'Bring to front'}`}>
                  <div className="card-art"><CardArt p={p} /></div>
                  <div className="card-info">
                    <div className="card-num"><span>{String(i + 1).padStart(2, '0')} — {p.type}</span><span className={`st ${isLive(p) ? 'live' : ''}`}>{p.status}</span></div>
                    <div className="card-title">{p.title}</div>
                    <div className="card-kicker">{p.kicker}</div>
                    <span className="card-go"><Icon.arrow /></span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="cf-ui">
          <div className="cf-dots">
            {PROJECTS.map((p, i) => <button key={p.id} aria-label={`Show ${p.title}`} aria-current={i === front} onClick={() => goTo(i)} />)}
          </div>
          <div className="cf-arrows">
            <span className="hint" style={{ marginRight: 8 }}>Drag · click the front card</span>
            <button className="sq" aria-label="Previous project" onClick={() => go(-1)}><Icon.left /></button>
            <button className="sq" aria-label="Next project" onClick={() => go(1)}><Icon.arrow /></button>
          </div>
        </div>

        <div className="plist rv" role="list">
          {PROJECTS.map((p, i) => (
            <button key={p.id} className="prow" role="listitem" style={themeVars(p.theme)} onClick={() => setOpen(i)} data-cursor="Open">
              <span className="pn">{String(i + 1).padStart(2, '0')}</span>
              <span className="pt">{p.title}</span>
              <span className="pmut hide-md">{p.type}</span>
              <span className="pmut hide-md">{p.stack.slice(0, 3).join(', ')}</span>
              <span className="pmut"><span className={`st ${isLive(p) ? 'live' : ''}`}>{p.status}</span></span>
              <span className="parr"><Icon.arrow /></span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && <ProjectPage key="pp" index={open} onClose={() => setOpen(null)} onIndex={(i) => { setOpen(i); goTo(i); }} />}
      </AnimatePresence>
    </section>
  );
}
