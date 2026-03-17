import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/config";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";
import MedicineTable from "../components/MedicineTable";

// Mock data for analytics (In real app, this would come from API)
const revenueData = [
  { name: 'Jan', revenue: 45000 }, { name: 'Feb', revenue: 52000 }, { name: 'Mar', revenue: 48000 },
  { name: 'Apr', revenue: 61000 }, { name: 'May', revenue: 55000 }, { name: 'Jun', revenue: 67000 },
  { name: 'Jul', revenue: 72000 }, { name: 'Aug', revenue: 69000 }, { name: 'Sep', revenue: 81000 },
  { name: 'Oct', revenue: 85000 }, { name: 'Nov', revenue: 92000 }, { name: 'Dec', revenue: 105000 },
];

const categoryData = [
  { name: 'Tablets', value: 45, color: '#16a34a' },
  { name: 'Syrups', value: 20, color: '#22c55e' },
  { name: 'Injections', value: 10, color: '#4ade80' },
  { name: 'Antibiotics', value: 15, color: '#86efac' },
  { name: 'Others', value: 10, color: '#bbf7d0' },
];

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'pharmacy') {
      fetchMyMedicines();
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  const fetchMyMedicines = async () => {
    try {
      const { data } = await api.get(`/medicines?limit=100`);
      const myMeds = data.medicines.filter(m => m.pharmacyId && m.pharmacyId._id === user._id);
      setMedicines(myMeds);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching medicines', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await api.delete(`/medicines/${id}`, config);
        setMedicines(medicines.filter(m => m._id !== id));
      } catch (error) {
        alert(error.response?.data?.message || 'Error deleting medicine');
      }
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-emerald-50 dark:bg-[#022C22]">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-8 border-emerald-600 border-t-transparent rounded-full animate-spin shadow-xl"></div>
        <p className="font-black text-xs uppercase tracking-[0.4em] text-emerald-800 dark:text-emerald-400">Syncing Intelligence...</p>
      </div>
    </div>
  );

  if (user?.role === 'user') {
    return (
      <div className="p-10 bg-[#F0FDF4] dark:bg-[#022C22] min-h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-[#064E3B] p-16 rounded-[4rem] shadow-2xl border border-white/20 max-w-2xl text-center space-y-10 relative overflow-hidden group">
           <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-1000"></div>
           
           <div className="w-28 h-28 bg-emerald-50 dark:bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto ring-[1rem] ring-emerald-50 dark:ring-emerald-400/5 transition-transform hover:rotate-12 duration-700">
              <svg className="w-12 h-12 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
           </div>
           
           <div className="space-y-4 relative z-10">
              <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">Welcome Area</h2>
              <p className="text-gray-500 dark:text-emerald-200/60 font-bold text-lg leading-relaxed">
                Connect with local pharmacies and find your medication instantly. Experience healthcare at the speed of thought.
              </p>
           </div>
           
           <button 
             onClick={() => navigate('/search')}
             className="px-14 py-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.3em] hover:shadow-[0_20px_40px_rgba(5,150,105,0.3)] transition-all shadow-xl active:scale-95 relative z-10"
           >
             Initialize Search
           </button>
        </div>
      </div>
    );
  }

  const stockStats = {
     total: medicines.length,
     available: medicines.filter(m => m.stock > 10).length,
     low: medicines.filter(m => m.stock <= 20 && m.stock > 0).length,
     out: medicines.filter(m => m.stock === 0).length
  };

  return (
    <div className="flex bg-[#F0FDF4] dark:bg-[#021A15] min-h-screen transition-colors duration-700">
      <DashboardSidebar logout={logout} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-emerald-200/20 dark:bg-emerald-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <DashboardHeader pharmacyName={user.name} />
        
        <div className="flex-1 p-14 space-y-12 overflow-y-auto custom-scrollbar relative z-10">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">Operations Hub</h1>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 dark:text-emerald-500/50">Real-time Inventory Monitoring & Business Intelligence</p>
            </div>
            <div className="flex gap-4">
               <button onClick={() => navigate('/reports')} className="px-8 py-4 bg-white dark:bg-emerald-900/20 border border-emerald-100 dark:border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 transition-all shadow-sm">
                  View Full Reports
               </button>
               <button onClick={() => navigate('/medicines/add')} className="px-8 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 transition-all">
                  Add New Stock
               </button>
            </div>
          </div>

          {/* Stats Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
            <StatCard title="Global Catalog" value={stockStats.total} type="total" sub="Items in inventory" />
            <StatCard title="Optimal Stock" value={stockStats.available} type="available" sub="Healthy levels" />
            <StatCard title="Low Stock Assets" value={stockStats.low} type="low" sub="Threshold < 20 units" />
            <StatCard title="Revenue (MTD)" value="₹1.2M" type="out" sub="+12.5% vs Last Gold" />
          </div>

          {/* Analytics Charts Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
             {/* Revenue Trend */}
             <div className="xl:col-span-2 bg-white dark:bg-[#064E3B]/40 backdrop-blur-sm p-10 rounded-[3rem] border border-gray-50 dark:border-white/5 shadow-xl group">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Revenue Analytics</h3>
                   <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 px-4 py-1.5 rounded-lg">Performance Trend</span>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevDash" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 800}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 800}} tickFormatter={(v) => `₹${v/1000}k`} />
                      <Tooltip contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} />
                      <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={4} fillOpacity={1} fill="url(#colorRevDash)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
             </div>

             {/* AI Insights Card */}
             <div className="bg-emerald-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div>
                   <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">⚡</div>
                      <h3 className="text-2xl font-black tracking-tight leading-none">AI Intelligence</h3>
                   </div>
                   <div className="space-y-4">
                      {[
                        { l: 'Bestseller', v: 'Dolo 650' },
                        { l: 'Risk Alert', v: '12 Expiring' },
                        { l: 'Restock Rec', v: 'Azithromycin' }
                      ].map((item, i) => (
                        <div key={i} className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
                           <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">{item.l}</p>
                           <p className="font-bold text-sm">{item.v}</p>
                        </div>
                      ))}
                   </div>
                </div>
                <button className="w-full mt-8 py-4 bg-white text-emerald-600 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl">
                   Full Diagnostics
                </button>
             </div>
          </div>

          {/* Table Container */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Active Inventory</h3>
            <MedicineTable 
               medicines={medicines}
               onDelete={handleDelete}
               onEdit={(med) => alert(`Editing ${med.name}`)}
               onAdd={() => navigate('/medicines/add')}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
