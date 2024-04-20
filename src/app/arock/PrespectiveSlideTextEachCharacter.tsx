'use client'
import { useEffect, useRef } from "react";
import { addClassPromise } from "./utils";
import clsx from 'clsx'

const TextPerspectiveSlide = ({ word, className, delay }: { word: string; className: string; delay: number }) => {
    const wordRef = useRef<any>()
    const chars = word.split('')

    const slideLetters = async () => {
        const spans = Array.from(wordRef.current.querySelectorAll("span"))
        return await Promise.all(spans.map((span: any, index: any) => {
            span.style.transform = `translate3d(0%, ${100 + (index * 10)}%, 10px) rotateX(${50 - (index * 5)}deg)`
            return addClassPromise(span, index * 100 + delay, "letterSlide", "letterHidden");
        }))
    }

    useEffect(() => {
        if (!wordRef.current) return
        slideLetters()

    }, [wordRef]);

    return (
        <span ref={wordRef} className={clsx("lettersContainer", className)} >
            {chars.map(char => <span className="letterHidden" >{char}</span>)}
        </span>

    );
}

export default TextPerspectiveSlide;