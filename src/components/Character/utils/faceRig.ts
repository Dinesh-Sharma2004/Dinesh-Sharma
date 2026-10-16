/**
 * Scroll-driven smile control, shared by the desktop and mobile characters.
 * Kept free of three.js so it can be imported from the main bundle; the real
 * implementation is installed by `addSpecsBeardAndSmile` once the model loads.
 */
export const faceRig = {
  /** latest requested smile, 0 = original face, 1 = full smile */
  value: 0,
  setSmile: (value: number) => {
    faceRig.value = Math.min(1, Math.max(0, value));
  },
};
