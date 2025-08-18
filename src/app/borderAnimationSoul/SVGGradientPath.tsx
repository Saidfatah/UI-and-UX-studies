'use client';

import gsap from 'gsap';
import throttle from 'lodash.throttle';
import { FC, memo, RefObject, useEffect, useRef, useState } from 'react';

import { cmap, normalize } from './math';

export interface SVGGradientPathProps {
  $path: RefObject<SVGPathElement>;
  isActive: boolean;
  colors?: string[];
  precision?: number;
  start?: number;
  end?: number;
  speed?: number;
  duration?: number;
  resizeThrottleTime?: number;
}

const usePathLength = ($path: RefObject<SVGPathElement>, resizeThrottleTime = 100) => {
  const [totalLength, setTotalLength] = useState(0);

  const updateLength =
    resizeThrottleTime > 0
      ? throttle(() => {
        if ($path.current) {
          setTotalLength($path.current.getTotalLength());
        }
      }, resizeThrottleTime)
      : () => {
        if ($path.current) {
          setTotalLength($path.current.getTotalLength());
        }
      };

  useEffect(() => {
    updateLength();
  }, [$path, resizeThrottleTime]);


  return totalLength;
}

const useGSAPAnimations = (
  $path: RefObject<any>,
  $circles: RefObject<Map<number, SVGCircleElement>>,
  count: number,
  totalLength: number,
  speed?: number,
  duration?: number
) => {

  useEffect(() => {
    if (!$path.current || !$circles.current) return;

    const animations: gsap.core.Tween[] = [];

    $circles.current.forEach(($circle, index) => {
      const startValue = normalize(index, 0, count);

      gsap.set($circle, {
        motionPath: { path: $path.current, start: startValue }
      });

      const durationValue = speed ? totalLength / speed : duration || 1;

      const tween = gsap.to($circle, {
        duration: durationValue,
        motionPath: { path: $path.current },
        ease: 'none',
        repeat: -1
      }).progress(startValue);

      animations.push(tween);
    });

    return () => {
      animations.forEach((tween) => tween.kill());
    };
  }, [$path, $circles, count, totalLength, speed, duration]);
  
}

const createCircles = (
  count: number,
  segmentLength: number,
  colors: string[],
  start: number,
  end: number,
  setCircleRef: (index: number, el: SVGCircleElement | null) => void
) => {
  console.log({ count })
  return Array.from({ length: count }).map((_, index) => (
    <circle
      key={index}
      ref={(el) => setCircleRef(index, el)}
      cx={0}
      cy={0}
      r={1 + segmentLength * 0.5}
      fill={gsap.utils.interpolate(colors, cmap((index + 1) / count, start, end, 0, 1))}
    />
  ));
}

const SVGGradientPath: FC<SVGGradientPathProps> = ({
  $path,
  isActive = true,
  colors = ['#000000', '#FFFFFF'],
  // precision = 8,
  start = 0.5,
  end = 1,
  speed = 50,
  duration,
  resizeThrottleTime = 100
}) => {
  const precision = 10
  const $root = useRef<SVGGElement | null>(null);
  const $circles = useRef<Map<number, SVGCircleElement>>(new Map());

  const totalLength = usePathLength($path, resizeThrottleTime);
  const segmentLength = 100 / precision;
  const count = Math.round(totalLength / segmentLength);

  const setCircleRef = (index: number, el: SVGCircleElement | null) => {
    if (el) $circles.current.set(index, el);
    else $circles.current.delete(index);
  };

  useGSAPAnimations($path, $circles, count, totalLength, speed, duration);

  return (
    <g ref={$root}>
      {createCircles(count, segmentLength, colors, start, end, setCircleRef)}
    </g>
  );
};

export default memo(SVGGradientPath);
