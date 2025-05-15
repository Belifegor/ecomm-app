import { CategoryItem } from './CategoryItem';
import PhoneIcon from '../assets/icons/Phones.svg?react';
import WatchIcon from '../assets/icons/Smart_Watches.svg?react';
import CameraIcon from '../assets/icons/Cameras.svg?react';
import HeadphoneIcon from '../assets/icons/Headphones.svg?react';
import ComprutersIcon from '../assets/icons/Computers.svg?react';
import GamingIcon from '../assets/icons/Gaming.svg?react';
import ArrowLeft from '../assets/icons/Arrow-left.svg?react';
import ArrowRight from '../assets/icons/Arrow-rigth.svg?react';

const categories = [
  { label: 'Phones', icon: <PhoneIcon className="w-full h-full" /> },
  { label: 'Smart Watches', icon: <WatchIcon className="w-full h-full" /> },
  { label: 'Cameras', icon: <CameraIcon className="w-full h-full" /> },
  { label: 'Headphones', icon: <HeadphoneIcon className="w-full h-full" /> },
  { label: 'Computers', icon: <ComprutersIcon className="w-full h-full" /> },
  { label: 'Gaming', icon: <GamingIcon className="w-full h-full" /> },
];

export function CategorySlider() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-[1440px] mx-auto lg:px-40">
        <div className="flex  items-center mb-8">
          <h2 className="text-xl font-semibold">Browse By Category</h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex gap-4 justify-between overflow-x-auto">
          {categories.map((c) => (
            <CategoryItem key={c.label} label={c.label} icon={c.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
