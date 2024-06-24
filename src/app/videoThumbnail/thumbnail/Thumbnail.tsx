import { forwardRef, useImperativeHandle, useRef } from 'react';
import { left_side_back_to_1_delay, left_side_shrink_delay, onTapScale } from '../constants';
import './thumbnail.css'

const PlayIcon = () => {
    return (
        <svg
            className="drop-shadow-xl"
            width="36"
            height="36"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M36 69C54.2254 69 69 54.2254 69 36C69 17.7746 54.2254 3 36 3C17.7746 3 3 17.7746 3 36C3 54.2254 17.7746 69 36 69ZM52.1716 38.6337L28.4366 51.5801C26.4374 52.6705 24 51.2235 24 48.9464V23.0536C24 20.7764 26.4374 19.3295 28.4366 20.4199L52.1716 33.3663C54.2562 34.5034 54.2562 37.4966 52.1716 38.6337Z"
                fill="currentColor">
            </path>
        </svg>
    )
}


const Thumbnail = forwardRef((props, ref) => {
    const containerRef = useRef<HTMLDivElement>()

    useImperativeHandle(ref, () => ({
        whileTapAnimation() {
                if (containerRef.current)
                    containerRef.current.style.scale = `${onTapScale}`

        },
        endTapAnimation() {
                if (containerRef.current)
                    containerRef.current.style.scale = "1"
        }
    }));

    return (
        <div ref={containerRef as any} className="videoThumbnailContainer">
            <div
                className='playIconContainer'
            >
                <PlayIcon />
            </div>
        </div>
    );
});

export default Thumbnail