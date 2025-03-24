import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PublicTerms = () => {
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
        <h1 className="text-3xl font-bold">Términos y Condiciones</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
        <p className="text-gray-600">Última actualización: {lastUpdate}</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introducción</h2>
          <p>
            Estos términos y condiciones rigen el uso de SemillasShop y los servicios que ofrecemos.
            Al acceder a nuestro sitio web, usted acepta estos términos y condiciones en su totalidad.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Uso del Sitio</h2>
          <p>
            Al utilizar nuestro sitio web, usted garantiza que:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Tiene al menos 18 años de edad</li>
            <li>Proporcionará información verdadera y precisa</li>
            <li>No utilizará el sitio con fines ilegales o no autorizados</li>
            <li>No violará ninguna ley aplicable en su jurisdicción</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Productos y Precios</h2>
          <p>
            Nos reservamos el derecho de:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Modificar los precios de los productos en cualquier momento</li>
            <li>Descontinuar productos sin previo aviso</li>
            <li>Limitar las cantidades de compra de cualquier producto</li>
            <li>Rechazar pedidos a nuestra discreción</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Envíos y Entregas</h2>
          <p>
            Información general sobre envíos:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Los tiempos de entrega son estimados</li>
            <li>No nos hacemos responsables por retrasos fuera de nuestro control</li>
            <li>Los costos de envío se calculan en el momento de la compra</li>
            <li>El cliente es responsable de proporcionar una dirección de envío correcta</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Devoluciones</h2>
          <p>
            Nuestra política de devoluciones:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>30 días para devoluciones desde la recepción del producto</li>
            <li>El producto debe estar sin usar y en su empaque original</li>
            <li>Los gastos de envío de devolución corren por cuenta del cliente</li>
            <li>Nos reservamos el derecho de rechazar devoluciones que no cumplan con estos requisitos</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Limitación de Responsabilidad</h2>
          <p>
            SemillasShop no será responsable por:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Daños indirectos o consecuentes</li>
            <li>Pérdida de beneficios o ingresos</li>
            <li>Interrupción del negocio</li>
            <li>Pérdida de información comercial</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Contacto</h2>
          <p>
            Para cualquier consulta sobre estos términos, puede contactarnos:
          </p>
          <ul className="list-none space-y-2">
            <li>Email: legal@semillasshop.com</li>
            <li>Teléfono: +34 900 123 456</li>
            <li>Dirección: Calle Principal 123, Madrid, España</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PublicTerms;