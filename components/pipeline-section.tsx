import React, { useEffect, useRef, useState } from "react";
import GlassContainer from "./glass-container";
import PipelineVisualization from "./animations/pipeline-visualization";

export default function PipelineSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          entries[0].target.classList.add("revealed");
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full py-10 md:py-12 relative bg-gradient-to-b from-blue-50 to-white"
    >
      <div
        className="absolute inset-0 z-0 opacity-85 animate-subtle-wave bg-parallax"
        data-speed="0.03"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-50/5 via-transparent to-blue-900/3"></div>
      </div>

      <div className="container mx-auto relative z-10 px-4">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-8 text-blue-900 transition-all duration-1000 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          }`}
        >
          Pipeline de Processamento
        </h2>

        <div className="max-w-3xl mx-auto text-center mb-10">
          <p
            className={`text-lg text-gray-700 transition-all duration-1000 delay-200 ${
              isInView
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-4"
            }`}
          >
            O HEALTH/HEALTH utiliza processamento avançado para transformar dados clínicos em insights dimensionais acionáveis.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div
            className={`transition-all duration-1000 delay-400 ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <GlassContainer className="p-6 rounded-xl shadow-md overflow-hidden">
              <div className="relative h-full">
                <div className="absolute top-0 left-0 w-full h-full bg-blue-50/30 rounded-xl" style={{ zIndex: -1 }}>
                  <svg className="w-full h-full opacity-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#3B82F6" d="M47.7,-57.2C59.5,-45.3,65.8,-28.7,68.9,-11.3C72,6.1,71.8,24.2,63.4,38.5C54.9,52.7,38.2,63.1,19.9,69.9C1.7,76.7,-18.1,80,-35.8,73.2C-53.5,66.4,-69,49.4,-78.1,28.5C-87.1,7.6,-89.8,-17.2,-80.9,-35.6C-72,-54.1,-51.5,-66.2,-31.9,-76.1C-12.3,-86,7.3,-93.7,24.2,-86.7C41.1,-79.8,55.2,-58.3,47.7,-57.2Z" transform="translate(100 100)" />
                  </svg>
                </div>
              
                <h3 className="text-xl font-bold text-blue-800 mb-6 relative">Pipeline de Processamento</h3>
                
                <div className="flex flex-col space-y-4 relative">
                  <div className="flex items-center bg-white p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md transform hover:scale-[1.02]">
                    <div className="flex items-center justify-center bg-blue-600 text-white rounded-full h-10 w-10 font-bold mr-4 shadow-sm">
                      <span>1</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900">Captura & Ingestão</h3>
                      <p className="text-sm text-gray-600">Sistema de captura em tempo real com armazenamento seguro</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-5 top-14 h-[calc(100%-30px)] w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-green-600"></div>
                  
                  <div className="flex items-center bg-white p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md transform hover:scale-[1.02]">
                    <div className="flex items-center justify-center bg-indigo-600 text-white rounded-full h-10 w-10 font-bold mr-4 shadow-sm">
                      <span>2</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-indigo-900">Transcrição & Diarização</h3>
                      <p className="text-sm text-gray-600">Processamento de áudio com identificação de turnos</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-white p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md transform hover:scale-[1.02]">
                    <div className="flex items-center justify-center bg-purple-600 text-white rounded-full h-10 w-10 font-bold mr-4 shadow-sm">
                      <span>3</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-purple-900">Processamento NLP</h3>
                      <p className="text-sm text-gray-600">Análise linguística e semântica do conteúdo clínico</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-white p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md transform hover:scale-[1.02]">
                    <div className="flex items-center justify-center bg-blue-600 text-white rounded-full h-10 w-10 font-bold mr-4 shadow-sm">
                      <span>4</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900">Embeddings Dimensionais</h3>
                      <p className="text-sm text-gray-600">Mapeamento para espaço multidimensional</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-white p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md transform hover:scale-[1.02]">
                    <div className="flex items-center justify-center bg-green-600 text-white rounded-full h-10 w-10 font-bold mr-4 shadow-sm">
                      <span>5</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-900">Estruturação RDC</h3>
                      <p className="text-sm text-gray-600">Geração do Registro Clínico Dimensional</p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassContainer>
          </div>

          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-2xl font-bold text-blue-800">Registros Clínicos Dimensionais</h3>
            
            <p className="text-gray-700 mb-6">
              Nosso sistema de processamento transforma dados clínicos brutos em registros clínicos dimensionais (RDCs) estruturados em cinco seções integradas:
            </p>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm p-4 flex gap-3 items-start border-l-4 border-blue-600 hover:shadow-md transition-duration-300">
                <div className="bg-blue-100 text-blue-800 h-8 w-8 flex items-center justify-center rounded-full font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Narrativa</h4>
                  <p className="text-sm text-gray-600">Captura fenomenológica da experiência do paciente, preservando o contexto original</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 flex gap-3 items-start border-l-4 border-indigo-600 hover:shadow-md transition-duration-300">
                <div className="bg-indigo-100 text-indigo-800 h-8 w-8 flex items-center justify-center rounded-full font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-indigo-900 mb-1">Dimensionalização</h4>
                  <p className="text-sm text-gray-600">Mapeamento vetorial nas metadimensões com valores quantitativos precisos</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 flex gap-3 items-start border-l-4 border-purple-600 hover:shadow-md transition-duration-300">
                <div className="bg-purple-100 text-purple-800 h-8 w-8 flex items-center justify-center rounded-full font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-purple-900 mb-1">Trajetória</h4>
                  <p className="text-sm text-gray-600">Análise dinâmica da progressão clínica ao longo do tempo no espaço dimensional</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 flex gap-3 items-start border-l-4 border-red-600 hover:shadow-md transition-duration-300">
                <div className="bg-red-100 text-red-800 h-8 w-8 flex items-center justify-center rounded-full font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">Análise Integrativa</h4>
                  <p className="text-sm text-gray-600">Síntese clínica que contextualiza os achados dimensionais</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 flex gap-3 items-start border-l-4 border-green-600 hover:shadow-md transition-duration-300">
                <div className="bg-green-100 text-green-800 h-8 w-8 flex items-center justify-center rounded-full font-bold">5</div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Resposta Terapêutica</h4>
                  <p className="text-sm text-gray-600">Intervenções direcionadas com base na localização dimensional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`my-12 max-w-5xl mx-auto transition-all duration-1000 delay-500 ${isInView ? "opacity-100" : "opacity-0"}`}>
          <div className="bg-white rounded-xl shadow-sm p-6 overflow-hidden">
            <h3 className="text-lg font-semibold text-blue-900 mb-6 text-center">Fluxo de Processamento HEALTH/HEALTH</h3>
            <PipelineVisualization width={800} height={300} className="mx-auto" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
          <div
            className={`bg-white p-5 rounded-lg shadow-sm transition-all duration-700 transform ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            <div className="text-center mb-4">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mt-2">Precisão Quantitativa</h3>
            </div>
            <p className="text-center text-gray-600 text-sm">
              Transforma observações clínicas qualitativas em métricas dimensionais precisas e mensuráveis
            </p>
          </div>
          
          <div
            className={`bg-white p-5 rounded-lg shadow-sm transition-all duration-700 transform ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="text-center mb-4">
              <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-purple-900 mt-2">Adaptabilidade Clínica</h3>
            </div>
            <p className="text-center text-gray-600 text-sm">
              Funciona com múltiplas modalidades de interação clínica, desde sessões presenciais até telemedicina
            </p>
          </div>
          
          <div
            className={`bg-white p-5 rounded-lg shadow-sm transition-all duration-700 transform ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: '900ms' }}
          >
            <div className="text-center mb-4">
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-green-900 mt-2">Transparência Total</h3>
            </div>
            <p className="text-center text-gray-600 text-sm">
              Fornece documentação completa e acessível sobre o processo de análise dimensional
            </p>
          </div>
        </div>
      </div>
      <div className="section-transition-helper" />
    </div>
  );
}
