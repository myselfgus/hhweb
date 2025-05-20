"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function SimplifiedDimensionVisualizer() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Configuração básica
    const width = mountRef.current.clientWidth
    const height = mountRef.current.clientHeight

    // Cena, câmera e renderizador
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0f172a)

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(5, 5, 5)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // Iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 10, 5)
    scene.add(directionalLight)

    // Criar a superfície da paisagem cognitiva
    const createCognitiveLandscape = () => {
      const resolution = 50
      const size = 10

      // Geometria da superfície
      const geometry = new THREE.PlaneGeometry(size, size, resolution - 1, resolution - 1)
      geometry.rotateX(-Math.PI / 2)

      // Modificar os vértices para criar a forma de onda
      const position = geometry.attributes.position

      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i)
        const z = position.getZ(i)

        // Criar uma superfície ondulada interessante
        const nx = x / size + 0.5 // Normalizado de 0 a 1
        const nz = z / size + 0.5 // Normalizado de 0 a 1

        // Função para criar uma superfície ondulada
        const amplitude = 2
        const frequency = 0.8
        const y = amplitude * Math.sin(nx * Math.PI * frequency) * Math.cos(nz * Math.PI * frequency)

        position.setY(i, y)
      }

      geometry.computeVertexNormals()

      // Material com gradiente de cores
      const material = new THREE.MeshPhongMaterial({
        vertexColors: true,
        shininess: 80,
        side: THREE.DoubleSide,
      })

      // Adicionar cores aos vértices
      const colors = []
      const color1 = new THREE.Color(0x0066bb) // Azul
      const color2 = new THREE.Color(0x00bb99) // Verde-azulado
      const color3 = new THREE.Color(0xffcc00) // Amarelo

      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i)
        const z = position.getZ(i)

        // Normalizar coordenadas
        const nx = x / size + 0.5 // 0 a 1
        const nz = z / size + 0.5 // 0 a 1

        // Interpolar cores
        const color = new THREE.Color()
        color.copy(color1).lerp(color2, nx).lerp(color3, nz)

        colors.push(color.r, color.g, color.b)
      }

      geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))

      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      return mesh
    }

    // Adicionar eixos e rótulos
    const createAxes = () => {
      // Eixos
      const axesHelper = new THREE.AxesHelper(5.5)
      scene.add(axesHelper)

      // Função para criar rótulos de texto
      const createTextLabel = (text, position, color = 0xffffff) => {
        const canvas = document.createElement("canvas")
        canvas.width = 256
        canvas.height = 128

        const context = canvas.getContext("2d")
        if (!context) return null

        context.fillStyle = "transparent"
        context.fillRect(0, 0, canvas.width, canvas.height)

        context.font = "bold 24px Arial"
        context.fillStyle = new THREE.Color(color).getStyle()
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.fillText(text, canvas.width / 2, canvas.height / 2)

        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.SpriteMaterial({ map: texture })
        const sprite = new THREE.Sprite(material)
        sprite.position.copy(position)
        sprite.scale.set(2.5, 1.25, 1)

        scene.add(sprite)
        return sprite
      }

      // Rótulos dos eixos
      createTextLabel("Dissonância Cognitiva (v₈)", new THREE.Vector3(6, 0, 0))
      createTextLabel("Flexibilidade Cognitiva (v₇)", new THREE.Vector3(0, 0, 6))
      createTextLabel("Coerência Narrativa (v₆)", new THREE.Vector3(0, 6, 0))

      // Valores extremos
      createTextLabel("Consonância", new THREE.Vector3(5, 0, 0), 0x00ffff)
      createTextLabel("Intolerável", new THREE.Vector3(-5, 0, 0), 0x00ffff)
      createTextLabel("Adaptativa", new THREE.Vector3(0, 0, 5), 0x00ffff)
      createTextLabel("Rígido", new THREE.Vector3(0, 0, -5), 0x00ffff)
      createTextLabel("Integração", new THREE.Vector3(0, 5, 0), 0x00ffff)
      createTextLabel("Fragmentação", new THREE.Vector3(0, -2, 0), 0x00ffff)
    }

    // Criar os elementos da visualização
    const landscape = createCognitiveLandscape()
    createAxes()

    // Rotação automática simples em vez de controles interativos
    let rotationAngle = 0

    // Animação
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotação automática simples
      rotationAngle += 0.002
      camera.position.x = Math.sin(rotationAngle) * 7
      camera.position.z = Math.cos(rotationAngle) * 7
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // Lidar com redimensionamento
    const handleResize = () => {
      if (!mountRef.current) return

      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

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
  }, [])

  return (
    <div className="w-full h-full" ref={mountRef}>
      <div className="absolute top-4 left-4 glass p-3 rounded-lg text-white text-lg font-bold">Paisagem Cognitiva</div>
    </div>
  )
}
