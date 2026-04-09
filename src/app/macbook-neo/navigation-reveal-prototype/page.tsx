"use client"
import '../styles/style.css'
import '../styles/navigation.style.css'
import { slides } from "../constants";
import SlidesNavigation from '../components/SlidesNavigation';
import { useState } from 'react';

function NavigationRevealPrototype() {
    const [replay, setReplay] = useState(true);

    return (
        <div>
            {/* <div className="w-screen min-h-screen flex items-center justify-center bg-white-300">

            </div> */}


            <div
                style={{
                    '--auto-play-progress': 0,
                } as React.CSSProperties}
                className="relative w-screen min-h-screen flex items-center justify-center"
            >
                <div className=' bg-gradient-to-t from-[#ce95b0] to-[#7542c8] w-full h-full flex flex-col overflow-hidden justify-center items-center  absolute top-0 left-0'>
                    <button
                        className='player-btn absolute top-[48px]'
                        onClick={() => {
                            setReplay(false)
                            setTimeout(() => {
                                setReplay(true)
                            }, 100)
                        }}
                        aria-label="Toggle controls"

                    >
                        <div className='player-btn-inner-content'>
                            <div className='player-icon-stack'>

                                <svg
                                    className='player-icon'
                                    fill="currentColor"
                                    width="56"
                                    height="56"
                                    viewBox="0 0 56 56"
                                    data-visible={true}
                                >
                                    <path
                                        d="M36.2449 26.9629C35.1376 26.9629 34.2397 27.8607 34.2397 28.9681C34.2397 32.4086 31.4405 35.2078 28 35.2078C24.5595 35.2078 21.7603 32.4086 21.7603 28.9681C21.7603 25.5276 24.5595 22.7284 28 22.7284C28.0283 22.7284 28.0546 22.7212 28.0825 22.7201L26.7986 24.0042C26.0153 24.787 26.0153 26.0568 26.7986 26.8396C27.1897 27.2312 27.7033 27.427 28.2163 27.427C28.7293 27.427 29.2429 27.2312 29.634 26.8396L34.0746 22.399C34.8579 21.6162 34.8579 20.3464 34.0746 19.5636L29.4176 14.9066C28.6353 14.1233 27.3645 14.1233 26.5822 14.9066C25.7989 15.6894 25.7989 16.9592 26.5822 17.742L27.5795 18.7394C22.1234 18.9624 17.75 23.4583 17.75 28.9681C17.75 34.6198 22.3483 39.2181 28 39.2181C33.6517 39.2181 38.25 34.6198 38.25 28.9681C38.25 27.8608 37.3523 26.9629 36.2449 26.9629Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                        </div>
                    </button>
                    {
                        replay && (<SlidesNavigation
                            slides={slides}
                            activeIndex={0}
                            handlePlayerClick={() => {
                                console.log("play/pause")
                            }}
                            playerState="playing"
                            handleClickOnSlide={() => {
                                console.log("clocl")
                            }}
                        />
                        )
                    }

                </div>

            </div>

            <div className="w-screen min-h-screen flex items-center justify-center"></div>
        </div>
    );
}

export default NavigationRevealPrototype;