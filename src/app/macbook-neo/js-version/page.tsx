"use client"
import React from 'react'
import './style.css'


const slides = [
    {
        id: 1,
        title: "Silver, Blush, Citrus, and Indigo. Four stunning colors. One durable design.",
        imageUrl: "/images/macbook-neo/highlights_colors_endframe__c5rr2wp9mp0m_large_2x.jpg",
        captionWidth: [
            "555px", // desktop
            "390px" // mobile
        ],
        sizes: [
            { // desktop
                width: 934,
                height: 628
            },
            { // mobile
                width: 400,
                height: 480
            },
        ]
    },
    {
        id: 2,
        title: "Fast for all your everyday tasks. And up to 16 hours of battery life to go, go, go.1",
        imageUrl: "/images/macbook-neo/highlights_battery__fu65vu9o4te2_large_2x.jpg",
        captionWidth: [
            "555px", // desktop
            "320px" // mobile
        ],
        sizes: [
            { // desktop
                width: 934,
                height: 628
            },
            { // mobile
                width: 400,
                height: 480
            },
        ]
    },
    {
        id: 3,
        title: "13-inch Liquid Retina display.2 Exceptionally vibrant and bright. One billion colors. Open up and say wow.",
        imageUrl: "/images/macbook-neo/highlights_display_endframe__c0qk6ggqxdw2_large_2x.jpg",
        captionWidth: [
            "555px", // desktop
            "320px" // mobile
        ],
        sizes: [
            { // desktop
                width: 934,
                height: 628
            },
            { // mobile
                width: 400,
                height: 480
            },
        ]
    },
    {
        id: 4,
        title: "A powerful platform for AI. With Apple Intelligence built right in.3 Smarter than smart.",
        imageUrl: "/images/macbook-neo/highlights_ai__cfrukhyww2nm_large_2x.jpg",
        captionWidth: [
            "555px", // desktop
            "320px" // mobile
        ],
        sizes: [
            { // desktop
                width: 934,
                height: 628
            },
            { // mobile
                width: 400,
                height: 480
            },
        ]
    },
    {
        id: 5,
        title: "macOS. Easy to use. Runs all your go-to apps. Puts the fun in functional.",
        imageUrl: "/images/macbook-neo/highlights_mac_iphone__b5emh4vjjnyq_large_2x.jpg",
        captionWidth: [
            "555px", // desktop
            "320px" // mobile
        ],
        sizes: [
            { // desktop
                width: 934,
                height: 628
            },
            { // mobile
                width: 400,
                height: 480
            },
        ]
    },
]



//Todo: convert pictureWidth and pictureHeight to --p-width and --p-height
function MacbookNeo() {
    const slidesOffsets = React.useRef<number[]>([]);
    const slideEls = React.useRef<HTMLLIElement[]>([]);
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const galleryScrollRef = React.useRef<HTMLDivElement>(null);
    const scrollEndTimer = React.useRef<number | null>(null);

    React.useLayoutEffect(() => {
        const scrollContainer = galleryScrollRef.current;
        if (!scrollContainer) return;

        const containerWidth = scrollContainer.clientWidth;
        const maxScroll = scrollContainer.scrollWidth - containerWidth;
        const snapPositions: number[] = [];

        slideEls.current.forEach((el) => {
            if (!el) return;
            
            // The scrollLeft value when this slide is centered (scroll-snap-align: center)
            const snapPos = el.offsetLeft + el.offsetWidth / 2 - containerWidth / 2;

            
            // make sure min is 0, max is maxScroll
            const clip = Math.max(0, Math.min(snapPos, maxScroll))

            snapPositions.push(clip);
        });

        console.log(snapPositions)
        slidesOffsets.current = snapPositions;
    }, [slides]);

    return (<div ref={scrollContainerRef} className='w-screen h-screen flex items-center'>


        <div className='w-full media-gallery-wrapper'>
            <div
                onScroll={(e) => {
                    const offsets = slidesOffsets.current;
                    if (!offsets || offsets.length < 2) return;

                    const scrollLeft = (e.target as HTMLDivElement).scrollLeft;

                    // Piecewise linear interpolation between snap positions
                    let progress = 0;
                    if (scrollLeft <= offsets[0]) {
                        progress = 0;
                    } else if (scrollLeft >= offsets[offsets.length - 1]) {
                        progress = offsets.length - 1;
                    } else {
                        for (let i = 0; i < offsets.length - 1; i++) {
                            if (scrollLeft <= offsets[i + 1]) {
                                progress = i + (scrollLeft - offsets[i]) / (offsets[i + 1] - offsets[i]);
                                break;
                            }
                        }
                    }

                    progress = parseFloat(progress.toFixed(3));

                    // Raw float while scrolling
                    scrollContainerRef.current?.style.setProperty('--auto-play-progress', progress.toString());
                    
                    // Snap to nearest integer once scrolling stops
                    if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
                    scrollEndTimer.current = window.setTimeout(() => {
                        const snapped = Math.round(progress);
                        scrollContainerRef.current?.style.setProperty('--auto-play-progress', snapped.toString());
                    }, 50);
                }}
                ref={galleryScrollRef}
                className='w-full scroll-container media-gallery' >
                <ul className='media-card-set'>
                    {slides.map((slide, index) => (
                        <li
                            ref={(el) => {
                                if (el) slideEls.current[index] = el;
                            }}
                            className='gallery-item'
                            key={slide.id}
                            id={`media-card-gallery-item-${index + 1}`}
                        >
                            <div className='card'>
                                <div className='media-container'
                                    style={{
                                        '--p-width-desktop': slide.sizes[0].width,
                                        '--p-height-desktop': slide.sizes[0].height,
                                        '--p-width-mobile': slide.sizes[1].width,
                                        '--p-height-mobile': slide.sizes[1].height,

                                    } as React.CSSProperties}
                                >
                                    <img src={slide.imageUrl} alt={slide.title} />
                                </div>

                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>


        <ul role="tablist" aria-label="MacBook Neo highlights" className='dot-nav-container'>
            {slides.map((slide, index) => (
                <li role="presentation" className='dot-nav-item' key={index} style={{ '--item-index': index } as React.CSSProperties}>
                    <a
                        role="tab"
                        className='dot-nav-link'
                        href={`#media-card-gallery-item-${index + 1}`}
                        aria-controls={`media-card-gallery-item-${index + 1}`}
                        tabIndex={index === 0 ? 0 : -1}
                        onClick={(e) => {
                            e.preventDefault();
                            galleryScrollRef.current?.scrollTo({
                                left: slidesOffsets.current[index],
                                behavior: 'smooth'
                            });
                        }}
                    >
                        <span className='visually-hidden'>{slide.title}</span>
                    </a>
                </li>
            ))}
        </ul>
    </div>);
}

export default MacbookNeo;