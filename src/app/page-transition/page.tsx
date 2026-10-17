"use client"
import Nav from "./Nav";
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import { useRef } from "react";
import "./style.css"


function Page() {
    const container = useRef<HTMLDivElement>()

    useGSAP(() => {
        const title = container.current?.querySelector("h1");
        

        if (!title) return;

        const heroTitle = new SplitText(title, {
            type: "chars",
            mask: "chars",
        });

        gsap.set(title, {
            autoAlpha: 1,
        });

        gsap.set(heroTitle.chars, {
            y: 400,
        });

        gsap.to(heroTitle.chars, {
            y: 0,
            rotateX: 0,
            duration: 0.5,
            stagger: 0.075,
            ease: "power3.out",
            delay: 1.125,
        });
    }, { scope: container });

    return (
        <div ref={container} className="page home">
            <Nav />
            <div className="page-container">
                <h1 className="hero-title">
                    SAID FATAH
                </h1>
            </div>
        </div>
    );
}

export default Page;