"use client"
import { useCallback, useRef } from "react";

const img1 = "  /9dzqkp3d2u4-app-creative.webp";
const img2 = "  /rlartawee0i-app-agents.webp";

// hover will animate 
// mask-image on each image to make look like the hover img is ontop of the other img
// translateY is animated to transform: translateY(0.75rem); in the unhovered img

function TwoPlatformsBuiltOnSection() {
    const img1MaskRef = useRef<HTMLImageElement>(null);
    const img2MaskRef = useRef<HTMLImageElement>(null);

    const onImageHover = useCallback((targetImage: "img1" | "img2") => {
        if (targetImage === "img1") {
            // img2 is blurred
            
            img2MaskRef.current?.style.setProperty("transition-delay", "0s");
            img2MaskRef.current?.style.setProperty("z-index", "var(--zIndex-unhovered)");
            img2MaskRef.current?.style.setProperty("filter", "blur(2px)");
            img2MaskRef.current?.style.setProperty("mask-position", "25% 0%");
            img2MaskRef.current?.style.setProperty("transform",  "translate(0,var(--translate-y-unhovered))");
            img2MaskRef.current?.style.setProperty("transition-duration", "var(--transition-duration-unhovered)");

            
            // delay the current hovered 
            img1MaskRef.current?.style.setProperty("transition-delay", "calc(var(--transition-duration-unhovered) * 0.5)");

            // img1 is on top
            img1MaskRef.current?.style.setProperty("filter", "blur(0px)");
            img1MaskRef.current?.style.setProperty("mask-position", "0% 0%");
            img1MaskRef.current?.style.setProperty("zIndex", "var(--zIndex-hovered)");
            img1MaskRef.current?.style.setProperty("transform",  "translate(0,0)");
            img1MaskRef.current?.style.setProperty("transition-duration", "var(--transition-duration-hovered)");
            
        } else {
            // img1 is blurred
            // delay the current hovered 
            img1MaskRef.current?.style.setProperty("transition-delay", "0s");
            img1MaskRef.current?.style.setProperty("filter", "blur(2px)");
            img1MaskRef.current?.style.setProperty("mask-position", "75% 0%");
            img1MaskRef.current?.style.setProperty("z-index", "var(--zIndex-unhovered)");
            img1MaskRef.current?.style.setProperty("transform", "  translate(0,var(--translate-y-unhovered))");
            img1MaskRef.current?.style.setProperty("transition-duration", "var(--transition-duration-unhovered)");
            
            // remove delay from target 
            img2MaskRef.current?.style.setProperty("transition-delay", "calc(var(--transition-duration-unhovered) * 0.5)");
            img2MaskRef.current?.style.setProperty("filter", "blur(0px)");
            img2MaskRef.current?.style.setProperty("mask-position", "100% 0%");
            img2MaskRef.current?.style.setProperty("z-index", "var(--zIndex-hovered)");
            img2MaskRef.current?.style.setProperty("transform",  "translate(0,0)");
            img2MaskRef.current?.style.setProperty("transition-duration", "var(--transition-duration-hovered)");
        }
    }, [img1MaskRef, img2MaskRef]);

    return (
        <div className="card ">
            <div
                ref={img1MaskRef}
                className="image-wrapper"
                onMouseEnter={() => onImageHover("img1")}
            >
                <img src={img1} alt="ElevenLabs Logo" />
            </div>
            <div
                ref={img2MaskRef}
                className="image-wrapper"
                onMouseEnter={() => onImageHover("img2")}
            >
                <img src={img2} alt="ElevenLabs Logo" />
            </div>
        </div>
    );
}

export default TwoPlatformsBuiltOnSection;