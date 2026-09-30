'use client'
import { ReactNode, useEffect, useRef } from 'react';
import Header from './Header';
import './style.css'
import Lenis from 'lenis';
import HeroSection from './Hero';




import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const PageLayout = ({ children }: { children: ReactNode }) => {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        // switch the colors first 
        const body = document.body
        if (body) {
            body.classList.add('switch')
        }

        const html = document.documentElement

        // setup lenis
        const lenis = new Lenis({
            wrapper: html,
            content: html,
            wheelMultiplier: 0.9
        })

        lenisRef.current = lenis;


        // sync gsap ticker with lenis scroller
        lenis.on("scroll", ScrollTrigger.update);
        
        const update = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        // setup teh background switch to light mode once we scroll 560 pixels
        gsap.fromTo(
            'body.switch',
            {},
            {
                scrollTrigger: {
                    trigger: "html",
                    scroller: html,
                    toggleClass: "--light",
                    start: 560,
                    end: "bottom bottom-=200",
                    scrub: false
                }
            }
        )


        return () => {
            gsap.ticker.remove(update);
            lenis.destroy()
        }
    }, [])



    return (
        <div className="h-[500vh] ">
            <Header />
            {children}
        </div>
    )
}

function Grapheine() {


    return (<PageLayout >
        <HeroSection />
    </PageLayout>);
}

export default Grapheine;