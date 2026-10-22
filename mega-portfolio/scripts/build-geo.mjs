// Generates the dot data for the globe and the Nepal pixel map.
// Run: node scripts/build-geo.mjs   (only needed if you want to change density)
import fs from 'fs';
import { feature } from 'topojson-client';
import { geoContains, geoBounds } from 'd3-geo';

const land110 = JSON.parse(fs.readFileSync(new URL('../node_modules/world-atlas/land-110m.json', import.meta.url)));
const c50 = JSON.parse(fs.readFileSync(new URL('../node_modules/world-atlas/countries-50m.json', import.meta.url)));
const land = feature(land110, land110.objects.land);

// globe: evenly spaced points on a sphere, kept where there is land
const N = 18000, golden = Math.PI * (3 - Math.sqrt(5)), pts = [];
for (let i = 0; i < N; i++) {
  const y = 1 - (i / (N - 1)) * 2, th = golden * i;
  const lat = Math.asin(y) * 180 / Math.PI;
  const lon = ((th * 180 / Math.PI) % 360 + 540) % 360 - 180;
  if (geoContains(land, [lon, lat])) pts.push(+lat.toFixed(2), +lon.toFixed(2));
}
fs.writeFileSync(new URL('../src/geo/land.json', import.meta.url), JSON.stringify(pts));

// Nepal: a pixel grid
const nepal = feature(c50, c50.objects.countries).features.find((f) => f.id === '524');
const [[x0, y0], [x1, y1]] = geoBounds(nepal);
const COLS = 120, k = Math.cos(28.2 * Math.PI / 180);
const cell = ((x1 - x0) * k) / COLS, ROWS = Math.ceil((y1 - y0) / cell);
const grid = [];
for (let r = 0; r < ROWS; r++) {
  let row = '';
  for (let c = 0; c < COLS; c++) {
    const lon = x0 + ((c + .5) * cell) / k, lat = y1 - (r + .5) * cell;
    row += geoContains(nepal, [lon, lat]) ? '1' : '0';
  }
  grid.push(row);
}
const ktm = { col: Math.floor(((85.32 - x0) * k) / cell), row: Math.floor((y1 - 27.71) / cell) };
fs.writeFileSync(new URL('../src/geo/nepal.json', import.meta.url), JSON.stringify({ cols: COLS, rows: ROWS, grid, ktm, x0: +x0.toFixed(4), y1: +y1.toFixed(4), cell: +cell.toFixed(5), k: +k.toFixed(5) }));
console.log('land points', pts.length / 2, 'nepal', COLS, 'x', ROWS, ktm);
