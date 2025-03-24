import React from 'react';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthFAQ = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = React.useState<string | null>(null);

  const faqs = {
    cuenta: [
      {
        question: '¿Cómo puedo cambiar mi contraseña?',
        answer: 'Ve a tu perfil, selecciona "Configuración" y haz clic en "Cambiar contraseña". Sigue las instrucciones para establecer una nueva contraseña.'
      },
      {
        question: '¿Cómo actualizo mi información de contacto?',
        answer: 'Accede a tu perfil y selecciona "Editar información". Aquí podrás actualizar tu dirección, teléfono y otros datos de contacto.'
      }
    ],
    pedidos: [
      {
        question: '¿Cómo puedo rastrear mi pedido?',
        answer: 'Ve a "Mis Pedidos" en tu perfil y selecciona el pedido que deseas rastrear. Allí encontrarás el número de seguimiento y el estado actual de tu envío.'
      },
      {
        question: '¿Puedo modificar un pedido después de realizarlo?',
        answer: 'Solo puedes modificar un pedido si aún no ha sido procesado. Contacta con soporte lo antes posible para solicitar cambios.'
      },
      {
        question: '¿Qué hago si mi pedido llega incompleto?',
        answer: 'Contacta inmediatamente con nuestro servicio de atención al cliente y proporciona tu número de pedido. Resolveremos tu caso en menos de 24 horas.'
      }
    ],
    puntos: [
      {
        question: '¿Cómo funciona el programa de puntos?',
        answer: 'Por cada euro gastado recibes 1 punto. Puedes canjear 100 puntos por 5€ de descuento en tus compras.'
      },
      {
        question: '¿Cuándo expiran mis puntos?',
        answer: 'Los puntos tienen una validez de 12 meses desde la fecha en que los obtienes.'
      },
      {
        question: '¿Puedo transferir mis puntos?',
        answer: 'No, los puntos son personales e intransferibles.'
      }
    ],
    devoluciones: [
      {
        question: '¿Cuál es el proceso de devolución?',
        answer: 'Tienes 30 días para devolver un producto. Inicia el proceso en "Mis Pedidos", selecciona el producto a devolver y sigue las instrucciones.'
      },
      {
        question: '¿Quién paga los gastos de envío en una devolución?',
        answer: 'Si el producto está defectuoso o no corresponde con lo pedido, nosotros cubrimos los gastos. En otros casos, los gastos corren por cuenta del cliente.'
      }
    ],
    beneficios: [
      {
        question: '¿Qué beneficios tengo como miembro?',
        answer: 'Como miembro verificado tienes acceso a precios especiales, envío gratuito en pedidos superiores a 50€, soporte prioritario y programa de puntos.'
      },
      {
        question: '¿Cómo obtengo envío gratuito?',
        answer: 'El envío es gratuito en todos los pedidos superiores a 50€. Para pedidos menores, se aplica una tarifa según la zona de envío.'
      }
    ]
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
        <h1 className="text-3xl font-bold">Centro de Ayuda</h1>
      </div>

      <div className="space-y-6">
        {Object.entries(faqs).map(([category, questions]) => (
          <div key={category} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              className="w-full px-6 py-4 text-left font-semibold text-lg flex items-center justify-between"
              onClick={() => setOpenSection(openSection === category ? null : category)}
            >
              <span className="capitalize">
                {category === 'cuenta' ? 'Mi Cuenta' :
                 category === 'pedidos' ? 'Pedidos y Envíos' :
                 category === 'puntos' ? 'Programa de Puntos' :
                 category === 'devoluciones' ? 'Devoluciones' :
                 'Beneficios de Membresía'}
              </span>
              {openSection === category ? (
                <Minus className="w-5 h-5 text-gray-500" />
              ) : (
                <Plus className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {openSection === category && (
              <div className="px-6 pb-4 space-y-4">
                {questions.map((faq, index) => (
                  <div key={index} className="border-t pt-4 first:border-t-0 first:pt-0">
                    <h3 className="font-medium mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthFAQ;