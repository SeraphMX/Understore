import { Review } from '../types';

export const reviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: '1',
    userName: 'María García',
    rating: 5,
    comment: 'Excelentes semillas de lavanda. Germinaron rápidamente y las plantas son muy aromáticas.',
    createdAt: new Date('2024-02-15'),
    images: [
      'https://images.unsplash.com/photo-1595159102181-86304d9d5903',
      'https://images.unsplash.com/photo-1595159102181-86304d9d5904'
    ]
  },
  {
    id: '2',
    productId: '1',
    userId: '2',
    userName: 'Juan Pérez',
    rating: 4,
    comment: 'Buena calidad de semillas, aunque tardaron un poco más de lo esperado en germinar.',
    createdAt: new Date('2024-02-10')
  },
  {
    id: '3',
    productId: '1',
    userId: '3',
    userName: 'Ana Martínez',
    rating: 5,
    comment: 'Las plantas crecieron muy bien y el aroma es increíble. Definitivamente compraré más.',
    createdAt: new Date('2024-02-05'),
    images: [
      'https://images.unsplash.com/photo-1595159102181-86304d9d5905'
    ]
  }
];

export const getProductReviews = (productId: string): Review[] => {
  return reviews.filter(review => review.productId === productId);
};