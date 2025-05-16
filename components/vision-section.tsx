"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import GlassContainer from "./glass-container"

export default function Vision() {
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
      <div className="absolute inset-0 z-0 opacity-75 animate-subtle-wave bg-parallax" data-speed="0.02"></div>
      
      <div className="container mx-auto relative z-10 px-4">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 text-blue-900 transition-all duration-1000 ${
          isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
        }`}>
          Our Vision
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className={`space-y-6 transition-all duration-1000 delay-100 ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}>
            <p className="text-lg md:text-xl text-blue-900 font-medium">
              HEALTH/HEALTH transforms healthcare through technology that matters.
            </p>
            <p className="text-gray-700">
              As a doctor with hands-on experience in psychiatry, our founder identified critical gaps in healthcare technology that need solving.
            </p>
            <GlassContainer className="p-6 rounded-lg border-l-4 border-blue-600">
              <h3 className="font-bold text-blue-900 mb-2">The Problem</h3>
              <p className="text-gray-700">Healthcare professionals struggle with inefficient systems that take time away from patient care. We're building technology to address this fundamental challenge.</p>
            </GlassContainer>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}>
            <GlassContainer className="p-8 rounded-2xl">
              <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl overflow-hidden">
                <Image 
                  src="/DEB80971-80F6-465B-947F-117A7D97EEB8.png" 
                  alt="HEALTH/HEALTH concept visualization" 
                  fill
                  className="object-cover transition-all duration-700 hover:scale-[1.02]"
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
