import { useState } from 'react';
import { ProductCard } from './ProductCard';

type Tab = 'New Arrival' | 'Bestseller' | 'Featured Products';

const products: Record<
  Tab,
  { id: number; name: string; price: number; image: string }[]
> = {
  'New Arrival': [
    {
      id: 1,
      name: 'iPhone 14 Pro Max',
      price: 900,
      image: './src/images/Iphone14pro.svg',
    },
    {
      id: 2,
      name: 'iPhone 14 Pro Max',
      price: 900,
      image: './src/images/Iphone14pro.svg',
    },
    {
      id: 3,
      name: 'iPhone 14 Pro Max',
      price: 900,
      image: './src/images/Iphone14pro.svg',
    },
    {
      id: 4,
      name: 'iPhone 14 Pro Max',
      price: 900,
      image: './src/images/Iphone14pro.svg',
    },
    {
      id: 5,
      name: 'iPhone 14 Pro Max',
      price: 900,
      image: './src/images/Iphone14pro.svg',
    },
    {
      id: 6,
      name: 'iPhone 14 Pro Max',
      price: 900,
      image: './src/images/Iphone14pro.svg',
    },
    {
      id: 7,
      name: 'iPhone 14 Pro Max',
      price: 900,
      image: './src/images/Iphone14pro.svg',
    },
    {
      id: 8,
      name: 'iPhone 14 Pro Max',
      price: 900,
      image: './src/images/Iphone14pro.svg',
    },
  ],
  Bestseller: [
    /*...*/
  ],
  'Featured Products': [
    /*...*/
  ],
};

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('New Arrival');

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Вкладки */}
        <div className="flex gap-6 mb-6 text-sm font-medium">
          {Object.keys(products).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as Tab)}
              className={`pb-2 ${
                activeTab === tab
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products[activeTab].map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
