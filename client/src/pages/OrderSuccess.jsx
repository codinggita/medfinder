import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SuccessIcon, DownloadDoneIcon } from '../components/AnimatedIcons';

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const orderId = order?._id?.slice(-8).toUpperCase() || 'MF' + Math.floor(Math.random() * 1000000);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="bg-white dark:bg-gray-900 rounded-[3rem] p-12 w-full max-w-lg shadow-2xl border-2 border-gray-100 dark:border-gray-800 text-center"
      >
        {/* Animated Success Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-28 h-28 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center border-2 border-emerald-100 dark:border-emerald-800">
            <SuccessIcon size={60} color="#10b981" duration={3000} />
          </div>
        </div>

        {/* Confetti dots */}
        <div className="flex justify-center gap-1.5 mb-6">
          {['bg-emerald-400','bg-amber-400','bg-sky-400','bg-violet-400','bg-rose-400'].map((c,i) => (
            <motion.div key={i} className={`w-2 h-2 rounded-full ${c}`}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.8, delay: i * 0.1, repeat: 2, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Order Placed! 🎉</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
          Your medicines are being prepared and will be delivered in{' '}
          <span className="text-emerald-600 font-bold">30–60 minutes</span>.
        </p>

        {/* Order Details Card */}
        <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl p-6 mb-8 text-left border-2 border-emerald-100 dark:border-emerald-900/30 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Order ID</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono tracking-wider text-sm">#{orderId}</span>
          </div>
          {order?.totalPrice && (
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Total Paid</span>
              <span className="font-bold text-gray-900 dark:text-white text-xl">₹{order.totalPrice.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Payment</span>
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{order?.paymentMethod || 'Cash on Delivery'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Delivery</span>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-semibold uppercase tracking-widest">30–60 mins</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Status</span>
            <span className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-[10px] font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Pending Confirmation
            </span>
          </div>
        </div>

        {/* Download receipt row */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-6">
          <DownloadDoneIcon size={18} color="#9ca3af" duration={3000} />
          <span>Receipt will be emailed to you</span>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/profile/orders')}
            className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-semibold text-sm hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 hover:scale-[1.02] active:scale-95"
          >
            Track My Order →
          </button>
          <button
            onClick={() => navigate('/search')}
            className="w-full py-4 border-2 border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 rounded-2xl font-semibold text-sm hover:border-emerald-200 hover:text-emerald-600 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
