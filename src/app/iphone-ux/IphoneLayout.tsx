import { useCallback, useRef, useState } from "react";
import {
    images,
    iphoneClass,
    TRANSITION_SELECTED_IMAGES_INTO_ORIGINAL_POSITION_DURATION,
    TRANSITION_SELECTED_IMAGES_INTO_POSITION_DURATION,
    blurredBackgroundEnterAnimationTransition,
    blurredBackgroundExitAnimationTransition,
} from "./constants";

import clsx from "clsx";
import { calcSelectedImagesTargetPositionBasedOnWhereUserTapped } from "./math.calcs.utils";
import PopupMenuWrapper, { PopupMenuWrapperHandle } from "./ImageActionsPopupMenu";
import SelectedImagesCountLabel, { SelectedImagesCountLableHandle } from "./SelectedImagesCountLable";
import GalleryImageWithDuplicate, { GalleryImageWithDuplicateHandle } from "./GalleryImageWithDuplicate";

type ImageRef = Map<string, {
    initialPosition: { x: number; y: number },
    imageParentDiv: HTMLDivElement,
    forwardedRef: GalleryImageWithDuplicateHandle
}>

type ImageWithForwardedRef = Map<string, {
    id: string,
    forwardedRef: GalleryImageWithDuplicateHandle
}>

function IphoneLayout() {
    const hasOpenedPopupMenuAfterLongPressOnSelectedImage = useRef(false);
    const popupMenuWrapperRef = useRef<PopupMenuWrapperHandle>(null);
    const selectedImagesCountLabelRef = useRef<SelectedImagesCountLableHandle>(null);
    const backdropBlurRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const popupMenuRef = useRef<HTMLDivElement>(null);

    const imagesForwardedRefs = useRef<ImageWithForwardedRef>(new Map());

    const [canClickOnBlurredBackground, setCanClickOnBlurredBackground] = useState(false);
    const [selectModeActive, setSelectModeActive] = useState(false);
    const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());

    const handleSelectModeToggle = () => {
        setSelectModeActive((prev) => !prev);
        setSelectedImages(new Set()); // clear selections when toggling mode
    };

    const handleSelectImage = useCallback((id: string) => {
        if (hasOpenedPopupMenuAfterLongPressOnSelectedImage.current) return;
        if (!selectModeActive) return; // ignore if select mode is off

        setSelectedImages((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    }, [selectModeActive, hasOpenedPopupMenuAfterLongPressOnSelectedImage]);


    const getSelectedImagesRefs = () => {
        return Array.from(selectedImages)
            .map((id) => imagesForwardedRefs.current.get(id))
            .filter((imageParentDiv): imageParentDiv is { id: string, forwardedRef: GalleryImageWithDuplicateHandle } => Boolean(imageParentDiv));
    }

    const executeTheLongPressAnimationSequence = useCallback(
        (id: string, tapPosition: { x: number; y: number }) => {
            const imagesContainerScrollTop = scrollContainerRef.current?.scrollTop as number;
            const { x, y } = calcSelectedImagesTargetPositionBasedOnWhereUserTapped(tapPosition, imagesContainerScrollTop)

            // step 1 start moving the images to the tap position
            const selectedImageRefs = getSelectedImagesRefs();
            selectedImageRefs.forEach((image) => {
                image.forwardedRef.moveImageToTapPosition({ x, y }, imagesContainerScrollTop)
            });

            // step 2 show the popup menu
            popupMenuWrapperRef.current?.show({
                x: x,
                y: y
            })

            // step 3 show the selected images count label
            setTimeout(() => {
                selectedImagesCountLabelRef.current?.show(x, y)
            }, TRANSITION_SELECTED_IMAGES_INTO_POSITION_DURATION - 500);


            // step 4 blur 
            if (backdropBlurRef.current) {
                backdropBlurRef.current.style.transition = blurredBackgroundEnterAnimationTransition;
                backdropBlurRef.current.style.opacity = "1";
            }

            setTimeout(() => {
                setCanClickOnBlurredBackground(true)
            }, TRANSITION_SELECTED_IMAGES_INTO_POSITION_DURATION);


            hasOpenedPopupMenuAfterLongPressOnSelectedImage.current = true;
        },
        [selectedImagesCountLabelRef, popupMenuWrapperRef, selectedImages, backdropBlurRef, scrollContainerRef]
    );

    const executeDeselectImagesAnimationSequence = useCallback(() => {
        // step 1 fadeout the blur
        setCanClickOnBlurredBackground(false);
        if (backdropBlurRef.current) {
            backdropBlurRef.current.style.transition = blurredBackgroundExitAnimationTransition;
            backdropBlurRef.current.style.opacity = "0";
        }

        // step 2 hide the selected images count label
        selectedImagesCountLabelRef.current?.hide();

        // step 3 move the images to their original position
        const imagesContainerScrollTop = scrollContainerRef.current?.scrollTop as number;
        const selectedImageRefs = getSelectedImagesRefs();
        selectedImageRefs.forEach((item) => {
            // call image ref moveImageToOriginalPosition
            if (!item) return;
            item.forwardedRef.moveImageToOriginalPosition(imagesContainerScrollTop)
        });

        // step 4 hide the popup menu
        popupMenuWrapperRef.current?.hide()

        // step 5 reset state
        setTimeout(() => {
            setSelectedImages(new Set());
        }, TRANSITION_SELECTED_IMAGES_INTO_ORIGINAL_POSITION_DURATION);

        hasOpenedPopupMenuAfterLongPressOnSelectedImage.current = false;
    }, [backdropBlurRef, selectedImagesCountLabelRef, popupMenuRef, popupMenuWrapperRef, scrollContainerRef, selectedImages])


    return (
        <div className={clsx(iphoneClass, "relative !select-none rounded-[24px] overflow-hidden")}>
            <PopupMenuWrapper ref={popupMenuWrapperRef} />

            <SelectedImagesCountLabel ref={selectedImagesCountLabelRef} selectedImagesCount={selectedImages.size} />

            <div
                ref={backdropBlurRef}
                onClick={executeDeselectImagesAnimationSequence}
                className={clsx(
                    "w-full h-full opacity-0  bg-transparent backdrop-blur-[12px] absolute top-0 left-0 z-[9]",
                    !canClickOnBlurredBackground && "pointer-events-none"
                )}
            />

            <div className="relative overflow-hidden h-full bg-black">

                {/* header */}
                <>
                    {/* Header */}
                    <div className="z-[6] w-full h-fit flex justify-between items-center p-[12px] absolute top-0 left-0">
                        <div className="flex flex-col gap-[6px] text-white">
                            <p className="font-bold text-[24px] tracking-[0.02em]">Library</p>
                            <p className="text-[12px] tracking-[0.02em] font-semibold">21–24 Sep 2025</p>
                        </div>

                        <div>
                            <button onClick={handleSelectModeToggle} className="relative px-[6px] rounded-[24px] py-[2px] text-white overflow-hidden bg-transparent backdrop-blur-xl">
                                <div className="z-[0] bg-[#9492928b] absolute top-0 left-0 rounded-[24px] h-full w-full" />
                                <p className="relative z-[3] tracking-[0.02em] text-[12px]">
                                    {
                                        selectModeActive ? "Cancel" : "Select"
                                    }
                                </p>
                            </button>
                        </div>
                    </div>

                    {/* Backdrop blur layer */}
                    <div className="z-[3] w-full h-[100px] gradientBackdropBlur absolute top-0 left-0 transition-none" />

                    {/* Gradient overlay */}
                    <div className="z-[3] w-full h-[100px] bg-gradient-to-b from-[#00000092] to-transparent absolute top-0 left-0" />
                </>

                {/* Scrollable image grid */}
                <div ref={scrollContainerRef} className="w-full  flex gap-[2px] flex-wrap h-full overflow-scroll">
                    <div className="h-[100px] w-full" />
                    {images.map((img, index) => (
                        <GalleryImageWithDuplicate
                            index={index}
                            img={img}
                            // @ts-ignore
                            ref={(ref) => imagesForwardedRefs.current.set(img.id, { id: img.id, forwardedRef: ref } as any)}
                            isSelected={selectedImages.has(img.id)}
                            handleSelectImage={handleSelectImage}
                            handleLongPress={executeTheLongPressAnimationSequence}
                        />

                    ))}
                </div>
            </div>
        </div>
    );
}

export default IphoneLayout;
