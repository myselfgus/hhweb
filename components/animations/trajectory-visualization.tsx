import React, { useEffect, useState } from 'react';

interface TrajectoryVisualizationProps {
  isInView: boolean;
}

export default function TrajectoryVisualization({ isInView }: TrajectoryVisualizationProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isInView && !isAnimating) {
      setIsAnimating(true);
    }
  }, [isInView, isAnimating]);

  // SVG dimensions
  const width = 180;
  const height = 180;
  
  // Define the trajectories as path data
  const trajectoryPast = "M0,160 C20,150 40,170 60,140 C80,110 100,130 120,120 C140,110 160,90 180,80";
  const trajectoryCurrent = "M0,120 C20,130 40,120 60,100 C80,80 100,90 120,70 C140,50 160,60 180,40";
  const trajectoryFuture = "M0,80 C20,90 40,70 60,60 C80,50 100,60 120,30 C140,40 160,20 180,10";
  
  // Time markers (vertical lines)
  const timeMarkers = [
    { x: 40, label: "-3m" },
    { x: 90, label: "Hoje" },
    { x: 140, label: "+3m" }
  ];

  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: 'block' }}
    >
      {/* Grid lines */}
      <line x1="0" y1="40" x2={width} y2="40" stroke="rgba(200,200,200,0.2)" strokeWidth="1" strokeDasharray="2,2" />
      <line x1="0" y1="80" x2={width} y2="80" stroke="rgba(200,200,200,0.2)" strokeWidth="1" strokeDasharray="2,2" />
      <line x1="0" y1="120" x2={width} y2="120" stroke="rgba(200,200,200,0.2)" strokeWidth="1" strokeDasharray="2,2" />
      <line x1="0" y1="160" x2={width} y2="160" stroke="rgba(200,200,200,0.2)" strokeWidth="1" strokeDasharray="2,2" />
      
      {/* Time markers */}
      {timeMarkers.map((marker, i) => (
        <React.Fragment key={`marker-${i}`}>
          <line 
            x1={marker.x} 
            y1="0" 
            x2={marker.x} 
            y2={height} 
            stroke="rgba(200,200,200,0.2)" 
            strokeWidth="1" 
            strokeDasharray="2,2" 
          />
          <text 
            x={marker.x} 
            y={height - 5} 
            textAnchor="middle" 
            fill="rgba(200,200,200,0.7)" 
            fontSize="8"
          >
            {marker.label}
          </text>
        </React.Fragment>
      ))}
      
      {/* Trajectories */}
      <path 
        d={trajectoryFuture} 
        fill="none"
        stroke="#8b5cf6" 
        strokeWidth="2"
        strokeDasharray="4,2"
        strokeOpacity={isAnimating ? 0.7 : 0}
        style={{
          transition: 'stroke-opacity 1s ease-out 1.2s',
          strokeDashoffset: isAnimating ? 0 : 100,
          animation: isAnimating ? 'dashFlow 1.5s ease-out forwards 1.2s' : 'none'
        }}
      />
      
      <path 
        d={trajectoryCurrent} 
        fill="none"
        stroke="#f59e0b" 
        strokeWidth="2"
        strokeOpacity={isAnimating ? 1 : 0}
        style={{
          transition: 'stroke-opacity 1s ease-out 0.6s',
          strokeDashoffset: isAnimating ? 0 : 100,
          animation: isAnimating ? 'dashFlow 1.5s ease-out forwards 0.6s' : 'none'
        }}
      />
      
      <path 
        d={trajectoryPast} 
        fill="none"
        stroke="#6b7280" 
        strokeWidth="2"
        strokeOpacity={isAnimating ? 0.8 : 0}
        style={{
          transition: 'stroke-opacity 1s ease-out',
          strokeDashoffset: isAnimating ? 0 : 100,
          animation: isAnimating ? 'dashFlow 1.5s ease-out forwards' : 'none'
        }}
      />
      
      {/* Current point indicator */}
      <circle 
        cx="90" 
        cy="80" 
        r="5"
        fill="#f59e0b"
        stroke="#fff"
        strokeWidth="1"
        opacity={isAnimating ? 1 : 0}
        style={{
          transition: 'opacity 0.5s ease-out 0.8s',
          filter: 'drop-shadow(0 0 3px rgba(245, 158, 11, 0.5))'
        }}
      />
      
      {/* Legend */}
      <g transform="translate(10, 15)" opacity={isAnimating ? 1 : 0} style={{ transition: 'opacity 0.5s ease-out 1.5s' }}>
        <rect x="0" y="0" width="8" height="2" fill="#6b7280" />
        <text x="12" y="3" fontSize="6" fill="#aaa">Passado</text>
        
        <rect x="0" y="10" width="8" height="2" fill="#f59e0b" />
        <text x="12" y="13" fontSize="6" fill="#aaa">Atual</text>
        
        <rect x="0" y="20" width="8" height="2" fill="#8b5cf6" strokeDasharray="4,2" />
        <text x="12" y="23" fontSize="6" fill="#aaa">Projeção</text>
      </g>
    </svg>
  );
}
