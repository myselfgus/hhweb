"use client"

// Vamos simplificar este componente para evitar animações contínuas baseadas em scroll
// e fazer as barras surgirem de baixo para cima e depois ficarem estáticas

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
  scrollAnimate = false, // Mudamos o padrão para false
}: VerticalBarsBackgroundProps) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Define color gradients based on the color prop
  const colorGradients = {
    blue: "from-blue-800 to-blue-400",
    "light-blue": "from-blue-400 to-blue-200",
    white: "from-white to-blue-50",
  }

  // Simplificamos para apenas verificar se o elemento está visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
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
              height: isVisible ? "100%" : "0%",
              transform: isVisible ? "translateY(0)" : "translateY(100%)",
              transition:
                "height 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out",
              transitionDelay: `${i * 0.05}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
