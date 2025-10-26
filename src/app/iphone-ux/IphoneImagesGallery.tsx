import { useCallback, useEffect, useRef, useState } from "react";
import {
    images,
    iphoneClass,
    TRANSITION_SELECTED_IMAGES_INTO_ORIGINAL_POSITION_DURATION,
    TRANSITION_SELECTED_IMAGES_INTO_POSITION_DURATION,
    blurredBackgroundEnterAnimationTransition,
    blurredBackgroundExitAnimationTransition,
} from "./constants";

import clsx from "clsx";
import { calcSelectedImagesTargetPositionBasedOnWhereUserTapped, getImageIndexBasedOnMousePosition, isValidDrag } from "./math.calcs.utils";
import PopupMenuWrapper, { PopupMenuWrapperHandle } from "./ImageActionsPopupMenu";
import SelectedImagesCountLabel, { SelectedImagesCountLableHandle } from "./SelectedImagesCountLable";
import GalleryImageWithDuplicate, { GalleryImageWithDuplicateHandle } from "./GalleryImageWithDuplicate";
import ImagesGalleryHeader from "./ImagesGalleryHeader";


type ImageWithForwardedRef = Map<string, {
    id: string,
    forwardedRef: GalleryImageWithDuplicateHandle
}>

function IphoneImagesGallery() {
    const iphoneRef = useRef<HTMLDivElement>(null);
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

    const handleSelectImage = useCallback((id: string, skipToggle = false) => {
        console.log("handleSelectImage", id, selectModeActive);
        if (hasOpenedPopupMenuAfterLongPressOnSelectedImage.current) return;
        if (!selectModeActive) return; // ignore if select mode is off

        setSelectedImages((prev) => {
            const newSet = new Set(prev);
            const shouldSelect = !newSet.has(id);

            if (!shouldSelect && !skipToggle) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    }, [selectModeActive, hasOpenedPopupMenuAfterLongPressOnSelectedImage]);


    const getSelectedImagesRefs = () => {
        return Array.from(selectedImages)
            .map((id) => imagesForwardedRefs.current.get(id))
            .filter((imageParentDiv): imageParentDiv is { id: string, forwardedRef: GalleryImageWithDuplicateHandle } => Boolean(imageParentDiv));
    }

    const getImagesRefsInRange = (start: number, end: number) => {
        return images.filter((_, index) => index >= start && index <= end)
            .map((img) => imagesForwardedRefs.current.get(img.id))
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


    const [draggingIsValid, setDraggingIsValid] = useState(false);
    const [mouseIsDown, setMouseIsDown] = useState(false);
    const [dragMode, setDragMode] = useState<"select" | "deselect" | null>(null);
    const [imageIndexAtMouseDownPosition, setImageIndexAtMouseDownPosition] = useState<{ id: string, index: number } | null>(null);


    const handleMouseDownOnImage = useCallback(
        (id: string, index: number) => {
            if (!selectModeActive) return;

            setMouseIsDown(true);

            setImageIndexAtMouseDownPosition({
                id,
                index
            });

            setDragMode((prev) => {
                const alreadySelected = selectedImages.has(id);
                if (alreadySelected) {
                    return "deselect";
                } else {
                    return "select";
                }
            });
        },
        [selectedImages, selectModeActive],
    );

    // keep track of selected images while dragging
    // keep in mind we have two drag modes (select/deselect)
    const selectedImagesWhileDragging = useRef(new Set<string>());
    const wasDragging = useRef(false);
    const lastMousePosition = useRef<{ x: number; y: number } | null>(null);

    const onMouseMoveOnImages = useCallback(
        (e: React.MouseEvent) => {
            if (!selectModeActive) return;
            if (!mouseIsDown) return;
            if (dragMode == null) return;
            if (!iphoneRef.current) return;
            if (imageIndexAtMouseDownPosition === null) return;

            const { clientX, clientY } = e;
            const lastPos = lastMousePosition.current;

            // initialize if not set
            if (!lastPos) {
                lastMousePosition.current = { x: clientX, y: clientY };
                return;
            }

            const dx = Math.abs(clientX - lastPos.x);
            const dy = Math.abs(clientY - lastPos.y);

            // ignore tiny movement
            if (!isValidDrag(dx, dy)) return;

            setDraggingIsValid(true);

            wasDragging.current = true;

            lastMousePosition.current = { x: clientX, y: clientY };

            const { left, top } = iphoneRef.current.getBoundingClientRect();
            const { currentHoveredElementIndex } = getImageIndexBasedOnMousePosition(e, left, top);

            const allImagesRefs = getImagesRefsInRange(0, images.length - 1);
            allImagesRefs.forEach((imageRef) => {
                if (!imageRef) return;
                const { selected, id } = imageRef.forwardedRef.updateSelectStateBasedOnGalleryDrag(
                    imageIndexAtMouseDownPosition.index,
                    currentHoveredElementIndex,
                    dragMode
                );
                if (selected) {
                    selectedImagesWhileDragging.current.add(id);
                } else {
                    selectedImagesWhileDragging.current.delete(id);
                }
            });
        },
        [dragMode, mouseIsDown, imageIndexAtMouseDownPosition, selectModeActive]
    );


    const handleMouseUpFromImagesCollection = useCallback(() => {
        setMouseIsDown(false);
        lastMousePosition.current = null;

        if (!wasDragging.current) return;
        if (!selectModeActive) return;
        if (dragMode == null) return;
        if (!draggingIsValid) return;

        setDragMode(null);
        setDraggingIsValid(false);
        setImageIndexAtMouseDownPosition(null);

        const allImagesRefs = getImagesRefsInRange(
            0,
            images.length - 1
        );

        allImagesRefs.forEach((imageRef) => {
            if (!imageRef) return;
            imageRef.forwardedRef.onGalleryDragEnd();
        });

        // set selected images to the images that were selected while dragging
        console.log("calling setSelectedImages on mouse up");
        setSelectedImages(new Set(selectedImagesWhileDragging.current));

    }, [selectModeActive, dragMode, wasDragging, draggingIsValid, selectedImagesWhileDragging]);


    useEffect(() => {
        console.log("selectedImages", selectedImages);
    }, [selectedImages]);
    return (
        <div ref={iphoneRef} className={clsx(iphoneClass, "relative !select-none rounded-[24px] overflow-hidden")}>
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
                <ImagesGalleryHeader
                    selectModeActive={selectModeActive}
                    handleSelectModeToggle={handleSelectModeToggle}
                />

                {/* Scrollable image grid */}
                <div
                    ref={scrollContainerRef}
                    onMouseUp={handleMouseUpFromImagesCollection}
                    onMouseMove={onMouseMoveOnImages}
                    onMouseLeave={handleMouseUpFromImagesCollection}
                    className="w-full flex items-start gap-[2px] flex-wrap h-full overflow-scroll">
                    <div className="h-[100px] w-full" />
                    {images.map((img, index) => (
                        <GalleryImageWithDuplicate
                            index={index}
                            img={img}
                            // @ts-ignore
                            ref={(ref) => imagesForwardedRefs.current.set(img.id, { id: img.id, forwardedRef: ref } as any)}
                            isSelected={selectedImages.has(img.id)}
                            handleSelectImage={() => handleSelectImage(img.id)}
                            handleLongPress={(id, position) => {
                                const isSelected = selectedImages.has(id);
                                if (!isSelected) return;
                                console.log("---------- handleLongPress --------");
                                executeTheLongPressAnimationSequence(id, position)
                            }}
                            onMouseDown={() => handleMouseDownOnImage(img.id, index)}
                        />

                    ))}
                </div>
            </div>
        </div>
    );
}

export default IphoneImagesGallery;
