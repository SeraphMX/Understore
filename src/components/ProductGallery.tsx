import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [mainImage, setMainImage] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMainImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMainImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className='space-y-4'>
      <div className='relative h-[500px] cursor-pointer group' onClick={() => setIsLightboxOpen(true)}>
        <img src={images[mainImage]} alt={`${productName} - Imagen ${mainImage + 1}`} className='w-full h-full object-cover rounded-lg' />

        {/* Navigation buttons */}
        <button
          onClick={handlePrevImage}
          className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
        >
          <ChevronLeft className='w-6 h-6' />
        </button>
        <button
          onClick={handleNextImage}
          className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
        >
          <ChevronRight className='w-6 h-6' />
        </button>

        {/* Image counter */}
        <div className='absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm'>
          {mainImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className='grid grid-cols-6 gap-2'>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(index)}
            className={`relative aspect-square overflow-hidden rounded-lg ${mainImage === index ? 'ring-2 ring-green-600' : ''}`}
          >
            <img src={image} alt={`${productName} - Miniatura ${index + 1}`} className='w-full h-full object-cover' />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox open={isLightboxOpen} close={() => setIsLightboxOpen(false)} slides={images.map((src) => ({ src }))} index={mainImage} />
    </div>
  )
}

export default ProductGallery
