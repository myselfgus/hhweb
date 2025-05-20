"use client"

import { useEffect, useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

export function OptimizedGradientBackground() {
  const isMobile = useIsMobile()
  const [mount, setMount] = useState(false)
  
  useEffect(() => {
    setMount(true)
    
    // Aplicar otimizações específicas para desktop ou mobile
    if (mount) {
      const container = document.querySelector(".gradients-container");
      if (container) {
        if (isMobile) {
          // Configurações otimizadas para melhor desempenho em dispositivos móveis
          container.classList.add("mobile-optimized");
          container.classList.remove("desktop-optimized");
        } else {
          // Configurações de alta qualidade para desktop
          container.classList.add("desktop-optimized");
          container.classList.remove("mobile-optimized");
        }
      }
    }
    
    return () => {
      // Cleanup ao desmontar o componente
      if (mount) {
        const container = document.querySelector(".gradients-container");
        if (container) {
          container.classList.remove("desktop-optimized");
          container.classList.remove("mobile-optimized");
        }
      }
    }
  }, [isMobile, mount])

  return (
    <div className="gradient-bg fixed-viewport">
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Otimizado com configurações específicas para desktop/mobile */}
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation={isMobile ? "6" : "5"} result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 12 -5" 
              result="goo" 
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="gradients-container">
        {/* Gradientes coloridos com animações otimizadas */}
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="g4"></div>
        <div className="g5"></div>
      </div>
    </div>
  )
}
