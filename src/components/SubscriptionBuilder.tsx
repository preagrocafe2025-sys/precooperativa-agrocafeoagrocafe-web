/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calendar, Package, HelpCircle, CheckCircle, Sparkles, Award } from 'lucide-react';
import { SubscriptionConfig, GrindType } from '../types';
import { useApp } from '../context/AppContext';

export const SubscriptionBuilder: React.FC = () => {
  const { triggerCheckout } = useApp();

  // Subscription states
  const [coffeeType, setCoffeeType] = useState('Mezcla de Café Verde Excelso');
  const [frequency, setFrequency] = useState<'quincenal' | 'mensual' | 'bimestral'>('mensual');
  const [quantity, setQuantity] = useState<string>('Bolsa 5kg');
  const [grind, setGrind] = useState<GrindType>('Bolsa 5kg');

  // Static pricing rules for wholesale green coffee
  const basePrices: Record<string, number> = {
    'Bolsa 5kg': 115000,
    'Saco 24kg': 499000,
    'Saco 50kg': 950000
  };

  const discountRate = 0.15; // 15% discount

  const priceCalculations = useMemo(() => {
    const original = basePrices[quantity] || 115000;
    const discount = Math.round(original * discountRate);
    const total = original - discount;
    return { original, discount, total };
  }, [quantity]);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleSubscribe = () => {
    const config: SubscriptionConfig = {
      frequency,
      quantity,
      grind,
      coffeeType
    };
    triggerCheckout(config);
  };

  const coffeeOptions = [
    'Mezcla de Café Verde Excelso',
    'Café Verde Supremo - Especial Caturra',
    'Café Verde - Sierra Nevada Orgánico',
    'Café Verde - Proceso Natural Anaeróbico'
  ];

  const frequencies = [
    { value: 'quincenal', label: 'Cada 15 días', description: 'Para alta demanda de tueste' },
    { value: 'mensual', label: 'Cada 30 días (Mensual)', description: 'Ideal para cafeterías de especialidad' },
    { value: 'bimestral', label: 'Cada 2 meses', description: 'Para tostadores artesanales' }
  ];

  const quantities = [
    { value: 'Bolsa 5kg', label: 'Bolsa 5 Kilogramos', info: 'Ideal para pruebas de perfil' },
    { value: 'Saco 24kg', label: 'Saco 24 Kilogramos', info: 'Saco mediano de distribución' },
    { value: 'Saco 50kg', label: 'Saco 50 Kilogramos', info: 'Saco estándar mayorista' }
  ];

  const grinds: GrindType[] = [
    'Saco 50kg',
    'Saco 24kg',
    'Bolsa 5kg',
    'Bolsa 1kg'
  ];

  return (
    <section id="suscripcion" className="py-24 bg-art-bg text-art-brown relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 text-xs text-art-green font-sans font-bold uppercase tracking-widest bg-art-green/10 px-4 py-2 border border-art-green/15">
            <Calendar className="w-3.5 h-3.5" />
            <span>Club de Acopio PRECOOPERATIVA AGROCAFE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black italic text-art-brown leading-none">
            Programa de Suministro Mensual de Café Verde
          </h2>
          <p className="text-art-brown/80 font-sans font-medium text-base sm:text-lg">
            Asegura el suministro constante de granos verdes premium sin tostar directo de la central de acopio con condiciones preferenciales para asociados y aliados.
          </p>
        </div>

        {/* Subscription Interactive Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Configurator Controls Panel (Left) */}
          <div className="lg:col-span-7 bg-art-card border border-art-brown/10 rounded-none p-6 sm:p-8 space-y-8 flex flex-col justify-between shadow-sm">
            
            {/* 1. Variety Choice */}
            <div className="space-y-3">
              <span className="text-[10px] font-black text-art-green uppercase tracking-widest block">
                1. Selecciona la Variedad de Café Verde
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {coffeeOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setCoffeeType(option)}
                    className={`p-4 rounded-none text-left border transition-all duration-200 cursor-pointer ${
                      coffeeType === option
                        ? 'bg-art-brown text-white border-art-brown font-bold'
                        : 'bg-transparent border-art-brown/15 hover:bg-art-soft/40 text-art-brown/85 hover:text-art-brown'
                    }`}
                  >
                    <span className="text-xs uppercase tracking-wider font-bold block">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Frequency Choice */}
            <div className="space-y-3">
              <span className="text-[10px] font-black text-art-green uppercase tracking-widest block">
                2. Frecuencia de Despacho
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {frequencies.map((freq) => (
                  <button
                    key={freq.value}
                    onClick={() => setFrequency(freq.value as any)}
                    className={`p-4 rounded-none text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      frequency === freq.value
                        ? 'bg-art-brown text-white border-art-brown font-bold'
                        : 'bg-transparent border-art-brown/15 hover:bg-art-soft/40 text-art-brown/85 hover:text-art-brown'
                    }`}
                  >
                    <span className="text-xs uppercase tracking-wider font-bold block">{freq.label}</span>
                    <span className="text-[10px] opacity-80 mt-1 block font-sans">{freq.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Quantity Choice */}
            <div className="space-y-3">
              <span className="text-[10px] font-black text-art-green uppercase tracking-widest block">
                3. Cantidad por Despacho
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {quantities.map((qty) => (
                  <button
                    key={qty.value}
                    onClick={() => {
                      setQuantity(qty.value);
                      // Update grind to match if it exists in options
                      if (qty.value === 'Saco 50kg') setGrind('Saco 50kg');
                      else if (qty.value === 'Saco 24kg') setGrind('Saco 24kg');
                      else setGrind('Bolsa 5kg');
                    }}
                    className={`p-4 rounded-none text-left border transition-all duration-200 cursor-pointer flex flex-col ${
                      quantity === qty.value
                        ? 'bg-art-brown text-white border-art-brown font-bold'
                        : 'bg-transparent border-art-brown/15 hover:bg-art-soft/40 text-art-brown/85 hover:text-art-brown'
                    }`}
                  >
                    <span className="text-xs uppercase tracking-wider font-bold block">{qty.label}</span>
                    <span className="text-[10px] opacity-80 mt-1 block font-sans">{qty.info}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Packaging Presentation Choice */}
            <div className="space-y-3">
              <span className="text-[10px] font-black text-art-green uppercase tracking-widest block">
                4. Tipo de Empaque de Despacho
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {grinds.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrind(g)}
                    className={`p-3 rounded-none text-center text-xs font-bold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
                      grind === g
                        ? 'bg-art-brown text-white border-art-brown font-black'
                        : 'bg-transparent border-art-brown/15 hover:bg-art-soft/40 text-art-brown/85 hover:text-art-brown'
                    }`}
                  >
                    <span>{g}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Pricing & Summary Card (Right) */}
          <div className="lg:col-span-5 bg-art-soft/60 border border-art-brown/15 rounded-none p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
            
            {/* Summary details */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-art-brown/10 pb-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-art-green" />
                  <h3 className="font-serif text-xl font-black italic text-art-brown">Tu Plan de Acopio</h3>
                </div>
                <span className="text-[10px] bg-art-green text-white font-sans font-bold px-2.5 py-1 rounded-none uppercase tracking-widest">
                  Condición Asociado
                </span>
              </div>

              {/* Specs checklist */}
              <ul className="space-y-3 text-sm text-art-brown font-sans font-semibold">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-art-green mt-0.5 shrink-0" />
                  <span>Grano Verde: <strong className="text-art-brown font-black">{coffeeType}</strong></span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-art-green mt-0.5 shrink-0" />
                  <span>Frecuencia: <strong className="text-art-brown font-black capitalize">{frequency === 'mensual' ? 'Mensual (Cada 30 días)' : frequency === 'quincenal' ? 'Cada 15 días' : 'Cada 2 meses'}</strong></span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-art-green mt-0.5 shrink-0" />
                  <span>Volumen: <strong className="text-art-brown font-black">{quantity} por entrega</strong></span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-art-green mt-0.5 shrink-0" />
                  <span>Empaque: <strong className="text-art-brown font-black">{grind}</strong></span>
                </li>
              </ul>

              {/* Club perks */}
              <div className="bg-art-card p-4 rounded-none border border-art-brown/10 text-xs text-art-brown/85 space-y-2 font-sans font-medium shadow-sm">
                <p className="font-bold text-art-brown">🎉 Garantías de Cooperativa:</p>
                <p>• Prioridad de abastecimiento en cosechas de alta demanda.</p>
                <p>• Certificación de trazabilidad y origen de micro-lote.</p>
                <p>• Pausa o cancela en un clic, sin contratos de permanencia.</p>
              </div>
            </div>

            {/* Suministro Status Block */}
            <div className="pt-6 border-t border-art-brown/10 mt-8 lg:mt-0 space-y-4">
              <div className="flex items-center justify-between text-xs text-art-brown/70 font-bold uppercase tracking-wider">
                <span>Estado:</span>
                <span className="text-art-green font-black">Disponible para Acopio</span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-art-brown/70 font-bold uppercase tracking-wider">
                <span>Despacho Técnico:</span>
                <span className="text-art-brown font-black">Planadas, Tolima</span>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[10px] text-art-brown/60 block font-bold uppercase tracking-widest">Cotización:</span>
                  <span className="text-xl font-serif font-black text-art-brown">
                    Solicitud Directa
                  </span>
                </div>
                <span className="text-[10px] bg-art-card border border-art-brown/10 text-art-brown px-2 py-1 rounded-none uppercase font-bold tracking-widest shadow-sm">
                  Envío Incluido
                </span>
              </div>

              {/* CTA button */}
              <button
                onClick={handleSubscribe}
                className="w-full flex items-center justify-center space-x-2 bg-art-brown hover:bg-art-brown/90 active:bg-black text-white py-4 px-6 rounded-none font-sans font-bold uppercase text-xs tracking-widest shadow-sm transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Solicitar Suministro</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
