"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import GlassContainer from "./glass-container"

export default function ForInvestors() {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
          entries[0].target.classList.add("revealed")
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div ref={sectionRef} className="w-full py-10 md:py-12 relative bg-gradient-to-b from-blue-50 to-white">
      <div className="absolute inset-0 z-0 opacity-85 animate-subtle-wave bg-parallax" data-speed="0.03">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-50/5 via-transparent to-blue-900/3"></div>
      </div>
      
      <div className="container mx-auto relative z-10 px-4">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900 transition-all duration-1000 ${
          isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
        }`}>
          For Investors
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className={`space-y-6 order-2 md:order-1 transition-all duration-1000 delay-200 ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}>
            <h3 className="text-2xl font-bold text-blue-800">Investment Opportunity</h3>
            <p className="text-lg text-gray-700 mb-6">
              HEALTH/HEALTH represents a unique investment opportunity in healthcare technology with validated clinical application and significant market potential.
            </p>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm transform transition-all duration-500 hover:shadow-md" 
                style={{ transitionDelay: '400ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Clinical Validation</h4>
                    <p className="text-gray-600">Developed by a practicing psychiatrist with real-world testing in clinical settings</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm transform transition-all duration-500 hover:shadow-md" 
                style={{ transitionDelay: '500ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Market Potential</h4>
                    <p className="text-gray-600">Positioned to meet growing demand for data-driven mental healthcare solutions</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm transform transition-all duration-500 hover:shadow-md" 
                style={{ transitionDelay: '600ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Intellectual Property</h4>
                    <p className="text-gray-600">Unique methodology and technological approach with strong IP potential</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
                Request Investment Information
              </button>
            </div>
          </div>
          
          <div className={`order-1 md:order-2 transition-all duration-1000 delay-400 ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}>
            <GlassContainer className="p-6 rounded-2xl">
              <div className="aspect-video relative bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center p-4 overflow-hidden">
                <div className="relative w-full h-full">
                  <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <defs>
                      <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.7"/>
                        <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.3"/>
                      </linearGradient>
                      <linearGradient id="gradientGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.7"/>
                        <stop offset="100%" stopColor="#34D399" stopOpacity="0.3"/>
                      </linearGradient>
                      <linearGradient id="gradientPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.7"/>
                        <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.3"/>
                      </linearGradient>
                    </defs>
                    
                    {/* Grid lines */}
                    <g stroke="#E5E7EB" strokeWidth="1">
                      <line x1="50" y1="50" x2="450" y2="50" />
                      <line x1="50" y1="100" x2="450" y2="100" />
                      <line x1="50" y1="150" x2="450" y2="150" />
                      <line x1="50" y1="200" x2="450" y2="200" />
                      <line x1="50" y1="250" x2="450" y2="250" />
                      
                      <line x1="100" y1="50" x2="100" y2="250" />
                      <line x1="150" y1="50" x2="150" y2="250" />
                      <line x1="200" y1="50" x2="200" y2="250" />
                      <line x1="250" y1="50" x2="250" y2="250" />
                      <line x1="300" y1="50" x2="300" y2="250" />
                      <line x1="350" y1="50" x2="350" y2="250" />
                      <line x1="400" y1="50" x2="400" y2="250" />
                    </g>
                    
                    {/* Chart Axes */}
                    <line x1="50" y1="250" x2="450" y2="250" stroke="#1E3A8A" strokeWidth="2" />
                    <line x1="50" y1="50" x2="50" y2="250" stroke="#1E3A8A" strokeWidth="2" />
                    
                    {/* Data Line 1 - Market Growth */}
                    <path d="M 50,220 L 100,210 L 150,190 L 200,170 L 250,140 L 300,110 L 350,90 L 400,70 L 450,60" 
                          fill="none" 
                          stroke="url(#gradientBlue)" 
                          strokeWidth="3" />
                    
                    {/* Data Line 2 - Revenue Projection */}
                    <path d="M 50,230 L 100,225 L 150,215 L 200,200 L 250,180 L 300,150 L 350,110 L 400,90 L 450,80" 
                          fill="none" 
                          stroke="url(#gradientGreen)" 
                          strokeWidth="3" />
                    
                    {/* Data Line 3 - User Growth */}
                    <path d="M 50,240 L 100,230 L 150,210 L 200,190 L 250,160 L 300,130 L 350,100 L 400,80 L 450,70" 
                          fill="none" 
                          stroke="url(#gradientPurple)" 
                          strokeWidth="3" />
                    
                    {/* Data points */}
                    <g fill="#3B82F6">
                      <circle cx="50" cy="220" r="4" />
                      <circle cx="100" cy="210" r="4" />
                      <circle cx="150" cy="190" r="4" />
                      <circle cx="200" cy="170" r="4" />
                      <circle cx="250" cy="140" r="4" />
                      <circle cx="300" cy="110" r="4" />
                      <circle cx="350" cy="90" r="4" />
                      <circle cx="400" cy="70" r="4" />
                      <circle cx="450" cy="60" r="4" />
                    </g>
                    
                    <g fill="#10B981">
                      <circle cx="50" cy="230" r="4" />
                      <circle cx="100" cy="225" r="4" />
                      <circle cx="150" cy="215" r="4" />
                      <circle cx="200" cy="200" r="4" />
                      <circle cx="250" cy="180" r="4" />
                      <circle cx="300" cy="150" r="4" />
                      <circle cx="350" cy="110" r="4" />
                      <circle cx="400" cy="90" r="4" />
                      <circle cx="450" cy="80" r="4" />
                    </g>
                    
                    <g fill="#8B5CF6">
                      <circle cx="50" cy="240" r="4" />
                      <circle cx="100" cy="230" r="4" />
                      <circle cx="150" cy="210" r="4" />
                      <circle cx="200" cy="190" r="4" />
                      <circle cx="250" cy="160" r="4" />
                      <circle cx="300" cy="130" r="4" />
                      <circle cx="350" cy="100" r="4" />
                      <circle cx="400" cy="80" r="4" />
                      <circle cx="450" cy="70" r="4" />
                    </g>
                    
                    {/* Text labels */}
                    <text x="250" y="280" textAnchor="middle" fill="#1E3A8A" fontWeight="bold" fontSize="12">Timeline (Quarters)</text>
                    <text x="30" y="150" textAnchor="middle" fill="#1E3A8A" fontWeight="bold" fontSize="12" transform="rotate(-90,30,150)">Growth Metrics</text>
                    
                    {/* Legend */}
                    <g transform="translate(50,30)">
                      <rect x="0" y="0" width="120" height="15" fill="#EFF6FF" rx="4" />
                      <line x1="10" y1="7.5" x2="25" y2="7.5" stroke="#3B82F6" strokeWidth="3" />
                      <circle cx="17.5" cy="7.5" r="3" fill="#3B82F6" />
                      <text x="30" y="11" fill="#1E3A8A" fontSize="10">Market Growth</text>
                    </g>
                    
                    <g transform="translate(180,30)">
                      <rect x="0" y="0" width="120" height="15" fill="#ECFDF5" rx="4" />
                      <line x1="10" y1="7.5" x2="25" y2="7.5" stroke="#10B981" strokeWidth="3" />
                      <circle cx="17.5" cy="7.5" r="3" fill="#10B981" />
                      <text x="30" y="11" fill="#1E3A8A" fontSize="10">Revenue Projection</text>
                    </g>
                    
                    <g transform="translate(310,30)">
                      <rect x="0" y="0" width="120" height="15" fill="#F5F3FF" rx="4" />
                      <line x1="10" y1="7.5" x2="25" y2="7.5" stroke="#8B5CF6" strokeWidth="3" />
                      <circle cx="17.5" cy="7.5" r="3" fill="#8B5CF6" />
                      <text x="30" y="11" fill="#1E3A8A" fontSize="10">User Adoption</text>
                    </g>
                  </svg>
                </div>
              </div>
            </GlassContainer>
            
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-blue-600 font-bold text-2xl">165%</div>
                <div className="text-blue-900 text-sm">Market Growth</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="text-green-600 font-bold text-2xl">$1.8B</div>
                <div className="text-green-900 text-sm">Total Market</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="text-purple-600 font-bold text-2xl">5.2x</div>
                <div className="text-purple-900 text-sm">ROI Potential</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-transition-helper" />
    </div>
  )
}
