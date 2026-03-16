import React from 'react';

const StatCard = ({ title, value, type }) => {
  const typeStyles = {
    total: {
      gradient: 'from-emerald-500 to-emerald-700',
      iconColor: 'text-emerald-200',
      shadow: 'shadow-emerald-900/10',
      glow: 'bg-emerald-400/20'
    },
    available: {
      gradient: 'from-green-500 to-emerald-600',
      iconColor: 'text-green-200',
      shadow: 'shadow-green-900/10',
      glow: 'bg-green-400/20'
    },
    low: {
      gradient: 'from-orange-400 to-orange-600',
      iconColor: 'text-orange-200',
      shadow: 'shadow-orange-900/10',
      glow: 'bg-orange-400/20'
    },
    out: {
      gradient: 'from-rose-500 to-red-700',
      iconColor: 'text-rose-200',
      shadow: 'shadow-red-900/10',
      glow: 'bg-rose-400/20'
    }
  };

  const style = typeStyles[type] || typeStyles.total;

  return (
    <div className={`relative overflow-hidden bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_70px_rgba(16,185,129,0.12)] transition-all duration-500 group`}>
      {/* Decorative Glow */}
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${style.glow}`}></div>

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500 mb-3 ml-0.5">{title}</p>
          <h3 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-2 group-hover:scale-105 transition-transform duration-500 origin-left">
            {value}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${style.gradient} animate-pulse`}></span>
            <span className="text-[10px] font-bold text-gray-400">Live Sync</span>
          </div>
        </div>

        <div className={`p-5 rounded-[1.75rem] bg-gradient-to-br ${style.gradient} shadow-lg ${style.shadow} group-hover:rotate-6 transition-all duration-500`}>
          {type === 'total' && (
            <svg className={`w-8 h-8 ${style.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          )}
          {(type === 'available' || type === 'low' || type === 'out') && (
            <svg className={`w-8 h-8 ${style.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
