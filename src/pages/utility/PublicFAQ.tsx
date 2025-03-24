import React from 'react';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PublicFAQ = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = React.useState<string | null>(null);

  const faqs = {
    general: [
      {
        question: '¿Qué es SemillasShop?',
        answer: 'SemillasShop es una tienda especializada en la venta de semillas, productos de jardinería y accesorios relacionados.'
      },
      {
        question: '¿Cómo puedo crear una cuenta?',
        answer: 'Para crear una cuenta, haz clic en "Registrarse" y sigue el proceso de verificación. Una vez aprobada tu solicitud, podrás acceder a todos nuestros productos y servicios.'
      }
    ],
    productos: [
      {
        question: '¿Qué tipos de semillas venden?',
        answer: 'Ofrecemos una amplia variedad de semillas, incluyendo flores, hortalizas, hierbas aromáticas y más. Todas nuestras semillas son de alta calidad y cuidadosamente seleccionadas.'
      },
      {
        question: '¿Las semillas son orgánicas?',
        answer: 'Sí, contamos con una selección de semillas orgánicas certificadas. Cada producto especifica en su descripción si es orgánico.'
      }
    ],
    envios: [
      {
        question: '¿Realizan envíos internacionales?',
        answer: 'Actualmente solo realizamos envíos dentro de España peninsular.'
      },
      {
        question: '¿Cuánto tarda en llegar mi pedido?',
        answer: 'El tiempo de entrega estimado es de 3-5 días hábiles para la península.'
      }
    ],
    pagos: [
      {
        question: '¿Qué métodos de pago aceptan?',
        answer: 'Aceptamos tarjetas de crédito/débito, transferencias bancarias y pagos contra reembolso.'
      },
      {
        question: '¿Es seguro comprar en su tienda?',
        answer: 'Sí, utilizamos sistemas de pago seguros y encriptación SSL para proteger tus datos.'
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
        <h1 className="text-3xl font-bold">Preguntas Frecuentes</h1>
      </div>

      <div className="space-y-6">
        {Object.entries(faqs).map(([category, questions]) => (
          <div key={category} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              className="w-full px-6 py-4 text-left font-semibold text-lg flex items-center justify-between"
              onClick={() => setOpenSection(openSection === category ? null : category)}
            >
              <span className="capitalize">
                {category === 'general' ? 'Información General' :
                 category === 'productos' ? 'Productos y Servicios' :
                 category === 'envios' ? 'Envíos y Entregas' :
                 'Pagos y Seguridad'}
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

export default PublicFAQ;