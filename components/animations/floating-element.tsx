"use client"

import { useRef, useEffect, type ReactNode } from "react"

interface FloatingElementProps {
  children: ReactNode
  className?: string
  amplitude?: number // Floating amplitude in pixels
  period?: number // Floating period in seconds
  delay?: number // Delay in seconds
  rotate?: boolean // Whether to add slight rotation
  rotateAmplitude?: number // Rotation amplitude in degrees
}

export default function FloatingElement({
  children,
  className = "",
  amplitude = 15,
  period = 5,
  delay = 0,
  rotate = false,
  rotateAmplitude = 2,
}: FloatingElementProps) {
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

        // Sine wave for smooth floating
        const floatOffset = amplitude * Math.sin(normalizedPosition * Math.PI * 2)

        // Optional rotation
        let rotateValue = 0
        if (rotate) {
          rotateValue = rotateAmplitude * Math.sin(normalizedPosition * Math.PI * 2)
        }

        element.style.transform = `translateY(${floatOffset}px) rotate(${rotateValue}deg)`

        requestAnimationFrame(animate)
      }

      const animationFrame = requestAnimationFrame(animate)

      return () => {
        cancelAnimationFrame(animationFrame)
      }
    }, delayMs)
  }, [amplitude, period, delay, rotate, rotateAmplitude])

  return (
    <div ref={elementRef} className={`transition-transform ${className}`} style={{ willChange: "transform" }}>
      {children}
    </div>
  )
}
