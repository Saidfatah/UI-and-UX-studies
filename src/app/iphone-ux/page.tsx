'use client'
import IphoneImagesGallery from './IphoneImagesGallery';
import ScaleRange from './ScaleRange';
import "./iphone.style.css";
import { BASE_IMAGE_SIZE, IPHONE_WIDTH } from './constants';
import { useState } from 'react';
import { useDynamicValuesStore } from './useDynamicValuesStore';

const anchorPoints = [75, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

const isNearAnchorPoint = (value: number) => {
    const nearestAnchorPoint = anchorPoints.reduce((prev, curr) => {
        return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });
    return nearestAnchorPoint;
};

/**
 * Derives the number of items per row based on current image size and available width.
 * Ensures the row fills the container (IPHONE_WIDTH) perfectly.
 */
const deriveItemsPerRow = (imageSize: number, gap: number) => {
    const total = IPHONE_WIDTH; // include last gap in division
    const items = Math.floor(total / imageSize);
    return Math.max(1, items); // always at least 1 item per row
};

/**
 * Calculates image size so that items + gaps fit perfectly into IPHONE_WIDTH.
 */
const calcSize = (percentage: number, gap: number) => {
    // We’ll first guess how many items can fit at this scale.
    // Then we compute image size so they exactly fill the row.
    const baseItemWidth = BASE_IMAGE_SIZE * percentage;
    const estimatedItems = Math.floor(IPHONE_WIDTH / baseItemWidth);
    console.log(baseItemWidth, estimatedItems)

    const gaps = (estimatedItems - 1) * gap

    return (IPHONE_WIDTH - gaps) / estimatedItems;
};

const GAP = 2; // px between images
function Page() {
    const [scale, setScale] = useState(100);
    const { setIMAGE_SIZE, setITEMS_PER_ROW } = useDynamicValuesStore();

    const handleScaleChange = (value: number) => {
        const percentage = value / 100;

        // Compute new image size dynamically
        const newImageSize = calcSize(percentage, GAP);
        const finalSize = newImageSize;

        // Derive how many items can fit at that size
        const itemsPerRow = deriveItemsPerRow(finalSize, GAP);
        console.log({ itemsPerRow })

        setScale(value);
        setIMAGE_SIZE(finalSize);
        setITEMS_PER_ROW(itemsPerRow);
    };

    const handleMouseUp = (value: number) => {
        const percentage = value / 100;

        // Compute new image size dynamically
        const newImageSize = calcSize(percentage, GAP);

        // Derive how many items can fit at that size
        const itemsPerRow = deriveItemsPerRow(newImageSize, GAP);

        const finalSize = (IPHONE_WIDTH - (itemsPerRow - 1) * GAP) / itemsPerRow ;

        console.log({ itemsPerRow })

        setIMAGE_SIZE(finalSize);
    };

    return (
        <div className="bg-white w-screen h-screen flex items-center justify-center">
            <ScaleRange
                value={scale}
                onChange={(value) => handleScaleChange(value)}
                onMouseUp={(value) => handleMouseUp(value)}
            />
            <IphoneImagesGallery />
        </div>
    );
}

export default Page;
