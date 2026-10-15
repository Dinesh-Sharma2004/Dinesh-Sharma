"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { sceneState } from "@/components/visuals/scene-state";
import { projects } from "@/data/projects";

type FieldProps = { count: number };

/** smoothstep in GLSL-free TS */
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uCloud;
  uniform float uNet;
  uniform float uGrid;
  uniform float uPixelRatio;
  uniform float uMotion;   // 0 when reduced motion
  attribute vec3 aNet;
  attribute vec3 aGrid;
  attribute float aMix;
  attribute float aSize;
  attribute float aPhase;
  varying float vMix;
  varying float vFade;

  void main() {
    vMix = aMix;
    // Blend between the three target layouts.
    vec3 pos = position * uCloud + aNet * uNet + aGrid * uGrid;

    // Gentle curl so the field feels alive (disabled under reduced motion).
    float t = uTime * 0.35 + aPhase;
    pos.x += sin(t) * 0.12 * uMotion;
    pos.y += cos(t * 0.9) * 0.12 * uMotion;
    pos.z += sin(t * 0.7) * 0.10 * uMotion;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    // Fade particles that are far behind for depth.
    vFade = smoothstep(-16.0, -2.0, mvPosition.z);
    gl_PointSize = aSize * uPixelRatio * (260.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uAccentA;
  uniform vec3 uAccentB;
  uniform float uOpacity;
  varying float vMix;
  varying float vFade;

  void main() {
    // Soft round sprite.
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.08, d);
    if (alpha <= 0.01) discard;
    vec3 color = mix(uAccentA, uAccentB, vMix);
    gl_FragColor = vec4(color, alpha * uOpacity * vFade);
  }
`;

export function ParticleField({ count }: FieldProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const accentA = useRef(new THREE.Color("#64E8F2"));
  const accentB = useRef(new THREE.Color("#9675FF"));
  const targetA = useRef(new THREE.Color("#64E8F2"));
  const targetB = useRef(new THREE.Color("#9675FF"));

  const { positions, net, grid, mixes, sizes, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const net = new Float32Array(count * 3);
    const grid = new Float32Array(count * 3);
    const mixes = new Float32Array(count);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);

    // A small set of cluster centers for the "connected intelligence" state.
    const clusters = 7;
    const centers: THREE.Vector3[] = [];
    for (let c = 0; c < clusters; c++) {
      const a = (c / clusters) * Math.PI * 2;
      centers.push(new THREE.Vector3(Math.cos(a) * 6, Math.sin(a * 1.3) * 3.4, Math.sin(a) * 4));
    }

    const gridCols = Math.ceil(Math.sqrt(count));
    for (let i = 0; i < count; i++) {
      // Cloud: soft spherical latent space.
      const r = 6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi) - 2;

      // Net: gather around a cluster center.
      const center = centers[i % clusters];
      net[i * 3] = center.x + (Math.random() - 0.5) * 2.4;
      net[i * 3 + 1] = center.y + (Math.random() - 0.5) * 2.4;
      net[i * 3 + 2] = center.z + (Math.random() - 0.5) * 2.4;

      // Grid: ordered analytical lattice with a subtle wave in z.
      const gx = i % gridCols;
      const gy = Math.floor(i / gridCols);
      const nx = (gx / gridCols - 0.5) * 22;
      const ny = (gy / gridCols - 0.5) * 13;
      grid[i * 3] = nx;
      grid[i * 3 + 1] = ny;
      grid[i * 3 + 2] = Math.sin(nx * 0.4) * Math.cos(ny * 0.4) * 1.6 - 3;

      mixes[i] = Math.random();
      sizes[i] = 1.4 + Math.random() * 2.6;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, net, grid, mixes, sizes, phases };
  }, [count]);

  useFrame((state, delta) => {
    const mat = materialRef.current;
    if (!mat) return;
    if (typeof document !== "undefined" && document.hidden) return;

    const d = Math.min(delta, 0.05);
    const u = mat.uniforms;
    const reduced = sceneState.reducedMotion;

    if (!reduced) u.uTime.value += d;
    u.uMotion.value = reduced ? 0 : 1;

    // Smooth the scroll progress for the layout blend.
    sceneState.progress += (sceneState.rawProgress - sceneState.progress) * (reduced ? 1 : 0.06);
    const p = sceneState.progress;

    // State weights across the page: cloud -> net -> grid, then calm at the end.
    const wCloud = 1 - smoothstep(0.02, 0.32, p);
    const wGrid = smoothstep(0.34, 0.74, p);
    const wNet = Math.max(0, 1 - wCloud - wGrid);
    const norm = wCloud + wNet + wGrid || 1;
    u.uCloud.value = wCloud / norm;
    u.uNet.value = wNet / norm;
    u.uGrid.value = wGrid / norm;

    // Reduce density/brightness toward the contact state (State E).
    const calm = smoothstep(0.82, 1, p);
    u.uOpacity.value = (0.9 - calm * 0.45) * (sceneState.lowPower ? 0.85 : 1);

    // Project-responsive accent tint (State D) with smooth color easing.
    const idx = sceneState.activeProject;
    if (idx >= 0 && idx < projects.length) {
      targetA.current.set(projects[idx].accent[0]);
      targetB.current.set(projects[idx].accent[1]);
    } else {
      targetA.current.set("#64E8F2");
      targetB.current.set("#9675FF");
    }
    const k = reduced ? 1 : 1 - Math.pow(0.001, d);
    accentA.current.lerp(targetA.current, k);
    accentB.current.lerp(targetB.current, k);
    (u.uAccentA.value as THREE.Color).copy(accentA.current);
    (u.uAccentB.value as THREE.Color).copy(accentB.current);
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCloud: { value: 1 },
      uNet: { value: 0 },
      uGrid: { value: 0 },
      uPixelRatio: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 },
      uMotion: { value: 1 },
      uOpacity: { value: 0.9 },
      uAccentA: { value: new THREE.Color("#64E8F2") },
      uAccentB: { value: new THREE.Color("#9675FF") }
    }),
    []
  );

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aNet" args={[net, 3]} />
        <bufferAttribute attach="attributes-aGrid" args={[grid, 3]} />
        <bufferAttribute attach="attributes-aMix" args={[mixes, 1]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
