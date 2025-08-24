'use client';
import "./chriskalfatis.style.css"
import CircleComponent from "./Circle";
import Cursor from "./Cursor";
import RollingWord from "./RollingWord";
import MagnetComponent from "./MagnetComponent";



function ChrisKalafatis() {
    return (<div className=" select-none w-screen h-screen bg-black flex flex-col items-start justify-center p-[32px]">
        <Cursor />

        <div className="w-full flex items-center justify-center gap-[16px]">
            <RollingWord word="PROJECTS" />
            <RollingWord word="ABOUT" />
        </div>

        <div className="w-full h-full flex-grow flex items-center justify-center">


            <div className="grid-center">
                <div className="centered-grid-child">
                    <MagnetComponent radius={50} triggerRange={150} strength={0.7}>
                        <CircleComponent radius={50} />
                    </MagnetComponent>
                </div>
                <div className=" relative z-10 centered-grid-child">
                    <MagnetComponent
                        customRenderer={(children, isActive) => {
                            if (isActive) {
                                return (
                                    <svg
                                        className="w-[30px] slide-to-down h-[30px]"
                                        width="3rem"
                                        height="3rem"
                                        viewBox="0 0 26 27"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.2338 12.28L14.7538 20.8V0.239998H11.3538V20.76L2.87375 12.28L0.59375 14.56L13.0738 27L25.5138 14.56L23.2338 12.28Z" fill="white"></path>
                                    </svg>
                                )
                            }
                            return (
                                <div className="w-[100%] h-[100%] flex flex-col items-center justify-center">
                                    <p className="circle-text slide-to-left translate-x-0 leading-[0.7rem]" >LEARN</p>
                                    <p className="circle-text slide-to-right translate-x-0 leading-[0.7rem]" >MORE</p>
                                </div>
                            )
                        }}
                        radius={50}
                        triggerRange={150}
                        scale={1}
                        exitTransitionDuration={0.6}
                        strength={0.3}
                    >

                    </MagnetComponent>

                </div>
                <div className="centered-grid-child">
                    <MagnetComponent radius={50} triggerRange={150} strength={0.4}>
                        <CircleComponent radius={50} />
                    </MagnetComponent>
                </div>
            </div>

        </div>

    </div>);
}

export default ChrisKalafatis;