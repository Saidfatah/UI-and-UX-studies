'use client';
import "./chriskalfatis.style.css"
import { useRef, forwardRef, useImperativeHandle } from "react";

const WaveChars = forwardRef<
    { animateToBaseState: () => void }, 
    { word: string }
>(({ word }, ref) => {
    const chars = word.split('')
    const totalChars = chars.length;
    const middle = (totalChars - 1) / 2;
    const wordRef = useRef<HTMLSpanElement>(null);

    const calcCharTranslateY = (index: number) => {
        const distanceFromMiddle = Math.abs(index - middle);
        const maxDistance = Math.max(middle, totalChars - 1 - middle);
        return (1 - (distanceFromMiddle / maxDistance)) * 30; // 30% max height
    }
    
    const calcCharDuration = (index: number) => {
        const distanceFromMiddle = Math.abs(index - middle);
        const maxDistance = Math.max(middle, totalChars - 1 - middle);
        return (1 - (distanceFromMiddle / maxDistance)) * 600;
    }
    const animateToBaseState = () => {
        const charsRefs = Array.from(wordRef.current?.querySelectorAll('span') || [])
        charsRefs.forEach((charRef, index) => {
            charRef.animate(
                [
                    { transform: `translateY(-${calcCharTranslateY(index)}%)` },
                    { transform: `translateY(0%)` }
                ],
                {
                    duration: 300,
                    easing: "ease-in",
                    fill: "forwards"
                }
            );
        })
    }
    const animateToWaveState = () => {
        const charsRefs = Array.from(wordRef.current?.querySelectorAll('span') || [])
        charsRefs.forEach((charRef, index) => {
            charRef.animate(
                [
                    { transform: `translateY(0%)` },
                    { transform: `translateY(-${calcCharTranslateY(index)}%)` },
                ],
                {
                    duration: 300,
                    easing: "ease-in",
                    fill: "forwards"
                }
            );
        })
    }

    useImperativeHandle(ref, () => ({
        animateToBaseState,
        animateToWaveState
    }))

    return (
        <span ref={wordRef}>
            {chars.map((char, index) => {
                return <span
                className="inline-block"
                    key={index}
                    style={{ transform: `translateY(-${calcCharTranslateY(index)}%)` }}
                >
                    {char}
                </span>
            })}
        </span>
    );
})

export default WaveChars;
