"use client"

import { Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import SubtleFloat from "./animations/subtle-float"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    // Add subtle parallax scroll effect to background
    const handleScroll = () => {
      if (!heroRef.current) return
      const scrollY = window.scrollY
      const heroElement = heroRef.current

      // Parallax for background - very subtle
      const backgroundElements = heroElement.querySelectorAll(".bg-parallax")
      backgroundElements.forEach((el) => {
        const element = el as HTMLElement
        const speed = Number.parseFloat(element.dataset.speed || "0.03")
        element.style.transform = `translateY(${scrollY * speed}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={heroRef} className="w-full">
      {/* Background decorations with subtle parallax */}
      <div className="absolute inset-0 z-0 bg-parallax" data-speed="0.02"></div>

      <div className="absolute inset-0 z-0 opacity-85 animate-subtle-wave bg-parallax" data-speed="0.03">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-50/5 via-transparent to-blue-900/3"></div>
      </div>

      {/* Subtle floating decorative elements */}
      <SubtleFloat
        className="absolute top-[15%] left-[10%] w-32 h-32 rounded-full bg-gradient-to-r from-cyan-100/10 to-cyan-200/5 blur-xl"
        amplitude={8}
        period={12}
      />

      <SubtleFloat
        className="absolute bottom-[20%] right-[15%] w-40 h-40 rounded-full bg-gradient-to-r from-blue-100/5 to-cyan-100/5 blur-xl"
        amplitude={6}
        period={15}
        delay={1}
      />

      <div className="container mx-auto relative z-1">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent transition-all duration-1200 ease-in-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            An AI-clinician built for care, not bureaucracy.
          </h1>

          <p
            className={`text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 transition-all duration-1200 ease-in-out delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            HEALTH/HEALTH is a dimensional AI platform for psychiatry, powered by symbolic language and a proprietary
            runtime. It delivers diagnostic clarity and therapeutic precision in real time.
          </p>

          <div
            className={`flex flex-col items-center mt-10 transition-all duration-1200 ease-in-out delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="max-w-md w-full bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-500 hover:shadow-xl hover:transform hover:translate-y-[-3px]">
              <div className="mb-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Try now: Upload an audio up to 10 minutes</h3>
                <p className="text-gray-600 text-sm">See what HEALTH/HEALTH can extract from your narrative</p>
              </div>

              <Button
                size="lg"
                className="w-full gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 hover:shadow-md active:scale-[0.99]"
              >
                Upload Audio
                <Mic className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
