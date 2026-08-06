"use client";
import { useEffect, useRef } from "react";

const density = "aeéazepoazipoeiazpoeiaàçz!eç8989EZIE0Zez";


function ASciRendering() {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = "/images/saidFatahImage.jpeg";

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(500, 500, 10, 10);
            const pixels = imageData.data;

            // walk through every pixel withing the image 
            for (let i = 0; i < pixels.length; i += 1) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];
                const a = pixels[i + 3];

                const average = (r + g + b) / 3;
                console.log({ r, g, b, a, average })
                // fill current pixel with the average value
                ctx.fillStyle = `rgb(${average}, ${average}, ${average})`;
                ctx.fillRect(500 + (i % 500), Math.floor(i / 500), 1, 1);
                

            }


        };

    }, [ref]);

    return (<div>
        <canvas ref={ref}></canvas>
    </div>);
}

export default ASciRendering;