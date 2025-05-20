"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}

export function PricingSection() {
  const tiers: PricingTier[] = [
    {
      name: "Essencial",
      price: "R$299",
      description: "Ideal para profissionais individuais",
      features: ["1 usuário", "Transcrição automática", "Documentação estruturada", "Suporte por email"],
    },
    {
      name: "Profissional",
      price: "R$599",
      description: "Perfeito para clínicas pequenas",
      features: [
        "Até 5 usuários",
        "Transcrição automática",
        "Documentação estruturada",
        "Análise dimensional",
        "Integração com sistemas",
        "Suporte prioritário",
      ],
      highlighted: true,
    },
    {
      name: "Empresarial",
      price: "Personalizado",
      description: "Para grandes instituições",
      features: [
        "Usuários ilimitados",
        "Transcrição automática",
        "Documentação estruturada",
        "Análise dimensional avançada",
        "Integrações personalizadas",
        "API dedicada",
        "Gerente de conta exclusivo",
      ],
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute -left-96 -bottom-96 h-[800px] w-[800px] rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute -right-96 top-20 h-[600px] w-[600px] rounded-full bg-purple-400/10 blur-3xl" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Planos Flexíveis para Cada Necessidade
          </motion.h2>
          <motion.p
            className="text-blue-200 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Escolha o plano ideal para sua prática clínica. Todos incluem nossa tecnologia de documentação automática.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className={`glass-panel rounded-2xl overflow-hidden ${
                tier.highlighted ? "ring-2 ring-cyan-400 transform md:-translate-y-4" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`p-8 ${tier.highlighted ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20" : ""}`}>
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-blue-200 ml-2">/mês</span>
                </div>
                <p className="text-blue-200 mb-6">{tier.description}</p>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-blue-100">
                      <Check className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  className={`w-full py-3 px-4 rounded-lg font-medium ${
                    tier.highlighted
                      ? "bg-cyan-500 text-white hover:bg-cyan-400"
                      : "bg-blue-900/50 text-white border border-blue-700/50 hover:bg-blue-800/50"
                  } transition-colors`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tier.highlighted ? "Começar agora" : "Saiba mais"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
