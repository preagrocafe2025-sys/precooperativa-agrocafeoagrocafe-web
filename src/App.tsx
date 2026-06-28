/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { AboutUs } from './components/AboutUs';
import { Attributes } from './components/Attributes';
import { SubscriptionBuilder } from './components/SubscriptionBuilder';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';

function MainLayout() {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-art-bg font-sans antialiased text-art-brown flex flex-col selection:bg-art-soft selection:text-art-brown">
      {/* Upper Navigation Header */}
      <Header />
      
      {/* Main Sections (Rendered conditionally based on activeTab) */}
      <main className="flex-grow">
        {activeTab === 'inicio' && (
          <>
            <Hero />
            <Attributes />
          </>
        )}
        
        {activeTab === 'tienda' && (
          <div className="pt-8">
            <ProductGrid />
          </div>
        )}
        
        {activeTab === 'nosotros' && (
          <div className="pt-12">
            <AboutUs />
          </div>
        )}
        
        {activeTab === 'suscripcion' && (
          <div className="pt-12">
            <SubscriptionBuilder />
          </div>
        )}
      </main>
      
      {/* Universal Footer */}
      <Footer />
      
      {/* Interactive Slidover Shopping Cart Drawer */}
      <CartDrawer />
      
      {/* Step-by-Step Checkout Sandbox Simulator Modal */}
      <CheckoutModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
