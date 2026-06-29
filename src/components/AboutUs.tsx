/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Eye, ShieldCheck, Heart } from 'lucide-react';
import cafetalesBg from '../assets/images/cafetales_colombianos_bg_1782665940051.jpg';

export const AboutUs: React.FC = () => {
  return (
    <section id="historia" className="py-24 bg-art-soft/35 text-art-brown relative overflow-hidden border-y border-art-brown/5">
      {/* Fondo de Cafetales Colombianos */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-35 mix-blend-multiply">
        <img
          src={cafetalesBg}
          alt="Lush Colombian coffee fields background"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-art-soft/20 via-transparent to-art-soft/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
           
          {/* Decorative Left Column: Narrative Highlights */}
          <div className="lg:col-span-5 space-y-6 order-last lg:order-first lg:sticky lg:top-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-white/80 backdrop-blur-sm border border-art-brown/10 rounded-none space-y-3 shadow-sm">
                <div className="p-2 w-10 h-10 bg-art-green/10 text-art-green rounded-none flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-black italic text-base text-art-brown">100% Sostenible</h4>
                <p className="text-xs text-art-brown/85 leading-relaxed font-sans">
                  Apoyamos prácticas agrícolas regenerativas que protegen las cuencas de agua y la biodiversidad en el Tolima.
                </p>
              </div>

              <div className="p-6 bg-white/80 backdrop-blur-sm border border-art-brown/10 rounded-none space-y-3 sm:mt-4 shadow-sm">
                <div className="p-2 w-10 h-10 bg-art-green/10 text-art-green rounded-none flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-black italic text-base text-art-brown">Economía Solidaria</h4>
                <p className="text-xs text-art-brown/85 leading-relaxed font-sans">
                  Constituida para el desarrollo mutuo de familias asociadas rurales bajo principios de equidad.
                </p>
              </div>

              <div className="p-6 bg-white/80 backdrop-blur-sm border border-art-brown/10 rounded-none space-y-3 sm:-mt-4 shadow-sm">
                <div className="p-2 w-10 h-10 bg-art-green/10 text-art-green rounded-none flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-black italic text-base text-art-brown">Comercio Justo</h4>
                <p className="text-xs text-art-brown/85 leading-relaxed font-sans">
                  Garantizamos transparencia y precios de acopio estables directo al productor primario sin intermediación.
                </p>
              </div>

              <div className="p-6 bg-white/80 backdrop-blur-sm border border-art-brown/10 rounded-none space-y-3 shadow-sm">
                <div className="p-2 w-10 h-10 bg-art-green/10 text-art-green rounded-none flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-black italic text-base text-art-brown">Acopio Técnico</h4>
                <p className="text-xs text-art-brown/85 leading-relaxed font-sans">
                  Estricto análisis físico y control de humedad (10-12%) para preservar el potencial de calidad del grano pergamino.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Main Narrative & Core Values */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <span className="text-xs text-art-green font-sans font-bold uppercase tracking-widest block bg-white/40 px-2 py-0.5 w-fit border border-art-brown/5">
                Nuestra Pasión, Nuestra Tierra
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black italic text-art-brown leading-none">
                PRECOOPERATIVA AGROCAFE
              </h2>
            </div>

            <div className="space-y-4 text-art-brown/90 font-sans font-semibold text-base leading-relaxed bg-white/60 backdrop-blur-sm p-6 border border-art-brown/10 shadow-sm">
              <p>
                Somos una precooperativa cafetera enfocada en el acopio, comercialización mayorista y fortalecimiento del tejido social de las familias productoras rurales en Colombia, con especial arraigo en Planadas, Tolima.
              </p>
              <p>
                Nuestra especialidad es el suministro de café pergamino seco de alta calidad física y sensorial, así como materias primas agrícolas seleccionadas técnicamente para satisfacer mercados exigentes de tueste y distribución directa.
              </p>
              <p className="font-serif italic text-art-green border-l-2 border-art-green pl-4 py-1 font-bold text-lg">
                "Nos dedicamos a la gestión, acopio y comercialización de café pergamino, garantizando la equidad en cada eslabón y el desarrollo integral del campo."
              </p>
            </div>

            {/* Statistics */}
            <div className="py-4 px-6 flex flex-wrap items-center gap-6 sm:gap-10 bg-white/45 backdrop-blur-xs border border-art-brown/5 w-fit">
              <div className="flex flex-col">
                <span className="font-serif font-black text-3xl text-art-brown">Malla 15+</span>
                <span className="text-[10px] text-art-brown/70 uppercase tracking-wider font-bold">Calidad Excelso</span>
              </div>
              <div className="h-10 w-px bg-art-brown/10 hidden sm:block" />
              <div className="flex flex-col">
                <span className="font-serif font-black text-3xl text-art-brown">DIAN 4620</span>
                <span className="text-[10px] text-art-brown/70 uppercase tracking-wider font-bold">Comercio al por Mayor</span>
              </div>
              <div className="h-10 w-px bg-art-brown/10 hidden sm:block" />
              <div className="flex flex-col">
                <span className="font-serif font-black text-3xl text-art-brown">Sostenible</span>
                <span className="text-[10px] text-art-brown/70 uppercase tracking-wider font-bold">100% Café Pergamino</span>
              </div>
            </div>

            {/* Misión y Visión Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-art-brown/10">
              <div className="p-6 bg-white/85 backdrop-blur-sm border border-art-brown/10 rounded-none space-y-3.5 shadow-sm">
                <span className="text-[10px] text-art-green uppercase tracking-widest font-bold">Direccionamiento</span>
                <h3 className="font-serif text-xl font-black italic text-art-brown">Misión</h3>
                <p className="text-xs sm:text-sm text-art-brown/85 leading-relaxed font-sans">
                  La Precooperativa Cafetera AGROCAFE es una organización de economía solidaria constituida para impulsar el desarrollo integral de las familias caficultoras y productoras rurales. Nos dedicamos a la gestión, acopio y comercialización al por mayor de materias primas agrícolas y café de alta calidad (Actividad DIAN 4620), garantizando la transparencia, la equidad en los procesos, el fortalecimiento del tejido social y el beneficio mutuo de nuestros asociados bajo un enfoque de mejora continua y sostenibilidad.
                </p>
              </div>

              <div className="p-6 bg-white/85 backdrop-blur-sm border border-art-brown/10 rounded-none space-y-3.5 shadow-sm">
                <span className="text-[10px] text-art-green uppercase tracking-widest font-bold">Proyección</span>
                <h3 className="font-serif text-xl font-black italic text-art-brown">Visión</h3>
                <p className="text-xs sm:text-sm text-art-brown/85 leading-relaxed font-sans">
                  Para el año 2030, AGROCAFE será reconocida a nivel regional y nacional como una precooperativa líder y un referente sólido en el sector del comercio al por mayor de café y materias primas agrícolas. Nos destacaremos por nuestra eficiencia logística, transparencia comercial, solidez financiera y por el impacto positivo en la calidad de vida de nuestros asociados, consolidando el café de nuestra región en mercados de alto valor.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
