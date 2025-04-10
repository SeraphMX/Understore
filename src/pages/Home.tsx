import { Button, Card, CardBody, Image, Input } from '@nextui-org/react'
import { ArrowLeft, ArrowRight, Package, Search, ShoppingBag } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import ProductCard from '../components/ProductCard'
import { categories } from '../data/products'
import { RootState } from '../store/store'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'

const promotions = [
  {
    id: 1,
    title: '30% de descuento en Flores',
    description: 'En compras mayores a una libra',
    image: '/banners/banner-weed.webp',
    link: '/categoria/Flores'
  },
  {
    id: 2,
    title: 'Nuevas semillas',
    description: 'Descubre nuestra nueva colección de semillas de cannabis',
    image: '/banners/banner-seeds.webp',
    link: '/categoria/Extractos'
  },
  {
    id: 3,
    title: 'Extractos de alta calidad',
    description: 'Conoce algunos de los mejores extractos del mercado',
    image: '/banners/banner-concentrates.webp',
    link: '/categoria/Accesorios'
  }
]

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
    <div className='space-y-8'>
      {/* Hero Slider Section */}
      <section className='relative h-[500px] overflow-hidden'>
        {promotions.map((promo, index) => (
          <div
            key={promo.id}
            className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{
              pointerEvents: index === currentSlide ? 'auto' : 'none'
            }}
          >
            <img src={promo.image} alt={promo.title} className='w-full h-full object-cover' />
            <div className='absolute inset-0'>
              <div className='text-white p-4 pb-10 md:pl-20 w-full h-full bg-gradient-to-t from-black/80 to-transparent flex flex-col items-start justify-end'>
                <h2 className='text-2xl md:text-4xl font-bold mb-4'>{promo.title}</h2>
                <p className='text-lg md:text-xl mb-6'>{promo.description}</p>
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

      <div className='container mx-auto px-4'>
        {/* Bento Grid Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8'>
          {/* Proceso de Compra */}
          <div className='bg-gradient-to-br from-amber-50 to-orange-100 p-8 rounded-2xl'>
            <ShoppingBag className='w-12 h-12 text-orange-600 mb-4' />
            <h3 className='text-2xl font-bold mb-3'>¿Como comprar?</h3>
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
        </div>
        {/* Featured Products Section */}
        <section className='py-8'>
          <h2 className='text-2xl font-bold mb-8 px-8'>Productos Destacados</h2>
          {/* Mobile Featured Products Carousel */}
          <div className='md:hidden'>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={16}
              slidesPerView={1.2}
              centeredSlides={true}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false
              }}
              className='pb-10'
            >
              {featuredProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className='px-2'>
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Desktop Featured Products Grid */}
          <div className='hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 px-8'>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        {/* Categories Section */}
        <section className='py-8'>
          <h2 className='text-2xl font-bold mb-8 px-8'>Explora Nuestras Categorías</h2>
          {/* Mobile Categories Carousel */}
          <div className='md:hidden'>
            <Swiper
              modules={[Pagination]}
              spaceBetween={16}
              slidesPerView={1.2}
              centeredSlides={true}
              pagination={{ clickable: true }}
              className='pb-10'
            >
              {categories.map((category) => (
                <SwiperSlide key={category.name}>
                  <Link to={`/categoria/${category.name}`} className='block'>
                    <Card className='border border-transparent hover:border-primary/50 transition-colors'>
                      <CardBody className='p-0'>
                        <div className='relative aspect-square'>
                          <Image removeWrapper alt={category.name} className='object-cover w-full h-full' src={category.image} />
                          <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 z-10 flex-col justify-end'>
                            <h3 className='text-white font-semibold text-2xl'>{category.name}</h3>
                            <p className='text-sm text-gray-300'>{products.filter((p) => p.category === category.name).length} productos</p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Desktop Categories Grid */}
          <div className='hidden md:grid grid-cols-3 lg:grid-cols-4 gap-6 p-8'>
            {categories.map((category) => (
              <Link key={category.name} to={`/categoria/${category.name}`} className='transition-transform hover:scale-105 hover:shadow-lg'>
                <Card className='border border-transparent hover:border-primary/50 transition-colors'>
                  <CardBody className='p-0'>
                    <div className='relative aspect-square'>
                      <Image removeWrapper alt={category.name} className='object-cover w-full h-full' src={category.image} />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 z-10 flex-col justify-end'>
                        <h3 className='text-white font-semibold text-2xl'>{category.name}</h3>
                        <p className='text-sm text-gray-300'>{products.filter((p) => p.category === category.name).length} productos</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
