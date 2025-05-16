import React, { useEffect, useRef, useState } from "react";
import GlassContainer from "./glass-container";
import BrainVisualization from "./animations/brain-visualization";

export default function DimensionsSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const metadimensions = [
    {
      name: "Metadimensão Emocional",
      description: "Captura aspectos da experiência emocional através de componentes como valência, excitação e intensidade afetiva.",
      color: "blue",
      value: 70,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
        </svg>
      ),
    },
    {
      name: "Metadimensão Cognitiva",
      description: "Mapeia o funcionamento cognitivo através de indicadores como complexidade, coerência e flexibilidade do pensamento.",
      color: "green",
      value: 60,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
      ),
    },
    {
      name: "Metadimensão Autonomia",
      description: "Avalia a relação com o tempo e a capacidade de autorregulação comportamental.",
      color: "purple",
      value: 45,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    }
  ];

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
      className="w-full py-10 md:py-12 relative bg-gradient-to-b from-white to-blue-50"
    >
      <div
        className="absolute inset-0 z-0 opacity-70 animate-subtle-wave"
        data-speed="0.02"
      ></div>

      <div className="container mx-auto relative z-10 px-4">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-8 text-blue-900 transition-all duration-1000 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          }`}
        >
          Framework Dimensional
        </h2>

        <div className="max-w-3xl mx-auto text-center mb-10">
          <p
            className={`text-lg text-gray-700 transition-all duration-1000 delay-200 ${
              isInView
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-4"
            }`}
          >
            O HEALTH/HEALTH utiliza um sistema multidimensional organizado em três metadimensões fundamentais para mapear a experiência mental.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className={`col-span-1 md:col-span-2 lg:col-span-3 transition-all duration-1000 delay-300 ${
              isInView
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-4"
            }`}
          >
            <GlassContainer className="p-6 rounded-xl">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Framework Dimensional</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    Nosso framework conceitua a experiência mental como um sistema multidimensional que captura a complexidade das experiências subjetivas:
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg text-center mb-4">
                    <p className="font-mono text-blue-800">E = f(m₁, m₂, m₃)</p>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Este framework é estruturado em três metadimensões fundamentais que representam os principais aspectos da experiência mental humana.
                  </p>
                  
                  <div className="mt-6 hidden md:block">
                    <BrainVisualization width={240} height={180} />
                  </div>
                </div>
                
                <div className="md:w-2/3 grid grid-cols-1 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                    <h4 className="font-semibold text-blue-800 mb-2">Metadimensão Emocional</h4>
                    <p className="text-sm text-gray-700">
                      Captura aspectos da experiência emocional do indivíduo através de componentes como valência, excitação e intensidade afetiva.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                    <h4 className="font-semibold text-green-800 mb-2">Metadimensão Cognitiva</h4>
                    <p className="text-sm text-gray-700">
                      Mapeia o funcionamento cognitivo através de indicadores como complexidade, coerência e flexibilidade do pensamento.
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                    <h4 className="font-semibold text-purple-800 mb-2">Metadimensão Autonomia</h4>
                    <p className="text-sm text-gray-700">
                      Avalia a relação do indivíduo com o tempo e sua capacidade de autorregulação comportamental.
                    </p>
                  </div>
                </div>
              </div>
            </GlassContainer>
          </div>

          {/* Metadimensões com representação visual */}
          {metadimensions.map((metadimension, index) => {
            const colorMap = {
              blue: {
                bg: "bg-blue-50",
                border: "border-blue-600",
                barBg: "bg-blue-600",
                title: "text-blue-800"
              },
              green: {
                bg: "bg-green-50",
                border: "border-green-600",
                barBg: "bg-green-600",
                title: "text-green-800"
              },
              purple: {
                bg: "bg-purple-50",
                border: "border-purple-600",
                barBg: "bg-purple-600",
                title: "text-purple-800"
              }
            };
            
            const { bg, border, barBg, title } = colorMap[metadimension.color as keyof typeof colorMap];
            
            return (
              <div
                key={index}
                className={`transition-all duration-700 transform ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className={`h-full rounded-lg shadow-sm overflow-hidden border-l-4 ${border}`}>
                  <div className={`p-6 ${bg}`}>
                    <div className="flex items-center mb-4">
                      <div className={`mr-4 p-3 rounded-full ${bg} shadow-sm`}>
                        {metadimension.icon}
                      </div>
                      <h3 className={`font-medium text-lg ${title}`}>{metadimension.name}</h3>
                    </div>
                    
                    <p className="text-gray-700 mb-4">
                      {metadimension.description}
                    </p>
                    
                    <div className="mt-2">
                      <div className="text-xs text-gray-500 mb-1">Relevância Clínica</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`${barBg} h-2 rounded-full`} style={{ width: `${metadimension.value}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-6">
            <div 
              className="transition-all duration-700 transform bg-blue-50 p-6 rounded-xl shadow-sm"
              style={{ transitionDelay: '800ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}
            >
              <div className="text-center mb-4">
                <div className="inline-flex p-3 bg-blue-100 rounded-full mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 17l-5-5 5-5"/>
                    <path d="M19 17l-5-5 5-5"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-blue-900">Precisão Dimensional</h3>
              </div>
              <p className="text-gray-700 text-center">
                Transforma categorias estáticas em avaliações multidimensionais contínuas e individualizadas.
              </p>
            </div>
            
            <div 
              className="transition-all duration-700 transform bg-green-50 p-6 rounded-xl shadow-sm"
              style={{ transitionDelay: '900ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}
            >
              <div className="text-center mb-4">
                <div className="inline-flex p-3 bg-green-100 rounded-full mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-green-900">Análise Trajetorial</h3>
              </div>
              <p className="text-gray-700 text-center">
                Revela padrões e tendências ao longo do tempo, permitindo intervenções preventivas e personalizadas.
              </p>
            </div>
            
            <div 
              className="transition-all duration-700 transform bg-purple-50 p-6 rounded-xl shadow-sm"
              style={{ transitionDelay: '1000ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}
            >
              <div className="text-center mb-4">
                <div className="inline-flex p-3 bg-purple-100 rounded-full mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-purple-900">Formulação Individualizada</h3>
              </div>
              <p className="text-gray-700 text-center">
                Adapta-se às características únicas de cada indivíduo, em vez de categorizar em grupos diagnósticos.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="section-transition-helper" />
    </div>
  );
}
