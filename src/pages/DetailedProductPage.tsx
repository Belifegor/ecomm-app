import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiRoot } from '../services/sdk/BuildClient';
import { ProductProjection } from '@commercetools/platform-sdk';

export function DetailedProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductProjection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    apiRoot
      .productProjections()
      .withId({ ID: id })
      .get({ queryArgs: { localeProjection: 'en-US' } })
      .execute()
      .then((res) => {
        setProduct(res.body);
        setError(null);
      })
      .catch((e) => {
        console.error('Ошибка при получении товара:', e);
        setError('Ошибка загрузки товара.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!product) return <p className="p-4">Product not found.</p>;

  const name = product.name['en-US'];
  const description = product.description?.['en-US'] || 'Нет описания';
  const images = product.masterVariant.images || [];

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Link to="/catalog" className="text-blue-500 hover:underline">
        ← Back to products
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-2">{name}</h1>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((img) => (
          <img
            key={img.url}
            src={img.url}
            alt={name}
            className="w-full object-contain border rounded-lg shadow"
          />
        ))}
      </div>
    </main>
  );
}
