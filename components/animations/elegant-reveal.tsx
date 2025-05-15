"use client"

import { useRef, useEffect, type ReactNode } from "react"

interface ElegantRevealProps {
  children: ReactNode
  className?: string
  threshold?: number
  delay?: number
  duration?: number
  distance?: number // Reduced distance for subtlety
  direction?: "up" | "down" | "left" | "right"
  once?: boolean
}

export default function ElegantReveal({
  children,
  className = "",
  threshold = 0.1,
  delay = 0,
  duration = 1000,
  distance = 15, // More subtle movement
  direction = "up",
  once = true,
}: ElegantRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Calculate initial transform based on direction
    let initialTransform = ""
    switch (direction) {
      case "up":
        initialTransform = `translateY(${distance}px)`
        break
      case "down":
        initialTransform = `translateY(-${distance}px)`
        break
      case "left":
        initialTransform = `translateX(${distance}px)`
        break
      case "right":
        initialTransform = `translateX(-${distance}px)`
        break
    }

    // Set initial styles
    section.style.opacity = "0"
    section.style.transform = initialTransform
    section.style.transition = `opacity ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1), transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              section.style.opacity = "1"
              section.style.transform = "translate(0, 0)"
            }, delay)

            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            section.style.opacity = "0"
            section.style.transform = initialTransform
          }
        })
      },
      { threshold },
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [threshold, delay, duration, distance, direction, once])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}
