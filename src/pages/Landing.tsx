import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Input } from '@nextui-org/react'
import { AlertCircle } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/branding/logo-monkey.svg'
import OTPVerification from '../components/OTPVerification'
import RegistrationSuccess from '../components/RegistrationSuccess'
import { registerFailure, registerStart, registerSuccess } from '../store/slices/authSlice'
import { RootState } from '../store/store'

enum RegistrationStep {
  FORM,
  OTP_VERIFICATION,
  SUCCESS
}

const Landing = () => {
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state: RootState) => state.auth)
  const [currentStep, setCurrentStep] = useState(RegistrationStep.FORM)
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    socialLink: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(registerStart())

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Move to OTP verification step
      setCurrentStep(RegistrationStep.OTP_VERIFICATION)
      dispatch(registerSuccess({ ...formData, id: '123', isApproved: false, role: 'user', password: '' }))
    } catch (error) {
      dispatch(registerFailure('Error al registrar usuario'))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleVerifyOTP = async (code: string) => {
    dispatch(registerStart())

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll accept "123456" as the valid code
      if (code === '123456') {
        setCurrentStep(RegistrationStep.SUCCESS)
        dispatch(registerSuccess({ ...formData, id: '123', isApproved: false, role: 'user', password: '' }))
      } else {
        dispatch(registerFailure('Código OTP inválido'))
      }
    } catch (error) {
      dispatch(registerFailure('Error al verificar el código'))
    }
  }

  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number and message
    const phoneNumber = '1234567890'
    const message = encodeURIComponent(
      `Hola! He enviado una solicitud de registro con el usuario ${formData.username}. Me gustaría acelerar el proceso de aprobación.`
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  const handleDirectWhatsApp = () => {
    const phoneNumber = '1234567890'
    const message = encodeURIComponent('¡Hola! Me gustaría obtener más información sobre SemillasShop.')
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  const renderContent = () => {
    switch (currentStep) {
      case RegistrationStep.OTP_VERIFICATION:
        return (
          <OTPVerification
            phoneNumber={formData.phoneNumber}
            onVerify={handleVerifyOTP}
            onBack={() => setCurrentStep(RegistrationStep.FORM)}
          />
        )

      case RegistrationStep.SUCCESS:
        return <RegistrationSuccess onWhatsAppClick={handleWhatsAppClick} />

      default:
        return (
          <div className='bg-white p-6 rounded-xl shadow-lg'>
            <h3 className='text-xl md:text-2xl font-semibold mb-6'>Solicita tu acceso</h3>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <Input
                type='text'
                name='username'
                label='Nombre de usuario'
                value={formData.username}
                onChange={handleChange}
                required
                variant='bordered'
              />
              <Input
                type='tel'
                name='phoneNumber'
                label='Número de teléfono'
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                variant='bordered'
              />
              <Input
                type='url'
                name='socialLink'
                label='Link de red social'
                placeholder='https://...'
                value={formData.socialLink}
                onChange={handleChange}
                required
                variant='bordered'
              />
              {error && (
                <div className='flex items-center text-red-600 text-sm'>
                  <AlertCircle className='w-4 h-4 mr-2' />
                  {error}
                </div>
              )}
              <Button type='submit' color='primary' className='w-full' isLoading={isLoading}>
                {isLoading ? 'Enviando solicitud...' : 'Solicitar Acceso'}
              </Button>
            </form>
            <p className='mt-4 text-sm text-gray-600'>Revisaremos tu solicitud y te contactaremos pronto para confirmar tu acceso.</p>
          </div>
        )
    }
  }

  return (
    <div className='min-h-screen  bg-gradient-to-b from-zinc-200 to-white'>
      <div className='container mx-auto px-4 py-12'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='flex justify-center mb-6'>
            <img src={logo} alt='' className='h-36' />
          </div>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>Bienvenido</h1>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Nuestro sitio y productos son <strong>exclusivos para miembros</strong> del club
          </p>
        </div>

        {/* Main Content */}
        <div className='max-w-4xl mx-auto'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            {/* Left Column - Benefits */}
            <div className='space-y-6'>
              <h2 className='text-xl md:text-2xl font-semibold mb-6'>¿Que ofrecemos a nuestros miembros?</h2>
              <div className='space-y-4'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0 h-6 w-6 text-green-600'>✓</div>
                  <p className='ml-2'>Productos exclusivos y de alta calidad</p>
                </div>
                <div className='flex items-start'>
                  <div className='flex-shrink-0 h-6 w-6 text-green-600'>✓</div>
                  <p className='ml-2'>Compras rápidas, discretas y seguras</p>
                </div>
                <div className='flex items-start'>
                  <div className='flex-shrink-0 h-6 w-6 text-green-600'>✓</div>
                  <p className='ml-2'>Comunicación directa y seguimiento</p>
                </div>
                <div className='flex items-start'>
                  <div className='flex-shrink-0 h-6 w-6 text-green-600'>✓</div>
                  <p className='ml-2'>Ofertas y promociones especiales</p>
                </div>
              </div>
            </div>

            {/* Right Column - Form/OTP/Success */}
            <div>{renderContent()}</div>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <button
        onClick={handleDirectWhatsApp}
        className='fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 group'
      >
        <FontAwesomeIcon icon={faWhatsapp} className='w-6 h-6' />
        <span className='absolute right-full mr-3 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap'>
          ¿Necesitas ayuda?
        </span>
      </button>
    </div>
  )
}

export default Landing
