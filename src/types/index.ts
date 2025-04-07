export type Unit = 'g' | 'oz' | 'kg' | 'pz'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category: string
  stock: number
  unit: Unit | Unit[]
  baseUnit: Unit
  imageUrl: string
  images?: string[]
  rating: number
  reviews: number
}

export interface CartItem {
  product: Product
  quantity: number
  selectedUnit: Unit
}

export interface Category {
  id: string
  name: string
  description: string
  imageUrl: string
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: Date
  images?: string[]
}

export interface User {
  id: string
  username: string
  phoneNumber: string
  password: string
  socialLink: string
  isApproved: boolean
  role: UserRole
}

export type UserRole = 'user' | 'admin' | 'staff'

export type NotificationType =
  | 'order_placed'
  | 'order_confirmed'
  | 'payment_pending'
  | 'payment_confirmed'
  | 'order_shipped'
  | 'order_delivered'
  | 'order_cancelled'
  | 'order_problem'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  orderId: string
  createdAt: Date
  isRead: boolean
}

export type OrderStatus = 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'cancelled'

export interface TrackingEvent {
  status: OrderStatus
  date: Date
  location: string
  description: string
}

export interface OrderTracking {
  number: string
  carrier: string
  events: TrackingEvent[]
}

export interface Order {
  id: string
  userId: string
  date: Date
  status: OrderStatus
  total: number
  tracking: OrderTracking
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(price)
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

export const formatRelativeTime = (date: Date): string => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'hace un momento'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`
  }

  return formatDate(date)
}

export const convertUnit = (value: number, fromUnit: Unit, toUnit: Unit): number => {
  if (fromUnit === toUnit) return value

  const toGrams = {
    g: 1,
    oz: 28.35,
    kg: 1000,
    pz: 1 // For pieces, we maintain the same value
  }

  // First convert to grams
  const inGrams = value * toGrams[fromUnit]

  // Then convert to target unit
  return inGrams / toGrams[toUnit]
}

export const formatUnit = (unit: Unit): string => {
  switch (unit) {
    case 'g':
      return 'gramos'
    case 'oz':
      return 'onzas'
    case 'kg':
      return 'kilogramos'
    case 'pz':
      return 'piezas'
    default:
      return unit
  }
}

export const getAvailableUnits = (product: Product): Unit[] => {
  return Array.isArray(product.unit) ? product.unit : [product.unit]
}

export const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case 'processing':
      return 'bg-yellow-100 text-yellow-600'
    case 'shipped':
      return 'bg-blue-100 text-blue-600'
    case 'in_transit':
      return 'bg-purple-100 text-purple-600'
    case 'delivered':
      return 'bg-green-100 text-green-600'
    case 'cancelled':
      return 'bg-red-100 text-red-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

export const getStatusText = (status: OrderStatus): string => {
  switch (status) {
    case 'processing':
      return 'En Preparación'
    case 'shipped':
      return 'Enviado'
    case 'in_transit':
      return 'En Tránsito'
    case 'delivered':
      return 'Entregado'
    case 'cancelled':
      return 'Cancelado'
    default:
      return status
  }
}
