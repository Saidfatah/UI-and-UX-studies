import { useEffect, useRef } from "react";

function Rulers() {
    const horizontalLineRef = useRef<HTMLDivElement>(null);
    const verticalLineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // listen to mouse move and set blru lien top to mouse clientY
        const handleMouseMove = (event: MouseEvent) => {
            if (horizontalLineRef.current) {
                horizontalLineRef.current.style.top = `${event.clientY}px`;
            }
            if (verticalLineRef.current) {
                verticalLineRef.current.style.left = `${event.clientX}px`;
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (<>
        <div ref={horizontalLineRef} className='top-0 left-0 w-screen h-[1px] bg-[#050505] absolute z-[-1]'></div>
        <div ref={verticalLineRef} className='top-0 left-0 w-[1px] h-screen bg-[#050505] absolute z-[-1]'></div>
    </>
    );
}

export default Rulers;