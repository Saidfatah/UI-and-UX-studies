import { forwardRef, useImperativeHandle, useRef } from "react";
import { left_side_back_to_1_delay, left_side_shrink_delay, onTapScale } from "../constants";
import "./titleDescription.style.css"

const TitleDescription = forwardRef((props, ref) => {
    const containerRef = useRef<HTMLDivElement>()

    useImperativeHandle(ref, () => ({
        whileTapAnimation() {
            if (containerRef.current)
                containerRef.current.style.scale = `${onTapScale - 0.1}`

        },
        endTapAnimation() {
            if (containerRef.current)
                containerRef.current.style.scale = "1"
        }
    }));

    return (
        <div ref={containerRef as any} className="videoTitleAndInfoContainer">
            <p>My video</p>
            <p>Video description</p>
        </div>
    );
});
export default TitleDescription;