import { useRef, useState } from "react";
import { onTapScale } from "../constants";
import "./likeButton.style.css"

const HeartIcon = ({ active, }: { active: boolean }) => {


    return (
        <svg
            className="heartIcon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 23a.496.496 0 0 1-.26-.074C7.023 19.973 0 13.743 0 8.68c0-4.12 2.322-6.677 6.058-6.677 2.572 0 5.108 2.387 5.134 2.41l.808.771.808-.771C12.834 4.387 15.367 2 17.935 2 21.678 2 24 4.558 24 8.677c0 5.06-7.022 11.293-11.74 14.246a.496.496 0 0 1-.26.074V23z"
                fill="none"
                stroke="#a6423a"
                strokeWidth={2}
            >
            </path>
        </svg>
    )
}


const LikeButton = (
    {
        onMouseDown,
        onMouseUp
    }: {
        onMouseDown: () => void,
        onMouseUp: () => void
    }
) => {
    const [active, setActive] = useState(false);
    const [svgArray, setSvgArray] = useState<number[]>([]);
    const ref = useRef<HTMLButtonElement>(null);
    const fullHeartIconRefs = useRef<HTMLDivElement[]>([]);

    const generateRandomSVGs = () => {
        const randomNum = Math.floor(Math.random() * 10) + 1; // Generate 1 to 10 SVGs
        const newSvgArray = Array.from({ length: randomNum }, () => Math.random());
        setSvgArray(newSvgArray);
    };

    return (
        <>
            <button
                ref={ref}
                onClick={() => { }}
                onMouseDown={() => {
                    if (ref.current) ref.current.style.scale = `${onTapScale}`;

                    onMouseDown && onMouseDown();
                }}
                onMouseUp={() => {
                    if (ref.current) ref.current.style.scale = "1.2";

                    setActive(!active);

                    if (!active) {
                        generateRandomSVGs();
                        fullHeartIconRefs.current.forEach((element) => {
                            if (element) {
                                element.style.top = "50%";
                                element.style.left = "50%";
                                element.style.opacity = "1";
                                element.style.filter = "blur(0px)";
                                // element.style.scale = "1";
                                // element.style.rotate = "0deg";
                                element.style.transform = `translate(-50%,-50%) rotate(0deg) scale(1)`;
                            }
                        });
                    } else {
                        fullHeartIconRefs.current.forEach((element) => {
                            if (element) {
                                const randomTop = (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 100) + "px";
                                const randomLeft = (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 100) + "px";
                                const randomRotation = Math.floor(Math.random() * 360) + "deg";

                                element.style.top = `calc(50% + ${randomTop})`;
                                element.style.left = `calc(50% + ${randomLeft})`;
                                element.style.opacity = "0";
                                element.style.filter = "blur(5px)";
                                // element.style.scale = "0";
                                element.style.transform = `translate(-50%,-50%) rotate(${randomRotation}) scale(0)`;
                            }
                        });
                    }

                    setTimeout(() => {
                        if (ref.current) ref.current.style.scale = "1";
                    }, 250);

                    onMouseUp && onMouseUp();
                }}
                className="likeButton"
            >
                <HeartIcon active={false} />

                {svgArray.map((_, index) => (
                    <div
                        key={index}
                        ref={el => fullHeartIconRefs.current[index] = el as HTMLDivElement}
                        className="heartIcon"
                        style={{ position: 'absolute' }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 23a.496.496 0 0 1-.26-.074C7.023 19.973 0 13.743 0 8.68c0-4.12 2.322-6.677 6.058-6.677 2.572 0 5.108 2.387 5.134 2.41l.808.771.808-.771C12.834 4.387 15.367 2 17.935 2 21.678 2 24 4.558 24 8.677c0 5.06-7.022 11.293-11.74 14.246a.496.496 0 0 1-.26.074V23z"
                                fill="#a6423a"
                                strokeWidth={0}
                            >
                            </path>
                        </svg>
                    </div>
                ))}
            </button>
        </>
    );
};

export default LikeButton;