'use client'

import { useEffect, useRef } from "react";
import { HERO_BG_SCALE_OUT_DELAY } from "./constants";
import { addClassPromise } from "./utils";

function HeroLoadingBar() {
    const ref = useRef<any>()

    useEffect(() => {
        if (!ref.current) return
        addClassPromise(ref.current, HERO_BG_SCALE_OUT_DELAY, 'loadingBarProgress100', 'loadingBarProgressZero')
    }, [ref]);

    return (
        <div ref={ref} className='loadingBarProgressZero absolute h-[4px] top-0 left-0 z-[99] bg-white' />
    );
}

export default HeroLoadingBar;