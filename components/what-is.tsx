"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import ElegantReveal from "./animations/elegant-reveal"
import RefinedTextReveal from "./animations/refined-text-reveal"
import RefinedParallax from "./animations/refined-parallax"
import VerticalBarsBackground from "./vertical-bars-background"
import GlassContainer from "./glass-container"

export default function WhatIs() {
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
    <div ref={sectionRef} className="w-full">
      {/* Only blue bars that animate on scroll */}
      <VerticalBarsBackground count={15} opacity={0.08} scrollAnimate={true} />

      <div className="container mx-auto relative z-10">
        <RefinedTextReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            What is HEALTH/HEALTH?
          </h2>
        </RefinedTextReveal>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <RefinedParallax className="md:w-1/2 premium-3d-effect" speed={0.03}>
            <ElegantReveal
              className="section-image-container rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:translate-y-[-5px]"
              direction="left"
              distance={20}
            >
              <div className="relative">
                <Image
                  src="/placeholder-ql1y1.png"
                  alt="HEALTH/HEALTH AI Platform"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-all duration-700 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <p className="mt-3 text-center text-sm text-gray-500 italic">
                HEALTH/HEALTH Platform Architecture Overview
              </p>
            </ElegantReveal>
          </RefinedParallax>

          <ElegantReveal className="md:w-1/2" direction="right" distance={20} delay={200}>
            <GlassContainer className="p-6 md:p-8">
              <p className="text-gray-700 mb-4 leading-relaxed">
                HEALTH/HEALTH is a revolutionary solution that accompanies healthcare professionals during
                consultations, taking on the complex task of handling all notes, paperwork, reminders, and clinical
                information management. Our platform allows doctors to fully dedicate themselves to human interaction,
                active listening, and patient-focused decision making.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Built on a solid scientific foundation, the VINTRA framework encapsulates a vast compendium of
                technical, academic, and scientific references, ensuring mathematical validation and methodological
                rigor. HEALTH/HEALTH's power is driven by our proprietary technology: the IREAJE.CLOUD Eulerian runtime,
                optimized to operate with our specialized Domain Specific Languages (.aje, .ire, .e), ensuring
                dimensional analysis and interventions with unprecedented precision and adaptability in psychiatry.
              </p>
            </GlassContainer>
          </ElegantReveal>
        </div>
      </div>
    </div>
  )
}
