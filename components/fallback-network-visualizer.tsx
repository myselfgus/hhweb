"use client"

import { useEffect, useRef } from "react"

export function FallbackNetworkVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar tamanho do canvas
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Definir nós e conexões
    const nodes = []
    const connections = []

    // Cores para as metadimensões
    const colors = [
      "#3b82f6", // Azul - Emocional
      "#10b981", // Verde - Cognitiva
      "#ec4899", // Rosa - Autonomia
    ]

    // Criar nós
    const createNodes = () => {
      // Limpar arrays
      nodes.length = 0
      connections.length = 0

      // Criar nós para cada metadimensão
      for (let meta = 0; meta < 3; meta++) {
        const nodesCount = meta === 2 ? 2 : 4 // 4 nós para Emocional e Cognitiva, 2 para Autonomia
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const radius = Math.min(canvas.width, canvas.height) * 0.3
        const zOffset = (meta - 1) * 0.3 // Simular profundidade

        for (let i = 0; i < nodesCount; i++) {
          const angle = (i / nodesCount) * Math.PI * 2
          const x = centerX + Math.cos(angle) * radius * (1 + zOffset)
          const y = centerY + Math.sin(angle) * radius

          nodes.push({
            x,
            y,
            radius: 10,
            color: colors[meta],
            activation: 0,
            meta,
            index: i,
          })

          // Adicionar nós secundários
          const subNodeCount = 5
          for (let j = 0; j < subNodeCount; j++) {
            const subAngle = angle + (j / subNodeCount - 0.5) * Math.PI * 0.5
            const subRadius = radius * 0.3
            const subX = x + Math.cos(subAngle) * subRadius
            const subY = y + Math.sin(subAngle) * subRadius

            nodes.push({
              x: subX,
              y: subY,
              radius: 4,
              color: colors[meta],
              activation: 0,
              meta,
              index: i,
              isSubNode: true,
            })

            // Conectar ao nó principal
            connections.push({
              from: { x, y },
              to: { x: subX, y: subY },
              color: colors[meta],
              activation: 0,
            })
          }
        }
      }

      // Criar conexões entre metadimensões
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].isSubNode) continue

        for (let j = 0; j < nodes.length; j++) {
          if (nodes[j].isSubNode) continue
          if (nodes[i].meta === nodes[j].meta) continue
          if (Math.abs(nodes[i].meta - nodes[j].meta) !== 1) continue
          if (Math.random() > 0.3) continue

          connections.push({
            from: { x: nodes[i].x, y: nodes[i].y },
            to: { x: nodes[j].x, y: nodes[j].y },
            color: `rgba(${hexToRgb(colors[nodes[i].meta])}, 0.2)`,
            activation: 0,
          })
        }
      }
    }

    // Converter hex para rgb
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? `${Number.parseInt(result[1], 16)}, ${Number.parseInt(result[2], 16)}, ${Number.parseInt(result[3], 16)}`
        : "255, 255, 255"
    }

    // Criar nós iniciais
    createNodes()

    // Animar a rede
    let animationFrame
    let time = 0

    const animate = () => {
      time += 0.02

      // Limpar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Desenhar conexões
      connections.forEach((conn) => {
        // Atualizar ativação
        conn.activation *= 0.95

        // Desenhar linha
        ctx.beginPath()
        ctx.moveTo(conn.from.x, conn.from.y)
        ctx.lineTo(conn.to.x, conn.to.y)

        // Cor baseada na ativação
        const alpha = 0.1 + conn.activation * 0.9
        if (conn.color.startsWith("rgba")) {
          const baseParts = conn.color.split(",")
          const baseRgb = baseParts[0].split("(")[1] + "," + baseParts[1] + "," + baseParts[2]
          ctx.strokeStyle = `rgba(${baseRgb}, ${alpha})`
        } else {
          ctx.strokeStyle = conn.color.replace("1)", `${alpha})`)
        }

        ctx.lineWidth = 1 + conn.activation * 2
        ctx.stroke()
      })

      // Desenhar nós
      nodes.forEach((node) => {
        // Ativar aleatoriamente alguns nós
        if (!node.isSubNode && Math.random() < 0.01) {
          node.activation = 1

          // Propagar para conexões
          connections.forEach((conn) => {
            if ((conn.from.x === node.x && conn.from.y === node.y) || (conn.to.x === node.x && conn.to.y === node.y)) {
              conn.activation = 1
            }
          })
        }

        // Decaimento da ativação
        node.activation *= 0.98

        // Desenhar círculo
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * (1 + node.activation * 0.5), 0, Math.PI * 2)

        // Gradiente baseado na ativação
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 2)

        const baseColor = node.color
        const glowColor = node.color

        gradient.addColorStop(0, baseColor)
        gradient.addColorStop(1, `rgba(${hexToRgb(glowColor)}, 0)`)

        ctx.fillStyle = baseColor
        ctx.fill()

        // Adicionar brilho se ativado
        if (node.activation > 0.1) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius * 2 * node.activation, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      // Propagar ativação
      nodes.forEach((node) => {
        if (node.activation > 0.1) {
          connections.forEach((conn) => {
            if (conn.from.x === node.x && conn.from.y === node.y) {
              conn.activation = Math.max(conn.activation, node.activation * 0.8)

              // Encontrar nó de destino
              const targetNode = nodes.find((n) => n.x === conn.to.x && n.y === conn.to.y)
              if (targetNode) {
                targetNode.activation = Math.max(targetNode.activation, node.activation * 0.7)
              }
            } else if (conn.to.x === node.x && conn.to.y === node.y) {
              conn.activation = Math.max(conn.activation, node.activation * 0.8)

              // Encontrar nó de origem
              const sourceNode = nodes.find((n) => n.x === conn.from.x && n.y === conn.from.y)
              if (sourceNode) {
                sourceNode.activation = Math.max(sourceNode.activation, node.activation * 0.7)
              }
            }
          })
        }
      })

      // Adicionar rótulos
      const metadimensions = ["Emocional", "Cognitiva", "Autonomia"]
      for (let i = 0; i < metadimensions.length; i++) {
        ctx.font = "bold 16px Arial"
        ctx.fillStyle = colors[i]
        ctx.textAlign = "center"

        const y = canvas.height * 0.1 + i * 30
        ctx.fillText(`Dimensão ${metadimensions[i]}`, canvas.width / 2, y)
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="w-full h-full relative">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 glass p-3 rounded-lg text-white text-lg font-bold">Rede Dimensional</div>
    </div>
  )
}
