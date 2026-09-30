"use client"
import clsx from "clsx";

import styles from "./hero.module.scss";

import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";

export const remToPixel = (rem: number) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

import { GSDevTools } from "gsap/GSDevTools";





function HeroSection() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    const [mediaIsLoaded, setMediaIsLoaded] = useState(false);
    const [mediaIsActive, setMediaIsActive] = useState(false);

    const wordsRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if (!wordsRef.current) return;

        const words = Array.from(wordsRef.current.children);

        const timeline = gsap.timeline({
            repeat: -1, // makes gsap restart the timeline forever 
            paused: true,
            // id:"title-turn"
        });
        
        // GSDevTools.create({animation: timeline});

        let previous: Element | null = null;

        words.forEach((word, index) => {

            if (previous) {
                timeline.to(previous, {
                    opacity: 0,
                    display: "none",
                    duration: 0.4,
                    ease: "power3.out",
                }, "+=1.8");
            }

            timeline.to(word, {
                opacity: 1,
                display: "inline-block",
                duration: 0.4,
                ease: "power3.in",
            });

            if (index === words.length - 1) {
                timeline.to(word, {
                    opacity: 0,
                    display: "none",
                    duration: 0.4,
                    ease: "power3.out",
                }, "+=1.8");
            }

            previous = word;
        });

        timeline.play();

        return () => {
            timeline.kill();
        };
    }, []);

    useEffect(() => {
        const html = document.documentElement
        if (!heroRef.current || !titleRef.current) return;

        const hero = heroRef.current;
        const title = titleRef.current;

        const scrollTrigger = gsap.to(hero, {
            y: -remToPixel(6),
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                endTrigger: title,
                start: "top top",
                end: "bottom top",
                scrub: true,
                scroller: html
            }
        });

        return () => {
            scrollTrigger.kill();
        };

    }, [heroRef, titleRef]);

    return (

        <section className={clsx([styles.root, "grid"])}>

            <h1
                ref={titleRef}
                className={styles.title}
            >
                <span>
                    Design de marques
                </span>

                <span ref={wordsRef}>
                    <span>responsables</span>
                    <span>d’influence</span>
                    <span>distinctives</span>
                    <span>visuelles et verbales</span>
                    <span>de confiance</span>
                    <span>citoyennes</span>
                    <span>de fabrique</span>
                    <span>qui font sens</span>
                    <span>durables</span>
                    <span>désirables</span>
                    <span>d’ouverture</span>
                    <span>addictives</span>
                    <span>d’attention</span>
                    <span>de respect</span>
                    <span>d’intérêt général</span>
                    <span>agiles</span>
                    <span>publiques</span>
                    <span>pour toutes et tous</span>
                    <span>intemporelles</span>
                    <span>d’audace</span>
                </span>
            </h1>

            <div
                ref={heroRef}
                className={styles.hero}
            >
                <div
                    className={clsx([
                        "media",
                        "--init",
                        mediaIsLoaded && "--loaded",
                        mediaIsActive && "--active"
                    ])}
                >
                    <video
                        src="https://grapheine.com/wp-content/uploads/2025/10/showreel_grapheine_27_octobre.mp4"
                        width="2280"
                        height="1410"
                        preload="auto"
                        onLoadedData={() => {
                            setMediaIsLoaded(true);
                        }}
                        onPlay={() => setMediaIsActive(true)}
                        muted
                        autoPlay
                        playsInline
                        loop
                    />
                </div>
            </div>

        </section>

    );
}

export default HeroSection;

