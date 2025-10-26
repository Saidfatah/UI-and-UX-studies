import { useLongPress } from "use-long-press";
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { Image } from "./types";
import { IMAGE_SIZE } from "./constants";


type GalleryImageProps = {
  img: Image;
  index: number;
  isSelected: boolean;
  handleSelectImage: () => void;
  handleLongPress: (id: string, pos: { x: number; y: number }) => void;
  onMouseDown: () => void;
};

export type GalleryImageHandle = {
  updateSelectStateBasedOnGalleryDrag: (indexAtDragStart: number, indexAtCurrentDragPosition: number, dragMode: "select" | "deselect") => { selected: boolean; id: string; }
  onGalleryDragEnd: () => void
}

const GalleryImage = forwardRef<GalleryImageHandle, GalleryImageProps>(({
  img,
  index,
  isSelected,
  handleSelectImage,
  handleLongPress,
  onMouseDown,
}: GalleryImageProps, ref: React.Ref<GalleryImageHandle>) => {
  const elemRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const imageWasSelectToggledWhileInDragMode = useRef(false);

  const bind = useLongPress(
    () => {
      const rect = elemRef.current?.getBoundingClientRect();
      if (!rect) return;
      handleLongPress(img.id, { x: rect.x, y: rect.y });
    },
    { threshold: 700, cancelOnMovement: true }
  );

  const handleDragStart = (e: React.DragEvent) => e.preventDefault();

  const handleToggleSelect = (shouldSelect: boolean) => {
    if (shouldSelect) {
      selectRef.current?.classList.add("opacity-100");
    } else {
      selectRef.current?.classList.remove("opacity-100");
    }
  }

  useEffect(() => {
    handleToggleSelect(isSelected);
  }, [isSelected]);


  const updateSelectStateBasedOnGalleryDrag = useCallback((indexAtDragStart: number, indexAtCurrentDragPosition: number, dragMode: "select" | "deselect") => {
    const dragDirection = indexAtDragStart < indexAtCurrentDragPosition ? "right" : "left";

    let shouldBeSelectedAfterDragToSelectEnd = isSelected;

    const imageIndexIsWithinTapRange =
      dragDirection === "right"
        ? index >= indexAtDragStart && index <= indexAtCurrentDragPosition
        : index >= indexAtCurrentDragPosition && index <= indexAtDragStart;

    if (imageIndexIsWithinTapRange) {
      if (dragMode === "select") {
        if (!isSelected) {
          handleToggleSelect(true);
          shouldBeSelectedAfterDragToSelectEnd = true;
          imageWasSelectToggledWhileInDragMode.current = true;
        }
      }

      if (dragMode === "deselect") {
        if (isSelected) {
          shouldBeSelectedAfterDragToSelectEnd = false;
          handleToggleSelect(false);
          imageWasSelectToggledWhileInDragMode.current = true;
        }
      }

    } else {
      if (imageWasSelectToggledWhileInDragMode.current) {
        // here we know the user abandoned the image , the image is destined to be forever alone 😔
        imageWasSelectToggledWhileInDragMode.current = false;

        if (dragMode === "select") {
          if (!isSelected) {
            handleToggleSelect(false);
          }
        }

        if (dragMode === "deselect") {
          if (isSelected) {
            handleToggleSelect(true);
            shouldBeSelectedAfterDragToSelectEnd = true;
          }
        }

      }
    }

    return { selected: shouldBeSelectedAfterDragToSelectEnd, id: img.id }
  }, [isSelected, imageWasSelectToggledWhileInDragMode]);

  const onGalleryDragEnd = useCallback(() => {
    if (imageWasSelectToggledWhileInDragMode.current) {
      imageWasSelectToggledWhileInDragMode.current = false;
    }
  }, [imageWasSelectToggledWhileInDragMode]);

  useImperativeHandle(ref, () => ({
    updateSelectStateBasedOnGalleryDrag,
    onGalleryDragEnd
  }), [updateSelectStateBasedOnGalleryDrag, onGalleryDragEnd]);

  const handleClick = useCallback(() => {
    handleSelectImage();
  }, [handleSelectImage]);

  return (
    <div
      ref={elemRef}
      {...bind()}
      onClick={handleClick}
      onMouseDown={onMouseDown}
      onDragStart={handleDragStart}
      draggable={false}
      style={{
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
      }}
      className="relative cursor-pointer select-none"
    >
      {/* <p className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 text-white">
        {img.id}
      </p> */}
      <img
        src={img.url}
        alt={img.alt}
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
        style={{
          width: IMAGE_SIZE,
          height: IMAGE_SIZE,
        }}
        loading="lazy"
        draggable={false}
        onDragStart={handleDragStart}
        className="h-auto object-cover cursor-pointer select-none pointer-events-none"
      />

      <div ref={selectRef} className="opacity-0 absolute bottom-[4px] right-[4px] w-[16px] h-[16px] flex items-center justify-center bg-white rounded-full select-none pointer-events-none">
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
    </div>
  );
});

export default GalleryImage;
