import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import setAnimations from "./utils/animationUtils";

/**
 * The same 3D character (glasses, beard, scroll-driven smile) for phones and
 * tablets. It only fills the hero: no camera choreography, no desk. The static
 * robot underneath stays visible until the model is ready, and for good if
 * WebGL or the model fails.
 */
const MobileCharacter = ({ onReady }: { onReady: () => void }) => {
  const host = useRef<HTMLDivElement | null>(null);
  const ready = useRef(onReady);
  ready.current = onReady;

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let cancelled = false;
    let raf = 0;
    let visible = true;
    const cleanups: Array<() => void> = [];

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio < 2,
        powerPreference: "high-performance",
      });
    } catch {
      return; // no WebGL: keep the robot
    }
    const scene = new THREE.Scene();
    const rect = el.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    el.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, rect.width / rect.height, 0.1, 1000);
    camera.position.set(0, 12.7, 24.7);
    camera.zoom = 1.15;
    camera.updateProjectionMatrix();

    const light = setLighting(scene);
    const { loadCharacter } = setCharacter(renderer, scene, camera, { withScroll: false });

    let mixer: THREE.AnimationMixer | undefined;
    let headBone: THREE.Object3D | null = null;
    const clock = new THREE.Clock();
    // pointer / touch target for the head (mirrored like the desktop canvas)
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let idleTimer: ReturnType<typeof setTimeout> | undefined;

    const onPointer = (e: PointerEvent) => {
      target.x = -((e.clientX / window.innerWidth) * 2 - 1);
      target.y = -((e.clientY / window.innerHeight) * 2 - 1);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        target.x = 0;
        target.y = 0;
      }, 2000);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    cleanups.push(() => window.removeEventListener("pointermove", onPointer));

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);
    cleanups.push(() => io.disconnect());

    const onResize = () => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      renderer.setSize(r.width, r.height);
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
    cleanups.push(() => window.removeEventListener("resize", onResize));

    loadCharacter()
      .then((gltf) => {
        if (cancelled || !gltf) return;
        const character = gltf.scene;
        // the desk, monitor and screen glow belong to the desktop scroll story
        character.children.forEach((object: any) => {
          if (object.name === "Plane004") {
            object.children.forEach((child: any) => {
              child.material.transparent = true;
              child.material.opacity = 0;
            });
          }
          if (object.name === "screenlight") {
            object.material.transparent = true;
            object.material.opacity = 0;
          }
        });
        const animations = setAnimations(gltf);
        mixer = animations.mixer;
        scene.add(character);
        headBone = character.getObjectByName("spine006") || null;
        light.turnOnLights();
        animations.startIntro();
        ready.current();
      })
      .catch(() => {
        /* keep the robot */
      });

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) {
        clock.getDelta();
        return;
      }
      if (headBone) {
        current.x = THREE.MathUtils.lerp(current.x, target.x, 0.1);
        current.y = THREE.MathUtils.lerp(current.y, target.y, 0.1);
        const maxRotation = Math.PI / 6;
        headBone.rotation.y = current.x * maxRotation;
        headBone.rotation.x = -THREE.MathUtils.clamp(current.y, -0.3, 0.4) - 0.5 * maxRotation;
      }
      mixer?.update(clock.getDelta());
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
      cleanups.forEach((fn) => fn());
      scene.clear();
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="mobile-3d" ref={host}>
      {/* purple glow behind the character, switched on by the scene lighting */}
      <div className="character-rim" />
    </div>
  );
};

export default MobileCharacter;
