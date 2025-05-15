"use client"

import { useState, useEffect } from "react"

export default function LanguageToggle() {
  const [currentLang, setCurrentLang] = useState("en")

  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLanguage")
    if (storedLang) {
      setCurrentLang(storedLang)
    }
  }, [])

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "pt" : "en"
    setCurrentLang(newLang)
    localStorage.setItem("preferredLanguage", newLang)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center text-sm font-semibold bg-transparent border border-gray-200/80 rounded-md px-3 py-1 hover:bg-cyan-50/50 hover:border-cyan-200/50 transition-colors"
    >
      <span className={`${currentLang === "en" ? "text-cyan-600 font-bold" : "text-gray-500 opacity-70"}`}>EN</span>
      <span className="mx-1 text-gray-400">/</span>
      <span className={`${currentLang === "pt" ? "text-cyan-600 font-bold" : "text-gray-500 opacity-70"}`}>PT</span>
    </button>
  )
}
