import React, { useState, useEffect } from 'react';

const BrainVisualization = ({ className = '', width = 500, height = 400 }) => {
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative transition-all duration-1000 ${className}`}>
      <svg
        viewBox="0 0 500 400"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <linearGradient id="pulse" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6">
              <animate 
                attributeName="stopOpacity" 
                values="0.2;0.6;0.2" 
                dur="3s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.2">
              <animate 
                attributeName="stopOpacity" 
                values="0.1;0.3;0.1" 
                dur="3s" 
                repeatCount="indefinite" 
              />
            </stop>
          </linearGradient>
          
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        
        {/* Background Glow */}
        <circle 
          cx="250" 
          cy="200" 
          r="150" 
          fill="url(#brainGlow)" 
          className={`transition-all duration-1000 ${isActive ? 'opacity-70' : 'opacity-0'}`}
          style={{ transformOrigin: 'center', transform: `scale(${isActive ? 1 : 0.7})` }}
        />
        
        {/* Brain Outline */}
        <path
          d="M250,110 C330,110 370,150 370,200 C370,250 330,290 250,290 C170,290 130,250 130,200 C130,150 170,110 250,110 Z"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          fill="none"
          className={`transition-all duration-1500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            strokeDasharray: 800, 
            strokeDashoffset: isActive ? 0 : 800,
            transition: 'stroke-dashoffset 2s ease-in-out, opacity 1.5s ease-in-out'
          }}
        />
        
        {/* Left Hemisphere */}
        <path
          d="M250,120 C190,120 145,160 145,200 C145,240 190,280 250,280"
          stroke="#60A5FA"
          strokeWidth="2"
          fill="none"
          className={`transition-all duration-1500 delay-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            strokeDasharray: 400, 
            strokeDashoffset: isActive ? 0 : 400,
            transition: 'stroke-dashoffset 2s ease-in-out 0.5s, opacity 1.5s ease-in-out 0.5s'
          }}
        />
        
        {/* Right Hemisphere */}
        <path
          d="M250,120 C310,120 355,160 355,200 C355,240 310,280 250,280"
          stroke="#60A5FA"
          strokeWidth="2"
          fill="none"
          className={`transition-all duration-1500 delay-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            strokeDasharray: 400, 
            strokeDashoffset: isActive ? 0 : 400,
            transition: 'stroke-dashoffset 2s ease-in-out 0.5s, opacity 1.5s ease-in-out 0.5s'
          }}
        />
        
        {/* Brain Structures - Left */}
        <g className={`transition-all duration-1000 delay-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          <path
            d="M190,180 C200,160 230,150 250,160"
            stroke="#60A5FA"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M180,210 C190,190 220,180 240,190"
            stroke="#60A5FA"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M185,240 C195,220 225,210 245,220"
            stroke="#60A5FA"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
        
        {/* Brain Structures - Right */}
        <g className={`transition-all duration-1000 delay-1300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          <path
            d="M310,180 C300,160 270,150 250,160"
            stroke="#60A5FA"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M320,210 C310,190 280,180 260,190"
            stroke="#60A5FA"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M315,240 C305,220 275,210 255,220"
            stroke="#60A5FA"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
        
        {/* Neural Connections */}
        <g className={`transition-all duration-1500 delay-1600 ${isActive ? 'opacity-70' : 'opacity-0'}`}>
          {/* Left to Right Connections */}
          {[1, 2, 3, 4, 5].map((i) => (
            <path
              key={`connection-lr-${i}`}
              d={`M${200 + i * 10},${150 + i * 10} C${230 + i * 5},${140 + i * 5} ${270 - i * 5},${140 + i * 5} ${300 - i * 10},${150 + i * 10}`}
              stroke="rgba(96, 165, 250, 0.5)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4,4"
              className="animate-pulse"
              style={{ 
                animationDelay: `${i * 0.2}s`,
                animationDuration: '3s'
              }}
            />
          ))}
          
          {/* Top to Bottom Connections */}
          {[1, 2, 3, 4].map((i) => (
            <path
              key={`connection-tb-${i}`}
              d={`M${220 + i * 15},150 C${230 + i * 10},180 ${230 + i * 10},220 ${220 + i * 15},250`}
              stroke="rgba(96, 165, 250, 0.4)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="3,5"
              className="animate-pulse"
              style={{ 
                animationDelay: `${i * 0.15}s`,
                animationDuration: '3.5s'
              }}
            />
          ))}
        </g>
        
        {/* Nodes */}
        <g className={`transition-all duration-1000 delay-2000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          {/* Node Group 1 - Emotional (blue) */}
          <circle cx="200" cy="170" r="5" fill="#3B82F6" filter="url(#glow)" className="animate-pulse" />
          <circle cx="230" cy="150" r="4" fill="#3B82F6" filter="url(#glow)" style={{ animationDelay: '0.5s' }} className="animate-pulse" />
          <circle cx="210" cy="190" r="4.5" fill="#3B82F6" filter="url(#glow)" style={{ animationDelay: '1s' }} className="animate-pulse" />
          
          {/* Node Group 2 - Cognitive (green) */}
          <circle cx="300" cy="170" r="5" fill="#10B981" filter="url(#glow)" style={{ animationDelay: '0.2s' }} className="animate-pulse" />
          <circle cx="270" cy="150" r="4" fill="#10B981" filter="url(#glow)" style={{ animationDelay: '0.7s' }} className="animate-pulse" />
          <circle cx="290" cy="190" r="4.5" fill="#10B981" filter="url(#glow)" style={{ animationDelay: '1.2s' }} className="animate-pulse" />
          
          {/* Node Group 3 - Autonomy (purple) */}
          <circle cx="250" cy="230" r="5" fill="#8B5CF6" filter="url(#glow)" style={{ animationDelay: '0.3s' }} className="animate-pulse" />
          <circle cx="220" cy="240" r="4" fill="#8B5CF6" filter="url(#glow)" style={{ animationDelay: '0.8s' }} className="animate-pulse" />
          <circle cx="280" cy="240" r="4.5" fill="#8B5CF6" filter="url(#glow)" style={{ animationDelay: '1.3s' }} className="animate-pulse" />
        </g>
        
        {/* Labels */}
        <g className={`transition-all duration-700 delay-2500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          <text x="185" y="135" fontSize="12" fill="#3B82F6" fontWeight="500" textAnchor="middle">Emocional</text>
          <text x="315" y="135" fontSize="12" fill="#10B981" fontWeight="500" textAnchor="middle">Cognitiva</text>
          <text x="250" y="265" fontSize="12" fill="#8B5CF6" fontWeight="500" textAnchor="middle">Autonomia</text>
        </g>
      </svg>
    </div>
  );
};

export default BrainVisualization;
