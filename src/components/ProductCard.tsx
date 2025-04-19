import { Button } from '@nextui-org/react'
import { Star } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { MainLayoutContext } from '../layouts/MainLayout'
import { addToCart } from '../store/slices/cartSlice'
import { formatPrice, formatUnit, getAvailableUnits, Product, Unit } from '../types'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch()
  const { openCart } = React.useContext(MainLayoutContext)
  const availableUnits = getAvailableUnits(product)
  const [selectedUnit, setSelectedUnit] = useState<Unit>(product.baseUnit)

  const handleAddToCart = () => {
    if (selectedUnit === 'g' || selectedUnit === 'oz') {
      dispatch(addToCart({ product, quantity: 1, selectedUnit }))
    } else {
      console.error(`Invalid unit: ${selectedUnit}`)
    }
    openCart()
  }

  const price =
    selectedUnit !== product.baseUnit ? product.price * (selectedUnit === 'oz' ? 28.35 : selectedUnit === 'kg' ? 1000 : 1) : product.price

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]'>
      <Link to={`/productos/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} className='w-full object-cover' />
      </Link>
      <div className='p-4'>
        <Link to={`/productos/${product.id}`}>
          <h3 className='font-semibold text-lg mb-2 hover:text-green-600'>{product.name}</h3>
        </Link>
        {/* <p className='text-gray-600 text-sm mb-2'>{product.description}</p> */}
        <div className='flex items-center mb-2'>
          <div className='flex items-center'>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className='text-sm text-gray-600 ml-2'>({product.reviews})</span>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col'>
            <span className='font-bold text-lg'>{formatPrice(price)}</span>
            <div className='flex items-center gap-2'>
              {availableUnits.length > 1 ? (
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value as Unit)}
                  className='text-sm border rounded px-1'
                >
                  {availableUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {formatUnit(unit)}
                    </option>
                  ))}
                </select>
              ) : (
                <span className='text-sm text-gray-600'>/ {formatUnit(availableUnits[0])}</span>
              )}
            </div>
          </div>
          <Button onPress={handleAddToCart} color='primary'>
            Añadir
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
