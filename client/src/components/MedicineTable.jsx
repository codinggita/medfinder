import React, { useState } from 'react';
import LuxeDropdown from './LuxeDropdown';

const MedicineTable = ({ medicines, onDelete, onEdit, onAdd }) => {
  const [viewFilter, setViewFilter] = useState('All Items');

  return (
    <div className="bg-white dark:bg-[#022C22]/40 backdrop-blur-sm rounded-[3rem] p-12 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-white/5 flex flex-col gap-10 transition-all duration-500">
      {/* Table Header / Actions */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1 max-w-2xl">
           <button 
             onClick={onAdd}
             className="px-10 py-5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:shadow-[0_15px_30px_rgba(5,150,105,0.3)] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 whitespace-nowrap shadow-lg shadow-emerald-900/10"
           >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
             </svg>
             Add to Stock
           </button>
           
           <div className="relative flex-1 group">
             <input 
               type="text" 
               placeholder="Filter medicine name..." 
               className="w-full pl-16 pr-8 py-5 bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-[1.5rem] text-sm font-bold outline-none ring-0 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white dark:focus:bg-white/10 transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 dark:text-white"
             />
             <div className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-300 group-focus-within:text-emerald-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-4 self-end xl:self-auto">
          <LuxeDropdown 
             className="w-48"
             options={[
               { id: 'All Items', label: 'All Items', icon: '📦' },
               { id: 'In Stock', label: 'In Stock', icon: '✅' },
               { id: 'Low Stock', label: 'Low Stock', icon: '⚠️' },
               { id: 'Critical', label: 'Critical', icon: '🚨' }
             ]}
             selected={viewFilter}
             onChange={setViewFilter}
             placeholder="View Filter"
          />
        </div>

      </div>

      {/* Actual Table */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-separate border-spacing-y-4 min-w-[900px]">
          <thead>
            <tr className="text-gray-400 dark:text-emerald-500/40 text-[10px] font-black uppercase tracking-[0.3em]">
              <th className="px-8 pb-4">Product Detail</th>
              <th className="px-8 pb-4">Category</th>
              <th className="px-8 pb-4">Inventory</th>
              <th className="px-8 pb-4">Pricing</th>
              <th className="px-8 pb-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => (
              <tr key={med._id} className="group transition-all duration-300">
                <td className="px-8 py-7 bg-gray-50/30 dark:bg-white/5 rounded-l-[1.5rem] group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-colors">
                    <div className="flex flex-col">
                        <span className="font-black text-lg text-gray-900 dark:text-white tracking-tight leading-none mb-1">{med.name}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">SKU: {med._id.slice(-6).toUpperCase()}</span>
                    </div>
                </td>
                <td className="px-8 py-7 bg-gray-50/30 dark:bg-white/5 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <span className="text-gray-500 dark:text-emerald-400/60 font-black text-[10px] uppercase tracking-widest">
                        {med.category || 'General Pharma'}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-7 bg-gray-50/30 dark:bg-white/5 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-colors">
                  <div className="flex flex-col">
                    <span className={`font-black text-lg tracking-tight ${med.stock <= 10 ? 'text-rose-500' : 'text-gray-900 dark:text-white'}`}>
                        {med.stock} pcs
                    </span>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${med.stock <= 10 ? 'text-rose-400/50' : 'text-gray-400'}`}>
                        {med.stock <= 0 ? 'Out of Stock' : med.stock <= 10 ? 'Low Priority' : 'Stable'}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-7 bg-gray-50/30 dark:bg-white/5 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-colors text-xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter">
                  ₹{med.price?.toFixed(2)}
                </td>
                <td className="px-8 py-7 bg-gray-50/30 dark:bg-white/5 rounded-r-[1.5rem] group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-colors text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                    <button 
                      onClick={() => onEdit(med)}
                      className="p-3.5 bg-white dark:bg-white/5 text-gray-400 hover:text-emerald-600 hover:shadow-lg transition-all rounded-xl"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => onDelete(med._id)}
                      className="p-3.5 bg-white dark:bg-white/5 text-gray-400 hover:text-rose-500 hover:shadow-lg transition-all rounded-xl"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Luxe */}
      <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-10">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total: {medicines.length} Entries</p>
        <div className="flex items-center gap-3">
          <button className="w-12 h-12 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-900/20 active:scale-90 transition-transform">1</button>
          <button className="w-12 h-12 bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 rounded-2xl font-black text-sm hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-600 transition-all">2</button>
          <button className="flex items-center gap-2 ml-4 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600 hover:text-emerald-700 transition-all">
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineTable;
