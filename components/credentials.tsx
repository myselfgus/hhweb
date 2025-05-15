"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { FileText, Server } from "lucide-react"
import GlassContainer from "./glass-container"
import { useBackground } from "@/context/background-context"

interface CredentialCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  logo?: string
  delay: number
}

function CredentialCard({ title, description, icon, logo, delay }: CredentialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { accentColor } = useBackground()

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
      className="transition-all duration-800 opacity-0 translate-y-8 card-entrance hover:translate-y-[-8px] text-center"
    >
      <GlassContainer className="p-6 h-full">
        {logo ? (
          <Image
            src={logo || "/placeholder.svg"}
            alt={`${title} Logo`}
            width={150}
            height={40}
            className="h-10 w-auto mx-auto mb-6 object-contain"
          />
        ) : icon ? (
          <div
            className={`w-14 h-14 mx-auto flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100/30 text-${accentColor} rounded-lg mb-6 border border-blue-200/15`}
          >
            {icon}
          </div>
        ) : null}

        <h3 className="text-xl font-semibold text-blue-900 mb-3">{title}</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </GlassContainer>
    </div>
  )
}

export default function Credentials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { isTransitioning } = useBackground()

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
    <section
      id="credentials"
      ref={sectionRef}
      className="py-20 relative"
      style={{
        willChange: isTransitioning ? "transform, opacity" : "auto",
        transition: "background-color 1.2s ease-out",
      }}
    >
      {/* Add a transition helper at the bottom of the section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-blue-400/10 pointer-events-none"></div>

      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 logo-gradient-text">
          Credentials and Validation
        </h2>

        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="md:w-1/2 premium-3d-effect">
            <div className="section-image-container rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:translate-y-[-10px]">
              <Image
                src="/placeholder-7lcc8.png"
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
              logo="/placeholder-hpmi1.png"
              delay={150}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-12 items-center mb-16">
          <div className="md:w-1/2 premium-3d-effect">
            <div className="section-image-container rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:translate-y-[-10px]">
              <Image
                src="/placeholder-dq8la.png"
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
                src="/placeholder-3lbvh.png"
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
