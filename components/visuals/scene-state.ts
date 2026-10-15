/**
 * A single mutable store shared between the DOM (scroll / pointer / slider) and
 * the WebGL render loop. It is intentionally *not* React state: the Canvas reads
 * it inside useFrame so the component tree never re-renders per frame.
 */
export type SceneState = {
  /** Smoothed overall scroll progress 0..1. */
  progress: number;
  /** Latest raw scroll progress 0..1. */
  rawProgress: number;
  /** 1 while the hero fills the viewport, easing to 0 as it scrolls away. */
  heroVisible: number;
  /** Index of the section in view (0 = home). */
  section: number;
  /** Active featured project index, or -1 when none is emphasized. */
  activeProject: number;
  /** Normalized pointer position, -1..1. */
  pointerX: number;
  pointerY: number;
  /** Direct-manipulation drag state for the centerpiece. */
  drag: {
    active: boolean;
    /** Unconsumed rotation deltas (radians). The scene drains these each frame. */
    deltaX: number;
    deltaY: number;
  };
  /** Bumped to snap the centerpiece back to its initial view. */
  resetToken: number;
  /** User preferences / capability flags. */
  reducedMotion: boolean;
  lowPower: boolean;
};

export const sceneState: SceneState = {
  progress: 0,
  rawProgress: 0,
  heroVisible: 1,
  section: 0,
  activeProject: -1,
  pointerX: 0,
  pointerY: 0,
  drag: { active: false, deltaX: 0, deltaY: 0 },
  resetToken: 0,
  reducedMotion: false,
  lowPower: false
};

/** Add a drag delta (radians) to be consumed by the next frame. */
export function pushDrag(deltaX: number, deltaY: number) {
  sceneState.drag.deltaX += deltaX;
  sceneState.drag.deltaY += deltaY;
}

export function setDragging(active: boolean) {
  sceneState.drag.active = active;
}

/** Request the centerpiece to animate back to its initial orientation. */
export function requestReset() {
  sceneState.resetToken += 1;
}

/** Point the scene's lighting/tint at a project (-1 clears the emphasis). */
export function setActiveProject(index: number) {
  sceneState.activeProject = index;
}
