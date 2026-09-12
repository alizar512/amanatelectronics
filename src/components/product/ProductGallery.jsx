import { useState } from 'react'

export const ProductGallery = ({ images, alt }) => {
  const [activeImage, setActiveImage] = useState(images[0])

  return (
    <div className="space-y-4">
      <div className="surface overflow-hidden p-3">
        <div className="overflow-hidden rounded-[24px] bg-slate-100 dark:bg-slate-900">
          <img src={activeImage} alt={alt} className="aspect-square w-full object-cover transition duration-500 hover:scale-105" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((image) => (
          <button key={image} type="button" onClick={() => setActiveImage(image)} className="focus-ring surface overflow-hidden p-2">
            <img src={image} alt="Product view" loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
