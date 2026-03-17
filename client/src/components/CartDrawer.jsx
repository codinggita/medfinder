import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartDrawer = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQty, subtotal, deliveryCharge, total, cartCount } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex">
      {/* Backdrop */}
      <div
        className="flex-1 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="w-full max-w-md bg-white dark:bg-gray-900 flex flex-col shadow-2xl h-full animate-in slide-in-from-right duration-500">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b-2 border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">My Cart</h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20 space-y-6">
              <div className="w-28 h-28 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-300">
                <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Cart is Empty</h3>
                <p className="text-sm text-gray-400 font-medium">Add medicines to start shopping</p>
              </div>
              <button
                onClick={() => { setIsCartOpen(false); navigate('/search'); }}
                className="px-8 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item._id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 group">
                {/* Icon */}
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0 border border-emerald-100 dark:border-emerald-800">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 4V2h10v2h2v4h-2v14H7V8H5V4h2zm2-2v2h6V2H9zm8 6H7v12h10V8zm-6 2h2v2h2v2h-2v2h-2v-2H9v-2h2v-2z" />
                  </svg>
                </div>
                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-gray-900 dark:text-white text-sm leading-tight tracking-tight truncate">{item.name}</h4>
                  <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mt-0.5">₹{item.price.toFixed(2)} / unit</p>
                  {/* Qty Stepper */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center bg-white dark:bg-gray-700 rounded-xl border-2 border-gray-200 dark:border-gray-600 overflow-hidden">
                      <button onClick={() => updateQty(item._id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-emerald-600 font-black text-lg transition-colors">−</button>
                      <span className="w-8 text-center font-black text-gray-900 dark:text-white text-sm">{item.quantity}</span>
                      <button onClick={() => updateQty(item._id, item.quantity + 1)} disabled={item.quantity >= item.stock} className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-emerald-600 font-black text-lg transition-colors disabled:opacity-30">+</button>
                    </div>
                    <span className="font-black text-gray-900 dark:text-white text-sm ml-auto">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
                {/* Remove */}
                <button onClick={() => removeFromCart(item._id)} className="p-2 text-gray-300 hover:text-rose-500 transition-colors self-start flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Order Summary + Actions */}
        {cartItems.length > 0 && (
          <div className="border-t-2 border-gray-100 dark:border-gray-800 px-6 py-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-gray-500 dark:text-gray-400">
                <span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-emerald-600 dark:text-emerald-400">
                <span>Delivery</span><span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
              </div>
              {deliveryCharge === 0 && (
                <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">✓ Free delivery applied</p>
              )}
            </div>
            <div className="flex justify-between items-center py-4 border-t-2 border-gray-100 dark:border-gray-800">
              <span className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">Total</span>
              <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">₹{total.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-emerald-600 font-black uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/10 rounded-xl px-4 py-2.5 border border-emerald-100 dark:border-emerald-800">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Delivery in 30–60 minutes
            </div>
            <button
              onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
              className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-3"
            >
              Proceed to Checkout
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
