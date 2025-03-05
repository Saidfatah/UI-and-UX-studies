import RotateInChar from "./RotateCharIn";

function ToggledPhrases({ position }: { position: "right" | "initial" }) {
    return (<div className=" grid place-items-center"  >
        <p className=" tracking-wide phrase-grid-area" >{
            "Access the full power of DeFi."
                .split('')
                .map((char, charIndex, arr) => (
                    <>
                        {char === " " && <span> </span>}
                        {char !== " " && <RotateInChar
                            index={charIndex}
                            totalLength={arr.length}
                            fadeIn={position === "right"}>
                            {char}
                        </RotateInChar>}

                    </>
                ))
        }</p>
        <p className="tracking-widest phrase-grid-area" >{
            "Unleash the full potential."
                .split('')
                .map((char, charIndex, arr) => (
                    <>
                        {char === " " && <span> </span>}
                        {char !== " " && <RotateInChar
                            index={charIndex}
                            totalLength={arr.length}
                            fadeIn={position === "initial"}>
                            {char}
                        </RotateInChar>}
                    </>
                ))
        }</p>
    </div>);
}

export default ToggledPhrases;