import { useRef } from 'react';

const CircleComponent = ({ radius = 11.25, className = '' }: { radius?: number; className?: string }) => {
  const loaderRef = useRef(null);
  
  // Calculate circumference for proper dash values
  const circumference = 2 * Math.PI * radius;
  
  const canvasSize = radius * 2 + 2;
  return (
    <svg width={canvasSize} height={canvasSize} viewBox={`0 0 ${canvasSize} ${canvasSize}`} className={className}>
      <circle
        ref={loaderRef}
        cx={radius + 1}
        cy={radius + 1}
        r={radius}
        fill="none"
        strokeWidth="1.5"
        className="progress-circle"

        style={{
          stroke: 'white',
          strokeDasharray: circumference,
          strokeDashoffset: circumference , // ~76% offset for initial state
          transformOrigin: 'center center',
          transition: 'all 0.3s linear',
          "--circumference": circumference,
        }}
      />
      
    </svg>
  );
};

export default CircleComponent;