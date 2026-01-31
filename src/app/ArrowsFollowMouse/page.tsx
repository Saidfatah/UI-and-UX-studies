"use client"
import clsx from "clsx";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

type ArrowRef = {
    rotate: (mousePos: { x: number; y: number }) => void
}

type ArrowProps = {
    index: number,
    text: string
}

const Arrow = forwardRef<ArrowRef, ArrowProps>(({ index, text }, ref) => {
    const arrowRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
        rotate: (mousePos: { x: number; y: number }) => {
            if (!arrowRef.current) return
            const { x, y } = mousePos
            const { left, top } = arrowRef.current.getBoundingClientRect()
            const angle = Math.atan2(y - top, x - left) * (180 / Math.PI)
            const distance = Math.sqrt((x - left) ** 2 + (y - top) ** 2)
            const valueBasedOnDistanceAndWindowHeight = distance / 10
            // const invertedValueBasedOnDistanceAndWindowHeight = 1 - valueBasedOnDistanceAndWindowHeight
            arrowRef.current.style.transform = ` rotate(${angle }deg)`
            // arrowRef.current.style.transform = `scale(${invertedValueBasedOnDistanceAndWindowHeight}) rotate(${angle}deg) `
            arrowRef.current.style.filter = `blur(${valueBasedOnDistanceAndWindowHeight}px)`
        },
    }))

    return (
        <div
            ref={arrowRef}
            className={clsx(
                "text-white transform perspective-[500px]",
                "h-6 origin-center flex items-center gap-0 justify-center",
                "rotate-[-15deg]"
            )}
            // style={{ transition: `all ${index * 0.01}s cubic-bezier(0.65, 0, 0.35, 1)` }}
        >
            <p>{text}</p>
            {/* <div className="w-[24px] h-[24px] bg-white rounded-full"></div> */}
            {/* <div className="w-[24px] h-[24px] bg-white rounded-full"></div> */}
        </div>
    )
})


const alphabet = "0101011010010001110100100101001010010111011000100"
const alphabetArray = alphabet.split("")
const groupSize = 100
const groups = alphabetArray.reduce((acc, curr, index) => {
    const groupIndex = Math.floor(index / groupSize)
    if (!acc[groupIndex]) {
        acc[groupIndex] = []
    }
    acc[groupIndex].push({ index: index, text: curr })
    return acc
}, [] as { index: number, text: string }[][])

function ArrowsFollowMouse() {
    const arrowRefs = useRef<ArrowRef[]>([])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!arrowRefs.current) return

            const { clientX, clientY } = e
            arrowRefs.current.forEach((arrowRef) => {
                arrowRef.rotate({ x: clientX, y: clientY })
            })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <div className="w-screen h-screen bg-black justify-center items-end flex">
            <div className="flex flex-col gap-[24px]">
                {groups.map((group, groupIndex) => (
                    <div className="flex gap-[24px]">
                        {group.map((letter, index) => (
                            <Arrow text={letter.text} index={letter.index} ref={((ref: ArrowRef) => arrowRefs.current[letter.index] = ref) as any} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ArrowsFollowMouse;