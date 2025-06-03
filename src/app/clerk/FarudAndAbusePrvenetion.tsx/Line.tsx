import React, { useEffect, useRef } from 'react';

interface FraudDetectionFlowLineProps {
    showMovingDash: boolean;
}

const FraudDetectionFlowLine = ({ showMovingDash }: FraudDetectionFlowLineProps) => {
    const pathRef = useRef<SVGPathElement>(null);


    return (
        <svg viewBox="0 0 39 393" fill="none" className="absolute inset-0 size-full stroke-white/5">
            {/* Gradient Definition */}
            <defs>
                <linearGradient id="gradientStroke" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255, 0, 0, 0)" />   {/* Transparent */}
                    <stop offset="20%" stopColor="red" />                {/* Red at the center */}
                    <stop offset="100%" stopColor="rgba(255, 0, 0, 0)" /> {/* Transparent */}
                </linearGradient>
            </defs>

            {/* Static Background Path */}
            <path d="M2 0V34.6863C2 36.808 2.84285 38.8429 4.34315 40.3431L34.6569 70.6569C36.1571 72.1571 37 74.192 37 76.3137V393" />

            {/* Conditionally Render Animated Path with Gradient Stroke */}
            {showMovingDash && (
                <path
                    className='dashAnimation'
                    stroke="url(#gradientStroke)" // Apply gradient
                    strokeWidth={1}
                    strokeLinecap="round"
                    d="M2 0V34.6863C2 36.808 2.84285 38.8429 4.34315 40.3431L34.6569 70.6569C36.1571 72.1571 37 74.192 37 76.3137V393"
                    strokeDasharray="40 353"  // Dash length of 40, gap of 393 - 40 = 353 (so only one dash appears)
                    strokeDashoffset="393"  // Initial offset
                />
            )}
        </svg>
    );
};

export default FraudDetectionFlowLine;
