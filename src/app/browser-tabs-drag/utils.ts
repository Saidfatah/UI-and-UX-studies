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

// ----------------------------------------------------------------------------
// Tab reordering (drag to swap)
// ----------------------------------------------------------------------------

/**
 * Which slot the dragged tab currently sits over.
 *
 * `dragOffset` is how far (px) the tab has moved from its home slot. Rounding
 * to the nearest `pitch` means a swap triggers once the tab passes a neighbor's
 * midpoint. Clamped to a valid slot so dragging into empty space past either
 * end just maps to the first / last slot.
 */
export function getTargetSlot(
    fromIndex: number,
    dragOffset: number,
    pitch: number,
    tabCount: number,
) {
    const raw = fromIndex + Math.round(dragOffset / pitch);
    return Math.min(Math.max(raw, 0), tabCount - 1);
}

/**
 * How far (px) a NON-dragged tab should slide to make room for the dragged tab
 * travelling from `fromIndex` to `targetIndex`.
 *
 * - Dragging right: every tab between the old and new slot shifts one pitch left.
 * - Dragging left: every tab between the new and old slot shifts one pitch right.
 * - Everyone else stays put.
 */
export function getReorderShift(
    tabIndex: number,
    fromIndex: number,
    targetIndex: number,
    pitch: number,
) {
    if (fromIndex < targetIndex && tabIndex > fromIndex && tabIndex <= targetIndex) {
        return -pitch;
    }
    if (fromIndex > targetIndex && tabIndex >= targetIndex && tabIndex < fromIndex) {
        return pitch;
    }
    return 0;
}

/**
 * Return a new array with the item at `fromIndex` moved to `toIndex`, sliding
 * the tabs in between over by one. This is the commit step of a tab swap.
 */
export function moveItem<T>(list: T[], fromIndex: number, toIndex: number): T[] {
    const next = [...list];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    return next;
}
