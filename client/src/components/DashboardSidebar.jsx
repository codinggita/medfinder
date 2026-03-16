import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardSidebar = ({ logout }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )},
    { name: 'Add Medicine', path: '/dashboard/add', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
      </svg>
    )},
    { name: 'Manage Inventory', path: '/dashboard/inventory', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )},
    { name: 'Profile', path: '/profile', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
  ];

  return (
    <aside className="w-72 bg-[#1E7F5C] dark:bg-emerald-950 text-white flex flex-col h-screen sticky top-0 shadow-2xl z-20 transition-colors duration-500">
      <div className="p-8 flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(50, 50) rotate(45)">
              <rect x="-18" y="-35" width="36" height="70" rx="18" fill="white" />
              <path d="M -12, -6 L -12, -17 A 12,12 0 0,1 12,-17 L 12, -6 Z" fill="#1E7F5C" className="dark:fill-emerald-950" />
            </g>
          </svg>
        </div>
        <h1 className="text-2xl font-black tracking-tighter">MedFinder</h1>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => 
              `flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 font-bold text-sm tracking-wide ${
                isActive 
                  ? 'bg-white/15 text-white shadow-lg backdrop-blur-md' 
                  : 'text-white/70 dark:text-white/50 hover:bg-white/5 hover:text-white dark:hover:text-white'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-6">
        <button
          onClick={logout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-white/70 dark:text-white/50 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 font-bold text-sm tracking-wide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
