import { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, ContactShadows } from '@react-three/drei';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import * as THREE from 'three';
import { KEYS } from '../data.js';

/**
 * A 4×4 macropad: sculpted, tapered keycaps (PBT and glossy accents), an anodised aluminium case,
 * a little OLED that shows the pressed key, a rotary knob and per-key lighting.
 */
const COLS = 4, PITCH = 1.04, CAP_H = .36, BEVEL = .05;
const GROUPS = {
  light: { cap: '#eceae4', text: '#1b1b1d', sub: '#8a877f', rough: .62, coat: 0 },
  dark: { cap: '#26262a', text: '#f1efea', sub: '#8e8c88', rough: .55, coat: 0 },
  accent: { cap: '#d7263d', text: '#ffffff', sub: '#ffd0d6', rough: .3, coat: .8 },
  gold: { cap: '#d9a441', text: '#1b1b1d', sub: '#6b4f17', rough: .32, coat: .8 },
};

function keycapGeometry() {
  const w = .9, r = .14, s = new THREE.Shape();
  const h = w / 2;
  s.moveTo(-h + r, -h); s.lineTo(h - r, -h); s.quadraticCurveTo(h, -h, h, -h + r);
  s.lineTo(h, h - r); s.quadraticCurveTo(h, h, h - r, h); s.lineTo(-h + r, h);
  s.quadraticCurveTo(-h, h, -h, h - r); s.lineTo(-h, -h + r); s.quadraticCurveTo(-h, -h, -h + r, -h);
  const g = new THREE.ExtrudeGeometry(s, { depth: CAP_H, bevelEnabled: true, bevelThickness: BEVEL, bevelSize: BEVEL, bevelSegments: 6, curveSegments: 12 });
  g.rotateX(-Math.PI / 2);
  g.translate(0, BEVEL, 0);
  const total = CAP_H + BEVEL * 2;
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i), t = y / total;
    const k = 1 - .2 * Math.pow(t, 1.15); // taper toward the top like a real keycap
    p.setX(i, p.getX(i) * k); p.setZ(i, p.getZ(i) * k);
  }
  g.computeVertexNormals();
  return g;
}

function legend(label, sub, color, subColor) {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const x = c.getContext('2d');
  x.fillStyle = subColor; x.font = '500 30px "JetBrains Mono", ui-monospace, monospace'; x.textBaseline = 'top';
  x.fillText(sub, 26, 26);
  x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle';
  const size = label.length > 5 ? 50 : label.length > 4 ? 58 : 68;
  x.font = `600 ${size}px "Instrument Sans", "Segoe UI", system-ui, sans-serif`;
  x.fillText(label, 128, 150);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
}

function Env() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pm = new THREE.PMREMGenerator(gl);
    const env = pm.fromScene(new RoomEnvironment(), .04).texture;
    scene.environment = env;
    return () => { env.dispose(); pm.dispose(); scene.environment = null; };
  }, [gl, scene]);
  return null;
}

let audio = null;
function clickSound() {
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    const t = audio.currentTime;
    const buf = audio.createBuffer(1, audio.sampleRate * .03, audio.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 4);
    const n = audio.createBufferSource(); n.buffer = buf;
    const bp = audio.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 3200; bp.Q.value = 1.2;
    const g = audio.createGain(); g.gain.value = .35;
    n.connect(bp).connect(g).connect(audio.destination); n.start(t);
    const o = audio.createOscillator(); o.frequency.setValueAtTime(160, t); o.frequency.exponentialRampToValueAtTime(60, t + .06);
    const og = audio.createGain(); og.gain.setValueAtTime(.18, t); og.gain.exponentialRampToValueAtTime(.001, t + .08);
    o.connect(og).connect(audio.destination); o.start(t); o.stop(t + .09);
  } catch { /* audio unavailable */ }
}

function Key({ k, i, active, pressed, onHover, onPress, geo, fontsReady }) {
  const g = useRef(), mat = useRef(), led = useRef();
  const G = GROUPS[k.group];
  const tex = useMemo(() => legend(k.label, k.sub, G.text, G.sub), [k.label, fontsReady]);
  const row = Math.floor(i / COLS), col = i % COLS;
  const x = (col - (COLS - 1) / 2) * PITCH, z = (row - 1.5) * PITCH + .55;
  useFrame((_, dt) => {
    const down = pressed ? -.2 : active ? -.1 : 0;
    g.current.position.y = THREE.MathUtils.damp(g.current.position.y, down, pressed ? 30 : 12, dt);
    led.current.material.opacity = THREE.MathUtils.damp(led.current.material.opacity, active ? .95 : .12, 8, dt);
  });
  return (
    <group position={[x, 0, z]}>
      <mesh ref={led} position={[0, .01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[.98, .98]} />
        <meshBasicMaterial color="#ff2a48" transparent opacity={.12} toneMapped={false} />
      </mesh>
      <group ref={g}
        onPointerOver={(e) => { e.stopPropagation(); onHover(i); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = ''; }}
        onPointerDown={(e) => { e.stopPropagation(); onPress(i); }}>
        <mesh geometry={geo} castShadow receiveShadow position={[0, .04, 0]}>
          <meshPhysicalMaterial ref={mat} color={G.cap} roughness={G.rough} clearcoat={G.coat} clearcoatRoughness={.25} envMapIntensity={1} />
        </mesh>
        <mesh position={[0, .04 + CAP_H + BEVEL * 2 + .002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[.7, .7]} />
          <meshBasicMaterial map={tex} transparent toneMapped={false} polygonOffset polygonOffsetFactor={-2} />
        </mesh>
      </group>
    </group>
  );
}

function Screen({ label }) {
  const tex = useMemo(() => {
    const c = document.createElement('canvas'); c.width = 512; c.height = 128;
    return { c, t: new THREE.CanvasTexture(c) };
  }, []);
  useEffect(() => {
    const x = tex.c.getContext('2d');
    x.fillStyle = '#05070a'; x.fillRect(0, 0, 512, 128);
    x.fillStyle = '#ff4d63'; x.font = '500 30px "JetBrains Mono", ui-monospace, monospace'; x.textBaseline = 'middle';
    x.fillText('> ' + label.toUpperCase(), 26, 50);
    x.fillStyle = 'rgba(255,77,99,.45)'; x.font = '400 20px "JetBrains Mono", ui-monospace, monospace';
    x.fillText('MEGA.MACROPAD  v2', 26, 96);
    x.fillStyle = 'rgba(255,255,255,.04)'; for (let y = 0; y < 128; y += 4) x.fillRect(0, y, 512, 1);
    tex.t.colorSpace = THREE.SRGBColorSpace; tex.t.needsUpdate = true;
  }, [label]);
  return (
    <mesh position={[-.62, .012, -2.02]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[2.4, .6]} />
      <meshBasicMaterial map={tex.t} toneMapped={false} />
    </mesh>
  );
}

function Knob({ turns }) {
  const ref = useRef();
  useFrame((_, dt) => { ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, -turns * .6, 6, dt); });
  return (
    <group ref={ref} position={[1.42, .22, -2.02]}>
      <mesh castShadow>
        <cylinderGeometry args={[.32, .34, .38, 48]} />
        <meshStandardMaterial color="#9a9ba0" metalness={1} roughness={.28} />
      </mesh>
      <mesh position={[0, .195, 0]}>
        <cylinderGeometry args={[.27, .27, .01, 48]} />
        <meshStandardMaterial color="#5c5d62" metalness={1} roughness={.45} />
      </mesh>
      <mesh position={[0, .2, .17]}>
        <boxGeometry args={[.04, .01, .1]} />
        <meshBasicMaterial color="#ff2a48" toneMapped={false} />
      </mesh>
    </group>
  );
}

function Board({ active, setActive, theme, fontsReady }) {
  const g = useRef();
  const geo = useMemo(keycapGeometry, []);
  const [pressed, setPressed] = useState(-1);
  const [turns, setTurns] = useState(0);
  const pointer = useRef([0, 0]);
  useEffect(() => {
    const m = (e) => { pointer.current = [(e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1]; };
    window.addEventListener('pointermove', m, { passive: true });
    return () => window.removeEventListener('pointermove', m);
  }, []);
  useEffect(() => { setTurns((t) => t + 1); }, [active]);
  useFrame((s, dt) => {
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, -.42 + pointer.current[0] * .12, 3, dt);
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, pointer.current[1] * .05, 3, dt);
    g.current.position.y = Math.sin(s.clock.elapsedTime * .8) * .05;
  });
  const press = (i) => { setActive(i, true); setPressed(i); clickSound(); setTimeout(() => setPressed(-1), 140); };
  const rows = Math.ceil(KEYS.length / COLS);
  const W = COLS * PITCH + .5, D = rows * PITCH + 1.55;
  const caseCol = theme === 'dark' ? '#3a3b40' : '#c9cacf';
  return (
    <group ref={g} position={[0, 0, -.2]}>
      {/* case */}
      <RoundedBox args={[W, .62, D]} radius={.18} smoothness={6} position={[0, -.31, -.2]} castShadow receiveShadow>
        <meshStandardMaterial color={caseCol} metalness={.85} roughness={.34} envMapIntensity={1.1} />
      </RoundedBox>
      {/* plate */}
      <mesh position={[0, .006, .55]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[COLS * PITCH + .06, rows * PITCH + .06]} />
        <meshStandardMaterial color="#0e0e10" roughness={.8} />
      </mesh>
      {/* top strip with screen + knob */}
      <mesh position={[0, .008, -2.02]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W - .3, .9]} />
        <meshStandardMaterial color="#0e0e10" roughness={.7} />
      </mesh>
      <Screen label={KEYS[active].label} />
      <Knob turns={turns} />
      {/* underglow */}
      <mesh position={[0, -.625, -.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W + .3, D + .3]} />
        <meshBasicMaterial color="#ff2a48" transparent opacity={theme === 'dark' ? .22 : .08} toneMapped={false} />
      </mesh>
      {KEYS.map((k, i) => (
        <Key key={k.label} k={k} i={i} geo={geo} active={i === active} pressed={i === pressed} onHover={(n) => setActive(n, false)} onPress={press} fontsReady={fontsReady} />
      ))}
    </group>
  );
}

export default function Keyboard3D({ active, setActive, run, theme }) {
  const [fontsReady, setFontsReady] = useState(0);
  useEffect(() => {
    Promise.all([
      document.fonts?.load('600 60px "Instrument Sans"'),
      document.fonts?.load('500 30px "JetBrains Mono"'),
    ]).then(() => setFontsReady(1)).catch(() => {});
  }, []);
  return (
    <Canvas shadows frameloop={run ? 'always' : 'never'} dpr={[1, 2]}
      camera={{ position: [0, 9.3, 8.4], fov: 31 }} gl={{ antialias: true, alpha: true, toneMapping: THREE.NeutralToneMapping }}
      onCreated={({ camera }) => camera.lookAt(0, -.7, .35)}>
      <Env />
      <ambientLight intensity={.25} />
      <directionalLight position={[3, 9, 4]} intensity={1.6} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-.0004}
        shadow-camera-left={-5} shadow-camera-right={5} shadow-camera-top={5} shadow-camera-bottom={-5} />
      <Board active={active} setActive={setActive} theme={theme} fontsReady={fontsReady} />
      <ContactShadows position={[0, -.6, -.2]} opacity={theme === 'dark' ? .7 : .45} scale={14} blur={2.8} far={3} />
    </Canvas>
  );
}
