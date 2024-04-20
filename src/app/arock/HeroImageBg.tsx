'use client'

import { useEffect, useRef } from "react";
import { HERO_BG_DELAY, HERO_BG_SCALE_OUT_DELAY } from "./constants";
import { addClassPromise } from "./utils";

function HeroImageBg() {
    const ref = useRef<any>()
    const imgref = useRef<any>()

    useEffect(() => {
        if (!ref.current || !imgref.current) return
        addClassPromise(ref.current, HERO_BG_DELAY, 'heroImageBgFullExpanded', 'heroImageBgHidden')
        addClassPromise(imgref.current, HERO_BG_SCALE_OUT_DELAY    , 'heroImageBgScaleOutImg', 'heroImageBgScaleIn')
    }, [ref]);

    return (
    <div ref={ref} className='heroImageBgHidden absolute w-full h-full bottom-0 left-0 z-[0] bg-red-300 ' >
        <img
            ref={imgref}
            className='heroImageBgScaleIn w-full h-full object-cover'
            src='/nikeBg.jpeg'
        />
    </div>
    );
}

export default HeroImageBg;