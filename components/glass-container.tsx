import { useBackground } from "@/context/background-context"
import type { ReactNode } from "react"

interface GlassContainerProps {
  children: ReactNode
  className?: string
  intensity?: "light" | "medium" | "strong"
  forceWhite?: boolean
}

export default function GlassContainer({
  children,
  className = "",
  intensity,
  forceWhite = false,
}: GlassContainerProps) {
  const { glassIntensity: contextIntensity, currentSection } = useBackground()

  // Use provided intensity or fall back to context
  const effectiveIntensity = intensity || contextIntensity

  // Define background opacity and blur based on intensity and section
  const intensityMap = {
    light: {
      bg: forceWhite ? "bg-white/40" : currentSection === "call-to-action" ? "bg-white/20" : "bg-white/40",
      blur: "backdrop-blur-sm",
      border: forceWhite
        ? "border-white/20"
        : currentSection === "call-to-action"
          ? "border-white/10"
          : "border-white/20",
    },
    medium: {
      bg: forceWhite ? "bg-white/60" : currentSection === "call-to-action" ? "bg-white/30" : "bg-white/60",
      blur: "backdrop-blur-md",
      border: forceWhite
        ? "border-white/30"
        : currentSection === "call-to-action"
          ? "border-white/20"
          : "border-white/30",
    },
    strong: {
      bg: forceWhite ? "bg-white/80" : currentSection === "call-to-action" ? "bg-white/40" : "bg-white/80",
      blur: "backdrop-blur-lg",
      border: forceWhite
        ? "border-white/40"
        : currentSection === "call-to-action"
          ? "border-white/30"
          : "border-white/40",
    },
  }

  const { bg, blur, border } = intensityMap[effectiveIntensity]

  return <div className={`rounded-xl ${bg} ${blur} ${border} shadow-lg ${className}`}>{children}</div>
}
