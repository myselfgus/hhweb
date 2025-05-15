"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from "react"

export default function CallToAction() {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div ref={sectionRef} className="w-full">
      {/* Background decorations with subtle parallax effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 via-white/60 to-white/20"></div>
        <div
          className="absolute h-full w-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2720%27%20height%3D%2720%27%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.05%27%20fill-rule%3D%27evenodd%27%3E%3Ccircle%20cx%3D%273%27%20cy%3D%273%27%20r%3D%273%27%2F%3E%3Ccircle%20cx%3D%2713%27%20cy%3D%2713%27%20r%3D%273%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"
          style={{
            transform: isInView ? "translateY(0)" : "translateY(10px)",
            opacity: isInView ? 1 : 0,
            transition: "transform 1s ease-out, opacity 1s ease-out",
          }}
        ></div>
      </div>

      <div
        className="absolute left-0 right-0 top-0 bottom-0"
        style={{
          transform: isInView ? "scale(1)" : "scale(0.98)",
          opacity: isInView ? 1 : 0,
          transition: "transform 1.2s ease-out, opacity 1.2s ease-out",
        }}
      >
        <div
          className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-white/10 blur-[60px] opacity-20"
          style={{
            animation: isInView ? "subtleFloat 20s ease-in-out infinite alternate" : "none",
          }}
        ></div>
        <div
          className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] rounded-full bg-white/10 blur-[60px] opacity-20"
          style={{
            animation: isInView ? "subtleFloat 18s ease-in-out 2s infinite alternate-reverse" : "none",
          }}
        ></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div
          className="max-w-3xl mx-auto text-center"
          style={{
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            opacity: isInView ? 1 : 0,
            transition: "transform 1s ease-out, opacity 1s ease-out",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            HEALTH/HEALTH não é apenas uma IA de reuniões. É uma extensão do seu raciocínio clínico.
          </h2>

          <p className="text-white/90 text-lg mb-10">
            Junte-se aos profissionais de saúde que estão transformando sua prática clínica com documentação automática
            e inteligente. Nossa plataforma reduz o tempo gasto em tarefas administrativas, permitindo que você se
            concentre no que realmente importa: cuidar de seus pacientes.
          </p>

          <div
            className="relative inline-block group"
            style={{
              transform: isInView ? "translateY(0)" : "translateY(10px)",
              opacity: isInView ? 1 : 0,
              transition: "transform 1s ease-out 0.2s, opacity 1s ease-out 0.2s",
            }}
          >
            <div className="absolute inset-0 rounded-xl bg-white/10 filter blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
            <Button
              size="lg"
              className="relative bg-white text-cyan-700 hover:bg-white/95 text-lg px-8 py-6 h-auto group overflow-hidden font-semibold"
            >
              <span className="relative z-10 flex items-center gap-2">
                SOLICITAR DEMONSTRAÇÃO
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent transform transition-transform duration-700 group-hover:left-[100%]"></span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
