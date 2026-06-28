/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Award, ShieldCheck, Heart } from 'lucide-react';
import { HERO_IMAGE, CERTIFICATIONS } from '../data';
import { useApp } from '../context/AppContext';

export const Hero: React.FC = () => {
  const { styleTheme, setActiveTab } = useApp();

  if (styleTheme === 'woolamai') {
    return (
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center bg-[#071F22] text-white overflow-hidden">
        {/* Immersive turquoise aerial view image overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=2000&q=80"
            alt="Finca marina y de café verde premium de especialidad"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Beautiful turquoise/deep teal gradient overlay that perfectly matches the Woolamai color grading */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#071F22]/70 via-[#071F22]/40 to-[#071F22]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-12 flex flex-col items-center justify-center">
          {/* Circular Minimalistic Launcher Symbol */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 font-sans tracking-[0.3em] pl-1.5 text-[10px]"
          >
            ●
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="font-display font-light text-5xl sm:text-7xl lg:text-8xl tracking-[0.22em] lowercase text-white leading-tight"
            >
              agrocafe
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="max-w-2xl mx-auto text-sm sm:text-base text-white/70 font-sans font-light tracking-[0.15em] leading-relaxed lowercase"
            >
              suministro de café verde premium de especialidad sin tostar directo de origen
            </motion.p>
          </div>

          {/* Minimalist modern buttons matching the screenshot concept */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 text-xs font-sans tracking-[0.25em]"
          >
            <button
              onClick={() => setActiveTab('tienda')}
              className="px-8 py-3.5 border border-white/20 bg-white/5 hover:bg-white/10 active:bg-white text-white rounded-none uppercase transition-all duration-300 cursor-pointer"
            >
              catálogo verde
            </button>
            <button
              onClick={() => setActiveTab('suscripcion')}
              className="px-8 py-3.5 border border-transparent hover:border-white/20 text-white/80 hover:text-white rounded-none uppercase transition-all duration-300 cursor-pointer"
            >
              plan de suministro
            </button>
          </motion.div>
        </div>

        {/* Floating subtle indicator at bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-1.5 opacity-40">
          <span className="text-[9px] uppercase tracking-[0.3em] font-sans font-medium text-white">desplazar</span>
          <div className="w-px h-10 bg-white/40 animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-art-bg text-art-brown overflow-hidden pt-28 pb-16">
      {/* Background Image with elegant overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Granos de café de origen y verdes de especialidad"
          className="w-full h-full object-cover object-center opacity-20 mix-blend-multiply"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-art-bg/20 via-transparent to-art-bg" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-art-green/10 border border-art-green/20 px-4 py-2 text-art-green text-xs font-sans uppercase tracking-widest font-bold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Precooperativa Cafetera AGROCAFE</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-art-brown leading-none"
              >
                El mejor café verde, <br />
                <span className="text-art-green italic">
                  de origen seleccionado
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-art-brown/80 font-sans font-medium leading-relaxed"
              >
                Acopio, gestión integral de calidad y comercialización al por mayor de materias primas agrícolas y café verde de alta especialidad (Actividad DIAN 4620). Apoyando de forma justa a nuestras familias caficultoras.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => setActiveTab('tienda')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-art-brown hover:bg-art-brown/90 text-white px-8 py-4 rounded-none font-sans uppercase text-xs tracking-widest font-bold transition-all duration-200 shadow-sm group cursor-pointer"
              >
                <span>Ver Catálogo Verde</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setActiveTab('suscripcion')}
                className="w-full sm:w-auto flex items-center justify-center bg-transparent hover:bg-art-soft/40 text-art-brown border border-art-brown/30 px-8 py-4 rounded-none font-sans uppercase text-xs tracking-widest font-bold transition-all duration-200 cursor-pointer"
              >
                Plan de Suministro
              </button>
            </motion.div>

            {/* Certifications (Visual Row) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-6 border-t border-art-brown/10 max-w-xl mx-auto lg:mx-0"
            >
              <p className="text-xs text-art-brown/60 font-sans font-bold uppercase tracking-wider mb-4 text-center lg:text-left">
                Nuestras Certificaciones de Calidad y Compromiso
              </p>
              <div className="grid grid-cols-3 gap-3">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.name}
                    className="flex flex-col items-center p-3 rounded-none bg-white border border-art-brown/10 hover:border-art-brown/20 transition-all duration-200 group text-center"
                  >
                    <span className="text-2xl mb-1.5 group-hover:scale-110 transition-transform duration-200 select-none">
                      {cert.icon}
                    </span>
                    <span className="text-[11px] font-sans font-bold text-art-brown uppercase tracking-wider">
                      {cert.badgeText}
                    </span>
                    <span className="text-[9px] text-art-brown/60 hidden sm:inline mt-0.5 leading-tight">
                      {cert.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Graphical badge floating column (Right side) */}
          <div className="hidden lg:col-span-5 lg:flex flex-col items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="p-1 bg-art-soft/40"
            >
              <div className="p-8 bg-white rounded-none border border-art-brown/15 shadow-md text-center space-y-6 max-w-sm">
                <div className="w-16 h-16 bg-art-green/10 flex items-center justify-center text-art-green mx-auto border border-art-green/10">
                  <Award className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-black italic text-art-brown">Grano Verde Especial</h3>
                  <p className="text-sm text-art-brown/80 font-sans font-medium leading-relaxed">
                    Cada lote de café verde es evaluado físicamente y catado, superando los 85 puntos en la escala SCA.
                  </p>
                </div>

                <div className="border-t border-art-brown/10 pt-4 flex items-center justify-around text-xs text-art-brown/80 font-sans">
                  <div className="flex flex-col items-center">
                    <span className="font-serif font-black text-xl text-art-green">85+</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">Puntaje SCA</span>
                  </div>
                  <div className="h-6 w-px bg-art-brown/10" />
                  <div className="flex flex-col items-center">
                    <span className="font-serif font-black text-xl text-art-green">100%</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">Trazabilidad</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
