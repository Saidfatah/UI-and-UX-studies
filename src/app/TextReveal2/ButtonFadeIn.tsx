
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { fadeOutButtonDuration, phrasesGroupLoopDuration } from "./constants";
import TextReveal from "./TextReveal";


const ButtonRevealFadeIn = ({ text, delay }: { delay: number, text: string }) => {
    const button = useRef<HTMLSpanElement>()

    useEffect(() => {
        setTimeout(() => {
            if (button.current) {
                // button.current.classList.add('fadeOutButton')
                // button.current.classList.remove('buttonFillBorderAnimation')
                // button.current.classList.add('buttonEmptyBorderAnimation')
            }
        }, (phrasesGroupLoopDuration + fadeOutButtonDuration + delay) * 1000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (button.current) {
                button.current.classList.add('fadeInButton')
                // button.current.classList.add('buttonFillBorderAnimation')
            }
        }, delay * 1000);
    }, []);

    return (

        <button ref={button as any} className='revealAbleButton buttonWithAnimateAbleBorder ' >
            <TextReveal delay={delay} text={text} />
        </button>
    );
};


export default ButtonRevealFadeIn;