import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Package, Search, ArrowLeft, Truck, MapPin, Calendar } from 'lucide-react';
import { Input, Button, Badge } from '@nextui-org/react';
import { findOrderByTrackingNumber } from '../data/orders';
import { getStatusColor, getStatusText, formatDate, formatPrice } from '../types';

const TrackOrder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState(searchParams.get('tracking') || '');
  const [error, setError] = useState<string | null>(null);

  // Get order based on tracking number from URL
  const order = trackingNumber ? findOrderByTrackingNumber(trackingNumber) : null;

  // Update tracking number when URL parameter changes
  useEffect(() => {
    const tracking = searchParams.get('tracking');
    if (tracking) {
      setTrackingNumber(tracking);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setError('Por favor ingresa un número de rastreo');
      return;
    }

    setError(null);
    setSearchParams({ tracking: trackingNumber });

    // Show error if order not found
    if (!findOrderByTrackingNumber(trackingNumber)) {
      setError('No se encontró ningún pedido con ese número de rastreo');
    }
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
        <h1 className="text-3xl font-bold">Rastrear Pedido</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <form onSubmit={handleSearch} className="flex gap-4">
          <Input
            value={trackingNumber}
            onChange={(e) => {
              setTrackingNumber(e.target.value);
              setError(null); // Clear error when input changes
            }}
            placeholder="Ingresa el número de rastreo"
            startContent={<Search className="w-5 h-5 text-gray-400" />}
            isInvalid={!!error}
            errorMessage={error}
            className="flex-1"
          />
          <Button
            type="submit"
            color="primary"
            className="bg-green-600 hover:bg-green-700"
          >
            Rastrear
          </Button>
        </form>
      </div>

      {order && (
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Pedido #{order.id}
                </h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <Package className="w-4 h-4" />
                  <span>{order.tracking.carrier} - {order.tracking.number}</span>
                </div>
              </div>
              <Badge
                className={getStatusColor(order.status)}
                variant="flat"
              >
                {getStatusText(order.status)}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Fecha del pedido: {formatDate(order.date)}</span>
              </div>
              <p className="font-medium">Total: {formatPrice(order.total)}</p>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Seguimiento del Envío</h3>
            <div className="space-y-8">
              {order.tracking.events.map((event, index) => (
                <div key={index} className="relative flex gap-6">
                  {/* Timeline line */}
                  {index !== order.tracking.events.length - 1 && (
                    <div className="absolute top-6 left-[17px] w-0.5 h-full -z-10 bg-gray-200" />
                  )}
                  
                  {/* Status icon */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${getStatusColor(event.status)}`}>
                    {event.status === 'delivered' ? (
                      <Package className="w-5 h-5" />
                    ) : event.status === 'in_transit' ? (
                      <Truck className="w-5 h-5" />
                    ) : (
                      <Package className="w-5 h-5" />
                    )}
                  </div>

                  {/* Event details */}
                  <div>
                    <p className="font-medium">{event.description}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {trackingNumber && !order && !error && (
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            No se encontró ningún pedido con el número de rastreo proporcionado.
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;