"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import LanguageToggle from "./language-toggle"
import { Menu, X } from "lucide-react"
import { useBackground } from "@/context/background-context"

interface NavLinkProps {
  href: string
  label: string
  isActive: boolean
  onClick: () => void
}

function NavLink({ href, label, isActive, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        onClick()

        // Get the target element
        const targetId = href.replace("#", "")
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          // Smooth scroll to the element
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for header height
            behavior: "smooth",
          })
        }
      }}
      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-cyan-600 ${
        isActive ? "text-cyan-600" : "text-gray-700"
      }`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-300 ${
          isActive ? "w-full" : "w-0"
        }`}
      ></span>
    </a>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const { currentSection } = useBackground()

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#what-is", label: "About" },
    { href: "#features", label: "Features" },
    { href: "#who-for", label: "Audience" },
    { href: "#differentiators", label: "Differentiators" },
    { href: "#credentials", label: "Credentials" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white/90"
      }`}
    >
      <div className="container mx-auto">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-[70px]"}`}
        >
          <Link
            href="#hero"
            className="flex items-center gap-3 hover:translate-y-[-1px] transition-transform duration-300"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }}
          >
            <div className="relative h-10 w-10">
              <Image
                src="/placeholder-4ku3i.png"
                alt="HEALTH/HEALTH Logo"
                width={40}
                height={40}
                className="object-contain transition-transform duration-300"
              />
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">HEALTH/HEALTH</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={currentSection === link.href.replace("#", "")}
                onClick={() => {}}
              />
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageToggle />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-cyan-600 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-white/70 to-gray-50/90 border border-gray-200/80 rounded-md px-3 py-2 shadow-sm">
              <span className="text-xs font-semibold text-gray-600">Proud Member</span>
              <Image
                src="/microsoft-logo.png"
                alt="Microsoft for Startups Founders Hub"
                width={20}
                height={20}
                className="h-5 w-auto transition-transform duration-300 hover:scale-110"
              />
              <span className="text-xs text-gray-700 hidden md:inline">Microsoft for Startups Founders Hub</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute w-full bg-white/98 backdrop-blur-sm shadow-md transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-[400px] border-b border-gray-100" : "max-h-0"
        }`}
      >
        <nav className="container mx-auto py-4 flex flex-col space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={currentSection === link.href.replace("#", "")}
              onClick={() => setMobileMenuOpen(false)}
            />
          ))}
          <div className="flex items-center gap-2 bg-gradient-to-r from-white/70 to-gray-50/90 border border-gray-200/80 rounded-md px-3 py-2 mt-4 shadow-sm">
            <span className="text-xs font-semibold text-gray-600">Proud Member</span>
            <Image
              src="/microsoft-logo.png"
              alt="Microsoft for Startups Founders Hub"
              width={20}
              height={20}
              className="h-5 w-auto"
            />
            <span className="text-xs text-gray-700">Microsoft for Startups Founders Hub</span>
          </div>
        </nav>
      </div>
    </header>
  )
}
