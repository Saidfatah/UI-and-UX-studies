
import { useEffect, useRef } from "react";


const TextSlideReveal = ({ text, className }: { text: string, className?: string }) => {
    const realAbleRef = useRef<HTMLParagraphElement>()

    useEffect(() => {
        if (realAbleRef.current)
            realAbleRef.current.classList.add('revealed')
    }, []);

    return (
        <div className="overflowWrapper">
            <p ref={realAbleRef as any} className={`${className} textItem revealAbleText`}>{text}</p>
        </div>
    );
};


export default TextSlideReveal;