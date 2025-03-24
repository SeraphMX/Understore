import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';
import { products } from '../../data/products';

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  selectedCategory: string | null;
  searchQuery: string;
}

const initialState: ProductsState = {
  items: products,
  filteredItems: [],
  selectedCategory: null,
  searchQuery: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
      state.filteredItems = filterProducts(state);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredItems = filterProducts(state);
    },
  },
});

const filterProducts = (state: ProductsState): Product[] => {
  return state.items.filter(product => {
    const matchesCategory = !state.selectedCategory || product.category === state.selectedCategory;
    const matchesSearch = !state.searchQuery || 
      product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
};

export const { setCategory, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;