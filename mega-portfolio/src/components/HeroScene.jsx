import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import * as THREE from 'three';
import { HERO_SCREENS } from '../data.js';

/**
 * Mega's real project screens floating in 3D, like artboards on an infinite design canvas.
 * They drift, turn toward the pointer and lift away as you scroll.
 */
const SPOTS = [
  [3.0, 1.55, -1.0], [5.5, -0.35, -2.4], [2.1, -1.95, -2.8], [6.9, 2.5, -4.2],
  [0.4, 3.05, -5.2], [4.3, -2.9, -1.6], [-3.6, 3.1, -6.4], [7.6, -2.3, -5.6],
  [-1.4, -3.3, -6.2], [-6.4, -0.9, -7.4], [1.2, 0.3, -8.4], [-5.6, 2.2, -8.8],
];

function Panel({ s, i }) {
  const ref = useRef();
  const [x, y, z] = SPOTS[i % SPOTS.length];
  const H = s.w > 1 ? 1.62 : 2.25;
  const W = H * (s.w / s.h);
  const seed = useMemo(() => Math.random() * 10, []);
  useFrame((st) => {
    const t = st.clock.elapsedTime;
    ref.current.position.y = y + Math.sin(t * .5 + seed) * .12;
    ref.current.rotation.z = Math.sin(t * .3 + seed) * .02;
  });
  return (
    <group ref={ref} position={[x, y, z]} rotation={[0, -x * .045, 0]}>
      <Image url={s.src} scale={[W, H]} radius={s.w > 1 ? .06 : .14} toneMapped={false} transparent />
    </group>
  );
}

function Rig({ children }) {
  const g = useRef();
  const { size } = useThree();
  const p = useRef([0, 0]);
  useEffect(() => {
    const m = (e) => { p.current = [(e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1]; };
    window.addEventListener('pointermove', m, { passive: true });
    return () => window.removeEventListener('pointermove', m);
  }, []);
  useFrame((st, dt) => {
    const sc = Math.min(1.2, window.scrollY / Math.max(1, window.innerHeight));
    const narrow = size.width < 960;
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, p.current[0] * .12, 3, dt);
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, p.current[1] * .06, 3, dt);
    g.current.position.y = THREE.MathUtils.damp(g.current.position.y, sc * 3.2, 6, dt);
    g.current.position.x = narrow ? 3.2 : 0;
    g.current.position.z = THREE.MathUtils.damp(g.current.position.z, sc * 2.5 + (narrow ? -2 : 0), 6, dt);
  });
  return <group ref={g}>{children}</group>;
}

export default function HeroScene({ active }) {
  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas frameloop={active ? 'always' : 'never'} dpr={[1, 1.75]} camera={{ position: [0, 0, 10], fov: 35 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <Rig>{HERO_SCREENS.map((s, i) => <Panel key={i} s={s} i={i} />)}</Rig>
        </Suspense>
      </Canvas>
    </div>
  );
}
