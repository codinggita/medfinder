import React from 'react';

const StatCard = ({ title, value, type }) => {
  const typeStyles = {
    total: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
      indicator: 'bg-emerald-500'
    },
    available: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      iconBg: 'bg-green-100',
      indicator: 'bg-green-500'
    },
    low: {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      iconBg: 'bg-orange-100',
      indicator: 'bg-orange-500'
    },
    out: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      iconBg: 'bg-red-100',
      indicator: 'bg-red-500'
    }
  };

  const style = typeStyles[type] || typeStyles.total;

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-500 group flex items-start gap-6">
      <div className={`${style.iconBg} dark:bg-opacity-10 dark:bg-emerald-500 p-4 rounded-2xl transition-transform group-hover:scale-110 duration-500`}>
        {type === 'total' && (
          <svg className={`w-8 h-8 ${style.text} dark:text-emerald-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        )}
        {(type === 'available' || type === 'low' || type === 'out') && (
          <div className={`w-8 h-8 rounded-full ${style.indicator} flex items-center justify-center border-4 border-white dark:border-gray-900 shadow-sm ring-4 ring-gray-50 dark:ring-gray-800`}></div>
        )}
      </div>
      <div>
        <p className="text-gray-400 dark:text-gray-500 font-bold text-sm uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-4xl font-black text-gray-800 dark:text-gray-100 tracking-tighter">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
