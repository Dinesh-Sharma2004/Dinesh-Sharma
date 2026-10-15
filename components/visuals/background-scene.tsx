"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { AiConstellation } from "@/components/visuals/ai-constellation";
import { ParticleField } from "@/components/visuals/particle-field";
import { sceneState } from "@/components/visuals/scene-state";
import { projects } from "@/data/projects";

/** Subtle camera parallax tied to pointer for a real sense of depth. */
function CameraRig() {
  const { camera } = useThree();
  useFrame((_, delta) => {
    if (typeof document !== "undefined" && document.hidden) return;
    const k = sceneState.reducedMotion ? 1 : 1 - Math.pow(0.001, Math.min(delta, 0.05));
    const tx = sceneState.pointerX * 0.6;
    const ty = -sceneState.pointerY * 0.4;
    camera.position.x += (tx - camera.position.x) * k;
    camera.position.y += (ty - camera.position.y) * k;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/** Two coloured point lights that drift with the pointer and tint per project. */
function SceneLights() {
  const cyan = useRef<THREE.PointLight>(null);
  const violet = useRef<THREE.PointLight>(null);
  const cA = useRef(new THREE.Color("#64E8F2"));
  const cB = useRef(new THREE.Color("#9675FF"));
  const tA = useRef(new THREE.Color("#64E8F2"));
  const tB = useRef(new THREE.Color("#9675FF"));

  useFrame((_, delta) => {
    if (typeof document !== "undefined" && document.hidden) return;
    const idx = sceneState.activeProject;
    if (idx >= 0 && idx < projects.length) {
      tA.current.set(projects[idx].accent[0]);
      tB.current.set(projects[idx].accent[1]);
    } else {
      tA.current.set("#64E8F2");
      tB.current.set("#9675FF");
    }
    const k = sceneState.reducedMotion ? 1 : 1 - Math.pow(0.001, Math.min(delta, 0.05));
    cA.current.lerp(tA.current, k);
    cB.current.lerp(tB.current, k);
    if (cyan.current) {
      cyan.current.color.copy(cA.current);
      cyan.current.position.set(3 + sceneState.pointerX * 2, 3 - sceneState.pointerY * 2, 4);
    }
    if (violet.current) {
      violet.current.color.copy(cB.current);
      violet.current.position.set(-3 + sceneState.pointerX * 2, -2 - sceneState.pointerY * 2, 3);
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight ref={cyan} position={[3, 3, 4]} intensity={28} color="#64E8F2" distance={20} />
      <pointLight ref={violet} position={[-3, -2, 3]} intensity={26} color="#9675FF" distance={20} />
    </>
  );
}

export function BackgroundScene({ lowPower }: { lowPower: boolean }) {
  const count = lowPower ? 1200 : 2800;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, lowPower ? 1 : 1.6]}
      gl={{ antialias: !lowPower, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <CameraRig />
      <SceneLights />
      <ParticleField count={count} />
      <AiConstellation />
    </Canvas>
  );
}
