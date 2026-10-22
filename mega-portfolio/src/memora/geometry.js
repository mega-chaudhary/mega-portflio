/**
 * Memora QR geometry — pure functions, no React.
 *
 * Heart layout (QR space, 1 unit = 1 module, n = module count, h = n / 2):
 *   - the real QR code is the square [0,n]x[0,n]
 *   - two lobes are semicircles on the code's RIGHT edge (centre (n,h)) and BOTTOM edge (centre (h,n))
 *   - the whole thing is turned 225deg, so the three finder eyes land at the heart's left, right and
 *     bottom tip and the finder-less corner (alignment pattern) points up into the cleft.
 */
import qrcode from 'qrcode-generator';

export function makeQR(text, ec = 'Q') {
  const qr = qrcode(0, ec);
  qr.addData(unescape(encodeURIComponent(text)), 'Byte');
  qr.make();
  return qr;
}

/** Small deterministic PRNG so the same link always gives the same heart. */
export function rng(text) {
  let s = 2166136261;
  for (let i = 0; i < text.length; i++) s = Math.imul(s ^ text.charCodeAt(i), 16777619) >>> 0;
  s = s || 7;
  return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
}

export const isEye = (n, r, c) => (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);

/**
 * Build the module grid.
 * Returns { n, W, dark(r,c), code(r,c), eyes:[[r,c],...] }.
 * Grid covers code + lobes (heart) or just the code (square). Emblem area is cleared.
 */
export function buildGrid(text, { shape = 'heart', ec = 'Q', density = 0.48, guard = 2, emblem = 0, inset = 0.3 } = {}) {
  const qr = makeQR(text, ec);
  const n = qr.getModuleCount(), h = n / 2;
  const W = shape === 'heart' ? n + Math.ceil(h) + 1 : n;
  const g = new Uint8Array(W * W);         // 1 = dark module
  const k = new Uint8Array(W * W);         // 1 = part of the real code
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) { k[r * W + c] = 1; if (qr.isDark(r, c)) g[r * W + c] = 1; }

  // centre emblem: clear a circle of modules (needs EC 'H')
  const er = emblem ? n * emblem : 0;
  if (er) {
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      if ((c + 0.5 - h) ** 2 + (r + 0.5 - h) ** 2 < (er + 0.6) ** 2) g[r * W + c] = 0;
    }
  }

  if (shape === 'heart') {
    const rand = rng(text);
    const inside = (r, c, cx, cy, rad) => [[c, r], [c + 1, r], [c, r + 1], [c + 1, r + 1]]
      .every(([x, y]) => (x - cx) ** 2 + (y - cy) ** 2 <= rad * rad);
    const nearEye = (r, c) =>
      (r <= 6 + guard && c >= n - 7 - guard && c <= n - 1 + guard) ||
      (c <= 6 + guard && r >= n - 7 - guard && r <= n - 1 + guard);
    for (let r = 0; r < W; r++) for (let c = 0; c < W; c++) {
      if (r < n && c < n) continue;
      const right = c >= n && r < n && inside(r, c, n, h, h - inset);
      const bottom = r >= n && c < n && inside(r, c, h, n, h - inset);
      if ((right || bottom) && !nearEye(r, c) && rand() < density) g[r * W + c] = 1;
    }
  }

  return {
    n, W, er,
    dark: (r, c) => r >= 0 && c >= 0 && r < W && c < W && g[r * W + c] === 1,
    code: (r, c) => r >= 0 && c >= 0 && r < W && c < W && k[r * W + c] === 1,
  };
}

const f = (v) => +v.toFixed(3);

/** Rounded rect with per-corner radii [tl, tr, br, bl]. */
export function rrect(x, y, w, hh, [a, b, c, d]) {
  let p = `M${f(x + a)} ${f(y)}H${f(x + w - b)}`;
  if (b) p += `A${b} ${b} 0 0 1 ${f(x + w)} ${f(y + b)}`;
  p += `V${f(y + hh - c)}`;
  if (c) p += `A${c} ${c} 0 0 1 ${f(x + w - c)} ${f(y + hh)}`;
  p += `H${f(x + d)}`;
  if (d) p += `A${d} ${d} 0 0 1 ${f(x)} ${f(y + hh - d)}`;
  p += `V${f(y + a)}`;
  if (a) p += `A${a} ${a} 0 0 1 ${f(x + a)} ${f(y)}`;
  return p + 'Z';
}

/**
 * Module paths, eyes excluded.
 * style: 'liquid' (connected, rounded blobs), 'dots' (pearls), 'soft' (rounded squares), 'square'
 * Returns { code, lobes } path strings (lobes empty for square shape).
 */
export function modulePaths(G, style = 'liquid') {
  const { n, W, dark, code } = G;
  let a = '', b = '';
  const add = (inCode, p) => { if (inCode) a += p; else b += p; };
  for (let r = 0; r < W; r++) for (let c = 0; c < W; c++) {
    const inCode = code(r, c);
    if (inCode && isEye(n, r, c)) continue;
    // neighbours only count inside the same zone, so code and lobes don't melt into each other
    const D = (rr, cc) => dark(rr, cc) && code(rr, cc) === inCode && !(code(rr, cc) && isEye(n, rr, cc));
    if (dark(r, c)) {
      if (style === 'square') { add(inCode, `M${c} ${r}h1v1h-1z`); continue; }
      if (style === 'dots') { add(inCode, `M${c + 0.04} ${r + 0.5}a.46 .46 0 1 0 .92 0a.46 .46 0 1 0 -.92 0Z`); continue; }
      if (style === 'soft') { add(inCode, rrect(c + 0.06, r + 0.06, 0.88, 0.88, [0.28, 0.28, 0.28, 0.28])); continue; }
      // liquid: round a corner only when both sides of it are open
      const t = D(r - 1, c), btm = D(r + 1, c), l = D(r, c - 1), rt = D(r, c + 1), R = 0.5;
      add(inCode, rrect(c, r, 1, 1, [!t && !l ? R : 0, !t && !rt ? R : 0, !btm && !rt ? R : 0, !btm && !l ? R : 0]));
    } else if (style === 'liquid') {
      // concave fillets in the inside corners of L-shaped joins
      const F = 0.3;
      const fil = (dx, dy) => {   // corner of this light cell toward (dx,dy)
        const x = dx > 0 ? c + 1 : c, y = dy > 0 ? r + 1 : r;
        const sx = dx > 0 ? -F : F, sy = dy > 0 ? -F : F;
        const sweep = (dx > 0) === (dy > 0) ? 0 : 1;
        return `M${x} ${y}h${sx}A${F} ${F} 0 0 ${sweep} ${x} ${f(y + sy)}Z`;
      };
      if (D(r - 1, c) && D(r, c - 1) && D(r - 1, c - 1)) add(inCode, fil(-1, -1));
      if (D(r - 1, c) && D(r, c + 1) && D(r - 1, c + 1)) add(inCode, fil(1, -1));
      if (D(r + 1, c) && D(r, c - 1) && D(r + 1, c - 1)) add(inCode, fil(-1, 1));
      if (D(r + 1, c) && D(r, c + 1) && D(r + 1, c + 1)) add(inCode, fil(1, 1));
    }
  }
  return { code: a, lobes: b };
}

/** Finder eye at top-left module (x,y). Returns { ring, ball } paths. */
export function eyePaths(x, y, style = 'rounded', corner = 'tl') {
  const ringOuter = (rad) => rrect(x, y, 7, 7, rad);
  const ringInner = (rad) => rrect(x + 1, y + 1, 5, 5, rad);
  // even-odd ring: outer path + inner path in reverse winding is not needed with fill-rule="evenodd"
  switch (style) {
    case 'square':
      return { ring: ringOuter([0, 0, 0, 0]) + ringInner([0, 0, 0, 0]), ball: rrect(x + 2, y + 2, 3, 3, [0, 0, 0, 0]) };
    case 'leaf': {
      // petal shape: two opposite corners round, the corner facing the heart's centre stays sharp
      const big = 2.6, sm = 0.6, bi = 1.7, si = 0.3, bb = 1.3, sb = 0.25;
      const pick = (B, S) => corner === 'tl' ? [S, B, S, B] : corner === 'tr' ? [B, S, B, S] : [B, S, B, S];
      return { ring: ringOuter(pick(big, sm)) + ringInner(pick(bi, si)), ball: rrect(x + 2, y + 2, 3, 3, pick(bb, sb)) };
    }
    case 'squircle':   // soft rounded square: elegant, and reads like a classic eye
      return { ring: ringOuter([1.6, 1.6, 1.6, 1.6]) + ringInner([0.9, 0.9, 0.9, 0.9]), ball: rrect(x + 2, y + 2, 3, 3, [0.75, 0.75, 0.75, 0.75]) };
    case 'circle':
      return {
        ring: rrect(x, y, 7, 7, [3.5, 3.5, 3.5, 3.5]) + rrect(x + 1, y + 1, 5, 5, [2.5, 2.5, 2.5, 2.5]),
        ball: rrect(x + 2, y + 2, 3, 3, [1.5, 1.5, 1.5, 1.5]),
      };
    default: // rounded
      return { ring: ringOuter([2.2, 2.2, 2.2, 2.2]) + ringInner([1.5, 1.5, 1.5, 1.5]), ball: rrect(x + 2, y + 2, 3, 3, [1, 1, 1, 1]) };
  }
}

/** Heart outline in QR space, offset outward by g modules. */
export function heartOutline(n, g = 0) {
  const h = n / 2, R = h + g;
  // outer intersection of the two lobe circles lies on x = y
  const t = ((n + h) + Math.sqrt((n + h) ** 2 - 2 * (n * n + h * h - R * R))) / 2;
  return `M${f(-g)} ${f(-g)}H${n}A${f(R)} ${f(R)} 0 0 1 ${f(t)} ${f(t)}A${f(R)} ${f(R)} 0 0 1 ${f(-g)} ${n}Z`;
}

/** viewBox for the rotated heart (display space, origin = code centre). */
export function heartBox(n, g, pad) {
  const h = n / 2, R = h + g;
  const top = h * Math.SQRT1_2 + R + pad;
  const side = h * Math.SQRT1_2 + R + pad;
  const bottom = (h + g) * Math.SQRT2 + pad;
  return [-side, -top, side * 2, top + bottom];
}
