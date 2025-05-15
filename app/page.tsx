"use client"

import { useBackground } from "@/context/background-context"
import Header from "@/components/header"
import ScrollIndicator from "@/components/scroll-indicator"
import ScrollToTop from "@/components/scroll-to-top"
import SectionObserver from "@/components/section-observer"
import Hero from "@/components/hero"
import Features from "@/components/features"
import WhatIs from "@/components/what-is"
import Audience from "@/components/audience"
import Differentiators from "@/components/differentiators"
import Comparison from "@/components/comparison"
import Credentials from "@/components/credentials"
import CallToAction from "@/components/call-to-action"
import Footer from "@/components/footer"

export default function Home() {
  const { backgroundColor, textColor } = useBackground()

  return (
    <main className={`min-h-screen transition-colors duration-1000 ease-in-out ${backgroundColor} ${textColor}`}>
      <ScrollIndicator />
      <ScrollToTop />
      <Header />

      <SectionObserver sectionId="hero" className="relative min-h-[90vh] pt-28 pb-16 flex items-center overflow-hidden">
        <Hero />
      </SectionObserver>

      <SectionObserver sectionId="what-is" className="py-20 relative overflow-hidden">
        <WhatIs />
      </SectionObserver>

      <SectionObserver sectionId="features" className="py-20 relative overflow-hidden">
        <Features />
      </SectionObserver>

      <SectionObserver sectionId="who-for" className="py-20 relative overflow-hidden">
        <Audience />
      </SectionObserver>

      <SectionObserver sectionId="differentiators" className="py-20 relative overflow-hidden">
        <Differentiators />
      </SectionObserver>

      <SectionObserver sectionId="comparison" className="py-20 relative overflow-hidden">
        <Comparison />
      </SectionObserver>

      <SectionObserver sectionId="credentials" className="py-20 relative overflow-hidden">
        <Credentials />
      </SectionObserver>

      <SectionObserver sectionId="call-to-action" className="py-24 relative overflow-hidden">
        <CallToAction />
      </SectionObserver>

      <Footer />
    </main>
  )
}
