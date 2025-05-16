import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import GlassContainer from "./glass-container";
import RadarDimensionalVisual from "./animations/radar-dimensional-visual";
import TrajectoryVisualization from "./animations/trajectory-visualization";

export default function DashboardSection() {
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
      className="w-full py-10 md:py-12 relative bg-gradient-to-b from-white to-blue-50"
    >
      <div
        className="absolute inset-0 z-0 opacity-75 animate-subtle-wave bg-parallax"
        data-speed="0.02"
      ></div>

      <div className="container mx-auto relative z-10 px-4">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-8 text-blue-900 transition-all duration-1000 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          }`}
        >
          Dimensional Dashboard
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div
            className={`transition-all duration-1000 delay-200 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <GlassContainer className="p-8 rounded-xl">
              <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gray-900 rounded-xl">
                  <div className="p-4 bg-gray-900 text-white">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold">DASHBOARD</h3>
                      <div className="text-sm">
                        <p>PATIENT: 21RM067</p>
                        <p>Name: Joao</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 p-4">
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <h4 className="text-white text-sm mb-2">Dimensional Profile</h4>
                      <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden relative shadow-inner">
                        <div className="w-full h-full p-2">
                          <RadarDimensionalVisual isInView={isInView} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <h4 className="text-white text-sm mb-2">Longitudinal Trajectory</h4>
                      <div className="aspect-square bg-gray-800 rounded-lg p-2 shadow-inner">
                        <div className="w-full h-full">
                          <TrajectoryVisualization isInView={isInView} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassContainer>
          </div>

          <div
            className={`space-y-6 transition-all duration-1000 delay-400 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <h3 className="text-2xl font-bold text-blue-800">Visualização INtegrativa TRAjetorial</h3>
            <p className="text-gray-700">
              O HEALTH/HEALTH apresenta a experiência mental como um espaço vetorial multidimensional, permitindo aos clínicos visualizar estados mentais como posições precisas em um espaço de 10 dimensões.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div 
                className="bg-white rounded-lg p-4 shadow-sm transition-all duration-500 transform hover:shadow-md hover:-translate-y-1"
                style={{ transitionDelay: '600ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                </div>
                <h4 className="font-medium text-blue-900 mb-2">Perfil Dimensional</h4>
                <p className="text-sm text-gray-600">Visualização em radar das 10 dimensões fundamentais em tempo real.</p>
              </div>
              
              <div 
                className="bg-white rounded-lg p-4 shadow-sm transition-all duration-500 transform hover:shadow-md hover:-translate-y-1"
                style={{ transitionDelay: '700ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h6a1 1 0 100-2H3zm0 4a1 1 0 100 2h10a1 1 0 100-2H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-medium text-blue-900 mb-2">Trajetória Longitudinal</h4>
                <p className="text-sm text-gray-600">Evolução temporal em múltiplas dimensões com benchmarks de referência.</p>
              </div>
              
              <div 
                className="bg-white rounded-lg p-4 shadow-sm transition-all duration-500 transform hover:shadow-md hover:-translate-y-1"
                style={{ transitionDelay: '800ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-medium text-blue-900 mb-2">Coerência Narrativa</h4>
                <p className="text-sm text-gray-600">Análise temporal da estrutura do discurso e padrões narrativos.</p>
              </div>
              
              <div 
                className="bg-white rounded-lg p-4 shadow-sm transition-all duration-500 transform hover:shadow-md hover:-translate-y-1"
                style={{ transitionDelay: '900ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-medium text-blue-900 mb-2">Intervenções & Efeitos</h4>
                <p className="text-sm text-gray-600">Visualização do impacto de intervenções no espaço dimensional.</p>
              </div>
            </div>
            
            <div 
              className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600 transition-all duration-500 transform"
              style={{ transitionDelay: '1000ms', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)' }}
            >
              <p className="text-gray-700 flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Integrado ao Runtime Euleriano, o dashboard atualiza em tempo real conforme novas sessões são processadas pelo pipeline HEALTH/HEALTH.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="section-transition-helper" />
    </div>
  );
}
