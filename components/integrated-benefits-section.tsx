"use client"

import { motion } from "framer-motion"
import { Clock, Users, Heart, Sparkles, BrainCircuit, Lightbulb, Atom } from "lucide-react"
import { AdminBurdenAnimation } from "./admin-burden-animation"
import { useIsMobile } from "@/hooks/use-mobile"

export function IntegratedBenefitsSection() {
  const isMobile = useIsMobile()
  
  const benefits = [
    {
      icon: Clock,
      title: "Redução de 95% do Tempo Administrativo",
      description:
        "Nossa tecnologia automatiza a documentação clínica, liberando profissionais de saúde da sobrecarga administrativa.",
    },
    {
      icon: Users,
      title: "Maximização do Tempo com Pacientes",
      description: "Dedique sua atenção integral ao que realmente importa: a conexão humana e o cuidado terapêutico.",
    },
    {
      icon: Heart,
      title: "Satisfação Profissional Renovada",
      description: "Redescubra a paixão pela sua profissão ao eliminar as tarefas burocráticas que causam burnout.",
    },
    {
      icon: Sparkles,
      title: "Foco na Sua Verdadeira Vocação",
      description: "Concentre-se no que você ama: ajudar pessoas a transformarem suas vidas através da saúde mental.",
      hideMobile: true, // Este card será escondido em dispositivos móveis
    },
  ]

  // Substituído pelos cards de Impacto Potencial conforme solicitado - reduzido para 2 cards
  const impactCards = [
    {
      icon: BrainCircuit,
      title: "Decisões Clínicas Informadas",
      description: "Acesso a padrões e insights que normalmente passariam despercebidos, enriquecendo a visão clínica",
    },
    {
      icon: Atom,
      title: "Redução do Burnout Profissional",
      description: "Diminuição significativa do esgotamento relacionado à documentação, melhorando a qualidade de vida",
    },
  ]

  return (
    <section className="relative pt-16 pb-32 overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      {/* Animation Background - Melhorado para mobile */}
      <div className="absolute inset-0 opacity-80">
        <AdminBurdenAnimation />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Transformando a Prática Clínica</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Combinamos tecnologia avançada e princípios humanísticos para eliminar a sobrecarga administrativa e
            devolver aos profissionais de saúde o que realmente importa.
          </p>
        </motion.div>

        {/* Core Benefits */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {benefits.map((benefit, idx) => (
            (!benefit.hideMobile || !isMobile) && (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-8 rounded-2xl shadow-lg border border-cyan-500/30 hover:border-cyan-400/50 transition-all"
              >
                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-cyan-600 to-blue-700 p-3 rounded-xl mr-4 shadow-md">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">{benefit.title}</h3>
                    <p className="text-blue-200">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </div>

        {/* Journey Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">Nossa Visão em Ação</h3>

          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-500/30 transform -translate-x-1/2"></div>

            {/* Steps */}
            <div className="space-y-24">
              {[
                {
                  title: "Consulta Natural",
                  text: "Interação humana sem interferências tecnológicas, preservando a essência do encontro terapêutico. Nossa tecnologia trabalha silenciosamente em segundo plano.",
                  align: "right",
                },
                {
                  title: "Documentação Inteligente",
                  text: "Transcrição e estruturação em tempo real, transformando conversas em dados clínicos valiosos sem nenhum esforço do profissional.",
                  align: "left",
                },
                {
                  title: "Insights Dimensionais",
                  text: "Análise multifacetada que revela padrões e conexões invisíveis ao olho humano, enriquecendo a compreensão clínica e potencializando resultados.",
                  align: "right",
                },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className={`flex items-center ${step.align === "left" ? "flex-row" : "flex-row-reverse"}`}>
                    {/* Timeline node */}
                    <div className="absolute left-1/2 w-6 h-6 bg-cyan-500 rounded-full transform -translate-x-1/2 z-10"></div>

                    {/* Content */}
                    <div className={`w-5/12 ${step.align === "left" ? "pr-12" : "pl-12"}`}></div>
                    <div className="w-5/12">
                      <motion.div
                        initial={{ opacity: 0, x: step.align === "left" ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass p-6 rounded-xl"
                      >
                        <h4 className="text-2xl font-bold text-cyan-400 mb-3">{step.title}</h4>
                        <p className="text-blue-200">{step.text}</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Impacto Potencial - Substitui os Pilares Fundamentais */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Impacto Potencial
          </motion.h3>

          <div className="grid sm:grid-cols-2 gap-8">
            {impactCards.map((card, idx) => (
              <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-6 rounded-xl text-center shadow-lg border border-cyan-600/30 hover:border-cyan-500/50 transition-all"
              >
                <div className="bg-gradient-to-br from-cyan-700 to-blue-800 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <card.icon className="h-8 w-8 text-cyan-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{card.title}</h4>
                <p className="text-blue-200 text-sm">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Pronto para recuperar o tempo perdido em documentação?</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:from-cyan-400 hover:to-blue-500 transition-all"
          >
            Transforme sua prática clínica
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
