import { Product, Unit } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Semillas de Lavanda',
    description: 'Semillas de lavanda francesa, perfectas para jardines aromáticos',
    price: 3.99,
    category: 'Flores',
    stock: 100,
    unit: ['g', 'oz', 'kg'],
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1595159102181-86304d9d5903',
    images: [
      'https://images.unsplash.com/photo-1595159102181-86304d9d5903',
      'https://images.unsplash.com/photo-1595159102181-86304d9d5904',
      'https://images.unsplash.com/photo-1595159102181-86304d9d5905',
      'https://images.unsplash.com/photo-1595159102181-86304d9d5906'
    ],
    rating: 4.8,
    reviews: 42
  },
  {
    id: '2',
    name: 'Semillas de Girasol',
    description: 'Girasoles gigantes, ideales para jardines ornamentales',
    price: 4.50,
    category: 'Flores',
    stock: 150,
    unit: ['g', 'oz'],
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651',
    images: [
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651',
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2652',
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2653'
    ],
    rating: 4.7,
    reviews: 38
  },
  {
    id: '3',
    name: 'Semillas de Rosa',
    description: 'Rosas híbridas de té, variedad premium',
    price: 6.99,
    category: 'Flores',
    stock: 80,
    unit: 'pz',
    baseUnit: 'pz',
    imageUrl: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322',
    images: [
      'https://images.unsplash.com/photo-1496062031456-07b8f162a322',
      'https://images.unsplash.com/photo-1496062031456-07b8f162a323',
      'https://images.unsplash.com/photo-1496062031456-07b8f162a324'
    ],
    rating: 4.9,
    reviews: 55
  },
  {
    id: '4',
    name: 'Semillas de Margarita',
    description: 'Margaritas blancas, perfectas para borduras',
    price: 3.50,
    category: 'Flores',
    stock: 120,
    unit: ['g', 'oz'],
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1560790671-b76ca4de55ef',
    images: [
      'https://images.unsplash.com/photo-1560790671-b76ca4de55ef',
      'https://images.unsplash.com/photo-1560790671-b76ca4de55eg',
      'https://images.unsplash.com/photo-1560790671-b76ca4de55eh'
    ],
    rating: 4.5,
    reviews: 29
  },
  {
    id: '5',
    name: 'Semillas de Dalia',
    description: 'Dalias variadas de colores brillantes',
    price: 5.99,
    category: 'Flores',
    stock: 90,
    unit: ['g', 'oz', 'kg'],
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1595178302776-fa04e6d45957',
    images: [
      'https://images.unsplash.com/photo-1595178302776-fa04e6d45957',
      'https://images.unsplash.com/photo-1595178302776-fa04e6d45958',
      'https://images.unsplash.com/photo-1595178302776-fa04e6d45959'
    ],
    rating: 4.6,
    reviews: 31
  },
  {
    id: '6',
    name: 'Tomate Cherry',
    description: 'Variedad dulce y productiva',
    price: 4.99,
    category: 'Hortalizas',
    stock: 200,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1566055809641-b834dd267da7',
    images: [
      'https://images.unsplash.com/photo-1566055809641-b834dd267da7',
      'https://images.unsplash.com/photo-1566055809641-b834dd267da8',
      'https://images.unsplash.com/photo-1566055809641-b834dd267da9'
    ],
    rating: 4.8,
    reviews: 65
  },
  {
    id: '7',
    name: 'Pimiento Californiano',
    description: 'Pimientos dulces multicolor',
    price: 4.50,
    category: 'Hortalizas',
    stock: 150,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83',
    images: [
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83',
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa84',
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa85'
    ],
    rating: 4.7,
    reviews: 48
  },
  {
    id: '8',
    name: 'Zanahoria Nantesa',
    description: 'Zanahorias dulces y crujientes',
    price: 3.99,
    category: 'Hortalizas',
    stock: 180,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
    images: [
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da38',
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da39'
    ],
    rating: 4.6,
    reviews: 42
  },
  {
    id: '9',
    name: 'Lechuga Romana',
    description: 'Lechuga crujiente y sabrosa',
    price: 3.50,
    category: 'Hortalizas',
    stock: 160,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1622205313162-be1d5712a43c',
    images: [
      'https://images.unsplash.com/photo-1622205313162-be1d5712a43c',
      'https://images.unsplash.com/photo-1622205313162-be1d5712a43d',
      'https://images.unsplash.com/photo-1622205313162-be1d5712a43e'
    ],
    rating: 4.5,
    reviews: 36
  },
  {
    id: '10',
    name: 'Espinaca Baby',
    description: 'Espinacas tiernas de hoja pequeña',
    price: 4.25,
    category: 'Hortalizas',
    stock: 140,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
    images: [
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
      'https://images.unsplash.com/photo-1576045057995-568f588f82fc',
      'https://images.unsplash.com/photo-1576045057995-568f588f82fd'
    ],
    rating: 4.7,
    reviews: 44
  },
  {
    id: '11',
    name: 'Albahaca Genovesa',
    description: 'Albahaca italiana tradicional',
    price: 3.99,
    category: 'Hierbas Aromáticas',
    stock: 120,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a',
    images: [
      'https://images.unsplash.com/photo-1618164435735-413d3b066c9a',
      'https://images.unsplash.com/photo-1618164435735-413d3b066c9b',
      'https://images.unsplash.com/photo-1618164435735-413d3b066c9c'
    ],
    rating: 4.8,
    reviews: 58
  },
  {
    id: '12',
    name: 'Menta Piperita',
    description: 'Menta aromática y refrescante',
    price: 3.75,
    category: 'Hierbas Aromáticas',
    stock: 100,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b7',
    images: [
      'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b7',
      'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b8',
      'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b9'
    ],
    rating: 4.6,
    reviews: 39
  },
  {
    id: '13',
    name: 'Cilantro',
    description: 'Cilantro fresco y aromático',
    price: 3.50,
    category: 'Hierbas Aromáticas',
    stock: 130,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1611174797136-5b5f33929d57',
    images: [
      'https://images.unsplash.com/photo-1611174797136-5b5f33929d57',
      'https://images.unsplash.com/photo-1611174797136-5b5f33929d58',
      'https://images.unsplash.com/photo-1611174797136-5b5f33929d59'
    ],
    rating: 4.5,
    reviews: 41
  },
  {
    id: '14',
    name: 'Orégano',
    description: 'Orégano mediterráneo',
    price: 3.99,
    category: 'Hierbas Aromáticas',
    stock: 110,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1638334188873-f1108e127760',
    images: [
      'https://images.unsplash.com/photo-1638334188873-f1108e127760',
      'https://images.unsplash.com/photo-1638334188873-f1108e127761',
      'https://images.unsplash.com/photo-1638334188873-f1108e127762'
    ],
    rating: 4.7,
    reviews: 45
  },
  {
    id: '15',
    name: 'Extracto de Aloe Vera',
    description: 'Extracto natural 100% puro',
    price: 12.99,
    category: 'Extractos',
    stock: 50,
    unit: 'oz',
    baseUnit: 'oz',
    imageUrl: 'https://images.unsplash.com/photo-1596276020587-8044fe049813',
    images: [
      'https://images.unsplash.com/photo-1596276020587-8044fe049813',
      'https://images.unsplash.com/photo-1596276020587-8044fe049814',
      'https://images.unsplash.com/photo-1596276020587-8044fe049815'
    ],
    rating: 4.9,
    reviews: 72
  },
  {
    id: '16',
    name: 'Aceite de Lavanda',
    description: 'Aceite esencial puro de lavanda',
    price: 15.99,
    category: 'Extractos',
    stock: 40,
    unit: 'oz',
    baseUnit: 'oz',
    imageUrl: 'https://images.unsplash.com/photo-1611073761523-8d1a35576b1e',
    images: [
      'https://images.unsplash.com/photo-1611073761523-8d1a35576b1e',
      'https://images.unsplash.com/photo-1611073761523-8d1a35576b1f',
      'https://images.unsplash.com/photo-1611073761523-8d1a35576b1g'
    ],
    rating: 4.8,
    reviews: 65
  },
  {
    id: '17',
    name: 'Extracto de Manzanilla',
    description: 'Extracto calmante natural',
    price: 11.99,
    category: 'Extractos',
    stock: 45,
    unit: 'oz',
    baseUnit: 'oz',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5',
    images: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb6',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb7'
    ],
    rating: 4.7,
    reviews: 58
  },
  {
    id: '18',
    name: 'Aceite de Romero',
    description: 'Aceite esencial concentrado',
    price: 14.99,
    category: 'Extractos',
    stock: 35,
    unit: 'oz',
    baseUnit: 'oz',
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108',
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8109',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8110'
    ],
    rating: 4.8,
    reviews: 61
  },
  {
    id: '19',
    name: 'Sustrato Universal',
    description: 'Mezcla premium para todo tipo de plantas',
    price: 8.99,
    category: 'Sustratos',
    stock: 200,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1628626126093-97c2d1d4fd6d',
    images: [
      'https://images.unsplash.com/photo-1628626126093-97c2d1d4fd6d',
      'https://images.unsplash.com/photo-1628626126093-97c2d1d4fd6e',
      'https://images.unsplash.com/photo-1628626126093-97c2d1d4fd6f'
    ],
    rating: 4.6,
    reviews: 85
  },
  {
    id: '20',
    name: 'Sustrato para Cactus',
    description: 'Mezcla especial bien drenante',
    price: 9.99,
    category: 'Sustratos',
    stock: 150,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a',
    images: [
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a',
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2b',
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2c'
    ],
    rating: 4.7,
    reviews: 73
  },
  {
    id: '21',
    name: 'Fibra de Coco',
    description: 'Sustrato 100% natural de coco',
    price: 7.99,
    category: 'Sustratos',
    stock: 180,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1628744404730-5e143358539b',
    images: [
      'https://images.unsplash.com/photo-1628744404730-5e143358539b',
      'https://images.unsplash.com/photo-1628744404730-5e143358539c',
      'https://images.unsplash.com/photo-1628744404730-5e143358539d'
    ],
    rating: 4.5,
    reviews: 67
  },
  {
    id: '22',
    name: 'Sustrato para Orquídeas',
    description: 'Mezcla especial para orquídeas',
    price: 11.99,
    category: 'Sustratos',
    stock: 120,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1624517607896-f35aa315a552',
    images: [
      'https://images.unsplash.com/photo-1624517607896-f35aa315a552',
      'https://images.unsplash.com/photo-1624517607896-f35aa315a553',
      'https://images.unsplash.com/photo-1624517607896-f35aa315a554'
    ],
    rating: 4.8,
    reviews: 91
  },
  {
    id: '23',
    name: 'Kit de Jardinería',
    description: 'Set completo de herramientas básicas',
    price: 24.99,
    category: 'Accesorios',
    stock: 50,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3aa',
    images: [
      'https://images.unsplash.com/photo-1617576683096-00fc8eecb3aa',
      'https://images.unsplash.com/photo-1617576683096-00fc8eecb3ab',
      'https://images.unsplash.com/photo-1617576683096-00fc8eecb3ac'
    ],
    rating: 4.8,
    reviews: 112
  },
  {
    id: '24',
    name: 'Macetas Biodegradables',
    description: 'Pack de 10 macetas ecológicas',
    price: 6.99,
    category: 'Accesorios',
    stock: 200,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea',
    images: [
      'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea',
      'https://images.unsplash.com/photo-1622383563227-04401ab4e5eb',
      'https://images.unsplash.com/photo-1622383563227-04401ab4e5ec'
    ],
    rating: 4.6,
    reviews: 87
  },
  {
    id: '25',
    name: 'Regadera 2L',
    description: 'Regadera de diseño ergonómico',
    price: 15.99,
    category: 'Accesorios',
    stock: 60,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea',
    images: [
      'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea',
      'https://images.unsplash.com/photo-1622383563227-04401ab4e5eb',
      'https://images.unsplash.com/photo-1622383563227-04401ab4e5ec'
    ],
    rating: 4.7,
    reviews: 94
  },
  {
    id: '26',
    name: 'Tijeras de Podar',
    description: 'Tijeras profesionales de acero inoxidable',
    price: 19.99,
    category: 'Accesorios',
    stock: 70,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1620283085068-5aab84e2db8e',
    images: [
      'https://images.unsplash.com/photo-1620283085068-5aab84e2db8e',
      'https://images.unsplash.com/photo-1620283085068-5aab84e2db8f',
      'https://images.unsplash.com/photo-1620283085068-5aab84e2db8g'
    ],
    rating: 4.9,
    reviews: 128
  },
  {
    id: '27',
    name: 'Fertilizante Universal',
    description: 'Nutrientes completos para todo tipo de plantas',
    price: 12.99,
    category: 'Fertilizantes',
    stock: 100,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1628744404730-5e143358539b',
    images: [
      'https://images.unsplash.com/photo-1628744404730-5e143358539b',
      'https://images.unsplash.com/photo-1628744404730-5e143358539c',
      'https://images.unsplash.com/photo-1628744404730-5e143358539d'
    ],
    rating: 4.7,
    reviews: 156
  },
  {
    id: '28',
    name: 'Abono Orgánico',
    description: 'Compost natural certificado',
    price: 8.99,
    category: 'Fertilizantes',
    stock: 150,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1624517607896-f35aa315a552',
    images: [
      'https://images.unsplash.com/photo-1624517607896-f35aa315a552',
      'https://images.unsplash.com/photo-1624517607896-f35aa315a553',
      'https://images.unsplash.com/photo-1624517607896-f35aa315a554'
    ],
    rating: 4.6,
    reviews: 143
  },
  {
    id: '29',
    name: 'Fertilizante para Flores',
    description: 'Especial para plantas florecientes',
    price: 13.99,
    category: 'Fertilizantes',
    stock: 80,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea',
    images: [
      'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea',
      'https://images.unsplash.com/photo-1622383563227-04401ab4e5eb',
      'https://images.unsplash.com/photo-1622383563227-04401ab4e5ec'
    ],
    rating: 4.8,
    reviews: 167
  },
  {
    id: '30',
    name: 'Humus de Lombriz',
    description: 'Fertilizante natural de alta calidad',
    price: 10.99,
    category: 'Fertilizantes',
    stock: 120,
    unit: 'g',
    baseUnit: 'g',
    imageUrl: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3aa',
    images: [
      'https://images.unsplash.com/photo-1617576683096-00fc8eecb3aa',
      'https://images.unsplash.com/photo-1617576683096-00fc8eecb3ab',
      'https://images.unsplash.com/photo-1617576683096-00fc8eecb3ac'
    ],
    rating: 4.7,
    reviews: 134
  }
];

export const categories = [
  'Flores',
  'Hortalizas',
  'Hierbas Aromáticas',
  'Extractos',
  'Sustratos',
  'Accesorios',
  'Fertilizantes'
];