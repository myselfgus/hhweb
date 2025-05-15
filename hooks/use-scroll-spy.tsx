"use client"

import { useState, useEffect } from "react"

interface UseScrollSpyOptions {
  sectionIds: string[]
  offset?: number
}

export function useScrollSpy({ sectionIds, offset = 100 }: UseScrollSpyOptions) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const handleScroll = () => {
      // Find all sections
      const sections = sectionIds.map((id) => {
        const element = document.getElementById(id)
        if (!element) return { id, top: 0, bottom: 0 }

        const rect = element.getBoundingClientRect()
        return {
          id,
          top: rect.top,
          bottom: rect.bottom,
        }
      })

      // Find the first section that is currently visible on the screen
      const currentSection = sections.find((section) => {
        return section.top <= offset && section.bottom > offset
      })

      if (currentSection) {
        setActiveId(currentSection.id)
      }
    }

    handleScroll() // Call once to set initial state
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [sectionIds, offset])

  return activeId
}
