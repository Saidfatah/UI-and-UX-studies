import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function TarteAuCitronToast() {
    const toastBgRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!toastBgRef.current) return;

        const handleAppear = () => {

            const timeline = gsap.timeline({
                delay: 2,
            });


            timeline.to(toastBgRef.current, {
                autoAlpha: 1,
                display: "flex",
                ease: "power2.out",
                duration: 0.3,
            });


        };

        window.addEventListener("covertitle:appear", handleAppear);

        return () => {
            window.removeEventListener("covertitle:appear", handleAppear);
        };
    }, [toastBgRef]);


 

    return (
        <div id="tarteaucitronRoot" className="tarteaucitronBeforeVisible">
            <div
                ref={toastBgRef}
                tabIndex={-1}
                id="tarteaucitronAlertBig"
                className="tarteaucitronAlertBigBottom"
            >
                <span id="tarteaucitronDisclaimerAlert">This site uses cookies.</span>
                <button type="button" className="tarteaucitronCTAButton tarteaucitronAllow" id="tarteaucitronPersonalize2">
                    <span className="tarteaucitronCheck"></span> Accept
                </button>
                <button type="button" id="tarteaucitronCloseAlert" aria-label="Preferences (modal window)" title="Preferences (modal window)">
                    Preferences
                </button>
            </div>
        </div>
    );
}

export default TarteAuCitronToast;