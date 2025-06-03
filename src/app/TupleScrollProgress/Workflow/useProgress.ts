import { RefObject, useEffect, useRef } from "react";

function useProgress({ parentRef,onProgress}: { parentRef: RefObject<HTMLDivElement>,onProgress:(progress:number)=>void }) {

    useEffect(() => {

        const onScroll = () => {
            if (!parentRef.current) return

            const parentTop = parentRef.current.offsetTop ?? 0
            const progress = window.scrollY - (parentTop ) + window.innerHeight / 2
            onProgress(progress)
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [parentRef,onProgress]);


}

export default useProgress;