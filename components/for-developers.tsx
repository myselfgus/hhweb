"use client"

import { useEffect, useRef, useState } from "react"
import ElegantReveal from "./animations/elegant-reveal"
import RefinedTextReveal from "./animations/refined-text-reveal"
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
    <div ref={sectionRef} className="w-full py-20 relative bg-white">
      <div className="absolute inset-0 z-0 opacity-70 animate-subtle-wave" data-speed="0.02"></div>
      
      <div className="container mx-auto relative z-10 px-4">
        <RefinedTextReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
            For Developers
          </h2>
        </RefinedTextReveal>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ElegantReveal direction="left" distance={20}>
            <GlassContainer className="bg-gray-100 p-6 rounded-lg">
              <pre className="whitespace-pre-wrap font-mono text-sm overflow-auto">
{`// Example of our tech stack
{
  "frontend": ["React", "Next.js", "Tailwind CSS"],
  "backend": ["Node.js", "Express"],
  "database": ["MongoDB"],
  "deployment": ["Docker", "Cloud infrastructure"],
  "ai": ["Azure", "OpenAI", "Anthropic", "NVIDIA"]
}`}
              </pre>
            </GlassContainer>
          </ElegantReveal>
          
          <ElegantReveal className="space-y-6" direction="right" distance={20} delay={200}>
            <h3 className="text-2xl font-bold text-blue-800">Join Our Development Team</h3>
            <p className="text-gray-700">We're looking for passionate developers who want to make a difference in healthcare technology.</p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mt-1 mr-4">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Meaningful Work</h4>
                  <p className="text-gray-600">Build technology that directly impacts healthcare delivery</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mt-1 mr-4">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Modern Tech Stack</h4>
                  <p className="text-gray-600">Work with current technologies and best practices</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mt-1 mr-4">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Clinical Insight</h4>
                  <p className="text-gray-600">Direct access to medical expertise from our founder</p>
                </div>
              </div>
            </div>
            
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300">
              Contact About Development
            </button>
          </ElegantReveal>
        </div>
      </div>
    </div>
  )
}
