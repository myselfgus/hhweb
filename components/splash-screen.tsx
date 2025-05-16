"use client"

import { useEffect, useState, useRef } from "react"
import AnimatedLogo from "./animated-logo"

interface SplashScreenProps {
  onComplete: () => void
  duration?: number
}

export default function SplashScreen({ onComplete, duration = 5000 }: SplashScreenProps) {
  const [animationStage, setAnimationStage] = useState(0)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    // Track all timeouts to clean them up properly
    const timeouts: NodeJS.Timeout[] = []
    
    // Function to safely create timeouts
    const createTimeout = (callback: () => void, delay: number) => {
      const timeout = setTimeout(callback, delay)
      timeouts.push(timeout)
      return timeout
    }

    // Stage 1: Initial bars appear (immediately)
    setAnimationStage(1)

    // Stage 2: Logo appears
    createTimeout(() => {
      setAnimationStage(2)
    }, 1600) // Mais tempo para garantir que seja visto

    // Stage 3: Bars expand
    createTimeout(() => {
      setAnimationStage(3)
    }, 3000) // Mais tempo para garantir que a animação seja apreciada

    // Stage 4: Fade out e complete com transição mais suave
    createTimeout(() => {
      setAnimationStage(4)

      // Call onComplete with smoother timing
      createTimeout(() => {
        onComplete()
      }, 1000) // Tempo reduzido para transição mais suave
    }, duration)

    // Store all timeouts in the ref for potential access outside this effect
    timeoutsRef.current = timeouts

    // Clean up all timeouts on unmount
    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [duration, onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-all duration-1500 ease-out ${
        animationStage === 4 ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Background bars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 bg-gradient-to-b from-blue-800 via-blue-600 to-blue-400 splash-bar-reveal"
            style={{
              left: `${(i * 100) / 15}%`,
              width: `${80 / 15}%`,
              opacity: 0, // Começa com opacidade 0, a animação controlará a visibilidade
              height: "0%", // Começa com altura 0, a animação controlará a altura
              transform: "translateY(100%)", // Começa fora da tela
              transition: "opacity 1.2s ease-out, height 1.8s ease-out, transform 1.8s ease-in-out",
              transitionDelay: `${i * 0.08}s`,
              animationDelay: `${i * 0.08}s`,
              animationPlayState: animationStage >= 1 ? "running" : "paused",
              // Quando atingir o estágio 3, aplicar estas propriedades via Javascript para garantir
              ...(animationStage >= 3 ? {
                opacity: 0.08,
                height: "100%",
                transform: "translateY(0%)",
              } : {})
            }}
          />
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with special animation */}
        <div
          className={`transition-all duration-1400 ease-out splash-logo-reveal ${
            animationStage >= 2 ? "opacity-100 transform-none" : "opacity-0 scale-50"
          }`}
          style={{ animationPlayState: animationStage >= 2 ? "running" : "paused" }}
        >
          <AnimatedLogo size="lg" className="w-32 h-32" animated={true} />
        </div>

        {/* Brand name */}
        <h1
          className={`mt-6 text-4xl font-bold logo-gradient-text transition-all duration-1400 ease-out ${
            animationStage >= 2 ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
          }`}
        >
          HEALTH/HEALTH
        </h1>

        {/* Tagline */}
        <p
          className={`mt-3 text-lg text-blue-800 transition-all duration-1400 ease-out ${
            animationStage >= 2 ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          Dimensional Vector Psychiatry
        </p>
      </div>
    </div>
  )
}
