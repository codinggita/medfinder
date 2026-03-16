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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#1E7F5C] border-t-transparent rounded-full animate-spin"></div>
        <p className="font-black text-xs uppercase tracking-[0.25em] text-[#1E7F5C]">Syncing Data...</p>
      </div>
    </div>
  );

  if (user?.role === 'user') {
    return (
      <div className="p-10 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 max-w-2xl text-center space-y-8">
           <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50 transition-transform hover:scale-110 duration-500">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
           </div>
           <div className="space-y-4">
              <h2 className="text-4xl font-black text-gray-800 tracking-tighter">Welcome back, {user.name}</h2>
              <p className="text-gray-400 font-bold tracking-wide leading-relaxed">
                Connect with thousands of pharmacies and find the medication you need in seconds. Search, compare, and get your health back on track.
              </p>
           </div>
           <button 
             onClick={() => navigate('/search')}
             className="px-12 py-5 bg-[#1E7F5C] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.25em] hover:bg-[#16654a] transition-all shadow-2xl shadow-emerald-900/10 active:scale-95"
           >
             Start Finding Medicine
           </button>
        </div>
      </div>
    );
  }

  const stockStats = {
     total: medicines.length * 10, // Mocking scaled numbers for UI
     available: medicines.filter(m => m.stock > 10).length * 10,
     low: medicines.filter(m => m.stock <= 10 && m.stock > 0).length * 10,
     out: medicines.filter(m => m.stock === 0).length * 10
  };

  return (
    <div className="flex bg-[#F8FAF9] min-h-screen">
      <DashboardSidebar logout={logout} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader pharmacyName={user.name} />
        
        <div className="flex-1 p-10 space-y-10 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <StatCard title="Total Medicines" value={stockStats.total.toLocaleString()} type="total" />
            <StatCard title="Available" value={stockStats.available.toLocaleString()} type="available" />
            <StatCard title="Low Stock" value={stockStats.low.toLocaleString()} type="low" />
            <StatCard title="Out of Stock" value={stockStats.out.toLocaleString()} type="out" />
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
