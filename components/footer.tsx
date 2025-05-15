"use client"

import Link from "next/link"
import { useState } from "react"
import AnimatedLogo from "./animated-logo"
import VerticalBarsBackground from "./vertical-bars-background"

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear())

  return (
    <footer className="bg-gradient-to-b from-[#003369] to-[#002246] text-white/90 pt-12 md:pt-20 pb-16 md:pb-8 relative">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-500"></div>

      {/* Background patterns */}
      <VerticalBarsBackground count={20} opacity={0.05} />

      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-16">
          {/* Logo area */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <AnimatedLogo size="md" />
              <h3 className="text-2xl font-bold text-white relative inline-block">
                HEALTH/HEALTH
                <span className="absolute bottom-[-8px] left-0 w-10 h-[3px] bg-gradient-to-r from-blue-500 to-transparent rounded-md transition-all duration-300 hover:w-full"></span>
              </h3>
            </div>
            <p className="text-white/70 mb-2">Dimensional Vector Psychiatry. Care Enhanced by AI.</p>
            <p className="font-mono text-sm bg-white/5 px-3 py-1 rounded inline-block text-white/60">
              healthhealth.io — an IREAJE.CLOUD tool
            </p>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10 relative">
              Direct Contact
              <span className="absolute left-0 bottom-[-1px] w-10 h-[2px] bg-gradient-to-r from-blue-500 to-transparent"></span>
            </h4>
            <p className="mb-2">
              <Link
                href="mailto:founder@healthhealth.io"
                className="text-white/80 hover:text-blue-300 transition-colors"
              >
                founder@healthhealth.io
              </Link>
            </p>
            <p>
              <Link
                href="mailto:health.health@ireaje.cloud"
                className="text-white/80 hover:text-blue-300 transition-colors"
              >
                health.health@ireaje.cloud
              </Link>
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10 relative">
              Navigation
              <span className="absolute left-0 bottom-[-1px] w-10 h-[2px] bg-gradient-to-r from-blue-500 to-transparent"></span>
            </h4>
            <Link href="#what-is" className="block mb-2 text-white/80 hover:text-blue-300 hover:pl-5 transition-all">
              What is HEALTH/HEALTH
            </Link>
            <Link
              href="#differentiators"
              className="block mb-2 text-white/80 hover:text-blue-300 hover:pl-5 transition-all"
            >
              Our Differentiators
            </Link>
            <Link href="#credentials" className="block text-white/80 hover:text-blue-300 hover:pl-5 transition-all">
              Credentials
            </Link>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">&copy; {year} HEALTH/HEALTH. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-white/60 hover:text-blue-300 transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-blue-500 hover:after:w-full after:transition-all"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-white/60 hover:text-blue-300 transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-blue-500 hover:after:w-full after:transition-all"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
