import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { CategorySlider } from '../components/CategorySlider';
import { ProductTabs } from '../components/ProductTabs';
import { Banners } from '../components/Banners';

export function MainPage() {
  return (
    <main className="min-h-screen w-full bg-gray-50">
      <Header />
      <HeroSection />
      <CategorySlider />
      <ProductTabs />
      <Banners />
    </main>
  );
}
