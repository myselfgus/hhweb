"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Code, LineChart } from "lucide-react"

interface DifferentiatorCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}

function DifferentiatorCard({ icon, title, description, delay }: DifferentiatorCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            entries[0].target.classList.add("revealed")
          }, delay)
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [delay])

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-500 opacity-0 translate-y-8 card-entrance hover:shadow-xl hover:translate-y-[-8px] hover:scale-[1.02] hover:border-cyan-100"
    >
      <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-cyan-50 to-cyan-100/30 text-cyan-500 rounded-lg mb-6 border border-cyan-200/15 transition-transform duration-300 hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3 transition-colors duration-300 hover:text-cyan-500">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

export default function Differentiators() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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
    <section id="differentiators" className="py-20" ref={sectionRef}>
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
          What Sets Us Apart?
        </h2>

        <div className="flex flex-col md:flex-row-reverse gap-12 items-center mb-16">
          <div className="md:w-1/2 premium-3d-effect">
            <div className="section-image-container rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:translate-y-[-10px]">
              <Image
                src="/placeholder-a7kr5.png"
                alt="HEALTH/HEALTH Dimensional Diagnosis"
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
              <p className="mt-3 text-center text-sm text-gray-500 italic">10-Vector Dimensional Analysis System</p>
            </div>
          </div>

          <div className="md:w-1/2">
            <DifferentiatorCard
              icon={<Code className="w-7 h-7 stroke-2" />}
              title="Dimensional Diagnosis (10 Clinical Vectors)"
              description="Our innovative approach surpasses categorical diagnoses, using a system of 10 clinical vectors for precise and multifaceted mapping of the patient's mental state."
              delay={150}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="md:w-1/2 premium-3d-effect">
            <div className="section-image-container rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:translate-y-[-10px]">
              <Image
                src="/placeholder.svg?height=400&width=600&query=custom code runtime architecture technical diagram"
                alt="HEALTH/HEALTH Proprietary Runtime"
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
              <p className="mt-3 text-center text-sm text-gray-500 italic">
                IREAJE.CLOUD Runtime and Domain-Specific Languages
              </p>
            </div>
          </div>

          <div className="md:w-1/2">
            <DifferentiatorCard
              icon={<Code className="w-7 h-7 stroke-2" />}
              title="Proprietary Runtime with .aje .ire .e Languages"
              description="We developed IREAJE.CLOUD, a high-performance Eulerian runtime, and proprietary symbolic languages (.aje, .ire, .e) for analysis and processing with unique capabilities."
              delay={300}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="md:w-1/2 premium-3d-effect">
            <div className="section-image-container rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:translate-y-[-10px]">
              <Image
                src="/placeholder.svg?height=400&width=600&query=3D vector visualization of mental state trajectory"
                alt="HEALTH/HEALTH Vector Visualization"
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
              <p className="mt-3 text-center text-sm text-gray-500 italic">Mental State Trajectory Visualization</p>
            </div>
          </div>

          <div className="md:w-1/2">
            <DifferentiatorCard
              icon={<LineChart className="w-7 h-7 stroke-2" />}
              title="Vector Visualization of Mental State"
              description="We transform complex data into dynamic and intuitive visual representations of mental state and its evolution, facilitating clinical insight and therapeutic monitoring."
              delay={450}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
