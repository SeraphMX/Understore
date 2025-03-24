import React from 'react';
import { ArrowLeft, Truck, Clock, Package, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold">Información de Envíos</h1>
      </div>

      <div className="space-y-6">
        {/* Shipping Methods */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Métodos de Envío</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Envío Estándar</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Entrega en 3-5 días hábiles</li>
                  <li>4.99€ para pedidos inferiores a 50€</li>
                  <li>Gratis para pedidos superiores a 50€</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Envío Express</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Entrega en 24-48 horas</li>
                  <li>9.99€ para todos los pedidos</li>
                  <li>Disponible solo para península</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Times */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold">Tiempos de Entrega</h2>
          </div>
          
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Península</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Envío Estándar: 3-5 días hábiles</li>
                <li>Envío Express: 24-48 horas</li>
              </ul>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Islas Baleares</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Envío Estándar: 4-6 días hábiles</li>
                <li>Envío Express: 2-3 días hábiles</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Islas Canarias, Ceuta y Melilla</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Envío Estándar: 7-10 días hábiles</li>
                <li>Envío Express no disponible</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Shipping Guarantees */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold">Garantías de Envío</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Seguimiento en Tiempo Real</h3>
              <p className="text-gray-600">
                Todos nuestros envíos incluyen seguimiento en tiempo real. Recibirás
                actualizaciones por email y SMS sobre el estado de tu pedido.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Seguro de Envío</h3>
              <p className="text-gray-600">
                Todos los envíos están asegurados contra pérdidas y daños. En caso
                de incidencia, nos encargamos de la gestión completa.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Garantía de Entrega</h3>
              <p className="text-gray-600">
                Si tu pedido no llega en el tiempo estimado, te reembolsaremos los
                gastos de envío.
              </p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Notas Importantes</h2>
          
          <ul className="space-y-3 text-gray-600">
            <li>• Los tiempos de entrega son estimados y pueden variar según la zona.</li>
            <li>• Los pedidos realizados después de las 14:00 se procesarán al siguiente día hábil.</li>
            <li>• No realizamos entregas en domingos ni festivos nacionales.</li>
            <li>• Para envíos a Canarias, Ceuta y Melilla pueden aplicarse tasas adicionales.</li>
            <li>• Es importante proporcionar un número de teléfono válido para la entrega.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Shipping;