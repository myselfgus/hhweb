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
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 text-blue-900 transition-all duration-1000 ${
          isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
        }`}>
          For Investors
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className={`space-y-6 order-2 md:order-1 transition-all duration-1000 delay-200 ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}>
            <h3 className="text-2xl font-bold text-blue-800">Investment Opportunity</h3>
            <p className="text-lg text-gray-700">
              HEALTH/HEALTH represents an opportunity to invest in healthcare technology with real-world validation and a clear market need.
            </p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4 transform transition-all duration-500" style={{ transitionDelay: '400ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateX(0)' : 'translateX(-20px)' }}>
                <h4 className="font-semibold text-blue-900">Market Validation</h4>
                <p className="text-gray-600">Developed and tested by a practicing physician in clinical settings</p>
              </div>
              
              <div className="border-l-4 border-blue-600 pl-4 transform transition-all duration-500" style={{ transitionDelay: '500ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateX(0)' : 'translateX(-20px)' }}>
                <h4 className="font-semibold text-blue-900">Growth Potential</h4>
                <p className="text-gray-600">Addressing fundamental needs in a growing healthcare technology market</p>
              </div>
              
              <div className="border-l-4 border-blue-600 pl-4 transform transition-all duration-500" style={{ transitionDelay: '600ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateX(0)' : 'translateX(-20px)' }}>
                <h4 className="font-semibold text-blue-900">Experienced Founder</h4>
                <p className="text-gray-600">Led by a medical professional with direct industry experience</p>
              </div>
            </div>
            
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transform transition-all duration-500" style={{ transitionDelay: '700ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}>
              Request Investment Information
            </button>
          </div>
          
          <div className={`order-1 md:order-2 transition-all duration-1000 delay-400 ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}>
            <GlassContainer className="p-8 rounded-2xl">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center p-8 overflow-hidden">
                <Image 
                  src="/BC13A678-0CD8-4C99-9327-CB3F213A4420.png" 
                  alt="Growth visualization" 
                  width={400}
                  height={400}
                  className="w-full h-auto transition-all duration-700 hover:scale-[1.02]"
                />
              </div>
            </GlassContainer>
          </div>
        </div>
      </div>
      <div className="section-transition-helper" />
    </div>
  )
}
