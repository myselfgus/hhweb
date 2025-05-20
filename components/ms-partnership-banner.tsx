"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function MSPartnershipBanner() {
  const [bannerHeight, setBannerHeight] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    setIsMounted(true)
    // Atualiza a variável CSS com a altura do banner após a renderização
    const updateBannerHeight = () => {
      const banner = document.getElementById("ms-banner")
      if (banner) {
        const height = banner.offsetHeight
        setBannerHeight(height)
        document.documentElement.style.setProperty("--banner-height", `${height}px`)
      }
    }

    updateBannerHeight()
    window.addEventListener("resize", updateBannerHeight)

    return () => {
      window.removeEventListener("resize", updateBannerHeight)
    }
  }, [expanded])

  return (
    <div
      id="ms-banner"
      className={`w-full border-b backdrop-blur-sm fixed top-0 left-0 z-50 transition-all duration-300 ${expanded ? "glass-primary" : "glass border-blue-800/30 py-1.5"}`}
    >
      <div className="w-full px-4 flex items-center justify-center gap-3 text-white">
        {isMobile ? (
          <div className="w-full py-2 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2">
              <Image
                src="/microsoft-icon.svg"
                alt="Microsoft"
                width={16}
                height={16}
                className="object-contain"
              />
              <span className="text-xs font-medium">Microsoft Founders Hub</span>
              <button 
                onClick={() => setExpanded(!expanded)}
                className="ml-1 text-xs text-cyan-400"
              >
                {expanded ? "Menos" : "Saiba mais"}
              </button>
            </div>
            
            {expanded && (
              <div className="mt-2 mb-1 text-center max-w-md text-xs">
                <p className="text-blue-200 mb-2">A HEALTH/HEALTH é membro do Microsoft for Startups Founders Hub, com acesso a recursos técnicos e ferramentas para nossa plataforma de IA.</p>
                <div className="flex justify-center gap-4 items-center">
                  <Image
                    src="/azure-icon.svg"
                    alt="Azure"
                    width={20}
                    height={20}
                  />
                  <Image
                    src="/openai-icon.svg"
                    alt="OpenAI"
                    width={20}
                    height={20}
                  />
                  <Image
                    src="/github-icon.svg"
                    alt="GitHub"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/microsoft-icon.svg"
                alt="Microsoft"
                width={18}
                height={18}
                className="object-contain"
              />
              <span className="text-sm font-medium">Microsoft Founders Hub</span>
              <button 
                onClick={() => setExpanded(!expanded)}
                className="ml-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {expanded ? "Menos detalhes" : "Saiba mais"}
              </button>
            </div>
            
            {expanded && (
              <div className="flex items-center gap-4">
                
                <Image
                  src="/azure-icon.svg"
                  alt="Azure"
                  width={24}
                  height={24}
                />
                <Image
                  src="/openai-icon.svg"
                  alt="OpenAI"
                  width={24}
                  height={24}
                />
                <Image
                  src="/github-icon.svg"
                  alt="GitHub"
                  width={24}
                  height={24}
                />
              </div>
            )}
          </div>
        )}
      </div>
      
      {expanded && !isMobile && (
        <div className="py-3 px-4 glass-primary border-t border-blue-800/50">
          <p className="text-blue-200 text-sm w-full text-center">
            A HEALTH/HEALTH é membro do Microsoft for Startups Founders Hub, com acesso a recursos técnicos e ferramentas avançadas para desenvolvimento de nossa plataforma de IA.
          </p>
        </div>
      )}
      
      {isMounted && (
        <style jsx global>{`
          :root {
            --banner-height: ${bannerHeight}px;
          }
          /* Removing the global body padding to fix layout issues */
          /* body {
            padding-top: var(--banner-height);
          } */
        `}</style>
      )}
    </div>
  )
}
