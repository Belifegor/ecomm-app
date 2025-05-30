import { useEffect, useState } from 'react';
import { getProducts } from '../services/sdk/getProducts';
import { ProductProjection } from '@commercetools/platform-sdk';
import { parseProduct } from '../utils/parseProduct';
import { CatalogCard } from '../components/CatalogCard';
import { FilterSidebar } from '../components/FilterSidebar';

const Filters = {
  CATEGORIES: ['Smartphones', 'Cameras'],
  BRAND: ['Apple', 'Samsung'],
};

export function Catalog() {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});
  const [error, setError] = useState<string | null>(null);
  console.log(error);

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, []);

  const handleFilterChange = (
    title: string,
    option: string,
    checked: boolean
  ) => {
    setSelectedFilters((prev) => {
      const current = prev[title] || [];

      const updated = checked
        ? [...current, option]
        : current.filter((item) => item !== option);
      return {
        ...prev,
        [title]: updated,
      };
    });
  };

  return (
    <main className="bg-white min-h-screen w-full">
      <div className="max-w-[1440px] mx-auto px-4 flex">
        {/* Breadcrumbs */}
        <FilterSidebar
          filters={Filters}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {products.map((product) => {
            const parsed = parseProduct(product);
            return <CatalogCard key={product.id} {...parsed} />;
          })}
        </div>
      </div>
    </main>
  );
}
