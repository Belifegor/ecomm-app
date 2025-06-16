import { ProductCard } from './CatalogCard.tsx';

const discountedProducts = [
  {
    id: 101,
    name: 'iPhone 14 Pro 512GB Gold',
    price: 1437,
    originalPrice: 1799,
    image: '/images/Iphone_14_pro_gold.svg',
  },
  {
    id: 102,
    name: 'AirPods Max Silver',
    price: 549,
    image: '/images/AirPods_max.svg',
  },
  {
    id: 103,
    name: 'Apple Watch Series 9',
    price: 399,
    image: '/images/Apple_watch.svg',
  },
  {
    id: 104,
    name: 'iPhone 14 Pro 1TB',
    price: 1499,
    originalPrice: 1899,
    image: '/images/Iphone_14_pro_white.svg',
  },
];

export function Discounts() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4">
        <h2 className="text-xl font-semibold mb-6">Discounts up to -50%</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {discountedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id.toString()}
              name={product.name}
              price={product.price.toString()}
              imageUrl={product.image}
              {...(product.originalPrice !== undefined && {
                originalPrice: product.originalPrice.toString(),
              })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
