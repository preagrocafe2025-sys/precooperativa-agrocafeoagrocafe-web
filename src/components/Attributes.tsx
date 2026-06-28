/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Heart, Flame, Truck } from 'lucide-react';
import { BRAND_ATTRIBUTES } from '../data';

export const Attributes: React.FC = () => {
  // Map string icon names to Lucide icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-6 h-6" />;
      case 'Heart':
        return <Heart className="w-6 h-6" />;
      case 'Flame':
        return <Flame className="w-6 h-6" />;
      case 'Truck':
        return <Truck className="w-6 h-6" />;
      default:
        return <Coffee className="w-6 h-6" />;
    }
  };

  return (
    <section id="atributos" className="py-20 bg-art-bg text-art-brown relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs text-art-green font-sans font-bold uppercase tracking-widest block">
            Nuestros Valores Diferenciales
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black italic text-art-brown">
            ¿Por qué elegir PRECOOPERATIVA AGROCAFE?
          </h2>
          <p className="text-sm sm:text-base text-art-brown/80 font-sans font-medium leading-relaxed">
            Cuidamos cada eslabón de la cadena de valor para ofrecerte una experiencia superior y éticamente intachable.
          </p>
        </div>

        {/* Attributes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BRAND_ATTRIBUTES.map((attr, index) => (
            <motion.div
              key={attr.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-none bg-art-card border border-art-brown/10 hover:border-art-brown/25 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center space-y-4 group shadow-sm"
            >
              {/* Animated Icon Container */}
              <div className="w-14 h-14 bg-art-green/10 text-art-green border border-art-green/10 flex items-center justify-center rounded-none group-hover:bg-art-brown group-hover:text-white group-hover:scale-105 transition-all duration-300">
                {getIcon(attr.icon)}
              </div>

              {/* Title & Desc */}
              <div className="space-y-2">
                <h3 className="font-serif text-lg font-black italic text-art-brown group-hover:text-art-green transition-colors">
                  {attr.title}
                </h3>
                <p className="text-xs sm:text-sm text-art-brown/85 font-sans">
                  {attr.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
