
import "./style.css";

function MagicBallWithSvgFilters() {
    return (<div className="w-screen h-screen flex justify-center items-center">

        <div className="relative w-[200px] h-[200px] overflow-hidden rounded-full">

            <svg
                aria-hidden="true"
                className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] "
            >
                <filter
                    id="_trubulence_effect_"
                    colorInterpolationFilters="sRGB"
                >
                    <feTurbulence
                        baseFrequency="0.001"
                        numOctaves="12"
                        seed="10"
                        
                    >
                        <animate
                            attributeName="baseFrequency"
                            from="0.001"
                            to="0.009"
                            dur="10s"
                            repeatCount="indefinite"
                        />
                    </feTurbulence>

                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="50"
                    />

                </filter>

                <image
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAuElEQVR42gXBvW7CMBQG0PvdGztxXaFkqNq5S5+xa8dKHcpLwAALIyMSEuJFkBB/coCI2LnmHIT5CkOrpHs7Giqn1r5KbpziulxnoZvSEVVR2U6sMpcx4r7ZJut6MTeSnphSdPdWYkSYzFAK+yozDzFR/xCj8lbj/PtPRYI37AUvxI2Tj3f2NU4/32TAI4PacONQ+tyxhh3C9E8PB4LCO+IiXyPZc/EJtIsxadZwoUdHnOCT+fJcmyddTEwcOhaLVQAAAABJRU5ErkJggg=="
                    style={{ filter: 'url("#_trubulence_effect_")' }}
                />
            </svg>

            <div className="noise" />
        </div>


    </div>);
}

export default MagicBallWithSvgFilters;