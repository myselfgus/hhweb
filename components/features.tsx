"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { PlusIcon, LineChart, PlusCircle, FileText, HelpCircle } from "lucide-react"
import ElegantReveal from "./animations/elegant-reveal"
import RefinedTextReveal from "./animations/refined-text-reveal"
import GlassContainer from "./glass-container"
import { useBackground } from "@/context/background-context"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  index: number
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { accentColor } = useBackground()

  return (
    <ElegantReveal
      className="transition-all duration-500 hover:translate-y-[-3px]"
      delay={100 * index}
      distance={10}
      direction={index % 2 === 0 ? "up" : "down"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlassContainer className="p-6 h-full">
        <div
          className={`w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100/30 text-${accentColor} rounded-lg mb-6 border border-blue-200/15 transition-all duration-300 ${
            isHovered ? "scale-105" : ""
          }`}
        >
          {icon}
        </div>
        <h3
          className={`text-xl font-semibold mb-3 transition-all duration-300 ${
            isHovered ? `text-${accentColor} translate-x-0.5` : "text-blue-900"
          }`}
        >
          {title}
        </h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </GlassContainer>
    </ElegantReveal>
  )
}

export default function Features() {
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

  const features = [
    {
      icon: <PlusIcon className="w-7 h-7 stroke-2" />,
      title: "Dimensional Consultation Capture",
      description:
        "Records the clinical conversation in real-time, extracting linguistic patterns and transforming them into dimensional vectors that map the patient's mental state.",
    },
    {
      icon: <LineChart className="w-7 h-7 stroke-2" />,
      title: "Categorical Model Replacement",
      description:
        "Overcomes traditional diagnostic limitations with a quantitative vector approach in the emotional, cognitive, and autonomy dimensions of the patient.",
    },
    {
      icon: <PlusCircle className="w-7 h-7 stroke-2" />,
      title: "Trajectory Visualization",
      description:
        "Represents mental state in precise dimensional coordinates, enabling visualization of clinical evolution over time and identification of critical points.",
    },
    {
      icon: <FileText className="w-7 h-7 stroke-2" />,
      title: "SOAP-VINTRA Documentation",
      description:
        "Adapts the traditional SOAP format to a dimensional model, enriching transcription with phenomenological markers and vector positioning across 10 dimensions.",
    },
    {
      icon: <HelpCircle className="w-7 h-7 stroke-2" />,
      title: "Dimensional Intervention",
      description:
        "Projects therapeutic trajectories based on priority dimensional targets, incorporating continuous monitoring mechanisms and feedback at intervention points.",
    },
  ]

  return (
    <div ref={sectionRef} className="w-full">
      {/* Remove vertical bars */}

      {/* Background decorative elements - very subtle */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle dot pattern */}
        <div
          className={`absolute inset-0 bg-[radial-gradient(circle,_rgba(0,170,188,0.03)_1px,_transparent_1px)] bg-[length:20px_20px] transition-opacity duration-1500 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        ></div>
      </div>

      <div className="container mx-auto relative z-10">
        <RefinedTextReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 logo-gradient-text">
            HEALTH/HEALTH Key Capabilities
          </h2>
        </RefinedTextReveal>

        <GlassContainer className="p-6 md:p-8 mb-8">
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-4">
            Our platform provides a comprehensive suite of tools designed to transform clinical practice through
            advanced dimensional analysis and AI-assisted documentation.
          </p>
        </GlassContainer>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
