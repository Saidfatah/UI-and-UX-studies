
import { useEffect, useRef, useState } from "react";
import { delayStep, fadeOutButtonDuration, phrasesGroupLoopDuration } from "./constants";


const BlackBar = ({ height, top, delay }: { height: number, top: number, delay: number }) => {
    const ref = useRef<HTMLDivElement>()

    useEffect(() => {
        if (ref.current)
            setTimeout(() => {
                ref.current?.classList.add("animateBlackBarOpacityDisappear")
            }, (delay - 0.07) * 1000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (ref.current) {
                ref.current.classList.add('animateBlackBarOpacityAppear')
            }
        }, ((phrasesGroupLoopDuration - 1) + fadeOutButtonDuration + delay) * 1000);
    }, []);

    return (<div
        ref={ref as any}
        className="absolute w-full bg-black"
        style={{
            height: `${height}px`,
            top: `${top}px`,
            left: 0,
            zIndex: 9,
        }}
    />)
}

const ImageReveal = ({ delay, src }: { delay: number, src: string }) => {
    const imageWrapper = useRef<HTMLDivElement>()

    useEffect(() => {
        setTimeout(() => {
            if (imageWrapper.current) {
                imageWrapper.current.classList.add('hideImageAnimation')
            }
        }, (phrasesGroupLoopDuration + fadeOutButtonDuration + delay) * 1000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (imageWrapper.current) {
                imageWrapper.current.classList.add('revealImageAnimation')
            }
        }, delay * 1000);
    }, []);

    const [randomDivs, setRandomDivs] = useState([]);
    const imageWrapperHeight = 200; // Height of the imageWrapper
    const maxHeight = 25; // Maximum height of each div

    useEffect(() => {
        const generateRandomDivs = () => {
            const divs = [];
            let totalHeight = 0;

            while (totalHeight < imageWrapperHeight) {
                const randomHeight = Math.min(
                    Math.floor(Math.random() * 18) + 2, // Random height between 5px and 25px
                    imageWrapperHeight - totalHeight // Ensure total height does not exceed imageWrapperHeight
                );
                const randomTop = totalHeight; // Position the divs consecutively

                divs.push({ height: randomHeight, top: randomTop });
                totalHeight += randomHeight;
            }

            setRandomDivs(divs as any);
        };

        generateRandomDivs();
    }, []);



    return (
        <div className="imageAbsoluteWrapper">
            <div ref={imageWrapper as any} className='imageRevealWrapperOverflow' >
                <div className="imageWrapper" >
                    {randomDivs.map((div: any, index) => (
                        <BlackBar key={index} delay={(delayStep) * index} top={div.top} height={div.height} />
                    ))}
                    <img src={src} />
                </div>
            </div>
        </div>
    );
};


export default ImageReveal;