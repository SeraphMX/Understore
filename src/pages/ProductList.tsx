import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Filter } from 'lucide-react';
import { RootState } from '../store/store';
import { setSearchQuery, setCategory } from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, filteredItems, selectedCategory, searchQuery } = useSelector(
    (state: RootState) => state.products
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

  const categories = Array.from(new Set(items.map(product => product.category)));
  const displayedProducts = filteredItems.length > 0 ? filteredItems : items;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleCategoryChange = (category: string | null) => {
    dispatch(setCategory(category));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange as [number, number]);
  };

  return (
    <div className="flex gap-6">
      {/* Filters Sidebar */}
      <div className="w-64 bg-white p-4 rounded-lg shadow-md h-fit">
        <div className="mb-6">
          <h3 className="font-semibold mb-3 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Categorías</h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`block w-full text-left px-2 py-1 rounded ${
                    !selectedCategory ? 'bg-green-50 text-green-600' : 'hover:bg-gray-50'
                  }`}
                >
                  Todas
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`block w-full text-left px-2 py-1 rounded ${
                      selectedCategory === category
                        ? 'bg-green-50 text-green-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Precio</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={e => handlePriceChange(e, 0)}
                    className="w-20 px-2 py-1 border rounded"
                    min="0"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={e => handlePriceChange(e, 1)}
                    className="w-20 px-2 py-1 border rounded"
                    min="0"
                  />
                  <span>€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Nuestros Productos</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {displayedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;