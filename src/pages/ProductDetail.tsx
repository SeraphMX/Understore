import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Star, ArrowLeft, Image as ImageIcon, Send, Heart, Truck, Shield, Clock, CheckCircle2 } from 'lucide-react';
import { RootState } from '../store/store';
import { addToCart } from '../store/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../store/slices/favoritesSlice';
import { LayoutContext } from '../components/Layout';
import { getProductReviews } from '../data/reviews';
import { formatPrice, formatDate, formatUnit, getAvailableUnits, Unit } from '../types';
import { Textarea, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Tabs, Tab } from '@nextui-org/react';
import ProductGallery from '../components/ProductGallery';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openCart } = React.useContext(LayoutContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState<Unit>('g');
  const [reviewText, setReviewText] = useState('');
  const [selectedRating, setSelectedRating] = useState(5);
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const product = useSelector((state: RootState) =>
    state.products.items.find(p => p.id === id)
  );

  const isFavorite = useSelector((state: RootState) =>
    state.favorites.items.some(item => item.id === id)
  );

  const reviews = id ? getProductReviews(id) : [];

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
        <button
          onClick={() => navigate('/productos')}
          className="text-green-600 hover:text-green-700"
        >
          Volver a productos
        </button>
      </div>
    );
  }

  const availableUnits = getAvailableUnits(product);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity, selectedUnit }));
    openCart();
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const handleSubmitReview = () => {
    console.log('Enviando reseña:', {
      rating: selectedRating,
      comment: reviewText,
      images: selectedImages
    });
    onClose();
    setReviewText('');
    setSelectedRating(5);
    setSelectedImages(null);
  };

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <ProductGallery 
              images={product.images || [product.imageUrl]} 
              productName={product.name}
            />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <button
                onClick={toggleFavorite}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite 
                    ? 'bg-red-50 text-red-500' 
                    : 'hover:bg-gray-100 text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">({product.reviews} reseñas)</span>
            </div>

            <div className="mb-6">
              <div className="text-3xl font-bold mb-2">
                {formatPrice(product.price)}
                <span className="text-lg text-gray-600 ml-2">/ {formatUnit(product.baseUnit)}</span>
              </div>
              <div className="text-sm text-gray-600">
                Stock disponible: {product.stock} {formatUnit(product.baseUnit)}
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  className="w-16 text-center border-x py-2"
                />
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              {availableUnits.length > 1 && (
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value as Unit)}
                  className="border rounded px-3 py-2"
                >
                  {availableUnits.map(unit => (
                    <option key={unit} value={unit}>
                      {formatUnit(unit)}
                    </option>
                  ))}
                </select>
              )}
              <button
                onClick={handleAddToCart}
                className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 transition-colors flex-grow"
              >
                Añadir al Carrito
              </button>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-2">Categoría</h3>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm">
                {product.category}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-t">
          <Tabs 
            aria-label="Product information" 
            color="primary" 
            variant="underlined"
            classNames={{
              tabList: "px-6 border-b border-gray-200",
              cursor: "bg-green-500",
              tab: "flex gap-2 h-12",
              tabContent: "group-data-[selected=true]:text-green-600"
            }}
          >
            <Tab
              key="description"
              title={
                <div className="flex items-center gap-2">
                  <span>Descripción</span>
                </div>
              }
            >
              <div className="p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Características</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Alta tasa de germinación</li>
                        <li>• Semillas seleccionadas manualmente</li>
                        <li>• Variedad premium</li>
                        <li>• Cultivo sostenible</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Recomendaciones</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Temperatura óptima: 18-24°C</li>
                        <li>• Riego moderado</li>
                        <li>• Exposición solar: parcial</li>
                        <li>• Profundidad de siembra: 1-2 cm</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab
              key="reviews"
              title={
                <div className="flex items-center gap-2">
                  <span>Reseñas</span>
                  <span className="bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs">
                    {reviews.length}
                  </span>
                </div>
              }
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Reseñas de Clientes</h2>
                    <p className="text-gray-600">
                      {reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'} en total
                    </p>
                  </div>
                  <button
                    onClick={onOpen}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Escribir Reseña
                  </button>
                </div>

                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium mr-2">{review.userName}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                      {review.images && review.images.length > 0 && (
                        <div className="mt-4 flex gap-2">
                          {review.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Review image ${index + 1}`}
                              className="w-20 h-20 object-cover rounded"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {reviews.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No hay reseñas aún. ¡Sé el primero en opinar!
                    </div>
                  )}
                </div>
              </div>
            </Tab>
            <Tab
              key="warranty"
              title={
                <div className="flex items-center gap-2">
                  <span>Garantía y Envío</span>
                </div>
              }
            >
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-8 h-8 text-green-600" />
                      <h3 className="text-lg font-semibold">Garantía de Calidad</h3>
                    </div>
                    <div className="space-y-4 text-gray-600">
                      <p>
                        Todos nuestros productos están respaldados por nuestra garantía de satisfacción:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span>Garantía de germinación del 85%</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span>30 días para devoluciones</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span>Reemplazo gratuito en caso de problemas</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Truck className="w-8 h-8 text-green-600" />
                      <h3 className="text-lg font-semibold">Información de Envío</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <p className="font-medium">Tiempos de Entrega</p>
                          <p className="text-gray-600">3-5 días hábiles a nivel nacional</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <p className="font-medium">Envío Seguro</p>
                          <p className="text-gray-600">Empaque especial para proteger las semillas</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Truck className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <p className="font-medium">Envío Gratis</p>
                          <p className="text-gray-600">En compras mayores a $999</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* Review Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>Escribir Reseña</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calificación
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(rating)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          rating <= selectedRating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Textarea
                label="Tu opinión"
                placeholder="Comparte tu experiencia con este producto..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                minRows={3}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imágenes (opcional)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                        <span>Subir imágenes</span>
                        <input
                          type="file"
                          className="sr-only"
                          multiple
                          accept="image/*"
                          onChange={(e) => setSelectedImages(e.target.files)}
                        />
                      </label>
                      <p className="pl-1">o arrastra y suelta</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG hasta 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancelar
            </Button>
            <Button 
              color="primary" 
              onPress={handleSubmitReview}
              startContent={<Send className="w-4 h-4" />}
            >
              Publicar Reseña
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProductDetail;