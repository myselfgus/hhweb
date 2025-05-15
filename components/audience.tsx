"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import ElegantReveal from "./animations/elegant-reveal"
import RefinedTextReveal from "./animations/refined-text-reveal"
import RefinedParallax from "./animations/refined-parallax"
import AnimatedSphere from "./animated-sphere"
import GlassContainer from "./glass-container"
import { useBackground } from "@/context/background-context"

interface AudienceCardProps {
  title: string
  description: string
  index: number
}

function AudienceCard({ title, description, index }: AudienceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { accentColor } = useBackground()

  return (
    <ElegantReveal
      className="transition-all duration-500 hover:translate-y-[-3px]"
      delay={100 * index}
      distance={10}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlassContainer className="p-6">
        <h3 className={`text-xl font-semibold text-${accentColor} mb-3 inline-block relative audience-title`}>
          {title}
          <span
            className={`absolute bottom-[-4px] left-0 h-[2px] bg-gradient-to-r from-${accentColor} to-blue-600 transition-all duration-500 ${
              isHovered ? "w-full" : "w-0"
            }`}
          ></span>
        </h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </GlassContainer>
    </ElegantReveal>
  )
}

export default function Audience() {
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

  const audienceData = [
    {
      title: "Mental Health Professionals",
      description:
        "Psychiatrists, psychologists, and therapists looking to optimize clinical practice, reduce administrative burden, and deepen dimensional understanding of their patients.",
    },
    {
      title: "Healthcare Clinics and Institutions",
      description:
        "Organizations aiming to implement cutting-edge documentation and analysis systems, improving quality of care and operational efficiency.",
    },
    {
      title: "Public and Health System Managers",
      description:
        "Decision-makers who need structured, high-fidelity data for strategic planning, resource allocation, and evidence-based mental health policies.",
    },
    {
      title: "Researchers",
      description:
        "Scientists and academics who can benefit from a robust platform for collecting, analyzing, and visualizing complex dimensional data in mental health.",
    },
  ]

  return (
    <div ref={sectionRef} className="w-full">
      {/* Remove vertical bars */}
      <AnimatedSphere size="xl" className="absolute top-20 right-[-100px] opacity-10 z-0" />
      <AnimatedSphere size="lg" className="absolute bottom-40 left-[-80px] opacity-10 z-0" />

      {/* Background decorative elements - very subtle */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle wave pattern */}
        <div
          className={`absolute inset-0 bg-[linear-gradient(135deg,rgba(0,170,188,0.02)_25%,transparent_25%,transparent_50%,rgba(0,170,188,0.02)_50%,rgba(0,170,188,0.02)_75%,transparent_75%,transparent)] bg-[length:100px_100px] transition-opacity duration-1500 ${
            isInView ? "opacity-20" : "opacity-0"
          }`}
        ></div>
      </div>

      <div className="container mx-auto relative z-10">
        <RefinedTextReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 logo-gradient-text">
            Who is HEALTH/HEALTH For?
          </h2>
        </RefinedTextReveal>

        <ElegantReveal className="text-center max-w-3xl mx-auto mb-16" delay={200} distance={10}>
          <GlassContainer className="p-6">
            <p className="text-gray-700">
              Our platform was conceived to empower a spectrum of actors in the mental health and research landscape,
              offering precision and efficiency tools.
            </p>
          </GlassContainer>
        </ElegantReveal>

        <div className="flex flex-col md:flex-row-reverse gap-12 items-center mb-16">
          <RefinedParallax className="md:w-1/2 premium-3d-effect" speed={0.03}>
            <ElegantReveal
              className="section-image-container rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:translate-y-[-5px]"
              direction="right"
              distance={20}
            >
              <div className="relative">
                <Image
                  src="/placeholder-yqycu.png"
                  alt="HEALTH/HEALTH for Mental Health Professionals"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-all duration-700 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <p className="mt-3 text-center text-sm text-gray-500 italic">Clinical Practice Enhancement Model</p>
            </ElegantReveal>
          </RefinedParallax>

          <ElegantReveal className="md:w-1/2" direction="left" distance={20} delay={200}>
            <AudienceCard title={audienceData[0].title} description={audienceData[0].description} index={0} />
          </ElegantReveal>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <RefinedParallax className="md:w-1/2 premium-3d-effect" speed={0.03}>
            <ElegantReveal
              className="section-image-container rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:translate-y-[-5px]"
              direction="left"
              distance={20}
            >
              <div className="relative">
                <Image
                  src="/placeholder-sn1gl.png"
                  alt="HEALTH/HEALTH for Healthcare Institutions"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-all duration-700 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <p className="mt-3 text-center text-sm text-gray-500 italic">Institutional Implementation Framework</p>
            </ElegantReveal>
          </RefinedParallax>

          <div className="md:w-1/2 grid gap-6">
            {audienceData.slice(1).map((item, index) => (
              <AudienceCard key={index} title={item.title} description={item.description} index={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
