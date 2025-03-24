import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartSlide from '../components/CartSlide';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayoutContext = React.createContext<{
  openCart: () => void;
}>({
  openCart: () => {},
});

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const openCart = () => setIsCartOpen(true);

  return (
    <MainLayoutContext.Provider value={{ openCart }}>
      <div className="min-h-screen flex flex-col">
        <Navbar onCartClick={openCart} />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children || <Outlet />}
        </main>
        <Footer />
        <CartSlide isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </MainLayoutContext.Provider>
  );
};

export default MainLayout;