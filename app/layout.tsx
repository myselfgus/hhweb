import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Manrope } from "next/font/google"
import "@/styles/global.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "HEALTH/HEALTH - Revolucione Sua Prática Clínica",
  description: "IA que documenta automaticamente cada consulta, enquanto você mantém o foco total no paciente",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${spaceGrotesk.variable} ${manrope.variable} viewport-fixed-wrapper`}>{children}</body>
    </html>
  )
}
