"use client"

import { useRef, useEffect, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  threshold?: number // Visibility threshold (0-1)
  delay?: number // Delay in ms
  duration?: number // Animation duration in ms
  distance?: number // Initial transform distance in px
  direction?: "up" | "down" | "left" | "right" // Direction of entrance
  once?: boolean // Whether to animate only once
  stagger?: boolean // Whether to stagger children animations
  staggerDelay?: number // Delay between staggered children in ms
}

export default function ScrollReveal({
  children,
  className = "",
  threshold = 0.1,
  delay = 0,
  duration = 800,
  distance = 40,
  direction = "up",
  once = true,
  stagger = false,
  staggerDelay = 100,
}: ScrollRevealProps) {
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
    section.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`

    // Handle staggered children
    if (stagger) {
      const children = Array.from(section.children)
      children.forEach((child, index) => {
        const element = child as HTMLElement
        element.style.opacity = "0"
        element.style.transform = initialTransform
        element.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${
          delay + index * staggerDelay
        }ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay + index * staggerDelay}ms`
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (stagger) {
              // Reveal children with staggered delay
              const children = Array.from(section.children)
              children.forEach((child, index) => {
                setTimeout(() => {
                  const element = child as HTMLElement
                  element.style.opacity = "1"
                  element.style.transform = "translate(0, 0)"
                }, index * staggerDelay)
              })
            } else {
              // Reveal the entire section
              setTimeout(() => {
                section.style.opacity = "1"
                section.style.transform = "translate(0, 0)"
              }, delay)
            }

            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            // Reset if not once and out of view
            if (stagger) {
              const children = Array.from(section.children)
              children.forEach((child) => {
                const element = child as HTMLElement
                element.style.opacity = "0"
                element.style.transform = initialTransform
              })
            } else {
              section.style.opacity = "0"
              section.style.transform = initialTransform
            }
          }
        })
      },
      { threshold },
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [threshold, delay, duration, distance, direction, once, stagger, staggerDelay])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}
