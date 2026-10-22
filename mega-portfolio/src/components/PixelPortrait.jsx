import { useEffect, useRef } from 'react';

/**
 * Photo that resolves from big pixels on load, and pixelates around the cursor on hover.
 * Plain 2D canvas; renders only when something changes.
 */
export default function PixelPortrait({ src, alt }) {
  const wrap = useRef(null), cvs = useRef(null);

  useEffect(() => {
    const c = cvs.current, box = wrap.current;
    const ctx = c.getContext('2d');
    const img = new Image();
    let W = 0, H = 0, dpr = 1, full = null, pix = null, mouse = null, raf = 0, start = 0, alive = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cover = (target, block) => {
      const t = target.getContext('2d');
      const s = Math.max(target.width / img.width, target.height / img.height);
      const w = img.width * s, h = img.height * s;
      t.drawImage(img, (target.width - w) / 2, (target.height - h) * 0.35, w, h);
      if (block) {
        const small = document.createElement('canvas');
        small.width = Math.max(1, Math.ceil(target.width / block)); small.height = Math.max(1, Math.ceil(target.height / block));
        small.getContext('2d').drawImage(target, 0, 0, small.width, small.height);
        t.clearRect(0, 0, target.width, target.height);
        t.imageSmoothingEnabled = false;
        t.drawImage(small, 0, 0, target.width, target.height);
      }
    };
    const build = () => {
      const r = box.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.round(r.width * dpr); H = Math.round(r.height * dpr);
      if (!W || !H) return;
      c.width = W; c.height = H;
      full = document.createElement('canvas'); full.width = W; full.height = H; cover(full, 0);
      pix = document.createElement('canvas'); pix.width = W; pix.height = H; cover(pix, Math.round(14 * dpr));
    };
    const pixelated = (block) => {
      const small = document.createElement('canvas');
      small.width = Math.max(1, Math.ceil(W / block)); small.height = Math.max(1, Math.ceil(H / block));
      small.getContext('2d').drawImage(full, 0, 0, small.width, small.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(small, 0, 0, W, H);
    };
    const draw = (t) => {
      if (!alive || !full) return;
      const p = reduced ? 1 : Math.min(1, (t - start) / 1500);
      ctx.clearRect(0, 0, W, H);
      if (p < 1) {
        const e = 1 - Math.pow(1 - p, 3);
        const block = Math.max(1, Math.round((1 - e) * 72 * dpr));
        if (block > 1) pixelated(block); else ctx.drawImage(full, 0, 0);
        raf = requestAnimationFrame(draw);
        return;
      }
      ctx.drawImage(full, 0, 0);
      if (mouse) {
        const b = Math.round(14 * dpr), R = Math.round(120 * dpr);
        const mx = mouse.x * dpr, my = mouse.y * dpr;
        for (let y = Math.floor((my - R) / b) * b; y < my + R; y += b) {
          for (let x = Math.floor((mx - R) / b) * b; x < mx + R; x += b) {
            const d = Math.hypot(x + b / 2 - mx, y + b / 2 - my);
            if (d > R || d / R + Math.random() * .3 > .95) continue;
            ctx.drawImage(pix, x, y, b, b, x, y, b, b);
          }
        }
      }
    };
    const kick = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); };

    img.onload = () => { build(); start = performance.now(); kick(); };
    img.src = src;
    const ro = new ResizeObserver(() => { if (img.complete && img.naturalWidth) { build(); kick(); } });
    ro.observe(box);
    const onMove = (e) => { const r = box.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; kick(); };
    const onLeave = () => { mouse = null; kick(); };
    box.addEventListener('pointermove', onMove);
    box.addEventListener('pointerleave', onLeave);
    return () => { alive = false; cancelAnimationFrame(raf); ro.disconnect(); box.removeEventListener('pointermove', onMove); box.removeEventListener('pointerleave', onLeave); };
  }, [src]);

  return (
    <div className="portrait-canvas" ref={wrap} data-cursor="Scan">
      <img src={src} alt={alt} />
      <canvas ref={cvs} aria-hidden="true" />
      <span className="portrait-tag">Kathmandu · NP</span>
      <span className="portrait-hint" aria-hidden="true">Hover to scan</span>
    </div>
  );
}
