import { useCallback, useRef, useState } from "react";
import { Image } from "./types";
import { IMAGE_SIZE } from "./constants";


type GalleryImageProps = {
    img: Image;
    isSelected: boolean;
    handleSelectImage: (id: string) => void;
    handleLongPress: (id: string, targetPosition: { x: number; y: number }) => void;
};

const GalleryImage = ({ img, isSelected, handleSelectImage, handleLongPress }: GalleryImageProps) => {
    const pressTimer = useRef<NodeJS.Timeout>();
    const elemRef = useRef<HTMLDivElement>(null);
    const [canHandleSelectImage, setCanHandleSelectImage] = useState(true);

    const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        if (!isSelected) return;

        pressTimer.current = setTimeout(() => {
            const targetPosition = elemRef.current?.getBoundingClientRect();
            if (!targetPosition) return;

            setCanHandleSelectImage(false);

            if (elemRef.current) {
                elemRef.current.style.pointerEvents = "none";
            }

            console.log("long press triggered");
            handleLongPress(img.id, { x: targetPosition.x, y: targetPosition.y });
        }, 700);
    }, [pressTimer, isSelected, handleLongPress]);

    const clearPressTimer = useCallback(() => {
        setTimeout(() => {
            if (elemRef.current) {
                elemRef.current.style.pointerEvents = "auto";
            }
            clearTimeout(pressTimer.current);
            setCanHandleSelectImage(true);
        }, 200);
    }, [pressTimer]);

    const handleMouseUp = useCallback(() => {
        clearPressTimer();
    }, [clearPressTimer]);

    const handleMouseLeave = useCallback(() => {
        clearPressTimer();
    }, [clearPressTimer]);

    const handleClick = useCallback(() => {
        if (!canHandleSelectImage) return;
        handleSelectImage(img.id);
    }, [handleSelectImage, img, canHandleSelectImage]);

    return (
        <div
            ref={elemRef}
            key={img.id}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            style={{
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
            }}
            className="relative cursor-pointer"
        >
            <img
                src={img.url}
                alt={img.alt}
                style={{
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                }}
                loading="lazy"
                className="h-auto object-cover cursor-pointer"
            />
            {isSelected && (
                <div className="absolute bottom-[4px] right-[4px] w-[16px] h-[16px] flex items-center justify-center bg-white rounded-full">
                    <svg
                        className="!w-full !h-full"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path
                            className="fill-blue-400"
                            d="M2.25 12c0-5.385 4.365-9.75 
                            9.75-9.75s9.75 4.365 
                            9.75 9.75-4.365 9.75-9.75 
                            9.75S2.25 17.385 2.25 
                            12Zm13.36-1.814a.75.75 
                            0 1 0-1.22-.872l-3.236 4.53L9.53 
                            12.22a.75.75 0 0 0-1.06 
                            1.06l2.25 2.25a.75.75 0 0 0 
                            1.14-.094l3.75-5.25Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default GalleryImage;
