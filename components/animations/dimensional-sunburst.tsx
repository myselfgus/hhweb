import React, { useState, useEffect } from 'react';

const DimensionalSunburst = ({ width = 500, height = 400, className = '' }) => {
  const [active, setActive] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={className}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 500 400"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          
          <linearGradient id="blueSection" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
          </linearGradient>
          
          <linearGradient id="greenSection" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.7" />
          </linearGradient>
          
          <linearGradient id="purpleSection" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.7" />
          </linearGradient>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Background */}
        <circle 
          cx="250" 
          cy="200" 
          r="150" 
          fill="url(#centerGlow)" 
          className={`transform transition-all duration-1000 ${active ? 'scale-100 opacity-30' : 'scale-0 opacity-0'}`}
        />
        
        {/* Center Circle */}
        <circle 
          cx="250" 
          cy="200" 
          r="60" 
          fill="#f8fafc" 
          stroke="#3b82f6" 
          strokeWidth="2" 
          className={`transform transition-all duration-1000 ${active ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
          filter="drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1))"
        />
        
        <text 
          x="250" 
          y="195" 
          textAnchor="middle" 
          fontSize="16" 
          fontWeight="600" 
          fill="#3b82f6"
          className={`transition-opacity duration-1000 delay-500 ${active ? 'opacity-100' : 'opacity-0'}`}
        >
          Experience
        </text>
        <text 
          x="250" 
          y="215" 
          textAnchor="middle" 
          fontSize="12" 
          fill="#64748b"
          className={`transition-opacity duration-1000 delay-500 ${active ? 'opacity-100' : 'opacity-0'}`}
        >
          Framework
        </text>
        
        {/* Emotional Section */}
        <g className={`transform transition-all duration-1000 delay-300 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <path
            d="M250,140 A60,60 0 0,1 310,200 L250,200 Z"
            fill="url(#blueSection)"
            className="transform origin-center hover:scale-105 transition-transform"
            filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))"
          />
          <circle cx="280" cy="170" r="18" fill="#bfdbfe" />
          <text x="280" y="173" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="500">Emocional</text>
          
          {/* Emotional Metrics */}
          <g className={`transition-all duration-1000 delay-500 ${active ? 'opacity-100' : 'opacity-0'}`}>
            <path d="M320,140 A110,110 0 0,1 360,200 L340,200 A90,90 0 0,0 310,153 Z" fill="#93c5fd" />
            <text x="335" y="170" textAnchor="middle" fill="#1e3a8a" fontSize="9">Valência</text>
            
            <path d="M310,153 A90,90 0 0,1 340,200 L320,200 A70,70 0 0,0 297,165 Z" fill="#60a5fa" />
            <text x="317" y="180" textAnchor="middle" fill="#1e3a8a" fontSize="8">Excitação</text>
            
            <path d="M297,165 A70,70 0 0,1 320,200 L290,200 A40,40 0 0,0 275,180 Z" fill="#3b82f6" />
            <text x="300" y="190" textAnchor="middle" fill="#ffffff" fontSize="7">Intensidade</text>
          </g>
        </g>
        
        {/* Cognitive Section */}
        <g className={`transform transition-all duration-1000 delay-400 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <path
            d="M250,140 A60,60 0 0,0 190,200 L250,200 Z"
            fill="url(#greenSection)"
            className="transform origin-center hover:scale-105 transition-transform"
            filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))"
          />
          <circle cx="220" cy="170" r="18" fill="#a7f3d0" />
          <text x="220" y="173" textAnchor="middle" fill="#065f46" fontSize="10" fontWeight="500">Cognitiva</text>
          
          {/* Cognitive Metrics */}
          <g className={`transition-all duration-1000 delay-600 ${active ? 'opacity-100' : 'opacity-0'}`}>
            <path d="M180,140 A110,110 0 0,0 140,200 L160,200 A90,90 0 0,1 190,153 Z" fill="#6ee7b7" />
            <text x="165" y="170" textAnchor="middle" fill="#065f46" fontSize="9">Complexidade</text>
            
            <path d="M190,153 A90,90 0 0,0 160,200 L180,200 A70,70 0 0,1 203,165 Z" fill="#34d399" />
            <text x="183" y="180" textAnchor="middle" fill="#065f46" fontSize="8">Coerência</text>
            
            <path d="M203,165 A70,70 0 0,0 180,200 L210,200 A40,40 0 0,1 225,180 Z" fill="#10b981" />
            <text x="200" y="190" textAnchor="middle" fill="#ffffff" fontSize="7">Flexibilidade</text>
          </g>
        </g>
        
        {/* Autonomy Section */}
        <g className={`transform transition-all duration-1000 delay-500 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <path
            d="M250,260 A60,60 0 1,1 250,140 L250,200 Z"
            fill="url(#purpleSection)"
            className="transform origin-center hover:scale-105 transition-transform"
            filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))"
          />
          <circle cx="250" cy="240" r="18" fill="#ddd6fe" />
          <text x="250" y="243" textAnchor="middle" fill="#5b21b6" fontSize="10" fontWeight="500">Autonomia</text>
          
          {/* Autonomy Metrics */}
          <g className={`transition-all duration-1000 delay-700 ${active ? 'opacity-100' : 'opacity-0'}`}>
            <path d="M200,290 A110,110 0 0,0 300,290 L290,270 A90,90 0 0,1 210,270 Z" fill="#c4b5fd" />
            <text x="250" y="280" textAnchor="middle" fill="#5b21b6" fontSize="9">Temporal</text>
            
            <path d="M210,270 A90,90 0 0,0 290,270 L280,250 A70,70 0 0,1 220,250 Z" fill="#a78bfa" />
            <text x="250" y="260" textAnchor="middle" fill="#5b21b6" fontSize="8">Autocontrole</text>
          </g>
        </g>
        
        {/* Connecting Lines */}
        <g className={`transition-all duration-1000 delay-1000 ${active ? 'opacity-60' : 'opacity-0'}`}>
          <line x1="250" y1="140" x2="250" y2="120" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="3,2" />
          <line x1="190" y1="200" x2="170" y2="200" stroke="#10b981" strokeWidth="0.5" strokeDasharray="3,2" />
          <line x1="310" y1="200" x2="330" y2="200" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="3,2" />
          <line x1="250" y1="260" x2="250" y2="280" stroke="#8b5cf6" strokeWidth="0.5" strokeDasharray="3,2" />
        </g>
        
        {/* Legends */}
        <g className={`transition-all duration-1000 delay-1200 ${active ? 'opacity-100' : 'opacity-0'}`}>
          <rect x="100" y="340" width="10" height="10" fill="#3b82f6" rx="2" />
          <text x="115" y="348" fontSize="9" fill="#1e3a8a">Metadimensão Emocional</text>
          
          <rect x="220" y="340" width="10" height="10" fill="#10b981" rx="2" />
          <text x="235" y="348" fontSize="9" fill="#065f46">Metadimensão Cognitiva</text>
          
          <rect x="340" y="340" width="10" height="10" fill="#8b5cf6" rx="2" />
          <text x="355" y="348" fontSize="9" fill="#5b21b6">Metadimensão Autonomia</text>
        </g>
      </svg>
    </div>
  );
};

export default DimensionalSunburst;
