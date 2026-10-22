import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Chrome.jsx';
import NepalMap from './NepalMap.jsx';
import { ABOUT_FILES } from '../data.js';
import { cssVar } from '../hooks.js';
import golden from '../assets/mega-golden.webp';
import bw from '../assets/mega-bw.webp';

const EASE = [0.2, 0.8, 0.2, 1];

export default function About({ theme }) {
  const [i, setI] = useState(0);
  const [cols, setCols] = useState({ accent: '#d7263d', ink: '#111', paper: '#fff' });
  useEffect(() => { setCols({ accent: cssVar('--accent') || '#d7263d', ink: cssVar('--fg') || '#111', paper: cssVar('--bg') || '#fff' }); }, [theme]);
  const f = ABOUT_FILES[i];

  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <p className="idx"><b>01</b><i />About me</p>
            <h2 className="h2">Designer first.<br /><span className="o">Builder by curiosity.</span></h2>
          </div>
          <p className="lede">Open a file. Everything you need to know about me, in the window I spend most of my day in.</p>
        </div>

        <div className="win rv">
          <div className="win-bar">
            <span className="dots" aria-hidden="true"><i /><i /><i /></span>
            <span>ABOUT_ME.EXE — {f.file.toUpperCase()}</span>
          </div>
          <div className="win-path">Path: <code>C:/portfolio/about_me/{f.file}</code></div>
          <div className="win-body">
            <div className="dirs" role="tablist" aria-label="About files">
              <h4>Directories</h4>
              {ABOUT_FILES.map((file, k) => (
                <button key={file.file} role="tab" aria-selected={k === i} id={`tab-${k}`} onClick={() => setI(k)}>
                  {k === i && <motion.span layoutId="dirsel" className="sel-bg" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  <Icon.folder /> {file.file}
                </button>
              ))}
            </div>

            <div className="doc" role="tabpanel" aria-labelledby={`tab-${i}`}>
              <AnimatePresence mode="wait">
                <motion.div key={f.file} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .45, ease: EASE }}>
                  <div className="doc-file">// ACTIVE FILE: {f.file.toUpperCase()}</div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                  <dl className="kv">
                    {f.rows.map(([k, v, cls], n) => (
                      <motion.div key={n} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .1 + n * .06, duration: .4 }}>
                        <dt>{k}</dt><dd className={cls || ''}>{v}</dd>
                      </motion.div>
                    ))}
                  </dl>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="vis">
              <AnimatePresence mode="wait">
                <motion.div key={f.visual + f.file} className="vis-frame" style={f.visual === 'map' ? { maxWidth: 460 } : undefined}
                  initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .5, ease: EASE }}>
                  {f.visual === 'map' && (
                    <>
                      <div className="brk"><NepalMap photo={bw} accent={cols.accent} ink={cols.ink} paper={cols.paper} /></div>
                      <div className="vis-cap">nepal.map · each pixel sampled from my photo</div>
                    </>
                  )}
                  {f.visual === 'golden' && (<><div className="brk"><img src={golden} alt="Mega Chaudhary on a Kathmandu rooftop at golden hour" loading="lazy" /></div><div className="vis-cap">golden_hour.jpg · Kathmandu rooftop</div></>)}
                  {f.visual === 'bw' && (<><div className="brk"><img src={bw} alt="Mega Chaudhary, black and white mirror selfie" loading="lazy" /></div><div className="vis-cap">mirror.jpg · b&amp;w</div></>)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
