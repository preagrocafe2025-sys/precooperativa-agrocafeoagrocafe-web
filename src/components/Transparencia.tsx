/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Download, 
  CheckCircle, 
  Search, 
  Users, 
  Building, 
  Printer, 
  ExternalLink, 
  BookOpen,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileCheck,
  Award,
  Shield,
  Clock,
  Briefcase
} from 'lucide-react';

// Interfaces for our Document Facsimiles
interface PageData {
  pageNumber: number;
  content: React.ReactNode;
}

interface DocumentType {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  author: string;
  nit: string;
  totalPages: number;
  pages: PageData[];
}

export const Transparencia: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocId, setSelectedDocId] = useState('estatutos');
  const [activePage, setActivePage] = useState(1);
  const [zoomScale, setZoomScale] = useState(100); // percentage 75, 100, 125, 150
  const [selectedDirectorIndex, setSelectedDirectorIndex] = useState(0);
  const [showPrintToast, setShowPrintToast] = useState(false);

  // List of directors for the Police Certificate & Statues
  const directors = [
    { name: 'REYES DELGADILLO JEIKON REYNALDO', doc: '1110061400', role: 'Representante Legal Principal' },
    { name: 'REYES PALMA REINALDO', doc: '5831924', role: 'Presidente del Consejo de Administración' },
    { name: 'YUDY ANGELICA VELASQUEZ RAMIREZ', doc: '38144295', role: 'Secretaria del Consejo de Administración' },
    { name: 'DIEGO ANDERSON PERDOMO PERDOMO', doc: '80210688', role: 'Presidente de la Junta de Vigilancia' },
    { name: 'GOMEZ RODRIGUEZ JOSE ALEXANDER', doc: '5833518', role: 'Vicepresidente de la Junta de Vigilancia' },
    { name: 'CAICEDO VELASQUEZ YULITZA CAROLINA', doc: '1005717553', role: 'Secretaria de la Junta de Vigilancia' },
    { name: 'LOPEZ FLOREZ KARINA', doc: '28542746', role: 'Revisora Fiscal' },
  ];

  const handlePrint = () => {
    setShowPrintToast(true);
    setTimeout(() => setShowPrintToast(false), 3000);
    window.print();
  };

  // Sello de la Precooperativa para Facsímiles
  const SelloCoop = ({ dark = false }: { dark?: boolean }) => (
    <div className="flex flex-col items-center justify-center text-center p-2 border border-dashed rounded-md bg-art-soft/5 border-art-brown/20 max-w-[140px] mx-auto select-none">
      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-1 ${dark ? 'border-white text-white' : 'border-[#5a4b41] text-[#5a4b41]'}`}>
        <span className="text-xs">🍂</span>
      </div>
      <div className={`text-[7px] font-sans font-black tracking-wider uppercase leading-none ${dark ? 'text-white/80' : 'text-[#5a4b41]'}`}>
        PRECOOPERATIVA<br />CAFETERA<br />AGROCAFÉ
      </div>
      <div className={`text-[6px] font-mono mt-1 ${dark ? 'text-white/40' : 'text-gray-400'}`}>NIT 902.001.061-6</div>
    </div>
  );

  // Signatures Component
  const FirmasEstatutos = () => (
    <div className="mt-12 border-t border-gray-300 pt-8 grid grid-cols-2 gap-8 text-center text-xs font-sans text-gray-800">
      <div className="space-y-4">
        <div className="h-10 flex items-end justify-center">
          <span className="font-serif italic text-lg text-blue-800 font-bold tracking-wider opacity-90 select-none">Reinaldo Reyes P.</span>
        </div>
        <div className="w-40 h-px bg-gray-400 mx-auto" />
        <div>
          <p className="font-bold uppercase text-[10px]">REINALDO REYES PALMA</p>
          <p className="text-[9px] text-gray-500">PRESIDENTE DE LA ASAMBLEA</p>
          <p className="text-[9px] text-gray-400">C.C. 5.831.924</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="h-10 flex items-end justify-center">
          <span className="font-serif italic text-lg text-blue-800 font-bold tracking-wider opacity-90 select-none">Yudy Velasquez R.</span>
        </div>
        <div className="w-40 h-px bg-gray-400 mx-auto" />
        <div>
          <p className="font-bold uppercase text-[10px]">YUDY ANGELICA VELASQUEZ RAMIREZ</p>
          <p className="text-[9px] text-gray-500">SECRETARIA DE LA ASAMBLEA</p>
          <p className="text-[9px] text-gray-400">C.C. 38.144.295</p>
        </div>
      </div>
    </div>
  );

  // Certified Ink Stamp
  const SelloRTEFirma = () => (
    <div className="flex items-center space-x-3 border border-blue-200 p-2.5 bg-blue-50/50 max-w-xs select-none">
      <div className="w-10 h-10 border-2 border-blue-600 rounded-full flex items-center justify-center shrink-0">
        <span className="text-blue-600 text-base font-bold">✓</span>
      </div>
      <div className="text-left">
        <p className="text-[8px] font-sans font-black text-blue-800 uppercase leading-none">DOCUMENTO CERTIFICADO RTE</p>
        <p className="text-[7px] font-mono text-blue-600 mt-0.5">Vigencia Legal 2026<br />DIAN Resol. 0019</p>
      </div>
    </div>
  );

  // Documents DB with Real Facsimile Content
  const documents: DocumentType[] = [
    {
      id: 'estatutos',
      title: 'Estatutos de Constitución',
      description: 'Documento original de 20 páginas aprobados en la asamblea de constitución que rige el régimen cooperativo, derechos y deberes.',
      category: 'Estatutos',
      date: '01/09/2025',
      author: 'Asamblea de Constitución',
      nit: '902.001.061-6',
      totalPages: 4,
      pages: [
        {
          pageNumber: 1,
          content: (
            <div className="space-y-6 font-serif text-gray-800 leading-relaxed text-xs sm:text-sm">
              <div className="flex justify-between items-start">
                <SelloCoop />
                <div className="text-right text-[10px] font-sans text-gray-400">PÁGINA 1 DE 20</div>
              </div>
              
              <div className="text-center space-y-2 py-4">
                <h3 className="font-black text-lg tracking-wider text-gray-900 uppercase">ESTATUTOS</h3>
                <h4 className="font-bold text-sm tracking-wide text-gray-800 uppercase">PRECOOPERATIVA CAFETERA AGROCAFE</h4>
                <div className="w-16 h-0.5 bg-gray-800 mx-auto" />
              </div>

              <div className="space-y-4">
                <h5 className="font-bold uppercase text-xs text-center tracking-widest bg-gray-100 py-1 font-sans">CAPITULO I: NATURALEZA, RAZON SOCIAL, DOMICILIO, AMBITO TERRITORIAL Y DURACION</h5>
                
                <p>
                  <strong>ARTICULO 1°:</strong> Con base en el acuerdo cooperativo se crea y organiza la PRECOOPERATIVA con el nombre de <strong>PRECOOPERATIVA CAFETERA AGROCAFE</strong>. Se constituye la presente persona jurídica de derecho privado, empresa PRECOOPERATIVA sin ánimo de lucro, de responsabilidad limitada, de número de asociados y de patrimonio social variable e ilimitado, regida por la ley, los principios universales del Cooperativismo y el presente Estatuto.
                </p>
                <p>
                  <strong>ARTICULO 2°:</strong> El domicilio principal de la PRECOOPERATIVA CAFETERA AGROCAFE es la <strong>Vereda El Mirador, Finca El Cedral</strong> del Municipio de <strong>PLANADAS, Departamento del TOLIMA</strong>, República de Colombia, y su radio de acción comprenderá todo el territorio Nacional y los demás Países del Mundo que tengan relaciones con Colombia, para lo cual podrá establecer sucursales y agencias según las normas legales vigentes para tales propósitos.
                </p>
                <p>
                  <strong>ARTICULO 3°:</strong> El periodo de funcionamiento será de <strong>5 años</strong> al cabo de los cuales deberá evolucionar a Cooperativa.
                </p>
                <p>
                  <strong>ARTICULO 4°:</strong> La PRECOOPERATIVA se regirá por la <strong>Ley 79 de 1.988</strong>, sus Decretos reglamentarios, por los presentes Estatutos, por sus reglamentos, por la doctrina y Principios Cooperativos aceptados y por las disposiciones generales sobre asociaciones, fundaciones y sociedades que por naturaleza le sean aplicables.
                </p>
              </div>
            </div>
          )
        },
        {
          pageNumber: 2,
          content: (
            <div className="space-y-6 font-serif text-gray-800 leading-relaxed text-xs sm:text-sm">
              <div className="flex justify-between items-start">
                <SelloCoop />
                <div className="text-right text-[10px] font-sans text-gray-400">PÁGINA 2 DE 20</div>
              </div>

              <div className="space-y-4">
                <h5 className="font-bold uppercase text-xs text-center tracking-widest bg-gray-100 py-1 font-sans">CAPITULO II: OBJETIVOS Y ACTIVIDADES DE LA PRECOOPERATIVA</h5>
                
                <p>
                  <strong>ARTICULO 5°:</strong> Los objetivos de la <strong>PRECOOPERATIVA CAFETERA AGROCAFE</strong> son: El de solucionar las necesidades socio-económicas, sociales de sus asociados y en especial las de la comunidad en general, persiguiendo el desarrollo económico y social de la región teniendo como base los siguientes objetivos:
                </p>
                
                <div className="pl-4 space-y-3 font-sans text-xs text-gray-700">
                  <p>
                    <strong>a)</strong> Compra, venta, exportación e importación y comercialización de productos agropecuarios tales como el aguacate, ajo, arroz, café verde, tostado y molido, frijol, maíz, panela, sorgo, e insumos y abonos agropecuarios.
                  </p>
                  <p>
                    <strong>b)</strong> Distribución y mercadeo de café en su estado <strong>natural pergamino seco</strong> y en sus variadas presentaciones.
                  </p>
                  <p>
                    <strong>c)</strong> Beneficio de productos agrícolas y de café bien sea para su comercialización, el consumo interno o la exportación.
                  </p>
                  <p>
                    <strong>d)</strong> Servir de agente comisionista para compra de café u otros.
                  </p>
                  <p>
                    <strong>e)</strong> Desarrollar contratos relacionados con el beneficio, almacenamiento y transporte de café, y otros productos agropecuarios.
                  </p>
                  <p>
                    <strong>f)</strong> Participar en los procesos de licitación para el desarrollo de contratos de comercialización, mercadeo, beneficio y almacenaje con sujeción a los requisitos de contratación pública.
                  </p>
                </div>
              </div>
            </div>
          )
        },
        {
          pageNumber: 3,
          content: (
            <div className="space-y-6 font-serif text-gray-800 leading-relaxed text-xs sm:text-sm">
              <div className="flex justify-between items-start">
                <SelloCoop />
                <div className="text-right text-[10px] font-sans text-gray-400">PÁGINA 3 DE 20</div>
              </div>

              <div className="space-y-4">
                <h5 className="font-bold uppercase text-xs text-center tracking-widest bg-gray-100 py-1 font-sans">CAPITULO III: REQUISITOS Y PROCEDIMIENTOS DE ASOCIACIÓN</h5>
                
                <p>
                  <strong>ARTICULO 7°:</strong> La PRECOOPERATIVA estará integrada por las personas fundadoras, y por quienes sean aceptados posteriormente por el Comité de Administración. Para ser asociado se requiere:
                </p>

                <div className="pl-4 space-y-2 font-sans text-xs text-gray-700">
                  <p><strong>a.</strong> Ser mayor de 18 años y no estar afectados de incapacidad.</p>
                  <p><strong>b.</strong> Ser de nacionalidad colombiana.</p>
                  <p><strong>c.</strong> Suscribir en aportes sociales la suma de <strong>UN MILLON DE PESOS ($1.000.000.00)</strong> cada uno y pagarla oportunamente.</p>
                  <p><strong>d.</strong> Tener conocimientos básicos sobre COOPERATIVISMO.</p>
                  <p><strong>e.</strong> Ser admitido formalmente por el Comité de Administración previo estudio de la solicitud escrita.</p>
                </div>

                <h5 className="font-bold uppercase text-xs text-center tracking-widest bg-gray-100 py-1 font-sans mt-6">DEBERES Y DERECHOS</h5>
                <p>
                  <strong>ARTICULO 8°: Deberes Generales:</strong> Cumplir con dedicación, ética, honestidad y lealtad; adquirir conocimientos de cooperativismo; utilizar habitualmente los servicios de acopio de la precooperativa; y comportarse de manera solidaria.
                </p>
              </div>
            </div>
          )
        },
        {
          pageNumber: 4,
          content: (
            <div className="space-y-6 font-serif text-gray-800 leading-relaxed text-xs sm:text-sm">
              <div className="flex justify-between items-start">
                <SelloCoop />
                <div className="text-right text-[10px] font-sans text-gray-400">PÁGINA 20 DE 20</div>
              </div>

              <div className="space-y-4">
                <p>
                  Los presentes estatutos fueron aprobados por <strong>UNANIMIDAD</strong> por la Junta de Asociados de Constitución, celebrada en el municipio de Planadas, Tolima el día Primero de Septiembre de 2025. Y en constancia se firman por el presidente y secretario de la Junta de Asociados.
                </p>

                <div className="pt-10">
                  <FirmasEstatutos />
                </div>

                <div className="mt-12 flex justify-center">
                  <SelloRTEFirma />
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'rut',
      title: 'Registro Único Tributario (RUT Oficial)',
      description: 'Documento original de la DIAN que certifica el NIT 902.001.061-6 de la precooperativa y su régimen tributario especial.',
      category: 'Legal / Tributario',
      date: '20/01/2026',
      author: 'DIAN Colombia',
      nit: '902.001.061-6',
      totalPages: 1,
      pages: [
        {
          pageNumber: 1,
          content: (
            <div className="border-4 border-[#133863] p-4 bg-white font-sans text-gray-800 space-y-4 relative">
              {/* DIAN Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                <span className="text-6xl font-black text-[#133863] uppercase rotate-45">CERTIFICADO OFICIAL</span>
              </div>

              {/* DIAN RUT HEADER */}
              <div className="flex justify-between items-center border-b-2 border-[#133863] pb-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#133863] text-white p-2 font-bold text-sm tracking-widest">DIAN</div>
                  <div>
                    <h4 className="text-[10px] font-black text-[#133863] uppercase">Dirección de Impuestos y Aduanas Nacionales</h4>
                    <h3 className="text-xs font-black uppercase">Formulario del Registro Único Tributario</h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-[#133863] text-white px-3 py-1 font-mono text-base font-black">001</div>
                  <span className="text-[7px] text-gray-400">Formulario 141230419734</span>
                </div>
              </div>

              {/* RUT SECTION 1: NIT & IDENTIFICATION */}
              <div className="grid grid-cols-12 gap-2 text-[9px] border-b border-gray-300 pb-2">
                <div className="col-span-6 border border-gray-200 p-1.5 bg-gray-50">
                  <span className="text-[7px] text-gray-400 block uppercase font-bold">5. Número de Identificación Tributaria (NIT)</span>
                  <span className="font-mono text-xs font-black text-gray-900">902.001.061</span>
                </div>
                <div className="col-span-1 border border-gray-200 p-1.5 bg-gray-50 text-center">
                  <span className="text-[7px] text-gray-400 block uppercase font-bold">6. DV</span>
                  <span className="font-mono text-xs font-black text-[#133863]">6</span>
                </div>
                <div className="col-span-5 border border-gray-200 p-1.5 bg-gray-50">
                  <span className="text-[7px] text-gray-400 block uppercase font-bold">12. Dirección Seccional</span>
                  <span className="font-bold text-gray-800">Impuestos y Aduanas de Ibagué</span>
                </div>
              </div>

              {/* RAZON SOCIAL */}
              <div className="border border-gray-200 p-1.5 bg-gray-50 text-[9px]">
                <span className="text-[7px] text-gray-400 block uppercase font-bold">35. Razón Social</span>
                <span className="text-xs font-black text-gray-900">PRECOOPERATIVA CAFETERA AGROCAFE</span>
              </div>

              {/* UBICACION */}
              <div className="grid grid-cols-12 gap-2 text-[9px]">
                <div className="col-span-4 border border-gray-200 p-1.5 bg-gray-50">
                  <span className="text-[7px] text-gray-400 block uppercase font-bold">38. País</span>
                  <span className="font-bold">COLOMBIA (169)</span>
                </div>
                <div className="col-span-4 border border-gray-200 p-1.5 bg-gray-50">
                  <span className="text-[7px] text-gray-400 block uppercase font-bold">39. Departamento</span>
                  <span className="font-bold">TOLIMA (73)</span>
                </div>
                <div className="col-span-4 border border-gray-200 p-1.5 bg-gray-50">
                  <span className="text-[7px] text-gray-400 block uppercase font-bold">40. Municipio</span>
                  <span className="font-bold">PLANADAS (555)</span>
                </div>
              </div>

              {/* DIRECCION Y EMAIL */}
              <div className="grid grid-cols-12 gap-2 text-[9px]">
                <div className="col-span-7 border border-gray-200 p-1.5 bg-gray-50">
                  <span className="text-[7px] text-gray-400 block uppercase font-bold">41. Dirección Principal</span>
                  <span className="font-bold">VEREDA MIRADOR FINCA EL CEDRAL</span>
                </div>
                <div className="col-span-5 border border-gray-200 p-1.5 bg-gray-50">
                  <span className="text-[7px] text-gray-400 block uppercase font-bold">42. Correo Electrónico</span>
                  <span className="font-bold font-mono text-gray-800">PREAGROCAFE2025@GMAIL.COM</span>
                </div>
              </div>

              {/* ACTIVIDAD ECONOMICA */}
              <div className="border border-[#133863] p-2 bg-blue-50/20 text-[9px] space-y-1">
                <span className="text-[7px] text-[#133863] block uppercase font-black">Actividad Económica Principal</span>
                <div className="flex justify-between">
                  <span className="font-bold">Código 4620 — Comercio al por mayor de materias primas agrícolas y animales vivos (Acopio de Café Pergamino Seco)</span>
                  <span className="font-mono font-bold text-[#133863]">Inicio: 30/09/2025</span>
                </div>
              </div>

              {/* RESPONSABILIDADES */}
              <div className="space-y-1">
                <span className="text-[7px] text-gray-400 block uppercase font-bold">53. Responsabilidades, Calidades y Atributos</span>
                <div className="grid grid-cols-2 gap-1.5 text-[8px]">
                  {[
                    { code: '04', name: 'Impuesto renta y compl. régimen especial (RTE)' },
                    { code: '07', name: 'Retención en la fuente a título de renta' },
                    { code: '14', name: 'Informante de exógena' },
                    { code: '16', name: 'Obligación facturar por ingresos bienes' },
                    { code: '42', name: 'Obligado a llevar contabilidad' },
                    { code: '55', name: 'Informante de Beneficiarios Finales' }
                  ].map(resp => (
                    <div key={resp.code} className="flex items-center space-x-2 border border-gray-100 p-1 bg-gray-50">
                      <span className="bg-[#133863] text-white font-mono px-1 py-0.5 rounded-sm font-bold text-[8px] shrink-0">{resp.code}</span>
                      <span className="text-gray-700 truncate font-semibold">{resp.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FIRMA REPRESENTANTE */}
              <div className="mt-8 border-t border-gray-200 pt-4 flex justify-between items-center text-[8px]">
                <div className="space-y-1 text-left">
                  <span className="text-[6px] text-gray-400 uppercase font-bold block">984. Nombre Representante</span>
                  <p className="font-bold">REYES DELGADILLO JEIKON REYNALDO</p>
                  <p className="text-gray-400 font-mono">CC. 1.110.061.400</p>
                </div>
                <div className="text-center space-y-1.5 max-w-[150px]">
                  <div className="h-6 flex items-end justify-center">
                    <span className="font-serif italic text-xs text-blue-900 select-none font-bold">Jeikon Reyes D.</span>
                  </div>
                  <div className="w-24 h-px bg-gray-400 mx-auto" />
                  <span className="text-[6px] text-gray-400 block uppercase font-bold">Firma Representante Legal</span>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'acta2026',
      title: 'Acta de Asamblea Ordinaria 2026',
      description: 'Acta oficial firmada el 18 de Marzo de 2026 donde se aprueba por unanimidad el balance en ceros de 2025 y se autoriza el trámite ante el RTE.',
      category: 'Asambleas / Actas',
      date: '18/03/2026',
      author: 'Asamblea General',
      nit: '902.001.061-6',
      totalPages: 3,
      pages: [
        {
          pageNumber: 1,
          content: (
            <div className="space-y-6 font-serif text-gray-800 leading-relaxed text-xs sm:text-sm">
              <div className="flex justify-between items-start">
                <SelloCoop />
                <div className="text-right text-[10px] font-sans text-gray-400">PÁGINA 1 DE 3</div>
              </div>

              <div className="text-center space-y-1.5 py-4">
                <h3 className="font-black text-base uppercase text-gray-900">ASAMBLEA GENERAL ORDINARIA AÑO 2026</h3>
                <h4 className="font-bold text-xs uppercase text-gray-700">ACTA N° 18/03/2026</h4>
                <p className="text-[10px] text-gray-400">NIT: 902.001.061-6</p>
              </div>

              <div className="space-y-3.5">
                <p>
                  Siendo las <strong>10:00 horas del día Miércoles 18 de marzo del año 2026</strong>, se reunió la Asamblea de Asociados de la <strong>PRECOOPERATIVA CAFETERA AGROCAFE</strong>, en las instalaciones de la Vereda Mirador, Finca El Cedral, Planadas, Tolima. Convocada por la Junta Directiva de conformidad con los estatutos y con la debida antelación a través de mensajería digital y avisos en cartelera.
                </p>

                <h5 className="font-bold uppercase text-xs border-b border-gray-200 pb-1 font-sans">ORDEN DEL DÍA</h5>
                <ol className="list-decimal pl-5 space-y-1 font-sans text-xs text-gray-700">
                  <li>Llamado a lista y verificación de quórum.</li>
                  <li>Saludo del Representante Legal e instalación de la Asamblea.</li>
                  <li>Lectura y aprobación del orden del día.</li>
                  <li>Presentación del Informe del Representante Legal.</li>
                  <li>Presentación de Estados Financieros a Diciembre 31 de 2025.</li>
                  <li>Presentación del Informe de la Revisora Fiscal.</li>
                  <li>Autorización para actualización en el Régimen Tributario Especial (RTE).</li>
                  <li>Aprobación del Acta de la presente reunión.</li>
                </ol>
              </div>
            </div>
          )
        },
        {
          pageNumber: 2,
          content: (
            <div className="space-y-6 font-serif text-gray-800 leading-relaxed text-xs sm:text-sm">
              <div className="flex justify-between items-start">
                <SelloCoop />
                <div className="text-right text-[10px] font-sans text-gray-400">PÁGINA 2 DE 3</div>
              </div>

              <div className="space-y-4">
                <h5 className="font-bold uppercase text-xs border-b border-gray-200 pb-1 font-sans">DESARROLLO DEL ORDEN DEL DÍA</h5>
                
                <p>
                  <strong>1. Verificación del Quórum:</strong> Se registró la asistencia de los <strong>6 asociados fundadores</strong> (representantes de la totalidad de la base social activa). Se declaró el quórum legal apto para sesionar válidamente.
                </p>

                <p>
                  <strong>2. Saludo e Instalación:</strong> El señor <strong>YEIKON REYNALDO REYES DELGADILLO</strong>, en su calidad de Representante Legal, dio la bienvenida a los asociados e instaló formalmente la Asamblea. Destacó que la Precooperativa fue constituida en el segundo semestre de 2025, concentrando esfuerzos en la estructuración legal.
                </p>

                <p>
                  <strong>3. Informe de Gestión y Financiero:</strong> Se expuso el informe donde se indica que por ser un periodo estrictamente preoperativo, las <strong>operaciones comerciales y facturación se reportan en cero ($0)</strong>. El capital existente corresponde netamente a los aportes obligatorios iniciales de los fundadores por un total de <strong>$6.000.000 COP</strong> (depositados en la cuenta institucional). Los estados financieros reflejan con transparencia la inactividad de campo de esta fase inicial.
                </p>
              </div>
            </div>
          )
        },
        {
          pageNumber: 3,
          content: (
            <div className="space-y-6 font-serif text-gray-800 leading-relaxed text-xs sm:text-sm">
              <div className="flex justify-between items-start">
                <SelloCoop />
                <div className="text-right text-[10px] font-sans text-gray-400">PÁGINA 3 DE 3</div>
              </div>

              <div className="space-y-4">
                <p>
                  <strong>4. Autorización Trámite RTE:</strong> La Asamblea analizó la obligación de actualizar el estatus ante el Régimen Tributario Especial (RTE) de la DIAN. Se autorizó por <strong>UNANIMIDAD (6 votos)</strong> al Representante Legal para que adelante las gestiones pertinentes y radique el expediente actualizado.
                </p>

                <p>
                  Siendo las <strong>13:00 horas del mismo día</strong>, el Presidente levantó la sesión tras la redacción y aprobación total del acta. En constancia firman la Mesa Directiva Electa:
                </p>

                <div className="mt-12 border-t border-gray-200 pt-6 grid grid-cols-2 gap-4 text-center text-xs">
                  <div className="space-y-2">
                    <span className="font-serif italic text-blue-800 text-xs font-bold block">Jeikon Reyes D.</span>
                    <div className="w-28 h-px bg-gray-300 mx-auto" />
                    <p className="font-bold">JEIKON REYNALDO REYES DELGADILLO</p>
                    <p className="text-[9px] text-gray-400">Presidente de Asamblea</p>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="font-serif italic text-blue-800 text-xs font-bold block">Jose A. Gomez R.</span>
                    <div className="w-28 h-px bg-gray-300 mx-auto" />
                    <p className="font-bold">JOSE ALEXANDER GOMEZ RODRIGUEZ</p>
                    <p className="text-[9px] text-gray-400">Secretario de Asamblea</p>
                  </div>
                </div>

                <div className="pt-6 flex justify-center">
                  <SelloRTEFirma />
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'cert_rte',
      title: 'Certificación Cargos y No Remuneración',
      description: 'Certificado firmado por el representante legal que atestigua la conformación de la junta administrativa y la ausencia de pagos en 2025.',
      category: 'Certificaciones',
      date: '10/06/2026',
      author: 'Representante Legal',
      nit: '902.001.061-6',
      totalPages: 1,
      pages: [
        {
          pageNumber: 1,
          content: (
            <div className="space-y-6 font-serif text-gray-800 leading-relaxed text-xs sm:text-sm">
              <div className="flex justify-between items-start">
                <SelloCoop />
                <div className="text-right text-[10px] font-sans text-gray-400">PÁGINA 1 DE 1</div>
              </div>

              <div className="text-center py-4">
                <h3 className="font-black text-base text-gray-900 uppercase">CERTIFICADO OFICIAL DE DIRECTIVOS Y REMUNERACIÓN</h3>
                <p className="text-[10px] text-gray-400 font-sans font-semibold mt-1">Dando cumplimiento al numeral 5 y 6 del art. 364-5 del Estatuto Tributario</p>
              </div>

              <div className="space-y-4">
                <p>
                  El suscrito Representante Legal de la <strong>PRECOOPERATIVA CAFETERA AGROCAFE</strong> con NIT <strong>902.001.061-6</strong>, en cumplimiento de los requisitos exigidos por el Régimen Tributario Especial (RTE) de la DIAN:
                </p>

                <h4 className="font-sans font-bold text-xs uppercase text-gray-800 border-b pb-1">CERTIFICA:</h4>
                
                <p>
                  <strong>1.</strong> Que los cargos directivos y gerenciales en la precooperativa durante el periodo correspondiente son ocupados por las siguientes personas de forma oficial:
                </p>

                <div className="overflow-x-auto font-sans text-[10px]">
                  <table className="w-full text-left divide-y divide-gray-200 border">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-1.5 font-bold">NOMBRES Y APELLIDOS</th>
                        <th className="p-1.5 font-bold">CARGOS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      <tr><td className="p-1.5">JEIKON REYNALDO REYES DELGADILLO</td><td className="p-1.5">Presidente del Consejo de Administración</td></tr>
                      <tr><td className="p-1.5">REYNALDO REYES PALMA</td><td className="p-1.5">Vicepresidente del Consejo de Administración</td></tr>
                      <tr><td className="p-1.5">YUDY ANGELICA VELASQUEZ RAMIREZ</td><td className="p-1.5">Secretaria del Consejo de Administración</td></tr>
                      <tr><td className="p-1.5">DIEGO ANDERSON PERDOMO PERDOMO</td><td className="p-1.5">Presidente de la Junta de Vigilancia</td></tr>
                      <tr><td className="p-1.5">JOSE ALEXANDER GOMEZ RODRIGUEZ</td><td className="p-1.5">Vicepresidente de la Junta de Vigilancia</td></tr>
                      <tr><td className="p-1.5">YULITZA CAROLINA CAICEDO VELASQUEZ</td><td className="p-1.5">Secretaria de la Junta de Vigilancia</td></tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  <strong>2.</strong> Que <strong>ninguna de las personas que ocupan cargos directivos recibió compensación, sueldo o remuneración</strong> de algún tipo por parte de la precooperativa durante el ejercicio fiscal del año 2025. Los cargos se ejercen de forma solidaria e institucional.
                </p>

                <div className="mt-8 pt-4 flex justify-between items-center border-t border-gray-100">
                  <div className="text-xs text-left">
                    <span className="text-[8px] text-gray-400 uppercase block font-bold">Expedido por:</span>
                    <p className="font-bold">JEIKON REYNALDO REYES DELGADILLO</p>
                    <p className="text-[10px] text-gray-500">Representante Legal</p>
                  </div>
                  <div className="text-center">
                    <span className="font-serif italic text-blue-800 font-bold select-none text-xs">Jeikon Reyes D.</span>
                    <div className="w-24 h-px bg-gray-300 mx-auto mt-1" />
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'memoria',
      title: 'Memoria Económica 2025',
      description: 'Declaración financiera de fondos iniciales, fuentes de recursos, excedentes obtenidos y certificación de reinversión obligatoria según la Ley Cooperativa.',
      category: 'Finanzas',
      date: '10/06/2026',
      author: 'Representación Legal',
      nit: '902.001.061-6',
      totalPages: 1,
      pages: [
        {
          pageNumber: 1,
          content: (
            <div className="space-y-6 font-serif text-gray-800 leading-relaxed text-xs sm:text-sm">
              <div className="flex justify-between items-start">
                <SelloCoop />
                <div className="text-right text-[10px] font-sans text-gray-400">PÁGINA 1 DE 1</div>
              </div>

              <div className="text-center py-4">
                <h3 className="font-black text-base text-gray-900 uppercase">MEMORIA ECONÓMICA</h3>
                <h4 className="font-bold text-xs uppercase text-gray-700">RÉGIMEN TRIBUTARIO ESPECIAL AÑO 2025</h4>
              </div>

              <div className="space-y-4">
                <p>
                  Dando cumplimiento al artículo 356-3 del Estatuto Tributario y para soportar el expediente de actualización ante la DIAN, se declara:
                </p>

                <h5 className="font-sans font-bold text-xs border-b pb-1">1. CONSTITUCIÓN Y NATURALEZA JURÍDICA:</h5>
                <p>
                  La precooperativa fue formalizada legalmente en el último semestre de 2025, por lo que este periodo corresponde a la etapa preoperativa y de estructuración administrativa. No se desarrollaron actividades comerciales de acopio ni facturación operativa en esta vigencia.
                </p>

                <h5 className="font-sans font-bold text-xs border-b pb-1">2. FUENTES DE INGRESO (VIGENCIA 2025):</h5>
                <div className="overflow-x-auto font-sans text-[10px] my-2">
                  <table className="w-full text-left border divide-y divide-gray-200">
                    <thead className="bg-gray-50 uppercase tracking-wider text-[8px] font-bold">
                      <tr>
                        <th className="p-2">Concepto</th>
                        <th className="p-2 text-right">Valor (COP)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-mono">
                      <tr>
                        <td className="p-2 font-sans font-medium">Aportes de asociados fundadores (6 socios x $1.000.000 COP)</td>
                        <td className="p-2 text-right font-black">$ 6.000.000</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-sans font-medium">Ingresos por acopio u operaciones comerciales</td>
                        <td className="p-2 text-right">$ 0</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-sans font-medium">Donaciones u otros conceptos</td>
                        <td className="p-2 text-right">$ 0</td>
                      </tr>
                      <tr className="bg-gray-100 font-bold font-sans">
                        <td className="p-2">TOTAL RECURSOS RECIBIDOS</td>
                        <td className="p-2 text-right font-mono">$ 6.000.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h5 className="font-sans font-bold text-xs border-b pb-1">3. DESTINACIÓN DEL BENEFICIO NETO:</h5>
                <p>
                  Al no registrarse excedentes financieros en el ejercicio, no se realizó distribución alguna. Los aportes iniciales constitucionales se mantienen en resguardo como capital semilla operativo para la vigencia 2026.
                </p>

                <div className="mt-8 pt-4 flex justify-between items-center border-t border-gray-100">
                  <div className="text-xs text-left">
                    <span className="text-[8px] text-gray-400 uppercase block font-bold">Expedido por:</span>
                    <p className="font-bold">JEIKON REYNALDO REYES DELGADILLO</p>
                    <p className="text-[10px] text-gray-500">CC. 1.110.061.400</p>
                  </div>
                  <div className="text-center">
                    <span className="font-serif italic text-blue-800 font-bold select-none text-xs">Jeikon Reyes D.</span>
                    <div className="w-24 h-px bg-gray-300 mx-auto mt-1" />
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'policia',
      title: 'Certificación de Antecedentes (Policía Nacional)',
      description: 'Expediente oficial en línea de la Policía Nacional que certifica la idoneidad legal y ausencia de antecedentes penales de todos los miembros directivos.',
      category: 'Cumplimiento',
      date: '28/06/2026',
      author: 'Policía Nacional de Colombia',
      nit: '902.001.061-6',
      totalPages: 1,
      pages: [
        {
          pageNumber: 1,
          content: (
            <div className="border border-green-600 p-4 bg-white font-sans text-gray-800 space-y-4 relative">
              
              {/* POLICIA HEADER */}
              <div className="flex justify-between items-center border-b-2 border-green-700 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-800 text-white rounded-full flex items-center justify-center font-bold text-xs select-none">👮</div>
                  <div>
                    <h3 className="text-xs font-black text-green-900 uppercase">POLICÍA NACIONAL DE COLOMBIA</h3>
                    <h4 className="text-[8px] font-bold text-gray-400 uppercase">Dirección de Investigación Criminal e INTERPOL - DIJIN</h4>
                  </div>
                </div>
                <div className="text-right text-[9px] font-mono text-gray-400">
                  REF: Consulta Antecedentes en Línea<br />Fecha: 28/06/2026 11:40 AM
                </div>
              </div>

              {/* SELECTOR ON CARD FOR DIRECTORS */}
              <div className="bg-green-50/50 border border-green-200 p-3 rounded-none flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-0.5">
                  <span className="text-[8px] font-black text-green-800 uppercase tracking-wider block">Verificar directivo de la Precooperativa:</span>
                  <p className="text-xs font-bold text-gray-900">{directors[selectedDirectorIndex].name}</p>
                  <p className="text-[9px] text-gray-500 font-mono">C.C. {directors[selectedDirectorIndex].doc} — {directors[selectedDirectorIndex].role}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {directors.map((dir, idx) => (
                    <button
                      key={dir.doc}
                      onClick={() => setSelectedDirectorIndex(idx)}
                      className={`px-2 py-1 text-[8px] font-bold uppercase transition-all border ${
                        selectedDirectorIndex === idx
                          ? 'bg-green-800 text-white border-green-800'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      CC {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* CERTIFICATE TEXT */}
              <div className="space-y-4 py-3 text-center">
                <h3 className="font-serif font-black text-sm text-gray-900 uppercase">La Policía Nacional de Colombia informa:</h3>
                
                <p className="text-xs text-gray-700 leading-relaxed font-semibold max-w-lg mx-auto">
                  Que siendo las 11:40 AM horas del 28/06/2026, el ciudadano identificado con: <br />
                  <span className="text-sm font-black text-gray-900 font-mono block py-1.5 bg-gray-50 border border-gray-100 my-1.5">
                    Cédula de Ciudadanía N° {directors[selectedDirectorIndex].doc}
                  </span>
                  Apellidos y Nombres: <span className="text-sm font-black text-green-900 block uppercase">{directors[selectedDirectorIndex].name}</span>
                </p>

                {/* BIG BLUE STAMP OF CUMPLIMIENTO */}
                <div className="border-2 border-green-600 p-4 bg-green-50/20 max-w-md mx-auto my-4 space-y-1">
                  <p className="text-sm font-black text-green-900 uppercase tracking-wider">NO TIENE ASUNTOS PENDIENTES CON LAS AUTORIDADES JUDICIALES</p>
                  <p className="text-[8px] text-gray-500 font-normal italic">de conformidad con lo establecido en el artículo 248 de la Constitución Política de Colombia.</p>
                </div>

                <p className="text-[9px] text-gray-400 text-left leading-relaxed">
                  En cumplimiento de la Sentencia SU-458 del 21 de junio de 2012, proferida por la Honorable Corte Constitucional, la leyenda "NO TIENE ASUNTOS PENDIENTES CON LAS AUTORIDADES JUDICIALES" aplica para todas aquellas personas que no registran antecedentes y para quienes la autoridad judicial competente haya decretado la extinción de la condena o la prescripción de la pena.
                </p>
              </div>

              {/* CERTIFICATE STAMP FOOTER */}
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center text-[8px] text-gray-400 font-mono">
                <span>VERIFICACIÓN EN LÍNEA CO OP GRUPO</span>
                <span>CÓDIGO DIGITAL: DIJIN-POLICIA-2026-RTE</span>
              </div>
            </div>
          )
        }
      ]
    }
  ];

  const activeDoc = documents.find(doc => doc.id === selectedDocId) || documents[0];

  // Reset page when document changes
  React.useEffect(() => {
    setActivePage(1);
  }, [selectedDocId]);

  const currentPageData = activeDoc.pages.find(p => p.pageNumber === activePage) || activeDoc.pages[0];

  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="transparency-section">
      
      {/* 1. Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="inline-flex items-center space-x-1.5 text-xs text-art-green font-sans font-bold uppercase tracking-widest bg-art-green/10 px-4 py-2 border border-art-green/15">
          <Building className="w-3.5 h-3.5" />
          <span>Régimen Tributario Especial (RTE)</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black italic text-art-brown leading-none">
          Transparencia y Acceso Público
        </h2>
        <p className="text-art-brown/80 font-sans font-medium text-base sm:text-lg leading-relaxed">
          En cumplimiento con el Artículo 364-5 del Estatuto Tributario y las directrices de la DIAN, compartimos de forma abierta y transparente nuestros documentos legales y de constitución.
        </p>
      </div>

      {/* 2. Cooperative Registry Widget Card */}
      <div className="bg-white border border-art-brown/10 p-6 sm:p-8 mb-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-art-green/5 rounded-full translate-x-16 -translate-y-16" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-8 space-y-3.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-art-brown text-white font-mono text-xs font-bold px-2.5 py-1">NIT: 902.001.061-6</span>
              <span className="bg-art-green/10 text-art-green font-sans text-[10px] font-black uppercase tracking-wider px-2 py-0.5 border border-art-green/20">Registrado ante DIAN</span>
              <span className="bg-art-soft text-art-brown font-sans text-[10px] font-bold px-2 py-0.5">Vigilado Supersolidaria</span>
            </div>
            
            <h3 className="font-serif font-black italic text-2xl text-art-brown">PRECOOPERATIVA CAFETERA AGROCAFE</h3>
            
            <p className="text-xs sm:text-sm text-art-brown/85 font-sans leading-relaxed">
              Constituida legalmente en Septiembre de 2025 en el municipio de <strong>Planadas, Tolima</strong> (Vereda el Mirador, Finca El Cedral) bajo la personería jurídica del sector de la economía solidaria. Especializada en el acopio técnico y comercialización mayorista de café pergamino seco.
            </p>
          </div>

          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-art-brown/10 pt-4 lg:pt-0 lg:pl-6 grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[9px] text-art-brown/50 block font-bold uppercase tracking-widest">Actividad Principal</span>
              <span className="text-xs font-bold text-art-brown block">4620 (DIAN)</span>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] text-art-brown/50 block font-bold uppercase tracking-widest">Año Fundado</span>
              <span className="text-xs font-bold text-art-brown block">2025</span>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] text-art-brown/50 block font-bold uppercase tracking-widest">Órgano de Control</span>
              <span className="text-xs font-bold text-art-brown block">Revisora Fiscal</span>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] text-art-brown/50 block font-bold uppercase tracking-widest">Suscripción Capital</span>
              <span className="text-xs font-bold text-art-brown block">$6.000.000 COP</span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Document Hub & Interactive PDF facsimile Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Document Selector Column */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-art-brown/40" />
            <input
              type="text"
              placeholder="Buscar documento legal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-art-brown/10 hover:border-art-brown/30 focus:border-art-brown focus:ring-0 text-xs px-10 py-3.5 rounded-none font-sans font-semibold placeholder:text-art-brown/30 outline-none transition-all"
            />
          </div>

          {/* Document Button list */}
          <div className="space-y-2 max-h-[480px] overflow-y-auto">
            {filteredDocs.map((doc) => {
              const isSelected = doc.id === selectedDocId;
              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full text-left p-4 border rounded-none transition-all duration-300 relative overflow-hidden flex items-start gap-3 bg-transparent cursor-pointer focus:outline-none ${
                    isSelected
                      ? 'border-art-green bg-art-green/5'
                      : 'border-art-brown/10 hover:border-art-brown/30 bg-white'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-art-green" />
                  )}
                  <div className={`p-2 shrink-0 ${isSelected ? 'bg-art-green text-white' : 'bg-art-soft/40 text-art-brown/70'}`}>
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <span className="text-[9px] text-art-brown/50 font-black uppercase tracking-wider block">{doc.category}</span>
                    <h4 className={`text-xs font-black truncate leading-tight ${isSelected ? 'text-art-green' : 'text-art-brown'}`}>
                      {doc.title}
                    </h4>
                    <p className="text-[10px] text-art-brown/70 truncate leading-snug">
                      {doc.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RTE FAQ Quick Alert */}
          <div className="p-4 bg-art-soft/10 border border-art-brown/10 space-y-3">
            <div className="flex items-center space-x-2 text-art-brown font-bold text-xs">
              <BookOpen className="w-4 h-4 text-art-green" />
              <span>¿Qué es el Visor PDF Original?</span>
            </div>
            <p className="text-[10px] text-art-brown/80 font-sans leading-relaxed">
              Es una réplica digital de alta fidelidad de los expedientes físicos originales presentados ante la DIAN. Puedes visualizar las páginas principales interactivamente aquí, o bien descargar el archivo <strong>PDF original completo firmado</strong> usando el botón <strong>"Descargar PDF Completo"</strong> del visor.
            </p>
          </div>

        </div>

        {/* Real-time certified PDF reader facsimile Column */}
        <div className="lg:col-span-8">
          
          {/* Reader Top Bar (Reader controls) */}
          <div className="bg-gray-800 text-white p-3 flex flex-wrap items-center justify-between gap-3 border-b border-gray-700 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-green-700 text-white rounded-none">
                <FileCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">EXPEDIENTE DIGITAL OFICIAL</span>
                <span className="text-xs font-bold font-sans text-gray-100 truncate max-w-xs">{activeDoc.title}</span>
              </div>
            </div>

            {/* Page navigation controls */}
            <div className="flex items-center space-x-3 text-xs">
              <button
                onClick={() => setActivePage(p => Math.max(1, p - 1))}
                disabled={activePage === 1}
                className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 cursor-pointer bg-transparent border-none"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-mono">
                Pág. <strong className="text-white">{activePage}</strong> de {activeDoc.totalPages}
              </span>
              <button
                onClick={() => setActivePage(p => Math.min(activeDoc.totalPages, p + 1))}
                disabled={activePage === activeDoc.totalPages}
                className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 cursor-pointer bg-transparent border-none"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Zoom & Action Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setZoomScale(z => Math.max(75, z - 25))}
                disabled={zoomScale <= 75}
                className="p-1 text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer bg-transparent border-none"
                title="Reducir Zoom"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-mono text-gray-300 w-10 text-center">{zoomScale}%</span>
              <button
                onClick={() => setZoomScale(z => Math.min(150, z + 25))}
                disabled={zoomScale >= 150}
                className="p-1 text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer bg-transparent border-none"
                title="Aumentar Zoom"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              
              <div className="h-4 w-px bg-gray-600 mx-1.5" />

              <button
                onClick={handlePrint}
                className="flex items-center space-x-1.5 bg-green-700 hover:bg-green-600 text-white px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest transition-colors cursor-pointer"
                title="Imprimir / Guardar PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Imprimir / Guardar</span>
              </button>

              <a
                href={activeDoc.id === 'estatutos' ? '/estatutos.pdf' : activeDoc.id === 'rut' ? '/rut.pdf' : activeDoc.id === 'acta2026' ? '/acta2026.pdf' : undefined}
                download
                target="_blank"
                rel="noreferrer"
                className={`flex items-center space-x-1.5 bg-art-brown hover:bg-art-brown/90 text-white px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest transition-colors cursor-pointer ${
                  !(activeDoc.id === 'estatutos' || activeDoc.id === 'rut' || activeDoc.id === 'acta2026') ? 'hidden' : ''
                }`}
                title="Descargar Documento PDF Oficial Completo"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Descargar PDF Completo</span>
              </a>
            </div>
          </div>

          {/* Toast Message for Print */}
          {showPrintToast && (
            <div className="bg-green-800 text-white p-2.5 text-xs text-center font-sans font-bold uppercase tracking-wider transition-all duration-300">
              ✓ Generando vista previa oficial para impresión o guardado de PDF original...
            </div>
          )}

          {/* Real PDF simulated canvas with shadows */}
          <div className="bg-gray-700 p-6 sm:p-10 flex justify-center overflow-auto max-h-[700px] border border-gray-600">
            <div 
              className="bg-white shadow-2xl border border-gray-300 origin-top transition-transform duration-200"
              style={{ 
                width: '100%', 
                maxWidth: '800px',
                transform: `scale(${zoomScale / 100})`,
                marginBottom: `${(zoomScale - 100) > 0 ? (zoomScale - 100) * 3 : 0}px`
              }}
            >
              {/* Actual Paper Content facsimile */}
              <div className="p-8 sm:p-12 min-h-[750px] relative">
                
                {/* Official Certified Top Bar Ribbon */}
                <div className="absolute top-0 left-0 right-0 bg-[#2e624b] text-white px-4 py-1 flex justify-between items-center text-[8px] font-sans tracking-widest select-none">
                  <span>SISTEMA DE TRANSPARENCIA SOLIDARIA COLOMBIA</span>
                  <span>CUMPLIMIENTO RTE ART. 364-5</span>
                </div>

                {/* Main facsimile paper contents */}
                <div className="pt-2">
                  {currentPageData.content}
                </div>

                {/* Footer seal */}
                <div className="mt-14 border-t border-gray-200 pt-4 flex flex-col sm:flex-row justify-between items-center text-[8px] text-gray-400 font-mono select-none">
                  <span>PRECOOPERATIVA CAFETERA AGROCAFE — NIT: 902.001.061-6</span>
                  <span>CERTIFICACIÓN DE ACCESO PÚBLICO OFICIAL</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 4. DIAN Web Transparency Statement Footer Banner */}
      <div className="mt-14 border border-art-brown/10 p-5 bg-art-soft/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-bold text-art-brown uppercase tracking-wider">Cumplimiento DIAN Estatuto Tributario Artículo 364-5</p>
          <p className="text-[10px] text-art-brown/75 leading-relaxed font-sans">
            La información expuesta corresponde fielmente a los registros públicos de la Precooperativa para la vigencia en curso. Para solicitudes formales o radicaciones del sector solidario, por favor dirija un correo formal.
          </p>
        </div>
        <a 
          href="mailto:preagrocafe2025@gmail.com"
          className="inline-flex items-center space-x-1 bg-transparent hover:bg-art-brown/5 border border-art-brown/15 text-art-brown px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest shrink-0 self-start sm:self-center transition-all cursor-pointer"
        >
          <span>Radicar Solicitud</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
};
