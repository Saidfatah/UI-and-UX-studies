import { forwardRef } from "react";
import { easeInOutExpoCubic, imageSize, ImageTransitionDuration } from "./constants";


const ImageRevealAnimationComponent = forwardRef(({ word, isVisible, id }: { word: string, isVisible?: boolean, id: string }, ref) => {
    return (
        <img
            width={imageSize}
            height={imageSize}
            ref={ref as any}
            key={id}
            style={{
                transform: `scale(${isVisible ? 1 : 0.8}) translate(${isVisible ? '0px' : '-20px'}, ${isVisible ? '0px' : '-20px'})`,
                opacity: isVisible ? 1 : 0,
                transition: `all ${ImageTransitionDuration}s ${easeInOutExpoCubic}`
            }}
        >
            {word}
        </img>
    )
});

export default ImageRevealAnimationComponent;