import { PROCESS } from '../data.js';

const A = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
const ART = [
  // understand: persona card + magnifier
  <svg viewBox="0 0 120 100" key="0"><rect x="10" y="14" width="64" height="72" rx="8" {...A} /><circle cx="42" cy="38" r="10" {...A} /><path d="M26 66c3-9 10-13 16-13s13 4 16 13" {...A} /><circle cx="86" cy="58" r="16" {...A} className="ac" /><path d="m98 70 12 12" {...A} className="ac" /></svg>,
  // flow: nodes connected by arrows
  <svg viewBox="0 0 120 100" key="1"><rect x="6" y="38" width="26" height="24" rx="5" {...A} /><rect x="48" y="12" width="26" height="24" rx="5" {...A} /><rect x="48" y="64" width="26" height="24" rx="5" {...A} /><rect x="90" y="38" width="26" height="24" rx="5" {...A} className="ac" /><path d="M32 46 48 28M32 54l16 18M74 24l16 18M74 76l16-18" {...A} /></svg>,
  // system: components on a frame
  <svg viewBox="0 0 120 100" key="2"><rect x="8" y="8" width="104" height="84" rx="10" {...A} /><path d="M8 26h104" {...A} /><rect x="18" y="36" width="38" height="22" rx="4" {...A} className="ac" /><rect x="64" y="36" width="38" height="22" rx="4" {...A} /><rect x="18" y="66" width="84" height="16" rx="8" {...A} /><circle cx="18" cy="17" r="2" fill="currentColor" /><circle cx="26" cy="17" r="2" fill="currentColor" /></svg>,
  // build: code + spark
  <svg viewBox="0 0 120 100" key="3"><path d="m34 30-20 20 20 20M70 30l20 20-20 20M58 24 46 76" {...A} /><path d="M100 12v16M92 20h16" {...A} className="ac" /><path d="M104 64v10M99 69h10" {...A} className="ac" /></svg>,
];

export default function Process() {
  return (
    <section className="section grid-bg" id="process">
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <p className="idx"><b>03</b><i />How I work</p>
            <h2 className="h2">First wireframe<br /><span className="o">to live link.</span></h2>
          </div>
          <p className="lede">Design and build are one process for me. The same person who draws the flow ships the product, so nothing gets lost in hand-off.</p>
        </div>
        <div className="proc">
          {PROCESS.map((s, i) => (
            <article className="step rv" key={s.title} style={{ transitionDelay: `${i * .08}s` }}>
              <div className="step-n"><b>Step {String(i + 1).padStart(2, '0')}</b><span>{['Research', 'Figma', 'Figma', 'Code'][i]}</span></div>
              <div className="step-art">{ART[i]}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
