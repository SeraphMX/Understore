import { Order, OrderStatus } from '../types';

export const orders: Order[] = [
  {
    id: 'ORD-2024-001',
    userId: '1',
    date: new Date('2024-02-20'),
    status: 'delivered',
    total: 1299.99,
    tracking: {
      number: 'TRK123456789',
      carrier: 'DHL',
      events: [
        {
          status: 'delivered',
          date: new Date('2024-02-20T14:30:00'),
          location: 'Ciudad de México, CDMX',
          description: 'Paquete entregado al destinatario'
        },
        {
          status: 'in_transit',
          date: new Date('2024-02-20T09:15:00'),
          location: 'Ciudad de México, CDMX',
          description: 'En ruta para entrega'
        },
        {
          status: 'in_transit',
          date: new Date('2024-02-19T18:30:00'),
          location: 'Querétaro, QRO',
          description: 'Paquete en centro de distribución'
        },
        {
          status: 'shipped',
          date: new Date('2024-02-18T15:45:00'),
          location: 'Guadalajara, JAL',
          description: 'Paquete enviado'
        },
        {
          status: 'processing',
          date: new Date('2024-02-17T10:00:00'),
          location: 'Guadalajara, JAL',
          description: 'Pedido en preparación'
        }
      ]
    }
  },
  {
    id: 'ORD-2024-002',
    userId: '1',
    date: new Date('2024-02-15'),
    status: 'in_transit',
    total: 899.50,
    tracking: {
      number: 'TRK987654321',
      carrier: 'FedEx',
      events: [
        {
          status: 'in_transit',
          date: new Date('2024-02-16T13:20:00'),
          location: 'Monterrey, NL',
          description: 'En tránsito al destino'
        },
        {
          status: 'shipped',
          date: new Date('2024-02-15T16:45:00'),
          location: 'Guadalajara, JAL',
          description: 'Paquete enviado'
        },
        {
          status: 'processing',
          date: new Date('2024-02-15T09:30:00'),
          location: 'Guadalajara, JAL',
          description: 'Pedido en preparación'
        }
      ]
    }
  },
  {
    id: 'ORD-2024-003',
    userId: '2',
    date: new Date('2024-02-10'),
    status: 'processing',
    total: 459.99,
    tracking: {
      number: 'TRK456789123',
      carrier: 'DHL',
      events: [
        {
          status: 'processing',
          date: new Date('2024-02-10T11:15:00'),
          location: 'Guadalajara, JAL',
          description: 'Pedido en preparación'
        }
      ]
    }
  }
];

export const findOrder = (orderId: string): Order | undefined => {
  return orders.find(order => order.id === orderId);
};

export const findOrderByTrackingNumber = (trackingNumber: string): Order | undefined => {
  return orders.find(order => order.tracking.number === trackingNumber);
};