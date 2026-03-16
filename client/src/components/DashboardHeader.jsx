import React from 'react';

const DashboardHeader = ({ pharmacyName }) => {
  return (
    <header className="h-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-10 sticky top-0 z-10 w-full transition-colors duration-500">
      <div className="flex items-center gap-2 group cursor-pointer">
        <h2 className="text-xl font-black text-gray-800 dark:text-white tracking-tight">{pharmacyName}</h2>
        <svg className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 group transition-all duration-300">
          <svg className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
