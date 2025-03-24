import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const lastUpdate = '15 de febrero de 2024';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold">Aviso de Privacidad</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
        <p className="text-gray-600">Última actualización: {lastUpdate}</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Información que Recopilamos</h2>
          <p>
            En SemillasShop, recopilamos la siguiente información personal:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nombre y apellidos</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Dirección de envío y facturación</li>
            <li>Información de pago (procesada de forma segura por nuestros proveedores de pago)</li>
            <li>Historial de compras</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Uso de la Información</h2>
          <p>
            Utilizamos su información personal para:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Procesar y enviar sus pedidos</li>
            <li>Comunicarnos con usted sobre sus pedidos</li>
            <li>Enviar actualizaciones sobre nuestros productos y servicios</li>
            <li>Mejorar nuestros productos y servicios</li>
            <li>Prevenir fraudes y mantener la seguridad</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Protección de Datos</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal, incluyendo:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encriptación SSL para todas las transmisiones de datos</li>
            <li>Acceso restringido a información personal</li>
            <li>Monitoreo regular de sistemas de seguridad</li>
            <li>Capacitación de personal en prácticas de seguridad</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Sus Derechos</h2>
          <p>
            Usted tiene derecho a:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Acceder a su información personal</li>
            <li>Corregir información inexacta</li>
            <li>Solicitar la eliminación de sus datos</li>
            <li>Oponerse al procesamiento de sus datos</li>
            <li>Retirar su consentimiento en cualquier momento</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Cookies y Tecnologías Similares</h2>
          <p>
            Utilizamos cookies y tecnologías similares para:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mantener su sesión activa</li>
            <li>Recordar sus preferencias</li>
            <li>Analizar el uso del sitio web</li>
            <li>Personalizar su experiencia</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Contacto</h2>
          <p>
            Si tiene preguntas sobre nuestra política de privacidad, puede contactarnos:
          </p>
          <ul className="list-none space-y-2">
            <li>Email: privacy@semillasshop.com</li>
            <li>Teléfono: +34 900 123 456</li>
            <li>Dirección: Calle Principal 123, Madrid, España</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;