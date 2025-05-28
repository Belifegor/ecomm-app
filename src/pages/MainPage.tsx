import { HeroSection } from '../components/HeroSection';
import { CategorySlider } from '../components/CategorySlider';
import { ProductTabs } from '../components/ProductTabs';
import { Banners } from '../components/Banners';
import { Discounts } from '../components/Discounts';
import { BannerSale } from '../components/BannerSale';
import '../styles/index.css';

export function MainPage() {
  return (
    <main className="min-h-screen w-full bg-gray-50">
      <HeroSection />
      <CategorySlider />
      <ProductTabs />
      <Banners />
      <Discounts />
      <BannerSale />
    </main>
  );
}
