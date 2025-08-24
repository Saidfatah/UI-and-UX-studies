import { useRef, useEffect, useState } from 'react';

type MagnetComponentProps = {
    children?: React.ReactNode;
    triggerRange?: number;
    radius?: number;
    customRenderer?: (children: React.ReactNode, isActive: boolean) => React.ReactNode;
    stickRange?: number;
    strength?: number;
    scale?: number;
    exitTransitionDuration?: number;
    className?: string;
}
const MagnetComponent = ({
    children,
    triggerRange = 200,
    radius = 100,
    customRenderer,
    stickRange = 50,
    strength = 0.3,
    scale = 1,
    exitTransitionDuration = 0.5,
    className = ''
}: MagnetComponentProps) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);
    const restPositionRef = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;
    
        let mouseMoveTimer: NodeJS.Timeout | null = null;
        let isMouseMoving = false;
    
        // Store the initial rest position
        if (!restPositionRef.current) {
            const rect = element.getBoundingClientRect();
            restPositionRef.current = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
        }
    
        const handleMouseMove = (e: MouseEvent) => {
            if (!elementRef.current || !restPositionRef.current) return;
    
            // Clear existing timer and set mouse as moving
            if (mouseMoveTimer) {
                clearTimeout(mouseMoveTimer);
            }
            isMouseMoving = true;
    
            // Always calculate distance from the original rest position
            const centerX = restPositionRef.current.x;
            const centerY = restPositionRef.current.y;
    
            const mouseX = e.clientX;
            const mouseY = e.clientY;
    
            const deltaX = mouseX - centerX;
            const deltaY = mouseY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
            if (distance <= triggerRange) {
                setIsActive(true);
    
                let moveX, moveY;
                moveX = deltaX * strength;
                moveY = deltaY * strength;
    
                // Short smooth transition while following mouse
                elementRef.current.style.transition = `transform 0.1s ease-out`;
                elementRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
            } else {
                // Longer transition when returning to center
                elementRef.current.style.transition = `transform ${exitTransitionDuration}s cubic-bezier(0.25, 1, 0.5, 1)`;
                elementRef.current.style.transform = `translate(0px, 0px)`;
                setIsActive(false);
            }
    
            // Reset mouse moving detection
            mouseMoveTimer = setTimeout(() => {
                isMouseMoving = false;
            }, 50);
        };
    
        document.addEventListener('mousemove', handleMouseMove);
    
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (mouseMoveTimer) {
                clearTimeout(mouseMoveTimer);
            }
        };
    }, [triggerRange, radius, stickRange, strength, scale]);
    return (
        <div
            ref={elementRef}
            className={className}
            style={{
                transform: `translate(0px,0px)`,
            }}
        >
            {customRenderer ? customRenderer(children, isActive) : children}
        </div>
    );
};

export default MagnetComponent;