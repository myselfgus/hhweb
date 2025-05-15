"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface AnimatedLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  animated?: boolean
  splashMode?: boolean
}

export default function AnimatedLogo({
  className = "",
  size = "md",
  animated = true,
  splashMode = false,
}: AnimatedLogoProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true) // Always animate

  useEffect(() => {
    setIsVisible(true)

    if (!splashMode) {
      // Set up continuous animation cycle for normal mode
      const animationInterval = setInterval(() => {
        setIsAnimating(false)

        // Small delay before starting animation again
        setTimeout(() => {
          setIsAnimating(true)
        }, 100)
      }, 4000) // Cycle every 4 seconds

      return () => clearInterval(animationInterval)
    }
  }, [splashMode])

  const sizeMap = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
  }

  const { width, height } = sizeMap[size]

  return (
    <div className={`relative ${className}`}>
      {animated && (
        <div
          className={`absolute inset-0 flex justify-center items-center transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Vertical bars */}
          <div className="relative w-full h-full">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-[8%] bg-gradient-to-b from-blue-800 to-blue-400 rounded-sm transition-all duration-500"
                style={{
                  left: `${i * 16}%`,
                  height: isAnimating ? "100%" : "90%",
                  opacity: isAnimating ? 1 : 0.8,
                  transitionDelay: splashMode ? `${i * 0.1}s` : `${i * 0.05}s`,
                }}
              ></div>
            ))}

            {/* Center sphere */}
            <div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-gradient-to-br from-blue-300 via-blue-500 to-blue-800 transition-all duration-500 ${
                isAnimating ? "scale-110" : "scale-100"
              }`}
            >
              <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-white/30"></div>
            </div>
          </div>
        </div>
      )}

      {/* Actual logo image (fallback and for non-animated version) */}
      <div className={`transition-opacity duration-500 ${animated ? "opacity-0" : "opacity-100"}`}>
        <Image
          src="/health-health-logo.png"
          alt="HEALTH/HEALTH Logo"
          width={width}
          height={height}
          className="object-contain"
        />
      </div>
    </div>
  )
}
