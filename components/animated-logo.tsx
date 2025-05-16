"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import Image from "next/image"

interface AnimatedLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  animated?: boolean
  splashMode?: boolean
}

// CSS para animação das barras e esfera
const logoAnimationCSS = `
  @keyframes logoBarAnimation {
    0% { height: 90%; opacity: 0.8; }
    50% { height: 100%; opacity: 1; }
    100% { height: 90%; opacity: 0.8; }
  }
  @keyframes logoSphereAnimation {
    0% { transform: scale(1); }
    50% { transform: scale(1.10); }
    100% { transform: scale(1); }
  }
  .logo-bar {
    animation: logoBarAnimation 4s infinite ease-in-out;
  }
  .logo-sphere {
    animation: logoSphereAnimation 4s infinite ease-in-out;
  }
  .splash-mode .logo-bar,
  .splash-mode .logo-sphere {
    animation-play-state: paused;
  }
`

export default function AnimatedLogo({
  className = "",
  size = "md",
  animated = true,
  splashMode = false,
}: AnimatedLogoProps) {
  const [isVisible, setIsVisible] = useState(false)
  const isMounted = useRef(true)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isMounted.current) setIsVisible(true)
    }, 50)
    return () => {
      clearTimeout(timeout)
      isMounted.current = false
    }
  }, [])

  const sizeMap = useMemo(
    () => ({
      sm: { width: 32, height: 32 },
      md: { width: 48, height: 48 },
      lg: { width: 64, height: 64 },
    }),
    []
  )
  const { width, height } = sizeMap[size]

  // Barras verticais
  const bars = useMemo(
    () =>
      [...Array(7)].map((_, i) => (
        <div
          key={i}
          className={`absolute top-0 bottom-0 w-[8%] bg-gradient-to-b from-blue-800 to-blue-400 rounded-sm logo-bar`}
          style={{
            left: `${i * 16}%`,
            animationDelay: `${i * 0.1}s`,
          }}
        ></div>
      )),
    []
  )

  // Esfera centralizada
  // O centro do logo hh-logo.png é no centro do container, então a esfera deve ficar exatamente no centro
  return (
    <>
      <style jsx global>{logoAnimationCSS}</style>
      <div ref={logoRef} className={`relative ${className}`} style={{ width, height }}>
        {animated && (
          <div
            className={`absolute inset-0 flex justify-center items-center transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            } ${splashMode ? "splash-mode" : ""}`}
          >
            {/* Barras verticais */}
            <div className="absolute inset-0 w-full h-full">
              {bars}
            </div>
            {/* Esfera centralizada por flex */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[50%] h-[50%] rounded-full bg-gradient-to-br from-blue-300 via-blue-500 to-blue-800 logo-sphere"
              >
                <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-white/30"></div>
              </div>
            </div>
          </div>
        )}
        {/* Fallback: logo final para SEO/acessibilidade e caso animated=false */}
        <div className={`transition-opacity duration-500 ${animated ? "opacity-0" : "opacity-100"}`}>
          <Image
            src="/hh-logo.png"
            alt="HEALTH/HEALTH Logo"
            width={width}
            height={height}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </>
  )
}
