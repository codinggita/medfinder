import React from 'react';

const AddMedicineModal = ({ isOpen, onClose, onSubmit, name, setName, stock, setStock, price, setPrice }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-emerald-950/40 dark:bg-[#020617]/60 backdrop-blur-md transition-all sm:backdrop-blur-xl" onClick={onClose}></div>
      <div className="bg-white dark:bg-gray-900 rounded-[3rem] w-full max-w-lg p-12 med-shadow-premium relative animate-in fade-in zoom-in duration-500 border border-gray-100 dark:border-gray-800">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-10">
          <h3 className="text-3xl font-black text-gray-800 dark:text-white tracking-tighter mb-2">New Medical Stock</h3>
          <p className="text-gray-400 dark:text-gray-500 font-bold text-sm tracking-wide uppercase">Add a new medicine to your digital inventory</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-600 ml-1">Medicine Name</label>
            <input
              type="text"
              placeholder="e.g. Amoxicillin 500mg"
              className="w-full px-8 py-5 bg-gray-50 dark:bg-gray-800 border-none rounded-[2rem] text-sm font-black tracking-tight outline-none ring-0 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-gray-200 dark:placeholder:text-gray-600 dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-600 ml-1">Quantity</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                className="w-full px-8 py-5 bg-gray-50 dark:bg-gray-800 border-none rounded-[2rem] text-sm font-black tracking-tight outline-none ring-0 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-gray-200 dark:placeholder:text-gray-600 dark:text-white"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-600 ml-1">Price per Unit</label>
              <div className="relative">
                <span className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600 font-black">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full pl-12 pr-8 py-5 bg-gray-50 dark:bg-gray-800 border-none rounded-[2rem] text-sm font-black tracking-tight outline-none ring-0 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-gray-200 dark:placeholder:text-gray-600 dark:text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <button className="w-full py-6 bg-[#1E7F5C] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.25em] hover:bg-[#16654a] transition-all shadow-[0_20px_40px_rgba(30,127,92,0.3)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_rgba(30,127,92,0.4)] active:scale-95 mt-4">
            Import to Inventory
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicineModal;
