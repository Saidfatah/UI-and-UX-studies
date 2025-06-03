// app/mouse-trail/page.jsx
'use client';
import './style.css'
import { useEffect, useRef } from 'react';

export default function MouseTrailPage() {
    const containerRef = useRef<any>(null);
    const colors = [
        '#0078ff',
        '#bd00ff',
        '#ff9a00',
        '#01ff1f',
        '#e3ff00',
    ];

    // Generate circle data
    const circles = Array.from({ length: 8 }, (_, i) => ({
        size: Math.random() * 60 + 20,
        color: colors[i % colors.length],
        delay: 0.05 * (i + 1),
    }));

    useEffect(() => {
        if (!containerRef.current) return;

        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const circleElements = containerRef.current?.querySelectorAll('.circle');
            if (!circleElements) return;

            circleElements.forEach((circle, index) => {
                setTimeout(() => {
                    const size = parseInt(circle.style.width);
                    circle.style.transform = `translate(${e.clientX - size / 2}px, ${e.clientY - size / 2}px)`;
                }, index * 20);
            });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-white relative overflow-hidden">
            {/* Circle elements */}
            {circles.map((circle, index) => (
                <div
                    key={index}
                    className="circle  absolute pointer-events-none z-10"
                    style={{
                        width: `${circle.size}px`,
                        height: `${circle.size}px`,
                        transition: `transform ${circle.delay}s ease`,
                    }}
                >
                    <div className='scaleAnimation  origin-center'
                        style={{
                            width: `${circle.size}px`,
                            height: `${circle.size}px`,
                            borderRadius: '50%',
                            backgroundColor: circle.color,
                            opacity: 0.4,
                            transition: `transform ${circle.delay}s ease`,
                        }}
                    />
                </div>

            ))}

            {/* Overlay with backdrop blur */}
            <div className="fixed inset-0 z-20 backdrop-blur-2xl bg-transparent pointer-events-none">
                <div className="flex items-center justify-center h-full">
                    <h1 className="text-white title text-4xl font-bold">
                        Move your mouse around!
                    </h1>
                </div>
            </div>
        </div>
    );
}