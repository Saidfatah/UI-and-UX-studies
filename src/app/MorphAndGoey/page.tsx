"use client";
import React, { useEffect, useRef, useState } from "react";

// SVG shapes (same structure, different shapes)
const state1Path = "M12 1C6.477 1 2 5.477 2 11s4.477 10 10 10 10-4.477 10-10S17.523 1 12 1Z"; // Circle outline
const state2Path =
  "M12 1C13.4122 1 14.9155 1.5315 16.417 2.43652C17.9126 3.33802 19.3471 4.5746 20.6006 5.89062C21.8524 7.20495 22.8999 8.57454 23.6289 9.71875C23.9939 10.2917 24.2705 10.7938 24.4512 11.1934C24.5415 11.393 24.6018 11.5553 24.6387 11.6787C24.6783 11.8113 24.6777 11.8576 24.6777 11.8408C24.6777 11.9798 24.622 12.276 24.4336 12.7451C24.2532 13.1942 23.9796 13.7333 23.6172 14.332C22.8928 15.5288 21.8497 16.9087 20.6016 18.2148C18.054 20.8806 14.8847 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1Z";

const MorphingBlobs: React.FC = () => {
  const icon1Ref = useRef<SVGPathElement>(null);
  const icon2Ref = useRef<SVGPathElement>(null);
  const sceneRef = useRef<SVGGElement>(null);
  const [gooActive, setGooActive] = useState(false);

  useEffect(() => {
    const icon1 = icon1Ref.current;
    const icon2 = icon2Ref.current;
    const scene = sceneRef.current;
    if (!icon1 || !icon2 || !scene) return;

    const duration = 3000;

    // Animate both icons morphing
    const anim1 = icon1.animate([{ d: state1Path }, { d: state2Path }], {
      duration,
      direction: "alternate",
      iterations: Infinity,
      easing: "ease-in-out",
    });

    const anim2 = icon2.animate([{ d: state2Path }, { d: state1Path }], {
      duration,
      direction: "alternate",
      iterations: Infinity,
      easing: "ease-in-out",
      delay: duration / 2,
    });

    // Goo logic
    const GOO_THRESHOLD = 60;
    let lastState = false;
    let running = true;

    const getCenterDistance = (el1: SVGPathElement, el2: SVGPathElement) => {
      const r1 = el1.getBoundingClientRect();
      const r2 = el2.getBoundingClientRect();
      const x1 = r1.left + r1.width / 2;
      const y1 = r1.top + r1.height / 2;
      const x2 = r2.left + r2.width / 2;
      const y2 = r2.top + r2.height / 2;
      return Math.hypot(x1 - x2, y1 - y2);
    };

    const tick = () => {
      if (!running) return;
      const dist = getCenterDistance(icon1, icon2);
      const active = dist < GOO_THRESHOLD;
      if (active !== lastState) {
        lastState = active;
        setGooActive(active);
      }
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    return () => {
      running = false;
      anim1.cancel();
      anim2.cancel();
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[30vmin] h-[30vmin] overflow-visible"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>

        <g
          ref={sceneRef}
          filter={gooActive ? "url(#goo)" : undefined}
          style={{ transition: "filter 0.3s ease" }}
        >
          <path
            ref={icon1Ref}
            d={state1Path}
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <path
            ref={icon2Ref}
            d={state2Path}
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};

export default MorphingBlobs;
