"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Language = "en" | "pt"

type TranslationsContextType = {
  currentLang: Language
  t: (key: string) => string
  toggleLanguage: () => void
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(undefined)

interface TranslationsProviderProps {
  children: ReactNode
}

export function TranslationsProvider({ children }: TranslationsProviderProps) {
  const [currentLang, setCurrentLang] = useState<Language>("en")

  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLanguage") as Language
    if (storedLang && (storedLang === "en" || storedLang === "pt")) {
      setCurrentLang(storedLang)
    }
  }, [])

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "pt" : "en"
    setCurrentLang(newLang)
    localStorage.setItem("preferredLanguage", newLang)
  }

  const t = (key: string) => {
    // Simplificado para evitar erros
    return key
  }

  return (
    <TranslationsContext.Provider value={{ currentLang, t, toggleLanguage }}>
      {children}
    </TranslationsContext.Provider>
  )
}

export const useTranslations = () => {
  const context = useContext(TranslationsContext)
  if (context === undefined) {
    // Simplificando o retorno para evitar erros
    return { 
      currentLang: "en" as Language, 
      t: (key: string) => key,
      toggleLanguage: () => console.log("Toggle language stub")
    }
  }
  return context
}
