import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { KEYS } from '../data.js';
import { useInView } from '../hooks.js';

const Keyboard3D = lazy(() => import('./Keyboard3D.jsx'));

export default function Skills({ theme }) {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView({ rootMargin: '100px' });
  const [seen, setSeen] = useState(false);
  const touched = useRef(0);
  useEffect(() => { if (inView) setSeen(true); }, [inView]);
  const pick = (i) => { touched.current = Date.now(); setActive(i); };

  useEffect(() => {
    if (!inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => { if (Date.now() - touched.current > 6000) setActive((a) => (a + 1) % KEYS.length); }, 2000);
    return () => clearInterval(id);
  }, [inView]);

  const k = KEYS[active];
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <p className="idx"><b>04</b><i />Toolkit · press a key</p>
            <h2 className="h2">My tech<br /><span className="o">stack.</span></h2>
          </div>
          <p className="lede">Design tools, code and AI on one macropad. Hover a key to see where I’ve used it, or press it.</p>
        </div>
        <div className="kb-wrap">
          <div className="kb-stage rv" ref={ref} data-cursor="Press">
            {seen && <Suspense fallback={null}><Keyboard3D active={active} setActive={(i) => pick(i)} run={inView} theme={theme} /></Suspense>}
            <span className="kb-hint">Hover or tap a key · sound on press</span>
          </div>
          <div className="kb-panel rv" aria-live="polite">
            <span className="k">Key {String(active + 1).padStart(2, '0')} / {KEYS.length}</span>
            <motion.div key={k.label} initial={{ opacity: .2, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }} style={{ display: 'grid', gap: 14 }}>
                <span className="kb-tag">{k.sub}</span>
                <h3>{k.label}</h3>
                <p>{k.used}</p>
            </motion.div>
            <div className="kb-list">
              {KEYS.map((key, i) => <button key={key.label} aria-pressed={i === active} onClick={() => pick(i)}>{key.label}</button>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
