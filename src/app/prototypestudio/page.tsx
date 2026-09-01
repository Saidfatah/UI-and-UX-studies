"use client";
import Header from "./Header";
import "./styles/style.css";

import { CustomEase } from "gsap/CustomEase";
import { gsap } from "gsap";
import HomeCoverSection from "./CoverSection";
import LoaderFade from "./LoaderFade";
import TarteAuCitronToast from "./TarteAuCitronToast";
import ManifiestoSection from "./ManifiestoSection";

import Lenis from "lenis";
import { useEffect, useRef } from "react";


gsap.registerPlugin(CustomEase);

CustomEase.create("beaucoup.alpha", ".25, .46, .45, .9");

CustomEase.create(
    "beaucoup.inOut",
    "M0,0 C0.094,0.026 0.124,0.127 0.157,0.29 0.197,0.486 0.243,0.81 0.337,0.894 0.409,0.959 0.374,1 1,1"
);

CustomEase.create(
    "beaucoup.slowInOut",
    "M0,0 C0.2,0 0,1 1,1"
);

function PrototypeStudio() {
    const mainRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        if (!mainRef.current || !contentRef.current) return;

        const lenis = new Lenis({
            wrapper: mainRef.current,
            content: contentRef.current,
        });

        lenisRef.current = lenis;

        let animationFrame: number;

        function raf(time: number) {
            lenis.raf(time);
            animationFrame = requestAnimationFrame(raf);
        }

        animationFrame = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(animationFrame);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);



    return (
        <>
            <Header />
            <LoaderFade />
            <TarteAuCitronToast />
            
            <div
                ref={mainRef}
                className="main"
            >
                <div
                    ref={contentRef}
                    className="home"
                >
                    <HomeCoverSection />
                    <ManifiestoSection />
                </div>
            </div>
        </>
    );
}

export default PrototypeStudio;