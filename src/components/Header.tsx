import { Link, NavLink } from 'react-router-dom';
import HeartIcon from '../assets/icons/heart.svg?react';
import CartIcon from '../assets/icons/cart.svg?react';

export function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-[1440px] mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          cyber
        </Link>

        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <NavLink to="/" className="text-blue-600 font-semibold">
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/blog">Blog</NavLink>
        </nav>

        <div className="flex gap-4 items-center">
          <button className="relative w-6 h-6">
            <HeartIcon />
          </button>

          <button className="relative w-6 h-6">
            <CartIcon />
          </button>
        </div>

        <Link to="/login" className="text-sm hover:underline">
          Login
        </Link>
        <Link to="/register" className="text-sm hover:underline">
          Register
        </Link>
      </div>
    </header>
  );
}
