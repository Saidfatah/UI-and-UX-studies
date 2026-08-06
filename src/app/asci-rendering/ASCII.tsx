"use client"

import { useEffect, useRef } from "react";

// https://www.youtube.com/watch?v=MJNy2mdCt20
const img = "/images/saidFatahImage.jpeg";

const ASCII_LUMINOSITY_Map = {
    0: " ",
    1: ".",
    2: ":",
    3: "-",
    4: "=",
    5: "+",
    6: "*",
    7: "#",
    8: "%",
    9: "@",
}

function AsciiRendering() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;
        ctx.fillStyle = "white"

        // render an image 
        const image = new Image();
        image.src = img;
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;

            ctx.drawImage(image, 0, 0);

            // establish the grid 
            const cellSize = 8; // Adjust for more/less detail
            const cols = Math.floor(canvas.width / cellSize);
            const rows = Math.floor(canvas.height / cellSize);


            // Clear canvas for ASCII text
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";
            ctx.font = `${cellSize}px monospace`;

            // Convert each cell to ASCII
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    // Get pixel data for this cell
                    const imageData = ctx.getImageData(
                        x * cellSize,
                        y * cellSize,
                        cellSize,
                        cellSize
                    );

                    // Step 6: Calculate average luminosity for the cell
                    let totalLuminosity = 0;
                    let pixelCount = 0;

                    for (let i = 0; i < imageData.data.length; i += 4) {
                        const r = imageData.data[i];
                        const g = imageData.data[i + 1];
                        const b = imageData.data[i + 2];

                        // Calculate luminosity using standard formula
                        const luminosity = 0.299 * r + 0.587 * g + 0.114 * b;
                        totalLuminosity += luminosity;
                        pixelCount++;
                    }

                    const avgLuminosity = totalLuminosity / pixelCount;

                    // Step 7: Map luminosity to ASCII character
                    const charIndex = Math.floor((avgLuminosity / 255) * 9);
                    const asciiChar = ASCII_LUMINOSITY_Map[charIndex as keyof typeof ASCII_LUMINOSITY_Map];

                    // Step 8: Draw the ASCII character
                    ctx.fillText(asciiChar, x * cellSize, (y + 1) * cellSize);
                }
            }

            

        }


    }, [canvasRef]);

    return (<div className=" w-screen h-screen flex justify-center items-center">

        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />

    </div>);
}

export default AsciiRendering;