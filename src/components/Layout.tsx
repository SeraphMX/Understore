import React, { useState, createContext, useContext } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartSlide from './CartSlide';

interface LayoutContextType {
  openCart: () => void;
}

export const LayoutContext = createContext<LayoutContextType>({ openCart: () => {} });

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);

  return (
    <LayoutContext.Provider value={{ openCart }}>
      <div className="min-h-screen flex flex-col">
        <Navbar onCartClick={openCart} />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
        <CartSlide isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;