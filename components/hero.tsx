"use client"

import { Mic } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import SubtleFloat from "./animations/subtle-float"
import AnimatedLogo from "./animated-logo"

const logoAnimationStyles = `
  @keyframes logoPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  .logo-pulse {
    animation: logoPulse 1.5s ease-in-out;
  }
`

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

  useEffect(() => {
    // Automatically trigger the logo animation effect periodically
    const interval = setInterval(() => {
      const logoElement = document.querySelector(".logo-auto-animate")
      if (logoElement) {
        // Add a class to trigger animation
        logoElement.classList.add("logo-pulse")

        // Remove the class after animation completes
        setTimeout(() => {
          logoElement.classList.remove("logo-pulse")
        }, 1500)
      }
    }, 5000) // Repeat every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style jsx>{logoAnimationStyles}</style>
      <div ref={heroRef} className="w-full">
        {/* Background decorations with subtle parallax */}
        <div className="absolute inset-0 z-0 bg-parallax" data-speed="0.02" style={{opacity:0.08}}></div>

        <div className="absolute inset-0 z-0 animate-subtle-wave bg-parallax" data-speed="0.03" style={{opacity:0.06}}>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-50/5 via-transparent to-blue-900/3"></div>
        </div>

        {/* Subtle floating decorative elements */}
        <SubtleFloat
          className="absolute top-[15%] left-[10%] w-32 h-32 rounded-full bg-gradient-to-r from-cyan-100/10 to-cyan-200/5 blur-xl"
          amplitude={8}
          period={12}
        >
          {/* Elemento decorativo, sem children visuais */}
        </SubtleFloat>

        <SubtleFloat
          className="absolute bottom-[20%] right-[15%] w-40 h-40 rounded-full bg-gradient-to-r from-blue-100/5 to-cyan-100/5 blur-xl"
          amplitude={6}
          period={15}
          delay={1}
        >
          {/* Elemento decorativo, sem children visuais */}
        </SubtleFloat>

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className={`mb-8 flex justify-center transition-all duration-1200 ease-in-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="logo-auto-animate">
                <AnimatedLogo size="lg" className="w-24 h-24" />
              </div>
            </div>

            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight logo-gradient-text transition-all duration-1200 ease-in-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              An AI-clinician built for care, not bureaucracy.
            </h1>

            <p
              className={`text-base md:text-xl text-blue-800 max-w-2xl mx-auto mb-6 md:mb-10 transition-all duration-1200 ease-in-out delay-300 ${
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
              <div className="max-w-md w-full bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg border border-blue-100 transition-all duration-500 hover:shadow-xl hover:transform hover:translate-y-[-3px]">
                <div className="mb-6 text-center">
                  <h3 className="text-lg font-semibold text-blue-900 mb-1">
                    Try now: Upload an audio up to 10 minutes
                  </h3>
                  <p className="text-blue-700 text-sm">See what HEALTH/HEALTH can extract from your narrative</p>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-3 px-6 rounded-md font-medium transition-all duration-300 hover:shadow-md active:scale-[0.99]">
                  Upload Audio
                  <Mic className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
