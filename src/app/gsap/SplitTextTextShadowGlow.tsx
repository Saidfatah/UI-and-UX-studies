import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { useEffect, useRef } from "react";

gsap.registerPlugin(SplitText)


let initGlowShadow = `100px 100px 100px rgba(255, 0, 140, 0),
  -100px 80px 100px rgba(140, 0, 255, 0),
  80px -100px 100px rgba(20, 40, 180, 0),
  -80px -100px 100px rgba(170, 255, 0, 0)`;

// vibrant gradient
let glowShadow = `
  100px 100px 100px rgba(255, 0, 140, 0.85),
  -100px 80px 100px rgba(140, 0, 255, 0.8),
  80px -100px 100px rgba(20, 40, 180, 0.85),
  -80px -100px 100px rgba(170, 255, 0, 0.75)
`;
export default function SplitTextTextShadowGlow() {
    const h1Ref = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        if (!h1Ref.current) return;


        console.log("Fonts loaded");

        let splitP = new SplitText(h1Ref.current, {
            type: "words,chars",
            linesClass: "split-line"
        })

        let tl = gsap.timeline()

        tl.set(h1Ref.current, { autoAlpha: 0 })
            .to(h1Ref.current, { autoAlpha: 1, duration: 0.5
             })
            .fromTo(splitP.chars, {
                textShadow: initGlowShadow,
                y: 50
            }, {
                duration: 2,
                textShadow: glowShadow,
                y: 0,
                stagger: {
                    amount: 0.3,
                    // repeat: 2,
                }
            })

    }, [ h1Ref]);

    return (<div className="text-[200px] leading-[1] text-white  font-bold">
        <p
            ref={h1Ref} id="h1">Hello World okay </p>

    </div>);
}