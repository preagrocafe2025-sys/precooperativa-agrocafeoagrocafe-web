/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC = () => {
  const [selectedProcess, setSelectedProcess] = useState<'Todos' | 'Lavado' | 'Honey' | 'Natural'>('Todos');

  const filteredProducts = useMemo(() => {
    if (selectedProcess === 'Todos') {
      return PRODUCTS;
    }
    return PRODUCTS.filter((p) => p.process.toLowerCase().includes(selectedProcess.toLowerCase()));
  }, [selectedProcess]);

  const processCategories: ('Todos' | 'Lavado' | 'Honey' | 'Natural')[] = [
    'Todos',
    'Lavado',
    'Honey',
    'Natural'
  ];

  return (
    <section id="productos" className="py-24 bg-art-bg text-art-brown relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-1.5 text-xs text-art-green font-sans font-bold uppercase tracking-widest bg-art-green/10 px-4 py-2 border border-art-green/15">
            <Sparkles className="w-3 h-3" />
            <span>Café Verde de Especialidad</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black italic text-art-brown">
            Catálogo de Café Verde
          </h2>
          <p className="text-art-brown/80 font-sans font-medium text-base sm:text-lg">
            Suministro premium de café verde (almendra) sin tostar, seleccionado rigurosamente bajo estándares de comercio justo y cooperativismo.
          </p>
        </div>

        {/* Categories / Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-art-brown/10 pb-6 mb-10">
          <div className="flex items-center space-x-2 text-art-brown">
            <SlidersHorizontal className="w-4 h-4 text-art-green" />
            <span className="text-xs uppercase tracking-wider font-bold">Filtrar por tipo de Proceso:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {processCategories.map((proc) => (
              <button
                key={proc}
                onClick={() => setSelectedProcess(proc)}
                className={`px-4 py-2 text-xs font-sans uppercase tracking-widest font-bold transition-all duration-200 cursor-pointer border rounded-none ${
                  selectedProcess === proc
                    ? 'bg-art-brown text-white border-art-brown'
                    : 'bg-transparent text-art-brown/60 hover:text-art-brown border-art-brown/20 hover:border-art-brown/40'
                }`}
              >
                {proc === 'Todos' ? 'Todos los procesos' : `Proceso ${proc}`}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Products Found State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-art-brown/60 space-y-2">
            <p className="font-serif italic text-lg font-bold">No se encontraron productos</p>
            <p className="text-sm font-sans">Intenta seleccionando otro proceso.</p>
          </div>
        )}

      </div>
    </section>
  );
};
