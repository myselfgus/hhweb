"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import GlassContainer from "./glass-container"

export default function Contact() {
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
      <div className="absolute inset-0 z-0 opacity-85 animate-subtle-wave bg-parallax" data-speed="0.03">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-50/5 via-transparent to-blue-900/3"></div>
      </div>
      
      <div className="container mx-auto relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-center text-blue-900 mb-6 transition-all duration-1000 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          }`}>
            Join Our Journey
          </h2>
          
          <p className={`text-lg text-center text-gray-700 mb-10 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          }`}>
            We're looking for developers and investors who believe in transforming healthcare technology.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`transition-all duration-1000 delay-300 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <GlassContainer className="p-8 rounded-xl">
                <h3 className="text-xl font-bold text-blue-800 mb-4">For Developers</h3>
                <p className="mb-6 text-gray-700">Join our team and help build the future of healthcare technology.</p>
                <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300">
                  Apply to Join Our Team
                </button>
              </GlassContainer>
            </div>
            
            <div className={`transition-all duration-1000 delay-400 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <GlassContainer className="p-8 rounded-xl">
                <h3 className="text-xl font-bold text-blue-800 mb-4">For Investors</h3>
                <p className="mb-6 text-gray-700">Invest in validated healthcare technology with real market potential.</p>
                <button className="w-full py-3 px-4 bg-blue-100 text-blue-800 rounded-lg font-medium hover:bg-blue-200 transition-all duration-300">
                  Request Investment Information
                </button>
              </GlassContainer>
            </div>
          </div>
          
          <div className={`mt-12 text-center transition-all duration-1000 delay-500 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          }`}>
            <h3 className="text-xl font-bold text-blue-900 mb-4">Contact Us Directly</h3>
            <p className="mb-6 text-gray-700">Have questions or want to learn more about HEALTH/HEALTH?</p>
            <a href="mailto:contact@healthhealth.com" className="text-blue-600 font-medium hover:underline">
              contact@healthhealth.com
            </a>
            
            <div className="mt-8 flex justify-center">
              <Image 
                src="/microsoft-logo.png" 
                alt="Microsoft for Startups Founders Hub" 
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="section-transition-helper" />
    </div>
  )
}
