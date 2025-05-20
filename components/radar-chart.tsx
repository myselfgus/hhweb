"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface RadarChartProps {
  dimensions: number
}

export function RadarChart({ dimensions = 6 }: RadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const size = 300
    canvas.width = size
    canvas.height = size

    // Center point
    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.4

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Draw background web
    drawWeb(ctx, centerX, centerY, radius, dimensions)

    // Draw data points
    const dataPoints = generateRandomData(dimensions)
    drawDataPoints(ctx, centerX, centerY, radius, dimensions, dataPoints)

    // Draw labels
    drawLabels(ctx, centerX, centerY, radius, dimensions)
  }, [dimensions])

  return (
    <motion.div
      className="relative h-[300px] w-[300px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </motion.div>
  )
}

function drawWeb(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, dimensions: number) {
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
  ctx.lineWidth = 1

  // Draw circles
  for (let i = 1; i <= 4; i++) {
    const currentRadius = (radius / 4) * i
    ctx.beginPath()
    ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2)
    ctx.stroke()
  }

  // Draw lines
  for (let i = 0; i < dimensions; i++) {
    const angle = (Math.PI * 2 * i) / dimensions - Math.PI / 2
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)

    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

function generateRandomData(dimensions: number): number[] {
  return Array.from({ length: dimensions }, () => 0.3 + Math.random() * 0.6)
}

function drawDataPoints(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  dimensions: number,
  dataPoints: number[],
) {
  // Draw data shape
  ctx.beginPath()
  ctx.fillStyle = "rgba(6, 182, 212, 0.2)"
  ctx.strokeStyle = "rgba(6, 182, 212, 0.8)"
  ctx.lineWidth = 2

  for (let i = 0; i < dimensions; i++) {
    const angle = (Math.PI * 2 * i) / dimensions - Math.PI / 2
    const value = dataPoints[i]
    const x = centerX + radius * value * Math.cos(angle)
    const y = centerY + radius * value * Math.sin(angle)

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }

  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // Draw data points
  for (let i = 0; i < dimensions; i++) {
    const angle = (Math.PI * 2 * i) / dimensions - Math.PI / 2
    const value = dataPoints[i]
    const x = centerX + radius * value * Math.cos(angle)
    const y = centerY + radius * value * Math.sin(angle)

    ctx.beginPath()
    ctx.fillStyle = "rgb(6, 182, 212)"
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawLabels(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  dimensions: number,
) {
  const labels = [
    "Emocional",
    "Cognitivo",
    "Social",
    "Existencial",
    "Motivacional",
    "Perceptivo",
    "Comportamental",
    "Fisiológico",
    "Contextual",
    "Temporal",
  ].slice(0, dimensions)

  ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
  ctx.font = "10px var(--font-body, sans-serif)"
  ctx.textAlign = "center"

  for (let i = 0; i < dimensions; i++) {
    const angle = (Math.PI * 2 * i) / dimensions - Math.PI / 2
    const labelRadius = radius * 1.15
    const x = centerX + labelRadius * Math.cos(angle)
    const y = centerY + labelRadius * Math.sin(angle)

    ctx.fillText(labels[i], x, y)
  }
}
