import classNames from 'clsx';
import React, { memo, useCallback, useEffect, useId, useRef, useState } from 'react';
import SvgGradientPath from './SVGGradientPath';



const Edges: React.FC<any> = ({
    className,
    fill = 'none',
    stroke = 'none',
    strokeWidth = 1,
    borderRadiusTopLeft = 0,
    borderRadiusTopRight = 0,
    borderRadiusBottomRight = 0,
    borderRadiusBottomLeft = 0,

    fillGradientIds,
    fillGradients,

    mask,
    maskId,
    customId,

    isBorderGradientActive = true,
    isBorderGradientActiveOffDelay = 200,
    gradient,
}) => {
    const _uid = useId();
    const uid = customId ?? _uid;


    const $svg = useRef<SVGSVGElement>(null);
    const $path = useRef<SVGPathElement>(null);
    const $pathFillGradients = useRef<Array<SVGPathElement>>([]);
    const $gradientBorderPath = useRef<SVGPathElement>(null);


    const [borderGradientActive, setBorderGradientActive] = useState(isBorderGradientActive);
    const borderGradientActiveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const getPath = useCallback((width: number, height: number) => {
        return `
    M${width - borderRadiusTopRight - strokeWidth},${strokeWidth}
    L${width - strokeWidth},${borderRadiusTopRight + strokeWidth}
    L${width - strokeWidth},${height - borderRadiusBottomRight - strokeWidth}
    L${width - borderRadiusBottomRight - strokeWidth},${height - strokeWidth}
    L${borderRadiusBottomLeft + strokeWidth},${height - strokeWidth}
    L${strokeWidth},${height - borderRadiusBottomLeft - strokeWidth}
    L${strokeWidth},${borderRadiusTopLeft + strokeWidth}
    L${borderRadiusTopLeft + strokeWidth},${strokeWidth}
    Z
  `;
    }, [borderRadiusTopRight, strokeWidth, borderRadiusBottomRight, borderRadiusBottomLeft, borderRadiusTopLeft]);


    const onResize = useCallback(() => {
        console.log("onResize")
        if ($svg.current) {
            const svgRect = $svg.current.getBoundingClientRect();

            const path = getPath(svgRect.width, svgRect.height);
            if ($path.current) {
                $path.current.setAttribute('d', path);
            }

            for (let i = 0, j = $pathFillGradients.current.length; i < j; i++) {
                const $pathFillGradient = $pathFillGradients.current[i];
                $pathFillGradient.setAttribute('d', path);
            }

            if ($gradientBorderPath.current) {
                $gradientBorderPath.current.setAttribute('d', path);
            }

        }
    }, [getPath]);

    useEffect(() => {
        if ($svg.current) {
            const resizeObserver = new ResizeObserver(() => {
                onResize();
            });

            resizeObserver.observe($svg.current);

            return () => {
                if ($svg.current) {
                    resizeObserver.unobserve($svg.current);
                }
                resizeObserver.disconnect();
            };
        }
    }, [$svg, onResize]);

    const fillGradientsPaths = fillGradients?.map((item: any, index: any) => {
        if (fillGradientIds && fillGradientIds[index]) {
            return (
                <path
                    key={fillGradientIds[index]}
                    className={classNames('EdgesFillGradientPath')}
                    ref={(el) => {
                        if (el) $pathFillGradients.current[index] = el;
                    }}
                    fill={`url('#${fillGradientIds[index]}')`}
                />
            );
        }
    });

    const fillGradientsDefs = fillGradients?.map((gradient: any, index: any) => {
        return <g key={index}>{gradient}</g>;
    });

    return (
        <svg ref={$svg} className={classNames(className, " absolute top-0 left-0 w-full h-full", ' z-0', 'Edges')} width="100%" height="100%">
            <path
                className={classNames('EdgesMainPath')}
                ref={$path}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />

            {fillGradientsPaths}
            <defs>{fillGradientsDefs}</defs>


            <defs>
                <path ref={$gradientBorderPath} id={`defs-path-${uid}`} />
            </defs>



            <mask id={`${uid}`}>
                <use href={`#defs-path-${uid}`} stroke="white" />
            </mask>


            <g mask={`url(#${uid})`} >
                <SvgGradientPath
                    isActive={true}
                    $path={$path}
                    colors={gradient}
                    precision={10}
                    speed={10}
                />
            </g>
        </svg>
    );
};

export default memo(Edges);
