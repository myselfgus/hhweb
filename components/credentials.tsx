"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { FileText, Server } from "lucide-react"

interface CredentialCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  logo?: string
  delay: number
}

function CredentialCard({ title, description, icon, logo, delay }: CredentialCardProps) {
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
      className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-500 opacity-0 translate-y-8 card-entrance hover:shadow-xl hover:translate-y-[-8px] text-center"
    >
      {logo ? (
        <Image
          src={logo || "/placeholder.svg"}
          alt={`${title} Logo`}
          width={150}
          height={40}
          className="h-10 w-auto mx-auto mb-6 object-contain"
        />
      ) : icon ? (
        <div className="w-14 h-14 mx-auto flex items-center justify-center bg-gradient-to-br from-cyan-50 to-cyan-100/30 text-cyan-500 rounded-lg mb-6 border border-cyan-200/15">
          {icon}
        </div>
      ) : null}

      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

export default function Credentials() {
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
    <section id="credentials" className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
          Credentials and Validation
        </h2>

        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="md:w-1/2 premium-3d-effect">
            <div className="section-image-container rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:translate-y-[-10px]">
              <Image
                src="/placeholder.svg?height=400&width=600&query=Microsoft for Startups integration diagram"
                alt="HEALTH/HEALTH Microsoft Partnership"
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
              <p className="mt-3 text-center text-sm text-gray-500 italic">
                Microsoft for Startups Founders Hub Integration
              </p>
            </div>
          </div>

          <div className="md:w-1/2">
            <CredentialCard
              title="Microsoft for Startups"
              description="Selected for the prestigious Microsoft for Startups Founders Hub program, receiving technical support, resources, and validation from Microsoft for our innovative technology."
              logo="/placeholder.svg?height=40&width=150&query=microsoft for startups logo"
              delay={150}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-12 items-center mb-16">
          <div className="md:w-1/2 premium-3d-effect">
            <div className="section-image-container rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:translate-y-[-10px]">
              <Image
                src="/placeholder.svg?height=400&width=600&query=scientific research medical framework visualization"
                alt="HEALTH/HEALTH Scientific Research"
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
              <p className="mt-3 text-center text-sm text-gray-500 italic">VINTRA Framework Scientific Foundation</p>
            </div>
          </div>

          <div className="md:w-1/2">
            <CredentialCard
              title="Ongoing Scientific Research"
              description="Our platform is based on the VINTRA framework, the result of extensive scientific research, with ongoing studies and publications for continuous validation and improvement."
              icon={<FileText className="w-7 h-7 stroke-2" />}
              delay={300}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 premium-3d-effect">
            <div className="section-image-container rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:translate-y-[-10px]">
              <Image
                src="/placeholder.svg?height=400&width=600&query=GPU computing architecture high performance"
                alt="HEALTH/HEALTH GPU Architecture"
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
              <p className="mt-3 text-center text-sm text-gray-500 italic">High-Performance Computing Infrastructure</p>
            </div>
          </div>

          <div className="md:w-1/2">
            <CredentialCard
              title="GPU-Ready Architecture (NVIDIA-ready)"
              description="Our IREAJE.CLOUD infrastructure is optimized for high-performance computing, ready for NVIDIA GPUs, essential for AI algorithms and advanced dimensional processing."
              icon={<Server className="w-7 h-7 stroke-2" />}
              delay={450}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
