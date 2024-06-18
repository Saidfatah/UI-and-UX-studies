import { useEffect, useRef, useState } from "react";
import { phrasesGroupLoopDuration } from "./constants";
import './griadientMorph.textReveal.css'



function GradiantMorphBgTextReveal2() {

    const [currentPhraseGroupIndex, setCurrentPhraseGroupIndex] = useState(0);

    const loopPhrase = () => {
        setCurrentPhraseGroupIndex(prev => prev >= 3 ? 0 : prev + 1);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            loopPhrase();
        }, (phrasesGroupLoopDuration + 2) * 1000); // Adjust interval based on the length of the current phrase group

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [currentPhraseGroupIndex]);


    return (
        <div className="gradient-bg">
            <svg xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
            <div className="gradients-container">
                {/* <div className="extraGradient" /> */}
                {currentPhraseGroupIndex === 0 && <div className="gradientCircle gradientPosition gradientCircleSaidFatah gradientCircleFadeInFadeOut" />}
                {currentPhraseGroupIndex === 1 && <div className="gradientCircle gradientPosition gradientCircleNabil gradientCircleFadeInFadeOut" />}
                {currentPhraseGroupIndex === 2 && <div className="gradientCircle gradientPosition gradientCircleSaidGouzal gradientCircleFadeInFadeOut" />}
                {currentPhraseGroupIndex === 3 && <div className="gradientCircle gradientPosition gradientCircleMechkouri gradientCircleFadeInFadeOut" />}

                {/* <div ref={interactiveBubbleRef} className="interactive"></div> */}
            </div>
        </div>
    );
}

export default GradiantMorphBgTextReveal2;