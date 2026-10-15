"use client";

import { Line } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { sceneState } from "@/components/visuals/scene-state";

const NODES: [number, number, number][] = [
  [0, 0, 0],
  [1.5, 0.6, 0.2],
  [-1.4, 0.9, -0.3],
  [0.9, -1.3, 0.4],
  [-1.1, -1.0, 0.5],
  [1.7, -0.3, -0.6],
  [-1.8, 0.1, 0.3],
  [0.4, 1.6, -0.4],
  [-0.5, -1.7, -0.2]
];

const LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 5],
  [4, 8],
  [2, 7],
  [7, 1],
  [6, 4]
];

export function AiConstellation() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const outer = useRef<THREE.Mesh>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const ringGroup = useRef<THREE.Group>(null);
  const trail = useRef<THREE.Points>(null);
  const { size } = useThree();

  const rot = useRef({ x: 0.14, y: -0.3 });
  const vel = useRef({ x: 0, y: 0 });
  const resetting = useRef(false);
  const lastReset = useRef(0);

  const trailPositions = useMemo(() => {
    const n = 90;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const r = 2.4 + Math.sin(a * 6) * 0.08;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = Math.sin(a * 2) * 0.5;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (typeof document !== "undefined" && document.hidden) return;

    const d = Math.min(delta, 0.05);
    const reduced = sceneState.reducedMotion;
    const drag = sceneState.drag;

    // --- rotation: drag + keyboard + inertia + idle ----------------------
    // Drain unconsumed input deltas (set by drag or by keyboard nudges).
    const dx = drag.deltaX;
    const dy = drag.deltaY;
    drag.deltaX = 0;
    drag.deltaY = 0;

    if (sceneState.resetToken !== lastReset.current) {
      lastReset.current = sceneState.resetToken;
      resetting.current = true;
      vel.current.x = 0;
      vel.current.y = 0;
    }
    if (drag.active || dx !== 0 || dy !== 0) resetting.current = false;

    if (resetting.current) {
      rot.current.x += (0.14 - rot.current.x) * (1 - Math.pow(0.001, d));
      rot.current.y += (-0.3 - rot.current.y) * (1 - Math.pow(0.001, d));
      if (Math.abs(rot.current.x - 0.14) < 0.002 && Math.abs(rot.current.y + 0.3) < 0.002) {
        resetting.current = false;
      }
    } else {
      // Apply any input (drag or keyboard) directly.
      rot.current.y += dx;
      rot.current.x += dy;
      if (drag.active) {
        // Remember the latest motion so release carries inertia.
        vel.current.y = dx;
        vel.current.x = dy;
      } else {
        rot.current.y += vel.current.y;
        rot.current.x += vel.current.x;
        vel.current.x *= 0.94;
        vel.current.y *= 0.94;
        if (!reduced) rot.current.y += d * 0.12;
      }
      rot.current.x = THREE.MathUtils.clamp(rot.current.x, -0.75, 0.75);
    }

    g.rotation.x = rot.current.x + sceneState.pointerY * 0.05;
    g.rotation.y = rot.current.y + sceneState.pointerX * 0.1;

    // --- hero-linked placement & scale -----------------------------------
    const hv = sceneState.heroVisible;
    const narrow = size.width < 768;
    const baseScale = narrow ? 0.62 : 0.92;
    const s = THREE.MathUtils.lerp(0.4, baseScale, hv);
    g.scale.setScalar(s);
    g.position.x = narrow ? 0 : 1.9;
    g.position.y = (narrow ? 1.15 : 0.1) + (1 - hv) * 2.2;
    g.position.z = -1 + (1 - hv) * -2.5;

    // --- living detail ----------------------------------------------------
    if (ringGroup.current && !reduced) {
      ringGroup.current.rotation.z += d * 0.25;
      ringGroup.current.rotation.x += d * 0.08;
    }
    if (trail.current && !reduced) {
      trail.current.rotation.y -= d * 0.3;
    }
    if (inner.current) {
      const pulse = reduced ? 0.6 : 0.6 + Math.sin(state.clock.elapsedTime * 1.4) * 0.15;
      (inner.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }

    // Restrained hover illumination: brighten the node nearest the pointer ray.
    const px = sceneState.pointerX;
    const py = -sceneState.pointerY;
    let best = -1;
    let bestDist = Infinity;
    nodeRefs.current.forEach((m, i) => {
      if (!m) return;
      const sx = NODES[i][0];
      const sy = NODES[i][1];
      const dist = (sx / 2 - px) ** 2 + (sy / 2 - py) ** 2;
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    nodeRefs.current.forEach((m, i) => {
      if (!m) return;
      const mat = m.material as THREE.MeshStandardMaterial;
      const target = i === best && hv > 0.2 ? 2.6 : 1.1;
      mat.emissiveIntensity += (target - mat.emissiveIntensity) * (reduced ? 1 : 0.12);
      const ts = i === best && hv > 0.2 ? 1.5 : 1;
      m.scale.x += (ts - m.scale.x) * 0.15;
      m.scale.y = m.scale.z = m.scale.x;
    });
  });

  return (
    <group ref={group}>
      {/* Central sculptural form: solid core + translucent wireframe shell */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial
          color="#0d1424"
          emissive="#64E8F2"
          emissiveIntensity={0.6}
          metalness={0.6}
          roughness={0.25}
          transparent
          opacity={0.92}
        />
      </mesh>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color="#9675FF" wireframe transparent opacity={0.28} />
      </mesh>

      {/* Layered orbital rings */}
      <group ref={ringGroup}>
        <mesh rotation={[Math.PI / 2.1, 0, 0]}>
          <torusGeometry args={[1.9, 0.015, 12, 120]} />
          <meshBasicMaterial color="#64E8F2" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.3, 0.012, 12, 120]} />
          <meshBasicMaterial color="#9675FF" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 1.6, Math.PI / 6, 0]}>
          <torusGeometry args={[1.5, 0.01, 12, 120]} />
          <meshBasicMaterial color="#D0F56B" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Connected nodes */}
      {NODES.map((p, i) => (
        <mesh
          key={i}
          position={p}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={i % 2 === 0 ? "#64E8F2" : "#9675FF"}
            emissiveIntensity={1.1}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Links between nodes */}
      {LINKS.map(([a, b], i) => (
        <Line
          key={i}
          points={[NODES[a], NODES[b]]}
          color={i % 2 === 0 ? "#64E8F2" : "#9675FF"}
          lineWidth={1}
          transparent
          opacity={0.35}
        />
      ))}

      {/* Particle trail orbiting the structure */}
      <points ref={trail}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[trailPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#64E8F2"
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  );
}
