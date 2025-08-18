import { useEffect, useRef } from "react";

export type SubmitButtonStates = "default" | "valid" | "success" | "sending" | "error"


type Props = {
    state: SubmitButtonStates,
}
const SubmitButton = ({ state }: Props) => {
    const loaderRef = useRef<SVGCircleElement>(null);
    const animationRef = useRef<Animation | null>(null); // keep track of animation

    useEffect(() => {
        if (!loaderRef.current) return;
    
        if (state === "sending") {
          // start animation
          animationRef.current = loaderRef.current.animate(
            [
              { transform: "rotate(0deg)" },
              { transform: "rotate(360deg)" },
            ],
            {
              duration: 1000,
              iterations: Infinity,
            }
          );
        } else {
          // stop animation
          animationRef.current?.cancel();
          animationRef.current = null;
        }
      }, [state]);
    

    return (
        <button type="submit" className="email-button">
            <div className={state}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11.25" className="--circle-bg"></circle>

                    <path
                        d="M7.75 12H16.25M16.25 12L13 15.25M16.25 12L13 8.75"
                        stroke="#868F97"
                        className="--send"
                    >

                    </path>

                    <circle
                        ref={loaderRef}
                        cx="12"
                        cy="12"
                        r="11.25"
                        className="--progress"
                    ></circle>

                    <path
                        d="M8 13L10.5 15.5L15.5 8.5"
                        stroke="#4EBE96"
                        className="--sent"
                    ></path> 
                    {/* <path d="M7.75 12L16.25 12" stroke="#D84F68" className="--error"></path> fail sign */}
                </svg>
            </div>
        </button>
    )
}


export default SubmitButton;

