"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import ElegantReveal from "./animations/elegant-reveal"
import RefinedTextReveal from "./animations/refined-text-reveal"
import GlassContainer from "./glass-container"

export default function Technology() {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const technologies = [
    { name: "Azure", icon: "/placeholder-logo.svg" },
    { name: "OpenAI", icon: "/placeholder-logo.svg" },
    { name: "Anthropic", icon: "/placeholder-logo.svg" },
    { name: "NVIDIA", icon: "/placeholder-logo.svg" }
  ]

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
    <div ref={sectionRef} className="w-full py-20 relative bg-gradient-to-b from-blue-50 to-white">
      <div className="absolute inset-0 z-0 opacity-70 animate-subtle-wave" data-speed="0.02"></div>
      
      <div className="container mx-auto relative z-10 px-4">
        <RefinedTextReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
            Premium Technology
          </h2>
        </RefinedTextReveal>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ElegantReveal direction="left" distance={20}>
            <GlassContainer className="p-8 rounded-xl">
              <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl overflow-hidden">
                <Image 
                  src="/FA6EBE20-A7E6-4470-A666-7A69463B1EAC.png" 
                  alt="HEALTH/HEALTH advanced technology" 
                  fill
                  className="object-cover transition-all duration-700 hover:scale-[1.02]"
                />
              </div>
            </GlassContainer>
          </ElegantReveal>
          
          <ElegantReveal className="space-y-6" direction="right" distance={20} delay={200}>
            <h3 className="text-2xl font-bold text-blue-800">Cutting-Edge Architecture</h3>
            <p className="text-gray-700 mb-6">
              HEALTH/HEALTH is built on the most advanced AI and cloud technologies available, ensuring exceptional performance, reliability, and scalability for healthcare environments.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {technologies.map((tech, index) => (
                <ElegantReveal 
                  key={index} 
                  direction="up" 
                  distance={10} 
                  delay={index * 100}
                >
                  <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                    <span className="font-medium text-blue-900">{tech.name}</span>
                  </div>
                </ElegantReveal>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
              <p className="text-gray-700">
                Part of Microsoft for Startups Founders Hub, giving us access to enterprise-grade technology and resources.
              </p>
            </div>
          </ElegantReveal>
        </div>
      </div>
    </div>
  )
}
