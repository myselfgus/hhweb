import React, { useEffect, useRef } from 'react';

interface RadarDimensionalProps {
  dimensions: {
    name: string;
    value: number;
    color: string;
  }[];
  size?: number;
  animated?: boolean;
}

export default function RadarDimensional({ 
  dimensions = [], 
  size = 300, 
  animated = true 
}: RadarDimensionalProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<number | null>(null);
  const currentStepRef = useRef(0);
  const targetValuesRef = useRef<number[]>([]);
  const currentValuesRef = useRef<number[]>(Array(dimensions.length).fill(0));

  const center = size / 2;
  const radius = size * 0.4;
  const totalDimensions = dimensions.length || 10;
  const angleStep = (Math.PI * 2) / totalDimensions;

  // Calculate point coordinates based on value and angle
  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2; // Start from top
    const x = center + (radius * value / 100) * Math.cos(angle);
    const y = center + (radius * value / 100) * Math.sin(angle);
    return { x, y };
  };

  // Get polygon points string from values
  const getPolygonPoints = (values: number[]) => {
    return values.map((value, index) => {
      const { x, y } = getCoordinates(value, index);
      return `${x},${y}`;
    }).join(' ');
  };

  // Animation function
  const animate = () => {
    if (!animated) return;
    
    const totalSteps = 60;
    
    if (currentStepRef.current >= totalSteps) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }
    
    currentStepRef.current += 1;
    const progress = Math.min(currentStepRef.current / totalSteps, 1);
    
    // Ease in-out function for smoother animation
    const easeInOut = (t: number) => {
      return t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    
    const easedProgress = easeInOut(progress);
    
    // Update current values based on progress
    currentValuesRef.current = targetValuesRef.current.map(
      (target, i) => target * easedProgress
    );
    
    // Update the polygon
    if (svgRef.current) {
      const polygon = svgRef.current.querySelector('.radar-polygon');
      if (polygon) {
        polygon.setAttribute('points', getPolygonPoints(currentValuesRef.current));
      }
    }
    
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Set target values
    targetValuesRef.current = dimensions.map(d => d.value);
    
    // Reset animation
    currentStepRef.current = 0;
    currentValuesRef.current = Array(dimensions.length).fill(0);
    
    // Start animation
    if (animated && !animationRef.current) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (!animated && svgRef.current) {
      // If not animated, just set final values
      const polygon = svgRef.current.querySelector('.radar-polygon');
      if (polygon) {
        polygon.setAttribute('points', getPolygonPoints(targetValuesRef.current));
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [dimensions, animated]);

  // Generate circular grid lines
  const gridCircles = [25, 50, 75, 100].map((percent, i) => (
    <circle 
      key={`grid-circle-${i}`}
      cx={center}
      cy={center}
      r={radius * percent / 100}
      fill="none"
      stroke="#ddd"
      strokeWidth="1"
      strokeDasharray={i === 3 ? "none" : "2,2"}
    />
  ));

  // Generate axis lines
  const axisLines = Array(totalDimensions).fill(0).map((_, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x2 = center + radius * Math.cos(angle);
    const y2 = center + radius * Math.sin(angle);
    
    return (
      <line 
        key={`axis-${i}`}
        x1={center}
        y1={center}
        x2={x2}
        y2={y2}
        stroke="#ddd"
        strokeWidth="1"
      />
    );
  });

  // Generate labels
  const labels = dimensions.map((dim, i) => {
    const angle = i * angleStep - Math.PI / 2;
    // Position labels slightly outside the radius
    const labelRadius = radius * 1.15;
    const x = center + labelRadius * Math.cos(angle);
    const y = center + labelRadius * Math.sin(angle);
    
    // Adjust text anchor based on position
    let textAnchor = "middle";
    if (x < center - 10) textAnchor = "end";
    if (x > center + 10) textAnchor = "start";
    
    return (
      <text 
        key={`label-${i}`}
        x={x}
        y={y}
        textAnchor={textAnchor}
        fontSize="10"
        fill="#666"
        dominantBaseline="middle"
      >
        {dim.name.length > 10 ? `${dim.name.substring(0, 10)}...` : dim.name}
      </text>
    );
  });

  return (
    <svg 
      ref={svgRef}
      width={size} 
      height={size} 
      viewBox={`0 0 ${size} ${size}`}
      className="radar-dimensional"
    >
      {/* Grid circles */}
      {gridCircles}
      
      {/* Axis lines */}
      {axisLines}
      
      {/* Data polygon */}
      <polygon
        className="radar-polygon"
        points={animated ? getPolygonPoints(Array(dimensions.length).fill(0)) : getPolygonPoints(dimensions.map(d => d.value))}
        fill="rgba(59, 130, 246, 0.3)"
        stroke="#3b82f6"
        strokeWidth="2"
      />
      
      {/* Data points */}
      {dimensions.map((dim, i) => {
        const { x, y } = getCoordinates(animated ? 0 : dim.value, i);
        return (
          <circle
            key={`point-${i}`}
            cx={x}
            cy={y}
            r="4"
            fill="#3b82f6"
            className={`radar-point-${i} ${animated ? 'animate-point' : ''}`}
            style={animated ? { 
              animation: `moveToFinal 1.5s ease-out forwards`,
              animationDelay: `${i * 0.1}s`
            } : {}}
          />
        );
      })}
      
      {/* Labels */}
      {labels}
    </svg>
  );
}
