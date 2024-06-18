
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { hideTextDuration, phrasesGroupLoopDuration } from "./constants";


const TextReveal = ({ text, delay }: { delay: number, text: string }) => {
    const spanRef = useRef<HTMLSpanElement>()

    useEffect(() => {
        setTimeout(() => {
            if (spanRef.current)
                spanRef.current.classList.add('hidden-animation')
        }, (phrasesGroupLoopDuration + hideTextDuration + delay) * 1000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (spanRef.current)
                spanRef.current.classList.add('revealed')
        }, delay * 1000);
    }, []);

    return (
        <div className="overflowWrapper">
            <span className="revealAbleSpan " ref={spanRef as any}>
                {text}
            </span>
        </div>
    );
};


export default TextReveal;