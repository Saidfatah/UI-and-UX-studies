import { forwardRef } from "react";
import { easeInOutExpoCubic, wordTransitionDelayIncrement, wordTransitionDuration } from "./constants";


const WordRevealAnimation = forwardRef(({ word, isVisible, id, index }: { word: string, index: number, isVisible?: boolean, id: string }, ref) => {
    console.log(`all ${wordTransitionDuration}s ${wordTransitionDelayIncrement * index}s {${easeInOutExpoCubic}}`)
    return (
        <span
            ref={ref as any}
            key={id + new Date().toString()}
            className="word inline-block"
            style={{
                transform: `translate(0, ${isVisible ? '0' : '100%'})`,
                opacity: isVisible ? 1 : 0,
                transition: `all ${wordTransitionDuration}s ${wordTransitionDelayIncrement * index}s {${easeInOutExpoCubic}}`
            }}
        >
            {word}
        </span>
    )
});

export default WordRevealAnimation;