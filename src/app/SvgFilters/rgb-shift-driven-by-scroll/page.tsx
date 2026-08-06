"use client"
import React, { useEffect, useRef, useState } from 'react'
import "../style.css"

function SvgFilters() {
    const [redOffset, setRedOffset] = useState(-5);
    const [greenOffset, setGreenOffset] = useState(0);
    const [blueOffset, setBlueOffset] = useState(5);
    const [redYOffset, setRedYOffset] = useState(0);
    const [greenYOffset, setGreenYOffset] = useState(0);
    const [blueYOffset, setBlueYOffset] = useState(0);
    const turbulenceRef = useRef<SVGTurbulenceElement>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const imageSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = (e: Event) => {
            // if (!containerRef.current || !imageSectionRef.current) return;

            // const container = containerRef.current;
            // const imageSection = imageSectionRef.current;

            // Get the position of the image section relative to the container
            const imageSectionTop = imageSectionRef.current?.offsetTop || 0;
            // const containerHeight = container.clientHeight;
            // const imageSectionHeight = imageSection.clientHeight;

            // Calculate when the image section starts and ends being visible
            // const scrollStart = imageSectionTop - containerHeight;
            // const scrollEnd = imageSectionTop + imageSectionHeight;

            // // Get current scroll position
            // const currentScroll = container.scrollTop;

            // // Calculate progress (0 to 1)
            // let progress = 0;
            // if (currentScroll >= scrollStart && currentScroll <= scrollEnd) {
            //     progress = (currentScroll - scrollStart) / (scrollEnd - scrollStart);
            //     progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
            // } else if (currentScroll > scrollEnd) {
            //     progress = 1;
            // }

            console.log("scroling")
            // Interpolate the offset values
            console.log(window.scrollY)
            const progress =  window.scrollY / document.body.scrollHeight;
            console.log(progress)
            const randomFactor = Math.random() * 5;
            const offset = 10 + (10 * progress);
            const distance = 10 * Math.sin(progress * Math.PI);
            const x = distance * Math.cos(progress * 2 * Math.PI);
            const y = distance * Math.sin(progress * 2 * Math.PI);

            turbulenceRef.current?.setAttribute('baseFrequency', String(0.001 + progress * 0.01));

            setRedOffset(offset + x); // from -5 to 5
            setGreenOffset(offset - x); // from -5 to 5
            setBlueOffset(offset + y); // from -5 to 5
            setRedYOffset(0 + (10 * progress)); // from 0 to 10
            setGreenYOffset(0); // stays at 0
            setBlueYOffset(0 - y); // from 0 to -10
        };

        window.document?.addEventListener('scroll', handleScroll);
        handleScroll(new Event('scroll')); // Initial call

        return () => {
            window.document?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={containerRef} className="w-screen min-h-[400vh] bg-black ">
            <div className='w-screen min-h-screen  relative flex items-center justify-center'>
                <h1>Scroll Down</h1>
            </div>
            <div ref={imageSectionRef} className=' sticky top-0 z-[99] w-screen h-screen flex items-center justify-center'>
                <div className='w-[400px]  h-[400px] rounded-full overflow-hidden '>
                    <img
                        src="/images/saidFatahImage.jpeg"
                        className="image-filtered"
                    />
                </div>
            </div>
            <div className='w-screen min-h-screen  relative flex items-center justify-center'>
                <h1>Scroll Down</h1>
            </div>
            <div className='w-screen min-h-screen  relative flex items-center justify-center'>
                <h1>Scroll Down</h1>
            </div>
            <div className='w-screen min-h-screen  relative flex items-center justify-center'>
                <h1>Scroll Down</h1>
            </div>
            <div className='w-screen min-h-screen  relative flex items-center justify-center'>
                <h1>Scroll Down</h1>
            </div>
            <div className='w-screen min-h-screen  relative flex items-center justify-center'>
                <h1>Scroll Down</h1>
            </div>
            <div className='w-screen min-h-screen  relative flex items-center justify-center'>
                <h1>Scroll Down</h1>
            </div>
            <svg>
                <filter id="rgb-shift">
                    <feComponentTransfer in="SourceGraphic" result="red">
                        <feFuncR type="identity" />
                        <feFuncG type="discrete" tableValues="0" />
                        <feFuncB type="discrete" tableValues="0" />
                        <feFuncA type="discrete" tableValues="1" />
                    </feComponentTransfer>

                    <feComponentTransfer in="SourceGraphic" result="green">
                        <feFuncR type="discrete" tableValues="0" />
                        <feFuncG type="identity" />
                        <feFuncB type="discrete" tableValues="0" />
                        <feFuncA type="discrete" tableValues="1" />
                    </feComponentTransfer>

                    <feComponentTransfer in="SourceGraphic" result="blue">
                        <feFuncR type="discrete" tableValues="0" />
                        <feFuncG type="discrete" tableValues="0" />
                        <feFuncB type="identity" />
                        <feFuncA type="discrete" tableValues="1" />
                    </feComponentTransfer>

                    <feOffset in="red" result='red-offset' dx={redOffset} dy={redYOffset} />
                    <feOffset in="green" result='green-offset' dx={greenOffset} dy={greenYOffset} />
                    <feOffset in="blue" result='blue-offset' dx={blueOffset} dy={blueYOffset} />

                    <feComposite
                        in="red-offset"
                        in2="green-offset"
                        result='red-n-green'
                        operator="arithmetic"
                        k1="0"
                        k2="1"
                        k3="1"
                        k4="0"
                    />

                    <feComposite
                        in="red-n-green"
                        in2="blue-offset"
                        result="rgb-shifted"
                        operator="arithmetic"
                        k1="0"
                        k2="1"
                        k3="1"
                        k4="0"
                    />
                    <feTurbulence
                        ref={turbulenceRef}
                        type="turbulence"
                        baseFrequency="0.01"
                        numOctaves="1"
                        seed="1"
                        result="turbulence"
                    />

                    <feComposite
                        in="red-offset"
                        in2="turbulence"
                        result="red-n-green"
                        operator="arithmetic"
                        k1="0"
                        k2="1"
                        k3="1"
                        k4="0"
                    />

                    <feComposite
                        in="blue-offset"
                        in2="turbulence"
                        result="red-n-green-n-blue"
                        operator="arithmetic"
                        k1="0"
                        k2="1"
                        k3="1"
                        k4="0"
                    />

                    <feComposite
                        in="turbulence"
                        in2="turbulence"
                        result="final-rgb"
                        operator="arithmetic"
                        k1="0"
                        k2="1"
                        k3="1"
                        k4="0"
                    />

                    <feComposite
                        in="final-rgb"
                        in2="rgb-shifted"
                        operator="over"
                        result="final-rgb-shifted"
                    />

                    
                </filter>
            </svg>
        </div>
    );
}

export default SvgFilters;