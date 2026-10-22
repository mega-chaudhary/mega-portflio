import { useEffect, useRef } from 'react';
import NEPAL from '../geo/nepal.json';

/**
 * Nepal drawn as a pixel map (real country outline), where every pixel is sampled
 * from Mega's photo: the photo takes the shape of the location. Kathmandu pulses.
 */
export default function NepalMap({ photo, accent = '#d7263d', ink = '#111', paper = '#fff' }) {
  const wrap = useRef(null), cvs = useRef(null);

  useEffect(() => {
    const c = cvs.current, ctx = c.getContext('2d');
    const { cols, rows, grid, ktm } = NEPAL;
    let lum = null, raf = 0, t0 = performance.now(), alive = true;
    const order = [];
    grid.forEach((row, r) => [...row].forEach((v, k) => { if (v === '1') order.push([r, k, Math.random()]); }));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const img = new Image();
    img.onload = () => {
      // sample the photo into the map's grid (cover-fit, centred on the face)
      const s = document.createElement('canvas'); s.width = cols; s.height = rows;
      const sc = s.getContext('2d', { willReadFrequently: true });
      // zoom in on the face and centre it on the wide middle of the country
      const scale = (cols / img.width) * 1.45;
      const w = img.width * scale, h = img.height * scale;
      sc.drawImage(img, cols * .56 - w * .5, rows * .52 - h * .36, w, h);
      const d = sc.getImageData(0, 0, cols, rows).data;
      lum = new Float32Array(cols * rows);
      for (let i = 0; i < cols * rows; i++) lum[i] = (d[i * 4] * .3 + d[i * 4 + 1] * .59 + d[i * 4 + 2] * .11) / 255;
      t0 = performance.now(); loop(t0);
    };
    img.src = photo;

    const loop = (t) => {
      if (!alive) return;
      const box = wrap.current; if (!box) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const W = box.clientWidth, cell = W / cols, H = cell * rows;
      if (c.width !== Math.round(W * dpr)) { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); c.style.height = `${H}px`; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const p = reduced ? 2 : (t - t0) / 1400;
      // faint graticule dots outside the country
      ctx.fillStyle = ink; ctx.globalAlpha = .08;
      for (let r = 0; r < rows; r += 4) for (let k = 0; k < cols; k += 4) if (grid[r][k] !== '1') ctx.fillRect(k * cell + cell * .3, r * cell + cell * .3, Math.max(1, cell * .4), Math.max(1, cell * .4));
      ctx.globalAlpha = 1;
      for (const [r, k, rnd] of order) {
        const a = Math.max(0, Math.min(1, (p - rnd * .7) * 4));
        if (a <= 0) continue;
        const l = lum ? lum[r * cols + k] : .5;
        const g = Math.round(Math.min(255, Math.max(0, (l - .5) * 1.25 + .5) * 240 + 10));
        ctx.fillStyle = `rgba(${g},${g},${g},${a})`;
        const pad = cell * .06;
        ctx.fillRect(k * cell + pad, r * cell + pad, cell - pad * 2, cell - pad * 2);
      }
      // Kathmandu
      const kx = (ktm.col + .5) * cell, ky = (ktm.row + .5) * cell;
      const pulse = (t / 1600) % 1;
      ctx.strokeStyle = accent; ctx.lineWidth = 1.5;
      ctx.globalAlpha = 1 - pulse;
      ctx.beginPath(); ctx.arc(kx, ky, 5 + pulse * 18, 0, Math.PI * 2); ctx.stroke();
      ctx.globalAlpha = 1; ctx.fillStyle = accent;
      ctx.beginPath(); ctx.arc(kx, ky, 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = ink; ctx.globalAlpha = .55; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(kx - 4, ky + 4); ctx.lineTo(kx - 22, ky + 24); ctx.lineTo(kx - 40, ky + 24); ctx.stroke(); ctx.globalAlpha = 1;
      ctx.font = '500 11px "JetBrains Mono", ui-monospace, monospace';
      const label = 'KTM · I’m here', tw = ctx.measureText(label).width;
      ctx.fillStyle = ink; ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(kx - 48 - tw, ky + 14, tw + 12, 20, 10); else ctx.rect(kx - 48 - tw, ky + 14, tw + 12, 20); ctx.fill();
      ctx.fillStyle = paper; ctx.textBaseline = 'middle'; ctx.textAlign = 'right';
      ctx.fillText(label, kx - 42, ky + 24.5); ctx.textAlign = 'left';
      raf = requestAnimationFrame(loop);
    };
    return () => { alive = false; cancelAnimationFrame(raf); };
  }, [photo, accent, ink, paper]);

  return (
    <div ref={wrap} style={{ width: '100%' }}>
      <canvas ref={cvs} className="np-map" role="img" aria-label="Map of Nepal made from pixels of Mega's photo, with Kathmandu marked" />
    </div>
  );
}
