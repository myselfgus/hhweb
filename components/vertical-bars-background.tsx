"use client"

import { useEffect, useState, useRef, useMemo } from "react"

interface VerticalBarsBackgroundProps {
  count?: number
  className?: string
  opacity?: number
  color?: "blue" | "light-blue" | "white"
  scrollAnimate?: boolean
}

// Optimize component to reduce the number of bars and simplify transitions
export default function VerticalBarsBackground({
  count = 8, // Reduced from 12 to 8 for better performance
  className = "",
  opacity = 0.08,
  color = "blue",
  scrollAnimate = false,
}: VerticalBarsBackgroundProps) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Define color gradients based on the color prop (memoized)
  const colorGradients = useMemo(
    () => ({
      blue: "from-blue-800 via-blue-600 to-blue-400",
      "light-blue": "from-blue-400 via-blue-300 to-blue-200",
      white: "from-white via-blue-50 to-blue-100",
    }),
    []
  )

  // Create the CSS styles for the bars animation
  const animationStyles = useMemo(
    () => `
      @keyframes barAppear {
        0% { 
          height: 0;
          transform: translateY(100%);
          opacity: 0;
        }
        30% {
          opacity: var(--bar-opacity);
          height: 30%;
        }
        70% {
          height: 90%;
        }
        100% { 
          height: 100%;
          transform: translateY(0);
          opacity: var(--bar-opacity);
        }
      }
      
      .vertical-bar-${color} {
        --bar-opacity: ${opacity};
        animation: barAppear 2.4s cubic-bezier(0.25, 1, 0.3, 1) forwards;
        animation-play-state: paused;
      }
      
      .bars-visible .vertical-bar-${color} {
        animation-play-state: running;
      }
    `,
    [color]
  )

  // Generate the bars array once, not on every render
  const bars = useMemo(
    () =>
      [...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`absolute top-0 bottom-0 bg-gradient-to-b ${colorGradients[color]} vertical-bar-${color}`}
          style={{
          left: `${(i * 100) / count}%`,
          width: `${80 / count}%`,
          // Starting with 0 opacity, the animation will handle the final opacity
          opacity: 0,
          // Animation delay based on index with slightly more variation
            animationDelay: `${i * 0.08}s`,
          }}
        />
      )),
    [count, color, colorGradients, opacity]
  )

  // Use IntersectionObserver to trigger animations when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "50px" } // Increased rootMargin for earlier triggering
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [isVisible])

  return (
    <>
      {/* Add CSS animation styles */}
      <style jsx>{animationStyles}</style>
      
      <div
        ref={containerRef}
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className} ${isVisible ? "bars-visible" : ""}`}
        style={{ zIndex: -1 }}
      >
        <div className="relative w-full h-full">
          {bars}
        </div>
      </div>
    </>
  )
}
