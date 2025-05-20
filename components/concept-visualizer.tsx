"use client"

import { motion } from "framer-motion"
import { CognitiveNetworkVisualizer } from "./cognitive-network-visualizer"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState } from "react"

export function ConceptVisualizer() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState<'overview' | 'dimensions'>('overview')
  
  return (
    <section className="py-16 md:py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-slate-950 to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-slate-950 to-transparent z-10"></div>

      <div className="w-full px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Entendendo as Dimensões</h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Nossa tecnologia mapeia a experiência humana através de múltiplas dimensões interconectadas, criando uma
            compreensão holística que vai além da documentação tradicional
          </p>
        </motion.div>

        {isMobile && (
          <div className="flex mb-6 border-b border-blue-800/30">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 text-center py-3 font-medium ${activeTab === 'overview' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-blue-300'}`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('dimensions')}
              className={`flex-1 text-center py-3 font-medium ${activeTab === 'dimensions' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-blue-300'}`}
            >
              Dimensões
            </button>
          </div>
        )}

        {/* Desktop and Tablet Layout */}
        {!isMobile && (
          <div className="grid lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-panel rounded-2xl p-6"
              >
                <h3 className="text-2xl font-bold text-white mb-4">As Três Metadimensões</h3>
                <p className="text-blue-200 mb-6">
                  Cada consulta é analisada através de três metadimensões que capturam a complexidade da experiência
                  humana. Isso permite identificar padrões e conexões que normalmente passariam despercebidos.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      name: "Emocional",
                      color: "bg-gradient-to-r from-blue-500 to-blue-600",
                      description: "Captura nuances de emoções expressas na linguagem, tom e contexto da consulta",
                    },
                    {
                      name: "Cognitiva",
                      color: "bg-gradient-to-r from-green-500 to-green-600",
                      description: "Identifica padrões de pensamento, crenças e processos mentais do paciente",
                    },
                    {
                      name: "Autonomia",
                      color: "bg-gradient-to-r from-pink-500 to-purple-600",
                      description: "Avalia a capacidade de autodeterminação, independência e tomada de decisões",
                    },
                  ].map((dim, idx) => (
                    <motion.div
                      key={idx}
                      className={`w-full flex items-center p-3 rounded-lg transition-all ${dim.color} text-white`}
                      whileHover={{ x: 5 }}
                    >
                      <span className="font-medium">{dim.name}</span>
                      <span className="ml-3 text-sm opacity-90">{dim.description}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-panel rounded-2xl overflow-hidden relative h-[500px]"
              >
                {/* Visualização de Rede Neural */}
                <CognitiveNetworkVisualizer
                  parameters={{
                    nodeCount: 60,
                    connectionStrength: 0.4,
                    activationSpeed: 0.5,
                  }}
                />
              </motion.div>
            </div>
          </div>
        )}
        
        {/* Mobile Layout - Conditional rendering based on active tab */}
        {isMobile && activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 mb-8"
          >
            <div className="glass-panel rounded-2xl p-4">
              <h3 className="text-xl font-bold text-white mb-3">Visão de Dimensões</h3>
              <p className="text-blue-200 text-sm mb-4">
                Nossa tecnologia analisa cada consulta através de três metadimensões principais, desmembrando-as em dimensões específicas para capturar toda a complexidade da experiência humana.
              </p>
              
              <div className="h-[180px] overflow-hidden rounded-lg relative mb-2">
                <CognitiveNetworkVisualizer
                  parameters={{
                    nodeCount: 30,
                    connectionStrength: 0.4,
                    activationSpeed: 0.4,
                  }}
                />
              </div>
              
              <div className="flex justify-center gap-3 pt-2">
                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">Emocional</span>
                <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium">Cognitiva</span>
                <span className="inline-block px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs font-medium">Autonomia</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              {[
                {
                  name: "Emocional",
                  color: "bg-gradient-to-r from-blue-500 to-blue-600",
                  description: "Captura nuances de emoções na consulta",
                },
                {
                  name: "Cognitiva",
                  color: "bg-gradient-to-r from-green-500 to-green-600",
                  description: "Mapeia padrões de pensamento e crenças",
                },
                {
                  name: "Autonomia",
                  color: "bg-gradient-to-r from-pink-500 to-purple-600",
                  description: "Avalia capacidade de autodeterminação",
                },
              ].map((dim, idx) => (
                <motion.div
                  key={idx}
                  className={`w-full flex items-center p-3 rounded-lg transition-all ${dim.color} text-white`}
                  whileHover={{ x: 5 }}
                >
                  <span className="font-medium">{dim.name}</span>
                  <span className="ml-3 text-xs opacity-90">{dim.description}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {isMobile && activeTab === 'dimensions' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 mb-8"
          >
            <div className="rounded-lg overflow-hidden bg-gradient-to-b from-blue-900/30 to-blue-950/30 p-4">
              <h4 className="text-lg font-bold text-blue-400 mb-3 text-center">Dimensão Emocional</h4>
              <ul className="space-y-2">
                {["Valência Emocional", "Excitação Emocional", "Dominância Emocional", "Intensidade Afetiva"].map(
                  (dim, i) => (
                    <li key={i} className="bg-blue-900/30 text-blue-200 p-2 rounded-lg text-center text-sm">
                      {dim}
                    </li>
                  ),
                )}
              </ul>
            </div>
            
            <div className="rounded-lg overflow-hidden bg-gradient-to-b from-green-900/30 to-green-950/30 p-4">
              <h4 className="text-lg font-bold text-green-400 mb-3 text-center">Dimensão Cognitiva</h4>
              <ul className="space-y-2">
                {[
                  "Complexidade Sintática",
                  "Coerência Narrativa",
                  "Flexibilidade Cognitiva",
                  "Dissonância Cognitiva",
                ].map((dim, i) => (
                  <li key={i} className="bg-green-900/30 text-green-200 p-2 rounded-lg text-center text-sm">
                    {dim}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="rounded-lg overflow-hidden bg-gradient-to-b from-pink-900/30 to-pink-950/30 p-4">
              <h4 className="text-lg font-bold text-pink-400 mb-3 text-center">Dimensão Autonomia</h4>
              <ul className="space-y-2">
                {["Perspectiva Temporal", "Autocontrole"].map((dim, i) => (
                  <li key={i} className="bg-pink-900/30 text-pink-200 p-2 rounded-lg text-center text-sm">
                    {dim}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* Desktop/Tablet 10 Dimensions */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-2xl p-6 mt-12"
          >
            <h3 className="text-2xl font-bold text-white mb-4 text-center">As 10 Dimensões Fundamentais</h3>

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-xl font-bold text-blue-400 mb-4 text-center">Dimensão Emocional</h4>
                <ul className="space-y-3">
                  {["Valência Emocional", "Excitação Emocional", "Dominância Emocional", "Intensidade Afetiva"].map(
                    (dim, i) => (
                      <li key={i} className="bg-blue-900/30 text-blue-200 p-2 rounded-lg text-center">
                        {dim}
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-green-400 mb-4 text-center">Dimensão Cognitiva</h4>
                <ul className="space-y-3">
                  {[
                    "Complexidade Sintática",
                    "Coerência Narrativa",
                    "Flexibilidade Cognitiva",
                    "Dissonância Cognitiva",
                  ].map((dim, i) => (
                    <li key={i} className="bg-green-900/30 text-green-200 p-2 rounded-lg text-center">
                      {dim}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-pink-400 mb-4 text-center">Dimensão Autonomia</h4>
                <ul className="space-y-3">
                  {["Perspectiva Temporal", "Autocontrole"].map((dim, i) => (
                    <li key={i} className="bg-pink-900/30 text-pink-200 p-2 rounded-lg text-center">
                      {dim}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
