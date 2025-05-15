"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"

type SectionColors = {
  [key: string]: {
    background: string
    textColor: string
    glassIntensity: "light" | "medium" | "strong"
    accentColor: string
  }
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

type BackgroundContextType = {
  currentSection: string
  backgroundColor: string
  textColor: string
  glassIntensity: "light" | "medium" | "strong"
  accentColor: string
  setCurrentSection: (section: string) => void
  isTransitioning: boolean
}

const BackgroundContext = createContext<BackgroundContextType>({
  currentSection: "default",
  backgroundColor: sectionColors.default.background,
  textColor: sectionColors.default.textColor,
  glassIntensity: sectionColors.default.glassIntensity,
  accentColor: sectionColors.default.accentColor,
  setCurrentSection: () => {},
  isTransitioning: false,
})

export const useBackground = () => useContext(BackgroundContext)

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const [currentSection, setCurrentSection] = useState("default")
  const [backgroundColor, setBackgroundColor] = useState(sectionColors.default.background)
  const [textColor, setTextColor] = useState(sectionColors.default.textColor)
  const [glassIntensity, setGlassIntensity] = useState<"light" | "medium" | "strong">(
    sectionColors.default.glassIntensity,
  )
  const [accentColor, setAccentColor] = useState(sectionColors.default.accentColor)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastSectionRef = useRef<string>("default")
  const animationFrameRef = useRef<number | null>(null)

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

    // Store the last section for smooth transitions
    lastSectionRef.current = currentSection

    // Update section with a small delay to prevent rapid changes
    transitionTimeoutRef.current = setTimeout(() => {
      setCurrentSection(section)

      // Clear transitioning state after animation completes
      setTimeout(() => {
        setIsTransitioning(false)
      }, 1000)
    }, 50)
  }

  useEffect(() => {
    // Update background color when section changes with smooth transition
    const colors = sectionColors[currentSection] || sectionColors.default

    // Cancel any existing animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    // Use requestAnimationFrame for smoother transitions
    animationFrameRef.current = requestAnimationFrame(() => {
      setBackgroundColor(colors.background)
      setTextColor(colors.textColor)
      setGlassIntensity(colors.glassIntensity)
      setAccentColor(colors.accentColor)
    })

    // Clean up on unmount
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [currentSection])

  return (
    <BackgroundContext.Provider
      value={{
        currentSection,
        backgroundColor,
        textColor,
        glassIntensity,
        accentColor,
        setCurrentSection: handleSectionChange,
        isTransitioning,
      }}
    >
      <div
        className={`transition-colors duration-1500 ease-out ${backgroundColor} ${textColor}`}
        style={{
          willChange: "background-color, color",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
        }}
      >
        {children}
      </div>
    </BackgroundContext.Provider>
  )
}
