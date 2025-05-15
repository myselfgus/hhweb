"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useBackground } from "@/context/background-context"

interface SectionObserverProps {
  sectionId: string
  children: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}

export default function SectionObserver({
  sectionId,
  children,
  className = "",
  threshold = 0.3,
  rootMargin = "-80px 0px 0px 0px", // Default accounts for header height
}: SectionObserverProps) {
  const { setCurrentSection } = useBackground()
  const sectionRef = useRef<HTMLElement>(null)
  const hasIntersected = useRef(false)
  const [isInView, setIsInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Use a more sophisticated approach for mobile
    const isMobile = window.innerWidth < 768

    // Different thresholds for mobile and desktop
    const effectiveThreshold = isMobile ? 0.15 : threshold

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Set local state for component visibility
          setIsInView(entry.isIntersecting)

          // Only trigger section change when actually entering the viewport
          // and when we haven't already triggered for this intersection
          if (entry.isIntersecting && !hasIntersected.current) {
            // Use requestAnimationFrame for smoother transitions
            requestAnimationFrame(() => {
              setCurrentSection(sectionId)
            })
            hasIntersected.current = true
          } else if (!entry.isIntersecting) {
            // Reset when section is out of view
            hasIntersected.current = false
          }
        })
      },
      {
        threshold: effectiveThreshold,
        rootMargin: isMobile ? "-40px 0px 0px 0px" : rootMargin, // Adjusted for mobile
      },
    )

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current && observerRef.current) {
        observerRef.current.unobserve(sectionRef.current)
      }
    }
  }, [sectionId, setCurrentSection, threshold, rootMargin])

  return (
    <section
      id={sectionId}
      ref={sectionRef}
      className={`py-16 md:py-24 relative overflow-hidden ${className} ${isInView ? "section-in-view" : ""}`}
      data-section-id={sectionId}
    >
      {children}
    </section>
  )
}
