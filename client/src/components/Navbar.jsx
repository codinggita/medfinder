import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
        <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter ml-1 group-hover:text-[#059669] transition-colors">
          Med<span className="text-[#059669] dark:text-[#34d399]">Finder</span>
        </span>
      </Link>
      
      <div className="hidden lg:flex items-center gap-10">
        {[
          { name: 'Find Medicine', path: '/search' },
          { name: 'Pharmacies', path: '/pharmacies' },
          { name: 'Dashboard', path: '/dashboard' },
        ].map((link) => (
          <Link 
            key={link.path}
            to={link.path} 
            className={`text-sm font-black uppercase tracking-widest transition-all hover:text-[#059669] ${isActive(link.path) ? 'text-[#059669] dark:text-[#34d399]' : 'text-gray-500 dark:text-gray-400'}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={toggleTheme} 
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-all duration-300 text-xl shadow-inner active:scale-90" 
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? '🌞' : '🌙'}
        </button>

        {user ? (
          <div className="flex items-center gap-6">
            <Link to="/profile" className="flex items-center gap-3 group">
               <div className="w-10 h-10 rounded-full border-2 border-emerald-500 p-0.5 group-hover:scale-110 transition-transform">
                  <img src={`https://ui-avatars.com/api/?name=${user.name}&background=059669&color=fff`} className="w-full h-full rounded-full" alt="User" />
               </div>
               <span className="hidden md:block font-black text-gray-800 dark:text-white text-sm uppercase tracking-widest">{user.name.split(' ')[0]}</span>
            </Link>
            <button 
              onClick={handleLogout} 
              className="px-6 py-3 text-red-500 font-black text-xs uppercase tracking-[0.2em] border-2 border-red-50 dark:border-red-900/20 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-all active:scale-95"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden md:block px-8 py-3 text-[#059669] dark:text-[#34d399] font-black text-xs uppercase tracking-[0.2em] hover:text-[#047857] transition-all">Login</Link>
            <Link to="/signup" className="px-10 py-4 bg-[#059669] text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-[#047857] transition-all shadow-xl hover:shadow-[#059669]/20 active:scale-95">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
