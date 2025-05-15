"use client"

import { useEffect, useState, useRef } from "react"
import AnimatedLogo from "./animated-logo"

interface SplashScreenProps {
  onComplete: () => void
  duration?: number
}

export default function SplashScreen({ onComplete, duration = 3500 }: SplashScreenProps) {
  const [animationStage, setAnimationStage] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Stage 1: Initial bars appear
    setAnimationStage(1)

    // Stage 2: Logo appears
    timeoutRef.current = setTimeout(() => {
      setAnimationStage(2)
    }, 800)

    // Stage 3: Bars expand
    timeoutRef.current = setTimeout(() => {
      setAnimationStage(3)
    }, 1600)

    // Stage 4: Fade out and complete
    timeoutRef.current = setTimeout(() => {
      setAnimationStage(4)

      // Call onComplete after fade out animation
      timeoutRef.current = setTimeout(() => {
        onComplete()
      }, 800)
    }, duration)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [duration, onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-800 ${
        animationStage === 4 ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background bars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 bg-gradient-to-b from-blue-800 to-blue-400"
            style={{
              left: `${(i * 100) / 15}%`,
              width: `${80 / 15}%`,
              opacity: animationStage >= 1 ? 0.08 : 0,
              height: animationStage >= 3 ? "100%" : "0%",
              transform: `translateY(${animationStage >= 3 ? "0%" : "100%"})`,
              transition: "opacity 0.8s ease-out, height 1.2s ease-out, transform 1.2s ease-out",
              transitionDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with special animation */}
        <div
          className={`transition-all duration-1000 ease-out ${
            animationStage >= 2 ? "opacity-100 transform-none" : "opacity-0 scale-50"
          }`}
        >
          <AnimatedLogo size="lg" className="w-32 h-32" animated={true} />
        </div>

        {/* Brand name */}
        <h1
          className={`mt-6 text-4xl font-bold logo-gradient-text transition-all duration-1000 ease-out ${
            animationStage >= 2 ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
          }`}
        >
          HEALTH/HEALTH
        </h1>

        {/* Tagline */}
        <p
          className={`mt-3 text-lg text-blue-800 transition-all duration-1000 ease-out ${
            animationStage >= 2 ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          Dimensional Vector Psychiatry
        </p>
      </div>
    </div>
  )
}
