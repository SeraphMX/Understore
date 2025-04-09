import { faFacebook, faInstagram, faTelegram, faTiktok, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../assets/branding/logo-lettering-outline-black.svg'
import { RootState } from '../store/store'

const Footer = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const year = new Date().getFullYear()

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/34900123456', '_blank')
  }

  return (
    <footer className='bg-zinc-900 text-white py-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1   md:grid-cols-2 gap-8'>
          {/* Company Info */}
          <div className='max-w-xs mx-auto md:mx-0 text-center md:text-left'>
            <img src={logo} alt='' className='h-20' />
            <p className='text-gray-300 my-2'>
              Somos tu club privado de confianza para productos recreativos, semillas y artículos de alta calidad.
            </p>
            {/* Social Media */}
            <div className='text-center md:text-left'>
              <h3 className='text-lg font-bold mb-4'>Síguenos</h3>
              <div className='flex gap-2 justify-center md:justify-start'>
                <a
                  href='https://facebook.com/semillasshop'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-2 text-gray-300 hover:text-white transition-colors'
                >
                  <FontAwesomeIcon icon={faFacebook} className='h-7 w-7' />
                </a>
                <a
                  href='https://instagram.com/semillasshop'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-2 text-gray-300 hover:text-white transition-colors'
                >
                  <FontAwesomeIcon icon={faInstagram} className='h-7 w-7' />
                </a>
                <a
                  href='https://t.me/semillasshop'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-2 text-gray-300 hover:text-white transition-colors'
                >
                  <FontAwesomeIcon icon={faTelegram} className='h-7 w-7' />
                </a>
                <a
                  href='https://tiktok.com/@semillasshop'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-2 text-gray-300 hover:text-white transition-colors'
                >
                  <FontAwesomeIcon icon={faTiktok} className='h-7 w-7' />
                </a>
                <a
                  href='https://wa.me/34900123456'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-2 text-gray-300 hover:text-white transition-colors'
                  onClick={handleWhatsAppClick}
                >
                  <FontAwesomeIcon icon={faWhatsapp} className='h-7 w-7' />
                </a>
              </div>
            </div>
          </div>

          {/* Useful Pages */}
          <div className='flex flex-col justify-center text-center md:text-right '>
            <h3 className='text-lg font-bold mb-4'>Enlaces Útiles</h3>
            <div className='space-y-2'>
              {isAuthenticated ? (
                <>
                  <Link to='/ayuda' className='block text-gray-300 hover:text-white transition-colors'>
                    Ayuda y Soporte
                  </Link>
                  <Link to='/envios' className='block text-gray-300 hover:text-white transition-colors'>
                    Información de Envíos
                  </Link>
                  <Link to='/faq' className='block text-gray-300 hover:text-white transition-colors'>
                    Preguntas Frecuentes
                  </Link>
                  <Link to='/terminos' className='block text-gray-300 hover:text-white transition-colors'>
                    Términos y Condiciones
                  </Link>
                  <Link to='/privacidad' className='block text-gray-300 hover:text-white transition-colors'>
                    Política de Privacidad
                  </Link>
                </>
              ) : (
                <>
                  <Link to='/login' className='block text-gray-300 hover:text-white transition-colors'>
                    Iniciar Sesión
                  </Link>
                  <Link to='/' className='block text-gray-300 hover:text-white transition-colors'>
                    Registrarse
                  </Link>
                  <Link to='/privacidad' className='block text-gray-300 hover:text-white transition-colors'>
                    Aviso de Privacidad
                  </Link>
                  <Link to='/terminos' className='block text-gray-300 hover:text-white transition-colors'>
                    Términos y Condiciones
                  </Link>
                  <Link to='/faq' className='block text-gray-300 hover:text-white transition-colors'>
                    Preguntas frecuentes
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className='mt-8 pt-8 border-t border-zinc-700 text-center text-gray-300'>
          <p>&copy; {year} Monkey Junkie. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
