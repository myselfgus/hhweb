"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Sparkles, XIcon as XMarkIcon } from "lucide-react"
import { Bars3Icon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { FAQSection } from "@/components/faq-section"
import { ConceptVisualizer } from "@/components/concept-visualizer"
import MSPartnershipBanner from "@/components/ms-partnership-banner"
import { OptimizedGradientBackground } from "@/components/optimized-gradient-background"
import { IntegratedBenefitsSection } from "@/components/integrated-benefits-section"
import { AudioAnalysisSection } from "@/components/audio-analysis-section"
import { MicrosoftFoundersHubSection } from "@/components/microsoft-founders-hub-section"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Home() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  
  // Garante que o componente seja renderizado corretamente após o carregamento da página
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-slate-950">
      {/* Banner de Parceria Microsoft */}
      <MSPartnershipBanner />

      {/* Navigation */}
      <nav className="fixed top-[var(--banner-height)] left-0 right-0 z-40 glass border-b border-blue-800/30">
        <div className="w-full px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">HEALTH/HEALTH</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {["Visão", "Conceito"].map((item) => (
              <a key={item} href="#" className="text-blue-200 hover:text-cyan-400 transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-cyan-400 transition-all"
            >
              Contato
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white p-2 focus:outline-none"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[calc(var(--banner-height)+64px)] left-0 right-0 z-30 glass border-t border-blue-800"
          >
            <div className="px-4 py-6 space-y-4">
              {["Visão", "Conceito"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="block py-3 text-blue-200 hover:text-cyan-400 transition-colors text-lg font-medium"
                  whileHover={{ x: 5 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-cyan-500 text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-cyan-400 transition-all mt-4"
              >
                Contato
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section com background de bolhas otimizado */}
      <section ref={ref} className="relative flex items-center justify-center overflow-hidden pb-32 hero-section pt-16 md:pt-0 mt-16 md:mt-8">
        <OptimizedGradientBackground />

        <div className="relative z-10 w-full">
          <div className="grid md:grid-cols-5 gap-8 items-center w-full px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
              className="md:col-span-3 text-center md:text-left"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
                  Reimaginando
                </span>
                <br />A Prática Clínica
              </h1>

              <div className="max-w-2xl">
                <p className="text-lg text-blue-200 mb-8">
                  Explorando como a IA pode documentar consultas automaticamente, permitindo que profissionais de saúde
                  foquem inteiramente no paciente
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-cyan-500 text-white px-6 py-3 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 shadow-xl hover:bg-cyan-400 transition-all"
                  >
                    <Sparkles className="w-5 h-5" />
                    Explorar Conceito
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="glass text-cyan-500 px-6 py-3 rounded-xl text-lg font-semibold hover:bg-cyan-500/10 transition-all border-cyan-500"
                  >
                    Nossa Visão
                  </motion.button>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-2"
            >
              <AudioAnalysisSection />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrated Benefits Section com Impacto Potencial */}
      <IntegratedBenefitsSection />

      {/* Concept Visualizer Section */}
      <ConceptVisualizer />

      {/* Microsoft Founders Hub Section */}
      <MicrosoftFoundersHubSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer com background de bolhas */}
      <footer className="relative border-t border-blue-800">
        <div className="absolute inset-0 opacity-70">
          <OptimizedGradientBackground />
        </div>
        <div className="relative z-10 w-full px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 text-blue-100">
            <div>
              <h4 className="text-white font-bold mb-4">HEALTH/HEALTH</h4>
              <p className="text-sm">Explorando o futuro da saúde mental através da inovação tecnológica</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Conceito</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Visão
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Tecnologia
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Pesquisa
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Sobre</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Equipe
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Imprensa
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Parceiros</h4>
              <div className="flex gap-4">
                <Image
                  src="/microsoft-startups-white.png"
                  alt="Microsoft for Startups"
                  width={80}
                  height={32}
                  className="h-8 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Button */}
      <motion.div
        className="fixed bottom-8 right-8 glass rounded-full p-4 cursor-pointer z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-cyan-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </motion.div>
    </div>
  )
}
