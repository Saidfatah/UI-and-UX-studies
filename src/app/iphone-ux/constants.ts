import { Image } from "./types";

export const images: Image[] = Array.from({ length: 200 }, (_, i) => {
    const id = 100 + i; // Use sequential IDs to ensure valid Picsum images
    return {
        id: id.toString(),
        alt: `Random image ${i + 1}`,
        url: `https://picsum.photos/id/${id}/800/1200`,
    };
});



// imagesOffsetFormTop is the height of the black area on top when you scroll teh way up 
export const IMAGES_OFFSET_FROM_TOP=100
export const selectedImagesYPosition = 100




export const IPHONE_HEIGHT = 800
export const IPHONE_WIDTH = 480

export const ITEMS_PER_ROW = 8;
const iphoneWidthMinusGaps = IPHONE_WIDTH - (ITEMS_PER_ROW - 1) * 2;
export const IMAGE_SIZE=  iphoneWidthMinusGaps/ITEMS_PER_ROW

export const POPUP_MENU_WIDTH = 200
export const POPUP_MENU_INITIAL_HEIGHT = 0
export const popupMenuSizeClasses = `h-[100px] w-[200px]`

export const GAP_BETWEEN_POPUP_MENU_AND_SELECTED_IMAGES_GROUP = 16
export const IMAGE_AT_EDGE_OF_ROW_PADDING = 16

export const BOTTOM_SAFE_AREA_HEIGHT = 200
export const TOP_SAFE_AREA_HEIGHT = 200

export const iphoneClass = `h-[800px] w-[480px]`


export const TRANSITION_SELECTED_IMAGES_INTO_POSITION_DURATION = 700
export const TRANSITION_SELECTED_IMAGES_INTO_ORIGINAL_POSITION_DURATION = 400

export const imageEnterAnimationTransition=`all 700ms cubic-bezier(0.87, 0, 0.13, 1)`
export const imageExitAnimationTransition=`all 400ms cubic-bezier(0.83, 0, 0.17, 1)`

export const imageRotationAndScaleEnterAnimationTransition=`all 1000ms cubic-bezier(0.34, 1.56, 0.64, 1)`
export const imageRotationAndScaleExitAnimationTransition=`all 400ms cubic-bezier(0.68, -0.6, 0.32, 1.6)`

// here we don't need delay since we execute setTimeout
export const selectedImagesCountLabelEnterAnimationTransition=`all 500ms cubic-bezier(0.68, -0.6, 0.32, 1.6)`;
export const selectedImagesCountLabelExitAnimationTransition=`all 500ms cubic-bezier(0.68, -0.6, 0.32, 1.6)`

export const actionsPopupMenuEnterAnimationTransition = `
transform 250ms 250ms cubic-bezier(0.30,1.35,0.64,1.00),
height 250ms 250ms cubic-bezier(0.30,1.35,0.64,1.00)
`;

export const actionsPopupMenuExitAnimationTransition=`all 250ms cubic-bezier(0.83, 0, 0.17, 1)`

export const blurredBackgroundEnterAnimationTransition=`all 750ms cubic-bezier(0.68, -0.6, 0.32, 1.6)`
export const blurredBackgroundExitAnimationTransition=actionsPopupMenuExitAnimationTransition