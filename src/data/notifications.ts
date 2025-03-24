import { Notification } from '../types';

export const notifications: Notification[] = [
  {
    id: '1',
    type: 'order_placed',
    title: 'Pedido Recibido',
    message: 'Tu pedido #ORD-2024-001 ha sido recibido y está siendo procesado.',
    orderId: 'ORD-2024-001',
    createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    isRead: false
  },
  {
    id: '2',
    type: 'payment_pending',
    title: 'Pago Pendiente',
    message: 'El pago para tu pedido #ORD-2024-001 está pendiente. Por favor, completa el pago para procesar tu pedido.',
    orderId: 'ORD-2024-001',
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    isRead: false
  },
  {
    id: '3',
    type: 'order_shipped',
    title: 'Pedido Enviado',
    message: 'Tu pedido #ORD-2024-002 ha sido enviado. Puedes rastrear tu envío con el número de seguimiento proporcionado.',
    orderId: 'ORD-2024-002',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: true
  },
  {
    id: '4',
    type: 'order_delivered',
    title: 'Pedido Entregado',
    message: 'Tu pedido #ORD-2024-003 ha sido entregado. ¡Gracias por tu compra!',
    orderId: 'ORD-2024-003',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true
  },
  {
    id: '5',
    type: 'order_problem',
    title: 'Problema con el Pedido',
    message: 'Hemos detectado un problema con tu pedido #ORD-2024-004. Por favor, contáctanos para más información.',
    orderId: 'ORD-2024-004',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isRead: false
  }
];