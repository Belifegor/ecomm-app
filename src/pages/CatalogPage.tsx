//
import { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { parseProduct } from '../utils/parseProduct';
import { ProductCard } from '../components/CatalogCard_merged';
import { FilterSidebar } from '../components/FilterSidebar';
import { getFilteredProducts } from '../services/sdk/GetFilteredProducts';
import { getAvailableFilters } from '../services/sdk/getAvailableFilters';
import { Product } from '../components/CatalogCard_merged';
import { useSearchStore } from '../store/searchStore';

const SORT_OPTIONS = [
  { value: 'price asc', label: 'Price: Low to High' },
  { value: 'price desc', label: 'Price: High to Low' },
  { value: 'name.en-US asc', label: 'Name: A to Z' },
  { value: 'name.en-US desc', label: 'Name: Z to A' },
];
import { Breadcrumbs } from '../components/Breadcrumbs';

// const FILTERS = {
//   brand: ['Apple', 'Samsung', 'Sony', 'Google'], // можно подгружать с сервера
//   color: ['Black', 'White', 'Silver', 'Purple'],
//   model: ['iPhone 14 Pro', 'Galaxy S23', 'Pixel 7', 'iPhone 15 Pro Max'],
// };

export function CatalogPage() {
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('price asc');

  const searchQuery = useSearchStore((state) => state.query);

  useEffect(() => {
    getAvailableFilters()
      .then(setFilters)
      .catch((e) => console.error('Ошибка загрузки доступных фильтров:', e));
  }, []);

  useEffect(() => {
    setLoading(true);
    console.log(
      '*** Перед фильтрацией, selectedFilters =',
      selectedFilters,
      'sortOrder =',
      sortOrder
    );

    getFilteredProducts(selectedFilters, 30, sortOrder, searchQuery)
      .then((data: ProductProjection[]) => {
        console.log(
          'Получено после фильтрации (data):',
          data.map((p) => ({
            id: p.id,
            brand: p.masterVariant.attributes?.find((a) => a.name === 'brand')
              ?.value,
            color: p.masterVariant.attributes?.find((a) => a.name === 'color')
              ?.value,
            name: p.name['en-US'],
          }))
        );
        const parsedProducts = data.map(parseProduct);
        console.log('Parsed products for ProductCard:', parsedProducts);

        setProducts(parsedProducts);
        setError(null);
      })
      .catch((err) => {
        console.error('Ошибка загрузки продуктов:', err);
        setError('Не удалось загрузить товары. Попробуйте позже.');
      })
      .finally(() => setLoading(false));
  }, [selectedFilters, sortOrder, searchQuery]);

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

  const handleSortChange = (value: string) => {
    console.log('Выбранная сортировка:', value);
    setSortOrder(value);
  };

  return (
    <main className="bg-white min-h-screen w-full mt-2">
      <div className="max-w-[1440px] mx-auto pl-6 pr-4">
        <Breadcrumbs />
      </div>
      <div className="max-w-[1440px] mx-auto px-4 flex">
        {/* Боковая панель фильтров */}
        <FilterSidebar
          filters={filters}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />

        {/*Cортировка + список товаров */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Блок сортировки */}
          <div className="flex justify-end">
            <select
              value={sortOrder}
              onChange={(e) => handleSortChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">Sort by</option>
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <aside className="w-1/4">
            {/* Боковая панель фильтров */}
            <FilterSidebar
              filters={filters}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </aside>

          {/* Список продуктов */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  items-start">
            {loading && <p>Загрузка товаров...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !products.length && (
              <p>Нет товаров по выбранным фильтрам.</p>
            )}
            {products.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                description={p.description}
                imageUrl={p.imageUrl}
                price={p.price}
                originalPrice={p.originalPrice}
              />
            ))}
          </div>
        </div>
        <section className="w-3/4">
          {/* Список продуктов */}
          {loading && (
            <div className="flex justify-center items-center min-h-[300px]">
              <p className="text-gray-500 text-lg">Загрузка товаров...</p>
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !products.length && (
            <p>Нет товаров по выбранным фильтрам.</p>
          )}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  items-start mt-2">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  description={p.description}
                  imageUrl={p.imageUrl}
                  price={p.price}
                  originalPrice={p.originalPrice}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
