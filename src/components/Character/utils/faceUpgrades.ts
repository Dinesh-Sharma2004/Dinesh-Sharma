import * as THREE from "three";

/**
 * Upgrades applied to the EXISTING 3D character (no new model):
 *   - a "smile" morph target on the model's own head mesh, driven by scroll
 *   - a beard grown from the face surface (same skeleton, so it moves with the head)
 *   - round glasses skinned to the head bone (they follow head tracking)
 *
 * Everything lives in the head mesh's local space, measured from the model:
 * eyes at y~13.25, nose tip y~13.1, mouth slit y~12.60, chin y~12.3, face front z~0.9-1.1.
 */

export const faceRig = {
  /** 0 = original face, 1 = full smile */
  // replaced with the real implementation once the model has loaded
  setSmile: (value: number) => {
    void value;
  },
};

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Mouth-region displacement (relative morph delta) for a point in head-mesh space. */
function smileDelta(x: number, y: number, z: number): [number, number, number] {
  if (z < 0.2) return [0, 0, 0];
  const wy = Math.exp(-(((y - 12.6) / 0.17) ** 2));
  const wx = Math.exp(-((x / 0.7) ** 2));
  const w = wy * wx;
  const corner = Math.min(1, Math.abs(x) / 0.42) ** 2; // 0 centre -> 1 corners
  const dx = Math.sign(x) * 0.1 * corner * w; // widen
  let dy = (0.3 * corner - 0.04 * (1 - corner)) * w; // corners up, centre dips
  let dz = 0.04 * corner * w;
  // cheeks lift and bulge a little
  const cheek =
    Math.exp(-(((y - 12.88) / 0.13) ** 2)) * Math.exp(-(((Math.abs(x) - 0.55) / 0.18) ** 2));
  dy += 0.12 * cheek;
  dz += 0.06 * cheek;
  return [dx, dy, dz];
}

/** Beard coverage 0..1 for a point on the face surface. */
function beardWeight(x: number, y: number, z: number): number {
  if (z < -0.1) return 0;
  const ax = Math.abs(x);
  // jaw + chin + sideburns (top edge rises towards the ears, leaves the lips free)
  const yTop = 12.46 + 0.56 * smooth(0.38, 0.95, ax);
  const jaw =
    smooth(11.95, 12.22, y) * (1 - smooth(yTop - (0.07 + 0.17 * smooth(0.4, 0.9, ax)), yTop, y)) * (1 - smooth(0.88, 1.1, ax));
  // moustache just under the nose, above the upper lip
  const mous =
    (1 - smooth(0.24, 0.5, ax)) * smooth(12.63, 12.72, y) * (1 - smooth(12.75, 12.87, y)) *
    smooth(0.3, 0.6, z);
  // cheek bridge: joins the moustache to the jaw beard around the corners of the
  // mouth, so the beard is one connected piece (the lips stay clear in the middle)
  const bridge =
    smooth(0.26, 0.46, ax) * (1 - smooth(0.9, 1.08, ax)) *
    smooth(12.22, 12.46, y) * (1 - smooth(12.74, 12.88, y)) *
    smooth(0.2, 0.5, z);
  return Math.max(jaw, mous, bridge);
}

/**
 * The same coverage function in GLSL. The beard edge is evaluated per pixel from
 * the rest-pose position instead of being interpolated from per-vertex alpha:
 * the face mesh is low-poly, so vertex alpha gave ragged, triangle-shaped edges
 * that tore apart around the mouth while smiling. The rest position is fixed to
 * the surface, so the mask follows the smile morph exactly.
 */
const BEARD_MASK_GLSL = /* glsl */ `
float beardWeight(vec3 p) {
  if (p.z < -0.1) return 0.0;
  float ax = abs(p.x);
  float yTop = 12.46 + 0.56 * smoothstep(0.38, 0.95, ax);
  float jaw = smoothstep(11.95, 12.22, p.y)
    * (1.0 - smoothstep(yTop - (0.07 + 0.17 * smoothstep(0.4, 0.9, ax)), yTop, p.y))
    * (1.0 - smoothstep(0.88, 1.1, ax));
  float mous = (1.0 - smoothstep(0.24, 0.5, ax)) * smoothstep(12.63, 12.72, p.y)
    * (1.0 - smoothstep(12.75, 12.87, p.y)) * smoothstep(0.3, 0.6, p.z);
  float bridge = smoothstep(0.26, 0.46, ax) * (1.0 - smoothstep(0.9, 1.08, ax))
    * smoothstep(12.22, 12.46, p.y) * (1.0 - smoothstep(12.74, 12.88, p.y))
    * smoothstep(0.2, 0.5, p.z);
  return max(jaw, max(mous, bridge));
}
`;

function skinTo(geometry: THREE.BufferGeometry, boneIndex: number) {
  const n = geometry.attributes.position.count;
  const idx = new Uint16Array(n * 4);
  const wt = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) {
    idx[i * 4] = boneIndex;
    wt[i * 4] = 1;
  }
  geometry.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(idx, 4));
  geometry.setAttribute("skinWeight", new THREE.Float32BufferAttribute(wt, 4));
}

export function addSpecsBeardAndSmile(root: THREE.Object3D) {
  const face = root.getObjectByName("Plane007") as THREE.SkinnedMesh | undefined;
  if (!face || !face.skeleton || !face.parent) return;
  const parent = face.parent;
  const headBone = face.skeleton.bones.findIndex((b) => b.name === "spine006");
  const hair = root.getObjectByName("hair") as THREE.Mesh | undefined;
  const hairColor =
    hair && !Array.isArray(hair.material) && (hair.material as THREE.MeshStandardMaterial).color
      ? (hair.material as THREE.MeshStandardMaterial).color.clone()
      : new THREE.Color("#120d0b");

  const smileTargets: { mesh: THREE.Mesh; index: number }[] = [];

  const addSmileTarget = (mesh: THREE.Mesh, source: THREE.BufferGeometry) => {
    const pos = source.attributes.position;
    const deltas = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const [dx, dy, dz] = smileDelta(pos.getX(i), pos.getY(i), pos.getZ(i));
      deltas[i * 3] = dx;
      deltas[i * 3 + 1] = dy;
      deltas[i * 3 + 2] = dz;
    }
    const attr = new THREE.BufferAttribute(deltas, 3);
    attr.name = "smile";
    const geo = mesh.geometry;
    geo.morphAttributes.position = geo.morphAttributes.position || [];
    geo.morphAttributes.position.push(attr);
    geo.morphTargetsRelative = true;
    // meshes that already morph normals need an entry per target (zero delta here)
    if (geo.morphAttributes.normal) {
      const zero = new THREE.BufferAttribute(new Float32Array(pos.count * 3), 3);
      zero.name = "smile";
      geo.morphAttributes.normal.push(zero);
    }
    if (!mesh.morphTargetInfluences) {
      mesh.updateMorphTargets();
    } else {
      mesh.morphTargetInfluences.push(0);
    }
    mesh.morphTargetDictionary = mesh.morphTargetDictionary || {};
    const index = geo.morphAttributes.position.length - 1;
    mesh.morphTargetDictionary.smile = index;
    smileTargets.push({ mesh, index });
  };

  // ---- smile on the model's own face ----
  const originalFacePositions = face.geometry.clone();
  addSmileTarget(face, originalFacePositions);

  // ---- beard (grown from the face surface, same skeleton) ----
  const g = face.geometry;
  const pos = g.attributes.position;
  const nor = g.attributes.normal;
  const index = g.index;
  if (index) {
    const weights = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) weights[i] = beardWeight(pos.getX(i), pos.getY(i), pos.getZ(i));
    const remap = new Map<number, number>();
    const keep: number[] = [];
    const tris: number[] = [];
    for (let t = 0; t < index.count; t += 3) {
      const a = index.getX(t), b = index.getX(t + 1), c = index.getX(t + 2);
      if (weights[a] < 0.001 && weights[b] < 0.001 && weights[c] < 0.001) continue;
      for (const v of [a, b, c]) {
        if (!remap.has(v)) {
          remap.set(v, keep.length);
          keep.push(v);
        }
        tris.push(remap.get(v)!);
      }
    }
    const n = keep.length;
    const bp = new Float32Array(n * 3);
    const bn = new Float32Array(n * 3);
    const rest = new Float32Array(n * 3);
    const bi = new Uint16Array(n * 4);
    const bw = new Float32Array(n * 4);
    const si = g.attributes.skinIndex;
    const sw = g.attributes.skinWeight;
    keep.forEach((v, k) => {
      const w = weights[v];
      const off = 0.005 + 0.017 * w; // thicker in the middle of the beard
      bp[k * 3] = pos.getX(v) + nor.getX(v) * off;
      bp[k * 3 + 1] = pos.getY(v) + nor.getY(v) * off;
      bp[k * 3 + 2] = pos.getZ(v) + nor.getZ(v) * off;
      bn[k * 3] = nor.getX(v);
      bn[k * 3 + 1] = nor.getY(v);
      bn[k * 3 + 2] = nor.getZ(v);
      rest[k * 3] = pos.getX(v);
      rest[k * 3 + 1] = pos.getY(v);
      rest[k * 3 + 2] = pos.getZ(v);
      for (let j = 0; j < 4; j++) {
        bi[k * 4 + j] = si.getComponent(v, j);
        bw[k * 4 + j] = sw.getComponent(v, j);
      }
    });
    const bg = new THREE.BufferGeometry();
    bg.setAttribute("position", new THREE.BufferAttribute(bp, 3));
    bg.setAttribute("normal", new THREE.BufferAttribute(bn, 3));
    bg.setAttribute("aRest", new THREE.BufferAttribute(rest, 3));
    bg.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(bi, 4));
    bg.setAttribute("skinWeight", new THREE.Float32BufferAttribute(bw, 4));
    bg.setIndex(tris);
    const beardMat = new THREE.MeshStandardMaterial({
      color: hairColor,
      transparent: true,
      roughness: 0.92,
      metalness: 0,
    });
    beardMat.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nattribute vec3 aRest;\nvarying vec3 vRest;")
        .replace("#include <begin_vertex>", "#include <begin_vertex>\nvRest = aRest;");
      shader.fragmentShader = shader.fragmentShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vRest;\n" + BEARD_MASK_GLSL)
        .replace(
          "#include <color_fragment>",
          "#include <color_fragment>\ndiffuseColor.a *= smoothstep(0.1, 0.62, beardWeight(vRest));\nif (diffuseColor.a < 0.02) discard;"
        );
    };
    beardMat.customProgramCacheKey = () => "beard-mask";
    const beard = new THREE.SkinnedMesh(bg, beardMat);
    beard.name = "beard";
    beard.frustumCulled = false;
    parent.add(beard);
    beard.bind(face.skeleton, face.bindMatrix);
    beard.bindMode = face.bindMode;
    // beard follows the smile exactly like the skin underneath
    const smileSource = new THREE.BufferGeometry();
    smileSource.setAttribute("position", new THREE.BufferAttribute(bp, 3));
    addSmileTarget(beard, smileSource);
  }

  // ---- glasses (rigid, skinned to the head bone) ----
  const frameMat = new THREE.MeshStandardMaterial({ color: "#0c0c12", metalness: 0.55, roughness: 0.28 });
  const lensMat = new THREE.MeshPhysicalMaterial({
    color: "#bfe3ff",
    transparent: true,
    opacity: 0.14,
    roughness: 0.05,
    metalness: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const addPart = (geo: THREE.BufferGeometry, mat: THREE.Material, name: string) => {
    skinTo(geo, Math.max(0, headBone));
    const m = new THREE.SkinnedMesh(geo, mat);
    m.name = name;
    m.frustumCulled = false;
    parent.add(m);
    m.bind(face.skeleton, face.bindMatrix);
    m.bindMode = face.bindMode;
  };

  const EYE_X = 0.43;
  const EYE_Y = 13.25;
  const GLASS_Z = 1.04;
  const R = 0.3;
  for (const side of [-1, 1]) {
    const ring = new THREE.TorusGeometry(R, 0.024, 14, 48);
    ring.translate(side * EYE_X, EYE_Y, GLASS_Z);
    addPart(ring, frameMat, side < 0 ? "glassesRingL" : "glassesRingR");
    const lens = new THREE.CircleGeometry(R, 40);
    lens.translate(side * EYE_X, EYE_Y, GLASS_Z);
    addPart(lens, lensMat, side < 0 ? "lensL" : "lensR");
    // temple arm back to the ear
    const arm = new THREE.TubeGeometry(
      new THREE.LineCurve3(
        new THREE.Vector3(side * (EYE_X + R), EYE_Y + 0.04, GLASS_Z - 0.02),
        new THREE.Vector3(side * 1.0, EYE_Y + 0.02, 0.15)
      ),
      1,
      0.02,
      8,
      false
    );
    addPart(arm, frameMat, side < 0 ? "armL" : "armR");
  }
  const bridge = new THREE.TubeGeometry(
    new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-(EYE_X - R), EYE_Y + 0.07, GLASS_Z),
      new THREE.Vector3(0, EYE_Y + 0.12, GLASS_Z + 0.03),
      new THREE.Vector3(EYE_X - R, EYE_Y + 0.07, GLASS_Z)
    ),
    10,
    0.02,
    8,
    false
  );
  addPart(bridge, frameMat, "glassesBridge");

  // The face's own "Blink" clip writes the whole morphTargetInfluences array every
  // frame, which wiped the smile back to 0 on each blink (smile on / off / on...).
  // So the smile slot is an accessor the animation mixer cannot overwrite.
  let smileValue = 0;
  smileTargets.forEach(({ mesh, index }) => {
    Object.defineProperty(mesh.morphTargetInfluences!, index, {
      get: () => smileValue,
      set: () => {},
      enumerable: true,
      configurable: true,
    });
  });

  faceRig.setSmile = (value: number) => {
    smileValue = Math.min(1, Math.max(0, value));
  };
}
