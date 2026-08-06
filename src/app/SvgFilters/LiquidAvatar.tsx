"use client";

import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import "./LiquidAvatar.css";

export type LiquidAvatarProps = {
  /** Portrait image URL. */
  src: string;
  /** Alt text for the portrait. */
  alt?: string;
  /** Diameter in px. Default 256. */
  size?: number;
  /** Fired on click (wire your audio up here). */
  onPlay?: () => void;
  /** Warp strength (feDisplacementMap scale). Default 26. */
  intensity?: number;
  /** How fast the swirl orbits. Default 1. */
  speed?: number;
  /** Feature size of the warp (bigger = broader, slower swells). Default 5. */
  detail?: number;
  /** Radius of the circular pan, px. Larger = more travel. Default 60. */
  swirlRadius?: number;
  /** Color of the hover ring + play button. */
  accentColor?: string;
  /** Background behind the portrait. */
  bgColor?: string;
  /** Show the hover play button. Default true. */
  showPlayButton?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Smooth 2-octave value-noise displacement map (data URI).
 * R = x-displacement, G = y-displacement, centered on 128 (= no shift).
 * Generated once; scrolled at runtime for continuous, non-boiling motion.
 */
function makeFlowNoise(dim: number, detail: number): string {
  if (typeof document === "undefined") return "";
  const canvas = document.createElement("canvas");
  canvas.width = dim;
  canvas.height = dim;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const img = ctx.createImageData(dim, dim);
  const d = img.data;
  const smooth = (t: number) => t * t * (3 - 2 * t);

  // One octave of value noise for a given cell size + channel offset.
  const makeOctave = (cell: number) => {
    const cols = Math.ceil(dim / cell) + 2;
    const grid = new Float32Array(cols * cols);
    for (let i = 0; i < grid.length; i++) grid[i] = Math.random();
    return (x: number, y: number) => {
      const gxf = x / cell;
      const gyf = y / cell;
      const x0 = Math.floor(gxf);
      const y0 = Math.floor(gyf);
      const tx = smooth(gxf - x0);
      const ty = smooth(gyf - y0);
      const v00 = grid[y0 * cols + x0];
      const v10 = grid[y0 * cols + x0 + 1];
      const v01 = grid[(y0 + 1) * cols + x0];
      const v11 = grid[(y0 + 1) * cols + x0 + 1];
      const a = v00 + (v10 - v00) * tx;
      const b = v01 + (v11 - v01) * tx;
      return a + (b - a) * ty;
    };
  };

  const big = Math.max(8, Math.floor(dim / detail));
  const small = Math.max(4, Math.floor(big / 2));
  const rBig = makeOctave(big);
  const rSmall = makeOctave(small);
  const gBig = makeOctave(big);
  const gSmall = makeOctave(small);

  let p = 0;
  for (let y = 0; y < dim; y++) {
    for (let x = 0; x < dim; x++) {
      const r = rBig(x, y) * 0.7 + rSmall(x, y) * 0.3;
      const g = gBig(x, y) * 0.7 + gSmall(x, y) * 0.3;
      d[p++] = r * 255; // x-displacement channel
      d[p++] = g * 255; // y-displacement channel
      d[p++] = 128;
      d[p++] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL("image/png");
}

export default function LiquidAvatar({
  src,
  alt = "",
  size = 256,
  onPlay,
  intensity = 26,
  speed = 1,
  detail = 5,
  swirlRadius = 60,
  accentColor = "#ffffff",
  bgColor = "#0d0b1a",
  showPlayButton = true,
  className = "",
  style,
}: LiquidAvatarProps) {
  const rawId = useId();
  // useId can contain ":" which is invalid in url(#id) — sanitize.
  const warpId = `warp-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef<SVGFEOffsetElement | null>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const inViewRef = useRef(true);

  const [reduced, setReduced] = useState(false);
  const [noiseURI, setNoiseURI] = useState("");

  // Margin so the scrolled noise never runs out under the sampled region.
  const margin = Math.ceil(swirlRadius) + 20;
  const noiseDim = size + margin * 2;

  // Reduced-motion detection.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Build the displacement map once (per size/detail config).
  useEffect(() => {
    setNoiseURI(makeFlowNoise(noiseDim, detail));
  }, [noiseDim, detail]);

  const tick = useCallback(
    (t: number) => {
      const off = offsetRef.current;
      const disp = dispRef.current;
      if (!off || !disp) return;

      const time = (t / 1000) * speed;

      // Pan the (static) noise field around a circle -> every pixel's
      // displacement vector rotates smoothly. Because it's a pure translate
      // of an already-computed field, there's no boiling and it loops
      // seamlessly: continuous circular / tornado-like flow.
      const dx = Math.sin(time * 0.7) * swirlRadius;
      const dy = Math.cos(time * 0.7) * swirlRadius;
      off.setAttribute("dx", dx.toFixed(2));
      off.setAttribute("dy", dy.toFixed(2));

      // Gentle breathing of the warp depth (smooth, optional).
      const scale = intensity + Math.sin(time * 0.5) * (intensity * 0.15);
      disp.setAttribute("scale", scale.toFixed(2));
    },
    [intensity, speed, swirlRadius]
  );

  // rAF loop + viewport pause + unmount cleanup.
  useEffect(() => {
    if (reduced) {
      dispRef.current?.setAttribute("scale", "0");
      return;
    }

    const loop = (t: number) => {
      if (inViewRef.current) tick(t);
      rafRef.current = requestAnimationFrame(loop);
    };
    const start = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const el = rootRef.current;
    let io: IntersectionObserver | null = null;
    if (el && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          inViewRef.current = entry.isIntersecting;
          if (entry.isIntersecting) start();
          else stop();
        },
        { threshold: 0.01 }
      );
      io.observe(el);
    } else {
      start();
    }

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (inViewRef.current) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [tick, reduced]);

  const handleActivate = useCallback(() => onPlay?.(), [onPlay]);

  const cssVars = {
    "--la-size": `${size}px`,
    "--la-bg": bgColor,
    "--la-accent": accentColor,
  } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`liquid-avatar ${reduced ? "is-reduced" : ""} ${className}`}
      style={{ ...cssVars, ...style }}
      role={onPlay ? "button" : undefined}
      tabIndex={onPlay ? 0 : undefined}
      aria-label={onPlay ? `Play ${alt || "audio"}` : undefined}
      onClick={onPlay ? handleActivate : undefined}
      onKeyDown={
        onPlay
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleActivate();
              }
            }
          : undefined
      }
    >
      {/* Off-DOM SVG holding the animated warp filter (unique per instance). */}
      <svg className="liquid-avatar__defs" aria-hidden="true" focusable="false">
        <defs>
          <filter
            id={warpId}
            x={-margin}
            y={-margin}
            width={noiseDim}
            height={noiseDim}
            filterUnits="userSpaceOnUse"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            {noiseURI ? (
              <feImage
                href={noiseURI}
                x={-margin}
                y={-margin}
                width={noiseDim}
                height={noiseDim}
                preserveAspectRatio="none"
                result="nz"
              />
            ) : null}
            <feOffset ref={offsetRef} in="nz" dx="0" dy="0" result="nzo" />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="nzo"
              scale={intensity}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="liquid-avatar__stage">
        {/* Portrait warped by the scrolling-noise displacement filter. */}
        <img
          className="liquid-avatar__img"
          style={{ filter: noiseURI ? `url(#${warpId})` : undefined }}
          src={src}
          alt={alt}
          draggable={false}
        />

        {/* Hover ring */}
        <div className="liquid-avatar__ring" aria-hidden="true" />

        {/* Hover play button */}
        {showPlayButton && (
          <div className="liquid-avatar__play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="40%" height="40%">
              <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
