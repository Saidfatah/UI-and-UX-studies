'use client'
import { useRef } from "react";
import { onTapScale, onTapVideoThumbnailRowScale, videoThumbnailRow_back_to_1, videoThumbnailRow_scale_shrink_delay } from "../constants";
import LikeButton from "../likeButton/LikeButton";
import Thumbnail from "../thumbnail/Thumbnail";
import TitleDescription from "../titleDescription/TitleDescription";

import "./video.thumbnail.style.css"

type ImperativeType = {
    whileTapAnimation: () => void,
    endTapAnimation: () => void,
}

function VideoThumbnailRow() {
    const titleDescriptionRef = useRef<ImperativeType>();
    const thumbnailRef = useRef<ImperativeType>();
    const thumbnailRowRef = useRef<HTMLDivElement>();
    const gradientRef = useRef<HTMLDivElement>();

    const onLikeButtonMouseDown = () => {
        // Call functions from TitleDescription and Thumbnail
        if (titleDescriptionRef.current) {
            titleDescriptionRef.current.whileTapAnimation();
        }
        if (thumbnailRef.current) {
            thumbnailRef.current.whileTapAnimation();
        }

        if (thumbnailRowRef.current)
            thumbnailRowRef.current.style.scale = onTapVideoThumbnailRowScale

        if (gradientRef.current)
            gradientRef.current.style.opacity = "1"
    };


    const onLikeButtonMouseUp = () => {
        // Call functions from TitleDescription and Thumbnail
        if (titleDescriptionRef.current) {
            titleDescriptionRef.current.endTapAnimation();
        }
        if (thumbnailRef.current) {
            thumbnailRef.current.endTapAnimation();
        }


        if (thumbnailRowRef.current)
            thumbnailRowRef.current.style.scale = "1"

        if (gradientRef.current)
            gradientRef.current.style.opacity = "0"

    };

    return (
        <div ref={thumbnailRowRef as any} className="videoThumbnailRow">
            <Thumbnail ref={thumbnailRef} />
            <TitleDescription ref={titleDescriptionRef} />
            <LikeButton onMouseDown={onLikeButtonMouseDown} onMouseUp={onLikeButtonMouseUp} />
            <div ref={gradientRef as any} className="gradientCorner" />
        </div>
    );
}


export default VideoThumbnailRow;