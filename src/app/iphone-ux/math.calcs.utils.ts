import { BOTTOM_SAFE_AREA_HEIGHT, IMAGE_AT_EDGE_OF_ROW_PADDING, IMAGE_SIZE, IMAGES_OFFSET_FROM_TOP, IPHONE_HEIGHT, IPHONE_WIDTH, ITEMS_PER_ROW, TOP_SAFE_AREA_HEIGHT } from "./constants";

export const calcAnticipationPosition = (
    imagePosition: { x: number; y: number },
    targetPosition: { x: number; y: number },
    anticipationFactor = 0.1 // 10%
  ) => {
    const dx = targetPosition.x - imagePosition.x;
    const dy = targetPosition.y - imagePosition.y;
  
    return {
      x: imagePosition.x + dx * anticipationFactor,
      y: imagePosition.y + dy * anticipationFactor,
    };
};

export const calcSelectedImagesTargetPositionBasedOnWhereUserTapped=(targetPosition:{x:number,y:number},imagesContainerScrollTop:number)=>{
    let x = targetPosition.x;
    let y = targetPosition.y

    // we need to map the y position from the scroll to iphone height
    y = y - imagesContainerScrollTop;

    const isInTopHalf = y <= IPHONE_HEIGHT / 2;

    if (isInTopHalf) {
        const yPositionExceedsTheTopSafeAreaForTheMenu = y > TOP_SAFE_AREA_HEIGHT;

        if (yPositionExceedsTheTopSafeAreaForTheMenu) {
            const safeAreaHeightExceededBy = y - TOP_SAFE_AREA_HEIGHT;
            y = y - safeAreaHeightExceededBy;
        } else {
            // we keep y at the y position of the image that was targeted with mouse down 
            y = y - IMAGE_AT_EDGE_OF_ROW_PADDING;
        }
    }

    const isInBottomHalf = y > IPHONE_HEIGHT / 2;
    if (isInBottomHalf) {
        const yPositionIsInTheUnsafeCenterAreaForTheMenu = y < (IPHONE_HEIGHT - BOTTOM_SAFE_AREA_HEIGHT);

        if (yPositionIsInTheUnsafeCenterAreaForTheMenu) {
            const safeAreaHeightExceededBy = Math.abs(y - (IPHONE_HEIGHT - BOTTOM_SAFE_AREA_HEIGHT));
            y = y + safeAreaHeightExceededBy;
        } else {
            console.log("here")
            // we keep y at the y position of the image that was targeted with mouse down
            y = y + IMAGE_AT_EDGE_OF_ROW_PADDING;

            console.log(y + IMAGE_SIZE +10 ,IPHONE_HEIGHT)
            // to make sure selected images don't go beyond screen bottom edge
            if(y + IMAGE_SIZE + 10 >= IPHONE_HEIGHT){
                y = y - IMAGE_AT_EDGE_OF_ROW_PADDING - 5; // remove the padding
            }
        }
    }


    const isInStartOfRow = x <= IMAGE_SIZE;
    const isInEndOfRow = (x + IMAGE_SIZE + 5) - IPHONE_WIDTH >= 0; // 5 is to make sure we good 
    if (isInStartOfRow) {
        x = x + IMAGE_AT_EDGE_OF_ROW_PADDING;
    }
    if (isInEndOfRow) {
        x = x - IMAGE_AT_EDGE_OF_ROW_PADDING;
    }

    return {
        x,
        y
    }
    
}


export const getImageIndexBasedOnMousePosition=(e:React.MouseEvent,leftOffset:number,topOffset:number) :{
    currentHoveredElementIndex: number;
    currentHoveredElementColumnIndex: number;
    currentHoveredElementRowIndex: number;
}=>{
    const mouseXCorrectedToIphonePosition = Math.round(e.clientX - leftOffset);
    const mouseYCorrectedToIphonePosition = Math.round(e.clientY - topOffset -IMAGES_OFFSET_FROM_TOP);
    
    if (mouseXCorrectedToIphonePosition < 0 || mouseYCorrectedToIphonePosition < 0)  return {
        currentHoveredElementIndex: 0,
        currentHoveredElementColumnIndex: 0,
        currentHoveredElementRowIndex: 0
    };

    const currentHoveredElementColumnIndex = Math.floor(mouseXCorrectedToIphonePosition / IMAGE_SIZE);
    const currentHoveredElementRowIndex = Math.floor(mouseYCorrectedToIphonePosition / IMAGE_SIZE);

    let currentHoveredElementIndex = 0

    if (currentHoveredElementRowIndex === 0) {
        currentHoveredElementIndex = currentHoveredElementColumnIndex
    }

    if (currentHoveredElementRowIndex > 0) {
        currentHoveredElementIndex = currentHoveredElementColumnIndex  + currentHoveredElementRowIndex * ITEMS_PER_ROW
    }

    return {
        currentHoveredElementIndex,
        currentHoveredElementColumnIndex,
        currentHoveredElementRowIndex
    }
}



export const isValidDrag=(dx:number,dy:number)=>{
    return dx > IMAGE_SIZE / 2 || dy > IMAGE_SIZE / 2;
}