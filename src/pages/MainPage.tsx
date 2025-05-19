import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { CategorySlider } from '../components/CategorySlider';
import { ProductTabs } from '../components/ProductTabs';
import { Banners } from '../components/Banners';
import { Discounts } from '../components/Discounts';
import { BannerSale } from '../components/BannerSale';
import { Footer } from '../components/Footer';
import '../styles/index.css';
// import { Outlet } from 'react-router-dom';

export function MainPage() {
  return (
    <main className="min-h-screen w-full bg-gray-50">
      <Header />
      <HeroSection />
      <CategorySlider />
      <ProductTabs />
      <Banners />
      <Discounts />
      <BannerSale />
      <Footer />
    </main>
  );
}
