"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode, useMemo } from "react"

type SectionStyle = {
  background: string
  textColor: string
  glassIntensity: "light" | "medium" | "strong"
  accentColor: string
}

type SectionColors = {
  [key: string]: SectionStyle
}

// Define subtle background colors for each section with different blue shades
const sectionColors: SectionColors = {
  default: {
    background: "bg-white",
    textColor: "text-blue-900",
    glassIntensity: "medium",
    accentColor: "blue-500",
  },
  hero: {
    background: "bg-gradient-to-b from-white to-blue-50",
    textColor: "text-blue-900",
    glassIntensity: "light",
    accentColor: "blue-500",
  },
  "what-is": {
    background: "bg-white",
    textColor: "text-blue-900",
    glassIntensity: "medium",
    accentColor: "blue-500",
  },
  features: {
    background: "bg-blue-50",
    textColor: "text-blue-900",
    glassIntensity: "medium",
    accentColor: "blue-600",
  },
  "who-for": {
    background: "bg-blue-100",
    textColor: "text-blue-950",
    glassIntensity: "strong",
    accentColor: "blue-700",
  },
  comparison: {
    background: "bg-blue-200",
    textColor: "text-blue-950",
    glassIntensity: "strong",
    accentColor: "blue-800",
  },
  credentials: {
    background: "bg-blue-300",
    textColor: "text-blue-950",
    glassIntensity: "strong",
    accentColor: "blue-900",
  },
}

interface BackgroundContextType extends SectionStyle {
  currentSection: string
  setCurrentSection: (section: string) => void
  isTransitioning: boolean
}

const BackgroundContext = createContext<BackgroundContextType>({
  currentSection: "default",
  ...sectionColors.default,
  setCurrentSection: () => {},
  isTransitioning: false,
})

export const useBackground = () => useContext(BackgroundContext)

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  // Use a single state for the current section instead of multiple states
  const [currentSection, setCurrentSection] = useState("default")
  // Single state for transition flag
  const [isTransitioning, setIsTransitioning] = useState(false)
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Memoize the current section style to avoid unnecessary re-renders
  const currentStyle = useMemo(() => {
    return sectionColors[currentSection] || sectionColors.default
  }, [currentSection])

  // Smooth section change with debounce
  const handleSectionChange = (section: string) => {
    // Don't update if it's the same section
    if (section === currentSection) return

    // Clear any existing timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current)
    }

    // Set transitioning state
    setIsTransitioning(true)

    // Update section immediately
    setCurrentSection(section)

    // Clear transitioning state after animation completes
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false)
    }, 800)
  }

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [])

  // Create a context value object from the currentStyle and other properties
  const contextValue = {
    currentSection,
    ...currentStyle,
    setCurrentSection: handleSectionChange,
    isTransitioning,
  }

  return (
    <BackgroundContext.Provider value={contextValue}>
      <div
        className={`transition-colors duration-1000 ease-out ${currentStyle.background} ${currentStyle.textColor}`}
        style={{
          willChange: "background-color",
        }}
      >
        {children}
      </div>
    </BackgroundContext.Provider>
  )
}
