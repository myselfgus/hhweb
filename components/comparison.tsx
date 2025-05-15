"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react"
import GlassContainer from "./glass-container"
import { useBackground } from "@/context/background-context"

type CompetitorValue = "true" | "false" | "partial"

interface CompetitorCard {
  name: string
  value: CompetitorValue
  note?: string
  featured?: boolean
}

interface CarouselSlide {
  title: string
  description: string
  competitors: CompetitorCard[]
}

const slides: CarouselSlide[] = [
  {
    title: "Feature Richness",
    description: "Compare the breadth and depth of features offered by various solutions.",
    competitors: [
      { name: "HEALTH/HEALTH", value: "true", featured: true },
      { name: "Competitor A", value: "partial", note: "Limited to basic diagnostic features" },
      { name: "Competitor B", value: "false", note: "Lacks dimensional analysis" },
      { name: "Competitor C", value: "partial", note: "Missing several advanced features" },
    ],
  },
  {
    title: "Diagnostic Accuracy",
    description: "Comparison of diagnostic precision and multidimensional analysis.",
    competitors: [
      { name: "HEALTH/HEALTH", value: "true", featured: true },
      { name: "Competitor A", value: "partial", note: "Uses only categorical diagnostics" },
      { name: "Competitor B", value: "partial", note: "Limited dimensional approach" },
      { name: "Competitor C", value: "false", note: "Traditional approach only" },
    ],
  },
  {
    title: "Integration Capabilities",
    description: "Ability to integrate with existing systems and workflows.",
    competitors: [
      { name: "HEALTH/HEALTH", value: "true", featured: true },
      { name: "Competitor A", value: "partial", note: "Limited API access" },
      { name: "Competitor B", value: "true", note: "Good but lacks customization" },
      { name: "Competitor C", value: "false", note: "Closed ecosystem" },
    ],
  },
]

function CompetitorCard({ name, value, note, featured }: CompetitorCard) {
  const { accentColor } = useBackground()

  return (
    <GlassContainer
      className={`p-4 transition-all duration-300 hover:translate-y-[-3px] ${
        featured ? "bg-blue-50/80" : "bg-white/60"
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border border-gray-300 rounded-sm"></div>
          <span className={`font-medium ${featured ? `text-${accentColor} font-semibold` : "text-gray-700"}`}>
            {name}
          </span>
        </div>

        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center ${
            value === "true"
              ? "bg-green-500 text-white"
              : value === "partial"
                ? "bg-yellow-500 text-gray-900"
                : "bg-red-500 text-white"
          }`}
        >
          {value === "true" && <Check className="w-4 h-4" />}
          {value === "false" && <X className="w-4 h-4" />}
          {value === "partial" && <span className="text-xs font-bold">~</span>}
        </div>
      </div>

      {note && <p className="text-sm text-gray-700">{note}</p>}
    </GlassContainer>
  )
}

export default function Comparison() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { accentColor } = useBackground()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  if (isMobile) {
    return null // Hide on mobile
  }

  return (
    <section id="comparison" className="py-20 relative overflow-hidden">
      {/* Remove vertical bars */}

      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 logo-gradient-text">
          HEALTH/HEALTH vs. Existing Solutions
        </h2>

        <GlassContainer className="p-6 mb-16">
          <p className="text-center text-gray-700 max-w-3xl mx-auto">
            See how HEALTH/HEALTH positions itself in relation to available clinical documentation and analysis tools.
            Our platform is designed to overcome inherent limitations and deliver superior clinical value.
          </p>
        </GlassContainer>

        <div className="max-w-5xl mx-auto relative px-10">
          <GlassContainer className="overflow-hidden rounded-xl shadow-xl">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="min-w-full p-8">
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-2">{slide.title}</h3>
                    <p className="text-gray-700">{slide.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {slide.competitors.map((competitor, idx) => (
                      <CompetitorCard key={idx} {...competitor} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassContainer>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 flex items-center justify-center text-gray-700 shadow-md hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 hover:scale-105"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 flex items-center justify-center text-gray-700 shadow-md hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 hover:scale-105"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSlide === index ? `bg-${accentColor} transform scale-125` : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
