import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data.js';
import { Icon } from './Chrome.jsx';
import { Browser, Phone } from './Mockup.jsx';
import MemoraStudio from './MemoraStudio.jsx';
import { themeVars } from './Work.jsx';
import { getLenis } from '../hooks.js';

const EASE = [0.2, 0.8, 0.2, 1];

export default function ProjectPage({ index, onClose, onIndex }) {
  const p = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const ref = useRef(null), closeBtn = useRef(null);
  const [zoom, setZoom] = useState(null);

  useEffect(() => {
    getLenis()?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const prevFocus = document.activeElement;
    ref.current?.focus({ preventScroll: true });
    return () => { getLenis()?.start(); document.body.style.overflow = prev; prevFocus?.focus?.({ preventScroll: true }); };
  }, []);
  useEffect(() => {
    const key = (e) => {
      if (e.key === 'Escape') { if (zoom) setZoom(null); else onClose(); }
      if (e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' && !zoom) onIndex((index + 1) % PROJECTS.length);
      if (e.key === 'ArrowLeft' && !zoom) onIndex((index - 1 + PROJECTS.length) % PROJECTS.length);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [index, zoom]);
  useEffect(() => { ref.current?.scrollTo({ top: 0 }); }, [index]);

  const browsers = p.gallery.filter((g) => g.kind === 'browser');
  const phones = p.gallery.filter((g) => g.kind === 'phone');
  const coverPhones = p.cover.kind === 'phone' ? [phones[1], phones.find((g) => g.src === p.cover.src) || phones[0], phones[2]].filter(Boolean) : [];

  return (
    <motion.div className="pp" ref={ref} tabIndex={-1} data-lenis-prevent role="dialog" aria-modal="true" aria-labelledby="pp-title"
      style={themeVars(p.theme)} initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ duration: .75, ease: EASE }}>
      <div className="pp-top">
        <span>Project <b>{String(index + 1).padStart(2, '0')}</b> / {String(PROJECTS.length).padStart(2, '0')} · {p.title}</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="sq" aria-label="Previous project" onClick={() => onIndex((index - 1 + PROJECTS.length) % PROJECTS.length)}><Icon.left /></button>
          <button className="sq" aria-label="Next project" onClick={() => onIndex((index + 1) % PROJECTS.length)}><Icon.arrow /></button>
          <button className="sq" ref={closeBtn} aria-label="Close project" onClick={onClose}><Icon.close /></button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .6, ease: EASE, delay: .1 }}>
          <div className="wrap pp-hero">
            <div className="pp-kick"><span>{p.type}</span><span>·</span><span>{p.status}</span></div>
            <h2 className="pp-title" id="pp-title">{p.title}</h2>
            <p className="pp-sub">{p.kicker}</p>
            <dl className="pp-meta">
              <div><dt>Role</dt><dd>{p.role}</dd></div>
              <div><dt>Type</dt><dd>{p.type}</dd></div>
              <div><dt>Status</dt><dd>{p.status}</dd></div>
              <div><dt>Screens</dt><dd>{p.gallery.length ? `${p.gallery.length} shown` : 'Live demo'}</dd></div>
            </dl>
            <div className="pp-cover">
              {p.cover.kind === 'browser' && <Browser src={p.cover.src} url={p.cover.url} dark={p.theme.dark} alt={`${p.title} main screen`} eager />}
              {p.cover.kind === 'phone' && (
                <div className="phones">{coverPhones.map((g, k) => <Phone key={k} src={g.src} alt={g.cap} eager />)}</div>
              )}
            </div>
          </div>

          <div className="wrap pp-body">
            <div>
              <p className="pp-summary">{p.summary}</p>
              <div className="pp-stack">{p.stack.map((t) => <span key={t}>{t}</span>)}</div>
              {p.links.length > 0 && (
                <div className="pp-links">
                  {p.links.map((l) => <a key={l.href} className="btn pbtn" href={l.href} target="_blank" rel="noreferrer">{l.label} <Icon.ne /></a>)}
                </div>
              )}
            </div>
            <ol className="pp-points">{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ol>
          </div>

          {p.video && (
            <div className="wrap pp-video">
              <Phone video={p.video.src} poster={p.video.poster} />
              <div>
                <p className="lbl">Screen recording</p>
                <p className="big">See it move.</p>
                <p className="pp-sub">Recorded from the project running in a browser.</p>
              </div>
            </div>
          )}

          {p.studio && (
            <div className="wrap">
              <div className="pp-sec-h"><h3>Try the heart QR</h3><span>Memora’s own HeartQR.jsx, running live</span></div>
              <MemoraStudio />
            </div>
          )}

          {p.gallery.length > 0 && (
            <div className="wrap">
              <div className="pp-sec-h"><h3>Screens</h3><span>{p.note}</span></div>
              {browsers.length > 0 && (
                <div className="gal">
                  {browsers.map((g, k) => (
                    <motion.figure key={g.src} className="gal-item" onClick={() => setZoom(g.src)} data-cursor="Zoom"
                      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, root: ref, margin: '0px 0px -40px 0px' }} transition={{ duration: .7, ease: EASE }}>
                      <Browser src={g.src} url={p.cover.url || p.id} dark={p.theme.dark} alt={g.cap} />
                      <figcaption><b>{String(k + 1).padStart(2, '0')}</b>{g.cap}</figcaption>
                    </motion.figure>
                  ))}
                </div>
              )}
              {phones.length > 0 && (
                <div className="gal-phones">
                  {phones.map((g, k) => (
                    <motion.figure key={g.src} className="gal-item" onClick={() => setZoom(g.src)} data-cursor="Zoom"
                      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, root: ref }} transition={{ duration: .7, ease: EASE, delay: (k % 5) * .06 }}>
                      <Phone src={g.src} alt={g.cap} />
                      <figcaption><b>{String(browsers.length + k + 1).padStart(2, '0')}</b>{g.cap}</figcaption>
                    </motion.figure>
                  ))}
                </div>
              )}
            </div>
          )}

          <button className="pp-next" style={{ '--n-bg': next.theme.bg, '--n-ink': next.theme.ink }} onClick={() => onIndex((index + 1) % PROJECTS.length)} data-cursor="Next">
            <div className="wrap"><span>Next project →</span><b>{next.title}</b></div>
          </button>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {zoom && (
          <motion.div className="lightbox" onClick={() => setZoom(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.img src={zoom} alt="" initial={{ scale: .94 }} animate={{ scale: 1 }} transition={{ duration: .4, ease: EASE }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
