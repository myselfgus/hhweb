import React, { useState, useEffect } from 'react';

const PipelineVisualization = ({ className = '', width = 400, height = 300 }) => {
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
        viewBox="0 0 400 300"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.7" />
          </linearGradient>
          
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.7" />
          </linearGradient>
          
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.7" />
          </linearGradient>
          
          <linearGradient id="dataFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
          </linearGradient>
          
          <marker 
            id="arrowhead" 
            markerWidth="10" 
            markerHeight="7" 
            refX="0" 
            refY="3.5" 
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
          </marker>
          
          <filter id="pipelineShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>
        
        {/* Background Grid */}
        <g 
          opacity={isActive ? "0.1" : "0"}
          className="transition-opacity duration-1000"
        >
          {[...Array(10)].map((_, i) => (
            <line 
              key={`grid-h-${i}`} 
              x1="0" 
              y1={i * 30} 
              x2="400" 
              y2={i * 30} 
              stroke="#94A3B8" 
              strokeWidth="0.5" 
            />
          ))}
          {[...Array(14)].map((_, i) => (
            <line 
              key={`grid-v-${i}`} 
              x1={i * 30} 
              y1="0" 
              x2={i * 30} 
              y2="300" 
              stroke="#94A3B8" 
              strokeWidth="0.5" 
            />
          ))}
        </g>
        
        {/* Main Pipeline Flow Path */}
        <path
          d="M50,150 C70,150 80,100 100,100 L160,100 C180,100 190,150 210,150 L270,150 C290,150 300,200 320,200 L350,200"
          stroke="url(#dataFlowGradient)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="400"
          strokeDashoffset={isActive ? "0" : "400"}
          className="transition-all duration-2000 ease-out"
          markerEnd="url(#arrowhead)"
        />
        
        {/* Flow Particles */}
        {[0, 1, 2, 3, 4].map((i) => (
          <circle 
            key={`particle-${i}`}
            r="4"
            fill="white"
            opacity={isActive ? "0.8" : "0"}
            className="transition-opacity duration-500"
            style={{
              animationDuration: '4s',
              animationDelay: `${i * 0.8}s`,
              animationIterationCount: 'infinite',
            }}
          >
            <animateMotion
              path="M50,150 C70,150 80,100 100,100 L160,100 C180,100 190,150 210,150 L270,150 C290,150 300,200 320,200 L350,200"
              begin={isActive ? `${i * 0.8}s` : 'indefinite'}
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
        ))}
        
        {/* Processing Stages */}
        {/* Stage 1: Data Collection */}
        <g 
          className="transition-all duration-1000 ease-out"
          style={{ 
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(20px)',
            transformOrigin: '50 100',
            transition: 'opacity 1s ease-out, transform 1s ease-out'
          }}
        >
          <rect x="30" y="130" width="40" height="40" rx="8" fill="url(#blueGradient)" filter="url(#pipelineShadow)" />
          <text x="50" y="155" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">Captura</text>
          
          <path d="M50,130 L50,100 L30,100 L50,80 L70,100 L50,100" fill="#3B82F6" opacity="0.6">
            <animate 
              attributeName="opacity" 
              values="0.4;0.7;0.4" 
              dur="3s" 
              repeatCount="indefinite" 
            />
          </path>
        </g>
        
        {/* Stage 2: Transcription */}
        <g 
          className="transition-all duration-1000 ease-out"
          style={{ 
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(20px)',
            transformOrigin: '130 80',
            transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s'
          }}
        >
          <rect x="110" y="80" width="40" height="40" rx="8" fill="#4F46E5" filter="url(#pipelineShadow)" />
          <text x="130" y="105" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">Transcrição</text>
          
          <g opacity="0.7">
            <line x1="115" y1="92" x2="145" y2="92" stroke="white" strokeWidth="1" />
            <line x1="115" y1="98" x2="135" y2="98" stroke="white" strokeWidth="1" />
            <line x1="115" y1="104" x2="140" y2="104" stroke="white" strokeWidth="1" />
            <line x1="115" y1="110" x2="130" y2="110" stroke="white" strokeWidth="1" />
          </g>
        </g>
        
        {/* Stage 3: NLP */}
        <g 
          className="transition-all duration-1000 ease-out"
          style={{ 
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(20px)',
            transformOrigin: '210 130',
            transition: 'opacity 1s ease-out 0.6s, transform 1s ease-out 0.6s'
          }}
        >
          <rect x="190" y="130" width="40" height="40" rx="8" fill="url(#purpleGradient)" filter="url(#pipelineShadow)" />
          <text x="210" y="155" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">NLP</text>
          
          <g opacity="0.7">
            <circle cx="202" cy="143" r="4" fill="white" />
            <circle cx="218" cy="143" r="4" fill="white" />
            <circle cx="210" cy="155" r="4" fill="white" />
            <line x1="202" y1="143" x2="218" y2="143" stroke="white" strokeWidth="1" />
            <line x1="202" y1="143" x2="210" y2="155" stroke="white" strokeWidth="1" />
            <line x1="218" y1="143" x2="210" y2="155" stroke="white" strokeWidth="1" />
          </g>
        </g>
        
        {/* Stage 4: Dimensional Mapping */}
        <g 
          className="transition-all duration-1000 ease-out"
          style={{ 
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(20px)',
            transformOrigin: '320 180',
            transition: 'opacity 1s ease-out 0.9s, transform 1s ease-out 0.9s'
          }}
        >
          <rect x="300" y="180" width="40" height="40" rx="8" fill="url(#greenGradient)" filter="url(#pipelineShadow)" />
          <text x="320" y="205" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">Dimensional</text>
          
          <path d="M320,185 L325,190 L320,195 L315,190 Z" fill="white" opacity="0.7" />
          <path d="M312,195 L317,200 L312,205 L307,200 Z" fill="white" opacity="0.7" />
          <path d="M328,195 L333,200 L328,205 L323,200 Z" fill="white" opacity="0.7" />
          <circle cx="320" cy="200" r="2" fill="white" opacity="0.7" />
        </g>
        
        {/* Data Elements */}
        <g 
          className="transition-all duration-1000 ease-out"
          style={{ 
            opacity: isActive ? 1 : 0,
            transition: 'opacity 1.5s ease-out 1.2s'
          }}
        >
          {/* Input Data */}
          <rect x="30" y="220" width="60" height="20" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1" />
          <text x="60" y="233" fontSize="8" fill="#3B82F6" textAnchor="middle">Dados Brutos</text>
          
          {/* Processing Data */}
          <rect x="170" y="220" width="60" height="20" rx="4" fill="#F5F3FF" stroke="#8B5CF6" strokeWidth="1" />
          <text x="200" y="233" fontSize="8" fill="#8B5CF6" textAnchor="middle">Processamento</text>
          
          {/* Output Data */}
          <rect x="310" y="220" width="60" height="20" rx="4" fill="#ECFDF5" stroke="#10B981" strokeWidth="1" />
          <text x="340" y="233" fontSize="8" fill="#10B981" textAnchor="middle">Registro RDC</text>
        </g>
        
        {/* Binary Data Animation */}
        <g 
          opacity={isActive ? "0.5" : "0"}
          className="transition-opacity duration-1000"
          style={{ transitionDelay: '1.5s' }}
        >
          {[...Array(20)].map((_, i) => (
            <text 
              key={`binary-${i}`} 
              x={30 + Math.random() * 340} 
              y={30 + Math.random() * 80} 
              fontSize="6" 
              fill="#3B82F6" 
              opacity={0.3 + Math.random() * 0.7}
              className="animate-pulse"
              style={{ 
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default PipelineVisualization;
