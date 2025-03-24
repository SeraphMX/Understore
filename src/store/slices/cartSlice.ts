import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product, convertUnit } from '../../types';

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const calculateItemPrice = (item: CartItem): number => {
  const basePrice = item.product.price;
  const price = item.product.unit !== item.selectedUnit
    ? basePrice * (item.selectedUnit === 'oz' ? 28.35 : 1/28.35)
    : basePrice;
  return price * item.quantity;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number; selectedUnit: 'g' | 'oz' }>) => {
      const { product, quantity, selectedUnit } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity, selectedUnit });
      }

      state.total = state.items.reduce((total, item) => total + calculateItemPrice(item), 0);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
      state.total = state.items.reduce((total, item) => total + calculateItemPrice(item), 0);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product.id === productId);
      
      if (item) {
        item.quantity = quantity;
        state.total = state.items.reduce((total, item) => total + calculateItemPrice(item), 0);
      }
    },
    updateUnit: (state, action: PayloadAction<{ productId: string; unit: 'g' | 'oz' }>) => {
      const { productId, unit } = action.payload;
      const item = state.items.find(item => item.product.id === productId);
      
      if (item) {
        const oldQuantity = item.quantity;
        const oldUnit = item.selectedUnit;
        item.selectedUnit = unit;
        item.quantity = Math.round(convertUnit(oldQuantity, oldUnit, unit));
        state.total = state.items.reduce((total, item) => total + calculateItemPrice(item), 0);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, updateUnit, clearCart } = cartSlice.actions;
export default cartSlice.reducer;