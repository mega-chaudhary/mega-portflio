import { useEffect, useRef } from 'react';
import { TIMELINE } from '../data.js';

export default function Timeline() {
  const box = useRef(null), fill = useRef(null);
  useEffect(() => {
    let raf;
    const tick = () => {
      const el = box.current;
      if (el && fill.current) {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (window.innerHeight * .6 - r.top) / r.height));
        fill.current.style.height = `${p * 100}%`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <section className="section" id="journey">
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <p className="idx"><b>05</b><i />Journey</p>
            <h2 className="h2">From the shop floor<br /><span className="o">to the design file.</span></h2>
          </div>
        </div>
        <div className="tl" ref={box}>
          <div className="tl-fill" ref={fill} />
          {TIMELINE.map((t, i) => (
            <div className={`tl-item rv ${i === TIMELINE.length - 1 ? 'now' : ''}`} key={t.what}>
              <div className="tl-when">{t.when}</div>
              <div className="tl-dot" />
              <div className="tl-text">
                <div className="tl-what">{t.what}</div>
                <div className="tl-where">{t.where}</div>
                <p className="tl-body">{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
