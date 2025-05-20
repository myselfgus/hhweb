"use client"

import { useEffect, useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

export function AdminBurdenAnimation() {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <div className="w-full h-full">
      {/* Background grid pattern with improved contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-30"></div>
      
      {/* Colorful gradient lines - Enhanced with subtle animations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* Horizontal lines - Enhanced for better visibility */}
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-blue-600/0 via-blue-600/60 to-blue-600/0 top-1/4 animate-pulse"></div>
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-cyan-600/0 via-cyan-600/50 to-cyan-600/0 top-2/4 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-indigo-600/0 via-indigo-600/70 to-indigo-600/0 top-3/4 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Additional glowing lines with brighter colors */}
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/60 to-cyan-500/0 top-1/3 animate-pulse" style={{animationDelay: '0.3s'}}></div>
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-violet-500/0 via-violet-500/60 to-violet-500/0 top-2/3 animate-pulse" style={{animationDelay: '0.8s'}}></div>
        
        {/* Vertical lines - Enhanced for better visibility */}
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-blue-600/0 via-blue-600/60 to-blue-600/0 left-1/4 animate-pulse" style={{animationDelay: '0.7s'}}></div>
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-cyan-600/0 via-cyan-600/50 to-cyan-600/0 left-2/4 animate-pulse" style={{animationDelay: '1.2s'}}></div>
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-indigo-600/0 via-indigo-600/70 to-indigo-600/0 left-3/4 animate-pulse" style={{animationDelay: '0.3s'}}></div>
        
        {/* Additional vertical glowing lines */}
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-violet-500/0 via-violet-500/60 to-violet-500/0 left-1/3 animate-pulse" style={{animationDelay: '0.9s'}}></div>
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 left-2/3 animate-pulse" style={{animationDelay: '0.4s'}}></div>
      </div>
      
      {/* Grid nodes - Enhanced for better visibility */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* Row 1 */}
        <div className="absolute w-2 h-2 rounded-full bg-blue-600/70 top-1/4 left-1/4 shadow-sm shadow-blue-500/50"></div>
        <div className="absolute w-2 h-2 rounded-full bg-blue-600/70 top-1/4 left-2/4 shadow-sm shadow-blue-500/50"></div>
        <div className="absolute w-2 h-2 rounded-full bg-blue-600/70 top-1/4 left-3/4 shadow-sm shadow-blue-500/50"></div>
        
        {/* Row 2 */}
        <div className="absolute w-2 h-2 rounded-full bg-blue-600/70 top-2/4 left-1/4 shadow-sm shadow-blue-500/50"></div>
        <div className="absolute w-3 h-3 rounded-full bg-cyan-600/90 top-2/4 left-2/4 animate-pulse shadow-md shadow-cyan-500/50"></div>
        <div className="absolute w-2 h-2 rounded-full bg-blue-600/70 top-2/4 left-3/4 shadow-sm shadow-blue-500/50"></div>
        
        {/* Row 3 */}
        <div className="absolute w-2 h-2 rounded-full bg-blue-600/70 top-3/4 left-1/4 shadow-sm shadow-blue-500/50"></div>
        <div className="absolute w-2 h-2 rounded-full bg-blue-600/70 top-3/4 left-2/4 shadow-sm shadow-blue-500/50"></div>
        <div className="absolute w-2 h-2 rounded-full bg-blue-600/70 top-3/4 left-3/4 shadow-sm shadow-blue-500/50"></div>
        
        {/* Additional intersections */}
        <div className="absolute w-2 h-2 rounded-full bg-violet-500/70 top-1/3 left-1/3 shadow-sm shadow-violet-500/50"></div>
        <div className="absolute w-2 h-2 rounded-full bg-cyan-500/70 top-1/3 left-2/3 shadow-sm shadow-cyan-500/50"></div>
        <div className="absolute w-2 h-2 rounded-full bg-cyan-500/70 top-2/3 left-1/3 shadow-sm shadow-cyan-500/50"></div>
        <div className="absolute w-2 h-2 rounded-full bg-violet-500/70 top-2/3 left-2/3 shadow-sm shadow-violet-500/50"></div>
      </div>
      
      {/* Ambient glows - Enhanced for better visibility and performance */}
      <div className="absolute top-0 left-0 w-full h-full">
        {!isMobile ? (
          <>
            <div className="absolute w-1/2 h-1/2 top-0 left-0 bg-blue-600/10 blur-3xl rounded-full transform -translate-x-1/2 animate-pulse"></div>
            <div className="absolute w-1/3 h-1/3 bottom-0 right-0 bg-cyan-600/15 blur-3xl rounded-full transform translate-x-1/3 animate-pulse"></div>
            <div className="absolute w-1/4 h-1/4 top-1/2 left-1/2 bg-indigo-600/15 blur-3xl rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute w-1/3 h-1/3 top-1/3 right-1/4 bg-violet-600/10 blur-3xl rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
          </>
        ) : (
          // Simplified version for mobile with fewer elements and animations
          <>
            <div className="absolute w-1/2 h-1/2 top-0 left-0 bg-blue-600/10 blur-2xl rounded-full"></div>
            <div className="absolute w-1/3 h-1/3 bottom-0 right-0 bg-cyan-600/15 blur-2xl rounded-full"></div>
          </>
        )}
      </div>
    </div>
  )
}
