import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import authReducer from './slices/authSlice';
import favoritesReducer from './slices/favoritesSlice';
import layoutReducer from './slices/layoutSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    auth: authReducer,
    favorites: favoritesReducer,
    layout: layoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;