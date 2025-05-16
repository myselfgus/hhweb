"use client"

import { useState, useEffect } from "react"

export function useSplashScreen() {
  // Inicializar os estados com valores que funcionarão tanto no servidor quanto no cliente
  const [showSplash, setShowSplash] = useState(true)
  const [hasSeenSplash, setHasSeenSplash] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  // Efeito para detectar ambiente cliente
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Somente execute se estiver no cliente
    if (!isClient) return;
    
    // Check if user has already seen the splash screen in this session
    try {
      const hasSeenSplashBefore = sessionStorage.getItem("hasSeenSplash") === "true"

      if (hasSeenSplashBefore) {
        setShowSplash(false)
        setHasSeenSplash(true)
      }
    } catch (e) {
      // Fallback caso haja algum problema com sessionStorage
      console.error("Error accessing sessionStorage:", e);
    }
    
    // We'll only update the session storage when the splash is completed,
    // not on component unmount, to avoid any race conditions
  }, [isClient])

  const handleSplashComplete = () => {
    setShowSplash(false)
    setHasSeenSplash(true)
    
    // Somente salve no sessionStorage se estivermos no cliente
    if (isClient) {
      try {
        sessionStorage.setItem("hasSeenSplash", "true")
      } catch (e) {
        console.error("Error saving to sessionStorage:", e);
      }
    }
  }

  return {
    // A splashscreen deve ser exibida sempre, a menos que o usuário já a tenha visto
    showSplash: isClient ? showSplash : true,
    hasSeenSplash,
    handleSplashComplete,
  }
}
