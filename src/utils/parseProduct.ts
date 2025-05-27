import { ProductProjection } from '@commercetools/platform-sdk';
import { Product } from '../components/CatalogCard';

export function parseProduct(product: ProductProjection): Product {
  const master = product.masterVariant;
  const priceInfo = master?.prices?.[0];
  const imageUrl = master?.images?.[0]?.url;
  const currentPrice = priceInfo?.discounted?.value || priceInfo?.value;
  const originalPrice = priceInfo?.discounted ? priceInfo?.value : undefined;

  return {
    id: product.id,
    name: product.name['en-US'],
    description: product.description?.['en-US'],
    imageUrl,
    price: `${currentPrice?.centAmount}`,
    originalPrice: `${originalPrice?.centAmount}`,
  };
}
