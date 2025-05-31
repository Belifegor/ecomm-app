import { ProductProjection } from '@commercetools/platform-sdk';
import { Product } from '../components/CatalogCard_merged';

function formatPrice(centAmount?: number): string {
  if (centAmount) {
    return `${(centAmount / 100).toFixed(2)}`;
  } else {
    return `undefined`;
  }
}

export function parseProduct(product: ProductProjection): Product {
  const master = product.masterVariant;
  const priceInfo = master?.prices?.[0];
  const imageUrl = master?.images?.[0]?.url;
  const currentPrice = priceInfo?.discounted?.value || priceInfo?.value;
  const originalPrice = priceInfo?.discounted ? priceInfo?.value : undefined;
  const name = product.name['en-US'] || 'No name';
  const description = product.description?.['en-US'];

  // console.log('parseProduct — name:', product.name['en-US']);

  return {
    id: product.id,
    name,
    description,
    imageUrl,
    price: formatPrice(currentPrice?.centAmount),
    originalPrice: formatPrice(originalPrice?.centAmount),
  };
}
