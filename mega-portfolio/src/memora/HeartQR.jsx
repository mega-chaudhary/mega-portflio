import { useId, useMemo } from 'react';
import { buildGrid, modulePaths, eyePaths, heartOutline, heartBox, rrect } from './geometry.js';
import { PRESETS, DEFAULT_PRESET, mixWhite } from './presets.js';

const ROSE = (
  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3.2c-3 0-5.2 2.3-5.2 5.1 0 2.4 2.2 4.3 5.2 4.3s5.2-1.9 5.2-4.3c0-2.8-2.2-5.1-5.2-5.1z" fill="currentColor" fillOpacity=".16" />
    <path d="M12 6c-1.6 0-2.7 1.1-2.7 2.4 0 1.2 1.1 2 2.7 2 1.4 0 2.3-.8 2.3-1.8 0-.9-.7-1.5-1.6-1.5-.7 0-1.1.4-1.1.9" />
    <path d="M6.8 8.6c-1.4.6-2.2 1.9-1.9 3.4.5 2.5 3.3 4.2 7.1 4.2s6.6-1.7 7.1-4.2c.3-1.5-.5-2.8-1.9-3.4" />
    <path d="M12 16.2v5.2" />
    <path d="M12 19.4c-1.2-1.6-3-2.1-4.6-1.5 1 1.6 2.8 2.2 4.6 1.5z" fill="currentColor" fillOpacity=".3" />
    <path d="M12 18.4c1.2-1.4 2.8-1.8 4.2-1.2-.9 1.4-2.6 1.9-4.2 1.2z" fill="currentColor" fillOpacity=".3" />
  </g>
);
const HEART = <path d="M12 20.6s-7.4-4.6-9.2-9.3C1.5 7.9 3.4 4.8 6.6 4.8c2.1 0 3.6 1.2 5.4 3.2 1.8-2 3.3-3.2 5.4-3.2 3.2 0 5.1 3.1 3.8 6.5-1.8 4.7-9.2 9.3-9.2 9.3z" fill="currentColor" />;

/** Resolve a preset + overrides into concrete colours. */
export function resolve(opts = {}) {
  const P = PRESETS[opts.preset] || PRESETS[DEFAULT_PRESET];
  const themeFill = /^#[0-9a-f]{6}$/i.test(opts.fill || '') ? opts.fill : '#ecb9c9';
  const tint = P.tint === 'theme' ? mixWhite(themeFill, P.tintMix ?? 0.5) : P.tint;
  const tint2 = P.tint === 'theme' ? mixWhite(themeFill, 0.85) : (P.tint2 || tint);
  return {
    ...P,
    tint, tint2,
    emblem: opts.emblem && opts.emblem !== 'auto' ? opts.emblem : P.emblem,
    shape: opts.shape === 'square' ? 'square' : 'heart',
    bg: opts.bg === undefined ? P.bg : opts.bg,
    from: opts.color || P.from, to: opts.color || P.to,
    ring: opts.color || P.ring, ball: opts.color || P.ball,
  };
}

/**
 * <HeartQR value="https://…" preset="velvet" size={300} />
 * Props: value, preset, fill (occasion colour), emblem ('rose'|'heart'|'none'), shape ('heart'|'square'),
 *        bg (outside colour, null = transparent), color (force one module colour), size, title.
 */
export default function HeartQR({ value, size = 300, title = 'QR code', ...opts }) {
  const uid = useId().replace(/[^a-z0-9]/gi, '');
  const S = resolve(opts);
  const heart = S.shape === 'heart';
  const emblemOn = S.emblem !== 'none';

  const G = useMemo(() => buildGrid(value || ' ', {
    shape: S.shape, ec: opts.ec || 'Q', emblem: emblemOn ? 0.105 : 0,
  }), [value, S.shape, emblemOn, opts.ec]);
  const paths = useMemo(() => modulePaths(G, S.modules), [G, S.modules]);

  const { n, er } = G, h = n / 2;
  const gap = 1.25;                                  // light border between code and outline
  const ow = 0.32;                                   // outline width
  const pad = gap + ow + (S.outline2 ? 1.1 : 0.5);
  const eyeAt = [[0, 0, 'tl'], [n - 7, 0, 'tr'], [0, n - 7, 'bl']];
  const eyes = eyeAt.map(([x, y, c]) => eyePaths(x, y, S.eye, c));

  let vb, body;
  const gradId = `g${uid}`, tintId = `t${uid}`;
  if (heart) {
    vb = heartBox(n, gap, pad - gap + 0.2);
    const outline = heartOutline(n, gap);
    const span = n + h + h * Math.SQRT2;            // top of the lobes along the x = y axis
    body = (
      <>
        <defs>
          <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1={span / 2} y1={span / 2} x2={-gap} y2={-gap}>
            <stop offset="0" stopColor={S.from} /><stop offset="1" stopColor={S.to} />
          </linearGradient>
          <radialGradient id={tintId} gradientUnits="userSpaceOnUse" cx={n * 0.95} cy={n * 0.95} r={n * 1.15}>
            <stop offset="0" stopColor={S.tint2} /><stop offset="1" stopColor={S.tint} />
          </radialGradient>
        </defs>
        <g transform={`rotate(225) translate(${-h} ${-h})`}>
          {S.outline2 && <path d={heartOutline(n, gap + 0.85)} fill="none" stroke={S.outline} strokeWidth={0.1} strokeLinejoin="round" opacity=".75" />}
          <path d={outline} fill={`url(#${tintId})`} stroke={S.outline} strokeWidth={ow} strokeLinejoin="round" />
          <path d={paths.lobes} fill={`url(#${gradId})`} />
          <path d={paths.code} fill={`url(#${gradId})`} />
          {eyes.map((e, i) => (
            <g key={i}><path d={e.ring} fill={S.ring} fillRule="evenodd" /><path d={e.ball} fill={S.ball} /></g>
          ))}
        </g>
      </>
    );
  } else {
    const m = gap, p = pad;
    vb = [-p - 0.2, -p - 0.2, n + 2 * p + 0.4, n + 2 * p + 0.4];
    body = (
      <>
        <defs>
          <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={n} y2={n}>
            <stop offset="0" stopColor={S.from} /><stop offset="1" stopColor={S.to} />
          </linearGradient>
        </defs>
        {S.outline2 && <path d={rrect(-m - 0.85, -m - 0.85, n + 2 * m + 1.7, n + 2 * m + 1.7, [3.4, 3.4, 3.4, 3.4])} fill="none" stroke={S.outline} strokeWidth={0.1} opacity=".75" />}
        <path d={rrect(-m, -m, n + 2 * m, n + 2 * m, [2.6, 2.6, 2.6, 2.6])} fill={S.tint} stroke={S.outline} strokeWidth={ow} />
        <path d={paths.code} fill={`url(#${gradId})`} />
        {eyes.map((e, i) => (
          <g key={i}><path d={e.ring} fill={S.ring} fillRule="evenodd" /><path d={e.ball} fill={S.ball} /></g>
        ))}
      </>
    );
  }

  // emblem sits on the code centre: (0,0) in heart display space, (h,h) in square space
  const cx = heart ? 0 : h, cy = heart ? 0 : h;
  const emblem = emblemOn && er ? (
    <g color={S.accent}>
      <circle cx={cx} cy={cy} r={er + 0.15} fill={S.tint2} stroke={S.outline} strokeWidth={0.16} />
      <circle cx={cx} cy={cy} r={er - 0.45} fill="none" stroke={S.accent} strokeOpacity=".25" strokeWidth={0.08} />
      <g transform={`translate(${cx - er * 0.62} ${cy - er * 0.64}) scale(${(er * 1.24) / 24})`} stroke={S.accent} strokeWidth={S.emblem === 'rose' ? 1.15 : 0}>
        {S.emblem === 'rose' ? ROSE : HEART}
      </g>
    </g>
  ) : null;

  const width = size, height = Math.round((size * vb[3]) / vb[2]);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={vb.map((v) => +v.toFixed(3)).join(' ')} width={width} height={height}
      role="img" aria-label={title} shapeRendering="geometricPrecision">
      {S.bg && <rect x={vb[0]} y={vb[1]} width={vb[2]} height={vb[3]} rx={vb[2] * 0.045} fill={S.bg} />}
      {body}
      {emblem}
    </svg>
  );
}
