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



function MacbookNeo() {
    return (<div className='w-screen h-screen flex items-center gallery-page-wrapper'>


        <div className='w-full media-gallery-wrapper'>
            <div
                className='w-full scroll-container media-gallery' >
                <ul className='media-card-set'>
                    {slides.map((slide, index) => (
                        <li
                            className='gallery-item'
                            key={slide.id}
                            id={`media-card-gallery-item-${index + 1}`}
                                style={{

                                        '--slide-index': index,

                                    } as React.CSSProperties}
                        >
                            <div className='card'>
                                <div className='caption-container'>
                                    <div className='caption-animation-container'
                                        style={{
                                            '--caption-width-desktop': slide.captionWidth[0],
                                            '--caption-width-mobile': slide.captionWidth[1],
                                        } as React.CSSProperties}
                                    >
                                        <p className='typography-media-card-gallery-headline'>{slide.title}</p>
                                    </div>
                                </div>
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
                            const target = document.getElementById(`media-card-gallery-item-${index + 1}`);
                            target?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
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