"use client"

import { useRef, useEffect, type ReactNode } from "react"

interface RefinedTextRevealProps {
  children: ReactNode
  className?: string
  threshold?: number
  delay?: number
  duration?: number
  once?: boolean
}

export default function RefinedTextReveal({
  children,
  className = "",
  threshold = 0.1,
  delay = 0,
  duration = 1200,
  once = true,
}: RefinedTextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const textElement = textRef.current
    if (!textElement) return

    // Set initial opacity
    textElement.style.opacity = "0"
    textElement.style.transition = `opacity ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms`

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            textElement.style.opacity = "1"

            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            textElement.style.opacity = "0"
          }
        })
      },
      { threshold },
    )

    observer.observe(textElement)

    return () => {
      observer.disconnect()
    }
  }, [threshold, delay, duration, once])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}
