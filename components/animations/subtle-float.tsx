"use client"

import { useRef, useEffect, type ReactNode } from "react"

interface SubtleFloatProps {
  children: ReactNode
  className?: string
  amplitude?: number
  period?: number
  delay?: number
}

export default function SubtleFloat({
  children,
  className = "",
  amplitude = 5, // Very subtle movement
  period = 8, // Slower period
  delay = 0,
}: SubtleFloatProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Convert period to milliseconds
    const periodMs = period * 1000
    const delayMs = delay * 1000

    // Initial delay
    setTimeout(() => {
      // Start animation
      const startTime = Date.now()

      const animate = () => {
        const now = Date.now()
        const elapsed = now - startTime
        const position = elapsed % periodMs
        const normalizedPosition = position / periodMs

        // Sine wave for smooth floating - very subtle
        const floatOffset = amplitude * Math.sin(normalizedPosition * Math.PI * 2)

        element.style.transform = `translateY(${floatOffset}px)`

        requestAnimationFrame(animate)
      }

      const animationFrame = requestAnimationFrame(animate)

      return () => {
        cancelAnimationFrame(animationFrame)
      }
    }, delayMs)
  }, [amplitude, period, delay])

  return (
    <div ref={elementRef} className={`transition-transform ${className}`} style={{ willChange: "transform" }}>
      {children}
    </div>
  )
}
