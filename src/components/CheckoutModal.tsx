/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, CreditCard, Truck, Check, Sparkles, ChevronRight, RefreshCw, Printer, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderDetails, SubscriptionConfig } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    checkoutTarget,
    setCheckoutTarget,
    cart,
    clearCart
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<OrderDetails>({
    fullName: 'Central de Acopio AGROCAFE',
    email: 'preagrocafe2025@gmail.com',
    address: 'VEREDA MIRADOR FINCA EL CEDRAL',
    city: 'Planadas (Tolima)',
    phone: '3148118616',
    paymentMethod: 'credit_card'
  });
  const [formErrors, setFormErrors] = useState<Partial<OrderDetails>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceCode] = useState(() => `REF-${Math.floor(100000 + Math.random() * 900000)}-CO`);

  if (!checkoutTarget) return null;

  const isSubscription = (target: any): target is SubscriptionConfig => {
    return target && typeof target === 'object' && 'frequency' in target;
  };

  // Determine cart total or subscription total
  const isSubscriptionFlow = isSubscription(checkoutTarget);
  
  const getSubtotal = () => {
    if (isSubscriptionFlow) {
      const sub = checkoutTarget as SubscriptionConfig;
      const basePrices: Record<string, number> = { 'Bolsa 5kg': 115000, 'Saco 24kg': 499000, 'Saco 50kg': 950000 };
      const original = basePrices[sub.quantity] || 115000;
      return original - Math.round(original * 0.15); // with 15% discount
    }
    // Standard cart subtotal
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const totalAmount = getSubtotal();

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Autofill data for testing
  const handleAutofill = () => {
    setFormData({
      fullName: 'Asociado Central AGROCAFE',
      email: 'preagrocafe2025@gmail.com',
      address: 'VEREDA MIRADOR FINCA EL CEDRAL',
      city: 'Planadas (Tolima)',
      phone: '3148118616',
      paymentMethod: 'credit_card'
    });
    setFormErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof OrderDetails]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const errors: Partial<OrderDetails> = {};
    if (!formData.fullName.trim()) errors.fullName = 'El nombre completo es obligatorio';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Correo electrónico no válido';
    if (!formData.address.trim()) errors.address = 'La dirección de envío es obligatoria';
    if (!formData.phone.trim() || formData.phone.length < 7) errors.phone = 'Número telefónico no válido';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    }
  };

  const handleBackStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleFinalize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate server side transaction
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
      if (!isSubscriptionFlow) {
        clearCart(); // Clear cart on success
      }
    }, 1800);
  };

  const handleClose = () => {
    setCheckoutTarget(null);
    setStep(1);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop Blur Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white border border-art-brown/15 w-full max-w-2xl rounded-none shadow-2xl overflow-hidden z-10 flex flex-col text-art-brown"
        >
          {/* Header */}
          <div className="p-6 border-b border-art-brown/10 flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5.5 h-5.5 text-art-green" />
              <h3 className="font-serif text-lg sm:text-xl font-black italic text-art-brown">
                {isSubscriptionFlow ? 'Confirmar Plan de Suministro' : 'Simulador de Solicitud de Acopio'}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-none text-art-brown/60 hover:text-art-brown hover:bg-art-soft/40 transition-colors cursor-pointer border border-transparent"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sandbox Notice Banner (Do not hide since it prevents user confusion) */}
          <div className="bg-art-soft/45 border-b border-art-brown/10 px-6 py-2.5 flex items-center space-x-2 text-art-brown font-sans font-semibold text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0 text-art-green" />
            <span>Este es un <strong>entorno de simulación sandbox</strong> para coordinar despachos cooperativos.</span>
          </div>

          {/* Steps Indicator Progress Bar */}
          {step < 3 && (
            <div className="bg-art-soft/20 border-b border-art-brown/10 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`w-6 h-6 rounded-none flex items-center justify-center text-xs font-bold font-sans ${step >= 1 ? 'bg-art-brown text-white' : 'bg-art-soft text-art-brown/40 border border-art-brown/10'}`}>1</span>
                <span className={`text-[10px] uppercase tracking-wider font-sans ${step === 1 ? 'text-art-brown font-black' : 'text-art-brown/50'}`}>Datos de Despacho</span>
              </div>
              <ChevronRight className="w-4 h-4 text-art-brown/30" />
              <div className="flex items-center space-x-2">
                <span className={`w-6 h-6 rounded-none flex items-center justify-center text-xs font-bold font-sans ${step >= 2 ? 'bg-art-brown text-white' : 'bg-art-soft text-art-brown/40 border border-art-brown/10'}`}>2</span>
                <span className={`text-[10px] uppercase tracking-wider font-sans ${step === 2 ? 'text-art-brown font-black' : 'text-art-brown/50'}`}>Canal de Contacto</span>
              </div>
              <ChevronRight className="w-4 h-4 text-art-brown/30" />
              <div className="flex items-center space-x-2">
                <span className={`w-6 h-6 rounded-none flex items-center justify-center text-xs font-bold font-sans ${step === 3 ? 'bg-art-brown text-white' : 'bg-art-soft text-art-brown/40 border border-art-brown/10'}`}>3</span>
                <span className="text-[10px] uppercase tracking-wider font-sans text-art-brown/40">Confirmación Final</span>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
            
            {/* STEP 1: Shipping Info Form */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-md font-black italic text-art-brown">¿A dónde enviamos tu café?</h4>
                  <button
                    type="button"
                    onClick={handleAutofill}
                    className="text-[10px] uppercase font-bold tracking-wider bg-art-green/10 border border-art-green/10 text-art-green hover:bg-art-green/15 px-3 py-1.5 rounded-none transition-colors cursor-pointer"
                  >
                    Autorellenar Datos de Prueba
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-art-brown font-black uppercase tracking-wider block">Nombre Completo *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Ej. Carlos Montoya"
                      className={`w-full bg-white border rounded-none px-4 py-3 text-sm text-art-brown placeholder-art-brown/40 focus:outline-none focus:border-art-brown/60 ${formErrors.fullName ? 'border-red-500' : 'border-art-brown/15'}`}
                    />
                    {formErrors.fullName && <p className="text-[10px] text-red-500">{formErrors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-art-brown font-black uppercase tracking-wider block">Correo Electrónico *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Ej. carlos@gmail.com"
                      className={`w-full bg-white border rounded-none px-4 py-3 text-sm text-art-brown placeholder-art-brown/40 focus:outline-none focus:border-art-brown/60 ${formErrors.email ? 'border-red-500' : 'border-art-brown/15'}`}
                    />
                    {formErrors.email && <p className="text-[10px] text-red-500">{formErrors.email}</p>}
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] text-art-brown font-black uppercase tracking-wider block">Dirección de Entrega *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Ej. Calle 26 # 68C - 42"
                      className={`w-full bg-white border rounded-none px-4 py-3 text-sm text-art-brown placeholder-art-brown/40 focus:outline-none focus:border-art-brown/60 ${formErrors.address ? 'border-red-500' : 'border-art-brown/15'}`}
                    />
                    {formErrors.address && <p className="text-[10px] text-red-500">{formErrors.address}</p>}
                  </div>

                  {/* City */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-art-brown font-black uppercase tracking-wider block">Ciudad *</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-art-brown/15 rounded-none px-4 py-3 text-sm text-art-brown focus:outline-none focus:border-art-brown/60 cursor-pointer"
                    >
                      <option value="Planadas (Tolima)">Planadas (Tolima)</option>
                      <option value="Bogotá D.C.">Bogotá D.C.</option>
                      <option value="Medellín">Medellín</option>
                      <option value="Cali">Cali</option>
                      <option value="Barranquilla">Barranquilla</option>
                      <option value="Bucaramanga">Bucaramanga</option>
                      <option value="Tolima - Ibagué">Tolima - Ibagué</option>
                      <option value="Huila - Neiva">Huila - Neiva</option>
                    </select>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-art-brown font-black uppercase tracking-wider block">Teléfono de Contacto *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Ej. 3124567890"
                      className={`w-full bg-white border rounded-none px-4 py-3 text-sm text-art-brown placeholder-art-brown/40 focus:outline-none focus:border-art-brown/60 ${formErrors.phone ? 'border-red-500' : 'border-art-brown/15'}`}
                    />
                    {formErrors.phone && <p className="text-[10px] text-red-500">{formErrors.phone}</p>}
                  </div>
                </div>

                {/* Shipping cost indicator */}
                <div className="p-4 rounded-none bg-art-green/5 border border-art-green/15 flex items-center space-x-3 shadow-sm">
                  <div className="p-2 bg-art-green/10 text-art-green rounded-none">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-black text-art-green">Envío 100% Gratuito Habilitado</p>
                    <p className="text-[11px] text-art-brown/80 font-sans font-medium">Tiempos estimados de entrega: 2 a 3 días hábiles en ciudades principales.</p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Communication Preference Form */}
            {step === 2 && (
              <form onSubmit={handleFinalize} className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-serif text-md font-black italic text-art-brown">Selecciona tu canal de comunicación preferido</h4>
                  <p className="text-xs text-art-brown/70 font-medium">Coordinaremos los detalles técnicos del suministro, muestras y cotización mediante esta vía.</p>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'credit_card' }))}
                      className={`p-4 rounded-none text-center border transition-all flex flex-col items-center justify-center space-y-2 cursor-pointer ${formData.paymentMethod === 'credit_card' ? 'bg-art-brown text-white border-art-brown font-bold' : 'bg-transparent border-art-brown/15 text-art-brown/70 hover:text-art-brown'}`}
                    >
                      <span className="text-lg">💬</span>
                      <span className="text-xs font-sans font-bold uppercase tracking-wider">WhatsApp</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'pse' }))}
                      className={`p-4 rounded-none text-center border transition-all flex flex-col items-center justify-center space-y-2 cursor-pointer ${formData.paymentMethod === 'pse' ? 'bg-art-brown text-white border-art-brown font-bold' : 'bg-transparent border-art-brown/15 text-art-brown/70 hover:text-art-brown'}`}
                    >
                      <span className="text-lg">✉️</span>
                      <span className="text-xs font-sans font-bold uppercase tracking-wider">Correo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cash' }))}
                      className={`p-4 rounded-none text-center border transition-all flex flex-col items-center justify-center space-y-2 cursor-pointer ${formData.paymentMethod === 'cash' ? 'bg-art-brown text-white border-art-brown font-bold' : 'bg-transparent border-art-brown/15 text-art-brown/70 hover:text-art-brown'}`}
                    >
                      <span className="text-lg">📞</span>
                      <span className="text-xs font-sans font-bold uppercase tracking-wider">Llamada</span>
                    </button>
                  </div>
                </div>

                {/* Sub-form fields based on selection */}
                {formData.paymentMethod === 'credit_card' && (
                  <div className="p-5 rounded-none bg-art-soft/20 border border-art-brown/10 text-center space-y-2 shadow-inner font-sans font-medium animate-fadeIn">
                    <p className="text-sm font-bold text-art-green uppercase tracking-wider">Contacto Prioritario por WhatsApp</p>
                    <p className="text-xs text-art-brown/80">Te enviaremos la cotización formal y ficha técnica en PDF directamente a tu número celular de contacto.</p>
                  </div>
                )}

                {formData.paymentMethod === 'pse' && (
                  <div className="p-5 rounded-none bg-art-soft/20 border border-art-brown/10 text-center space-y-2 shadow-inner font-sans font-medium animate-fadeIn">
                    <p className="text-sm font-bold text-art-brown uppercase tracking-wider">Contacto por Correo Electrónico</p>
                    <p className="text-xs text-art-brown/80">Recibirás un desglose completo de la propuesta de suministro con las opciones de logística y trazabilidad en tu correo.</p>
                  </div>
                )}

                {formData.paymentMethod === 'cash' && (
                  <div className="p-5 rounded-none bg-art-soft/20 border border-art-brown/10 text-center space-y-2 shadow-inner font-sans font-medium animate-fadeIn">
                    <p className="text-sm font-bold text-art-green uppercase tracking-wider">Contacto por Llamada Directa</p>
                    <p className="text-xs text-art-brown/80">Un gestor de AGROCAFE se comunicará telefónicamente contigo para realizar una atención personalizada y agendar visita técnica.</p>
                  </div>
                )}

                {/* Order Summary Recap */}
                <div className="p-5 rounded-none bg-art-soft/35 border border-art-brown/10 space-y-3 font-sans font-semibold">
                  <p className="text-[10px] font-black text-art-brown/60 uppercase tracking-wider">Resumen de la Solicitud</p>
                  <div className="space-y-1.5 text-xs text-art-brown/90 font-medium">
                    {isSubscriptionFlow ? (
                      <div className="flex justify-between items-center">
                        <span>Plan de Suministro: {checkoutTarget.coffeeType} ({checkoutTarget.quantity})</span>
                        <span className="font-bold text-art-brown">Frecuencia: {checkoutTarget.frequency === 'mensual' ? 'Mensual' : checkoutTarget.frequency === 'quincenal' ? 'Quincenal' : 'Bimestral'}</span>
                      </div>
                    ) : (
                      cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center">
                          <span>{item.product.name} ({item.grind}) x{item.quantity}</span>
                          <span className="font-bold text-art-green">Lote para Cotizar</span>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="h-px bg-art-brown/10 my-2" />
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-[10px] font-black uppercase tracking-widest text-art-brown">Costo Estimado:</span>
                    <span className="text-art-green font-serif text-sm font-black uppercase">Pendiente de Cotización</span>
                  </div>
                </div>

                {/* Form buttons */}
                <div className="flex items-center space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleBackStep}
                    className="w-1/3 py-3 border border-art-brown/20 text-art-brown/70 hover:text-art-brown rounded-none font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer bg-transparent"
                  >
                    Atrás
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/3 flex items-center justify-center space-x-2 bg-art-brown hover:bg-art-brown/90 active:bg-black text-white py-3 rounded-none font-sans font-bold uppercase text-xs tracking-widest shadow-sm transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Procesando solicitud...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Confirmar Solicitud</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Animated Success Receipt */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-6"
              >
                {/* Check icon circles */}
                <div className="relative w-16 h-16 bg-art-green/10 text-art-green border border-art-green/15 rounded-none flex items-center justify-center mx-auto shadow-sm">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <Check className="w-8 h-8" />
                  </motion.div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-serif text-2xl font-black italic text-art-brown leading-none">
                    {isSubscriptionFlow ? '¡Suministro Registrado!' : '¡Solicitud Registrada!'}
                  </h4>
                  <p className="text-sm text-art-brown/80 font-sans font-medium max-w-sm mx-auto">
                    Tu solicitud ha sido ingresada en el sistema técnico de la precooperativa para cotización.
                  </p>
                </div>

                {/* Receipt Board */}
                <div className="bg-white border border-art-brown/15 rounded-none p-5 text-left text-xs space-y-3.5 max-w-md mx-auto relative overflow-hidden font-mono shadow-md text-art-brown">
                  
                  <div className="flex items-center justify-between border-b border-art-brown/10 pb-3 mt-1.5">
                    <span className="text-art-green font-bold">PRECOOPERATIVA AGROCAFE</span>
                    <span className="text-[10px] text-art-brown/50 font-bold">{referenceCode}</span>
                  </div>

                  {/* Receipt Lines */}
                  <div className="space-y-2 text-art-brown">
                    <div className="flex justify-between">
                      <span>Cliente:</span>
                      <span className="text-art-brown font-semibold">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Correo:</span>
                      <span className="text-art-brown">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Destino:</span>
                      <span className="text-art-brown truncate max-w-[200px]">{formData.address}, {formData.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Celular:</span>
                      <span className="text-art-brown">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Contacto:</span>
                      <span className="text-art-brown capitalize">{formData.paymentMethod === 'credit_card' ? 'WhatsApp' : formData.paymentMethod === 'pse' ? 'Correo Electrónico' : 'Llamada Directa'}</span>
                    </div>
                  </div>

                  <div className="h-px bg-art-brown/10 border-dashed" />

                  {/* Order items recap */}
                  <div className="space-y-1 text-[11px] text-art-brown/80">
                    <p className="font-semibold text-art-brown mb-1">Detalle de la Solicitud:</p>
                    {isSubscriptionFlow ? (
                      <div className="flex justify-between">
                        <span>Plan {checkoutTarget.coffeeType} ({checkoutTarget.quantity}) ({checkoutTarget.grind}) - Frecuencia: {checkoutTarget.frequency}</span>
                        <span className="text-art-green font-bold">Registrado</span>
                      </div>
                    ) : (
                      cart.map(item => (
                        <div key={item.id} className="flex justify-between">
                          <span>{item.product.name} ({item.grind}) x{item.quantity}</span>
                          <span className="text-art-green font-bold">Lote Solicitado</span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="h-px bg-art-brown/10 border-dashed" />

                  <div className="flex justify-between items-center text-sm font-bold pt-1.5 text-art-brown">
                    <span className="text-[10px] font-black uppercase tracking-widest text-art-brown">Estado de Cotización:</span>
                    <span className="text-art-green font-serif font-black">PENDIENTE</span>
                  </div>
                </div>

                <div className="bg-art-soft/25 rounded-none p-3 border border-art-brown/10 text-art-brown/80 text-[11px] max-w-sm mx-auto leading-relaxed font-sans font-medium">
                  📬 Hemos registrado tu preferencia de comunicación. Un asesor de la Precooperativa AGROCAFE se comunicará contigo para enviar la ficha técnica y cotización de suministro agrícola.
                </div>

                {/* Print & Return action */}
                <div className="flex items-center justify-center space-x-3 pt-3">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center space-x-1.5 text-xs text-art-brown/70 hover:text-art-brown border border-art-brown/20 px-4 py-2.5 rounded-none uppercase font-bold tracking-wider transition-all cursor-pointer bg-white"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimir Solicitud</span>
                  </button>
                  <button
                    onClick={handleClose}
                    className="bg-art-brown hover:bg-art-brown/90 text-white text-xs font-sans font-bold uppercase tracking-widest px-6 py-2.5 rounded-none transition-all cursor-pointer"
                  >
                    Volver al Inicio
                  </button>
                </div>
              </motion.div>
            )}

          </div>

          {/* Footer Controls for step 1 only */}
          {step === 1 && (
            <div className="p-6 border-t border-art-brown/10 bg-art-soft/30 flex items-center justify-between">
              <span className="text-xs text-art-brown/60 font-semibold font-sans">Sistema de cotización directa AGROCAFE</span>
              
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center space-x-1.5 bg-art-brown hover:bg-art-brown/90 text-white px-6 py-3 rounded-none font-sans font-bold uppercase text-xs tracking-widest transition-all cursor-pointer shadow-sm"
              >
                <span>Continuar</span>
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
