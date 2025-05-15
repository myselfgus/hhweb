"use client"

import { useState, useEffect } from "react"

export function useSplashScreen() {
  const [showSplash, setShowSplash] = useState(true)
  const [hasSeenSplash, setHasSeenSplash] = useState(false)

  useEffect(() => {
    // Check if user has already seen the splash screen in this session
    const hasSeenSplashBefore = sessionStorage.getItem("hasSeenSplash") === "true"

    if (hasSeenSplashBefore) {
      setShowSplash(false)
      setHasSeenSplash(true)
    }

    return () => {
      // Mark that user has seen splash screen when component unmounts
      sessionStorage.setItem("hasSeenSplash", "true")
    }
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
    setHasSeenSplash(true)
    sessionStorage.setItem("hasSeenSplash", "true")
  }

  return {
    showSplash,
    hasSeenSplash,
    handleSplashComplete,
  }
}
