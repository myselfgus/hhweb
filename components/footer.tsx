"use client"

import Link from "next/link"
import { useState } from "react"

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear())

  return (
    <footer className="bg-gradient-to-b from-[#0d2240] to-[#10284a] text-white/90 pt-20 pb-8 relative">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-800 to-cyan-500"></div>

      {/* Background patterns */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute h-full w-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2740%27%20height%3D%2740%27%20viewBox%3D%270%200%2040%2040%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.02%27%20fill-rule%3D%27evenodd%27%3E%3Cpath%20d%3D%27M0%2038.59l2.83-2.83%201.41%201.41L1.41%2040H0v-1.41zM0%201.4l2.83%202.83%201.41-1.41L1.41%200H0v1.41zM38.59%2040l-2.83-2.83%201.41-1.41L40%2038.59V40h-1.41zM40%201.41l-2.83%202.83-1.41-1.41L38.59%200H40v1.41zM20%2018.6l2.83-2.83%201.41%201.41L21.41%2020l2.83%202.83-1.41%201.41L20%2021.41l-2.83%202.83-1.41-1.41L18.59%2020l-2.83-2.83%201.41-1.41L20%2018.59z%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
      </div>

      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          {/* Logo area */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4 relative inline-block">
              HEALTH/HEALTH
              <span className="absolute bottom-[-8px] left-0 w-10 h-[3px] bg-gradient-to-r from-cyan-500 to-transparent rounded-md transition-all duration-300 hover:w-full"></span>
            </h3>
            <p className="text-white/70 mb-2">Dimensional Vector Psychiatry. Care Enhanced by AI.</p>
            <p className="font-mono text-sm bg-white/5 px-3 py-1 rounded inline-block text-white/60">
              healthhealth.io — an IREAJE.CLOUD tool
            </p>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10 relative">
              Direct Contact
              <span className="absolute left-0 bottom-[-1px] w-10 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent"></span>
            </h4>
            <p className="mb-2">
              <Link
                href="mailto:founder@healthhealth.io"
                className="text-white/80 hover:text-cyan-300 transition-colors"
              >
                founder@healthhealth.io
              </Link>
            </p>
            <p>
              <Link
                href="mailto:health.health@ireaje.cloud"
                className="text-white/80 hover:text-cyan-300 transition-colors"
              >
                health.health@ireaje.cloud
              </Link>
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10 relative">
              Navigation
              <span className="absolute left-0 bottom-[-1px] w-10 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent"></span>
            </h4>
            <Link href="#what-is" className="block mb-2 text-white/80 hover:text-cyan-300 hover:pl-5 transition-all">
              What is HEALTH/HEALTH
            </Link>
            <Link
              href="#differentiators"
              className="block mb-2 text-white/80 hover:text-cyan-300 hover:pl-5 transition-all"
            >
              Our Differentiators
            </Link>
            <Link href="#credentials" className="block text-white/80 hover:text-cyan-300 hover:pl-5 transition-all">
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
              className="text-sm text-white/60 hover:text-cyan-300 transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-cyan-500 hover:after:w-full after:transition-all"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-white/60 hover:text-cyan-300 transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-cyan-500 hover:after:w-full after:transition-all"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
