import { useEffect, useRef } from "react";
import clsx from "clsx";

const FraudDetectedSourceCard = ({ animateLoader }: { animateLoader: boolean }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        if (animateLoader) {
            const animation = svgRef.current.animate(
                [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
                { duration: 2000, iterations: Infinity ,fill:"forwards", easing: "linear" }
            );
            return () => animation.cancel();
        }
    }, [animateLoader]);

    return (
        <div className={clsx(
            "relative flex w-fit  items-center gap-3.5 rounded-md bg-[#2f3037] p-3 ring-[0.25rem] ring-[#13131680]",
            "after:content-[''] after:absolute after:inset-0 after:w-full after:h-full after:rounded-md",
            "after:bg-gradient-to-br after:opacity-20  after:from-[#ffffff5f] after:to-transparent"
        )}>
            <div>
                <svg ref={svgRef} viewBox="0 0 16 16" fill="none" className="size-4">
                    <path
                        stroke="url(#paint0_radial_27_5200)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.25"
                        d="M8 1.75v1.042m0 10.416v1.042m3.125-11.663-.521.902m-5.208 9.022-.521.902m8.537-8.538-.902.52m-9.02 5.21-.903.52M14.25 8h-1.042M2.792 8H1.75m11.662 3.125-.902-.52m-9.02-5.21-.903-.52m8.538 8.538-.52-.902m-5.21-9.022-.52-.902"
                    />
                    <defs>
                        <radialGradient id="paint0_radial_27_5200" cx="0" cy="0" r="1" gradientTransform="rotate(102.529 4.047 5.711) scale(11.5244)" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#fff"></stop>
                            <stop offset="1" stopColor="#fff" stopOpacity=".2"></stop>
                        </radialGradient>
                    </defs>
                </svg>
            </div>
            <div className="font-mono text-[.6875rem] text-gray-500 transition duration-500 group-hover:text-white">
                Fraudulent sign-ups detected
            </div>
            <div className="ml-auto text-[.625rem] text-gray-600">14:09</div>
        </div>
    );
};

export default FraudDetectedSourceCard;
