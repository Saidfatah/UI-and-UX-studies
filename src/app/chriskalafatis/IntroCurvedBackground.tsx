'use client'
import { forwardRef, useCallback, useEffect, useImperativeHandle } from "react";
import { motion, useAnimate } from "framer-motion";

export type IntroCurvedBackgroundRef = {
    startAnimation: () => void;
};

const IntroCurvedBackground = forwardRef<IntroCurvedBackgroundRef, {}>((props, ref): JSX.Element => {
    const [scope, animate] = useAnimate();

    // here path draws a rectangle that cover whole page 
    const pathWhenAnimationFirstStarts = `
     M0,0 
     Q${window.innerWidth / 2},0 ${window.innerWidth},0 
     L${window.innerWidth},${window.innerHeight} 
     L0,${window.innerHeight} 
     Z`;

    // here path cover half the screen and the top is a curve towards the bottom
    // const pathAtTheMiddleOfTheAnimation = `
    // M0,${window.innerHeight / 2} 
    // Q${window.innerWidth / 2},${window.innerHeight / 2 + 100} ${window.innerWidth},${window.innerHeight / 2} 
    // L${window.innerWidth},${window.innerHeight} 
    // L0,${window.innerHeight} 
    // Z`;
    const pathAtTheMiddleOfTheAnimation = `
    M0,${window.innerHeight} 
    Q${window.innerWidth / 2},${window.innerHeight + 200} ${window.innerWidth},${window.innerHeight} 
    L${window.innerWidth},${window.innerHeight} 
    L0,${window.innerHeight} 
    Z`;

    const pathAtTheEndOfTheAnimation = `
    M0,${window.innerHeight} 
    Q${window.innerWidth / 2},${window.innerHeight} ${window.innerWidth},${window.innerHeight} 
    L${window.innerWidth},${window.innerHeight} 
    L0,${window.innerHeight} 
    Z`;

    const startAnimation = useCallback(async () => {
        animate(scope.current,
            {
                d: [
                    pathWhenAnimationFirstStarts,
                    pathAtTheMiddleOfTheAnimation,
                    pathAtTheEndOfTheAnimation,
                ]
            },
            {
                duration: 1.3,
                ease: [0.76, 0, 0.24, 1],
                times: [0, 0.4, 1],
            }
        );

    }, [animate, pathWhenAnimationFirstStarts, pathAtTheMiddleOfTheAnimation, pathAtTheEndOfTheAnimation, scope]);


    useImperativeHandle(ref, () => ({
        startAnimation,
    }));


    return (
        <svg className="absolute top-0 left-0 w-full h-full fill-white stroke-none">
            <motion.path ref={scope} d={pathWhenAnimationFirstStarts} fill="white" />
        </svg>
    );
});

IntroCurvedBackground.displayName = 'IntroCurvedBackground';

export default IntroCurvedBackground;