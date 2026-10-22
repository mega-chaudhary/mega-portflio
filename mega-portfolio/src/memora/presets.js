/**
 * QR design presets. Every preset keeps dark modules on a light heart so it scans with any phone
 * camera (no inverted codes). `tint: 'theme'` uses the occasion colour from includes/themes.php.
 */
export const PRESETS = {
  velvet: {
    name: 'Velvet Rose',
    note: 'Liquid modules, plum-to-rose gradient, petal eyes',
    modules: 'liquid', eye: 'leaf',
    from: '#8a2352', to: '#3b0b24',            // gradient: top of heart -> tip
    ring: '#3b0b24', ball: '#8a2352',
    tint: 'theme', tintMix: 0.74,
    outline: '#b25a80', outline2: true,
    emblem: 'rose', accent: '#8a2352', bg: '#ffffff',
  },
  champagne: {
    name: 'Champagne',
    note: 'Pearl dots on ivory with antique-gold eyes',
    modules: 'dots', eye: 'squircle',
    from: '#5a2840', to: '#2e1220',
    ring: '#8a6524', ball: '#2e1220',
    tint: '#fbf3e3', tint2: '#fffdf8',
    outline: '#b8924a', outline2: true,
    emblem: 'rose', accent: '#8a6524', bg: '#ffffff',
  },
  noir: {
    name: 'Crimson Noir',
    note: 'Crisp crimson squares, heart glowing on black',
    modules: 'square', eye: 'square',
    from: '#c8102e', to: '#6e0619',
    ring: '#7a0a1e', ball: '#c8102e',
    tint: '#fff3f4', tint2: '#ffffff',
    outline: '#d01a36', outline2: false,
    emblem: 'heart', accent: '#c8102e', bg: '#12060a',
  },
  blush: {
    name: 'Blush Pearl',
    note: 'Soft rounded squares in the occasion blush',
    modules: 'soft', eye: 'squircle',
    from: '#6b2342', to: '#4a1330',
    ring: '#4a1330', ball: '#6b2342',
    tint: 'theme', tintMix: 0.35,
    outline: '#c98aa3', outline2: false,
    emblem: 'none', accent: '#6b2342', bg: '#ffffff',
  },
  classic: {
    name: 'Classic Plum',
    note: 'Plain square modules — the safest to scan',
    modules: 'square', eye: 'square',
    from: '#4a1330', to: '#4a1330',
    ring: '#4a1330', ball: '#4a1330',
    tint: '#ffffff',
    outline: '#4a1330', outline2: false,
    emblem: 'none', accent: '#4a1330', bg: '#ffffff',
  },
};

export const DEFAULT_PRESET = 'velvet';
export const EMBLEMS = { rose: 'Rose', heart: 'Heart', none: 'None' };

/** Mix a hex colour with white. t = 0 -> colour, 1 -> white. */
export function mixWhite(hex, t) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return '#ffffff';
  const v = parseInt(m[1], 16);
  const ch = [(v >> 16) & 255, (v >> 8) & 255, v & 255].map((x) => Math.round(x + (255 - x) * t));
  return '#' + ch.map((x) => x.toString(16).padStart(2, '0')).join('');
}

/** Parse a saved style string: "preset|emblem|shape" (e.g. "velvet|rose|heart"). */
export function parseStyle(s) {
  const [p, e, sh] = String(s || '').split('|');
  return {
    preset: PRESETS[p] ? p : DEFAULT_PRESET,
    emblem: EMBLEMS[e] ? e : undefined,
    shape: sh === 'square' ? 'square' : sh === 'heart' ? 'heart' : undefined,
  };
}
export const styleString = ({ preset, emblem, shape }) => [preset, emblem || '', shape || ''].join('|');
