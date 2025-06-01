import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/sdk/getProductById';
import { ProductProjection } from '@commercetools/platform-sdk';

export function DetailedProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductProjection | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (id) {
      getProductById(id)
        .then((data) => {
          setProduct(data);
          setSelectedImage(data.masterVariant.images?.[0]?.url || '');
        })
        .catch(console.error);
    }
  }, [id]);

  if (!product) return <p className="p-10">Loading product...</p>;

  const master = product.masterVariant;
  const name = product.name['en-US'];
  const description = product.description?.['en-US'] || 'No description';
  const images = master.images || [];
  const price = master.prices?.[0];
  const current = price?.discounted?.value || price?.value;
  const original = price?.discounted ? price?.value : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate('/catalog')}
        className="mb-6 text-sm text-purple-600 hover:underline"
      >
        ← Back to catalog
      </button>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Preview Thumbnails */}
        <div className="flex lg:flex-col gap-2 order-2 lg:order-1">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={`preview-${idx}`}
              onClick={() => setSelectedImage(img.url)}
              className={`w-16 h-16 object-contain border rounded cursor-pointer hover:ring-2 hover:ring-purple-400 transition ${
                selectedImage === img.url ? 'ring-2 ring-purple-600' : ''
              }`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 order-1 lg:order-2">
          <img
            src={selectedImage}
            alt={name}
            className="w-full max-w-md object-contain mx-auto"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col gap-4 order-3">
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>

          <div className="text-2xl font-bold text-black">
            ${((current?.centAmount || 0) / 100).toFixed(2)}
            {original && (
              <span className="text-gray-400 line-through ml-4 text-lg">
                ${((original.centAmount || 0) / 100).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed text-sm">{description}</p>

          <button className="mt-6 bg-black text-white px-6 py-3 w-fit rounded-lg hover:bg-purple-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
