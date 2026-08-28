
import { useEffect, useState } from "react";
import HomeCoverTitle from "./HomeCoverTitle";

function HomeCoverSection() {
    const [showHomeTitle, setshowHomeTitle] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setshowHomeTitle(true);
        }, 2000);
    }, []);

    return (<section className="home-cover relative w-full h-screen pb-15 text-white overflow-hidden">
        <div className="home-cover-background absolute-full"
            style={{ translate: "none", rotate: "none", scale: "none", transform: "translate(0px, 0px)" }}>
            <video
                src="/videos/prorotype_showreel_loop.mp4"
                className="home-cover-video w-full h-full object-cover"
                loop
                autoPlay
                muted
                playsInline
            />
            <div className="absolute-full bg-black/30"></div>
        </div>
        <div className="relative grid-w content-end h-full z-1">
            <div className="col-span-full flex justify-center mb-10">
                {showHomeTitle && <HomeCoverTitle />}
            </div>
            <div className="home-cover-line col-span-full h-px bg-white/20 origin-center" />
            <div className="col-span-full flex justify-center mt-15">
                <div className="home-cover-scroll body-16 md:body-20 italic font-heading cursor-pointer" >
                    <span className="char" aria-hidden="true" >S</span>
                    <span className="char" aria-hidden="true" >c</span>
                    <span className="char" aria-hidden="true" >r</span>
                    <span className="char" aria-hidden="true" >o</span>
                    <span className="char" aria-hidden="true" >l</span>
                    <span className="char" aria-hidden="true" >l</span>
                </div>
            </div>
        </div>



    </section>);
}

export default HomeCoverSection;