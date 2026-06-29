/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Download, 
  Search, 
  Building, 
  Printer, 
  ExternalLink, 
  BookOpen,
  FileCheck,
  Shield,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface DocumentType {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  author: string;
  nit: string;
  pdfPath: string;
}

export const Transparencia: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // List of real documents uploaded to /public
  const documents: DocumentType[] = [
    {
      id: 'estatutos',
      title: 'Estatutos de Constitución',
      description: 'Documento original que rige el régimen cooperativo, derechos, deberes de los asociados, administración y vigilancia de la organización.',
      category: 'Estatutos',
      date: '01/09/2025',
      author: 'Asamblea de Constitución',
      nit: '902.001.061-6',
      pdfPath: '/estatutos.pdf'
    },
    {
      id: 'acta2026',
      title: 'Acta de Asamblea Ordinaria 2026',
      description: 'Acta oficial firmada el 18 de Marzo de 2026 donde se aprueba por unanimidad el balance del ejercicio 2025 y se autoriza el trámite ante el RTE.',
      category: 'Asambleas / Actas',
      date: '18/03/2026',
      author: 'Asamblea General',
      nit: '902.001.061-6',
      pdfPath: '/acta2026.pdf'
    },
    {
      id: 'cert_rte',
      title: 'Certificación de Requisitos Art. 364-3 Num. 3',
      description: 'Certificación expedida sobre antecedentes judiciales y la inexistencia de sanciones de caducidad de contratos estatales del representante legal.',
      category: 'Certificaciones',
      date: '10/06/2026',
      author: 'Representante Legal',
      nit: '902.001.061-6',
      pdfPath: '/cert_rte.pdf'
    },
    {
      id: 'policia',
      title: 'Antecedentes Judiciales de Representantes y Directivos',
      description: 'Consulta y verificación oficial en línea de antecedentes judiciales emitidos por la Policía Nacional de Colombia de los miembros del órgano directivo.',
      category: 'Cumplimiento',
      date: '28/06/2026',
      author: 'Policía Nacional de Colombia',
      nit: '902.001.061-6',
      pdfPath: '/cert_antecedentes.pdf'
    },
    {
      id: 'pertenencia_rte',
      title: 'Certificación de Permanencia Régimen Especial',
      description: 'Certificado oficial que acredita el cumplimiento de los requisitos legales y estatutarios para pertenecer al Régimen Tributario Especial (RTE).',
      category: 'Certificaciones',
      date: '10/06/2026',
      author: 'Representante Legal y Revisor Fiscal',
      nit: '902.001.061-6',
      pdfPath: '/cert_regimen_especial.pdf'
    },
    {
      id: 'informe_gestion_2025',
      title: 'Informe de Gestión 2025',
      description: 'Informe oficial presentado a la Asamblea General que resume los hitos de constitución, misión, visión, estructura y estado preoperativo de la organización para el ejercicio 2025.',
      category: 'Asambleas / Actas',
      date: '18/03/2026',
      author: 'Representante Legal',
      nit: '902.001.061-6',
      pdfPath: '/informe_gestion_2025.pdf'
    },
    {
      id: 'memoria',
      title: 'Memoria Económica 2025',
      description: 'Resumen oficial de constitución, fuentes de recursos, destinación de excedentes obtenidos y certificación de cumplimiento firmada por el Representante Legal.',
      category: 'Finanzas',
      date: '10/06/2026',
      author: 'Representación Legal',
      nit: '902.001.061-6',
      pdfPath: '/memoria_economica_2025.pdf'
    }
  ];

  // List of active directors
  const directors = [
    { name: 'JEIKON REYNALDO REYES DELGADILLO', role: 'Representante Legal Principal / Presidente del Consejo' },
    { name: 'REYNALDO REYES PALMA', role: 'Representante Legal Suplente / Vicepresidente del Consejo' },
    { name: 'YUDY ANGELICA VELASQUEZ RAMIREZ', role: 'Secretaria del Consejo de Administración' },
    { name: 'DIEGO ANDERSON PERDOMO PERDOMO', role: 'Presidente de la Junta de Vigilancia' },
    { name: 'JOSE ALEXANDER GOMEZ RODRIGUEZ', role: 'Vicepresidente de la Junta de Vigilancia' },
    { name: 'YULITZA CAROLINA CAICEDO VELASQUEZ', role: 'Secretaria de la Junta de Vigilancia' },
    { name: 'KARINA LOPEZ FLOREZ', role: 'Revisora Fiscal' },
  ];

  const categories = ['Todos', 'Estatutos', 'Asambleas / Actas', 'Certificaciones', 'Cumplimiento', 'Finanzas'];

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

      {/* 3. Filtering and Search Bar */}
      <div className="bg-white border border-art-brown/10 p-4 sm:p-6 mb-8 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-art-brown/40" />
            <input
              type="text"
              placeholder="Buscar por título, contenido o autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-art-soft/20 border border-art-brown/10 hover:border-art-brown/30 focus:border-art-green focus:ring-0 text-xs px-9 py-3 rounded-none font-sans font-semibold placeholder:text-art-brown/40 outline-none transition-all"
            />
          </div>

          {/* Categories Selector */}
          <div className="md:col-span-7 flex flex-wrap gap-1.5 justify-start md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 text-[10px] font-sans uppercase font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-art-green text-white shadow-sm'
                    : 'bg-art-soft/30 hover:bg-art-soft/60 text-art-brown border border-art-brown/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* 4. Real Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <AnimatePresence mode="popLayout">
          {filteredDocs.map((doc) => (
            <motion.div
              layout
              key={doc.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-art-brown/10 hover:border-art-green/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-5 sm:p-6 space-y-4">
                
                {/* Badge and Date */}
                <div className="flex justify-between items-center text-[10px]">
                  <span className="bg-art-soft/60 text-art-brown font-sans uppercase font-extrabold tracking-widest px-2.5 py-1">
                    {doc.category}
                  </span>
                  <span className="text-gray-400 font-mono flex items-center gap-1 font-bold">
                    <Clock className="w-3 h-3 text-gray-300" />
                    {doc.date}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 bg-art-green/5 text-art-green shrink-0 mt-0.5 group-hover:bg-art-green group-hover:text-white transition-colors duration-300">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h4 className="font-serif font-black italic text-base text-art-brown tracking-tight leading-tight group-hover:text-art-green transition-colors duration-300">
                      {doc.title}
                    </h4>
                  </div>
                  <p className="text-xs text-art-brown/80 font-sans leading-relaxed pt-1">
                    {doc.description}
                  </p>
                </div>

                {/* Meta data */}
                <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-[10px] text-art-brown/65 font-sans font-medium">
                  <div>
                    <span className="text-[8px] text-gray-400 block uppercase font-bold tracking-wider">Autor del documento</span>
                    <span className="font-bold text-gray-800 truncate block">{doc.author}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-gray-400 block uppercase font-bold tracking-wider">NIT Oficial</span>
                    <span className="font-bold text-gray-800 block">{doc.nit}</span>
                  </div>
                </div>

              </div>

              {/* Action Bar */}
              <div className="border-t border-gray-100 bg-art-soft/5 p-4 grid grid-cols-2 gap-3.5">
                
                {/* Descargar Button */}
                <a
                  href={doc.pdfPath}
                  download
                  className="flex items-center justify-center space-x-1.5 bg-art-soft hover:bg-art-soft/80 text-art-brown border border-art-brown/10 px-3 py-2 text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer text-center"
                  title="Descargar PDF Original Firmado"
                >
                  <Download className="w-3.5 h-3.5 text-art-brown/80" />
                  <span>Descargar</span>
                </a>

                {/* Ver / Imprimir Button */}
                <a
                  href={doc.pdfPath}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-1.5 bg-art-green hover:bg-art-green/90 text-white px-3 py-2 text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer text-center"
                  title="Ver Documento e Imprimir en Navegador"
                >
                  <Printer className="w-3.5 h-3.5 text-white/90" />
                  <span>Ver / Imprimir</span>
                </a>

              </div>

            </motion.div>
          ))}
        </AnimatePresence>

        {filteredDocs.length === 0 && (
          <div className="col-span-full py-12 text-center space-y-3 bg-white border border-dashed border-art-brown/20">
            <AlertCircle className="w-10 h-10 text-art-brown/30 mx-auto" />
            <h5 className="font-serif font-black italic text-lg text-art-brown">No se encontraron documentos</h5>
            <p className="text-xs text-art-brown/60 max-w-md mx-auto font-sans">
              Intenta buscar con otros términos o cambia la categoría de filtro seleccionada arriba.
            </p>
          </div>
        )}
      </div>

      {/* 5. Directors List of Transparency */}
      <div className="bg-white border border-art-brown/10 p-6 sm:p-8 mb-10 shadow-sm">
        <div className="flex items-center space-x-2 text-art-green mb-6 border-b pb-3 border-gray-100">
          <Users className="w-5 h-5" />
          <h3 className="font-serif text-lg sm:text-xl font-bold text-art-brown">Órganos de Administración, Vigilancia y Control</h3>
        </div>
        
        <p className="text-xs sm:text-sm text-art-brown/80 font-sans leading-relaxed mb-6">
          A continuación se presenta el listado oficial de los representantes legales, miembros de los consejos de administración, junta de vigilancia y revisoría fiscal. Cada uno cuenta con sus respectivos certificados de antecedentes judiciales vigentes y cargados oficialmente para acceso público en la sección de cumplimiento.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {directors.map((director, idx) => (
            <div 
              key={idx}
              className="p-4 bg-art-soft/15 border border-art-brown/5 flex items-start space-x-3 hover:border-art-green/25 transition-all duration-200"
            >
              <div className="p-1.5 bg-art-green/5 text-art-green rounded-none mt-0.5 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-1 min-w-0">
                <p className="text-xs font-bold text-art-brown font-serif tracking-tight leading-snug">{director.name}</p>
                <p className="text-[10px] text-art-green font-sans font-semibold uppercase tracking-wider">{director.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. DIAN Web Transparency Statement Footer Banner */}
      <div className="mt-14 border border-art-brown/10 p-5 bg-art-soft/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-bold text-art-brown uppercase tracking-wider">Cumplimiento DIAN Estatuto Tributario Artículo 364-5</p>
          <p className="text-[10px] text-art-brown/75 leading-relaxed font-sans">
            La información expuesta corresponde fielmente a los registros públicos y expedientes originales de la Precooperativa para la vigencia en curso. Para solicitudes formales o radicaciones del sector solidario, por favor dirija un correo formal.
          </p>
        </div>
        <a 
          href="mailto:preagrocafe2025@gmail.com"
          className="inline-flex items-center space-x-1 bg-transparent hover:bg-art-brown/5 border border-art-brown/15 text-art-brown px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest shrink-0 self-start sm:sm:self-center transition-all cursor-pointer"
        >
          <span>Radicar Solicitud</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
};
