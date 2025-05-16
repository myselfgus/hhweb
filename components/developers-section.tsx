"use client"

import { useEffect, useRef, useState } from "react"
import GlassContainer from "./glass-container"

export default function ForDevelopers() {
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
    <div ref={sectionRef} className="w-full py-10 md:py-12 relative bg-gradient-to-b from-white to-blue-50">
      <div className="absolute inset-0 z-0 opacity-70 animate-subtle-wave" data-speed="0.02"></div>
      
      <div className="container mx-auto relative z-10 px-4">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900 transition-all duration-1000 ${
          isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
        }`}>
          For Developers
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className={`transition-all duration-1000 delay-200 ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}>
            <GlassContainer className="p-6 rounded-xl">
              <div className="bg-gray-900 rounded-lg text-white p-4 font-mono text-sm">
                <div className="flex items-center border-b border-gray-700 pb-2 mb-3">
                  <div className="flex space-x-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-gray-400 text-xs">terminal</div>
                </div>
                <div className="space-y-1">
                  <p><span className="text-green-400">user@healthhealth</span><span className="text-white">:</span><span className="text-blue-400">~</span><span className="text-white">$</span> <span className="ml-1">cat tech-stack.json</span></p>
                  <div className="text-gray-200">
                    <p>{`{`}</p>
                    <p className="pl-4"><span className="text-blue-300">"frontend"</span>: [<span className="text-green-300">"React"</span>, <span className="text-green-300">"Next.js"</span>, <span className="text-green-300">"Tailwind CSS"</span>],</p>
                    <p className="pl-4"><span className="text-blue-300">"backend"</span>: [<span className="text-green-300">"Node.js"</span>, <span className="text-green-300">"Express"</span>, <span className="text-green-300">"Flask"</span>],</p>
                    <p className="pl-4"><span className="text-blue-300">"database"</span>: [<span className="text-green-300">"MongoDB"</span>, <span className="text-green-300">"Azure CosmosDB"</span>],</p>
                    <p className="pl-4"><span className="text-blue-300">"deployment"</span>: [<span className="text-green-300">"Docker"</span>, <span className="text-green-300">"Azure"</span>],</p>
                    <p className="pl-4"><span className="text-blue-300">"ai"</span>: [<span className="text-green-300">"Azure ML"</span>, <span className="text-green-300">"OpenAI"</span>, <span className="text-green-300">"Anthropic"</span>],</p>
                    <p className="pl-4"><span className="text-blue-300">"nlp"</span>: [<span className="text-green-300">"spaCy"</span>, <span className="text-green-300">"transformers"</span>],</p>
                    <p className="pl-4"><span className="text-blue-300">"speech"</span>: [<span className="text-green-300">"Azure Speech"</span>, <span className="text-green-300">"Whisper"</span>]</p>
                    <p>{`}`}</p>
                  </div>
                  <p className="mt-2"><span className="text-green-400">user@healthhealth</span><span className="text-white">:</span><span className="text-blue-400">~</span><span className="text-white">$</span> <span className="ml-1">cat architecture.md</span></p>
                  <div className="text-gray-200">
                    <p className="text-yellow-300"># HEALTH/HEALTH Architecture</p>
                    <p className="mt-1">- Modular microservices design</p>
                    <p>- Event-driven architecture</p>
                    <p>- WebSocket real-time communication</p>
                    <p>- FHIR-compatible health data structure</p>
                    <p>- Secure multi-tenant design</p>
                  </div>
                  <p className="mt-2"><span className="text-green-400">user@healthhealth</span><span className="text-white">:</span><span className="text-blue-400">~</span><span className="text-white">$</span> <span className="ml-1 animate-pulse">_</span></p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="p-3 bg-blue-50 rounded-lg shadow-sm transition-all hover:shadow-md">
                  <div className="flex justify-center mb-2">
                    <svg viewBox="0 0 24 24" className="h-7 w-7 text-blue-600" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.75C12.4142 17.75 12.75 17.4142 12.75 17C12.75 16.5858 12.4142 16.25 12 16.25C11.5858 16.25 11.25 16.5858 11.25 17C11.25 17.4142 11.5858 17.75 12 17.75Z" fill="currentColor"/>
                      <path d="M7.28033 10.2197C6.98744 9.92678 6.51256 9.92678 6.21967 10.2197C5.92678 10.5126 5.92678 10.9874 6.21967 11.2803L7.28033 10.2197ZM10 14L9.46967 14.5303C9.76256 14.8232 10.2374 14.8232 10.5303 14.5303L10 14ZM17.7803 7.28033C18.0732 6.98744 18.0732 6.51256 17.7803 6.21967C17.4874 5.92678 17.0126 5.92678 16.7197 6.21967L17.7803 7.28033ZM6.21967 11.2803L9.46967 14.5303L10.5303 13.4697L7.28033 10.2197L6.21967 11.2803ZM10.5303 14.5303L17.7803 7.28033L16.7197 6.21967L9.46967 13.4697L10.5303 14.5303Z" fill="currentColor"/>
                      <path d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-center text-sm font-medium text-gray-700">API-First</p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg shadow-sm transition-all hover:shadow-md">
                  <div className="flex justify-center mb-2">
                    <svg viewBox="0 0 24 24" className="h-7 w-7 text-purple-600" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.5 9.5L12 4L20.5 9.5M3.5 9.5V14.5L12 20L20.5 14.5V9.5M3.5 9.5L12 15L20.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-center text-sm font-medium text-gray-700">Scalable</p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg shadow-sm transition-all hover:shadow-md">
                  <div className="flex justify-center mb-2">
                    <svg viewBox="0 0 24 24" className="h-7 w-7 text-green-600" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 15C3 16.6569 4.34315 18 6 18C7.65685 18 9 16.6569 9 15C9 13.3431 7.65685 12 6 12C4.34315 12 3 13.3431 3 15Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M15 6C15 7.65685 16.3431 9 18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M9 15H11C13.2091 15 15 13.2091 15 11V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 14V17C21 18.1046 20.1046 19 19 19H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-center text-sm font-medium text-gray-700">Extensible</p>
                </div>
              </div>
            </GlassContainer>
          </div>
          
          <div className={`space-y-6 transition-all duration-1000 delay-400 ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}>
            <h3 className="text-2xl font-bold text-blue-800">Join Our Development Team</h3>
            <p className="text-lg text-gray-700">
              We're building a cutting-edge mental health platform using modern technologies and AI. Work with us to create solutions that make a real difference.
            </p>
            
            <div className="space-y-5 mt-6">
              <div className="bg-white rounded-lg p-5 shadow-sm transition-all duration-300 hover:shadow-md transform hover:-translate-y-1" 
                style={{ transitionDelay: '600ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-900 mb-1">Technical Challenges</h4>
                    <p className="text-gray-700">Work on complex problems in data processing, real-time visualization, and AI-assisted clinical workflows.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-sm transition-all duration-300 hover:shadow-md transform hover:-translate-y-1" 
                style={{ transitionDelay: '700ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-purple-900 mb-1">Integrated Security</h4>
                    <p className="text-gray-700">Implement industry-leading security practices for PHI with robust access controls and encryption.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-sm transition-all duration-300 hover:shadow-md transform hover:-translate-y-1" 
                style={{ transitionDelay: '800ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 rounded-lg p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-green-900 mb-1">Clinical Collaboration</h4>
                    <p className="text-gray-700">Work directly with medical professionals to create solutions that address real clinical needs.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
                Join Our Development Team
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="section-transition-helper" />
    </div>
  )
}
