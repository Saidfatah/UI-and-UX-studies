"use client"
import clsx from "clsx";
import { useRef, useState } from "react";
import CoinIcon from "./CoinIcon";
import "./flip-coin.css";
import ToggledPhrases from "./ToggledPhrases";

export default function Page() {
    const [animation, setAnimation] = useState<"flip-vertical" | "flip-horizontal" | "">();

    const [position, setPosition] = useState<"initial" | "right">("initial");

    const coinWrapperRef = useRef<HTMLDivElement>(null)
    const coinPositionRef = useRef<HTMLDivElement>(null)

    return (
        <div className="page">

            <div className="relative flex items-center p-[16px]">
                <div
                    style={{
                        transition: "all 0.5s 0.5s cubic-bezier(0.85, 0, 0.15, 1)",
                        transform: "translateX(1)"
                    }}
                    ref={coinPositionRef}
                    className=" absolute top-[50%] translate-y-[-50%] translate-x-[-56px] left-0 "
                >
                    <div
                        ref={coinWrapperRef}
                        onClick={() => {
                            setAnimation("flip-horizontal")
                        }}
                        onMouseDown={() => {
                            if (coinWrapperRef.current)
                                coinWrapperRef.current.style.transform = "scale(0.9)"
                        }}
                        onMouseUp={() => {
                            if (coinWrapperRef.current)
                                coinWrapperRef.current.style.transform = "scale(1)"

                            if (coinPositionRef.current) {
                                setPosition(prev => prev === "initial" ? "right" : "initial")
                                coinPositionRef.current.style.left = position === "initial" ? "calc(100% + 40px)" : "0px"

                                setTimeout(() => {
                                    if (coinWrapperRef.current) {
                                        coinWrapperRef.current.style.filter = "blur(5px)"
                                        coinWrapperRef.current.style.transform = "scaleX(1.2) scaleY(0.9)"
                                    }
                                    setTimeout(() => {
                                        if (coinWrapperRef.current) {
                                            coinWrapperRef.current.style.filter = "blur(0px)"
                                            coinWrapperRef.current.style.transform = "scaleX(1) scaleY(1)"
                                        }
                                    }, 250);
                                }, 250);
                            }

                            setAnimation("flip-horizontal")
                            setTimeout(() => {
                                setAnimation("")
                            }, 1500);
                        }}
                        style={{
                            transition: "all 0.5s cubic-bezier(0.85, 0, 0.15, 1)",
                            transform: "scale(1)"
                        }}
                        className="coin origin-center"

                    >
                        <div className={clsx("flip-coin", animation)}>
                            {/* this covers the middle section when rotateY is at 0deg */}
                            <div className="middle-vertical-rectangle" />
                            {/* this covers the middle section when rotateX is at 0deg */}
                            <div className="middle-horizontal-rectangle" />
                        </div>
                        <div className={clsx("flip-coin", animation)}>
                            <CoinIcon className="front-side" />
                            <div className="flip-coin-inner inner-front" />
                            <CoinIcon className="back-side" />
                            <div className="flip-coin-inner inner-back" />
                        </div>
                    </div>
                </div>

                <ToggledPhrases position={position} />
            </div>

        </div>
    );
}

