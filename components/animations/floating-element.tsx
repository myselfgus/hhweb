"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"

interface FloatingElementProps {
  children: ReactNode
  className?: string
  amplitude?: number // Floating amplitude in pixels
  period?: number // Floating period in seconds
  delay?: number // Delay in seconds
  rotate?: boolean // Whether to add slight rotation
  rotateAmplitude?: number // Rotation amplitude in degrees
}

// Create animation CSS to replace JavaScript animation
const createFloatCSS = (id: string, amplitude: number, period: number, rotate: boolean, rotateAmplitude: number) => {
  return `
    @keyframes float-${id} {
      0% { transform: translateY(0px) ${rotate ? `rotate(0deg)` : ''}; }
      50% { transform: translateY(${-amplitude}px) ${rotate ? `rotate(${rotateAmplitude}deg)` : ''}; }
      100% { transform: translateY(0px) ${rotate ? `rotate(0deg)` : ''}; }
    }
    
    .float-${id} {
      animation: float-${id} ${period}s ease-in-out infinite;
      animation-fill-mode: both;
    }
  `
}

export default function FloatingElement({
  children,
  className = "",
  amplitude = 15,
  period = 5,
  delay = 0,
  rotate = false,
  rotateAmplitude = 2,
}: FloatingElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  // Generate a unique ID for this component instance to use in CSS animations
  const [uniqueId] = useState(() => Math.floor(Math.random() * 10000).toString())
  
  // Create CSS animation
  const animationCSS = createFloatCSS(uniqueId, amplitude, period, rotate, rotateAmplitude)
  
  // Handle visibility with IntersectionObserver
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    
    // Apply delay as animation-delay style instead of setTimeout
    if (delay > 0) {
      element.style.animationDelay = `${delay}s`
    }
    
    // Only animate when element is visible in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            element.style.animationPlayState = 'running'
          } else {
            element.style.animationPlayState = 'paused'
          }
        })
      },
      { threshold: 0.1 }
    )
    
    observer.observe(element)
    
    return () => {
      if (element) observer.unobserve(element)
    }
  }, [delay])

  return (
    <>
      {/* Inject the animation styles */}
      <style jsx>{animationCSS}</style>
      
      <div 
        ref={elementRef} 
        className={`float-${uniqueId} ${className}`}
        style={{ 
          willChange: "transform",
          animationPlayState: isVisible ? 'running' : 'paused' 
        }}
      >
        {children}
      </div>
    </>
  )
}
