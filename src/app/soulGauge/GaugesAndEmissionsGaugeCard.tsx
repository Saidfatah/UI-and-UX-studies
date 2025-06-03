'use client';

import clsx from 'clsx';
import gsap from 'gsap';
import { FC, memo, useCallback, useId, useRef } from 'react';


import styles from './GaugesAndEmissionsGaugeCard.module.scss';

interface GaugesAndEmissionsGaugeCardProps {
    data: any;
    className?: string;
}

function radianToDegree(radian: number): number {
    return radian * (180 / Math.PI);
}
function easeInOutSine(x: number): number {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}
const maxAngle = Math.PI;
const initialAngle = 0;


function easeInExpo(x: number): number {
    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
}

const width = 33
const remainingPathOffset = Math.PI * 0.075;
const start = Math.PI / 2;
const strokeWidth = 2;
const radius = (width - strokeWidth) / 2; // Radius based on width and stroke width
const center = width / 2; // Center of the circle

const GaugesAndEmissionsGaugeCard: FC<GaugesAndEmissionsGaugeCardProps> = ({ data, className }) => {
    const uid = useId();
    const $root = useRef<HTMLDivElement | null>(null);
    const $gaugeMainPath = useRef<SVGPathElement | null>(null);
    const $gaugeRemainingPath = useRef<SVGPathElement | null>(null);
    const arrowAndGaugeIndicatorRef = useRef<HTMLDivElement | null>(null);
    const gaugeContainerRef = useRef<HTMLDivElement | null>(null);

    // Calculate the angle based on the percentage (360° * (percentage / 100) for a full circle)
    const angle = (data.value / 100) * Math.PI; // 180° = Math.PI (in radians)

    // Calculate the points for the gauge path
    const mainPathStartX = center + radius * Math.cos(start);
    const mainPathStartY = center + radius * Math.sin(start);
    const mainPathEndX = center + radius * Math.cos(start + initialAngle); // End point
    const mainPathEndY = center + radius * Math.sin(start + initialAngle);



    // Calculation for the empty gauge (remaining to fill)
    const initialRemainingAngle = Math.PI - (initialAngle + remainingPathOffset); // The remaining angle to fill

    const remainingStartX = center + radius * Math.cos(start + (initialAngle + remainingPathOffset));
    const remainingStartY = center + radius * Math.sin(start + (initialAngle + remainingPathOffset));
    const remainingEndX = center + radius * Math.cos(start + Math.PI); // Starting point for the empty gauge (top-right)
    const remainingEndY = center + radius * Math.sin(start + Math.PI);


    const onHover = useCallback(() => {
        if (!$gaugeMainPath.current) return;
        if (!arrowAndGaugeIndicatorRef.current) return;
        if (!gaugeContainerRef.current) return;

        const duration = 1

        gsap.fromTo(
            $gaugeMainPath.current,
            { angle: 0 },
            {
                angle: maxAngle,
                duration,
                onUpdate: function () {
                    if (!$gaugeMainPath.current) return;
                    if (!arrowAndGaugeIndicatorRef.current) return;
                    if (!$gaugeRemainingPath.current) return;

                    const progress = this.time() / duration
                    const animatedAngle = easeInExpo(progress) * Math.PI;
                    const x2 = center + radius * Math.cos(start + animatedAngle);
                    const y2 = center + radius * Math.sin(start + animatedAngle);

                    $gaugeMainPath.current.setAttribute(
                        'd',
                        `M${mainPathStartX} ${mainPathStartY} A${radius} ${radius} 0 ${animatedAngle > Math.PI ? 1 : 0} 1 ${x2} ${y2}`
                    );

                    const clampedANimatedAngle = Math.min(animatedAngle, 0.9 * Math.PI)
                    const remainingAngle = Math.PI - ((clampedANimatedAngle) + remainingPathOffset); // The remaining angle to fill
                    const remainingStartX = center + radius * Math.cos(start + ((clampedANimatedAngle) + remainingPathOffset));
                    const remainingStartY = center + radius * Math.sin(start + ((clampedANimatedAngle) + remainingPathOffset));

                    $gaugeRemainingPath.current.setAttribute(
                        'd',
                        `M${remainingStartX} ${remainingStartY} A${radius} ${radius} 0 ${remainingAngle > Math.PI ? 1 : 0} 1 ${remainingEndX} ${remainingEndY}`
                    );
                    console.log(`M${remainingStartX} ${remainingStartY} A${radius} ${radius} 0 ${remainingAngle > Math.PI ? 1 : 0} 1 ${remainingEndX} ${remainingEndY}`)

                    arrowAndGaugeIndicatorRef.current.style.transform = `rotate(${radianToDegree(animatedAngle - Math.PI / 2)}deg)`

                },
                onComplete: () => {
                    gsap.to(
                        { angle: maxAngle },
                        {
                            angle: angle,
                            duration: 8,
                            onUpdate: function () {
                                if (!$gaugeMainPath.current) return;
                                if (!arrowAndGaugeIndicatorRef.current) return;
                                if (!$gaugeRemainingPath.current) return;

                                const progress = this.time() / 3


                                const animatedAngle = Math.max(Math.PI - (easeInOutSine(progress) * Math.PI), angle);

                                const x2 = center + radius * Math.cos(start + animatedAngle);
                                const y2 = center + radius * Math.sin(start + animatedAngle);

                                $gaugeMainPath.current.setAttribute(
                                    'd',
                                    `M${mainPathStartX} ${mainPathStartY} A${radius} ${radius} 0 ${animatedAngle > Math.PI ? 1 : 0} 1 ${x2} ${y2}`
                                );

                                const clampedANimatedAngle = Math.min(animatedAngle, 0.9 * Math.PI)
                                const remainingAngle = Math.PI - (clampedANimatedAngle + remainingPathOffset); // The remaining angle to fill
                                const remainingStartX = center + radius * Math.cos(start + (clampedANimatedAngle + remainingPathOffset));
                                const remainingStartY = center + radius * Math.sin(start + (clampedANimatedAngle + remainingPathOffset));

                                $gaugeRemainingPath.current.setAttribute(
                                    'd',
                                    `M${remainingStartX} ${remainingStartY} A${radius} ${radius} 0 ${remainingAngle > Math.PI ? 1 : 0} 1 ${remainingEndX} ${remainingEndY}`
                                );

                                arrowAndGaugeIndicatorRef.current.style.transform = `rotate(${radianToDegree(animatedAngle - Math.PI / 2)}deg)`
                            }
                        }
                    );
                }
            }
        );
    }, [$gaugeMainPath, gaugeContainerRef, arrowAndGaugeIndicatorRef, $gaugeRemainingPath])


    return (
        <div
            onMouseEnter={onHover}
            ref={$root}
            className={clsx(styles.root, { [styles[data.type]]: true }, className)}
            style={
                {
                    '--theme-color': `var(--${data.type})`,
                    '--theme-color-secondary': `var(--${data.type}-secondary)`,
                    '--theme-color-tertiary': `var(--${data.type}-tertiary)`
                } as React.CSSProperties & { [key: string]: string }
            }
        >
            <div className={styles.container}>

                <div className={clsx(styles.gauge)}>
                    <div ref={gaugeContainerRef} style={{ transform: "scale(1)", transition: "all 4s cubic-bezier(0.87, 0, 0.13, 1)" }} className='w-full h-full  relative'>
                        <svg className={styles.gaugeMain} width={width} height={width} viewBox={`-5 -5 ${width + 10} ${width + 10}`}>
                            <defs>
                                <linearGradient id={`gradient-${uid}`} x1="0%" y1="100%" x2="0%" y2="0%">
                                    <stop className={styles.gaugeGradientStart} offset="0%" />
                                    <stop className={styles.gaugeGradientMiddle} offset="50%" />
                                    <stop className={styles.gaugeGradientEnd} offset="100%" />
                                </linearGradient>
                            </defs>
                            <path
                                ref={$gaugeMainPath}
                                d={`M${mainPathStartX} ${mainPathStartY} A${radius} ${radius} 0 ${initialAngle > Math.PI ? 1 : 0} 1 ${mainPathEndX} ${mainPathEndY}`}
                                fill="none"
                                // stroke="green" // Color of the gauge
                                stroke={`url(#gradient-${uid})`} // Apply the gradient
                                strokeWidth={strokeWidth}
                                strokeLinecap="round" // Round the stroke edges
                            />


                            {/* Gauge path for the empty portion (space left) */}
                            <path
                                ref={$gaugeRemainingPath}
                                className={styles.gaugeRemaining}
                                d={`M${remainingStartX} ${remainingStartY} A${radius} ${radius} 0 ${initialRemainingAngle > Math.PI ? 1 : 0} 1 ${remainingEndX} ${remainingEndY}`}
                                fill="none"
                                strokeWidth={strokeWidth}
                                strokeLinecap="round" // Round the stroke edges
                            />
                        </svg>

                        <div style={{ width: width, height: width }} className='absolute top-0 right-0'>
                            <div ref={arrowAndGaugeIndicatorRef} style={{ transform: "rotate(-90deg)" }} className=" w-full h-full relative origin-center" >
                                <div className='absolute  w-[6px] h-[1.7px] top-1/2 -translate-y-1/2 translate-x-[1.7px] left-0'>
                                    <div className='translate-y-[-0.3px]  bg-white rounded-[6px]  w-full h-full' />
                                </div>
                                <svg className={styles.gaugeArrow} width="4" height="6" viewBox="0 0 4 6" fill="none">
                                    <path d="M3.553 0.27614L1.65692 5.40634L-2.36319e-07 0L1.81118 1.19906L3.553 0.27614Z" fill="white" />
                                </svg>
                                <div className={styles.bgBlur} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
export default memo(GaugesAndEmissionsGaugeCard);
