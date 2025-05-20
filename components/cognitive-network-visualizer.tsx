"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface CognitiveNetworkVisualizerProps {
  parameters?: {
    nodeCount?: number
    connectionStrength?: number
    activationSpeed?: number
  }
}

export function CognitiveNetworkVisualizer({
  parameters = {
    nodeCount: 60,
    connectionStrength: 0.4,
    activationSpeed: 0.5,
  },
}: CognitiveNetworkVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Configuração da cena
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0f172a)

    // Configuração da câmera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.set(0, 0, 20)
    camera.lookAt(0, 0, 0)

    // Configuração do renderizador
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Adicionar luzes
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 2, 3)
    scene.add(directionalLight)

    // Definir as metadimensões e suas cores
    const metadimensions = [
      { name: "Emocional", color: new THREE.Color(0x3b82f6), dimensions: 4 }, // Azul
      { name: "Cognitiva", color: new THREE.Color(0x10b981), dimensions: 4 }, // Verde
      { name: "Autonomia", color: new THREE.Color(0xec4899), dimensions: 2 }, // Rosa
    ]

    // Criar rede cognitiva
    const createCognitiveNetwork = () => {
      const nodes = []
      const connections = []
      const dimensionLabels = []

      // Criar nós para cada metadimensão
      metadimensions.forEach((metadim, metaIndex) => {
        const metaNodes = []
        const metaZ = (metaIndex - 1) * 8 // Posicionar cada metadimensão em um plano Z diferente

        // Criar nós para cada dimensão dentro da metadimensão
        for (let dimIndex = 0; dimIndex < metadim.dimensions; dimIndex++) {
          // Distribuir nós em círculo
          const angle = (dimIndex / metadim.dimensions) * Math.PI * 2
          const radius = 5

          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          const z = metaZ

          // Criar geometria do nó principal (dimensão)
          const geometry = new THREE.SphereGeometry(0.4, 16, 16)
          const material = new THREE.MeshPhongMaterial({
            color: metadim.color,
            emissive: metadim.color.clone().multiplyScalar(0.2),
            shininess: 30,
          })

          const node = new THREE.Mesh(geometry, material)
          node.position.set(x, y, z)
          scene.add(node)

          // Adicionar nós secundários ao redor do nó principal
          const subNodes = []
          const subNodeCount = Math.floor(parameters.nodeCount / 10)

          for (let i = 0; i < subNodeCount; i++) {
            const subAngle = (i / subNodeCount) * Math.PI * 2
            const subRadius = 1.5

            const subX = x + Math.cos(subAngle) * subRadius
            const subY = y + Math.sin(subAngle) * subRadius
            const subZ = z

            const subGeometry = new THREE.SphereGeometry(0.15, 8, 8)
            const subMaterial = new THREE.MeshPhongMaterial({
              color: metadim.color.clone().multiplyScalar(0.8),
              transparent: true,
              opacity: 0.7,
            })

            const subNode = new THREE.Mesh(subGeometry, subMaterial)
            subNode.position.set(subX, subY, subZ)
            scene.add(subNode)

            subNodes.push({
              mesh: subNode,
              position: new THREE.Vector3(subX, subY, subZ),
              color: metadim.color.clone(),
              activation: 0,
              metadimension: metaIndex,
              dimension: dimIndex,
            })

            // Conectar subnó ao nó principal
            const points = [new THREE.Vector3(x, y, z), new THREE.Vector3(subX, subY, subZ)]
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
            const lineMaterial = new THREE.LineBasicMaterial({
              color: metadim.color.clone().multiplyScalar(0.5),
              transparent: true,
              opacity: 0.3,
            })

            const line = new THREE.Line(lineGeometry, lineMaterial)
            scene.add(line)

            connections.push({
              line: line,
              source: { position: new THREE.Vector3(x, y, z) },
              target: subNodes[subNodes.length - 1],
              weight: 0.8,
              signal: 0,
            })
          }

          metaNodes.push({
            mesh: node,
            position: new THREE.Vector3(x, y, z),
            color: metadim.color,
            activation: 0,
            metadimension: metaIndex,
            dimension: dimIndex,
            subNodes: subNodes,
          })

          // Adicionar rótulo para a dimensão
          const dimensionNames = [
            // Emocional
            ["Valência Emocional", "Excitação Emocional", "Dominância Emocional", "Intensidade Afetiva"],
            // Cognitiva
            ["Complexidade Sintática", "Coerência Narrativa", "Flexibilidade Cognitiva", "Dissonância Cognitiva"],
            // Autonomia
            ["Perspectiva Temporal", "Autocontrole"],
          ]

          const labelPosition = new THREE.Vector3(x * 1.3, y * 1.3, z)

          const canvas = document.createElement("canvas")
          canvas.width = 256
          canvas.height = 64

          const context = canvas.getContext("2d")
          if (context) {
            context.fillStyle = "transparent"
            context.fillRect(0, 0, canvas.width, canvas.height)

            context.font = "bold 16px Arial"
            context.fillStyle = new THREE.Color(metadim.color).getStyle()
            context.textAlign = "center"
            context.textBaseline = "middle"
            context.fillText(dimensionNames[metaIndex][dimIndex], canvas.width / 2, canvas.height / 2)

            const texture = new THREE.CanvasTexture(canvas)
            const spriteMaterial = new THREE.SpriteMaterial({ map: texture })
            const sprite = new THREE.Sprite(spriteMaterial)
            sprite.position.copy(labelPosition)
            sprite.scale.set(4, 1, 1)
            scene.add(sprite)

            dimensionLabels.push(sprite)
          }
        }

        nodes.push(metaNodes)
      })

      // Criar conexões entre metadimensões
      for (let i = 0; i < nodes.length - 1; i++) {
        const currentMeta = nodes[i]
        const nextMeta = nodes[i + 1]

        for (let j = 0; j < currentMeta.length; j++) {
          const sourceNode = currentMeta[j]

          // Conectar com alguns nós da próxima metadimensão
          const connectionsCount = Math.ceil(nextMeta.length * parameters.connectionStrength)

          for (let k = 0; k < connectionsCount; k++) {
            const targetIndex = Math.floor(Math.random() * nextMeta.length)
            const targetNode = nextMeta[targetIndex]

            // Criar geometria da conexão
            const points = [sourceNode.position, targetNode.position]
            const geometry = new THREE.BufferGeometry().setFromPoints(points)

            const material = new THREE.LineBasicMaterial({
              color: new THREE.Color().lerpColors(sourceNode.color, targetNode.color, 0.5),
              transparent: true,
              opacity: 0.2,
            })

            const line = new THREE.Line(geometry, material)
            scene.add(line)

            connections.push({
              line: line,
              source: sourceNode,
              target: targetNode,
              weight: Math.random(),
              signal: 0,
            })
          }
        }
      }

      // Adicionar rótulos para as metadimensões
      metadimensions.forEach((metadim, index) => {
        const z = (index - 1) * 8
        const labelPosition = new THREE.Vector3(0, 7, z)

        const canvas = document.createElement("canvas")
        canvas.width = 512
        canvas.height = 128

        const context = canvas.getContext("2d")
        if (context) {
          context.fillStyle = "transparent"
          context.fillRect(0, 0, canvas.width, canvas.height)

          context.font = "bold 32px Arial"
          context.fillStyle = new THREE.Color(metadim.color).getStyle()
          context.textAlign = "center"
          context.textBaseline = "middle"
          context.fillText(`Dimensão ${metadim.name}`, canvas.width / 2, canvas.height / 2)

          const texture = new THREE.CanvasTexture(canvas)
          const spriteMaterial = new THREE.SpriteMaterial({ map: texture })
          const sprite = new THREE.Sprite(spriteMaterial)
          sprite.position.copy(labelPosition)
          sprite.scale.set(8, 2, 1)
          scene.add(sprite)

          dimensionLabels.push(sprite)
        }
      })

      return { nodes, connections, dimensionLabels }
    }

    const { nodes, connections, dimensionLabels } = createCognitiveNetwork()

    // Função para propagar ativação pela rede
    const propagateActivation = () => {
      // Ativar aleatoriamente alguns nós
      nodes.forEach((metaNodes, metaIndex) => {
        metaNodes.forEach((node) => {
          if (Math.random() < 0.05) {
            node.activation = 1.0

            // Ativar subnós
            node.subNodes.forEach((subNode) => {
              subNode.activation = 1.0
              updateNodeVisualization(subNode)
            })
          } else {
            node.activation *= 0.95 // Decaimento
          }

          updateNodeVisualization(node)
        })
      })

      // Propagar ativação através das conexões
      connections.forEach((connection) => {
        if (connection.source.activation) {
          connection.signal = connection.source.activation * connection.weight

          // Atualizar visualização da conexão
          updateConnectionVisualization(connection)

          // Ativar nó alvo
          if (connection.target.activation !== undefined) {
            connection.target.activation = Math.min(
              1.0,
              connection.target.activation + connection.signal * parameters.activationSpeed,
            )
            updateNodeVisualization(connection.target)
          }
        }
      })

      // Decaimento de ativação para todos os nós
      nodes.flat().forEach((node) => {
        node.activation *= 0.98
        updateNodeVisualization(node)

        node.subNodes.forEach((subNode) => {
          subNode.activation *= 0.98
          updateNodeVisualization(subNode)
        })
      })
    }

    // Atualizar visualização de um nó
    const updateNodeVisualization = (node) => {
      if (!node.mesh) return

      // Escala baseada na ativação
      const baseScale = node.subNodes ? 0.4 : 0.15
      const scale = baseScale + node.activation * 0.3
      node.mesh.scale.set(scale, scale, scale)

      // Brilho baseado na ativação
      const material = node.mesh.material
      if (material.emissive) {
        material.emissive = node.color.clone().multiplyScalar(node.activation * 0.5)
      }
    }

    // Atualizar visualização de uma conexão
    const updateConnectionVisualization = (connection) => {
      const material = connection.line.material

      // Opacidade baseada no sinal
      const signalStrength = connection.signal || 0
      material.opacity = 0.1 + signalStrength * 0.9

      // Cor da conexão
      if (connection.source.color && connection.target.color) {
        const color = connection.source.color.clone().lerp(connection.target.color, 0.5)
        material.color = color.multiplyScalar(0.5 + signalStrength * 0.5)
      }
    }

    // Rotação automática da câmera
    let cameraAngle = 0

    // Função de animação
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)

      time += 0.01

      // Propagar ativação a cada poucos frames
      if (Math.floor(time * 60) % 5 === 0) {
        propagateActivation()
      }

      // Rotação automática da câmera
      cameraAngle += 0.002
      camera.position.x = Math.sin(cameraAngle) * 20
      camera.position.z = Math.cos(cameraAngle) * 20
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // Lidar com redimensionamento
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Limpeza
    return () => {
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener("resize", handleResize)

      // Limpar geometrias e materiais
      nodes.flat().forEach((node) => {
        node.mesh.geometry.dispose()
        node.mesh.material.dispose()

        node.subNodes.forEach((subNode) => {
          subNode.mesh.geometry.dispose()
          subNode.mesh.material.dispose()
        })
      })

      connections.forEach((connection) => {
        connection.line.geometry.dispose()
        connection.line.material.dispose()
      })

      dimensionLabels.forEach((label) => {
        label.material.map.dispose()
        label.material.dispose()
      })
    }
  }, [parameters])

  return (
    <div className="w-full h-full" ref={containerRef}>
      <div className="absolute top-4 left-4 glass p-3 rounded-lg text-white text-lg font-bold">Rede Dimensional</div>
    </div>
  )
}
