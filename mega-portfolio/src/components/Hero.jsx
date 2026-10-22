import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PixelPortrait from './PixelPortrait.jsx';
import { Icon, scrollToId } from './Chrome.jsx';
import { ME, STATS } from '../data.js';
import { useInView, copyText, useKtmTime } from '../hooks.js';
import golden from '../assets/mega-golden.webp';

const HeroScene = lazy(() => import('./HeroScene.jsx'));
const EASE = [0.2, 0.8, 0.2, 1];

function Typed({ text, start }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let i = 0;
    const id = setInterval(() => { i++; setN(i); if (i >= text.length) clearInterval(id); }, 65);
    return () => clearInterval(id);
  }, [start, text]);
  return <span>{text.slice(0, n)}</span>;
}

const rise = (ready, delay) => ({ initial: { opacity: 0, y: 18 }, animate: ready ? { opacity: 1, y: 0 } : {}, transition: { duration: .9, ease: EASE, delay } });

export default function Hero({ ready }) {
  const [ref, inView] = useInView({ rootMargin: '0px' });
  const [copied, setCopied] = useState('');
  const time = useKtmTime();
  const copy = async (key, v, msg) => { const ok = await copyText(v); setCopied({ key, msg: ok ? msg : v }); setTimeout(() => setCopied(''), 2400); };

  return (
    <section className="hero grid-bg" id="home" ref={ref}>
      <Suspense fallback={null}><HeroScene active={inView} /></Suspense>
      <div className="hero-glow" />
      <div className="hero-fade" />
      <div className="wrap hero-grid">
        <div>
          <div className="hero-top">
            <div className="hello"><Typed text="HELLO, I’M" start={ready} /><i className="caret" /></div>
            <motion.span className="chip" {...rise(ready, .2)}>Kathmandu, NP<i className="sep" />{time} NPT</motion.span>
          </div>

          <h1 className="name" aria-label={ME.name}>
            <span className="ln"><motion.span initial={{ y: '102%' }} animate={ready ? { y: 0 } : {}} transition={{ duration: 1.1, ease: EASE, delay: .15 }}><span className="blk">M</span>EGA</motion.span></span>
            <span className="ln"><motion.span className="o" initial={{ y: '102%' }} animate={ready ? { y: 0 } : {}} transition={{ duration: 1.1, ease: EASE, delay: .25 }}>CHAUDHARY</motion.span></span>
          </h1>

          <motion.div className="roles" {...rise(ready, .45)}>
            <span>UI/UX Designer</span><span className="amp">&amp;</span><span className="tag">Vibe Coder</span>
          </motion.div>
          <motion.p className="hero-intro" {...rise(ready, .55)}>{ME.intro}</motion.p>
          <motion.div className="hero-cta" {...rise(ready, .65)}>
            <a className="btn solid" href="#work" onClick={(e) => { e.preventDefault(); scrollToId('work'); }}>View my work <Icon.arrow className="arr" /></a>
            <button className="btn" onClick={() => copy('email', ME.email, 'Email copied ✓')}><Icon.mail /> {copied.key === 'email' ? copied.msg : 'Copy email'}</button>
          </motion.div>
          <motion.div className="stats" {...rise(ready, .8)}>
            {STATS.map((s) => (
              <div className="stat sel" key={s.label}><i /><i /><i /><i /><b>{s.value}</b><span>{s.label}</span></div>
            ))}
          </motion.div>
        </div>

        <motion.div className="portrait-col" initial={{ opacity: 0, y: 40 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: .3, duration: 1.2, ease: EASE }}>
          <div className="portrait brk">
            <PixelPortrait src={golden} alt="Mega Chaudhary in a black and red saree on a Kathmandu rooftop" />
            <div className="connect">
              <div className="connect-h"><span style={{ color: 'var(--fg-2)' }}>LET’S CONNECT</span><span>{ME.status}</span></div>
              <div className="connect-row">
                <a className="btn" href={`mailto:${ME.email}`}><Icon.mail /> Email</a>
                <a className="btn" href={ME.github} target="_blank" rel="noreferrer"><Icon.github /> GitHub</a>
                <button className="btn" onClick={() => copy('phone', ME.phone, 'Copied ✓')}><Icon.phone /> {copied.key === 'phone' ? copied.msg : 'Phone'}</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
