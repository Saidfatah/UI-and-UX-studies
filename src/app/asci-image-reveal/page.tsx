"use client"

import { useEffect, useRef } from "react";
import "./style.css";
import { images_for_ASCI, shuffleArray, wait } from "./utils";
import { random } from "gsap";


type ImageEffectData = {
    asciiGrid: string[][];
    brightnessGrid: number[][];
};



const ASCII_CHARS = "... .. . .. :;o VHau%0v";
const FONT_SIZE = 14;
const ASPECT_WIDTH = 4;
const ASPECT_HEIGHT = 5;
const ASCII_COLUMNS = 40;

const IMAGE_STAGGER = 25;
const CELL_APPEAR_MS = 2;
const SCRAMBLE_COUNT = 5;
const SCRAMBLE_SPEED_MS = 100;
const REAVL_DELAY_MS = 25;

const denseCharIndex = ASCII_CHARS.split('').lastIndexOf('.');
const denseChars = ASCII_CHARS.slice(0, denseCharIndex + 1).split('');
const lightChars = ASCII_CHARS.slice(denseCharIndex + 1).split('');


// calc with ahd height of chars 
const measureCt = document.createElement("canvas").getContext("2d");
measureCt!.font = `${FONT_SIZE}px monospace`;
const charWidth = Math.ceil(measureCt!.measureText("M").width);
const charHeight = FONT_SIZE;
const ASCII_ROWS = Math.round(
    ASCII_COLUMNS * (ASPECT_HEIGHT / ASPECT_WIDTH) * (charWidth / charHeight)
);


function prepareCanvas(canvas: HTMLCanvasElement) {
    // keep cnavas looking sharp 
    const dpr = 2;
    canvas.width = ASCII_COLUMNS * charWidth * dpr;
    canvas.height = ASCII_ROWS * charHeight * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const drawCharatcer = (ctx: CanvasRenderingContext2D, col: number, row: number, char: string) => {
    // first paint over what was there to clear the cnavas
    ctx.fillStyle = "#111";
    ctx.fillRect(col * charWidth, row * charHeight, charWidth, charHeight);

    // then print the text
    ctx.fillStyle = `rgba(256,256,256,1.0)`;
    ctx.fillText(char, col * charWidth, row * charHeight);
}


const schduleImageReveal = (canvas: HTMLCanvasElement) => {
    setTimeout(() => {
        canvas.closest('.img')?.classList.add('revealed');
    }, REAVL_DELAY_MS);
}

const hideImageANdSHowCanvas = (canvas: HTMLCanvasElement) => {
    canvas.closest('.img')?.classList.remove('revealed');
}


function animateCells(canvas: HTMLCanvasElement, asciiGrid: string[][], brightnessGrid: number[][], staggerDelay: number) {
    const dpr = 2;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${charHeight}px monospace`;
    ctx.textBaseline = "top";

    const totalCells = ASCII_COLUMNS * ASCII_ROWS;

    const scrambleState = new Array(totalCells).fill(null);
    let settledCount = 0;

    const cellorder = shuffleArray(
        Array.from({ length: totalCells }, (_, i) => i),
    )

    // this renders all cels as less dense characters first
    cellorder.forEach((cellIndex, i) => {
        setTimeout(() => {
            const row = Math.floor(cellIndex / ASCII_COLUMNS);
            const col = cellIndex % ASCII_COLUMNS;
            const isDark = brightnessGrid[row][col] > denseCharIndex;

            if (!isDark) {
                drawCharatcer(ctx, col, row, asciiGrid[row][col]);
                scrambleState[cellIndex] = 0;
                settledCount++;
                if (settledCount === totalCells) {
                    // reveal image
                    schduleImageReveal(canvas)
                }
            } else {
                drawCharatcer(
                    ctx,
                    col,
                    row,
                    denseChars[Math.floor(Math.random() * denseChars.length)]
                );

                scrambleState[cellIndex] = SCRAMBLE_COUNT;
            }

        },
            staggerDelay + i * CELL_APPEAR_MS
        );
    });


    // idle effectscrambler ticker , on fixed interval this runs after the 
    // this skipps any cells tha tare not cettled

    const scramberTicker = setInterval(() => {
        let stillScrambling = false;

        for (let cellIndex = 0; cellIndex < totalCells; cellIndex++) {
            const remaining = scrambleState[cellIndex];

            if (remaining === null || remaining === 0) {
                continue;
            }

            stillScrambling = true;

            const row = Math.floor(cellIndex / ASCII_COLUMNS);
            const col = cellIndex % ASCII_COLUMNS;

            if (remaining === 1) {
                drawCharatcer(ctx, col, row, asciiGrid[row][col]);
                scrambleState[cellIndex] = 0;
                settledCount++;
                if (settledCount === totalCells) {
                    schduleImageReveal(canvas);
                }
            } else {
                drawCharatcer(
                    ctx,
                    col,
                    row,
                    denseChars[Math.floor(Math.random() * denseChars.length)]
                );

                scrambleState[cellIndex] = remaining - 1;
            }
        }

        if (!stillScrambling && settledCount === totalCells) {
            clearInterval(scramberTicker);
        }
    }, CELL_APPEAR_MS);


}



const renderRow = (
    ctx: CanvasRenderingContext2D,
    row: number,
    asciiGrid: string[][],
    brightnessGrid: number[][],
) => {
    const scrambleState = new Array(ASCII_COLUMNS).fill(0);

    for (let col = 0; col < ASCII_COLUMNS; col++) {
        const isDark = brightnessGrid[row][col] > denseCharIndex;

        if (!isDark) {
            drawCharatcer(ctx, col, row, asciiGrid[row][col]);

            // Already settled.
            scrambleState[col] = 0;
        } else {
            drawCharatcer(ctx, col, row, denseChars[Math.floor(Math.random() * denseChars.length)]);

            // Needs to scramble.
            scrambleState[col] = SCRAMBLE_COUNT;
        }
    }

    return scrambleState;
};


const tickScrambleRow = (
    ctx: CanvasRenderingContext2D,
    row: number,
    asciiGrid: string[][],
    scrambleState: number[],
) => {
    let stillScrambling = false;

    for (let col = 0; col < ASCII_COLUMNS; col++) {
        const remaining = scrambleState[col];

        if (remaining === 0) {
            continue;
        }

        stillScrambling = true;

        if (remaining === 1) {
            drawCharatcer(
                ctx,
                col,
                row,
                asciiGrid[row][col],
            );

            scrambleState[col] = 0;
        } else {
            drawCharatcer(
                ctx,
                col,
                row,
                ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)],
            );

            scrambleState[col] = remaining - 1;
        }
    }

    return stillScrambling;
};


async function animateCellsRowByRow(
    canvas: HTMLCanvasElement,
    asciiGrid: string[][],
    brightnessGrid: number[][],
    staggerDelay: number,
) {
    const dpr = 2;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.font = `${charHeight}px monospace`;
    ctx.textBaseline = "top";

    for (let row = 0; row < ASCII_ROWS; row++) {

        // --------------------------------
        // 1. INITIAL RENDER
        // --------------------------------

        const scrambleState = renderRow(
            ctx,
            row,
            asciiGrid,
            brightnessGrid,
        );

        // --------------------------------
        // 2. SCRAMBLE TICKER
        // --------------------------------

        while (true) {
            await wait(5);

            const stillScrambling = tickScrambleRow(
                ctx,
                row,
                asciiGrid,
                scrambleState,
            );

            if (!stillScrambling) {
                break;
            }
        }

        // --------------------------------
        // 3. ROW IS FINISHED
        // --------------------------------

        await wait(10);
    }

    // All rows finished.
    schduleImageReveal(canvas);
}

const imageAsGrid = (img: HTMLImageElement) => {
    const imageAspect = img.naturalWidth / img.naturalHeight;
    const itemAspect = ASPECT_WIDTH / ASPECT_HEIGHT;

    // ths icrops the image so it distch stretch but rather it fits 
    let cropX = 0,
        cropY = 0,
        cropW = img.naturalWidth,
        cropH = img.naturalHeight;

    if (imageAspect > itemAspect) {
        cropW = img.naturalHeight * itemAspect;
        cropX = (img.naturalWidth - cropW) / 2;
    } else {
        cropH = img.naturalWidth / itemAspect;
        cropY = (img.naturalHeight - cropH) / 2;
    }


    // thsi is to make the pixel limunation calculation easy 
    // make sampling teh image easier

    const samplingCanvas = document.createElement("canvas");

    if (samplingCanvas && samplingCanvas !== null) {
        samplingCanvas.width = ASCII_COLUMNS;
        samplingCanvas.height = ASCII_ROWS;

        const context2d = samplingCanvas.getContext("2d");
        if (context2d !== null) {
            context2d.drawImage(
                img,
                cropX,
                cropY,
                cropW,
                cropH,
                0,
                0,
                ASCII_COLUMNS,
                ASCII_ROWS
            )

        }

        const { data } = samplingCanvas
            .getContext("2d")!
            .getImageData(0, 0, ASCII_COLUMNS, ASCII_ROWS);
        const asciiGrid = [];
        const brightnessGrid = [];



        for (let row = 0; row < ASCII_ROWS; row++) {
            const asciiRow = [];
            const brightnessRow = [];

            for (let col = 0; col < ASCII_COLUMNS; col++) {
                const pixelIndex = (row * ASCII_COLUMNS + col) * 4;

                // standard luminance forumala 
                const brightness =
                    (
                        data[pixelIndex] * 0.299 +
                        data[pixelIndex + 1] * 0.587 +
                        data[pixelIndex + 2] * 0.114
                    ) / 255;

                const charIndex = Math.min(
                    ASCII_CHARS.length - 1,
                    Math.floor((1 - brightness) * ASCII_CHARS.length)
                );

                //we use this for the intial rendering for rending 
                asciiRow.push(ASCII_CHARS[charIndex]);

                // this will be used to know which cells to scramble later
                brightnessRow.push(charIndex);
            }

            asciiGrid.push(asciiRow);
            brightnessGrid.push(brightnessRow);

        }

        return { asciiGrid, brightnessGrid };
    }
}

function startEffect(
    img: HTMLImageElement,
    canvas: HTMLCanvasElement,
    staggerDelay: number
) {
    const result = imageAsGrid(img);

    if (!result) return null;

    const { asciiGrid, brightnessGrid } = result;

    prepareCanvas(canvas);
    animateCells(canvas, asciiGrid, brightnessGrid, staggerDelay);
    // animateCellsRowByRow(canvas, asciiGrid, brightnessGrid, staggerDelay);

    return { asciiGrid, brightnessGrid };
}

function ASCIImageReveal() {
    const effectsRefs = useRef<(ImageEffectData | null)[]>([]);
    const imagesRefs = useRef<(HTMLImageElement | null)[]>([]);
    const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

    useEffect(() => {
        imagesRefs.current.forEach((img, index) => {

            const canvas = canvasRefs.current[index];

            if (!img) return;
            if (!canvas) return;

            const staggerDelay = index * IMAGE_STAGGER;

            const onLoaded = () => {
                const effectData = startEffect(img, canvas, staggerDelay);

                if (effectData) {
                    effectsRefs.current[index] = effectData;
                }
            };

            if (img.complete && img.naturalWidth) {
                onLoaded();
            } else {
                img.addEventListener("load", onLoaded);
            }
        });
    }, []);

    return (
        <div className=" flex h-screen w-screen items-center justify-center bg-black">
                {images_for_ASCI.map((src, index) => (
                    <div className="img flex justify-center " key={index}>
                        <img
                            ref={(el) => {
                                imagesRefs.current[index] = el;
                            }}


                            className="ascii-reveal"
                            src={src}
                            alt=""
                        />

                        <canvas
                            ref={(el) => {
                                canvasRefs.current[index] = el;
                            }}
                        />

                    </div>
                ))}
        </div>
    );
}

export default ASCIImageReveal;