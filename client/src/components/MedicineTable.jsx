import React from 'react';

const MedicineTable = ({ medicines, onDelete, onEdit, onAdd }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-800/50 flex flex-col gap-8 transition-colors duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 flex-1 max-w-xl">
           <button 
             onClick={onAdd}
             className="px-8 py-4 bg-[#1E7F5C] text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] hover:bg-[#16654a] transition-all shadow-xl hover:shadow-emerald-900/10 active:scale-95 flex items-center gap-2 whitespace-nowrap"
           >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
             </svg>
             Add Medicine
           </button>
           
           <div className="relative flex-1 group">
             <input 
               type="text" 
               placeholder="Search..." 
               className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-sm font-medium outline-none ring-0 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-gray-300 dark:placeholder:text-gray-500 group-hover:bg-gray-100 dark:group-hover:bg-gray-750 dark:text-white"
             />
             <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
           </div>
        </div>

        <div className="flex items-center gap-4">
          <select className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-sm font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 outline-none hover:bg-gray-100 dark:hover:bg-gray-750 transition-all cursor-pointer">
            <option>Stock Status</option>
            <option>Available</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto -mx-10 px-10">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-50 dark:border-gray-800 text-gray-400 dark:text-gray-500 text-xs font-black uppercase tracking-[0.2em]">
              <th className="pb-6 w-1/4">Medicine Name</th>
              <th className="pb-6">Category</th>
              <th className="pb-6">Stock</th>
              <th className="pb-6">Price</th>
              <th className="pb-6">Last Updated</th>
              <th className="pb-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {medicines.map((med) => (
              <tr key={med._id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-all duration-300">
                <td className="py-6 font-black text-gray-800 dark:text-gray-200 tracking-tight">{med.name}</td>
                <td className="py-6">
                  <span className="text-gray-400 dark:text-gray-500 font-bold text-xs uppercase tracking-widest">
                    {med.category || 'Antibiotics'}
                  </span>
                </td>
                <td className="py-6">
                  <span className="font-black text-gray-800 dark:text-gray-200">{med.stock}</span>
                </td>
                <td className="py-6">
                  <span className="font-black text-gray-800 dark:text-gray-200">${med.price?.toFixed(2)}</span>
                </td>
                <td className="py-6">
                  <span className="text-gray-400 dark:text-gray-500 text-xs font-bold">
                    {med.updatedAt ? med.updatedAt.split('T')[0] : med.createdAt?.split('T')[0] || '2023-10-27'}
                  </span>
                </td>
                <td className="py-6 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                    <button 
                      onClick={() => onEdit(med)}
                      className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-white transition-all shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => onDelete(med._id)}
                      className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-xl hover:bg-red-500 dark:hover:bg-red-400 hover:text-white transition-all shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex items-center gap-4 text-gray-300 dark:text-gray-600 font-black text-xs uppercase tracking-[0.2em] cursor-pointer hover:text-gray-500 dark:hover:text-gray-400 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
          Pages
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 bg-[#1E7F5C] text-white rounded-xl font-black text-sm shadow-lg shadow-emerald-900/20">1</button>
          <button className="w-10 h-10 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-xl font-black text-sm hover:bg-gray-100 dark:hover:bg-gray-750 transition-all">2</button>
        </div>
        <div className="flex items-center gap-4 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-[0.2em] cursor-pointer hover:text-emerald-700 dark:hover:text-emerald-300 transition-all">
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MedicineTable;
