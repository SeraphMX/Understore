import React from 'react';
import { ArrowLeft, MessageCircle, Phone, Mail, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';

const Help = () => {
  const navigate = useNavigate();

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/34900123456', '_blank');
  };

  const handleVideoCallClick = () => {
    // Implement video call functionality
    console.log('Starting video call...');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold">Ayuda y Soporte</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Methods */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-semibold">Contacta con Nosotros</h2>
          
          <div className="space-y-4">
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-600 hover:bg-green-700"
              startContent={<MessageCircle className="w-5 h-5" />}
            >
              Chat por WhatsApp
            </Button>

            <Button
              onClick={handleVideoCallClick}
              className="w-full bg-blue-600 hover:bg-blue-700"
              startContent={<Video className="w-5 h-5" />}
            >
              Videollamada
            </Button>

            <div className="border-t pt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-gray-600">+34 900 123 456</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">soporte@semillasshop.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Help */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Ayuda Rápida</h2>
          
          <div className="space-y-4">
            <button
              onClick={() => navigate('/rastrear')}
              className="w-full text-left p-4 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium mb-1">Rastrear Pedido</h3>
              <p className="text-sm text-gray-600">
                Sigue el estado de tu pedido en tiempo real
              </p>
            </button>

            <button
              onClick={() => navigate('/faq')}
              className="w-full text-left p-4 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium mb-1">Preguntas Frecuentes</h3>
              <p className="text-sm text-gray-600">
                Encuentra respuestas a las preguntas más comunes
              </p>
            </button>

            <button
              onClick={() => navigate('/envios')}
              className="w-full text-left p-4 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium mb-1">Información de Envíos</h3>
              <p className="text-sm text-gray-600">
                Consulta nuestras políticas y tiempos de envío
              </p>
            </button>

            <button
              onClick={() => navigate('/terminos')}
              className="w-full text-left p-4 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium mb-1">Términos y Condiciones</h3>
              <p className="text-sm text-gray-600">
                Revisa nuestras políticas y términos de servicio
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Support Hours */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Horario de Atención</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Chat y Teléfono</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Lunes a Viernes: 9:00 - 20:00</li>
              <li>Sábados: 10:00 - 15:00</li>
              <li>Domingos y Festivos: Cerrado</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-2">Email</h3>
            <p className="text-gray-600">
              Respondemos a todos los emails en un plazo máximo de 24 horas,
              incluso durante fines de semana y festivos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;