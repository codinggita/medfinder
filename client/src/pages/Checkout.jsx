import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const FloatingInput = ({ label, value, onChange, type = 'text', required = false, autoComplete }) => {
  const [focused, setFocused] = useState(false);
  const isValid = value.length > 2;
  return (
    <div className="relative">
      <label
        className={`absolute left-5 transition-all duration-200 pointer-events-none z-10 ${
          focused || value
            ? 'top-2.5 text-[9px] font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400'
            : 'top-1/2 -translate-y-1/2 text-sm text-gray-400 dark:text-gray-500'
        }`}
      >
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        required={required}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={value}
        onChange={onChange}
        className={`w-full px-5 pt-7 pb-3 rounded-2xl border-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 outline-none transition-all ${
          focused
            ? 'border-emerald-500 ring-4 ring-emerald-500/10'
            : isValid
            ? 'border-emerald-200 dark:border-emerald-800'
            : 'border-gray-200 dark:border-gray-700'
        }`}
      />
    </div>
  );
};

const Checkout = () => {
  const { cartItems, subtotal, deliveryCharge, total, clearCart } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(() => {
    // Auto-fill from last saved address
    try {
      const saved = localStorage.getItem('medfinder_address');
      return saved ? JSON.parse(saved) : { fullName: '', mobile: '', address: '', city: '', pincode: '' };
    } catch {
      return { fullName: '', mobile: '', address: '', city: '', pincode: '' };
    }
  });
  const [payment, setPayment] = useState('Cash on Delivery');

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    if (!user) { navigate('/login'); return; }
    if (cartItems.length === 0) { setError('Your cart is empty.'); return; }

    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const items = cartItems.map(i => ({
        medicine: i._id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        pharmacyName: i.pharmacyId?.name || '',
      }));
      const { data } = await axios.post('http://localhost:5000/api/orders', {
        items,
        shippingAddress: form,
        paymentMethod: payment,
        subtotal,
        deliveryCharge,
        totalPrice: total,
      }, config);
      // Save address for next time
      localStorage.setItem('medfinder_address', JSON.stringify(form));
      clearCart();
      navigate('/order-success', { state: { order: data } });
    } catch (err) {
      console.error('Place order error:', err);
      const msg = err.response?.data?.message || 'Failed to place order. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-8">
        <div className="text-center space-y-6">
          <div className="text-7xl">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your cart is empty</h2>
          <p className="text-gray-500">Add some medicines before checking out.</p>
          <button onClick={() => navigate('/search')} className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-semibold hover:bg-emerald-700 transition-all">
            Browse Medicines
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">Secure Checkout</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Complete Your Order</h1>
        </div>

        {/* Inline Error */}
        {error && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800 rounded-2xl text-rose-600 dark:text-rose-400">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-sm">{error}</span>
            <button onClick={() => setError('')} className="ml-auto text-rose-400 hover:text-rose-600">✕</button>
          </div>
        )}

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Delivery + Payment */}
            <div className="lg:col-span-7 space-y-6">
              {/* Delivery Address */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border-2 border-gray-100 dark:border-gray-800 shadow-lg">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-600 text-white rounded-xl flex items-center justify-center text-xs font-bold">1</span>
                  Delivery Address
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingInput label="Full Name" value={form.fullName} onChange={set('fullName')} required autoComplete="name" />
                    <FloatingInput label="Mobile Number" type="tel" value={form.mobile} onChange={set('mobile')} required autoComplete="tel" />
                  </div>
                  <FloatingInput label="Street Address" value={form.address} onChange={set('address')} required autoComplete="street-address" />
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingInput label="City" value={form.city} onChange={set('city')} required autoComplete="address-level2" />
                    <FloatingInput label="Pincode" value={form.pincode} onChange={set('pincode')} required autoComplete="postal-code" />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border-2 border-gray-100 dark:border-gray-800 shadow-lg">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-600 text-white rounded-xl flex items-center justify-center text-xs font-bold">2</span>
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { id: 'cod', label: 'Cash on Delivery', icon: '💵', available: true },
                    { id: 'upi', label: 'UPI (Coming Soon)', icon: '📱', available: false },
                    { id: 'card', label: 'Card / Razorpay (Coming Soon)', icon: '💳', available: false },
                  ].map(opt => (
                    <label key={opt.id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${payment === opt.label ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' : 'border-gray-100 dark:border-gray-800'} ${!opt.available ? 'opacity-40 cursor-not-allowed' : 'hover:border-gray-200'}`}>
                      <input type="radio" name="payment" value={opt.label} checked={payment === opt.label} onChange={() => opt.available && setPayment(opt.label)} className="accent-emerald-600 w-4 h-4" disabled={!opt.available} />
                      <span className="text-xl">{opt.icon}</span>
                      <span className="font-medium text-gray-900 dark:text-white text-sm">{opt.label}</span>
                      {payment === opt.label && opt.available && (
                        <span className="ml-auto text-[10px] font-semibold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-lg uppercase tracking-wider">Selected</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border-2 border-gray-100 dark:border-gray-800 shadow-lg sticky top-28">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-600 text-white rounded-xl flex items-center justify-center text-xs font-bold">3</span>
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1">
                  {cartItems.map(item => (
                    <div key={item._id} className="flex gap-3 items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                      <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7 4V2h10v2h2v4h-2v14H7V8H5V4h2zm2-2v2h6V2H9zm8 6H7v12h10V8zm-6 2h2v2h2v2h-2v2h-2v-2H9v-2h2v-2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.quantity} × ₹{item.price}</p>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white text-sm">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2.5 border-t-2 border-gray-100 dark:border-gray-800 pt-5">
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400"><span>Subtotal</span><span className="font-semibold">₹{subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm text-emerald-600"><span>Delivery</span><span className="font-semibold">{deliveryCharge === 0 ? '🎉 FREE' : `₹${deliveryCharge}`}</span></div>
                  {deliveryCharge > 0 && <p className="text-xs text-gray-400">Free delivery on orders above ₹500</p>}
                  <div className="flex justify-between items-center pt-3 border-t-2 border-gray-100 dark:border-gray-800">
                    <span className="font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-900/10 rounded-xl px-4 py-3 mt-5 border border-emerald-100 dark:border-emerald-800">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Express delivery in 30–60 minutes
                </div>

                {!user && (
                  <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-xl text-xs text-amber-700 dark:text-amber-400 font-medium">
                    ⚠️ Please <button onClick={() => navigate('/login')} className="underline font-bold">login</button> to place your order.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !user}
                  className="mt-5 w-full py-5 bg-emerald-600 text-white rounded-2xl font-semibold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Placing order...
                    </>
                  ) : (
                    <>
                      Place Order
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
