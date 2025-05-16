"use client"

import { useEffect, useRef, useState } from "react"

export default function Solution() {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const features = [
    {
      title: "Intuitive Design",
      description: "Built by a doctor who understands the workflow challenges in healthcare environments"
    },
    {
      title: "Time-Saving",
      description: "Streamlined processes that reduce administrative burden"
    },
    {
      title: "Designed for Real Use",
      description: "Tested in real clinical settings for over a year"
    },
    {
      title: "Scalable Architecture",
      description: "Built to grow with varying organizational needs"
    }
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
    <div ref={sectionRef} className="w-full py-10 md:py-12 relative bg-gradient-to-b from-blue-50 to-white">
      <div className="absolute inset-0 z-0 opacity-85 animate-subtle-wave bg-parallax" data-speed="0.03">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-50/5 via-transparent to-blue-900/3"></div>
      </div>
      
      <div className="container mx-auto relative z-10 px-4">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 text-blue-900 transition-all duration-1000 ${
          isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
        }`}>
          Our Solution
        </h2>
        
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className={`text-lg text-gray-700 transition-all duration-1000 delay-200 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          }`}>
            HEALTH/HEALTH is developing innovative healthcare technology based on real clinical experience and identified needs in the healthcare sector.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-500 h-full transform ${
                isInView 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl font-bold">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="section-transition-helper" />
    </div>
  )
}
