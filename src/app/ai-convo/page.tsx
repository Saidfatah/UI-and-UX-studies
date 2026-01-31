'use client'
import React from "react";
import clsx from "clsx";
import DrawingBoard from "../components/DrawingBoard";

const MIN_GRID = 20;
const MAX_GRID = 25;

// Snap helper

// Calculate optimal grid size
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

const ADD_TO_CART_BOTTOM = gridSize * 2;
const ADD_TO_CART_LEFT = window.innerWidth / 2;

const CART_RIGHT = gridSize * 2;
const CART_TOP = gridSize * 2;

function DrawingBoardPage() {
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
        <DrawingBoard className="w-screen h-screen">
            <div>
                
            </div>
        </DrawingBoard>
    );
}

export default DrawingBoardPage;
