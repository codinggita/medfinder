import React, { useState, useContext, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  PieChart, Pie, Cell, Sector,
  BarChart, Bar
} from 'recharts';
import { AuthContext } from '../context/AuthContext';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import LuxeDropdown from '../components/LuxeDropdown';

const categoryOptions = [
  { id: 'Tablets', label: 'Tablets', icon: '💊' },
  { id: 'Syrups', label: 'Syrups', icon: '🧪' },
  { id: 'Injections', label: 'Injections', icon: '💉' },
  { id: 'Antibiotics', label: 'Antibiotics', icon: '🧬' },
  { id: 'Diabetes Medicines', label: 'Diabetes Medicines', icon: '🩸' },
  { id: 'Pain Relief', label: 'Pain Relief', icon: '🩹' },
];

const Reports = () => {
  const { user, logout } = useContext(AuthContext);
  const [dateRange, setDateRange] = useState('Today');
  const [filterCategory, setFilterCategory] = useState('Tablets');

// Comprehensive Mock Data Structure
const reportData = {
  Today: {
    stats: [
      { title: 'Total Medicines', value: '4,520', sub: 'Active inventory', icon: 'pill', color: 'emerald' },
      { title: 'Low Stock', value: '18', sub: 'Below 20 units', icon: 'warning', color: 'orange' },
      { title: 'Out of Stock', value: '03', sub: 'Urgent refill', icon: 'alert', color: 'rose' },
      { title: 'Expiring Soon', value: '12', sub: 'Next 30 days', icon: 'clock', color: 'yellow' },
      { title: 'Today Revenue', value: '₹42,500', sub: '+5% vs yesterday', icon: 'chart', color: 'emerald' },
      { title: 'Today Orders', value: '28', sub: 'Calculated from 12 AM', icon: 'bag', color: 'emerald' },
    ],
    revenueData: [
      { name: '6 AM', revenue: 2000 },
      { name: '9 AM', revenue: 5000 },
      { name: '12 PM', revenue: 12000 },
      { name: '3 PM', revenue: 8000 },
      { name: '6 PM', revenue: 10000 },
      { name: '9 PM', revenue: 5500 },
    ],
    categoryData: [
      { name: 'Tablets', value: 50, color: '#16a34a' },
      { name: 'Syrups', value: 15, color: '#22c55e' },
      { name: 'Others', value: 35, color: '#4ade80' },
    ]
  },
  '7 Days': {
    stats: [
      { title: 'Total Medicines', value: '4,520', sub: 'Active inventory', icon: 'pill', color: 'emerald' },
      { title: 'Low Stock', value: '18', sub: 'Below 20 units', icon: 'warning', color: 'orange' },
      { title: 'Out of Stock', value: '03', sub: 'Urgent refill', icon: 'alert', color: 'rose' },
      { title: 'Expiring Soon', value: '12', sub: 'Next 30 days', icon: 'clock', color: 'yellow' },
      { title: 'Weekly Revenue', value: '₹2.8L', sub: '+18% vs last week', icon: 'chart', color: 'emerald' },
      { title: 'Weekly Orders', value: '194', sub: 'Last 7 days total', icon: 'bag', color: 'emerald' },
    ],
    revenueData: [
      { name: 'Mon', revenue: 35000 },
      { name: 'Tue', revenue: 42000 },
      { name: 'Wed', revenue: 38000 },
      { name: 'Thu', revenue: 45000 },
      { name: 'Fri', revenue: 52000 },
      { name: 'Sat', revenue: 48000 },
      { name: 'Sun', revenue: 30000 },
    ],
    categoryData: [
      { name: 'Tablets', value: 42, color: '#16a34a' },
      { name: 'Syrups', value: 25, color: '#22c55e' },
      { name: 'Others', value: 33, color: '#4ade80' },
    ]
  },
  Monthly: {
    stats: [
      { title: 'Total Medicines', value: '4,520', sub: 'Active inventory', icon: 'pill', color: 'emerald' },
      { title: 'Low Stock', value: '18', sub: 'Below 20 units', icon: 'warning', color: 'orange' },
      { title: 'Out of Stock', value: '03', sub: 'Urgent refill', icon: 'alert', color: 'rose' },
      { title: 'Expiring Soon', value: '12', sub: 'Next 30 days', icon: 'clock', color: 'yellow' },
      { title: 'Monthly Revenue', value: '₹12.4L', sub: '+10% vs last month', icon: 'chart', color: 'emerald' },
      { title: 'Monthly Orders', value: '842', sub: 'Current month stats', icon: 'bag', color: 'emerald' },
    ],
    revenueData: [
      { name: 'Week 1', revenue: 250000 },
      { name: 'Week 2', revenue: 320000 },
      { name: 'Week 3', revenue: 280000 },
      { name: 'Week 4', revenue: 390000 },
    ],
    categoryData: [
      { name: 'Tablets', value: 45, color: '#16a34a' },
      { name: 'Syrups', value: 20, color: '#22c55e' },
      { name: 'Others', value: 35, color: '#4ade80' },
    ]
  },
  Yearly: {
    stats: [
      { title: 'Total Medicines', value: '4,520', sub: 'Active inventory', icon: 'pill', color: 'emerald' },
      { title: 'Low Stock', value: '18', sub: 'Below 20 units', icon: 'warning', color: 'orange' },
      { title: 'Out of Stock', value: '03', sub: 'Urgent refill', icon: 'alert', color: 'rose' },
      { title: 'Expiring Soon', value: '12', sub: 'Next 30 days', icon: 'clock', color: 'yellow' },
      { title: 'Annual Revenue', value: '₹1.5Cr', sub: '+22% vs 2024', icon: 'chart', color: 'emerald' },
      { title: 'Annual Orders', value: '9.8K', sub: 'Full year projection', icon: 'bag', color: 'emerald' },
    ],
    revenueData: [
      { name: 'Jan', revenue: 850000 },
      { name: 'Feb', revenue: 920000 },
      { name: 'Mar', revenue: 880000 },
      { name: 'Apr', revenue: 1050000 },
      { name: 'May', revenue: 980000 },
      { name: 'Jun', revenue: 1120000 },
      { name: 'Jul', revenue: 1250000 },
      { name: 'Aug', revenue: 1180000 },
      { name: 'Sep', revenue: 1350000 },
      { name: 'Oct', revenue: 1420000 },
      { name: 'Nov', revenue: 1380000 },
      { name: 'Dec', revenue: 1550000 },
    ],
    categoryData: [
      { name: 'Tablets', value: 48, color: '#16a34a' },
      { name: 'Syrups', value: 18, color: '#22c55e' },
      { name: 'Others', value: 34, color: '#4ade80' },
    ]
  },
  'Custom Range': {
    stats: [
      { title: 'Total Medicines', value: '4,520', sub: 'Active inventory', icon: 'pill', color: 'emerald' },
      { title: 'Low Stock', value: '18', sub: 'Below 20 units', icon: 'warning', color: 'orange' },
      { title: 'Out of Stock', value: '03', sub: 'Urgent refill', icon: 'alert', color: 'rose' },
      { title: 'Expiring Soon', value: '12', sub: 'Next 30 days', icon: 'clock', color: 'yellow' },
      { title: 'Selected Revenue', value: '₹5.2L', sub: 'Filtered duration', icon: 'chart', color: 'emerald' },
      { title: 'Selected Orders', value: '312', sub: 'Custom range total', icon: 'bag', color: 'emerald' },
    ],
    revenueData: [
      { name: 'Day 1', revenue: 45000 },
      { name: 'Day 2', revenue: 52000 },
      { name: 'Day 3', revenue: 48000 },
      { name: 'Day 4', revenue: 61000 },
      { name: 'Day 5', revenue: 55000 },
    ],
    categoryData: [
      { name: 'Tablets', value: 46, color: '#16a34a' },
      { name: 'Syrups', value: 22, color: '#22c55e' },
      { name: 'Others', value: 32, color: '#4ade80' },
    ]
  }
};

  const activeData = reportData[dateRange] || reportData.Today;

  return (
    <div className="flex bg-[#F0FDF4] dark:bg-[#021A15] min-h-screen">
      <DashboardSidebar logout={logout} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-emerald-200/20 dark:bg-emerald-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <DashboardHeader pharmacyName={user.name} />

        <div className="flex-1 p-14 space-y-12 overflow-y-auto custom-scrollbar relative z-10">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-3">
              <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">Advanced Reports & Analytics</h1>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-500/50">Inventory insights, revenue analytics, and medicine expiry predictions</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
               {['Export as PDF', 'Export as CSV', 'Download Report'].map((btn) => (
                 <button key={btn} className="px-6 py-4 bg-white dark:bg-emerald-900/20 border border-emerald-100 dark:border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 transition-all shadow-sm">
                   {btn}
                 </button>
               ))}
            </div>
          </div>

          {/* Date Selector */}
          <div className="bg-white/80 dark:bg-[#064E3B]/40 backdrop-blur-md p-3 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl flex flex-wrap gap-2 w-fit">
            {['Today', '7 Days', 'Monthly', 'Yearly', 'Custom Range'].map((range) => (
              <button 
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-8 py-4 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all ${dateRange === range ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-gray-500 hover:bg-emerald-50 dark:hover:bg-white/5'}`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Analytics Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-8">
            {activeData.stats.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-[#032F27] p-8 rounded-[2.5rem] border border-gray-50 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all group">
                <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                   <span className="text-xl">
                      {stat.icon === 'pill' ? '💊' : stat.icon === 'warning' ? '⚠️' : stat.icon === 'alert' ? '🚨' : stat.icon === 'clock' ? '🕒' : stat.icon === 'chart' ? '📊' : '🛍️'}
                   </span>
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{stat.title}</h4>
                <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-1">{stat.value}</p>
                <div className="flex items-center gap-2">
                   <div className={`w-1.5 h-1.5 rounded-full bg-${stat.color}-500`}></div>
                   <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{stat.sub}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
             {/* Main Chart */}
             <div className="xl:col-span-2 bg-white dark:bg-[#032F27] p-12 rounded-[3.5rem] shadow-xl border border-gray-50 dark:border-white/5">
                <div className="flex items-center justify-between mb-12">
                   <div>
                      <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Revenue Performance</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Financial trajectory for the {dateRange.toLowerCase()} period</p>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Gross Income</span>
                      </div>
                   </div>
                </div>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activeData.revenueData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 800}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 800}} tickFormatter={(v) => `₹${v >= 1000 ? (v/1000) + 'k' : v}`} />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '1.5rem', 
                          border: 'none', 
                          boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          padding: '1.5rem'
                        }} 
                        itemStyle={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '10px' }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={5} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
             </div>

             {/* Distribution Chart */}
             <div className="bg-white dark:bg-[#032F27] p-12 rounded-[3.5rem] shadow-xl border border-gray-50 dark:border-white/5 flex flex-col">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Inventory Health</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-12">Medicine category breakdown</p>
                
                <div className="flex-1 flex flex-col items-center justify-center">
                   <div className="h-[250px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                         <Pie
                           data={activeData.categoryData}
                           cx="50%"
                           cy="50%"
                           innerRadius={60}
                           outerRadius={80}
                           paddingAngle={8}
                           dataKey="value"
                         >
                           {activeData.categoryData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                           ))}
                         </Pie>
                         <Tooltip />
                       </PieChart>
                     </ResponsiveContainer>
                   </div>
                   
                   <div className="w-full space-y-4 mt-8">
                     {activeData.categoryData.map((item, i) => (
                       <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }}></div>
                             <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{item.name}</span>
                          </div>
                          <span className="text-xs font-black text-gray-900 dark:text-white">{item.value}%</span>
                       </div>
                     ))}
                   </div>
                </div>
             </div>
          </div>

          {/* Detailed Inventory Analysis */}
          <div className="bg-white dark:bg-[#032F27] p-12 rounded-[3.5rem] shadow-xl border border-gray-50 dark:border-white/5">
             <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
               <div>
                 <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Stock Intelligence</h3>
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Individual item performance and replenishment status</p>
               </div>
               
               <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                 <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Search items..." 
                      className="pl-14 pr-8 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl text-xs font-bold outline-none ring-0 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-gray-300 dark:text-white w-full lg:w-72"
                    />
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                 </div>
                 <div className="w-full lg:w-64">
                    <LuxeDropdown 
                      options={categoryOptions}
                      selected={filterCategory} 
                      onChange={(val) => setFilterCategory(val)}
                      placeholder="Select Category"
                    />
                 </div>

               </div>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] border-b border-gray-50 dark:border-white/5">
                      <th className="pb-6">Medicine Name</th>
                      <th className="pb-6">Category</th>
                      <th className="pb-6">Current Stock</th>
                      <th className="pb-6">Turnover Rate</th>
                      <th className="pb-6">Replenishment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                    {[
                      { name: 'Amoxicillin 500mg', cat: 'Antibiotics', stock: 240, rate: '8.2x', status: 'Stable', color: 'emerald' },
                      { name: 'Dolo 650mg', cat: 'Tablets', stock: 12, rate: '24.5x', status: 'Urgent', color: 'rose' },
                      { name: 'Coughshield Syrup', cat: 'Syrups', stock: 45, rate: '4.1x', status: 'Review', color: 'orange' },
                      { name: 'Insulin Glargine', cat: 'Injections', stock: 88, rate: '12.8x', status: 'Stable', color: 'emerald' },
                    ].map((med, i) => (
                      <tr key={i} className="group hover:bg-emerald-50/30 dark:hover:bg-emerald-500/5 transition-colors">
                        <td className="py-8 font-black text-gray-900 dark:text-white tracking-tight">{med.name}</td>
                        <td className="py-8">
                           <span className="px-4 py-2 bg-gray-50 dark:bg-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-500">{med.cat}</span>
                        </td>
                        <td className="py-8 font-black text-gray-900 dark:text-white">{med.stock} units</td>
                        <td className="py-8 font-black text-emerald-600">{med.rate}</td>
                        <td className="py-8">
                           <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full bg-${med.color}-500`}></div>
                              <span className={`text-[10px] font-black uppercase tracking-widest text-${med.color}-600`}>{med.status}</span>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>

             {/* Pagination */}
             <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-50 dark:border-white/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Showing 4 results</span>
                <div className="flex gap-2">
                  <button className="w-10 h-10 flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 text-gray-400 hover:bg-emerald-600 hover:text-white transition-all">1</button>
                  <button className="w-10 h-10 flex items-center justify-center bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-900/20">2</button>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
