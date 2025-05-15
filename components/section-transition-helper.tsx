"use client"

import { useEffect, useRef } from "react"
import { useBackground } from "@/context/background-context"

interface SectionTransitionHelperProps {
  fromSection: string
  toSection: string
  className?: string
}

export default function SectionTransitionHelper({
  fromSection,
  toSection,
  className = "",
}: SectionTransitionHelperProps) {
  const helperRef = useRef<HTMLDivElement>(null)
  const { currentSection } = useBackground()

  useEffect(() => {
    const handleScroll = () => {
      if (!helperRef.current) return

      // Get the positions of the from and to sections
      const fromElement = document.getElementById(fromSection)
      const toElement = document.getElementById(toSection)

      if (!fromElement || !toElement) return

      const fromRect = fromElement.getBoundingClientRect()
      const toRect = toElement.getBoundingClientRect()

      // Calculate how far we are in the transition
      // When fromSection bottom is at viewport bottom, progress is 0
      // When toSection top is at viewport top, progress is 1
      const viewportHeight = window.innerHeight
      const fromBottom = fromRect.bottom
      const toTop = toRect.top

      let progress = 0

      if (fromBottom <= viewportHeight) {
        // Start transition when fromSection is leaving viewport
        progress = Math.min(1, (viewportHeight - fromBottom) / (viewportHeight + toTop - fromBottom))
      }

      // Apply styles based on progress
      if (helperRef.current) {
        helperRef.current.style.opacity = progress.toString()
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [fromSection, toSection, currentSection])

  // Only show when we're in the fromSection or toSection
  const isActive = currentSection === fromSection || currentSection === toSection

  if (!isActive) return null

  return (
    <div
      ref={helperRef}
      className={`fixed inset-0 pointer-events-none z-0 opacity-0 transition-opacity duration-500 ${className}`}
      style={{
        background: `linear-gradient(to bottom, rgba(160, 208, 255, 0), rgba(37, 99, 235, 0.1))`,
      }}
    />
  )
}
