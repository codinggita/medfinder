import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";
import MedicineTable from "../components/MedicineTable";
import AddMedicineModal from "../components/AddMedicineModal";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states for adding medicine
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'pharmacy') {
      fetchMyMedicines();
      // Auto-open modal if on /dashboard/add
      if (window.location.pathname === '/dashboard/add') {
        setIsAddModalOpen(true);
      }
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  const fetchMyMedicines = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/medicines?limit=100`);
      const myMeds = data.medicines.filter(m => m.pharmacyId && m.pharmacyId._id === user._id);
      setMedicines(myMeds);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching medicines', error);
      setLoading(false);
    }
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post('http://localhost:5000/api/medicines', {
        name,
        stock: Number(stock),
        price: Number(price)
      }, config);
      setMedicines([...medicines, { ...data, pharmacyId: { _id: user._id, name: user.name } }]);
      setName('');
      setStock('');
      setPrice('');
      setIsAddModalOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding medicine');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`http://localhost:5000/api/medicines/${id}`, config);
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
     low: medicines.filter(m => m.stock <= 10 && m.stock > 0).length,
     out: medicines.filter(m => m.stock === 0).length
  };

  return (
    <div className="flex bg-[#F0FDF4] dark:bg-[#021A15] min-h-screen transition-colors duration-700">
      <DashboardSidebar logout={logout} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Decorative Background Blob */}
        <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-emerald-200/20 dark:bg-emerald-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <DashboardHeader pharmacyName={user.name} />
        
        <div className="flex-1 p-14 space-y-14 overflow-y-auto custom-scrollbar relative z-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">Operations Hub</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 dark:text-emerald-500/50">Real-time Inventory Monitoring</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
            <StatCard title="Global Catalog" value={stockStats.total} type="total" />
            <StatCard title="Optimal Stock" value={stockStats.available} type="available" />
            <StatCard title="Depleted" value={stockStats.low} type="low" />
            <StatCard title="Zero Balance" value={stockStats.out} type="out" />
          </div>

          {/* Table Container */}
          <MedicineTable 
             medicines={medicines}
             onDelete={handleDelete}
             onEdit={(med) => alert(`Editing ${med.name}`)}
             onAdd={() => setIsAddModalOpen(true)}
          />
        </div>
      </main>

      <AddMedicineModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddMedicine}
        name={name}
        setName={setName}
        stock={stock}
        setStock={setStock}
        price={price}
        setPrice={setPrice}
      />
    </div>
  );
};

export default Dashboard;
