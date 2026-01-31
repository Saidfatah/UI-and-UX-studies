
"use client"
import { useCallback, useRef } from "react";
import "./style.scss"

const config = {
    theme: 'system',
    cols: 20,
    rows: 10,
}

const getIndexOfStar = (colIndex: number, rowIndex: number) => {
    return (rowIndex * config.cols) + colIndex;
};

const getIndexOfAxisAroundTargetStar = (starRow: number, starCol: number) => {
    const indices: number[] = [];

    // same row (left + right)
    for (let c = 0; c < config.cols; c++) {
        if (c !== starCol) {
            indices.push(getIndexOfStar(c, starRow));
        }
    }

    // same column (top + bottom)
    for (let r = 0; r < config.rows; r++) {
        if (r !== starRow) {
            indices.push(getIndexOfStar(starCol, r));
        }
    }

    return indices;
};

type Vector =
    "bottom-right" | "bottom" | "bottom-left" |
    "right" | "left" |
    "top-right" | "top" | "top-left";

const getVectorFromPointToTarget = (point: { rowIndex: number, colIndex: number }, target: { rowIndex: number, colIndex: number }): Vector => {
    const rowDiff = target.rowIndex - point.rowIndex;
    const colDiff = target.colIndex - point.colIndex;
    if (rowDiff > 0) {
        if (colDiff > 0) {
            return "bottom-right"
        } else if (colDiff < 0) {
            return "bottom-left"
        } else {
            return "bottom"
        }
    } else if (rowDiff < 0) {
        if (colDiff > 0) {
            return "top-right"
        } else if (colDiff < 0) {
            return "top-left"
        } else {
            return "top"
        }
    } else {
        if (colDiff > 0) {
            return "right"
        } else if (colDiff < 0) {
            return "left"
        }
    }
}

const step = 50;
const vectorToTransform = (vector: Vector): { translateX: string, translateY: string } => {
    switch (vector) {
        case "bottom-right":
            return { translateX: `${step}px`, translateY: `${step}px` }
        case "bottom-left":
            return { translateX: `-${step}px`, translateY: `${step}px` }
        case "bottom":
            return { translateX: `0px`, translateY: `${step}px` }
        case "right":
            return { translateX: `${step}px`, translateY: `0px` }
        case "left":
            return { translateX: `-${step}px`, translateY: `0px` }
        case "top-right":
            return { translateX: `${step}px`, translateY: `-${step}px` }
        case "top-left":
            return { translateX: `-${step}px`, translateY: `-${step}px` }
        case "top":
            return { translateX: `0px`, translateY: `-${step}px` }

        default:
            return { translateX: `0px`, translateY: `0px` }
    }
}

const calcScaleBasedOnDistanceFromTarget =(point: { rowIndex: number, colIndex: number }, target: { rowIndex: number, colIndex: number })=> {
    const rowDiff = target.rowIndex - point.rowIndex;
    const colDiff = target.colIndex - point.colIndex;
    const distance = Math.abs(rowDiff) + Math.abs(colDiff);
    const scale = 1 - (distance * 0.03);
    return scale;
}

const TheStar = ({ setRef }: { setRef: (ref: React.RefObject<HTMLDivElement>) => void }) => (
    <div
        ref={setRef}
        className="star"
        style={{
            '--opacity': Math.min(Math.random(), 0.2),
            '--hue': Math.floor(Math.random() * 30),
        }}>
        +
    </div>
)

function StarsGrid() {
    const starsRef = useRef<HTMLDivElement[]>([]);

    const clearTimeoutRef = useRef<NodeJS.Timeout>();

    const onStarHover = useCallback((rowIndex: number, colIndex: number) => {
        if (clearTimeoutRef.current) {
            clearTimeout(clearTimeoutRef.current);
        }

        const indexOfStar = getIndexOfStar(colIndex, rowIndex)

        starsRef.current[indexOfStar].classList.add("starActive");

        // indexesOFTheAxisAroundTheTargetStar.forEach((starIndex) => {
        //     const starElement = starsRef.current[starIndex];
        //     if (!starElement) return;

        //     const starRow = Math.floor(starIndex / config.cols);
        //     const starCol = starIndex % config.cols;

        //     // Distance from the hovered star
        //     const distance = Math.abs(starRow - rowIndex) + Math.abs(starCol - colIndex);

        //     // Add some variation and distance-based delay
        //     const delay = distance * 80; // 80ms per cell away (adjust freely)

        //     starElement.classList.add("starActive");
        //     starElement.style.setProperty("--scaleMultiplier", (Math.random() * 2).toString());
        //     starElement.style.setProperty("--rotateMultiplier", (Math.random() * 100).toString());
        //     starElement.style.transitionDelay = `${delay}ms`;
        //   });


        //asll teh stars :
        
        starsRef.current.forEach((starElement, index) => {
            if (!starElement) return;

            const starRow = Math.floor(index / config.cols);
            const starCol = index % config.cols;

            const distance = Math.abs(starRow - rowIndex) + Math.abs(starCol - colIndex);
            const delay = distance * 10;

            starElement.classList.add("starActive");

            const directionToTheHoveredStar=getVectorFromPointToTarget({ rowIndex: starRow, colIndex: starCol }, { rowIndex, colIndex });
            const transform = vectorToTransform(directionToTheHoveredStar);

            // starElement.style.transitionDelay = `${delay}ms`;
            starElement.style.setProperty("--translateX", transform.translateX);
            starElement.style.setProperty("--translateY", transform.translateY);

            const scaleBasedOnDistanceFromTarget = calcScaleBasedOnDistanceFromTarget({ rowIndex: starRow, colIndex: starCol }, { rowIndex, colIndex });
            starElement.style.setProperty("--scaleMultiplier", (scaleBasedOnDistanceFromTarget *2).toString());

            // starElement.style.setProperty("--scaleMultiplier", (Math.random() * 2).toString());
        });

    }, [starsRef, clearTimeoutRef.current])

    const onStarLeave = useCallback((rowIndex: number, colIndex: number) => {
        const indexOfStar = getIndexOfStar(colIndex, rowIndex)

        const indexesOFTheAxisAroundTheTargetStar = getIndexOfAxisAroundTargetStar(rowIndex, colIndex)
        starsRef.current[indexOfStar].classList.remove("starActive");

        // indexesOFTheAxisAroundTheTargetStar.forEach(star => {
        //     starsRef.current[star].classList.remove("starActive")
        //     starsRef.current[star].style.transitionDelay = `0s`
        // })
        starsRef.current.forEach(star => {
            star.classList.remove("starActive")
            // star.style.removeProperty("--rotateMultiplier")
            // star.style.removeProperty("--scaleMultiplier")

            star.style.setProperty("--translateX", "0px");
            star.style.setProperty("--translateY", "0px");

            // star.style.transitionDelay = `0s`
        })


    }, [starsRef])

    return (<div className="grid">
        {Array.from({ length: config.rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="row">
                {Array.from({ length: config.cols }).map((_, colIndex) => (
                    <div
                        onMouseEnter={() => onStarHover(rowIndex, colIndex)}
                        onMouseLeave={() => onStarLeave(rowIndex, colIndex)}
                    >
                        <TheStar key={colIndex} setRef={(ref) => starsRef.current[getIndexOfStar(colIndex, rowIndex)] = ref} />
                    </div>
                ))}
            </div>
        ))}
    </div>
    );
}

export default StarsGrid;