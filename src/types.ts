/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  origin: string;
  variety: string;
  altitude: string;
  process: string;
  notes: string[];
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  intensity: number;
}

export type GrindType = 'Saco 50kg' | 'Saco 24kg' | 'Bolsa 5kg' | 'Bolsa 1kg';

export interface CartItem {
  id: string; // combination of productId and grind
  product: Product;
  quantity: number;
  grind: GrindType;
}

export interface SubscriptionConfig {
  frequency: 'quincenal' | 'mensual' | 'bimestral';
  quantity: string;
  grind: GrindType;
  coffeeType: string;
}

export interface OrderDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  phone: string;
  paymentMethod: 'credit_card' | 'pse' | 'cash';
}
