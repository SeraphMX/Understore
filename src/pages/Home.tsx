import { Button, Input } from '@nextui-org/react'
import {
  ArrowLeft,
  ArrowRight,
  FlaskRound as Flask,
  Flower2,
  Leaf,
  Package,
  Search,
  Scaling as Seedling,
  ShoppingBag,
  Shovel,
  Sprout,
  PenTool as Tool
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { categories } from '../data/products'
import { RootState } from '../store/store'

const promotions = [
  {
    id: 1,
    title: '30% de descuento en Flores',
    description: 'En todas las semillas de flores durante esta semana',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946',
    link: '/categoria/Flores'
  },
  {
    id: 2,
    title: 'Nuevos Extractos Naturales',
    description: 'Descubre nuestra nueva línea de extractos orgánicos',
    image: 'https://images.unsplash.com/photo-1611073761523-8d1a35576b1e',
    link: '/categoria/Extractos'
  },
  {
    id: 3,
    title: 'Kit de Jardinería Completo',
    description: 'Todo lo que necesitas para comenzar tu jardín',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b',
    link: '/categoria/Accesorios'
  }
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Flores':
      return <Flower2 className='w-12 h-12 mb-4' />
    case 'Hortalizas':
      return <Leaf className='w-12 h-12 mb-4' />
    case 'Hierbas Aromáticas':
      return <Sprout className='w-12 h-12 mb-4' />
    case 'Extractos':
      return <Flask className='w-12 h-12 mb-4' />
    case 'Sustratos':
      return <Shovel className='w-12 h-12 mb-4' />
    case 'Accesorios':
      return <Tool className='w-12 h-12 mb-4' />
    case 'Fertilizantes':
      return <Seedling className='w-12 h-12 mb-4' />
    default:
      return <Leaf className='w-12 h-12 mb-4' />
  }
}

const Home = () => {
  const products = useSelector((state: RootState) => state.products.items)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [trackingNumber, setTrackingNumber] = useState('')
  const navigate = useNavigate()
  const featuredProducts = products.filter((product) => product.rating >= 4.7).slice(0, 4)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % promotions.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((current) => (current + 1) % promotions.length)
  }

  const prevSlide = () => {
    setCurrentSlide((current) => (current - 1 + promotions.length) % promotions.length)
  }

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingNumber.trim()) {
      navigate(`/rastrear?tracking=${trackingNumber}`)
    }
  }

  return (
    <div className='space-y-12'>
      {/* Hero Slider Section */}
      <section className='relative h-[500px] overflow-hidden rounded-2xl'>
        {promotions.map((promo, index) => (
          <div
            key={promo.id}
            className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{
              pointerEvents: index === currentSlide ? 'auto' : 'none'
            }}
          >
            <img src={promo.image} alt={promo.title} className='w-full h-full object-cover' />
            <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center'>
              <div className='text-white ml-16 max-w-xl'>
                <h2 className='text-4xl font-bold mb-4'>{promo.title}</h2>
                <p className='text-xl mb-6'>{promo.description}</p>
                <Link
                  to={promo.link}
                  className='bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center'
                >
                  Ver más
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Link>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm transition-colors'
        >
          <ArrowLeft className='h-6 w-6 text-white' />
        </button>
        <button
          onClick={nextSlide}
          className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm transition-colors'
        >
          <ArrowRight className='h-6 w-6 text-white' />
        </button>
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2'>
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Bento Grid Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Proceso de Compra */}
        <div className='bg-gradient-to-br from-amber-50 to-orange-100 p-8 rounded-2xl'>
          <ShoppingBag className='w-12 h-12 text-orange-600 mb-4' />
          <h3 className='text-2xl font-bold mb-3'>Proceso de Compra</h3>
          <ol className='space-y-2 text-gray-600'>
            <li className='flex items-center'>
              <span className='w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center mr-2 text-sm'>1</span>
              Selecciona tus productos
            </li>
            <li className='flex items-center'>
              <span className='w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center mr-2 text-sm'>2</span>
              Agrega al carrito
            </li>
            <li className='flex items-center'>
              <span className='w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center mr-2 text-sm'>3</span>
              Completa tu compra
            </li>
          </ol>
        </div>

        {/* Track Order */}
        <div className='bg-gradient-to-br from-purple-50 to-indigo-100 p-8 rounded-2xl'>
          <Package className='w-12 h-12 text-purple-600 mb-4' />
          <h3 className='text-2xl font-bold mb-4'>Rastrear Pedido</h3>
          <form onSubmit={handleTrackOrder} className='space-y-4'>
            <Input
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder='Número de rastreo'
              startContent={<Search className='text-gray-400' />}
            />
            <Button type='submit' color='primary' className='w-full bg-purple-600 hover:bg-purple-700'>
              Rastrear
            </Button>
          </form>
        </div>

        {/* Búsqueda de Productos */}
        <Link
          to='/productos'
          className='bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl hover:shadow-lg transition-shadow group'
        >
          <Search className='w-12 h-12 text-green-600 mb-4' />
          <h3 className='text-2xl font-bold mb-3'>Buscar Productos</h3>
          <p className='text-gray-600 mb-4'>Explora nuestro catálogo completo de productos para tu jardín</p>
          <span className='text-green-600 font-medium group-hover:underline'>Explorar catálogo →</span>
        </Link>
      </div>

      {/* Featured Products Section */}
      <section>
        <h2 className='text-2xl font-bold mb-6'>Productos Destacados</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className='py-8'>
        <h2 className='text-2xl font-bold mb-8'>Explora Nuestras Categorías</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {categories.map((category) => (
            <Link
              key={category}
              to={`/categoria/${encodeURIComponent(category)}`}
              className='bg-white rounded-lg p-6 text-center transition-transform hover:scale-105 hover:shadow-lg'
            >
              <div className='flex flex-col items-center'>
                {getCategoryIcon(category)}
                <h3 className='text-lg font-semibold text-gray-800 mb-2'>{category}</h3>
                <p className='text-sm text-gray-600'>{products.filter((p) => p.category === category).length} productos</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
