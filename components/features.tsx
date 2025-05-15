"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { PlusIcon, LineChart, PlusCircle, FileText, HelpCircle } from "lucide-react"
import ElegantReveal from "./animations/elegant-reveal"
import RefinedTextReveal from "./animations/refined-text-reveal"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  index: number
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <ElegantReveal
      className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-500 hover:shadow-xl hover:translate-y-[-3px] hover:border-cyan-100"
      delay={100 * index}
      distance={10}
      direction={index % 2 === 0 ? "up" : "down"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-14 h-14 flex items-center justify-center bg-gradient-to-br from-cyan-50 to-cyan-100/30 text-cyan-500 rounded-lg mb-6 border border-cyan-200/15 transition-all duration-300 ${
          isHovered ? "scale-105" : ""
        }`}
      >
        {icon}
      </div>
      <h3
        className={`text-xl font-semibold mb-3 transition-all duration-300 ${
          isHovered ? "text-cyan-500 translate-x-0.5" : "text-gray-900"
        }`}
      >
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            HEALTH/HEALTH Key Capabilities
          </h2>
        </RefinedTextReveal>

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
