"use client"

import { motion } from "framer-motion"

export function FluidBackground() {
  return (
    <motion.div
      className="fluid-bg absolute inset-0 overflow-hidden z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      transition={{ duration: 1.5 }}
    >
      <div className="absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 scale-150 blur-3xl" />
    </motion.div>
  )
}
