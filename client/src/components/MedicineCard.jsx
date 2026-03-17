import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Zap, Clock, ShieldCheck, Tag, Box } from "lucide-react";

const MedicineCard = ({ medicine }) => {
  const inStock = medicine.stock > 0;
  const lowStock = medicine.stock > 0 && medicine.stock <= 5;
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(medicine, 1);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(medicine, 1);
    navigate('/checkout');
  };

  return (
    <div 
      onClick={() => navigate(`/pharmacy/${medicine.pharmacyId?._id}/${encodeURIComponent(medicine.pharmacyId?.name || '')}`)}
      className="group relative bg-white dark:bg-gray-800/40 rounded-[2.5rem] p-6 shadow-xl border-2 border-gray-100 dark:border-gray-700/50 hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-500/30 transition-all duration-500 cursor-pointer flex flex-col h-full overflow-hidden"
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Decorative Background Icon */}
      <div className="absolute -bottom-8 -right-8 opacity-[0.03] dark:opacity-[0.05] text-emerald-500 group-hover:rotate-12 group-hover:scale-125 transition-all duration-700 pointer-events-none">
        <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 4V2h10v2h2v4h-2v14H7V8H5V4h2zm2-2v2h6V2H9zm8 6H7v12h10V8zm-6 2h2v2h2v2h-2v2h-2v-2H9v-2h2v-2z" />
        </svg>
      </div>

      {/* Top Badges */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex flex-wrap gap-2">
          {medicine.category && (
            <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 shadow-sm">
              <Tag className="w-2.5 h-2.5" />
              {medicine.category}
            </div>
          )}
          {lowStock && (
            <div className="px-3 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-600 dark:text-amber-400 text-[9px] font-black uppercase tracking-widest rounded-full animate-pulse shadow-sm">
              Only {medicine.stock} Left
            </div>
          )}
        </div>
      </div>

      {/* Main Info */}
      <div className="mb-6 relative z-10">
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 leading-tight tracking-tight group-hover:text-emerald-600 transition-colors uppercase">
          {medicine.name}
        </h3>
        {medicine.brandName && (
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3">
            {medicine.brandName}
          </p>
        )}
        
        <div className="flex items-center gap-2.5 p-2 bg-gray-50/50 dark:bg-gray-900/40 rounded-2xl border border-gray-100 dark:border-gray-800/50 w-fit group/pharmacy hover:border-emerald-500/30 transition-colors">
          <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center border border-gray-100 dark:border-gray-700 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="pr-3">
            <p className="text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none mb-1">Available at</p>
            <p className="text-[10px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider truncate max-w-[140px]">
              {medicine.pharmacyId?.name || "Verified Pharmacy"}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium flex-1 mb-8 line-clamp-3 relative z-10">
        {medicine.description || "No clinical description available for this medicine."}
      </p>

      {/* Footer: Price + Actions */}
      <div className="mt-auto space-y-6 relative z-10">
        {/* Price Row */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-1">Pricing per unit</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">₹{medicine.price.toFixed(2)}</span>
            </div>
          </div>
          
          <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 shadow-sm ${inStock ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900/50' : 'bg-rose-50 border-rose-100 dark:bg-rose-950/30 dark:border-rose-900/50'}`}>
            <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse' : 'bg-rose-500'}`} />
            <span className={`text-[10px] font-black uppercase tracking-widest ${inStock ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`flex-1 group/btn h-14 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border-2 transition-all duration-300 relative overflow-hidden ${
              inStock
                ? 'border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                : 'border-gray-200 text-gray-300 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-center gap-2 relative z-10">
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add Items</span>
            </div>
          </button>
          
          {inStock && (
            <button
              onClick={handleBuyNow}
              className="flex-1 group/buy h-14 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all duration-300 shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Buy Now</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
