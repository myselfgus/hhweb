"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ScrollAnimations() {
  const initialized = useRef(false)

  useEffect(() => {
    // Evitar inicialização múltipla e garantir que o código execute apenas no cliente
    if (typeof window === "undefined" || initialized.current) return
    initialized.current = true

    // Registrar os plugins GSAP
    gsap.registerPlugin(ScrollTrigger)

    // Função para animar a entrada de seções
    const animateSectionEntrance = () => {
      const sections = document.querySelectorAll("section")

      sections.forEach((section, index) => {
        // Alternância de background para cada seção
        const isEven = index % 2 === 0
        if (!section.classList.contains("bg-set")) {
          section.classList.add(isEven ? "bg-white" : "bg-blue-50")
          section.classList.add("bg-set") // Marcador para evitar redefinir
        }

        // Configurar a animação da seção
        gsap.fromTo(
          section,
          {
            opacity: 0.3,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
              // markers: true, // Remover em produção
            },
          }
        )

        // Animar elementos filhos com atraso
        const childElements = section.querySelectorAll(".section-title, .section-subtitle, p, .card, .animated-element")
        
        childElements.forEach((element, elementIndex) => {
          gsap.fromTo(
            element,
            {
              opacity: 0,
              y: 15,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.1 * elementIndex, // Atraso cascata
              ease: "power1.out",
              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          )
        })
      })
    }

    // Configurar efeito de parallax para elementos de fundo
    const setupParallaxEffects = () => {
      const parallaxElements = document.querySelectorAll(".bg-parallax")
      
      parallaxElements.forEach((element) => {
        gsap.to(element, {
          y: "30%",
          ease: "none",
          scrollTrigger: {
            trigger: element.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })
    }

    // Animar transições de navegação
    const setupNavTransitions = () => {
      const navLinks = document.querySelectorAll(".nav-link")
      
      navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          const targetId = link.getAttribute("href")?.replace("#", "")
          if (!targetId) return
          
          const targetSection = document.getElementById(targetId)
          if (!targetSection) return
          
          e.preventDefault()
          
          // Scroll suave para a seção
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetSection,
              offsetY: 80 // Ajuste para o header fixo
            },
            ease: "power2.inOut"
          })
        })
      })
    }

    // Iniciar todas as animações
    animateSectionEntrance()
    setupParallaxEffects()
    setupNavTransitions()

    // Atualizar ScrollTrigger quando a janela for redimensionada
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh()
    })

    // Limpeza
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Este componente não renderiza nada diretamente
  return null
}
