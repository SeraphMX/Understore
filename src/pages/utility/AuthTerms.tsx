import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthTerms = () => {
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
        <h1 className="text-3xl font-bold">Términos y Condiciones para Miembros</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
        <p className="text-gray-600">Última actualización: {lastUpdate}</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Membresía</h2>
          <p>
            Al ser miembro de SemillasShop, usted acepta los siguientes términos adicionales:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mantener la confidencialidad de su cuenta</li>
            <li>No compartir sus credenciales de acceso</li>
            <li>Mantener actualizada su información personal</li>
            <li>Cumplir con nuestras políticas de uso</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Beneficios de Membresía</h2>
          <p>
            Como miembro verificado, tiene acceso a:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Precios especiales en productos seleccionados</li>
            <li>Acceso anticipado a nuevos productos</li>
            <li>Envío gratuito en pedidos superiores a 50€</li>
            <li>Soporte prioritario</li>
            <li>Programa de puntos de fidelidad</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Programa de Puntos</h2>
          <p>
            Nuestro programa de puntos funciona de la siguiente manera:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>1€ gastado = 1 punto</li>
            <li>100 puntos = 5€ de descuento</li>
            <li>Los puntos expiran después de 12 meses</li>
            <li>Los puntos no son transferibles</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Pedidos y Envíos</h2>
          <p>
            Condiciones especiales para miembros:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Prioridad en el procesamiento de pedidos</li>
            <li>Envío express disponible</li>
            <li>Seguimiento en tiempo real de pedidos</li>
            <li>Posibilidad de programar entregas</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Cancelación de Membresía</h2>
          <p>
            La membresía puede ser cancelada en los siguientes casos:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Violación de nuestros términos y condiciones</li>
            <li>Actividad fraudulenta</li>
            <li>A petición del usuario</li>
            <li>Inactividad prolongada (más de 12 meses)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Soporte Prioritario</h2>
          <p>
            Como miembro, tiene acceso a:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Atención telefónica prioritaria</li>
            <li>Chat en vivo 24/7</li>
            <li>Asesoramiento personalizado</li>
            <li>Resolución de problemas en menos de 24 horas</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Contacto</h2>
          <p>
            Para consultas sobre su membresía:
          </p>
          <ul className="list-none space-y-2">
            <li>Email: miembros@semillasshop.com</li>
            <li>Teléfono: +34 900 123 456</li>
            <li>Chat: Disponible 24/7 en nuestra plataforma</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AuthTerms;