import { FlaskRound as Flask, Flower2, Leaf, Scaling as Seedling, Shovel, Sprout, PenTool as Tool } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { RootState } from '../store/store'

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Flores':
      return <Flower2 className='w-16 h-16' />
    case 'Hortalizas':
      return <Leaf className='w-16 h-16' />
    case 'Hierbas Aromáticas':
      return <Sprout className='w-16 h-16' />
    case 'Extractos':
      return <Flask className='w-16 h-16' />
    case 'Sustratos':
      return <Shovel className='w-16 h-16' />
    case 'Accesorios':
      return <Tool className='w-16 h-16' />
    case 'Fertilizantes':
      return <Seedling className='w-16 h-16' />
    default:
      return <Leaf className='w-16 h-16' />
  }
}

const getCategoryDescription = (category: string) => {
  switch (category) {
    case 'Flores':
      return 'Descubre nuestra selección de semillas de flores para crear un jardín lleno de color y vida.'
    case 'Hortalizas':
      return 'Cultiva tus propias verduras y hortalizas frescas con nuestras semillas de alta calidad.'
    case 'Hierbas Aromáticas':
      return 'Añade sabor a tus platos con nuestras hierbas aromáticas frescas y saludables.'
    case 'Extractos':
      return 'Productos naturales concentrados para el cuidado de tu salud y bienestar.'
    case 'Sustratos':
      return 'Bases perfectas para el crecimiento saludable de tus plantas.'
    case 'Accesorios':
      return 'Todo lo que necesitas para el cuidado y mantenimiento de tu jardín.'
    case 'Fertilizantes':
      return 'Nutrientes esenciales para optimizar el crecimiento de tus plantas.'
    default:
      return 'Explora nuestra selección de productos de jardinería de alta calidad.'
  }
}

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>()
  const products = useSelector((state: RootState) =>
    state.products.items.filter((product) => product.category === decodeURIComponent(category || ''))
  )

  if (!category) {
    return <div>Categoría no encontrada</div>
  }

  const decodedCategory = decodeURIComponent(category)

  return (
    <div className='space-y-8'>
      <div className='bg-green-50 rounded-lg p-8'>
        <div className='flex items-center justify-center mb-6'>
          <div className='text-green-600'>{getCategoryIcon(decodedCategory)}</div>
        </div>
        <h1 className='text-3xl font-bold text-center mb-4'>{decodedCategory}</h1>
        <p className='text-gray-600 text-center max-w-2xl mx-auto'>{getCategoryDescription(decodedCategory)}</p>
      </div>

      <div className='container mx-auto px-4 pb-16'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold'>{products.length} productos encontrados</h2>
          <div className='flex gap-4'>
            <select className='border rounded-lg px-4 py-2'>
              <option value=''>Ordenar por</option>
              <option value='price-asc'>Precio: Menor a Mayor</option>
              <option value='price-desc'>Precio: Mayor a Menor</option>
              <option value='rating'>Mejor Valorados</option>
            </select>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-gray-600'>No se encontraron productos en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage
