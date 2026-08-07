# Browser Tabs Drag — Context

## Goal
Build a browser-like interface with two parts:
1. **Tabs row** — tabs that can be active or inactive.
2. **Tab content** — empty content area, height `400px` for now.

Drag interactions are being added incrementally with framer-motion.

## Current State

### Layout
- Full-screen centered container on a dark background (`bg-gray-900`) so the white / transparent tabs are visible.
- Inner wrapper is `800px` wide.
- Tabs row (`flex gap-2`) sits directly above the content panel.
- Content panel: `w-full h-[400px] bg-white rounded-lg`, currently empty.

### Tab component
Reusable `Tab` component driven by props `{ label, active, onClick, dragConstraints }`. It is a `motion.button` (framer-motion). Styling uses `clsx` for readability.

- **Active:** white background, black text, taller (`h-[42px]`), bottom corners squared (`rounded-b-none`) to visually connect to the content panel. Shows `cursor-grab` / `active:cursor-grabbing`.
- **Inactive:** 20% transparent white background (`bg-white/20`), white text, shorter (`h-[32px]`).
- Outer `button` is a fixed `h-[42px]` row so inactive (shorter) tabs align to the bottom baseline.

### Drag (framer-motion)
- Only the **active** tab is draggable: `drag={active ? "x" : false}` — horizontal axis only.
- Bounded by the main content window: `dragConstraints={contentRef}`, a ref on the `800px` content panel. Since drag is locked to `x`, only the horizontal width bounds apply.
- `dragElastic={0}` (no rubber-band past bounds) and `dragMomentum={false}` (stops on release).

### Drag → radius linkage (content corner + flare)
The active tab's horizontal drag drives two radii through a shared `utils.ts`.

- A `dragX = useMotionValue(0)` is created in the parent and passed to the active tab via `style={{ x: dragX }}`. Framer-motion reuses that same motion value for the drag gesture, so `dragX` always reflects the active tab's x offset — no extra state or `onDrag` handler needed.
- `utils.ts` exports `scaleRadius(distance, gain, max = MAX_RADIUS)` = `min(abs(distance) * gain, max)`. `abs` → dragging either direction opens the curve; `gain > 1` opens it *faster* than 1:1.
- **Content corner:** `contentRadius = useTransform(dragX, x => scaleRadius(x, CONTENT_GAIN))` → `motion.div` `style={{ borderTopLeftRadius: contentRadius }}` (overrides `rounded-lg` for that one corner). `CONTENT_GAIN = 1.5`.
- **Flare:** `flareR = useTransform(dragX, x => scaleRadius(x, FLARE_GAIN))`, `FLARE_GAIN = 1.2`.

**Pivot history:** originally an `interpolate()` util mapped `[0, MAX_DRAG=200] → [0, 20]`; simplified to a direct clamp (1:1); now generalized to `scaleRadius` with a per-target **gain** so the content corner (1.5) and flare (1.2) can open at different rates. `MAX_RADIUS = 20` still caps both.

### Inverted corner / tab flare (browser-tab shape)
The active tab flares into the content bar with a concave ("inverted") **left** bottom corner, like a Chrome/Safari tab.

**Technique decision — evaluated options:**
1. *SVG whole-tab `clip-path` silhouette*: pixel-perfect but unreadable `objectBoundingBox` numbers, can't track the drag radius. Rejected.
2. *`box-shadow` inverted corner*: pure CSS, workable but hard to size to a live radius.
3. *`radial-gradient` concave corner*: readable, previously prototyped (`InvertedCorner`).
4. **Chosen — `clip-path: path()` concave corner (drag-driven):** an `r × r` white square with a quarter-circle carved out of its **top-left** corner, leaving a concave sliver at the tab/content junction. The whole path string is generated from `r`, so a single motion value drives width, height and geometry.

**Implementation:**
- `utils.ts` → `flareClipPath(r)` returns `path("M r 0 L r r L 0 r A r r 0 0 0 r 0 Z")`.
- In the parent: `flareClip = useTransform(flareR, flareClipPath)` (a `MotionValue<string>`).
- Rendered inside the **active** tab as a `motion.span`, `absolute bottom-0 right-full` (sits just left of the tab bottom), `pointer-events-none`, `aria-hidden`, `backgroundColor: SURFACE`, `style={{ width: flareR, height: flareR, clipPath: flareClip }}`.
- At `flareR = 0` the span is `0×0` → **no flare until you drag**; grows as you drag.
- It briefly lived as a static `.tab::after` clip-path in `style.css`; that was removed once the flare became drag-driven from JS (the `::after` couldn't take a `var()` inside `path()`).

Supporting layout: active inner white div is `relative` so the flare positions against it; nothing sets `overflow: hidden`, so the outward flare stays visible. `SURFACE = "#ffffff"`.

### Open design question — seamless "S" (ogee) from content to active tab
Goal: the content panel's rounded top-left corner (convex) and the tab's flare (concave) should read as one continuous **S / ogee** curve. Two sub-problems:
1. **Tangent continuity** — the convex content arc and concave flare arc must share a tangent at their inflection point (both vertical where they leave the tab edge, both horizontal where they meet the content top line). Equal radii → symmetric S; different gains (1.5 vs 1.2) → asymmetric ogee.
2. **Co-location** — a true junction S only forms where the active tab sits *above* the rounded content corner (i.e. the leftmost tab). For inner tabs the content top edge is flat there, so either (a) the flare alone must form the full ogee (concave + a small convex fillet), or (b) the content rounding must follow the active tab's x, not just the fixed top-left corner. **Undecided.**

### State
- `activeTab` index held in `useState` (defaults to `0`).
- Clicking a tab sets it active.
- Tabs sourced from a static `TABS = ["Tab 1", "Tab 2", "Tab 3"]` array.
- `contentRef` (`useRef<HTMLDivElement>`) on the content panel, passed down as drag constraints.
- `dragX` (`useMotionValue`) shared with the active tab; drives both radii.
- `contentRadius = scaleRadius(dragX, 1.5)` → content top-left corner.
- `flareR = scaleRadius(dragX, 1.2)`, `flareClip = flareClipPath(flareR)` → active tab left flare.
- Constants: `MAX_RADIUS = 20` (in `utils.ts`), `CONTENT_GAIN = 1.5`, `FLARE_GAIN = 1.2`, `SURFACE = "#ffffff"`.

## Conventions
- Next.js App Router page (`"use client"`).
- Tailwind CSS for styling.
- `clsx` for conditional class composition.
- `framer-motion` (`^12.4.10`) for drag interactions.
- No icons / close buttons yet — keep it simple.

## History
1. Built the static view: tabs row + empty `400px` content panel; `Tab` component with active/inactive states.
2. Refactored `Tab` styling to use `clsx`; tuned active/inactive heights and connected the active tab to the content panel.
3. Added framer-motion horizontal drag on the active tab, bounded to the content window width.
4. Linked the active tab's drag to the content panel's top-left border radius. First implemented with an `interpolate()` util (`[0,200]→[0,20]`), then **pivoted** to a direct clamped mapping (radius = `min(abs(dragX), 20)`) for a 1:1 feel; `interpolate` util left in place but unused.
5. Prototyped browser-tab concave "flares" (`radial-gradient` `InvertedCorner`, then a static `.tab::after` `clip-path`).
6. Moved the left flare to a **drag-driven** `clip-path: path()` element: added `utils.ts` (`scaleRadius`, `flareClipPath`), split the single radius into `contentRadius` (gain 1.5) and `flareR` (gain 1.2), removed the static `::after` from `style.css`. Opened the seamless "S / ogee" design question (see above).

## Next Steps
- **Decide the seamless S/ogee approach** (tangent continuity + co-location; see open question above).
- Possibly add a matching right flare / a convex fillet so the flare is a full ogee on its own.
- Drag-to-reorder tabs (swap order as the active tab passes neighbors).
- Snap the dragged tab back into place on release.
- Possibly add icons, close (×) buttons, and real tab content.
