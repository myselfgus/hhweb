"use client"

import { useEffect, useState } from "react"

interface AnimatedSphereProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  opacity?: number
  animated?: boolean
}

export default function AnimatedSphere({
  className = "",
  size = "md",
  opacity = 0.3, // Reduced default opacity
  animated = true,
}: AnimatedSphereProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const sizeMap = {
    sm: "w-16 h-16",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
  }

  return (
    <div
      className={`relative ${sizeMap[size]} ${className} transition-all duration-1500 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
      style={{ opacity }}
    >
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-br from-blue-300/80 via-blue-500/80 to-blue-800/80 ${
          animated ? "subtle-fade" : ""
        }`}
      >
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-white/20"></div>
      </div>
    </div>
  )
}
