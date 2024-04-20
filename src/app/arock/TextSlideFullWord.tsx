'use client'
import { useEffect, useRef } from "react";
import { addClassPromise } from "./utils";
import clsx from 'clsx'

const TextSlideFullWord = ({ word, delay, className }: { word: string, delay: number; className?: string }) => {
    const wordRef = useRef<any>()

    const slideWord = async () => {
        return addClassPromise(wordRef.current, delay, "wordSlide", "wordHidden");
    }

    useEffect(() => {
        if (!wordRef.current) return
        slideWord()

    }, [wordRef]);

    return (
        <span className={clsx("lettersContainer", className)} >
            <span ref={wordRef} className="wordHidden" >
                {word}
            </span>
        </span>
    );
}

export default TextSlideFullWord;