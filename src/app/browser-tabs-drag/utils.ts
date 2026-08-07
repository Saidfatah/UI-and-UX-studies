// Shared radius cap for both the content corner and the tab flare.

/**
 * Map a drag distance (px) to a radius, scaled by `gain` and clamped to `max`.
 *
 * `gain > 1` means the radius grows *faster* than the drag — e.g. gain `1.5`
 * reaches the 20px cap after ~13px of drag. Direction-agnostic (`abs`), so
 * dragging either way opens the curve.
 */
export function scaleRadius(distance: number, gain: number, max: number) {
    return Math.min(Math.abs(distance) * gain, max);
}

/**
 * clip-path for the active tab's LEFT flare — a concave ("inverted") corner.
 *
 * The flare is an `r × r` white square sitting just left of the tab bottom.
 * We keep the square but carve a quarter-circle out of its TOP-LEFT corner,
 * leaving a concave sliver near the tab/content junction. Everything scales
 * from `r`, so the same value can drive width, height and the path.
 */
export function leftFlareClipPath(r: number) {
    return `path("M ${r} 0 L ${r} ${r} L 0 ${r} A ${r} ${r} 0 0 0 ${r} 0 Z")`;
}

export function rightFlareClipPath(width: number, height: number) {
  return `path("M 0 0 Q 0 ${height} ${width} ${height} L 0 ${height} Z")`;
}
