import React from 'react';

const DashboardHeader = ({ pharmacyName }) => {
  return (
    <header className="h-24 bg-white/80 dark:bg-[#022C22]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-12 sticky top-0 z-20 w-full transition-all duration-500 shadow-sm">
      <div className="flex flex-col">
        <div className="flex items-center gap-3 group cursor-pointer">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight group-hover:text-emerald-600 transition-colors duration-300">
            {pharmacyName}
          </h2>
          <div className="w-6 h-6 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 group-hover:translate-x-0">
            <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-emerald-500/50 -mt-1 ml-0.5">Verified Medical Partner</p>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full border border-emerald-100 dark:border-emerald-500/10">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">Live Status: Active</span>
        </div>

        <button className="relative p-3.5 bg-gray-50 dark:bg-white/5 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 group transition-all duration-500 shadow-sm hover:shadow-emerald-500/5">
          <svg className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full shadow-sm"></span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
