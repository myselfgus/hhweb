"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import ElegantReveal from "./animations/elegant-reveal"
import RefinedTextReveal from "./animations/refined-text-reveal"
import GlassContainer from "./glass-container"

export default function FounderExperience() {
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
            Founder's Experience
          </h2>
        </RefinedTextReveal>
        
        <div className="max-w-4xl mx-auto">
          <ElegantReveal direction="up" distance={20}>
            <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
              <div className="md:w-1/3">
                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto bg-white p-1 shadow-lg">
                  <Image 
                    src="/IMG_2015.jpeg" 
                    alt="Dr. Gustavo" 
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-blue-800 mb-3">Dr. Gustavo</h3>
                <p className="text-gray-700 mb-4">
                  As a practicing physician, I experienced firsthand the challenges of healthcare technology. For over a year, I developed and tested solutions in real clinical settings that addressed the pain points I encountered daily.
                </p>
                <p className="text-gray-700">
                  This real-world testing has validated our approach and informed our development roadmap. Now, we're looking to scale this solution to help more healthcare providers.
                </p>
              </div>
            </div>
          </ElegantReveal>
          
          <ElegantReveal direction="up" distance={20} delay={200}>
            <GlassContainer className="p-8 rounded-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Key Insights From Clinical Testing</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-gray-700">Administrative processes consume too much clinical time</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-gray-700">Existing solutions are often designed without clinical workflow in mind</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-gray-700">Technology should support rather than interrupt the provider-patient relationship</span>
                </li>
              </ul>
            </GlassContainer>
          </ElegantReveal>
        </div>
      </div>
    </div>
  )
}
