"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useIsMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"

// Definição das dimensões conforme o modelo matemático
const dimensions = [
  // Metadimensão Emocional
  {
    name: "Valência Emocional",
    metadimension: "Emocional",
    description: "Polaridade hedônica da experiência",
    range: "[-5, +5]",
  },
  {
    name: "Excitação Emocional",
    metadimension: "Emocional",
    description: "Grau de ativação neurofisiológica",
    range: "[0, 10]",
  },
  {
    name: "Dominância Emocional",
    metadimension: "Emocional",
    description: "Percepção de controle sobre emoções",
    range: "[0, 10]",
  },
  {
    name: "Intensidade Afetiva",
    metadimension: "Emocional",
    description: "Magnitude experiencial da emoção",
    range: "[0, 10]",
  },

  // Metadimensão Cognitiva
  {
    name: "Complexidade Sintática",
    metadimension: "Cognitiva",
    description: "Elaboração estrutural do pensamento",
    range: "[0, 10]",
  },
  {
    name: "Coerência Narrativa",
    metadimension: "Cognitiva",
    description: "Integração lógico-temporal",
    range: "[0, 10]",
  },
  {
    name: "Flexibilidade Cognitiva",
    metadimension: "Cognitiva",
    description: "Capacidade de alterar esquemas mentais",
    range: "[0, 10]",
  },
  {
    name: "Dissonância Cognitiva",
    metadimension: "Cognitiva",
    description: "Tensão entre elementos incompatíveis",
    range: "[0, 10]",
  },

  // Metadimensão Autonomia
  {
    name: "Perspectiva Temporal",
    metadimension: "Autonomia",
    description: "Orientação no contínuo temporal",
    range: "[0, 10]",
  },
  {
    name: "Autocontrole",
    metadimension: "Autonomia",
    description: "Capacidade de autorregulação comportamental",
    range: "[0, 10]",
  },
]

// Cores para cada metadimensão
const metadimensionColors = {
  Emocional: new THREE.Color(0x3b82f6), // Azul
  Cognitiva: new THREE.Color(0x10b981), // Verde
  Autonomia: new THREE.Color(0xec4899), // Rosa
}

export function MathematicalModelVisualizer() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedDimension, setSelectedDimension] = useState(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!mountRef.current) return

    // Configuração da cena
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0f172a)

    // Dimensões do canvas
    const width = mountRef.current.clientWidth
    const height = mountRef.current.clientHeight

    // Configuração da câmera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(15, 15, 15)
    camera.lookAt(0, 0, 0)

    // Configuração do renderizador
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // Iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Grade de referência
    const gridHelper = new THREE.GridHelper(20, 20, 0x1e293b, 0x1e293b)
    scene.add(gridHelper)

    // Origem do sistema de coordenadas
    const originGeometry = new THREE.SphereGeometry(0.2, 16, 16)
    const originMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const origin = new THREE.Mesh(originGeometry, originMaterial)
    scene.add(origin)

    // Função para criar texto 3D
    const createTextSprite = (
      text: string,
      position: THREE.Vector3,
      color: THREE.Color = new THREE.Color(0xffffff),
    ) => {
      const canvas = document.createElement("canvas")
      canvas.width = 256
      canvas.height = 128

      const ctx = canvas.getContext("2d")
      if (!ctx) return null

      ctx.fillStyle = color.getStyle()
      ctx.font = "Bold 24px Arial"
      ctx.fillText(text, 8, 48)

      const texture = new THREE.CanvasTexture(canvas)
      const material = new THREE.SpriteMaterial({ map: texture })
      const sprite = new THREE.Sprite(material)
      sprite.position.copy(position)
      sprite.scale.set(5, 2.5, 1)

      return sprite
    }

    // Criar representação visual do espaço vetorial
    const createVectorSpace = () => {
      // Agrupar dimensões por metadimensão
      const metadimensions = {
        Emocional: dimensions.filter((d) => d.metadimension === "Emocional"),
        Cognitiva: dimensions.filter((d) => d.metadimension === "Cognitiva"),
        Autonomia: dimensions.filter((d) => d.metadimension === "Autonomia"),
      }

      // Criar representação visual para cada metadimensão
      Object.entries(metadimensions).forEach(([metaName, dims], metaIndex) => {
        const color = metadimensionColors[metaName as keyof typeof metadimensionColors]

        // Criar um plano representando o subespaço da metadimensão
        const planeGeometry = new THREE.PlaneGeometry(10, 10)
        const planeMaterial = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.1,
          side: THREE.DoubleSide,
        })

        const plane = new THREE.Mesh(planeGeometry, planeMaterial)

        // Posicionar os planos em diferentes orientações
        if (metaName === "Emocional") {
          plane.rotation.x = Math.PI / 2
          plane.position.set(0, -5, 0)
        } else if (metaName === "Cognitiva") {
          plane.rotation.y = Math.PI / 2
          plane.position.set(-5, 0, 0)
        } else {
          plane.position.set(0, 0, -5)
        }

        scene.add(plane)

        // Adicionar texto para a metadimensão
        const metaLabel = createTextSprite(
          `ℳ${metaName}`,
          new THREE.Vector3(
            metaName === "Cognitiva" ? -7 : 0,
            metaName === "Emocional" ? -7 : 0,
            metaName === "Autonomia" ? -7 : 0,
          ),
          color,
        )
        if (metaLabel) scene.add(metaLabel)

        // Criar eixos para cada dimensão dentro da metadimensão
        dims.forEach((dim, dimIndex) => {
          // Calcular direção do eixo baseado na metadimensão e índice
          const direction = new THREE.Vector3()

          if (metaName === "Emocional") {
            const angle = (dimIndex / dims.length) * Math.PI * 2
            direction.set(Math.cos(angle), 0, Math.sin(angle))
          } else if (metaName === "Cognitiva") {
            const angle = (dimIndex / dims.length) * Math.PI * 2
            direction.set(0, Math.cos(angle), Math.sin(angle))
          } else {
            const angle = (dimIndex / dims.length) * Math.PI * 2
            direction.set(Math.cos(angle), Math.sin(angle), 0)
          }

          // Criar linha representando o eixo
          const axisGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            direction.clone().multiplyScalar(7),
          ])

          const axisMaterial = new THREE.LineBasicMaterial({
            color: color,
            linewidth: dimIndex === selectedDimension % dims.length ? 3 : 1,
          })

          const axis = new THREE.Line(axisGeometry, axisMaterial)
          scene.add(axis)

          // Adicionar rótulo para a dimensão
          const dimPosition = direction.clone().multiplyScalar(8)
          const dimLabel = createTextSprite(
            `v${dims.length * metaIndex + dimIndex + 1}: ${dim.name}`,
            dimPosition,
            color,
          )
          if (dimLabel) scene.add(dimLabel)
        })
      })
    }

    // Criar pontos representando estados mentais
    const createMentalStates = () => {
      // Gerar alguns estados mentais aleatórios
      const states = []
      for (let i = 0; i < 20; i++) {
        const state = []
        for (let j = 0; j < 10; j++) {
          // Valores aleatórios para cada dimensão
          state.push(Math.random() * 10 - (j === 0 ? 5 : 0)) // Valência vai de -5 a 5, as outras de 0 a 10
        }
        states.push(state)
      }

      // Criar geometria para os pontos
      const geometry = new THREE.BufferGeometry()
      const positions = []
      const colors = []

      states.forEach((state) => {
        // Projetar o estado 10D em 3D para visualização
        // Usamos PCA simplificado: agrupamos por metadimensão
        const emotional = (state[0] + state[1] + state[2] + state[3]) / 4
        const cognitive = (state[4] + state[5] + state[6] + state[7]) / 4
        const autonomy = (state[8] + state[9]) / 2

        positions.push(emotional, cognitive, autonomy)

        // Cor baseada na posição no espaço
        const color = new THREE.Color()
        color.setRGB(
          0.3 + (0.7 * (emotional + 5)) / 10, // Normalizado para [0,1]
          0.3 + (0.7 * cognitive) / 10,
          0.3 + (0.7 * autonomy) / 10,
        )

        colors.push(color.r, color.g, color.b)
      })

      geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
      geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))

      const material = new THREE.PointsMaterial({
        size: 0.3,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
      })

      const points = new THREE.Points(geometry, material)
      scene.add(points)

      return points
    }

    // Criar trajetória representando mudança de estado mental ao longo do tempo
    const createTrajectory = () => {
      // Definir pontos da trajetória
      const curvePoints = [
        new THREE.Vector3(-3, -2, -1),
        new THREE.Vector3(-2, -1, 0),
        new THREE.Vector3(-1, 0, 1),
        new THREE.Vector3(0, 1, 2),
        new THREE.Vector3(1, 2, 3),
        new THREE.Vector3(2, 3, 2),
        new THREE.Vector3(3, 2, 1),
      ]

      // Criar curva suave através dos pontos
      const curve = new THREE.CatmullRomCurve3(curvePoints)
      const points = curve.getPoints(50)

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 3 })

      const trajectory = new THREE.Line(geometry, material)
      scene.add(trajectory)

      // Adicionar esferas nos pontos principais da trajetória
      const sphereGeometry = new THREE.SphereGeometry(0.15, 16, 16)

      curvePoints.forEach((point, index) => {
        const material = new THREE.MeshStandardMaterial({
          color: index === curvePoints.length - 1 ? 0xf59e0b : 0xffffff,
          emissive: index === curvePoints.length - 1 ? 0xf59e0b : 0x000000,
          emissiveIntensity: index === curvePoints.length - 1 ? 0.5 : 0,
        })

        const sphere = new THREE.Mesh(sphereGeometry, material)
        sphere.position.copy(point)
        scene.add(sphere)
      })

      // Adicionar rótulo para a trajetória
      const trajectoryLabel = createTextSprite(
        "γ(t): Trajetória Terapêutica",
        new THREE.Vector3(3, 3, 1.5),
        new THREE.Color(0xf59e0b),
      )
      if (trajectoryLabel) scene.add(trajectoryLabel)

      return { curve, points: curvePoints }
    }

    // Criar campo vetorial representando tendências terapêuticas
    const createVectorField = () => {
      const vectors = []

      // Criar uma grade de vetores
      for (let x = -4; x <= 4; x += 2) {
        for (let y = -4; y <= 4; y += 2) {
          for (let z = -4; z <= 4; z += 2) {
            // Calcular direção do vetor (simplificado)
            // Em um modelo real, isso seria baseado em dados clínicos
            const origin = new THREE.Vector3(x, y, z)

            // Direção para um "atrator" em (2, 2, 2)
            const target = new THREE.Vector3(2, 2, 2)
            const direction = new THREE.Vector3().subVectors(target, origin).normalize()

            // Criar geometria da seta
            const arrowLength = 0.8
            const arrowGeometry = new THREE.BufferGeometry().setFromPoints([
              origin,
              origin.clone().add(direction.clone().multiplyScalar(arrowLength)),
            ])

            // Cor baseada na distância ao atrator
            const distance = origin.distanceTo(target)
            const color = new THREE.Color(0x00ffff)
            color.setHSL(0.6 - distance * 0.05, 1.0, 0.5)

            const arrowMaterial = new THREE.LineBasicMaterial({ color })
            const arrow = new THREE.Line(arrowGeometry, arrowMaterial)

            scene.add(arrow)
            vectors.push(arrow)
          }
        }
      }

      // Adicionar rótulo para o campo vetorial
      const fieldLabel = createTextSprite(
        "V(E): Campo Vetorial Terapêutico",
        new THREE.Vector3(5, 5, 5),
        new THREE.Color(0x00ffff),
      )
      if (fieldLabel) scene.add(fieldLabel)

      return vectors
    }

    // Criar região clínica (exemplo: depressão)
    const createClinicalRegion = () => {
      // Definir região como uma esfera em uma parte do espaço
      const regionGeometry = new THREE.SphereGeometry(2, 32, 32)
      const regionMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.2,
        wireframe: true,
      })

      const region = new THREE.Mesh(regionGeometry, regionMaterial)
      region.position.set(-3, -3, -3)
      scene.add(region)

      // Adicionar rótulo para a região
      const regionLabel = createTextSprite(
        "R: Região Clínica",
        new THREE.Vector3(-3, -5, -3),
        new THREE.Color(0xff0000),
      )
      if (regionLabel) scene.add(regionLabel)

      return region
    }

    // Criar todos os elementos da visualização
    createVectorSpace()
    const mentalStates = createMentalStates()
    const { curve, points: trajectoryPoints } = createTrajectory()
    const vectorField = createVectorField()
    const clinicalRegion = createClinicalRegion()

    // Animação
    let lastTime = 0
    const frameInterval = 1000 / 60 // 60fps

    const animate = (currentTime: number) => {
      requestAnimationFrame(animate)

      // Limitar taxa de quadros
      if (currentTime - lastTime < frameInterval) return
      lastTime = currentTime

      // Rotação lenta da câmera
      const time = currentTime * 0.0001
      camera.position.x = Math.cos(time) * 15
      camera.position.z = Math.sin(time) * 15
      camera.lookAt(0, 0, 0)

      // Animar pontos de estado mental
      if (mentalStates.geometry.attributes.position) {
        const positions = mentalStates.geometry.attributes.position.array
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += Math.sin(time * 5 + i) * 0.01
          positions[i + 1] += Math.cos(time * 5 + i) * 0.01
          positions[i + 2] += Math.sin(time * 3 + i) * 0.01
        }
        mentalStates.geometry.attributes.position.needsUpdate = true
      }

      renderer.render(scene, camera)

      if (!isLoaded) setIsLoaded(true)
    }

    // Lidar com redimensionamento da janela
    const handleResize = () => {
      if (!mountRef.current) return

      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)
    animate(0)

    // Limpeza
    return () => {
      window.removeEventListener("resize", handleResize)
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement)
      }

      // Liberar recursos
      scene.clear()
      renderer.dispose()
    }
  }, [selectedDimension, isMobile])

  // Agrupar dimensões por metadimensão para a interface
  const groupedDimensions = {
    Emocional: dimensions.filter((d) => d.metadimension === "Emocional"),
    Cognitiva: dimensions.filter((d) => d.metadimension === "Cognitiva"),
    Autonomia: dimensions.filter((d) => d.metadimension === "Autonomia"),
  }

  return (
    <div className="relative h-full w-full">
      <div className="w-full h-full" ref={mountRef}>
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Painel de informações */}
      <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-lg max-w-md">
        <h4 className="text-lg font-bold text-white mb-2">Espaço Vetorial da Mente (ℳ)</h4>
        <p className="text-blue-200 text-sm mb-3">
          ℳ = ℳ<sub>emocional</sub> ⊕ ℳ<sub>cognitiva</sub> ⊕ ℳ<sub>autonomia</sub>
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-white">γ(t): Trajetória</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-white">R: Região Clínica</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
            <span className="text-white">V(E): Campo Vetorial</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-white mr-2"></div>
            <span className="text-white">E ∈ ℳ: Estados Mentais</span>
          </div>
        </div>
      </div>

      {/* Seletor de dimensões */}
      <div className="absolute top-4 right-4 glass p-4 rounded-lg max-w-xs max-h-[80%] overflow-auto">
        <h4 className="text-lg font-bold text-white mb-2">10 Dimensões Fundamentais</h4>

        {Object.entries(groupedDimensions).map(([metaName, dims]) => (
          <div key={metaName} className="mb-4">
            <h5
              className="text-sm font-bold text-white mb-2"
              style={{
                color: metadimensionColors[metaName as keyof typeof metadimensionColors].getStyle(),
              }}
            >
              ℳ<sub>{metaName.toLowerCase()}</sub>
            </h5>

            <div className="space-y-2">
              {dims.map((dim, idx) => {
                const globalIdx = dimensions.findIndex((d) => d.name === dim.name)
                return (
                  <motion.button
                    key={dim.name}
                    className={`w-full text-left text-xs p-2 rounded-lg transition-all ${
                      selectedDimension === globalIdx
                        ? "bg-blue-900/50 text-white"
                        : "bg-blue-900/20 text-blue-200 hover:bg-blue-900/30"
                    }`}
                    onClick={() => setSelectedDimension(globalIdx)}
                    whileHover={{ x: 5 }}
                  >
                    <div className="font-medium">
                      v<sub>{globalIdx + 1}</sub>: {dim.name}
                    </div>
                    <div className="text-xs opacity-80">{dim.description}</div>
                    <div className="text-xs opacity-60">Intervalo: {dim.range}</div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
