import { lazy, Suspense, useEffect, useState } from 'react';
import { ME } from '../data.js';
import { useInView, copyText, cssVar, useKtmTime } from '../hooks.js';
import { Icon } from './Chrome.jsx';
import bw from '../assets/mega-bw.webp';

const Globe3D = lazy(() => import('./Globe3D.jsx'));

function CopyRow({ icon, label, value, href }) {
  const [msg, setMsg] = useState('Copy');
  const copy = async () => { setMsg((await copyText(value)) ? 'Copied' : 'Select it'); setTimeout(() => setMsg('Copy'), 2000); };
  return (
    <div className="direct-row">
      <span className="ic">{icon}</span>
      <div style={{ minWidth: 0 }}>
        <small>{label}</small>
        {href ? <a href={href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}><span>{value}</span></a> : <span>{value}</span>}
      </div>
      <button className="copy" onClick={copy}>{msg}</button>
    </div>
  );
}

export default function Contact({ theme }) {
  const [ref, inView] = useInView({ rootMargin: '100px' });
  const [seen, setSeen] = useState(false);
  const [cols, setCols] = useState({ fg: '#111', red: '#d7263d', bg: '#fff' });
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [status, setStatus] = useState('');
  const time = useKtmTime();
  useEffect(() => { if (inView) setSeen(true); }, [inView]);
  useEffect(() => { setCols({ fg: cssVar('--fg') || '#111', red: cssVar('--accent') || '#d7263d', bg: cssVar('--bg-2') || '#eee' }); }, [theme]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.msg.trim()) { setStatus('Add your name and a short message first.'); return; }
    const subject = `Portfolio enquiry from ${form.name}`;
    const body = `${form.msg}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`;
    const copied = await copyText(`To: ${ME.email}\nSubject: ${subject}\n\n${body}`);
    window.location.href = `mailto:${ME.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(copied
      ? `Opening your email app. If it doesn’t open, your message is copied: paste it into an email to ${ME.email}.`
      : `Opening your email app. If it doesn’t open, email ${ME.email} directly.`);
  };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <p className="idx"><b>06</b><i />Contact</p>
            <h2 className="h2">Got a project<br /><span className="o">or an internship?</span></h2>
          </div>
          <p className="lede">Tell me what you’re building. Write to me directly, or use the form and your email app will open with the message ready.</p>
        </div>
        <div className="contact-grid">
          <div>
            <form className="form rv" onSubmit={submit} noValidate>
              <h3>Say hello</h3>
              <div className="field"><label htmlFor="c-name">Your name</label><input id="c-name" value={form.name} onChange={set('name')} autoComplete="name" placeholder="Your full name" /></div>
              <div className="field"><label htmlFor="c-email">Your email</label><input id="c-email" type="email" value={form.email} onChange={set('email')} autoComplete="email" placeholder="you@company.com" /></div>
              <div className="field"><label htmlFor="c-msg">Message</label><textarea id="c-msg" rows="4" value={form.msg} onChange={set('msg')} placeholder="The project, timeline or role" /></div>
              <button className="btn accent" type="submit" style={{ justifySelf: 'start' }}>Send message <Icon.arrow className="arr" /></button>
              <p className="form-msg" aria-live="polite">{status}</p>
            </form>
            <div className="direct rv">
              <CopyRow icon={<Icon.mail />} label="Email" value={ME.email} />
              <CopyRow icon={<Icon.phone />} label="Phone / WhatsApp" value={ME.phone} />
              <CopyRow icon={<Icon.github />} label="GitHub" value={ME.github.replace('https://', '')} href={ME.github} />
            </div>
          </div>
          <div className="globe-card rv" ref={ref} data-cursor="Drag">
            {seen && <Suspense fallback={null}><Globe3D fg={cols.fg} red={cols.red} bg={cols.bg} run={inView} /></Suspense>}
            <div className="globe-top"><span>27.71° N, 85.32° E</span><span>Local time <b>{time}</b></span></div>
            <div className="globe-bottom">
              <div className="city">Kathmandu<small>Working with teams anywhere</small></div>
              <figure className="polaroid" style={{ margin: 0 }}>
                <img src={bw} alt="Mega Chaudhary, black and white mirror selfie" loading="lazy" />
                <span>say hi :)</span>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
