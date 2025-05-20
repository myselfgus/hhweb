"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Cloud, Server, Code, Database, Zap, Award, Shield, Sparkles } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export function MicrosoftFoundersHubSection() {
  const isMobile = useIsMobile()
  
  const techStack = [
    {
      icon: "/azure-icon.svg",
      name: "Azure",
      description: "Infraestrutura e serviços na nuvem"
    },
    {
      icon: "/openai-icon.svg",
      name: "OpenAI",
      description: "Modelos de linguagem avançados"
    },
    {
      icon: "/anthropic-icon.svg",
      name: "Anthropic", 
      description: "IA conversacional avançada"
    },
    {
      icon: "/nvidia-icon.svg",
      name: "NVIDIA",
      description: "Computação de alto desempenho"
    },
    {
      icon: "/mongodb-icon.svg",
      name: "MongoDB",
      description: "Armazenamento e gerenciamento de dados"
    }
  ]
  
  const credibilityPoints = [
    {
      icon: <Shield className="w-8 h-8 text-cyan-400" />,
      title: "Credibilidade Institucional",
      description: "Reconhecimento formal por um líder global de tecnologia, validando nossa abordagem e tecnologia."
    },
    {
      icon: <Server className="w-8 h-8 text-purple-400" />,
      title: "Infraestrutura de Classe Mundial",
      description: "Acesso a plataformas corporativas de alto nível, garantindo segurança, confiabilidade e escala."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-yellow-400" />,
      title: "Tecnologias de Ponta",
      description: "Utilização das mais recentes inovações em IA, garantindo que nossa solução esteja sempre na vanguarda."
    },
    {
      icon: <Zap className="w-8 h-8 text-green-400" />,
      title: "Investimento Significativo",
      description: "Suporte financeiro substantivo atravrés de créditos Azure, demonstrando compromisso com nossa visão."
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-slate-950 to-transparent z-10"></div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-blue-500/30 blur-[100px]"></div>
        <div className="absolute top-1/2 right-1/4 w-1/4 h-1/3 rounded-full bg-purple-500/20 blur-[100px]"></div>
      </div>
      
      <div className="w-full px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image
              src="/microsoft-icon.svg"
              alt="Microsoft"
              width={32}
              height={32}
              className="object-contain"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Credenciamento Microsoft
            </h2>
          </div>
          
          <p className="text-blue-200 max-w-3xl mx-auto mb-8">
            Nossa solução em IA para saúde mental foi selecionada para o <span className="text-cyan-400 font-semibold">Microsoft for Startups Founders Hub</span>, 
            um reconhecimento que valida nossa credibilidade, abordagem tecnológica e potencial de impacto global.
          </p>
          
          <div className="inline-block bg-blue-950/50 border border-blue-800/60 rounded-lg p-4">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              <div className="flex items-center gap-2">
                <Image
                  src="/microsoft-icon.svg"
                  alt="Microsoft"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <span className="text-cyan-300 font-semibold">Microsoft for Startups</span>
              </div>
              <div className="hidden md:block h-6 w-px bg-blue-700/50"></div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-blue-100">Founders Hub Member</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Credibilidade e Vantagens */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-16">
          {credibilityPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="glass-primary rounded-2xl p-6 flex items-start gap-4"
            >
              <div className="bg-blue-900/30 p-3 rounded-xl shrink-0">
                {point.icon}
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
                <p className="text-blue-200 text-sm">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Nossa Stack Tecnológica
          </h3>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="flex flex-col items-center"
              >
                <div className="bg-blue-950/70 p-4 rounded-xl mb-3 w-20 h-20 flex items-center justify-center">
                  <Image 
                    src={tech.icon}
                    alt={tech.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <h4 className="text-white font-semibold mb-1">{tech.name}</h4>
                <p className="text-blue-300 text-xs text-center max-w-[150px]">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-800/30 rounded-xl p-6 md:p-8 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
            Tecnologia Avançada
          </h3>
          <p className="text-blue-200 mb-6">
            Nossa participação no programa Founders Hub possibilita que a HEALTH/HEALTH desenvolva com tecnologias 
            de ponta, segurança e escalabilidade - fatores essenciais para aplicações em saúde mental.
          </p>
          
          <div className="flex justify-center">
            <a 
              href="#contact"
              className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
            >
              Saiba mais sobre nossa tecnologia
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
