import { Avatar, Badge, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { Heart, HelpCircle, LayoutDashboard, LogOut, Menu as MenuIcon, Package, Settings, ShoppingCart, User, X } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/branding/logo-lettering-outline-black.svg'
import { logout } from '../store/slices/authSlice'
import { setView } from '../store/slices/layoutSlice'
import { RootState } from '../store/store'
import NotificationsDropdown from './NotificationsDropdown'

interface NavbarProps {
  onCartClick: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const favorites = useSelector((state: RootState) => state.favorites.items)
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    setIsMobileMenuOpen(false)
  }

  const handleNotificationClick = () => {
    navigate('/perfil?tab=notifications')
    setIsMobileMenuOpen(false)
  }

  const handleAdminView = () => {
    dispatch(setView('admin'))
    navigate('/admin')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className='bg-primary text-white relative'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <Link to='/' className='flex items-center space-x-2' onClick={closeMobileMenu}>
            <img src={logo} alt='Logo' className='h-12' />
          </Link>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center space-x-6'>
            {isAuthenticated && user?.isApproved ? (
              <>
                <Link to='/productos' className='hover:text-green-500'>
                  Productos
                </Link>

                <Link to='/perfil?tab=favorites' className='hover:text-green-500'>
                  <Badge content={favorites.length} color='danger' size='sm' className='text-tiny' isInvisible={favorites.length === 0}>
                    <Heart className='h-6 w-6' />
                  </Badge>
                </Link>

                <NotificationsDropdown onNotificationClick={handleNotificationClick} />

                <Badge content={itemCount} color='danger' size='sm' className='text-tiny' isInvisible={itemCount === 0}>
                  <button onClick={onCartClick} className='hover:text-green-500'>
                    <ShoppingCart className='h-6 w-6' />
                  </button>
                </Badge>

                <Dropdown placement='bottom-end'>
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as='button'
                      className='transition-transform'
                      color='primary'
                      name={user.username}
                      size='sm'
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label='Profile Actions' variant='flat'>
                    {(user.role === 'admin' || user.role === 'staff') && (
                      <DropdownItem key='admin' startContent={<LayoutDashboard className='w-4 h-4' />} onClick={handleAdminView}>
                        Panel de Administración
                      </DropdownItem>
                    )}
                    <DropdownItem key='profile' startContent={<User className='w-4 h-4' />} onClick={() => navigate('/perfil')}>
                      Mi Perfil
                    </DropdownItem>
                    <DropdownItem
                      key='orders'
                      startContent={<Package className='w-4 h-4' />}
                      onClick={() => navigate('/perfil?tab=orders')}
                    >
                      Mis Pedidos
                    </DropdownItem>
                    <DropdownItem
                      key='settings'
                      startContent={<Settings className='w-4 h-4' />}
                      onClick={() => navigate('/perfil?tab=settings')}
                    >
                      Configuración
                    </DropdownItem>
                    <DropdownItem key='help' startContent={<HelpCircle className='w-4 h-4' />} onClick={() => navigate('/soporte')}>
                      Soporte
                    </DropdownItem>
                    <DropdownItem key='logout' color='danger' startContent={<LogOut className='w-4 h-4' />} onClick={handleLogout}>
                      Cerrar Sesión
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
            ) : (
              <Link to='/login' className='hover:text-green-500'>
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className='md:hidden p-2 hover:bg-green-700 rounded-lg' onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className='h-6 w-6' /> : <MenuIcon className='h-6 w-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileMenu}
      />
      <div
        className={`absolute top-16 left-0 right-0 bg-primary z-50 transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        } md:hidden`}
      >
        <div className='container mx-auto px-4 py-4 space-y-4'>
          {isAuthenticated && user?.isApproved ? (
            <>
              <div className='flex items-center space-x-3 p-3 bg-green-700 rounded-lg'>
                <Avatar
                  isBordered
                  color='primary'
                  name={user.username}
                  size='sm'
                  src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
                />
                <div>
                  <p className='font-medium'>{user.username}</p>
                  <p className='text-sm text-green-200'>{user.role}</p>
                </div>
              </div>

              {(user.role === 'admin' || user.role === 'staff') && (
                <Link to='/admin' className='flex items-center gap-2 p-3 hover:bg-green-700 rounded-lg' onClick={closeMobileMenu}>
                  <LayoutDashboard className='w-5 h-5' />
                  <span>Panel de Administración</span>
                </Link>
              )}

              <Link to='/productos' className='block p-3 hover:bg-green-700 rounded-lg' onClick={closeMobileMenu}>
                Productos
              </Link>

              <button className='flex items-center justify-between w-full p-3 hover:bg-green-700 rounded-lg' onClick={onCartClick}>
                <span>Carrito</span>
                {itemCount > 0 && <Badge color='danger' content={itemCount} />}
              </button>

              <Link
                to='/perfil?tab=favorites'
                className='flex items-center justify-between w-full p-3 hover:bg-green-700 rounded-lg'
                onClick={closeMobileMenu}
              >
                <span>Lista de Favoritos</span>
                {favorites.length > 0 && <Badge color='danger' content={favorites.length} />}
              </Link>

              <Link
                to='/perfil?tab=notifications'
                className='flex items-center justify-between w-full p-3 hover:bg-green-700 rounded-lg'
                onClick={closeMobileMenu}
              >
                <span>Notificaciones</span>
                <Badge color='danger' content='3' />
              </Link>

              <Link to='/perfil' className='block p-3 hover:bg-green-700 rounded-lg' onClick={closeMobileMenu}>
                Mi Perfil
              </Link>

              <Link to='/perfil?tab=orders' className='block p-3 hover:bg-green-700 rounded-lg' onClick={closeMobileMenu}>
                Mis Pedidos
              </Link>

              <Link to='/perfil?tab=settings' className='block p-3 hover:bg-green-700 rounded-lg' onClick={closeMobileMenu}>
                Configuración
              </Link>

              <Link to='/soporte' className='block p-3 hover:bg-green-700 rounded-lg' onClick={closeMobileMenu}>
                Soporte
              </Link>

              <button onClick={handleLogout} className='w-full p-3 text-left text-red-200 hover:bg-green-700 rounded-lg'>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to='/login' className='block p-3 hover:text-green-500 rounded-lg' onClick={closeMobileMenu}>
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
