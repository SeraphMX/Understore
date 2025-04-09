import React from 'react'
import { Outlet } from 'react-router-dom'
import CartSlide from '../components/CartSlide'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

interface MainLayoutProps {
  children?: React.ReactNode
}

export const MainLayoutContext = React.createContext<{
  openCart: () => void
}>({
  openCart: () => {}
})

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = React.useState(false)
  const openCart = () => setIsCartOpen(true)

  return (
    <MainLayoutContext.Provider value={{ openCart }}>
      <div className='min-h-screen flex flex-col'>
        <Navbar onCartClick={openCart} />
        <main className='flex-grow mt-20 w-full mx-auto'>{children || <Outlet />}</main>
        <Footer />
        <CartSlide isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </MainLayoutContext.Provider>
  )
}

export default MainLayout
