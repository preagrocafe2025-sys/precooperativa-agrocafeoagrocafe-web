/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Coffee } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { cart, setCartOpen, activeTab, setActiveTab, styleTheme } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor page scroll to change header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Inicio', tab: 'inicio' },
    { name: 'Misión y Visión', tab: 'nosotros' },
    { name: 'Catálogo Pergamino', tab: 'tienda' },
    { name: 'Plan de Suministro', tab: 'suscripcion' },
    { name: 'Transparencia RTE', tab: 'transparencia' }
  ];

  const handleTabClick = (tab: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? styleTheme === 'woolamai'
              ? 'bg-[#071F22]/95 backdrop-blur-md shadow-md border-b border-white/10 py-4 text-white'
              : 'bg-art-bg/95 backdrop-blur-md shadow-sm border-b border-art-brown/10 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Button */}
            <button
              onClick={(e) => handleTabClick('inicio', e)}
              className="flex items-center space-x-2.5 group cursor-pointer text-left bg-transparent border-none p-0 focus:outline-none"
            >
              <div className={`p-2 transition-colors duration-300 ${styleTheme === 'woolamai' ? 'bg-[#2EC4B6] text-white' : 'bg-art-brown text-white'}`}>
                <Coffee className="w-5 h-5" />
              </div>
              <span className={`transition-all duration-300 ${
                styleTheme === 'woolamai'
                  ? 'font-display font-light text-xl sm:text-2xl tracking-[0.2em] lowercase text-white'
                  : 'font-serif font-black text-xl sm:text-2xl tracking-tighter uppercase italic text-art-brown group-hover:opacity-80'
              }`}>
                {styleTheme === 'woolamai' ? 'agrocafe' : 'PRECOOPERATIVA AGROCAFE'}
              </span>
            </button>

            {/* Desktop Tabbed Navigation */}
            <nav className={`hidden md:flex items-center space-x-8 font-sans text-xs uppercase tracking-widest font-semibold ${styleTheme === 'woolamai' ? 'text-white' : 'text-art-brown'}`}>
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={(e) => handleTabClick(link.tab, e)}
                  className={`hover:opacity-75 transition-opacity py-1 relative group cursor-pointer bg-transparent border-none focus:outline-none ${
                    activeTab === link.tab
                      ? styleTheme === 'woolamai'
                        ? 'text-[#2EC4B6] font-black'
                        : 'text-art-green font-black'
                      : ''
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                    activeTab === link.tab
                      ? styleTheme === 'woolamai'
                        ? 'w-full bg-[#2EC4B6]'
                        : 'w-full bg-art-green'
                      : styleTheme === 'woolamai'
                        ? 'bg-[#2EC4B6] w-0 group-hover:w-full'
                        : 'bg-art-brown w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
            </nav>

            {/* Controls (Cart & Mobile menu trigger) */}
            <div className="flex items-center space-x-3">
              {/* Cart Button */}
              <button
                id="cart-trigger"
                onClick={() => setCartOpen(true)}
                className={`relative p-2 transition-all duration-200 focus:outline-none rounded-sm border border-transparent cursor-pointer ${
                  styleTheme === 'woolamai'
                    ? 'text-white hover:bg-white/10'
                    : 'text-art-brown hover:bg-art-soft/60 hover:border-art-brown/10'
                }`}
                aria-label="Ver carrito"
              >
                <ShoppingBag className="w-5 h-5" />
                <AnimatePresence>
                  {totalCartItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className={`absolute -top-1 -right-1 text-white text-[9px] font-sans font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full shadow-sm ${
                        styleTheme === 'woolamai' ? 'bg-[#2EC4B6]' : 'bg-art-green'
                      }`}
                    >
                      {totalCartItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 md:hidden transition-colors rounded-sm cursor-pointer ${
                  styleTheme === 'woolamai' ? 'text-white hover:bg-white/10' : 'text-art-brown hover:bg-art-soft/60'
                }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`fixed inset-x-0 top-[64px] z-30 md:hidden border-b shadow-lg ${
              styleTheme === 'woolamai'
                ? 'bg-[#071F22] text-white border-white/10'
                : 'bg-art-bg text-art-brown border-art-brown/10'
            }`}
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={(e) => handleTabClick(link.tab, e)}
                  className={`w-full text-left block px-4 py-3 rounded-none font-sans font-bold text-xs uppercase tracking-wider transition-all bg-transparent border-none ${
                    styleTheme === 'woolamai' ? 'text-white/80 hover:bg-white/5' : 'text-art-brown hover:bg-art-soft/50'
                  } ${
                    activeTab === link.tab
                      ? styleTheme === 'woolamai'
                        ? 'bg-white/10 border-l-2 border-[#2EC4B6] pl-3 text-[#2EC4B6]'
                        : 'bg-art-soft/70 border-l-2 border-art-green pl-3 text-art-green'
                      : ''
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setCartOpen(true);
                  }}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-none font-sans uppercase text-xs tracking-wider font-bold transition-all cursor-pointer ${
                    styleTheme === 'woolamai'
                      ? 'bg-[#2EC4B6] hover:bg-[#2EC4B6]/90 text-white'
                      : 'bg-art-brown hover:bg-art-brown/90 text-white'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ver Solicitud ({totalCartItems})</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
