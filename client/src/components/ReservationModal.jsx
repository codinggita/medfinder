import React, { useState, useEffect } from 'react';

const ReservationModal = ({ isOpen, onClose, medicine }) => {
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [note, setNote] = useState('');
  const [isReserved, setIsReserved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setCustomerName('');
      setMobileNumber('');
      setNote('');
      setIsReserved(false);
      setLoading(false);
      setTimeout(() => setIsMounted(true), 10);
    } else {
      setIsMounted(false);
    }
  }, [isOpen]);

  if (!isOpen || !medicine) return null;

  const handleConfirm = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsReserved(true);
    }, 1500);
  };

  const totalPrice = (quantity * medicine.price).toFixed(2);
  const reservationId = `RES-${Math.floor(100000 + Math.random() * 900000)}`;

  // Floating Label Input Component
  const FloatingInput = ({ label, value, onChange, type = "text", required = false }) => {
    const [focused, setFocused] = useState(false);
    return (
      <div className="relative group">
        <label
          className={`absolute left-6 transition-all duration-300 pointer-events-none ${focused || value
            ? 'top-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest'
            : 'top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 dark:text-gray-500'
            }`}
        >
          {label}
        </label>
        <input
          type={type}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full px-6 pt-7 pb-3 bg-gray-50/50 dark:bg-gray-800/40 border-2 transition-all rounded-2xl text-sm font-black tracking-tight outline-none ${focused
            ? 'border-emerald-500/30 ring-4 ring-emerald-500/5 bg-white dark:bg-gray-800'
            : 'border-transparent dark:text-white'
            } ${value && !focused ? 'border-emerald-100 dark:border-emerald-900/30' : ''}`}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  };

  if (isReserved) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className={`absolute inset-0 bg-emerald-950/40 dark:bg-[#020617]/70 backdrop-blur-xl transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}></div>
        <div className={`bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-[3rem] w-full max-w-lg p-12 shadow-2xl shadow-emerald-500/10 border border-white/20 dark:border-gray-800 relative transition-all duration-500 transform ${isMounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'} text-center`}>
          <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-8 animate-[bounce_2s_infinite]">
            <svg className="w-12 h-12 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" className="animate-[draw_0.6s_ease-out_forwards]" />
            </svg>
          </div>
          <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">Reserved!</h3>
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-10 leading-relaxed">
            Your reservation for <span className="text-emerald-600 dark:text-emerald-400 font-black">{quantity}x {medicine.name}</span> is ready for pickup.
          </p>

          <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-3xl p-8 mb-10 text-left border border-emerald-100/50 dark:border-emerald-900/20">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ID</span>
              <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-wider">{reservationId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pickup</span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-tighter">Ready in 15m</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-6 bg-emerald-600 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 hover:scale-[1.02] active:scale-95"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 overflow-y-auto overflow-x-hidden">
      <div className={`fixed inset-0 bg-emerald-950/50 dark:bg-[#020617]/80 backdrop-blur-xl transition-opacity duration-700 ${isMounted ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}></div>

      <div className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl w-full sm:max-w-[900px] rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/20 dark:border-gray-800 relative transition-all duration-700 transform ${isMounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full sm:translate-y-0 sm:scale-95 opacity-0'} mt-auto sm:my-auto`}>
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em]">Safe & Secure</span>
            </div>
            <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Reserve Medicine</h3>
          </div>
          <button
            onClick={onClose}
            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-400 transition-all hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleConfirm}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Product Context */}
            <div className="lg:col-span-5 space-y-10">
              <div className="relative group">
                <div className="absolute -inset-4 bg-emerald-600/5 dark:bg-emerald-400/5 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative bg-white dark:bg-gray-800/50 rounded-[2rem] p-8 border border-gray-100 dark:border-gray-700/50 shadow-sm overflow-hidden flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl mb-6 flex items-center justify-center text-emerald-600 rotate-3 group-hover:rotate-12 transition-transform duration-500">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 4V2h10v2h2v4h-2v14H7V8H5V4h2zm2-2v2h6V2H9zm8 6H7v12h10V8zm-6 2h2v2h2v2h-2v2h-2v-2H9v-2h2v-2z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">In Stock</span>
                  </div>
                  <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{medicine.name}</h4>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">@{medicine.pharmacyId?.name || "Verified Pharmacy"}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">₹{medicine.price.toFixed(2)}</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">/ Unit</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Quantity</label>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${medicine.stock < 5 ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {medicine.stock < 5 ? `Only ${medicine.stock} left!` : `${medicine.stock} available`}
                  </span>
                </div>
                <div className="flex items-center bg-gray-50/50 dark:bg-gray-800/30 p-2 rounded-[2rem] border border-gray-100 dark:border-gray-700/50">
                  <button
                    type="button"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all ${quantity <= 1 ? 'text-gray-200 dark:text-gray-800' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm hover:text-emerald-600'}`}
                  >
                    <span className="text-2xl font-black">−</span>
                  </button>
                  <div className="flex-1 text-center overflow-hidden">
                    <span className="text-3xl font-black text-gray-900 dark:text-white animate-in slide-in-from-top-4 duration-300 inline-block w-12">{quantity}</span>
                  </div>
                  <button
                    type="button"
                    disabled={quantity >= medicine.stock}
                    onClick={() => setQuantity(Math.min(medicine.stock, quantity + 1))}
                    className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all ${quantity >= medicine.stock ? 'text-gray-200 dark:text-gray-800' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm hover:text-emerald-600'}`}
                  >
                    <span className="text-2xl font-black">+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Collection Flow */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-white dark:bg-gray-800/30 rounded-[2.5rem] p-1 shadow-inner border border-gray-50 dark:border-gray-800/50">
                <div className="p-8 space-y-6">
                  <FloatingInput label="Full Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                  <FloatingInput label="Mobile Number" type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
                  <div className="space-y-2">
                    <textarea
                      placeholder="Special instructions or notes..."
                      className="w-full px-6 py-5 bg-gray-50/50 dark:bg-gray-800/40 border-2 border-transparent transition-all rounded-2xl text-sm font-black tracking-tight outline-none focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 focus:bg-white dark:focus:bg-gray-800 dark:text-white resize-none h-24 dark:placeholder:text-gray-700"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary Premium Card */}
              <div className="bg-emerald-600/5 dark:bg-emerald-400/5 rounded-[2.5rem] p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-end mb-8 pt-4">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total To Pay</p>
                      <h5 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">₹{totalPrice}</h5>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2 px-3 py-1 bg-emerald-500/10 rounded-full">Express Pickup</span>
                      <span className="block text-[10px] font-black text-gray-400 uppercase tracking-tighter font-mono">Ready in ~15m</span>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-emerald-500/10">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || medicine.stock === 0}
                      className={`flex-[2] py-5 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 relative overflow-hidden group/btn ${loading || medicine.stock === 0 ? 'bg-gray-100 dark:bg-gray-800 text-gray-300 cursor-not-allowed border border-transparent' : 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-95'}`}
                    >
                      {loading ? (
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <>
                          <span>Confirm Reservation</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 pointer-events-none"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;
