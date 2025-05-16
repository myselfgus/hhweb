import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Montserrat, Sora, Space_Grotesk, Playfair_Display, Manrope } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { BackgroundProvider } from "@/context/background-context"

// Definição das fontes
const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap"
})

const sora = Sora({ 
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap"
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
})

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
})

const manrope = Manrope({ 
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
})

export const metadata: Metadata = {
  title: "HEALTH/HEALTH - An AI-clinician built for care, not bureaucracy",
  description:
    "HEALTH/HEALTH is a dimensional AI platform for psychiatry, powered by symbolic language and a proprietary runtime. It delivers diagnostic clarity and therapeutic precision in real time.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${sora.variable} ${spaceGrotesk.variable} ${playfairDisplay.variable} ${manrope.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange suppressHydrationWarning>
          <BackgroundProvider>{children}</BackgroundProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
