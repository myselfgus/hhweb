"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Mic, Pause, Play, Send, Upload, X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export function AudioAnalysisSection() {
  const [recordingState, setRecordingState] = useState<"idle" | "recording" | "recorded" | "uploaded" | "processing" | "form">(
    "idle"
  )
  const [recordingTime, setRecordingTime] = useState(0)
  const [fileName, setFileName] = useState("")
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    cns: ""
  })
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isMobile = useIsMobile()

  const MAX_RECORDING_TIME = 15 * 60 // 15 minutos em segundos

  const startRecording = () => {
    setRecordingState("recording")
    setRecordingTime(0)
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= MAX_RECORDING_TIME) {
          stopRecording()
          return MAX_RECORDING_TIME
        }
        return prev + 1
      })
    }, 1000)
  }

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setRecordingState("recorded")
  }

  const resetRecording = () => {
    stopRecording()
    setRecordingState("idle")
    setRecordingTime(0)
    setFileName("")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Verificação do tipo de arquivo
      if (!file.type.startsWith("audio/")) {
        alert("Por favor, selecione um arquivo de áudio válido.")
        return
      }

      // Verificação de tamanho (15 minutos de áudio ~= 10MB para MP3 de qualidade média)
      const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB
      if (file.size > MAX_FILE_SIZE) {
        alert("O arquivo de áudio deve ter no máximo 20MB (aproximadamente 15 minutos).")
        return
      }

      setFileName(file.name)
      setRecordingState("uploaded")

      // Cria um URL para o arquivo para potencial reprodução
      if (audioRef.current) {
        const fileURL = URL.createObjectURL(file)
        audioRef.current.src = fileURL
      }
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const showContactForm = () => {
    setRecordingState("form")
  }
  
  const simulateProcessing = () => {
    setRecordingState("processing")
    setTimeout(() => {
      // Sistema de mensagem modal em vez de um simples alert
      const message = `Análise enviada com sucesso! Entraremos em contato com ${userData.name} através do email ${userData.email}. Seus dados foram salvos (CPF: ${userData.cpf || 'N/A'}, CNS: ${userData.cns || 'N/A'}) para análise do áudio.`
      alert(message)
      resetRecording()
    }, 3000)
  }

  return (
    <div className={`glass rounded-xl p-6 ${isMobile ? "w-full" : "w-full md:w-auto"}`}>
      <h3 className="text-xl font-bold text-cyan-400 mb-4">Experimente Nossa Análise</h3>
      <p className="text-blue-200 mb-6 text-sm">
        Envie um áudio de 10-15 minutos para receber uma breve análise multidimensional e ver nosso potencial
      </p>

      <div className="space-y-4">
        {recordingState === "idle" && (
          <div className="flex flex-col gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={startRecording}
              className="bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Mic className="w-5 h-5" />
              <span>Iniciar Gravação</span>
            </motion.button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-800"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-slate-900 px-2 text-sm text-blue-400">ou</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={triggerFileUpload}
              className="border border-cyan-600 text-cyan-400 py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-950/30 transition-colors"
            >
              <Upload className="w-5 h-5" />
              <span>Enviar Arquivo de Áudio</span>
            </motion.button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="audio/*"
              className="hidden"
              aria-label="Upload de arquivo de áudio"
            />
          </div>
        )}

        {recordingState === "recording" && (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center animate-pulse">
                <Mic className="w-12 h-12 text-red-500" />
              </div>
            </div>

            <div className="text-center">
              <p className="text-red-400 text-lg font-bold">{formatTime(recordingTime)}</p>
              <p className="text-blue-300 text-sm">Gravando...</p>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={stopRecording}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Pause className="w-4 h-4" />
                <span>Parar</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetRecording}
                className="flex-1 border border-red-500 text-red-400 py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-red-950/30 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancelar</span>
              </motion.button>
            </div>
          </div>
        )}

        {(recordingState === "recorded" || recordingState === "uploaded") && (
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {recordingState === "recorded" ? (
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center">
                    <Mic className="w-5 h-5 text-blue-500" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-green-500" />
                  </div>
                )}
                <div>
                  <p className="text-white text-sm font-medium">
                    {recordingState === "recorded"
                      ? `Gravação (${formatTime(recordingTime)})`
                      : fileName || "Arquivo de áudio"}
                  </p>
                  <p className="text-blue-300 text-xs">
                    {recordingState === "recorded"
                      ? "Pronto para envio"
                      : "Arquivo carregado com sucesso"}
                  </p>
                </div>
              </div>

              <audio ref={audioRef} className="hidden" controls />
              <button
                onClick={resetRecording}
                className="w-8 h-8 rounded-full hover:bg-slate-700 flex items-center justify-center transition-colors"
                aria-label="Remover"
              >
                <X className="w-4 h-4 text-blue-300" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={showContactForm}
                className="bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Enviar</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={resetRecording}
                className="border border-blue-600 text-blue-400 py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-950/30 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancelar</span>
              </motion.button>
            </div>
          </div>
        )}

        {recordingState === "form" && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Informações de Contato</h4>
            <p className="text-blue-300 text-sm mb-4">Preencha seus dados para receber a análise completa</p>
            
            <div className="space-y-3">
            <div>
            <label htmlFor="name" className="text-blue-200 text-sm block mb-1">Nome completo</label>
            <input 
            type="text" 
            id="name" 
            name="name" 
            value={userData.name} 
            onChange={handleUserDataChange} 
            className="w-full bg-slate-800/70 border border-blue-700 rounded-lg px-3 py-2 text-white text-sm"
            placeholder="Seu nome completo"
            required
            />
            </div>
            
            <div>
            <label htmlFor="email" className="text-blue-200 text-sm block mb-1">E-mail</label>
            <input 
            type="email" 
            id="email" 
            name="email" 
            value={userData.email} 
            onChange={handleUserDataChange} 
            className="w-full bg-slate-800/70 border border-blue-700 rounded-lg px-3 py-2 text-white text-sm"
            placeholder="seu.email@exemplo.com"
            required
            />
            </div>
            
            <div>
            <label htmlFor="phone" className="text-blue-200 text-sm block mb-1">Telefone</label>
            <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={userData.phone} 
            onChange={handleUserDataChange} 
            className="w-full bg-slate-800/70 border border-blue-700 rounded-lg px-3 py-2 text-white text-sm"
            placeholder="(00) 00000-0000"
              required
              />
            </div>
            
            <div>
            <label htmlFor="cpf" className="text-blue-200 text-sm block mb-1">CPF</label>
            <input 
            type="text" 
            id="cpf" 
            name="cpf" 
            value={userData.cpf} 
            onChange={handleUserDataChange} 
            className="w-full bg-slate-800/70 border border-blue-700 rounded-lg px-3 py-2 text-white text-sm"
              placeholder="000.000.000-00"
              />
            </div>

            <div>
              <label htmlFor="cns" className="text-blue-200 text-sm block mb-1">CNS (Cartão Nacional de Saúde)</label>
              <input 
                type="text" 
                id="cns" 
                name="cns" 
                value={userData.cns} 
                onChange={handleUserDataChange} 
                className="w-full bg-slate-800/70 border border-blue-700 rounded-lg px-3 py-2 text-white text-sm"
                placeholder="000 0000 0000 0000"
              />
            </div>
              
              <div className="pt-2 grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={simulateProcessing}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  disabled={!userData.name || !userData.email}
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRecordingState(recordingState === "recorded" ? "recorded" : "uploaded")}
                  className="border border-blue-600 text-blue-400 py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-950/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Voltar</span>
                </motion.button>
              </div>
            </div>
          </div>
        )}
        
        {recordingState === "processing" && (
          <div className="flex flex-col items-center justify-center gap-4 py-2">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-blue-300">Processando sua análise...</p>
          </div>
        )}
      </div>
    </div>
  )
}
