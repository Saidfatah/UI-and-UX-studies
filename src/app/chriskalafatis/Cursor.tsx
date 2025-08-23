import { useEffect, useRef } from "react";

function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorTopRef = useRef<HTMLDivElement>(null);
    const cursorBottomRef = useRef<HTMLDivElement>(null);
    const cursorLeftRef = useRef<HTMLDivElement>(null);
    const cursorRightRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const cursor = cursorRef.current;
        window.addEventListener('mousemove', (e) => {
            if (!cursor) return;
            const width = cursor.offsetWidth;
            const height = cursor.offsetHeight;
            const x = e.clientX;
            const y = e.clientY;
            cursor.style.transform = `translate(${x}px, ${y}px)`;
        });

        window.addEventListener('mousedown', () => {
            if (!cursor) return;
            if (!cursorTopRef.current) return;
            if (!cursorBottomRef.current) return;
            if (!cursorLeftRef.current) return;
            if (!cursorRightRef.current) return;
            

            cursorTopRef.current.style.transform = `translate(-50%, 70%)`;
            cursorBottomRef.current.style.transform = `translate(-50%, -70%)`;
            cursorLeftRef.current.style.transform = `translate(70%, -50%)`;
            cursorRightRef.current.style.transform = `translate(-70%, -50%)`;
        });

        window.addEventListener('mouseup', () => {
            if (!cursor) return;
            if (!cursorTopRef.current) return;
            if (!cursorBottomRef.current) return;
            if (!cursorLeftRef.current) return;
            if (!cursorRightRef.current) return;
            

            cursorTopRef.current.style.transform = `translate(-50%, 0%)`;
            cursorBottomRef.current.style.transform = `translate(-50%, 0%)`;
            cursorLeftRef.current.style.transform = `translate(0%, -50%)`;
            cursorRightRef.current.style.transform = `translate(0%, -50%)`;
        });
        return () => {
            window.removeEventListener('mousemove', (e) => {
                if (!cursor) return;
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            });
        };
    }, []);


    return (
            <div ref={cursorRef} className="cursor" >
                <div ref={cursorTopRef} className="cursor_top" style={{ 
                    transform: `translate(-50%, 0%)` ,
                    transition: "transform 0.2s cubic-bezier(0.45, 0, 0.55, 1);"
                    }}></div>
                <div ref={cursorBottomRef} className="cursor_bottom" style={{ 
                    transform: `translate(-50%, 0%)` ,
                    transition: "transform 0.2s cubic-bezier(0.45, 0, 0.55, 1);"
                    }}></div>
                <div ref={cursorLeftRef} className="cursor_left" style={{ 
                    transform: `translate(0%, -50%)` ,
                    transition: "transform 0.2s cubic-bezier(0.45, 0, 0.55, 1);"
                    }}></div>
                <div ref={cursorRightRef} className="cursor_right" style={{ 
                    transform: `translate(0%, -50%)` ,
                    transition: "transform 0.2s cubic-bezier(0.45, 0, 0.55, 1);"
                    }}></div>
            </div>
    );
}

export default Cursor;