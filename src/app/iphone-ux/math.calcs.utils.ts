import { BOTTOM_SAFE_AREA_HEIGHT, IMAGE_AT_EDGE_OF_ROW_PADDING, IMAGE_SIZE, IPHONE_HEIGHT, IPHONE_WIDTH, TOP_SAFE_AREA_HEIGHT } from "./constants";

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