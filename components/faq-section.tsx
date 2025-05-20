"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FAQItem {
  question: string
  answer: string
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqItems: FAQItem[] = [
    {
      question: "Como funciona a tecnologia de documentação automática?",
      answer:
        "Estamos desenvolvendo um sistema que utiliza processamento de linguagem natural avançado para capturar, transcrever e estruturar conversas clínicas em tempo real, transformando-as em documentação médica estruturada sem intervenção manual.",
    },
    {
      question: "Como a privacidade dos dados é garantida?",
      answer:
        "A privacidade é um princípio fundamental. Estamos projetando nossa tecnologia com criptografia de ponta a ponta e seguindo os mais rigorosos padrões de segurança. Todos os dados são processados com consentimento explícito e em conformidade com regulamentações como LGPD e HIPAA.",
    },
    {
      question: "Qual é o estágio atual de desenvolvimento?",
      answer:
        "Atualmente estamos em fase de pesquisa e desenvolvimento, trabalhando em protótipos iniciais e validando conceitos. Estamos colaborando com especialistas em saúde mental para garantir que nossa abordagem seja clinicamente relevante e eticamente responsável.",
    },
    {
      question: "Como posso acompanhar o desenvolvimento ou colaborar?",
      answer:
        "Estamos abertos a parcerias com profissionais de saúde, pesquisadores e instituições interessadas em explorar o futuro da documentação clínica. Entre em contato conosco para discutir possíveis colaborações ou para receber atualizações sobre nosso progresso.",
    },
    {
      question: "Qual é a visão de longo prazo do projeto?",
      answer:
        "Nossa visão é transformar fundamentalmente a prática clínica, permitindo que profissionais de saúde dediquem 100% de sua atenção aos pacientes, enquanto a tecnologia cuida da documentação. Acreditamos que isso pode melhorar significativamente a qualidade do cuidado e os resultados terapêuticos.",
    },
  ]

  return (
    <section className="bg-slate-950 py-24">
      <div className="w-full px-4">
        <h2 className="mb-16 text-center text-4xl font-bold text-white">Perguntas Frequentes</h2>

        <div className="mx-auto max-w-3xl space-y-6">
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl border border-white/10 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="flex cursor-pointer justify-between items-center p-6"
                onClick={() => toggleFAQ(i)}
                role="button"
                tabIndex={0}
                aria-expanded={openIndex === i}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    toggleFAQ(i)
                  }
                }}
              >
                <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="h-6 w-6 text-cyan-400" />
                </motion.div>
              </div>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-blue-200">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
