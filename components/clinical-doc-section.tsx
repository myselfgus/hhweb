import React, { useEffect, useRef, useState } from "react";
import GlassContainer from "./glass-container";

export default function ClinicalDocSection() {
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
      className="w-full py-10 md:py-14 relative bg-gradient-to-b from-white to-blue-50"
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
          Documentação Clínica Dimensional
        </h2>

        <div className="max-w-3xl mx-auto text-center mb-10">
          <p
            className={`text-lg text-gray-700 transition-all duration-1000 delay-200 ${
              isInView
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-4"
            }`}
          >
            O HEALTH/HEALTH transforma a documentação clínica tradicional em um registro estruturado que captura a experiência do paciente em suas múltiplas dimensões.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <GlassContainer className="p-6 rounded-xl">
              <div className="bg-white p-5 rounded-lg shadow-sm mb-2">
                <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
                  <h3 className="font-medium text-blue-900">REGISTRO CLÍNICO DIMENSIONAL</h3>
                  <span className="text-sm text-gray-500 bg-blue-50 px-2 py-1 rounded">14/05/2025</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div>
                    <p className="mb-1"><span className="font-medium text-gray-700">Paciente:</span> <span className="text-gray-600">M.R.S.</span></p>
                    <p><span className="font-medium text-gray-700">Apresentação:</span> <span className="text-gray-600">Ansiedade e insônia</span></p>
                  </div>
                  <div>
                    <p className="mb-1"><span className="font-medium text-gray-700">Profissional:</span> <span className="text-gray-600">Dr. G.M.</span></p>
                    <p><span className="font-medium text-gray-700">Serviço:</span> <span className="text-gray-600">Ambulatório HH</span></p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-4">
                  <h4 className="font-medium text-blue-800 mb-3 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    PERFIL DIMENSIONAL
                  </h4>
                  
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h5 className="font-medium text-blue-800 text-xs mb-2">Emocional</h5>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Valência</span>
                            <span className="text-blue-700 font-medium">-2</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Excitação</span>
                            <span className="text-blue-700 font-medium">7</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h5 className="font-medium text-green-800 text-xs mb-2">Cognitiva</h5>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Flexibilidade</span>
                            <span className="text-green-700 font-medium">4</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '40%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Coerência</span>
                            <span className="text-green-700 font-medium">8</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <h5 className="font-medium text-purple-800 text-xs mb-2">Autonomia</h5>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Temporal</span>
                            <span className="text-purple-700 font-medium">3,6,7</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Autocontrole</span>
                            <span className="text-purple-700 font-medium">3</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-100 p-3 rounded-lg shadow-sm">
                      <h4 className="font-medium text-blue-900 mb-2 text-xs">ANÁLISE TRAJETORIAL</h4>
                      <p className="text-xs text-gray-700">
                        Perfil dimensional sugere um quadro de ansiedade aguda com componente fóbico, com uma trajetória oscilante nas últimas 4 semanas...
                      </p>
                    </div>

                    <div className="bg-white border border-gray-100 p-3 rounded-lg shadow-sm">
                      <h4 className="font-medium text-indigo-900 mb-2 text-xs">RESPOSTA TERAPÊUTICA</h4>
                      <p className="text-xs text-gray-700">
                        Intervenção cognitivo-comportamental focada na dimensão de autocontrole, com estratégias de regulação emocional...
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3 text-sm">
                  <h4 className="font-medium text-blue-800 mb-1 text-xs flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    FORMULAÇÃO INTEGRATIVA
                  </h4>
                  <p className="text-xs text-gray-700 italic">
                    "Apresentação dimensional caracterizada por alta excitação emocional com valência negativa, coerência narrativa preservada, mas flexibilidade cognitiva reduzida..."
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end gap-2">
                <button className="px-3 py-1.5 bg-blue-100 text-blue-800 text-xs rounded font-medium hover:bg-blue-200 transition-all duration-200">Versões Anteriores</button>
                <button className="px-3 py-1.5 bg-green-100 text-green-800 text-xs rounded font-medium hover:bg-green-200 transition-all duration-200">Exportar RDC</button>
              </div>
            </GlassContainer>
          </div>

          <div
            className={`space-y-6 transition-all duration-1000 delay-500 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <h3 className="text-2xl font-bold text-blue-800">Transformando a Documentação Clínica</h3>
            <p className="text-gray-700">
              O Registro Clínico Dimensional (RDC) representa uma evolução radical na documentação de saúde mental, integrando precisão quantitativa com profundidade fenomenológica.
            </p>

            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h4 className="text-lg font-semibold text-blue-900 mb-4">Vantagens do RDC</h4>
              
              <div className="space-y-4">
                <div 
                  className="transform transition-all duration-500 flex"
                  style={{ transitionDelay: '600ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}
                >
                  <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-900">Precisão Dimensional</h5>
                    <p className="text-sm text-gray-600">
                      Mapeia a experiência clínica em dimensões quantificáveis, permitindo avaliações precisas e comparáveis
                    </p>
                  </div>
                </div>
                
                <div 
                  className="transform transition-all duration-500 flex"
                  style={{ transitionDelay: '700ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}
                >
                  <div className="flex-shrink-0 bg-purple-100 p-2 rounded-full mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-900">Análise Longitudinal</h5>
                    <p className="text-sm text-gray-600">
                      Rastreia mudanças ao longo do tempo em cada dimensão, revelando padrões e trajetórias de recuperação
                    </p>
                  </div>
                </div>
                
                <div 
                  className="transform transition-all duration-500 flex"
                  style={{ transitionDelay: '800ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}
                >
                  <div className="flex-shrink-0 bg-green-100 p-2 rounded-full mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-900">Intervenções Direcionadas</h5>
                    <p className="text-sm text-gray-600">
                      Permite o desenvolvimento de planos terapêuticos personalizados baseados no perfil dimensional único
                    </p>
                  </div>
                </div>
                
                <div 
                  className="transform transition-all duration-500 flex"
                  style={{ transitionDelay: '900ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}
                >
                  <div className="flex-shrink-0 bg-red-100 p-2 rounded-full mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-900">Comunicação Clínica Aprimorada</h5>
                    <p className="text-sm text-gray-600">
                      Facilita a comunicação entre profissionais com uma linguagem dimensional padronizada
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mt-6 transition-all duration-500" style={{ transitionDelay: '1000ms', opacity: isInView ? 1 : 0 }}>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-blue-900">
                  O formato RDC é compatível com sistemas de registros eletrônicos de saúde (EHR) e pode ser integrado ao fluxo de trabalho clínico existente, proporcionando inovação sem interrupção.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-transition-helper" />
    </div>
  );
}
