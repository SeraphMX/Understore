import { ShoppingBag, Trash2, X } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeFromCart, updateQuantity, updateUnit } from '../store/slices/cartSlice'
import { RootState } from '../store/store'
import { formatPrice, formatUnit } from '../types'

interface CartSlideProps {
  isOpen: boolean
  onClose: () => void
}

const CartSlide: React.FC<CartSlideProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, total } = useSelector((state: RootState) => state.cart)

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }))
    } else {
      dispatch(removeFromCart(productId))
    }
  }

  const handleUnitChange = (productId: string, unit: 'g' | 'oz') => {
    dispatch(updateUnit({ productId, unit }))
  }

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className='fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity' onClick={onClose} />}

      {/* Cart Slide */}
      <div
        className={`fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col h-full'>
          {/* Header */}
          <div className='flex items-center justify-between p-4 border-b'>
            <div className='flex items-center'>
              <ShoppingBag className='h-6 w-6 text-green-600 mr-2' />
              <h2 className='text-xl font-semibold'>Carrito de Compras</h2>
            </div>
            <button onClick={onClose} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
              <X className='h-6 w-6' />
            </button>
          </div>

          {/* Cart Items */}
          <div className='flex-1 overflow-y-auto p-4'>
            {items.length === 0 ? (
              <div className='text-center py-8'>
                <ShoppingBag className='h-12 w-12 mx-auto text-gray-400 mb-4' />
                <p className='text-gray-600'>Tu carrito está vacío</p>
              </div>
            ) : (
              <div className='space-y-4'>
                {items.map((item) => {
                  const showUnitSelector = item.product.allowUnitChange || ['Flores', 'Extractos'].includes(item.product.category)

                  const price =
                    item.product.unit !== item.selectedUnit
                      ? item.product.price * (item.selectedUnit === 'oz' ? 28.35 : 1 / 28.35)
                      : item.product.price

                  return (
                    <div key={item.product.id} className='flex gap-2 bg-white rounded-lg p-4 border'>
                      <img src={item.product.imageUrl} alt={item.product.name} className='w-20 h-20 object-cover rounded' />
                      <div className='flex-1'>
                        <h3 className='font-medium'>{item.product.name}</h3>
                        <p className='text-gray-600 text-sm'>
                          {formatPrice(price)} / {formatUnit(item.selectedUnit)}
                        </p>

                        <div className='flex items-center gap-2 my-2'>
                          <div className='flex items-center border rounded'>
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              className='px-2 py-1 hover:bg-gray-100'
                            >
                              -
                            </button>
                            <span className='px-2'>{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              className='px-2 py-1 hover:bg-gray-100'
                            >
                              +
                            </button>
                          </div>

                          {showUnitSelector && (
                            <select
                              value={item.selectedUnit}
                              onChange={(e) => handleUnitChange(item.product.id, e.target.value as 'g' | 'oz')}
                              className='border rounded px-2 py-1 text-sm'
                            >
                              <option value='g'>gramos</option>
                              <option value='oz'>onzas</option>
                            </select>
                          )}
                        </div>

                        <div className='font-semibold text-lg'>{formatPrice(price * item.quantity)}</div>
                      </div>

                      <div className='flex flex-col items-end justify-between'>
                        <button onClick={() => dispatch(removeFromCart(item.product.id))} className='text-red-500 hover:text-red-700 p-1'>
                          <Trash2 className='h-4 w-4' />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className='border-t p-4'>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-lg font-semibold'>Total</span>
              <span className='text-xl font-bold'>{formatPrice(total)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className='w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={items.length === 0}
            >
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartSlide
