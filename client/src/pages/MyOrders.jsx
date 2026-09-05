import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/config';
import { AuthContext } from '../context/AuthContext';

const STATUS_STEPS = [
  { key: 'Pending',   label: 'Order Placed',  icon: '📋', color: 'bg-amber-500',   text: 'text-amber-600',   light: 'bg-amber-50 border-amber-200',    badge: 'text-amber-600' },
  { key: 'Confirmed', label: 'Confirmed',     icon: '✅', color: 'bg-blue-500',    text: 'text-blue-600',    light: 'bg-blue-50 border-blue-200',      badge: 'text-blue-600' },
  { key: 'Shipped',   label: 'Out for Delivery', icon: '🚴', color: 'bg-purple-500', text: 'text-purple-600',  light: 'bg-purple-50 border-purple-200',  badge: 'text-purple-600' },
  { key: 'Delivered', label: 'Delivered',     icon: '🎉', color: 'bg-emerald-500', text: 'text-emerald-600', light: 'bg-emerald-50 border-emerald-200', badge: 'text-emerald-600' },
];

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const statusStep = STATUS_STEPS.findIndex(s => s.key === order.orderStatus);
  const currentStatus = STATUS_STEPS[statusStep] || STATUS_STEPS[0];
  const isCancelled = order.orderStatus === 'Cancelled';
  const date = new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Card Header */}
      <div className="p-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-bold text-gray-900 dark:text-white text-sm">Order #{order._id.slice(-8).toUpperCase()}</span>
            <span className={`px-3 py-1 rounded-full text-[11px] font-semibold border-2 ${currentStatus.light} ${currentStatus.badge} ${isCancelled ? 'bg-rose-50 border-rose-200 text-rose-600' : ''}`}>
              {isCancelled ? '🚫 Cancelled' : currentStatus.icon + ' ' + currentStatus.label}
            </span>
          </div>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-gray-400 mb-0.5">Total</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{order.totalPrice.toFixed(2)}</p>
        </div>
      </div>

      {/* Progress Tracker (only if not cancelled) */}
      {!isCancelled && (
        <div className="px-6 pb-4">
          <div className="flex items-center gap-0">
            {STATUS_STEPS.map((step, idx) => {
              const isCompleted = idx <= statusStep;
              const isCurrent = idx === statusStep;
              return (
                <React.Fragment key={step.key}>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs border-2 transition-all ${isCompleted ? step.color + ' border-transparent text-white' : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-300'} ${isCurrent ? 'ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ' + step.color + '/30' : ''}`}>
                      {isCompleted ? <span className="text-sm">{step.icon}</span> : <span className="text-gray-400 text-xs">{idx + 1}</span>}
                    </div>
                    <span className={`text-[9px] mt-1.5 font-semibold uppercase tracking-wider text-center max-w-[56px] leading-tight ${isCurrent ? step.text : 'text-gray-400'}`}>{step.label}</span>
                  </div>
                  {idx < STATUS_STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 -mt-4 rounded-full ${idx < statusStep ? step.color : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          {order.orderStatus !== 'Delivered' && (
            <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Estimated delivery in 30–60 minutes
            </div>
          )}
        </div>
      )}

      {/* Items Preview */}
      <div className="border-t-2 border-gray-50 dark:border-gray-800">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-6 py-4 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <span className="font-medium">{order.items.length} item{order.items.length > 1 ? 's' : ''} ordered</span>
          <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expanded && (
          <div className="px-6 pb-4 space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <div className="w-9 h-9 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 4V2h10v2h2v4h-2v14H7V8H5V4h2zm2-2v2h6V2H9zm8 6H7v12h10V8zm-6 2h2v2h2v2h-2v2h-2v-2H9v-2h2v-2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{item.name}</p>
                  {item.pharmacyName && <p className="text-xs text-gray-400 truncate">{item.pharmacyName}</p>}
                </div>
                <span className="text-xs text-gray-500 mx-2">×{item.quantity}</span>
                <span className="font-semibold text-gray-900 dark:text-white text-sm">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            {/* Delivery Address */}
            {order.shippingAddress && (
              <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Delivery Address</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{order.shippingAddress.fullName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{order.shippingAddress.address}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">📞 {order.shippingAddress.mobile}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }

    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setOrders(data);
      } catch (err) {
        console.error('Fetch orders error:', err);
        if (err.response?.status === 401) {
          setError('Session expired. Please login again.');
        } else {
          setError(err.response?.data?.message || 'Could not load orders. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">Order History</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">My Orders</h1>
            {!loading && orders.length > 0 && (
              <p className="text-gray-400 text-sm mt-1">{orders.length} order{orders.length > 1 ? 's' : ''} placed</p>
            )}
          </div>
          <button
            onClick={() => navigate('/search')}
            className="px-6 py-3 bg-emerald-600 text-white rounded-2xl text-sm font-semibold hover:bg-emerald-700 transition-all shadow-md"
          >
            + Shop More
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800 rounded-2xl text-rose-600 dark:text-rose-400">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-sm">{error}</span>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm font-medium">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-32 space-y-6">
            <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center text-5xl mx-auto">🛒</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Orders Yet</h3>
              <p className="text-gray-500">Start shopping to see your orders here.</p>
            </div>
            <button
              onClick={() => navigate('/search')}
              className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-semibold hover:bg-emerald-700 transition-all shadow-lg"
            >
              Browse Medicines
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map(order => <OrderCard key={order._id} order={order} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
