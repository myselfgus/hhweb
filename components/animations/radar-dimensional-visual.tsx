import React, { useEffect, useState } from 'react';

interface RadarDimensionalVisualProps {
  isInView: boolean;
}

export default function RadarDimensionalVisual({ isInView }: RadarDimensionalVisualProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isInView && !isAnimating) {
      setIsAnimating(true);
    }
  }, [isInView, isAnimating]);

  // SVG dimensions
  const size = 180;
  const center = size / 2;
  const radius = size * 0.4;

  // Axes count and angle step
  const axesCount = 10;
  const angleStep = (Math.PI * 2) / axesCount;

  // Dimension data points - this would come from actual data
  const dimensions = [
    { value: 70, color: '#3b82f6' }, // Valência
    { value: 40, color: '#3b82f6' }, // Excitação
    { value: 60, color: '#3b82f6' }, // Dominância
    { value: 80, color: '#3b82f6' }, // Intensidade
    { value: 30, color: '#10b981' }, // Complexidade
    { value: 50, color: '#10b981' }, // Coerência
    { value: 65, color: '#10b981' }, // Flexibilidade
    { value: 45, color: '#10b981' }, // Dissonância
    { value: 55, color: '#8b5cf6' }, // Persp. Temporal
    { value: 75, color: '#8b5cf6' }, // Autocontrole
  ];

  // Calculate point coordinates
  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2; // Start from top
    const x = center + (radius * value / 100) * Math.cos(angle);
    const y = center + (radius * value / 100) * Math.sin(angle);
    return { x, y };
  };

  // Generate polygon points
  const points = dimensions.map((dim, index) => {
    const { x, y } = getCoordinates(dim.value, index);
    return `${x},${y}`;
  }).join(' ');

  // Generate circular grid
  const gridCircles = [0.25, 0.5, 0.75, 1].map((factor, i) => (
    <circle
      key={`grid-${i}`}
      cx={center}
      cy={center}
      r={radius * factor}
      fill="none"
      stroke="rgba(200, 200, 200, 0.3)"
      strokeWidth="1"
      strokeDasharray={i < 3 ? "2,2" : "none"}
    />
  ));

  // Generate axes
  const axes = Array(axesCount).fill(0).map((_, i) => {
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
        stroke="rgba(200, 200, 200, 0.3)"
        strokeWidth="1"
      />
    );
  });

  // Generate data polygon and points with animation
  const polygonOpacity = isAnimating ? 1 : 0;
  const polygonScale = isAnimating ? 1 : 0.5;
  const pointsOpacity = isAnimating ? 1 : 0;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block' }}
    >
      {/* Grid circles */}
      {gridCircles}

      {/* Axes */}
      {axes}

      {/* Data polygon with animation */}
      <polygon
        points={points}
        fill="rgba(59, 130, 246, 0.2)"
        stroke="#3b82f6"
        strokeWidth="1.5"
        style={{
          opacity: polygonOpacity,
          transform: `scale(${polygonScale})`,
          transformOrigin: 'center',
          transition: 'all 1s ease-out 0.3s'
        }}
      />

      {/* Data points with animation */}
      {dimensions.map((dim, i) => {
        const { x, y } = getCoordinates(dim.value, i);
        return (
          <circle
            key={`point-${i}`}
            cx={x}
            cy={y}
            r="3"
            fill={dim.color}
            style={{
              opacity: pointsOpacity,
              transition: `all 0.5s ease-out ${0.3 + i * 0.1}s`
            }}
          />
        );
      })}
    </svg>
  );
}
