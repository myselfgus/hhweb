"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"

interface RefinedParallaxProps {
  children: ReactNode
  className?: string
  speed?: number // Lower values for more subtle effect
  direction?: "up" | "down"
}

export default function RefinedParallax({
  children,
  className = "",
  speed = 0.05, // Much more subtle default
  direction = "up",
}: RefinedParallaxProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const { top, height } = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate how far the section is from the center of the viewport
      const distanceFromCenter = top - windowHeight / 2 + height / 2

      // Calculate the parallax offset based on the distance from center
      const parallaxOffset = distanceFromCenter * speed * (direction === "up" ? -1 : 1)

      setOffset(parallaxOffset)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [speed, direction])

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div
        style={{
          transform: `translateY(${offset}px)`,
          transition: "transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      >
        {children}
      </div>
    </div>
  )
}
