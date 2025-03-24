import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { removeFromFavorites } from '../store/slices/favoritesSlice';
import { Heart, ArrowLeft, Trash2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Heart className="w-8 h-8 text-red-500" />
            Lista de Favoritos
          </h1>
          <p className="text-gray-600 mt-1">
            {favorites.length} {favorites.length === 1 ? 'producto' : 'productos'} guardados
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Tu lista de favoritos está vacía</h2>
          <p className="text-gray-600 mb-6">
            Agrega productos a tu lista para guardarlos y encontrarlos fácilmente después.
          </p>
          <Link
            to="/productos"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Explorar Productos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map(product => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
              <button
                onClick={() => dispatch(removeFromFavorites(product.id))}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                title="Eliminar de favoritos"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;