import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';

export function MainPage() {
  return (
    <main className="min-h-screen w-full bg-gray-50">
      <Header />
      <HeroSection />
    </main>
  );
}
