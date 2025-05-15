"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type SectionColors = {
  [key: string]: {
    background: string
    textColor: string
  }
}

// Define subtle background colors for each section
const sectionColors: SectionColors = {
  default: {
    background: "bg-white",
    textColor: "text-gray-900",
  },
  hero: {
    background: "bg-gradient-to-b from-white to-gray-50",
    textColor: "text-gray-900",
  },
  "what-is": {
    background: "bg-white",
    textColor: "text-gray-900",
  },
  features: {
    background: "bg-gradient-to-b from-white to-gray-50",
    textColor: "text-gray-900",
  },
  "who-for": {
    background: "bg-gray-50",
    textColor: "text-gray-900",
  },
  differentiators: {
    background: "bg-white",
    textColor: "text-gray-900",
  },
  comparison: {
    background: "bg-gray-50",
    textColor: "text-gray-900",
  },
  credentials: {
    background: "bg-gray-50",
    textColor: "text-gray-900",
  },
  "call-to-action": {
    background: "bg-gradient-to-br from-cyan-500 to-cyan-600",
    textColor: "text-white",
  },
}

type BackgroundContextType = {
  currentSection: string
  backgroundColor: string
  textColor: string
  setCurrentSection: (section: string) => void
}

const BackgroundContext = createContext<BackgroundContextType>({
  currentSection: "default",
  backgroundColor: sectionColors.default.background,
  textColor: sectionColors.default.textColor,
  setCurrentSection: () => {},
})

export const useBackground = () => useContext(BackgroundContext)

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const [currentSection, setCurrentSection] = useState("default")
  const [backgroundColor, setBackgroundColor] = useState(sectionColors.default.background)
  const [textColor, setTextColor] = useState(sectionColors.default.textColor)

  useEffect(() => {
    // Update background color when section changes
    const colors = sectionColors[currentSection] || sectionColors.default
    setBackgroundColor(colors.background)
    setTextColor(colors.textColor)
  }, [currentSection])

  return (
    <BackgroundContext.Provider
      value={{
        currentSection,
        backgroundColor,
        textColor,
        setCurrentSection,
      }}
    >
      {children}
    </BackgroundContext.Provider>
  )
}
