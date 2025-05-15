"use client"

import { useEffect, useState } from "react"

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down the page the user has scrolled
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollPercentage = (scrollTop / windowHeight) * 100

      setScrollProgress(scrollPercentage)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 bg-gray-100 z-[1001]">
      <div
        className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  )
}
