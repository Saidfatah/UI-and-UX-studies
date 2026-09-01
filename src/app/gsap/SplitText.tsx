import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { useEffect, useRef } from "react";

gsap.registerPlugin(SplitText)


export default function SplitTextExamples() {
    const textRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!textRef.current) return;

        document.fonts.ready.then(() => {
            console.log("Fonts loaded");
            const mySplitText = new SplitText(textRef.current,
                {
                    type: "chars",
                    // wordsClass: "word++"
                }
            );

            gsap.from(mySplitText.chars, {
                opacity: 0,
                transform: "translateY(100%)",
                textShadow:"0 0 1px transparent",
                // yPercent: "random([-100, 100])",
                // stagger: 0.05,
                stagger: {
                    each: 0.1,
                    from: "start"
                },
                duration: 0.5,
                delay: 1,
            });
        });



    }, [textRef]);

    return (<div 
    
    className="text-[200px]  leading-[1] text-black  font-bold" ref={textRef}>
        SAID FATAH HEEEEY
     
    </div>);
}