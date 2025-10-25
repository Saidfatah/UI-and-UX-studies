import { forwardRef, useImperativeHandle, useRef } from "react";
import { IMAGE_SIZE, selectedImagesCountLabelEnterAnimationTransition, selectedImagesCountLabelExitAnimationTransition } from "./constants";

export type SelectedImagesCountLableHandle = {
    show: (x: number, y: number) => void;
    hide: () => void;
}

type Props = {
    selectedImagesCount: number;
}
const SelectedImagesCountLabel = forwardRef<SelectedImagesCountLableHandle, Props>((props, ref) => {
    const selectedImagesCountLabelRef = useRef<HTMLDivElement>(null);

    const show = (x: number, y: number) => {
        if (selectedImagesCountLabelRef.current) {
            selectedImagesCountLabelRef.current.style.transition = "none";
            selectedImagesCountLabelRef.current.style.left = `${5 + x + IMAGE_SIZE - selectedImagesCountLabelRef.current.offsetWidth}px`;
            selectedImagesCountLabelRef.current.style.top = `${y - 10}px`;
            selectedImagesCountLabelRef.current.style.display = "flex";

            setTimeout(() => {
                if (!selectedImagesCountLabelRef.current) return;

                selectedImagesCountLabelRef.current.style.transition = selectedImagesCountLabelEnterAnimationTransition;
                selectedImagesCountLabelRef.current.style.transform = "scale(1)";
                selectedImagesCountLabelRef.current.style.opacity = "1";
            }, 10);
        }
    };

    const hide = () => {
        if (selectedImagesCountLabelRef.current) {
            selectedImagesCountLabelRef.current.style.transition = selectedImagesCountLabelExitAnimationTransition;
            selectedImagesCountLabelRef.current.style.transform = "scale(0)";
            selectedImagesCountLabelRef.current.style.opacity = "0";
        }
    };

    useImperativeHandle(ref, () => ({
        show,
        hide,
    }), [show, hide]);

    return (<div
        ref={selectedImagesCountLabelRef}
        className="absolute scale-50 opacity-0 hidden z-[999] top-[12px] left-[12px] rounded-full border-[2px] border-white bg-blue-400 min-w-[20px] px-[6px] !w-fit h-[24px]  items-center justify-center"
    >
        <p className="text-white text-center text-[14px]">
            {/* {selectedImages.size} */}
            {props.selectedImagesCount}
        </p>
    </div>
    );
});

export default SelectedImagesCountLabel;