"use client"

import { useEffect, useState, useRef } from "react"
import Header from "@/components/header"
import ScrollIndicator from "@/components/scroll-indicator"
import ScrollToTop from "@/components/scroll-to-top"
import MobileBottomBar from "@/components/mobile-bottom-bar"
import SectionObserver from "@/components/section-observer"
import Hero from "@/components/hero"
import Footer from "@/components/footer"
import SplashScreen from "@/components/splash-screen"
import { useSplashScreen } from "@/hooks/use-splash-screen"
import VisionSection from "@/components/vision-section"
import SolutionSection from "@/components/solution-section"
import TechnologySection from "@/components/technology-section"
import FounderSection from "@/components/founder-section"
import DevelopersSection from "@/components/developers-section"
import InvestorsSection from "@/components/investors-section"
import ContactSection from "@/components/contact-section"
import GlassContainer from "@/components/glass-container";
import SectionTransitionHelper from "@/components/section-transition-helper";

export default function Home() {
  const { showSplash, hasSeenSplash, handleSplashComplete } = useSplashScreen()
  const [contentVisible, setContentVisible] = useState(false)
  const initialRender = useRef(true);
  const transitionTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Garantir hidratação sem conflitos
    if (initialRender.current) {
      initialRender.current = false;
      // No primeiro render, mantém o estado como configurado no servidor
      return;
    }
    
    // Se não estamos mostrando splash ou usuário já viu, mostra o conteúdo imediatamente
    if (!showSplash || hasSeenSplash) {
      setContentVisible(true)
    }
    
    // Set content to visible after a delay matching the splashscreen duration
    // This ensures content is ready when splash animation completes
    transitionTimer.current = setTimeout(() => {
      setContentVisible(true)
    }, 5000); // Tempo reduzido para uma transição mais suave
    
    return () => {
      if (transitionTimer.current) {
        clearTimeout(transitionTimer.current);
      }
    };
  }, [showSplash, hasSeenSplash])

  return (
    <>
      {/* Exibindo a splashscreen sem condicionais para garantir que seja sempre mostrada */}
      <SplashScreen onComplete={handleSplashComplete} />      <main className={`min-h-screen splash-to-content-transition ${contentVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-4"}`}>
        <ScrollIndicator />
        <ScrollToTop />
        <Header />
        <MobileBottomBar />        <SectionObserver
          sectionId="hero"
          className="relative min-h-[90vh] pt-20 md:pt-28 pb-12 md:pb-16 flex items-center overflow-hidden"
        >
          <Hero />
        </SectionObserver>
        <VisionSection />
        <SolutionSection />
        <TechnologySection />
        <FounderSection />
        <DevelopersSection />
        <InvestorsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
