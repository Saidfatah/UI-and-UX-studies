'use client'
import React from "react";
import clsx from "clsx";

const MIN_GRID = 20;
const MAX_GRID = 25;

const calcGridSize = () => {
    const colCount = Math.round(window.innerWidth / 40); // aim ~40px
    const rowCount = Math.round(window.innerHeight / 40);

    const gridWidth = window.innerWidth / colCount;
    const gridHeight = window.innerHeight / rowCount;

    // Take the smaller to ensure grid fits
    const grid = Math.min(gridWidth, gridHeight);

    // Clamp grid between MIN_GRID and MAX_GRID
    return Math.max(MIN_GRID, Math.min(MAX_GRID, grid));
};

const gridSize = calcGridSize();

const colsCount = Math.floor(window.innerWidth / gridSize);
const rowsCount = Math.floor(window.innerHeight / gridSize);

const excessAtTheBottom = Math.abs(rowsCount * gridSize - window.innerHeight);
const excessAtTheRight = Math.abs(colsCount * gridSize - window.innerWidth);

const getDrawingBoardXPosition = (gridPosition: number) => {
    return gridPosition * gridSize;
}

const getDrawingBoardYPosition = (gridPosition: number) => {
    return gridPosition * gridSize;
}

function DrawingBoard({children,className}: {children: React.ReactNode,className?: string}) {
    const svgBackground = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${gridSize}" height="${gridSize}">
      <rect x="0" y="0" width="${gridSize}" height="${gridSize}" fill="none" stroke="#ccc" stroke-width="1"/>
    </svg>
  `);

    const backgroundStyle = {
        backgroundImage: `url("data:image/svg+xml,${svgBackground}")`,
        backgroundRepeat: "repeat",
        width: "100vw",
        height: "100vh",
    };

    return (
        <div style={backgroundStyle} className={clsx("relative",className)}>
            {children}
        </div>
    );
}

export default DrawingBoard;
