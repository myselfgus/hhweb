"use client"
import Header from "@/components/header"
import ScrollIndicator from "@/components/scroll-indicator"
import ScrollToTop from "@/components/scroll-to-top"
import MobileBottomBar from "@/components/mobile-bottom-bar"
import SectionObserver from "@/components/section-observer"
import Hero from "@/components/hero"
import Features from "@/components/features"
import WhatIs from "@/components/what-is"
import Audience from "@/components/audience"
import Comparison from "@/components/comparison"
import Credentials from "@/components/credentials"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollIndicator />
      <ScrollToTop />
      <Header />
      <MobileBottomBar />

      <SectionObserver
        sectionId="hero"
        className="relative min-h-[90vh] pt-20 md:pt-28 pb-12 md:pb-16 flex items-center overflow-hidden"
      >
        <Hero />
      </SectionObserver>

      <SectionObserver sectionId="what-is" className="relative overflow-hidden">
        <WhatIs />
      </SectionObserver>

      <SectionObserver sectionId="features" className="relative overflow-hidden">
        <Features />
      </SectionObserver>

      <SectionObserver sectionId="who-for" className="relative overflow-hidden">
        <Audience />
      </SectionObserver>

      <SectionObserver sectionId="comparison" className="relative overflow-hidden">
        <Comparison />
      </SectionObserver>

      <SectionObserver sectionId="credentials" className="relative overflow-hidden" rootMargin="-80px 0px -100px 0px">
        <Credentials />
      </SectionObserver>

      <Footer />
    </main>
  )
}
