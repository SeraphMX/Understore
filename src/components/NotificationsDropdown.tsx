import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Badge
} from '@nextui-org/react';
import { Bell, Package, CreditCard, AlertTriangle, CheckCircle2, Truck } from 'lucide-react';
import { Notification, NotificationType, formatRelativeTime } from '../types';
import { notifications } from '../data/notifications';

interface NotificationsDropdownProps {
  onNotificationClick?: (notification: Notification) => void;
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'order_placed':
    case 'order_confirmed':
      return <Package className="w-4 h-4" />;
    case 'payment_pending':
    case 'payment_confirmed':
      return <CreditCard className="w-4 h-4" />;
    case 'order_shipped':
      return <Truck className="w-4 h-4" />;
    case 'order_delivered':
      return <CheckCircle2 className="w-4 h-4" />;
    case 'order_problem':
    case 'order_cancelled':
      return <AlertTriangle className="w-4 h-4" />;
    default:
      return <Bell className="w-4 h-4" />;
  }
};

const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case 'order_placed':
    case 'order_confirmed':
      return 'text-blue-600';
    case 'payment_pending':
      return 'text-yellow-600';
    case 'payment_confirmed':
    case 'order_delivered':
      return 'text-green-600';
    case 'order_shipped':
      return 'text-purple-600';
    case 'order_problem':
    case 'order_cancelled':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ onNotificationClick }) => {
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="hover:text-green-200">
          <Badge
            content={unreadCount}
            color="danger"
            size="sm"
            className="text-tiny"
            isInvisible={unreadCount === 0}
          >
            <Bell className="h-6 w-6" />
          </Badge>
        </button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Notificaciones"
        className="w-[340px]"
        itemClasses={{
          base: "py-3 px-2",
          title: "font-semibold text-base",
          description: "text-sm text-gray-600"
        }}
      >
        {notifications.length === 0 ? (
          <DropdownItem>
            <div className="text-center py-4 text-gray-500">
              No hay notificaciones
            </div>
          </DropdownItem>
        ) : (
          <>
            {notifications.slice(0, 3).map((notification) => (
              <DropdownItem
                key={notification.id}
                className={!notification.isRead ? 'bg-blue-50' : ''}
                onClick={() => onNotificationClick?.(notification)}
                startContent={
                  <div className={`mt-1 ${getNotificationColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                }
                title={notification.title}
                description={
                  <div className="flex flex-col gap-1">
                    <p className="line-clamp-2">{notification.message}</p>
                    <span className="text-xs text-gray-400">
                      {formatRelativeTime(notification.createdAt)}
                    </span>
                  </div>
                }
              />
            ))}
            <DropdownItem
              className="border-t"
              onClick={() => navigate('/perfil?tab=notifications')}
            >
              <span className="w-full text-center text-sm text-blue-600">
                Ver todas las notificaciones
              </span>
            </DropdownItem>
          </>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default NotificationsDropdown;