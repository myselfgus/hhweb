"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function FallbackVisualizer() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-900">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[80%] h-[80%]">
          <Image
            src="/placeholder.svg?height=500&width=800"
            alt="Paisagem Cognitiva"
            layout="fill"
            objectFit="contain"
            className="opacity-80"
          />

          {/* Rótulos */}
          <div className="absolute top-[10%] left-[50%] transform -translate-x-1/2 text-white font-bold text-xl">
            Paisagem Cognitiva
          </div>

          <div className="absolute bottom-[10%] left-[15%] text-cyan-400 text-sm">Dissonância Cognitiva</div>

          <div className="absolute bottom-[10%] right-[15%] text-cyan-400 text-sm">Flexibilidade Cognitiva</div>

          <div className="absolute top-[20%] left-[15%] text-cyan-400 text-sm">Coerência Narrativa</div>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
        animate={{
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
