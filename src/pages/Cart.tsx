import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateQuantity, updateUnit } from '../store/slices/cartSlice'
import { RootState } from '../store/store'
import { formatPrice, formatUnit } from '../types'

const Cart = () => {
  const dispatch = useDispatch()
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

  if (items.length === 0) {
    return (
      <div className='text-center py-12'>
        <h2 className='text-2xl font-bold mb-4'>Tu carrito está vacío</h2>
        <p className='text-gray-600'>¡Agrega algunos productos para comenzar!</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'>Carrito de Compras</h1>
      <div className='space-y-4'>
        {items.map((item) => {
          const showUnitSelector = item.product.allowUnitChange || ['Flores', 'Extractos'].includes(item.product.category)

          const price =
            item.product.unit !== item.selectedUnit
              ? item.product.price * (item.selectedUnit === 'oz' ? 28.35 : 1 / 28.35)
              : item.product.price

          return (
            <div key={item.product.id} className='bg-white rounded-lg shadow p-4 flex items-center'>
              <img src={item.product.imageUrl} alt={item.product.name} className='w-24 h-24 object-cover rounded' />
              <div className='ml-4 flex-grow'>
                <h3 className='font-semibold'>{item.product.name}</h3>
                <p className='text-gray-600'>
                  {formatPrice(price)} / {formatUnit(item.selectedUnit)}
                </p>
                {showUnitSelector && (
                  <select
                    value={item.selectedUnit}
                    onChange={(e) => handleUnitChange(item.product.id, e.target.value as 'g' | 'oz')}
                    className='mt-2 border rounded px-2 py-1'
                  >
                    <option value='g'>gramos</option>
                    <option value='oz'>onzas</option>
                  </select>
                )}
              </div>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <button
                    onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                    className='bg-gray-200 px-3 py-1 rounded'
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                    className='bg-gray-200 px-3 py-1 rounded'
                  >
                    +
                  </button>
                </div>

                <button onClick={() => dispatch(removeFromCart(item.product.id))} className='text-red-600 hover:text-red-800'>
                  Eliminar
                </button>
              </div>
              <span className='font-bold'>{formatPrice(price * item.quantity)}</span>
            </div>
          )
        })}
        <div className='mt-8 flex justify-end'>
          <div className='bg-white rounded-lg shadow p-4'>
            <div className='text-xl font-bold mb-4'>Total: {formatPrice(total)}</div>
            <button className='bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full'>Proceder al Pago</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
