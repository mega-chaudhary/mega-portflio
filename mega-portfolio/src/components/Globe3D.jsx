import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import LAND from '../geo/land.json';
import NEPAL from '../geo/nepal.json';

const R = 1.6;
const ll = (lat, lon, r = R) => {
  const phi = (90 - lat) * Math.PI / 180, th = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
};
const KTM = [27.7, 85.32];
const CITIES = [[51.5, -0.12], [40.7, -74], [-33.9, 151.2], [35.7, 139.7], [25.2, 55.3], [1.35, 103.8], [52.5, 13.4]];

function Arc({ to, color }) {
  const { curve, geo } = useMemo(() => {
    const a = ll(...KTM), b = ll(...to);
    const mid = a.clone().add(b).multiplyScalar(.5);
    mid.normalize().multiplyScalar(R + a.distanceTo(b) * .32);
    const c = new THREE.QuadraticBezierCurve3(a, mid, b);
    return { curve: c, geo: new THREE.BufferGeometry().setFromPoints(c.getPoints(80)) };
  }, [to]);
  const dot = useRef();
  const off = useMemo(() => Math.random(), []);
  useFrame((s) => { const t = (s.clock.elapsedTime * .22 + off) % 1; dot.current.position.copy(curve.getPoint(t)); dot.current.material.opacity = Math.sin(t * Math.PI); });
  return (
    <>
      <line geometry={geo}><lineBasicMaterial color={color} transparent opacity={.35} /></line>
      <mesh ref={dot}><sphereGeometry args={[.025, 12, 12]} /><meshBasicMaterial color={color} transparent toneMapped={false} /></mesh>
    </>
  );
}

function Globe({ fg, red, bg }) {
  const g = useRef(), pulse = useRef();
  const { land, nepal } = useMemo(() => {
    const a = [], b = [];
    for (let i = 0; i < LAND.length; i += 2) {
      const v = ll(LAND[i], LAND[i + 1], R + .005);
      a.push(v.x, v.y, v.z);
    }
    // Nepal, densely, from the same pixel grid used on the About map
    const { grid, x0, y1, cell, k } = NEPAL;
    for (let r = 0; r < grid.length; r += 3) for (let c = 0; c < grid[r].length; c += 3) {
      if (grid[r][c] !== '1') continue;
      const v = ll(y1 - (r + .5) * cell, x0 + ((c + .5) * cell) / k, R + .008);
      b.push(v.x, v.y, v.z);
    }
    return { land: new Float32Array(a), nepal: new Float32Array(b) };
  }, []);
  const ktm = useMemo(() => ll(...KTM, R + .012), []);
  const q = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), ktm.clone().normalize()), [ktm]);
  const startY = useMemo(() => -Math.atan2(ktm.x, ktm.z), [ktm]);
  useFrame((s, dt) => {
    g.current.rotation.y += dt * .06;
    const k = (s.clock.elapsedTime * .8) % 1;
    pulse.current.scale.setScalar(1 + k * 2.4);
    pulse.current.material.opacity = 1 - k;
  });
  return (
    <group ref={g} rotation={[.42, startY - .35, 0]}>
      <mesh><sphereGeometry args={[R, 64, 64]} /><meshBasicMaterial color={bg} transparent opacity={.92} /></mesh>
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[land, 3]} /></bufferGeometry>
        <pointsMaterial size={.028} color={fg} transparent opacity={.7} sizeAttenuation />
      </points>
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[nepal, 3]} /></bufferGeometry>
        <pointsMaterial size={.02} color={red} sizeAttenuation toneMapped={false} />
      </points>
      <group position={ktm} quaternion={q}>
        <mesh><circleGeometry args={[.035, 24]} /><meshBasicMaterial color={red} toneMapped={false} /></mesh>
        <mesh ref={pulse}><ringGeometry args={[.03, .038, 40]} /><meshBasicMaterial color={red} transparent side={THREE.DoubleSide} toneMapped={false} /></mesh>
      </group>
      {CITIES.map((c) => <Arc key={c.join()} to={c} color={red} />)}
    </group>
  );
}

export default function Globe3D({ fg, red, bg, run }) {
  return (
    <Canvas frameloop={run ? 'always' : 'never'} dpr={[1, 2]} camera={{ position: [0, 0, 6.1], fov: 40 }} gl={{ antialias: true, alpha: true }}>
      <Globe fg={fg} red={red} bg={bg} />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={.5} />
    </Canvas>
  );
}
