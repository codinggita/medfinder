import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('medfinder_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('medfinder_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (medicine, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i._id === medicine._id);
      if (existing) {
        const newQty = Math.min(existing.quantity + qty, medicine.stock);
        showToast(`Updated "${medicine.name}" quantity`);
        return prev.map(i => i._id === medicine._id ? { ...i, quantity: newQty } : i);
      }
      showToast(`"${medicine.name}" added to cart 🛒`);
      return [...prev, { ...medicine, quantity: qty }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i._id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCartItems(prev => prev.map(i => i._id === id ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryCharge = subtotal > 0 ? (subtotal >= 500 ? 0 : 40) : 0;
  const total = subtotal + deliveryCharge;

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQty, clearCart,
      cartCount, subtotal, deliveryCharge, total,
      isCartOpen, setIsCartOpen,
      toast,
    }}>
      {children}
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] px-6 py-4 rounded-2xl shadow-2xl text-white text-sm font-black uppercase tracking-widest flex items-center gap-3 transition-all animate-in slide-in-from-bottom-4 duration-500 ${toast.type === 'error' ? 'bg-rose-600' : 'bg-emerald-600'}`}>
          <span>{toast.type === 'success' ? '✓' : '!'}</span>
          <span>{toast.msg}</span>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
