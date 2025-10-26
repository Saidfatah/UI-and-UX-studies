
import { Image } from "./types";
import { IMAGE_SIZE, imageEnterAnimationTransition, imageExitAnimationTransition, imageRotationAndScaleEnterAnimationTransition, imageRotationAndScaleExitAnimationTransition, TRANSITION_SELECTED_IMAGES_INTO_ORIGINAL_POSITION_DURATION, TRANSITION_SELECTED_IMAGES_INTO_POSITION_DURATION } from "./constants";
import {
    IMAGES_OFFSET_FROM_TOP,
    ITEMS_PER_ROW,
} from "./constants";
import GalleryImage, { GalleryImageHandle } from "./GalleryImage";
import { forwardRef, memo, useCallback, useImperativeHandle, useRef } from "react";
import clsx from "clsx";

type Props = {
    index: number;
    isSelected: boolean;
    img: Image;
    handleSelectImage: () => void;
    handleLongPress: (id: string, position: { x: number; y: number }) => void;
    onMouseDown: () => void;
};

export type GalleryImageWithDuplicateHandle = {
    moveImageToTapPosition: (targetPosition: { x: number; y: number }, scrollContainerScrollTop: number) => void
    moveImageToOriginalPosition: (scrollContainerScrollTop: number) => void
    updateSelectStateBasedOnGalleryDrag: (indexAtDragStart: number, indexAtCurrentDragPosition: number, dragMode: "select" | "deselect") => { selected: boolean, id: string }
    onGalleryDragEnd: () => void
}

const GalleryImageWithDuplicate = forwardRef<GalleryImageWithDuplicateHandle, Props>((props: Props, ref) => {
    const { index, img, isSelected, handleSelectImage, handleLongPress, onMouseDown } = props;

    const duplicateImageWrappedDivRef = useRef<HTMLDivElement>(null);
    const duplicateImageRef = useRef<HTMLImageElement>(null);

    const { url, alt } = img;
    const rowIndex = Math.floor(index / ITEMS_PER_ROW);
    const colIndex = index % ITEMS_PER_ROW;

    const xGap = colIndex * 2;
    const yGap = (rowIndex + 1) * 2;

    const xBasedOnColIndex = colIndex * IMAGE_SIZE + xGap;
    const yBasedOnRowIndex = (rowIndex * IMAGE_SIZE + yGap) + IMAGES_OFFSET_FROM_TOP;


    const moveImageToTapPosition = useCallback((targetPosition: { x: number; y: number }, scrollContainerScrollTop: number) => {
        const divWrapper = duplicateImageWrappedDivRef.current
        const image = duplicateImageRef.current

        if (!image || !divWrapper) return;

        divWrapper.style.transition = "none";
        divWrapper.style.top = `${yBasedOnRowIndex - scrollContainerScrollTop}px`;

        // first show the image
        divWrapper.style.transition = "none";
        divWrapper.style.zIndex = `${13 + (index + 1) * 3}`;
        divWrapper.style.opacity = "1";

        divWrapper.style.transition = imageEnterAnimationTransition;
        divWrapper.style.left = `${targetPosition.x}px`;
        divWrapper.style.top = `${targetPosition.y}px`;

        image.style.transition = imageRotationAndScaleEnterAnimationTransition;

        image.style.borderRadius = "12px";
        const oneOrMinusOne = Math.random() > 0.5 ? 1 : -1;
        image.style.transform = `
            perspective(400px)
            rotate(${oneOrMinusOne * ((length - index) * 0.3 + Math.random() * 0.5)}deg)
            scale(${(index * 0.005) + 1})
        `;

        setTimeout(() => {
            divWrapper.style.transition = "none";
            divWrapper.style.zIndex = `${13 + (index + 1) * 3}`;
            divWrapper.style.opacity = "0";
        }, TRANSITION_SELECTED_IMAGES_INTO_POSITION_DURATION);
    }, [])

    const moveImageToOriginalPosition = useCallback((scrollContainerScrollTop: number) => {
        const image = duplicateImageRef.current
        if (!image) return;
        if (!duplicateImageWrappedDivRef.current) return;

        duplicateImageWrappedDivRef.current.style.transition = imageExitAnimationTransition;

        duplicateImageWrappedDivRef.current.style.left = `${xBasedOnColIndex}px`;
        duplicateImageWrappedDivRef.current.style.top = `${yBasedOnRowIndex}px`;

        image.style.transition = imageRotationAndScaleExitAnimationTransition;

        image.style.borderRadius = "0px";
        image.style.transform = `
                perspective(800px)
                rotate3d(0, 0, 0, 0deg)
                scale(1)
            `;

        setTimeout(() => {
            if (!duplicateImageWrappedDivRef.current) return;

            duplicateImageWrappedDivRef.current.style.zIndex = `12`;
            duplicateImageWrappedDivRef.current.style.opacity = "0";
        }, TRANSITION_SELECTED_IMAGES_INTO_ORIGINAL_POSITION_DURATION);

    }, [])

    const galleryImageHandleRef = useRef<GalleryImageHandle>(null);

    useImperativeHandle(ref, () => ({
        moveImageToTapPosition,
        moveImageToOriginalPosition,
        updateSelectStateBasedOnGalleryDrag: (indexAtDragStart: number, indexAtCurrentDragPosition: number, dragMode: "select" | "deselect") => {
            return galleryImageHandleRef.current?.updateSelectStateBasedOnGalleryDrag(indexAtDragStart, indexAtCurrentDragPosition, dragMode) ?? { selected: false, id: "" };
        },
        onGalleryDragEnd: () => {
            galleryImageHandleRef.current?.onGalleryDragEnd();
        }
    }))

    return (
        <>
            <div
                key={img.id + "duplicate"}
                ref={duplicateImageWrappedDivRef}
                className=" preserve-3d absolute z-[12] opacity-0 pointer-events-none"
                style={{
                    left: `${xBasedOnColIndex}px`,
                    top: `${yBasedOnRowIndex}px`,
                    width: `${IMAGE_SIZE}px`,
                    height: `${IMAGE_SIZE}px`,
                }}
            >
                <img
                    src={url}
                    alt={alt}
                    ref={duplicateImageRef}
                    loading="lazy"
                    className={clsx(
                        "preserve-3d   object-cover shadow-xl"
                    )}
                    style={{
                        width: `${IMAGE_SIZE}px`,
                        height: `${IMAGE_SIZE}px`,
                    }}
                />
            </div>

            <GalleryImage
                ref={galleryImageHandleRef}
                key={img.id}
                img={img}
                index={index}
                isSelected={isSelected}
                onMouseDown={() => onMouseDown()}
                handleSelectImage={handleSelectImage}
                handleLongPress={(id, pos) => {
                    const rowIndex = Math.floor(index / ITEMS_PER_ROW);
                    const colIndex = index % ITEMS_PER_ROW;

                    const xGap = colIndex * 2;
                    const yGap = (rowIndex + 1) * 2;

                    const xBasedOnColIndex = colIndex * IMAGE_SIZE + xGap;
                    const yBasedOnRowIndex = rowIndex * IMAGE_SIZE + yGap;

                    handleLongPress(img.id, { x: xBasedOnColIndex, y: yBasedOnRowIndex + IMAGES_OFFSET_FROM_TOP })
                }}
            />
        </>
    );
});


export default GalleryImageWithDuplicate;
