/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';
import heroImage from './assets/images/green_coffee_background_bg_1782665797975.jpg';
import premiumBagImage from './assets/images/green_coffee_premium_1782665614084.jpg';
import kraftBagImage from './assets/images/green_coffee_rustic_1782665628478.jpg';

export const HERO_IMAGE = heroImage;
export const PREMIUM_BAG_IMAGE = premiumBagImage;
export const KRAFT_BAG_IMAGE = kraftBagImage;

export const CERTIFICATIONS = [
  {
    name: 'Fair Trade',
    description: 'Comercio Justo Garantizado para nuestros caficultores.',
    icon: '🤝',
    badgeText: 'Fair Trade'
  },
  {
    name: 'Rainforest Alliance',
    description: 'Cultivado de forma sostenible, conservando la biodiversidad.',
    icon: '🐸',
    badgeText: 'Rainforest'
  },
  {
    name: 'Certificación Orgánica',
    description: 'Libre de pesticidas y fertilizantes químicos artificiales.',
    icon: '🌱',
    badgeText: 'Orgánico'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'tolima-excelso',
    name: 'Café Verde Excelso - Planadas',
    origin: 'Tolima, Planadas (1,850 msnm)',
    variety: 'Castillo / Colombia',
    altitude: '1,850m',
    process: 'Lavado Tradicional',
    notes: ['Panela', 'Limón', 'Cuerpo Medio'],
    price: 21900,
    rating: 4.9,
    reviewsCount: 124,
    image: PREMIUM_BAG_IMAGE,
    badge: 'Más Solicitado',
    intensity: 4
  },
  {
    id: 'huila-supremo',
    name: 'Café Verde Supremo - Pitalito',
    origin: 'Huila, Pitalito (1,750 msnm)',
    variety: 'Caturra',
    altitude: '1,750m',
    process: 'Lavado con Doble Fermentación',
    notes: ['Chocolate Dulce', 'Fruta Amarilla', 'Acidez Brillante'],
    price: 24900,
    rating: 4.8,
    reviewsCount: 98,
    image: PREMIUM_BAG_IMAGE,
    badge: 'Calidad de Exportación',
    intensity: 5
  },
  {
    id: 'sierra-nevada-verde',
    name: 'Café Verde - Sierra Nevada Orgánico',
    origin: 'Sierra Nevada de Santa Marta (1,600 msnm)',
    variety: 'Borbón',
    altitude: '1,600m',
    process: 'Honey Ecológico',
    notes: ['Miel de Abejas', 'Jazmín', 'Dulce Residual'],
    price: 26900,
    rating: 4.9,
    reviewsCount: 76,
    image: KRAFT_BAG_IMAGE,
    badge: '100% Orgánico',
    intensity: 3
  },
  {
    id: 'tolima-natural-verde',
    name: 'Café Verde - Proceso Natural Anaeróbico',
    origin: 'Tolima, Planadas (1,900 msnm)',
    variety: 'Borbón Rosado',
    altitude: '1,900m',
    process: 'Natural Anaeróbico',
    notes: ['Frutos Rojos', 'Vino Tinto', 'Chocolate Oscuro'],
    price: 29900,
    rating: 5.0,
    reviewsCount: 142,
    image: KRAFT_BAG_IMAGE,
    badge: 'Micro-Lote Especial',
    intensity: 4
  }
];

export const BRAND_ATTRIBUTES = [
  {
    id: 'attr-arabica',
    title: 'Café Verde 100% Arábica',
    description: 'Granos rigurosamente seleccionados y clasificados por tamaño y densidad, listos para ser tostados por profesionales o industrias.',
    icon: 'Coffee'
  },
  {
    id: 'attr-ethical',
    title: 'Comercio Justo y Solidario',
    description: 'Nuestra precooperativa garantiza transparencia, equidad y un pago justo por encima de las tasas de mercado directo a las familias asociadas.',
    icon: 'Heart'
  },
  {
    id: 'attr-fresh',
    title: 'Control Técnico de Humedad',
    description: 'Mantenemos un estricto rango del 10% al 12% de humedad en nuestras bodegas de acopio para garantizar la conservación perfecta del grano verde.',
    icon: 'Flame'
  },
  {
    id: 'attr-nationwide',
    title: 'Comercialización Mayorista',
    description: 'Capacidad de despacho ágil a nivel nacional con todas las garantías sanitarias y empaques en sacos de yute de alta resistencia.',
    icon: 'Truck'
  }
];

export const FAQS = [
  {
    question: '¿Por qué venden café verde y no café tostado?',
    answer: 'Como Precooperativa Agropecuaria, nos especializamos en el acopio, la gestión de calidad y la comercialización al por mayor del café en su estado verde (almendra) y materias primas agrícolas (Actividad DIAN 4620). No realizamos procesos de tostión, permitiendo a tostadores y exportadores dar su propio perfil al grano.'
  },
  {
    question: '¿Cuáles son las presentaciones y empaques de despacho disponibles?',
    answer: 'Ofrecemos despachos de prueba en bolsas herméticas de 1kg y 5kg, así como distribución mayorista tradicional en sacos de yute de 24kg y 50kg, asegurando un embalaje técnico que protege contra la humedad externa.'
  },
  {
    question: '¿Cómo funciona la suscripción mensual de acopio?',
    answer: 'Eliges el tipo de café verde especial, la cantidad requerida para tu negocio (en sacos o bolsas de gran volumen) y la frecuencia de despacho mensual. Obtienes precios preferenciales de asociado con un 15% de descuento fijo y prioridad en el abastecimiento.'
  }
];
