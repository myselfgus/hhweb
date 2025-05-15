"use client"

import { useRef, useEffect, type ReactNode, useState } from "react"

interface MouseParallaxProps {
  children: ReactNode
  className?: string
  strength?: number // Strength of the parallax effect (0-1)
  inverted?: boolean // Whether to invert the direction
}

export default function MouseParallax({
  children,
  className = "",
  strength = 0.05,
  inverted = false,
}: MouseParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = container.getBoundingClientRect()

      // Calculate mouse position relative to the center of the container
      const x = (clientX - left - width / 2) * (inverted ? -1 : 1)
      const y = (clientY - top - height / 2) * (inverted ? -1 : 1)

      // Apply strength factor
      const parallaxX = x * strength
      const parallaxY = y * strength

      setPosition({ x: parallaxX, y: parallaxY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [strength, inverted])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  )
}
