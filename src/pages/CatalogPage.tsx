//
import { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { parseProduct } from '../utils/parseProduct';
import { ProductCard } from '../components/CatalogCard_merged';
import { FilterSidebar } from '../components/FilterSidebar';
import { getFilteredProducts } from '../services/sdk/GetFilteredProducts';
import { Product } from '../components/CatalogCard_merged';

const FILTERS = {
  brand: ['Apple', 'Samsung', 'Sony', 'Google'], // можно подгружать с сервера
  color: ['Black', 'White', 'Silver', 'Purple'],
  model: ['iPhone 14 Pro', 'Galaxy S23', 'Pixel 7', 'iPhone 15 Pro Max'],
};

export function CatalogPage() {
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getFilteredProducts(selectedFilters, 30)
      .then((data: ProductProjection[]) => {
        const parsed = data.map(parseProduct);
        setProducts(parsed);
        setError(null);
      })
      .catch((err) => {
        console.error('Ошибка загрузки продуктов:', err);
        setError('Не удалось загрузить товары. Попробуйте позже.');
      })
      .finally(() => setLoading(false));
  }, [selectedFilters]);

  const handleFilterChange = (
    title: string,
    option: string,
    checked: boolean
  ) => {
    setSelectedFilters((prev) => {
      const current = prev[title] || [];
      const updated = checked
        ? [...current, option]
        : current.filter((val) => val !== option);
      return {
        ...prev,
        [title]: updated,
      };
    });
  };

  return (
    <main className="bg-white min-h-screen w-full">
      <div className="max-w-[1440px] mx-auto px-4 flex">
        {/* Боковая панель фильтров */}
        <FilterSidebar
          filters={FILTERS}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />

        {/* Список продуктов */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {loading && <p>Загрузка товаров...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !products.length && (
            <p>Нет товаров по выбранным фильтрам.</p>
          )}
          {products.map((p) => (
            <ProductCard
              imageUrl={''}
              key={p.id}
              {...p}
              id={p.id}
              price={String(p.price)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
