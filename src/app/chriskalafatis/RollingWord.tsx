'use client';
import "./chriskalfatis.style.css"
import { useRef } from "react";
import WaveChars from "./WaveChars";

const backgroundInitTransform = "translate(0px, 75%) scale(0,0)";

const RollingWord=({word}:{word:string})=>{
    const ctaHoverBackgroundRef = useRef<HTMLDivElement>(null);
    const linkOuterRef = useRef<HTMLSpanElement>(null);
    const linkInnerRef = useRef<HTMLSpanElement>(null);

    const innerIntroAnimationRef = useRef<any>(null);
    const outerIntroAnimationRef = useRef<any>(null);

    const linkOuterCharsRef = useRef<any>(null);
    const linkInnerCharsRef = useRef<any>(null);


    return (
        <li
            onMouseEnter={(e) => {
                if (!ctaHoverBackgroundRef.current) return;
                ctaHoverBackgroundRef.current.animate(
                    [
                        { transform: backgroundInitTransform },
                        { transform: `translate(0px,0%) scale(1, 1)`, filter: "blur(0px)" }
                    ],
                    {
                        duration: 500,
                        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
                        fill: "forwards"
                    }
                );

                if (!linkOuterRef.current) return;
                if (outerIntroAnimationRef.current) outerIntroAnimationRef.current.cancel();
                linkOuterRef.current.style.transform = "translate(0px, 100%)";
                linkOuterCharsRef.current?.animateToWaveState();

                if (!linkInnerRef.current) return;
                linkInnerRef.current.style.transform = "translate(0px, 100%)";
                linkInnerCharsRef.current?.animateToBaseState();
                innerIntroAnimationRef.current = linkInnerRef.current.animate(
                    [
                        { transform: "translate(0px, 110%)" },
                        { transform: "translate(0px, 8%)" }
                    ],
                    {
                        duration: 400,
                        easing: "cubic-bezier(0.76, 0, 0.24, 1)",
                        fill: "forwards"
                    }
                );
            }}
            onMouseLeave={() => {
                if (!ctaHoverBackgroundRef.current) return;
                ctaHoverBackgroundRef.current.animate(
                    [
                        { transform: `translate(0px,0%) scale(1, 1)`, filter: "blur(0px)" },
                        { transform: backgroundInitTransform }
                    ],
                    {
                        duration: 400,
                        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
                        fill: "forwards"
                    }
                );

                if (!linkInnerRef.current) return;
                if (innerIntroAnimationRef.current) innerIntroAnimationRef.current.cancel();
                linkInnerRef.current.style.transform = "translate(0px, 110%)";
                linkInnerCharsRef.current?.animateToWaveState();

                if (!linkOuterRef.current) return;
                linkOuterCharsRef.current?.animateToBaseState();
                outerIntroAnimationRef.current = linkOuterRef.current.animate(
                    [
                        { transform: "translate(0px, 100%)" },
                        { transform: "translate(0px, 8%)" }
                    ],
                    {
                        duration: 350,
                        easing: "cubic-bezier(0.76, 0, 0.24, 1)",
                        fill: "forwards"
                    }
                );

            }}
            className="header_navigation_item nav_projects nav_cta" >
            <div ref={ctaHoverBackgroundRef} className="cta_hover" style={{ transform: backgroundInitTransform }}></div>
            <a className="header_navigation_link" href="/projects">
                <span ref={linkOuterRef} className="link_outer">
                    <WaveChars ref={linkOuterCharsRef} word={word} />
                </span>
                <span ref={linkInnerRef} className="link_inner"  >
                    <WaveChars ref={linkInnerCharsRef} word={word} />
                </span>
            </a>
        </li>
    )
}
export default RollingWord
