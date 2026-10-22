import { useState } from 'react';
import HeartQR from '../memora/HeartQR.jsx';
import { PRESETS } from '../memora/presets.js';

// Occasion colours straight from Memora's includes/themes.php (qrfill)
const OCCASIONS = [
  ['Valentine', '#ffc2cc'], ['Just Because', '#ecb9c9'], ['Anniversary', '#ecd7a8'],
  ['Birthday', '#ffc6a8'], ['Friendship', '#ffe29a'], ['Get Well', '#c8ecd9'],
];

export const demoValue = (name) => `Memora demo · a memory for ${name || 'you'} · designed by Mega Chaudhary`;

export function MemoraCard({ size = 260 }) {
  return (
    <div className="mm-memora">
      <HeartQR value={demoValue('you')} preset="velvet" fill="#ffc2cc" size={size} title="Memora heart QR" />
    </div>
  );
}

export default function MemoraStudio() {
  const [preset, setPreset] = useState('velvet');
  const [occ, setOcc] = useState(0);
  const [shape, setShape] = useState('heart');
  const [name, setName] = useState('Aama');
  const noir = preset === 'noir';
  return (
    <div className="studio">
      <div className={`studio-stage ${noir ? 'noir' : ''}`}>
        <div className="keepsake">
          <div className="kb">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 20.6s-7.4-4.6-9.2-9.3C1.5 7.9 3.4 4.8 6.6 4.8c2.1 0 3.6 1.2 5.4 3.2 1.8-2 3.3-3.2 5.4-3.2 3.2 0 5.1 3.1 3.8 6.5-1.8 4.7-9.2 9.3-9.2 9.3z" /></svg>
            Memora
          </div>
          <div className="ks">DIGITAL MEMORY CARD</div>
          <div className="kr" />
          <div className="kqr"><HeartQR value={demoValue(name)} preset={preset} fill={OCCASIONS[occ][1]} shape={shape} size={280} title="Memora QR preview" /></div>
          <div className="kscan">Scan to open your memory</div>
          <div className="kfor">A special gift for {name || 'you'}</div>
        </div>
      </div>
      <div className="studio-ctrl">
        <div>
          <h5>QR style</h5>
          <div className="seg">
            {Object.entries(PRESETS).map(([k, p]) => (
              <button key={k} aria-pressed={preset === k} onClick={() => setPreset(k)}>{p.name}</button>
            ))}
          </div>
          <p className="studio-note" style={{ marginTop: 8 }}>{PRESETS[preset].note}</p>
        </div>
        <div>
          <h5>Occasion</h5>
          <div className="seg">
            {OCCASIONS.map(([n, c], k) => (
              <button key={n} aria-pressed={occ === k} onClick={() => setOcc(k)}><i style={{ background: c }} />{n}</button>
            ))}
          </div>
        </div>
        <div>
          <h5>Shape</h5>
          <div className="seg">
            {['heart', 'square'].map((s) => <button key={s} aria-pressed={shape === s} onClick={() => setShape(s)}>{s}</button>)}
          </div>
        </div>
        <div className="field">
          <label htmlFor="mm-name">Recipient name</label>
          <input id="mm-name" value={name} maxLength={24} onChange={(e) => setName(e.target.value)} />
        </div>
        <p className="studio-cred">This is Memora’s real React QR renderer (HeartQR.jsx), running live. Every preset still scans with a normal phone camera. Try it.</p>
      </div>
    </div>
  );
}
