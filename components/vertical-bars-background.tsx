"use client"

import { useEffect, useState, useRef } from "react"

interface VerticalBarsBackgroundProps {
  count?: number
  className?: string
  opacity?: number
  color?: "blue" | "light-blue" | "white"
  scrollAnimate?: boolean
}

export default function VerticalBarsBackground({
  count = 12,
  className = "",
  opacity = 0.08,
  color = "blue",
  scrollAnimate = true,
}: VerticalBarsBackgroundProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>()
  const previousScrollY = useRef<number>(0)

  // Define color gradients based on the color prop
  const colorGradients = {
    blue: "from-blue-800 to-blue-400",
    "light-blue": "from-blue-400 to-blue-200",
    white: "from-white to-blue-50",
  }

  // Smooth scroll animation using requestAnimationFrame
  const animate = () => {
    if (!containerRef.current || !scrollAnimate) return

    const rect = containerRef.current.getBoundingClientRect()
    const windowHeight = window.innerHeight

    // Calculate how far the element is through the viewport
    // 0 = just entered, 1 = just left
    let targetProgress = 0
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      targetProgress = (windowHeight - rect.top) / (windowHeight + rect.height)
      targetProgress = Math.min(Math.max(targetProgress, 0), 1)
    }

    // Smooth the progress value
    setScrollProgress((prev) => {
      const delta = targetProgress - prev
      return prev + delta * 0.1 // Adjust this value for smoother/faster transitions
    })

    requestRef.current = requestAnimationFrame(animate)
  }

  // Check if element is in viewport and handle scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0].isIntersecting
        if (isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    // Start animation loop
    if (scrollAnimate) {
      requestRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isVisible, scrollAnimate])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    >
      <div className="relative w-full h-full">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className={`absolute top-0 bottom-0 bg-gradient-to-b ${colorGradients[color]}`}
            style={{
              left: `${(i * 100) / count}%`,
              width: `${80 / count}%`,
              opacity: opacity,
              height: scrollAnimate ? `${Math.min(100, scrollProgress * 150)}%` : "100%",
              transform: scrollAnimate ? `translateY(${Math.max(0, (1 - scrollProgress) * 30)}%)` : "none",
              transition:
                "height 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out",
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
