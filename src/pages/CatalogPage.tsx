import { useEffect, useState } from 'react';
import { getProducts } from '../services/sdk/getProducts';
import { ProductProjection } from '@commercetools/platform-sdk';
import { parseProduct } from '../utils/parseProduct';
import { CatalogCard } from '../components/CatalogCard';

export function Catalog() {
  const [products, setProducts] = useState<ProductProjection[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);
  return (
    <div>
      {products.map((product) => {
        console.log(products);
        const parsed = parseProduct(product);
        return CatalogCard(parsed);
      })}
    </div>
  );
}
