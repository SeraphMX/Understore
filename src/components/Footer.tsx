import { faFacebook, faInstagram, faTelegram, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Mail, Phone } from 'lucide-react'
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
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Company Info */}
          <div>
            <img src={logo} alt='' className='h-20' />
            <p className='text-gray-300 mb-4'>
              Somos tu club privado de confianza para productos recreativos, semillas y artículos de alta calidad.
            </p>
            <div className='space-y-2'>
              <div className='flex items-center space-x-2'>
                <Phone className='h-5 w-5' />
                <span>+34 900 123 456</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Mail className='h-5 w-5' />
                <span>info@monkeyjunkie.com</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className='text-lg font-bold mb-4'>Síguenos</h3>
            <div className='space-y-4'>
              <a
                href='https://facebook.com/semillasshop'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center space-x-2 text-gray-300 hover:text-white transition-colors'
              >
                <FontAwesomeIcon icon={faFacebook} className='h-5 w-5' />
                <span>Facebook</span>
              </a>
              <a
                href='https://instagram.com/semillasshop'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center space-x-2 text-gray-300 hover:text-white transition-colors'
              >
                <FontAwesomeIcon icon={faInstagram} className='h-5 w-5' />
                <span>Instagram</span>
              </a>
              <a
                href='https://t.me/semillasshop'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center space-x-2 text-gray-300 hover:text-white transition-colors'
              >
                <FontAwesomeIcon icon={faTelegram} className='h-5 w-5' />
                <span>Telegram</span>
              </a>
              <a
                href='https://tiktok.com/@semillasshop'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center space-x-2 text-gray-300 hover:text-white transition-colors'
              >
                <FontAwesomeIcon icon={faTiktok} className='h-5 w-5' />
                <span>TikTok</span>
              </a>
            </div>
          </div>

          {/* Useful Pages */}
          <div className='text-center md:text-right'>
            <h3 className='text-lg font-bold mb-4'>Enlaces Útiles</h3>
            <div className='space-y-2'>
              {isAuthenticated ? (
                <>
                  <Link to='/faq' className='block text-gray-300 hover:text-white transition-colors'>
                    Preguntas Frecuentes
                  </Link>
                  <Link to='/ayuda' className='block text-gray-300 hover:text-white transition-colors'>
                    Ayuda y Soporte
                  </Link>
                  <Link to='/terminos' className='block text-gray-300 hover:text-white transition-colors'>
                    Términos y Condiciones
                  </Link>
                  <Link to='/privacidad' className='block text-gray-300 hover:text-white transition-colors'>
                    Política de Privacidad
                  </Link>
                  <Link to='/envios' className='block text-gray-300 hover:text-white transition-colors'>
                    Información de Envíos
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
