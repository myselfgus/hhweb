"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { useBackground } from "@/context/background-context"

interface SectionObserverProps {
  sectionId: string
  children: React.ReactNode
  className?: string
  threshold?: number
}

export default function SectionObserver({
  sectionId,
  children,
  className = "",
  threshold = 0.3,
}: SectionObserverProps) {
  const { setCurrentSection } = useBackground()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(sectionId)
          }
        })
      },
      {
        threshold,
        rootMargin: "-80px 0px 0px 0px", // Account for header height
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [sectionId, setCurrentSection, threshold])

  return (
    <section id={sectionId} ref={sectionRef} className={className}>
      {children}
    </section>
  )
}
