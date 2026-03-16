import React from "react";

const MedicineCard = ({ medicine }) => {
  const inStock = medicine.stock > 0;

  return (
    <div className="bg-white dark:bg-gray-800/80 rounded-[40px] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-emerald-50 dark:border-gray-700/50 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-500 group relative overflow-hidden flex flex-col h-full backdrop-blur-sm">
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="flex-1">
          <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-2 leading-tight group-hover:text-[#059669] transition-colors">
            {medicine.name}
          </h3>
          <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
             <div className="w-5 h-5 bg-emerald-50 dark:bg-emerald-900/30 rounded-md flex items-center justify-center">
                <svg className="w-3 h-3 text-[#059669] dark:text-[#34d399]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
             </div>
             <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest truncate max-w-[150px]">
               {medicine.pharmacyId?.name || "Local Pharmacy"}
             </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
            <span className="text-3xl font-black text-[#059669] dark:text-[#34d399] drop-shadow-sm">
              ₹{medicine.price.toFixed(2)}
            </span>
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-tighter">PER UNIT</span>
        </div>
      </div>

      {medicine.description && (
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-10 leading-relaxed font-medium flex-1">
          {medicine.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto border-t border-gray-100 dark:border-gray-700 pt-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${inStock ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-red-400'}`}></div>
          <span className={`text-sm font-black uppercase tracking-widest ${inStock ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
            {inStock ? `${medicine.stock} IN STOCK` : 'OUT OF STOCK'}
          </span>
        </div>
        
        <button 
          className={`flex items-center justify-center gap-2 font-black text-xs uppercase tracking-[0.2em] transition-all ${inStock ? 'text-[#059669] hover:gap-4' : 'text-gray-300 cursor-not-allowed'}`}
          disabled={!inStock}
        >
          {inStock ? 'RESERVE' : 'NOTIFY'} {inStock && <span>→</span>}
        </button>
      </div>
      
      {/* Decorative Background Icon */}
      <div className="absolute -bottom-10 -right-10 opacity-[0.03] text-[#059669] group-hover:rotate-12 group-hover:scale-125 transition-all duration-700">
          <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 4V2h10v2h2v4h-2v14H7V8H5V4h2zm2-2v2h6V2H9zm8 6H7v12h10V8zm-6 2h2v2h2v2h-2v2h-2v-2H9v-2h2v-2z" />
          </svg>
      </div>
    </div>
  );
};

export default MedicineCard;
