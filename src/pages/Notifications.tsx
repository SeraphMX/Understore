import React from 'react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '../data/notifications';
import { formatRelativeTime } from '../types';
import { 
  Package, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle2, 
  Truck,
  ArrowLeft
} from 'lucide-react';
import { Chip } from '@nextui-org/react';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'order_placed':
    case 'order_confirmed':
      return <Package className="w-6 h-6" />;
    case 'payment_pending':
    case 'payment_confirmed':
      return <CreditCard className="w-6 h-6" />;
    case 'order_shipped':
      return <Truck className="w-6 h-6" />;
    case 'order_delivered':
      return <CheckCircle2 className="w-6 h-6" />;
    case 'order_problem':
    case 'order_cancelled':
      return <AlertTriangle className="w-6 h-6" />;
    default:
      return null;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'order_placed':
    case 'order_confirmed':
      return 'bg-blue-100 text-blue-600';
    case 'payment_pending':
      return 'bg-yellow-100 text-yellow-600';
    case 'payment_confirmed':
    case 'order_delivered':
      return 'bg-green-100 text-green-600';
    case 'order_shipped':
      return 'bg-purple-100 text-purple-600';
    case 'order_problem':
    case 'order_cancelled':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const getNotificationStatus = (type: string) => {
  switch (type) {
    case 'order_placed':
      return 'Pedido Recibido';
    case 'order_confirmed':
      return 'Pedido Confirmado';
    case 'payment_pending':
      return 'Pago Pendiente';
    case 'payment_confirmed':
      return 'Pago Confirmado';
    case 'order_shipped':
      return 'En Camino';
    case 'order_delivered':
      return 'Entregado';
    case 'order_problem':
      return 'Problema';
    case 'order_cancelled':
      return 'Cancelado';
    default:
      return type;
  }
};

const Notifications = () => {
  const navigate = useNavigate();
  const sortedNotifications = [...notifications].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold">Notificaciones</h1>
      </div>

      <div className="space-y-4">
        {sortedNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow-sm p-6 ${
              !notification.isRead ? 'border-l-4 border-blue-500' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full ${getNotificationColor(notification.type)}`}>
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{notification.title}</h3>
                  <Chip
                    className={getNotificationColor(notification.type)}
                    variant="flat"
                    size="sm"
                  >
                    {getNotificationStatus(notification.type)}
                  </Chip>
                </div>
                <p className="text-gray-600 mb-2">{notification.message}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Pedido #{notification.orderId}
                  </span>
                  <span className="text-gray-500">
                    {formatRelativeTime(notification.createdAt)}
                  </span>
                </div>
                {!notification.isRead && (
                  <div className="mt-4">
                    <span className="text-sm text-blue-600 font-medium">
                      • No leído
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No tienes notificaciones</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;