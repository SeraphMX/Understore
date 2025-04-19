import { Button, Select, SelectItem, Slider } from '@nextui-org/react'
import { Filter, Search, SortAsc, X } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import { setCategory, setSearchQuery } from '../store/slices/productsSlice'
import { RootState } from '../store/store'

const INITIAL_LOAD = 12
const LOAD_MORE = 8

const ProductList = () => {
  const dispatch = useDispatch()
  const { items, filteredItems, selectedCategory, searchQuery } = useSelector((state: RootState) => state.products)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [visibleProducts, setVisibleProducts] = useState<number>(INITIAL_LOAD)
  const [sortOrder, setSortOrder] = useState<string>('default')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const categories = Array.from(new Set(items.map((product) => product.category)))
  const displayedProducts = filteredItems.length > 0 ? filteredItems : items

  // Sorting logic
  const sortedProducts = [...displayedProducts].sort((a, b) => {
    switch (sortOrder) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value))
  }

  const handleCategoryChange = (category: string | null) => {
    dispatch(setCategory(category))
    setIsFilterOpen(false)
  }

  // Infinite scroll implementation
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && visibleProducts < sortedProducts.length) {
        setVisibleProducts((prev) => Math.min(prev + LOAD_MORE, sortedProducts.length))
      }
    },
    [visibleProducts, sortedProducts.length]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 0.1
    })

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [handleObserver])

  // Prevent body scroll when filter menu is open
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isFilterOpen])

  const FiltersContent = () => (
    <div className='mb-6'>
      <h3 className='font-semibold mb-3 flex items-center'>
        <Filter className='w-4 h-4 mr-2' />
        Filtros
      </h3>
      <div className='space-y-4'>
        <div>
          <h4 className='text-sm font-medium mb-2'>Categorías</h4>
          <div className='space-y-2'>
            <button
              onClick={() => handleCategoryChange(null)}
              className={`block w-full text-left px-2 py-1 rounded ${
                !selectedCategory ? 'bg-green-50 text-green-600' : 'hover:bg-gray-50'
              }`}
            >
              Todas
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`block w-full text-left px-2 py-1 rounded ${
                  selectedCategory === category ? 'bg-green-50 text-green-600' : 'hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className='text-sm font-medium mb-2'>Precio</h4>
          <div className='space-y-4'>
            <Slider
              label='Rango de precio'
              step={1}
              minValue={0}
              maxValue={1000}
              value={priceRange}
              onChange={(value) => {
                if (Array.isArray(value)) {
                  setPriceRange(value as [number, number])
                }
              }}
              className='max-w-md'
              showSteps={true}
              formatOptions={{ style: 'currency', currency: 'MXN' }}
            />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className='flex gap-6 container mx-auto px-4 py-8'>
      {/* Desktop Filters Sidebar */}
      <div className='hidden md:block w-64 bg-white p-4 rounded-lg shadow-md h-fit sticky top-24'>
        <FiltersContent />
      </div>

      {/* Mobile Filters Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden transition-opacity duration-300 ${
          isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsFilterOpen(false)}
      />

      {/* Mobile Filters Slide-in Panel */}
      <div
        className={`fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isFilterOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='p-4'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-bold'>Filtros</h2>
            <button onClick={() => setIsFilterOpen(false)} className='p-2 hover:bg-gray-100 rounded-full'>
              <X className='w-6 h-6' />
            </button>
          </div>
          <FiltersContent />
        </div>
      </div>

      {/* Products Grid */}
      <div className='flex-1'>
        {/* Fixed Header with Search and Sort */}
        <div className='sticky top-24 bg-white z-10 p-4 rounded-lg shadow-md mb-6'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div className='flex items-center justify-between'>
              <h1 className='text-3xl font-bold'>Nuestros Productos</h1>
              <Button
                className='md:hidden'
                variant='light'
                startContent={<Filter className='w-5 h-5' />}
                onPress={() => setIsFilterOpen(true)}
              >
                Filtros
              </Button>
            </div>
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Buscar productos...'
                  value={searchQuery}
                  onChange={handleSearch}
                  className='pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-500'
                />
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              </div>
              <Select
                startContent={<SortAsc className='w-4 h-4' />}
                placeholder='Ordenar por'
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className='w-full sm:w-48'
              >
                <SelectItem key='default' value='default'>
                  Por defecto
                </SelectItem>
                <SelectItem key='price-asc' value='price-asc'>
                  Precio: Menor a Mayor
                </SelectItem>
                <SelectItem key='price-desc' value='price-desc'>
                  Precio: Mayor a Menor
                </SelectItem>
                <SelectItem key='rating' value='rating'>
                  Mejor Valorados
                </SelectItem>
                <SelectItem key='name-asc' value='name-asc'>
                  Nombre: A-Z
                </SelectItem>
                <SelectItem key='name-desc' value='name-desc'>
                  Nombre: Z-A
                </SelectItem>
              </Select>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {sortedProducts.slice(0, visibleProducts).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Loading indicator */}
        {visibleProducts < sortedProducts.length && (
          <div ref={loadMoreRef} className='text-center py-8'>
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent'></div>
          </div>
        )}

        {sortedProducts.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-gray-600'>No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
