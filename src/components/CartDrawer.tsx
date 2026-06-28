/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    triggerCheckout
  } = useApp();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Prevent background scrolling when cart drawer is active
  React.useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:max-w-md bg-white border-l border-art-brown/15 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-5 border-b border-art-brown/10 flex items-center justify-between bg-white">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5.5 h-5.5 text-art-green" />
                <h3 className="font-serif text-xl font-black italic text-art-brown">Mi Solicitud</h3>
                {totalCartItems > 0 && (
                  <span className="text-[9px] bg-art-green/10 border border-art-green/10 text-art-green font-sans font-bold px-2.5 py-1 rounded-none uppercase tracking-widest">
                    {totalCartItems} {totalCartItems === 1 ? 'lote' : 'lotes'}
                  </span>
                )}
              </div>
              
              <button
                onClick={() => setCartOpen(false)}
                className="p-1.5 text-art-brown/60 hover:text-art-brown hover:bg-art-soft/40 transition-colors cursor-pointer rounded-none border border-transparent"
                aria-label="Cerrar carrito"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4 bg-white">
              {cart.length === 0 ? (
                /* Empty state */
                <div className="h-full flex flex-col items-center justify-center text-center space-y-5 py-20">
                  <div className="p-5 rounded-none bg-art-soft/35 text-art-brown/50 border border-art-brown/10">
                    <ShoppingBag className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-serif italic font-black text-lg text-art-brown">Tu solicitud está vacía</p>
                    <p className="text-xs text-art-brown/80 max-w-[240px] leading-relaxed mx-auto font-sans">
                      Añade cafés de especialidad o configura un plan de suministro mensual para iniciar tu experiencia.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      const productsSection = document.getElementById('productos');
                      if (productsSection) {
                        productsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="bg-art-brown hover:bg-art-brown/90 text-white px-6 py-3 rounded-none text-xs font-sans uppercase tracking-widest font-bold transition-colors cursor-pointer"
                  >
                    Explorar Cafés
                  </button>
                </div>
              ) : (
                /* Items rendering */
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-3 bg-art-soft/15 border border-art-brown/10 rounded-none relative group"
                  >
                    {/* Item Image */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-none object-cover bg-white border border-art-brown/10 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    {/* Item details */}
                    <div className="flex-grow space-y-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-sm font-black italic text-art-brown truncate pr-4">
                          {item.product.name}
                        </h4>
                        
                        {/* Remove trash btn */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-art-brown/50 hover:text-red-500 p-1 transition-colors cursor-pointer"
                          aria-label="Quitar del carrito"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="inline-block text-[9px] bg-white text-art-brown border border-art-brown/10 px-1.5 py-0.5 rounded-none font-sans font-bold uppercase tracking-wider">
                        {item.grind}
                      </span>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-art-brown/60 font-sans font-bold uppercase tracking-wider">
                          Muestra para Cotizar
                        </span>

                        {/* Quantity Controller */}
                        <div className="flex items-center bg-white border border-art-brown/15 rounded-none p-0.5 scale-90">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-none hover:bg-art-soft/40 text-art-brown cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-art-brown font-sans">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-none hover:bg-art-soft/40 text-art-brown cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>

             {/* Subtotal & Action buttons */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-art-brown/10 bg-art-soft/30 space-y-4">
                <div className="space-y-2.5 font-sans">
                  <div className="flex items-center justify-between text-xs text-art-brown/70 font-semibold">
                    <span>Lotes Solicitados:</span>
                    <span className="text-art-brown font-black">{totalCartItems}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-art-brown/70 font-semibold">
                    <span>Despacho Técnico:</span>
                    <span className="text-art-brown font-black">Planadas, Tolima</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-art-brown/70 font-semibold">
                    <span>Muestras de Envío:</span>
                    <span className="text-art-green font-bold">Sin Costo</span>
                  </div>
                  <div className="h-px bg-art-brown/10" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-art-brown">Cotización:</span>
                    <span className="text-sm font-black uppercase tracking-wider text-art-green bg-art-green/10 px-2 py-0.5">
                      Directa Cooperativa
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-2">
                  <button
                    onClick={() => triggerCheckout('cart')}
                    className="w-full flex items-center justify-center space-x-2 bg-art-brown hover:bg-art-brown/90 active:bg-black text-white py-3.5 px-4 rounded-none font-sans font-bold uppercase tracking-widest text-xs shadow-sm transition-all cursor-pointer"
                  >
                    <span>Proceder con la Solicitud</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="w-full text-center text-xs text-art-brown/60 hover:text-art-brown py-2.5 transition-colors cursor-pointer font-bold uppercase tracking-wider"
                  >
                    Seguir explorando
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
