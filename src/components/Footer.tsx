/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin, Coffee, Instagram, Facebook, Youtube, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { setActiveTab } = useApp();

  const handleFooterTabClick = (tab: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="bg-art-soft/20 border-t border-art-brown/10 pt-16">
      
      {/* Upper Footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Logo brand and details */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-art-brown text-white">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-serif font-black italic text-lg tracking-wide text-art-brown">
                PRECOOPERATIVA AGROCAFE
              </span>
            </div>
            
            <p className="text-xs leading-relaxed text-art-brown/85 font-sans font-medium">
              Organización de economía solidaria para la gestión, acopio y comercialización al por mayor de materias primas agrícolas y café pergamino de especialidad (Actividad DIAN 4620).
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#instagram"
                className="w-8 h-8 rounded-none bg-white border border-art-brown/10 hover:border-art-brown hover:text-art-green flex items-center justify-center transition-all cursor-pointer text-art-brown/70 hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                className="w-8 h-8 rounded-none bg-white border border-art-brown/10 hover:border-art-brown hover:text-art-green flex items-center justify-center transition-all cursor-pointer text-art-brown/70 hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                className="w-8 h-8 rounded-none bg-white border border-art-brown/10 hover:border-art-brown hover:text-art-green flex items-center justify-center transition-all cursor-pointer text-art-brown/70 hover:scale-105"
                aria-label="Youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="font-serif font-black italic text-sm text-art-brown tracking-wider uppercase">Navegación</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button
                  onClick={(e) => handleFooterTabClick('inicio', e)}
                  className="hover:text-art-green transition-colors cursor-pointer bg-transparent border-none p-0 text-left font-sans uppercase tracking-widest text-[10px]"
                >
                  Inicio / Atributos
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleFooterTabClick('nosotros', e)}
                  className="hover:text-art-green transition-colors cursor-pointer bg-transparent border-none p-0 text-left font-sans uppercase tracking-widest text-[10px]"
                >
                  Misión y Visión
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleFooterTabClick('tienda', e)}
                  className="hover:text-art-green transition-colors cursor-pointer bg-transparent border-none p-0 text-left font-sans uppercase tracking-widest text-[10px]"
                >
                  Catálogo Pergamino
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleFooterTabClick('suscripcion', e)}
                  className="hover:text-art-green transition-colors cursor-pointer bg-transparent border-none p-0 text-left font-sans uppercase tracking-widest text-[10px]"
                >
                  Plan de Suministro
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleFooterTabClick('transparencia', e)}
                  className="hover:text-art-green transition-colors cursor-pointer bg-transparent border-none p-0 text-left font-sans uppercase tracking-widest text-[10px]"
                >
                  Transparencia RTE
                </button>
              </li>
            </ul>
          </div>

          {/* Guarantee / Shipping policies */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="font-serif font-black italic text-sm text-art-brown tracking-wider uppercase">Garantías</h4>
            <div className="space-y-3.5 text-xs font-medium text-art-brown/90">
              <div className="flex items-start space-x-2">
                <ShieldCheck className="w-4.5 h-4.5 text-art-green shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-art-brown font-bold">Garantía de Calidad Pergamino:</strong> Granos seleccionados con humedad técnica (10-12%) y un excelente secado al sol.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <ShieldCheck className="w-4.5 h-4.5 text-art-green shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-art-brown font-bold">Envíos Nacionales:</strong> En todos nuestros despachos mayoristas y muestras individuales a nivel nacional.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="font-serif font-black italic text-sm text-art-brown tracking-wider uppercase">Contacto</h4>
            <ul className="space-y-3.5 text-xs font-semibold">
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-art-green" />
                <span className="truncate">preagrocafe2025@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-art-green" />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-art-green shrink-0 mt-0.5" />
                <span>Planadas, Tolima / Bogotá, Colombia</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Lower Copyright section */}
      <div className="bg-art-bg border-t border-art-brown/10 py-6 text-art-brown/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {currentYear} PRECOOPERATIVA AGROCAFE. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-4">
            <a href="#politica-envio" className="hover:text-art-brown transition-colors">Políticas de Envío</a>
            <span>•</span>
            <a href="#terminos" className="hover:text-art-brown transition-colors">Términos de Servicio</a>
            <span>•</span>
            <a href="#privacidad" className="hover:text-art-brown transition-colors">Privacidad de Datos</a>
          </div>
        </div>
      </div>

    </footer>
  );
};
