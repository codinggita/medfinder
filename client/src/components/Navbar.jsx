import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { cartCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 px-6 md:px-12 py-5 flex items-center justify-between ${scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] py-4' : 'bg-white dark:bg-gray-900 border-b border-transparent'}`}>
      <Link to="/" className="flex items-center gap-2 group">
        <div className="relative transform group-hover:rotate-12 transition-transform duration-500">
          <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
            <g transform="translate(42, 42) rotate(45)">
              <defs>
                <linearGradient id="pillGrad" x1="0" y1="-35" x2="0" y2="35" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <rect x="-18" y="-35" width="36" height="70" rx="18" fill="url(#pillGrad)" />
              <path d="M -12, -6 L -12, -17 A 12,12 0 0,1 12,-17 L 12, -6 Z" fill="white" fillOpacity="0.3" />
            </g>
            <circle cx="72" cy="72" r="22" fill="#10b981" stroke="white" strokeWidth="4" />
            <path d="M72,59 L72,85 M59,72 L85,72" stroke="white" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter ml-1 group-hover:text-emerald-600 transition-colors">
          Med<span className="text-emerald-600 dark:text-emerald-400">Finder</span>
        </span>
      </Link>

      <div className="hidden lg:flex items-center gap-10">
        {[
          { name: 'Find Medicine', path: '/search' },
          { name: 'Pharmacies', path: '/pharmacies' },
          { name: 'My Orders', path: '/profile/orders' },
          { name: 'About', path: '/about' },
          { name: 'Contact', path: '/contact' },
          { name: 'Dashboard', path: '/dashboard' },
        ].map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm font-black uppercase tracking-widest transition-all hover:text-emerald-600 ${isActive(link.path) ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm"
          aria-label="Open Cart"
        >
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-emerald-600 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-in zoom-in duration-300">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </button>

        <button
          onClick={toggleTheme}
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm active:scale-90"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 128 128" id="Sunny">
              <circle cx="64" cy="64" r="18" stroke="#FFFFFF" strokeWidth="6" className="colorStroke000000 svgStroke"></circle>
              <path stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="M64 33L64 25M79.2967 37.2543L81.4995 33.439M95 64L102 64M90.4957 79.0472L94.311 81.25M90.4953 48.4528L96.0063 45.271M48.7028 37.2545L45.521 31.7434M64 102L64 94M46.4994 94.0607L48.7021 90.2454M26 64L33 64M33.6895 46.2501L37.5049 48.4529M31.9933 82.2289L37.5044 79.0471M82.4792 95.7567L79.2974 90.2456" className="colorStroke000000 svgStroke"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 30 30" id="moon">
              <path fill="none" stroke="#34a853" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.63 20a9 9 0 0 1-9.12-8.78A8.61 8.61 0 0 1 14.17 5 10.17 10.17 0 0 0 5 15a10.23 10.23 0 0 0 10.42 10A10.43 10.43 0 0 0 25 18.9a9.3 9.3 0 0 1-4.37 1.1Z" className="colorStroke000000 svgStroke"></path>
            </svg>
          )}
        </button>

        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/profile" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border-2 border-emerald-500 p-0.5 group-hover:scale-110 transition-transform">
                <img src={`https://ui-avatars.com/api/?name=${user.name}&background=059669&color=fff`} className="w-full h-full rounded-full" alt="User" />
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-3 text-rose-500 font-black text-xs uppercase tracking-widest border-2 border-rose-50 dark:border-rose-900/20 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all active:scale-95"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden md:block px-6 py-3 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-widest hover:text-emerald-700 transition-all">Login</Link>
            <Link to="/signup" className="px-8 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-600/20 active:scale-95">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
