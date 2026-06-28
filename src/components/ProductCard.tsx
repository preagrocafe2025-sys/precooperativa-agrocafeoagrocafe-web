/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Plus, Minus, ShoppingCart, Info, Flame } from 'lucide-react';
import { Product, GrindType } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useApp();
  const [grind, setGrind] = useState<GrindType>('Bolsa 1kg');
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity, grind);
    // Reset quantity after adding
    setQuantity(1);
  };

  const grindOptions: GrindType[] = [
    'Saco 50kg',
    'Saco 24kg',
    'Bolsa 5kg',
    'Bolsa 1kg'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col h-full bg-art-card border border-art-brown/10 hover:border-art-brown/25 rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      {/* Product Image Panel */}
      <div className="relative aspect-square overflow-hidden bg-art-soft/20 select-none">
        <motion.img
          src={product.image}
          alt={product.name}
          animate={{ scale: isHovered ? 1.04 : 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        
        {/* Dark overlay vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* Floating badge */}
        {product.badge && (
          <span className="absolute top-4 left-4 z-10 bg-art-green text-white text-[10px] font-sans font-bold tracking-widest uppercase px-3 py-1.5 rounded-none shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Quick specs overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-art-brown bg-art-card/95 border border-art-brown/15 px-3 py-1.5 rounded-none shadow-sm">
          <span className="flex items-center font-sans font-bold uppercase text-[9px]">
            <span className="text-art-green mr-1 font-sans font-black">🌱</span>
            Variedad: <strong className="ml-1 text-art-brown font-black">{product.variety}</strong>
          </span>
          <span className="text-art-brown/20">|</span>
          <span className="font-sans text-[10px]">{product.altitude}</span>
          <span className="text-art-brown/20">|</span>
          <span className="font-sans text-[10px] uppercase font-bold text-art-green">{product.process}</span>
        </div>
      </div>

      {/* Product Information Panel */}
      <div className="flex flex-col flex-grow p-5 space-y-4 bg-art-card">
        {/* Rating & Origin */}
        <div className="flex items-center justify-between text-xs font-sans">
          <span className="text-art-brown/75 font-bold tracking-wide truncate max-w-[70%]">
            📍 {product.origin}
          </span>
          <div className="flex items-center text-art-green font-black bg-art-green/10 px-2.5 py-1 rounded-none border border-art-green/10">
            <Star className="w-3.5 h-3.5 fill-current mr-1 text-art-amber" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Title and descriptions */}
        <div className="space-y-1.5">
          <h3 className="font-serif text-lg font-black italic text-art-brown group-hover:text-art-green transition-colors">
            {product.name}
          </h3>
          {/* Flavor Notes Tags */}
          <div className="flex flex-wrap gap-1 pt-1">
            {product.notes.map(note => (
              <span
                key={note}
                className="text-[10px] bg-art-soft/45 text-art-brown px-2 py-0.5 rounded-none border border-art-brown/5 font-sans font-semibold uppercase tracking-wider"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-art-brown/10" />

        {/* Customize Grind Selection */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-black text-art-brown uppercase tracking-widest">
            Presentación de Empaque:
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {grindOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setGrind(opt)}
                className={`text-[10px] px-2 py-1.5 rounded-none text-center font-bold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
                  grind === opt
                    ? 'bg-art-brown text-white border-art-brown font-black'
                    : 'bg-transparent text-art-brown/65 border-art-brown/15 hover:bg-art-soft/40 hover:text-art-brown hover:border-art-brown/30'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Footer actions and price */}
        <div className="pt-2 mt-auto space-y-4">
          <div className="flex items-center justify-between">
            {/* Availability block */}
            <div className="flex flex-col">
              <span className="text-[9px] text-art-brown/50 font-bold uppercase tracking-widest">Disponibilidad</span>
              <span className="text-xs font-black uppercase text-art-green tracking-wider">Inmediata (Acopio)</span>
            </div>

            {/* Quantity Controller */}
            <div className="flex items-center bg-art-soft/30 border border-art-brown/15 rounded-none p-1">
              <button
                type="button"
                onClick={handleDecrement}
                className="p-1 rounded-none hover:bg-art-soft/60 text-art-brown transition-colors cursor-pointer"
                aria-label="Disminuir cantidad"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-xs font-bold text-art-brown select-none font-sans">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="p-1 rounded-none hover:bg-art-soft/60 text-art-brown transition-colors cursor-pointer"
                aria-label="Aumentar cantidad"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center space-x-2 bg-art-brown hover:bg-art-brown/90 active:bg-black text-white py-3 px-4 rounded-none font-sans font-bold uppercase text-xs tracking-widest shadow-sm transition-all duration-200 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Añadir a la Solicitud</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
