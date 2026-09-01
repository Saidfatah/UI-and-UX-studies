"use client"
import { useEffect, useRef } from "react";
import GL from "./GL";

export default function ProgressiveBlur() {
    const imagesRefs = useRef<HTMLImageElement[]>([])

    useEffect(() => {
        if (!imagesRefs.current.length) return

        const gl = new GL(imagesRefs.current)

        return () => {
            // gl.destroy()
        }
    }, [imagesRefs.current]);

    return (
        <div className="w-screen h-screen ">
            <figure className="media">
                <img ref={(el) => el && imagesRefs.current.push(el) as any} src="/images/saidFatahImage.jpeg" alt="Progressive Blur" />
                <img ref={(el) => el && imagesRefs.current.push(el) as any} src="/images/saidFatahImage.jpeg" alt="Progressive Blur" />
                <img ref={(el) => el && imagesRefs.current.push(el) as any} src="/images/saidFatahImage.jpeg" alt="Progressive Blur" />
                <img ref={(el) => el && imagesRefs.current.push(el) as any} src="/images/saidFatahImage.jpeg" alt="Progressive Blur" />
            </figure>

            <canvas id="gl"></canvas>

            <div className="h-screen w-screen" />
        </div>
    );
}
