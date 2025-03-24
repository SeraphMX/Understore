import React from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { Tabs, Tab, Avatar, Badge } from '@nextui-org/react';
import { 
  User, 
  Heart, 
  Package, 
  Bell, 
  MessageSquare, 
  Settings,
  MapPin,
  Calendar,
  Trophy,
  Star,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Truck
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { notifications } from '../data/notifications';
import { formatRelativeTime } from '../types';

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get the active tab from URL query parameter or default to "overview"
  const activeTab = searchParams.get('tab') || 'overview';

  // Mock data - Replace with actual data from your backend
  const userPoints = 150;
  const userLevel = "Nuevo Sobrino";
  const joinDate = new Date('2024-01-15');
  const shippingAddresses = [
    {
      id: '1',
      street: 'Calle Principal 123',
      colony: 'Centro',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '12345',
      isDefault: true
    }
  ];
  const medals = [
    { id: '1', name: 'Primera Compra', icon: <Star className="w-6 h-6" />, description: 'Realizaste tu primera compra' },
    { id: '2', name: 'Comprador Frecuente', icon: <Trophy className="w-6 h-6" />, description: '5 compras realizadas' }
  ];
  const orders = [
    { 
      id: 'ORD-2024-001', 
      date: new Date('2024-02-20'), 
      status: 'Entregado',
      total: 1299.99
    }
  ];
  const messages = [
    {
      id: '1',
      from: 'Soporte',
      subject: 'Bienvenido a SemillasShop',
      preview: '¡Gracias por unirte a nuestra comunidad!',
      date: new Date('2024-02-15'),
      unread: true
    }
  ];

  const handleTabChange = (key: React.Key) => {
    // Update URL when tab changes
    if (key === 'overview') {
      navigate('/perfil');
    } else {
      navigate(`/perfil?tab=${key}`);
    }
  };

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
        return <Bell className="w-6 h-6" />;
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

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-start gap-6">
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            className="w-24 h-24"
          />
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">{user?.username}</h1>
              <Badge content={userPoints} color="success">
                <span className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {userLevel}
                </span>
              </Badge>
            </div>
            <p className="text-gray-600 mt-1">Miembro desde {joinDate.toLocaleDateString()}</p>
            <div className="flex items-center gap-2 mt-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>Ciudad de México, México</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs 
        aria-label="Profile sections"
        color="success"
        variant="underlined"
        selectedKey={activeTab}
        onSelectionChange={handleTabChange}
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-green-500",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-green-500"
        }}
      >
        {/* Overview Tab */}
        <Tab
          key="overview"
          title={
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>General</span>
            </div>
          }
        >
          <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Acerca de</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Miembro desde</p>
                    <p className="font-medium">{joinDate.toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Nivel</p>
                    <p className="font-medium">{userLevel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Puntos</p>
                    <p className="font-medium">{userPoints} puntos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Addresses */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Direcciones de Envío</h3>
              <div className="space-y-4">
                {shippingAddresses.map(address => (
                  <div key={address.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{address.street}</p>
                        <p className="text-gray-600">{address.colony}</p>
                        <p className="text-gray-600">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                      </div>
                      {address.isDefault && (
                        <Badge color="success" variant="flat">
                          Principal
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                  + Agregar nueva dirección
                </button>
              </div>
            </div>

            {/* Medals Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Medallas</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {medals.map(medal => (
                  <div key={medal.id} className="text-center">
                    <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 text-green-600">
                      {medal.icon}
                    </div>
                    <p className="font-medium">{medal.name}</p>
                    <p className="text-sm text-gray-600">{medal.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Tab>

        {/* Orders Tab */}
        <Tab
          key="orders"
          title={
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>Pedidos</span>
            </div>
          }
        >
          <div className="py-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Historial de Pedidos</h3>
                {orders.map(order => (
                  <div key={order.id} className="border-b last:border-b-0 pb-4 mb-4 last:pb-0 last:mb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-600">
                          {order.date.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge color="success" variant="flat">
                          {order.status}
                        </Badge>
                        <p className="font-medium mt-1">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Tab>

        {/* Favorites Tab */}
        <Tab
          key="favorites"
          title={
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Favoritos</span>
            </div>
          }
        >
          <div className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
              {favorites.length === 0 && (
                <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No tienes productos favoritos aún</p>
                </div>
              )}
            </div>
          </div>
        </Tab>

        {/* Notifications Tab */}
        <Tab
          key="notifications"
          title={
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span>Notificaciones</span>
            </div>
          }
        >
          <div className="py-6">
            <div className="space-y-4">
              {notifications.map((notification) => (
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
                        <Badge
                          className={getNotificationColor(notification.type)}
                          variant="flat"
                          size="sm"
                        >
                          {getNotificationStatus(notification.type)}
                        </Badge>
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
        </Tab>

        {/* Messages Tab */}
        <Tab
          key="messages"
          title={
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Mensajes</span>
            </div>
          }
        >
          <div className="py-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {messages.map(message => (
                <div key={message.id} className="p-4 border-b last:border-b-0 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{message.from}</p>
                        {message.unread && (
                          <Badge color="danger" variant="flat" size="sm">
                            Nuevo
                          </Badge>
                        )}
                      </div>
                      <p className="font-medium text-gray-900">{message.subject}</p>
                      <p className="text-gray-600">{message.preview}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {message.date.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Tab>

        {/* Settings Tab */}
        <Tab
          key="settings"
          title={
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span>Configuración</span>
            </div>
          }
        >
          <div className="py-6">
            {/* Settings content */}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile;