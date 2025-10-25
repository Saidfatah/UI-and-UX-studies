import clsx from "clsx";
import { actionsPopupMenuEnterAnimationTransition, actionsPopupMenuExitAnimationTransition, GAP_BETWEEN_POPUP_MENU_AND_SELECTED_IMAGES_GROUP, IMAGE_SIZE, IPHONE_HEIGHT, IPHONE_WIDTH, POPUP_MENU_INITIAL_HEIGHT, popupMenuSizeClasses } from "./constants";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import React from "react";

const ActionItem = ({
    title,
}: {
    title: string;
}) => (
    <div className="w-full h-[32px] flex items-center justify-between p-[8px]">
        <p className="text-white text-[12px]" >
            {title}
        </p>

        <svg className="size-[12px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
            <path stroke-linecap="round" stroke-linejoin="round" className=" stroke-white" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
        </svg>
    </div>
)
const DeleteItem = () => (
    <div className="w-full flex items-center justify-between p-[8px]">
        <p className="text-red-500 text-[12px]" >
            Delete
        </p>

        <svg className="size-[12px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
            <path className="stroke-red-500" stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>

    </div>
)

const actionsGroup1 = ['Share', 'Favorite', 'Duplicate', 'Hide']
const actionsGroup2 = ['Add to album']
const actionsGroup3 = ['Adjust Date & Time', 'Adjust Location']


export type ImageActionsPopupMenuHandle = {
    show: (origin: { vertical: "top" | "bottom", horizontal: "left" | "right" }) => void;
    hide: () => void;
};

const ITEM_HEIGHT = 32;
const calcHeight = () => {
    const actionsGroup1Height = actionsGroup1.length * ITEM_HEIGHT;
    const actionsGroup2Height = actionsGroup2.length * ITEM_HEIGHT;
    const actionsGroup3Height = actionsGroup3.length * ITEM_HEIGHT;
    const deleteItemHeight = ITEM_HEIGHT;
    const itemsHeightSum = actionsGroup1Height + actionsGroup2Height + actionsGroup3Height + deleteItemHeight;

    const groupsSeparatorHeightSum = 4 * 4;

    const group1SeparatorHeightSum = (actionsGroup1.length - 1) * 0.75;
    const group2SeparatorHeightSum = (actionsGroup2.length - 1) * 0.75;
    const group3SeparatorHeightSum = (actionsGroup3.length - 1) * 0.75;
    const itemsSeparatorHeighSum = group1SeparatorHeightSum + group2SeparatorHeightSum + group3SeparatorHeightSum;

    return itemsHeightSum + groupsSeparatorHeightSum + itemsSeparatorHeighSum;
}

const height = calcHeight();

const ImageActionsPopupMenu = forwardRef<ImageActionsPopupMenuHandle>((_, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const heightRef = useRef<HTMLDivElement>(null);

    const lastVerticalPopupOrigin = useRef<"top" | "bottom">("bottom");
    const lastHorizontalPopupOrigin = useRef<"left" | "right">("left");

    const popupFromBottomOrigin = (origin: "left" | "right") => {
        if (!divRef.current) return;
        if (!heightRef.current) return;

        divRef.current.style.transitionDuration = "1s";
        divRef.current.style.transformOrigin = `left bottom`;

        divRef.current.style.transform = "scale(1)";
        divRef.current.style.opacity = "1";

        heightRef.current.style.removeProperty("top");
        heightRef.current.style.bottom = "0px";
        heightRef.current.style.transitionDuration = "1s";

        heightRef.current.style.height = `${height}px`;
        divRef.current.style.height = `${height}px`;
    };

    const popupFromTopOrigin = (origin: "left" | "right") => {
        if (!divRef.current) return;
        if (!heightRef.current) return;

        lastVerticalPopupOrigin.current = "top";
        lastHorizontalPopupOrigin.current = origin;

        divRef.current.style.transitionDuration = "1s";
        divRef.current.style.transformOrigin = `${origin} top`;
        divRef.current.style.transform = "scale(1)";
        divRef.current.style.opacity = "1";

        heightRef.current.style.removeProperty("bottom");
        heightRef.current.style.top = "0px !important";
        heightRef.current.style.transitionDuration = "1s";

        heightRef.current.style.height = `${height}px`;
        divRef.current.style.height = `${height}px`;
    };

    const hide = useCallback(() => {
        if (!divRef.current) return;
        if (!heightRef.current) return;

        divRef.current.style.transition = actionsPopupMenuExitAnimationTransition;
        heightRef.current.style.transition = actionsPopupMenuExitAnimationTransition;

        divRef.current.style.transitionDuration = "1s";
        divRef.current.style.transformOrigin = `${lastHorizontalPopupOrigin.current} ${lastVerticalPopupOrigin.current}`;
        divRef.current.style.transform = "scale(0.5)";
        divRef.current.style.opacity = "0";

        heightRef.current.style.transitionDuration = "1s";

        heightRef.current.style.height = `${POPUP_MENU_INITIAL_HEIGHT}px`;
        divRef.current.style.height = `${POPUP_MENU_INITIAL_HEIGHT}px`;
    }, [lastHorizontalPopupOrigin, lastVerticalPopupOrigin, divRef, heightRef]);

    const show = (origin: { vertical: "top" | "bottom", horizontal: "left" | "right" }) => {
        if (!divRef.current) return;
        if (!heightRef.current) return;

        divRef.current.style.transition = actionsPopupMenuEnterAnimationTransition;
        heightRef.current.style.transition = actionsPopupMenuEnterAnimationTransition;

        if (origin.vertical === "bottom") {
            popupFromBottomOrigin(origin.horizontal)
        } else {
            popupFromTopOrigin(origin.horizontal)
        }
    }

    useImperativeHandle(ref, () => ({
        show,
        hide,
    }), [show, hide]);

    return (
        <div
            ref={divRef}
            className={clsx(
                "relative rounded-md   overflow-hidden scale-50 opacity-0 bg-[#444444ce] backdrop-blur-lg",
                popupMenuSizeClasses,
            )}
            style={{
                height: `${POPUP_MENU_INITIAL_HEIGHT}px`,
            }}
        >
            <div
                ref={heightRef}
                className={clsx(" absolute left-0 overflow-hidden", popupMenuSizeClasses)}

            >
                <div className="w-full flex flex-col">
                    {actionsGroup1.map((action, index) => (
                        <React.Fragment key={action}>
                            <ActionItem title={action} />
                            {index !== actionsGroup1.length - 1 && (
                                <div className="h-[0.5px] w-full bg-[#bababa75]" />
                            )}
                        </React.Fragment>
                    ))}
                    <div className="h-[4px] w-full bg-[#49494975]" />
                    {actionsGroup2.map((action, index) => (
                        <React.Fragment key={action}>
                            <ActionItem title={action} />
                            {index !== actionsGroup2.length - 1 && (
                                <div className="h-[0.5px] w-full bg-[#bababa75]" />
                            )}
                        </React.Fragment>
                    ))}
                    <div className="h-[4px] w-full bg-[#49494975]" />
                    {actionsGroup3.map((action, index) => (
                        <React.Fragment key={action}>
                            <ActionItem title={action} />
                            {index !== actionsGroup3.length - 1 && (
                                <div className="h-[0.5px] w-full bg-[#bababa75]" />
                            )}
                        </React.Fragment>
                    ))}
                    <div className="h-[4px] w-full bg-[#49494975]" />
                    <DeleteItem />
                </div>
            </div>
        </div>
    );
});

export type PopupMenuWrapperHandle = {
    show: (selectedImagesPosition: { x: number; y: number }) => void;
    hide: () => void;
};

const PopupMenuWrapper = forwardRef<PopupMenuWrapperHandle>((_, ref) => {
    const popupMenuRef = useRef<HTMLDivElement>(null);
    const actionsPopupRef = useRef<ImageActionsPopupMenuHandle>(null);

    const hide = useCallback(() => {
        actionsPopupRef.current?.hide()

        if (popupMenuRef.current) {
            popupMenuRef.current.classList.add("pointer-events-none");
        }
    }, [popupMenuRef, actionsPopupRef]);

    const show = useCallback((selectedImagesPosition: { x: number; y: number }) => {
        if (!popupMenuRef.current) return;
        popupMenuRef.current.classList.remove("pointer-events-none");

        const imagesAreInBottomHalf = selectedImagesPosition.y > IPHONE_HEIGHT / 2;
        const imagesAreInTopHalf = selectedImagesPosition.y < IPHONE_HEIGHT / 2;

        let x = selectedImagesPosition.x;
        const imagesAreOnLeftThirdOfScreen = x < IPHONE_WIDTH / 3;
        const imagesAreOnRightThirdOfScreen = x > (IPHONE_WIDTH / 3 * 2);
        const imagesAreOnMiddleThirdOfScreen = x > IPHONE_WIDTH / 3 && x < (IPHONE_WIDTH / 3 * 2);

        if (imagesAreOnLeftThirdOfScreen) {
            x = x;
        }

        if (imagesAreOnRightThirdOfScreen) {
            x = x - popupMenuRef.current.offsetWidth + IMAGE_SIZE;
        }

        if (imagesAreOnMiddleThirdOfScreen) {
            x = x - popupMenuRef.current.offsetWidth / 2 + IMAGE_SIZE / 2;
        }


        if (imagesAreInTopHalf) {
            popupMenuRef.current.style.removeProperty("bottom");
            popupMenuRef.current.style.top = `${selectedImagesPosition.y + IMAGE_SIZE + GAP_BETWEEN_POPUP_MENU_AND_SELECTED_IMAGES_GROUP}px`;
            popupMenuRef.current.style.left = `${x}px`;
            actionsPopupRef.current?.show({ vertical: "top", horizontal: "left" })
        }

        if (imagesAreInBottomHalf) {
            popupMenuRef.current.style.removeProperty("top");
            const bottomFromTargetY = IPHONE_HEIGHT - selectedImagesPosition.y + GAP_BETWEEN_POPUP_MENU_AND_SELECTED_IMAGES_GROUP;
            popupMenuRef.current.style.bottom = `${bottomFromTargetY}px`;
            popupMenuRef.current.style.left = `${x}px`;
            actionsPopupRef.current?.show({ vertical: "bottom", horizontal: "left" })
        }
    }, [popupMenuRef, actionsPopupRef])

    useImperativeHandle(ref, () => ({
        show,
        hide,
    }), [show, hide]);

    return (
        <div
            ref={popupMenuRef}
            className=" pointer-events-none z-[99] absolute left-0 h-fit w-fit"
        >
            <ImageActionsPopupMenu ref={actionsPopupRef} />
        </div>
    );
});


export default PopupMenuWrapper;