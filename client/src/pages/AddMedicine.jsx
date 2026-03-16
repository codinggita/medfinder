import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import DashboardSidebar from '../components/DashboardSidebar';

const AddMedicine = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    
    const [formData, setFormData] = useState({
        name: '',
        brandName: '',
        category: '',
        composition: '',
        manufacturer: '',
        price: '',
        stock: 0,
        expiryDate: '',
        description: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showManufacturers, setShowManufacturers] = useState(false);

    const categories = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream'];
    const manufacturersList = ['Pfizer', 'Novartis', 'GlaxoSmithKline', 'Johnson & Johnson', 'AstraZeneca', 'Roche', 'Sanofi', 'Merck'];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowManufacturers(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'manufacturer') {
            setShowManufacturers(true);
        }
    };

    const handleQuantity = (type) => {
        setFormData(prev => ({
            ...prev,
            stock: type === 'inc' ? prev.stock + 1 : Math.max(0, prev.stock - 1)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('http://localhost:5000/api/medicines', formData, config);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate('/dashboard/inventory');
            }, 3000);
        } catch (error) {
            console.error('Submission failed', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex bg-[#F1FAF7] dark:bg-[#021A15] min-h-screen font-['Inter'] relative overflow-hidden">
            {/* Soft Ambient Background Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-80 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <DashboardSidebar logout={logout} />

            <main className="flex-1 p-10 overflow-y-auto relative z-10">
                {/* Success Toast */}
                {success && (
                    <div className="fixed top-8 right-8 z-[100] animate-in slide-in-from-right duration-500">
                        <div className="bg-[#10B981] text-white px-6 py-4 rounded-xl shadow-[0_15px_30px_rgba(16,185,129,0.3)] flex items-center gap-3 border border-white/20">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="font-semibold text-sm">Medicine added successfully</span>
                            <button onClick={() => setSuccess(false)} className="ml-4 opacity-70 hover:opacity-100 transition-opacity">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 mb-8 text-xs font-medium text-gray-400">
                    <span className="hover:text-emerald-600 cursor-pointer transition-colors">Dashboard</span>
                    <svg className="w-3 h-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="hover:text-emerald-600 cursor-pointer transition-colors">Medicines</span>
                    <svg className="w-3 h-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="text-gray-800 dark:text-gray-200">Add New</span>
                </div>

                {/* Main Card */}
                <div className="max-w-5xl mx-auto bg-white dark:bg-[#022C22]/60 backdrop-blur-xl rounded-[40px] med-shadow-premium border border-gray-200 dark:border-white/10 p-12 animate-in fade-in zoom-in-95 duration-700 relative">
                    
                    {/* Interior Header */}
                    <div className="flex items-start gap-6 mb-12">
                        <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-[0_10px_25px_rgba(16,185,129,0.25)] flex-shrink-0">
                            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">Add New Medicine</h1>
                            <p className="text-sm text-gray-500 mt-1">Enter medicine details to add it to inventory</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        {/* Column 1 */}
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">Medicine Name</label>
                                <div className="relative group">
                                    <input 
                                        type="text" name="name" required placeholder="e.g., Amoxicillin" 
                                        className="w-full px-5 py-4 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white placeholder:text-gray-400"
                                        value={formData.name} onChange={handleChange}
                                    />
                                    {formData.name && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 animate-in zoom-in duration-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">Brand Name</label>
                                <div className="relative group">
                                    <input 
                                        type="text" name="brandName" required placeholder="e.g., Amoxil" 
                                        className="w-full px-5 py-4 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white placeholder:text-gray-400"
                                        value={formData.brandName} onChange={handleChange}
                                    />
                                    {formData.brandName && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 animate-in zoom-in duration-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">Category</label>
                                <div className="relative">
                                    <select 
                                        name="category" required 
                                        className="w-full px-5 py-4 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white appearance-none cursor-pointer"
                                        value={formData.category} onChange={handleChange}
                                    >
                                        <option value="" disabled className="dark:bg-[#022C22]">Select Category</option>
                                        {categories.map(c => <option key={c} value={c} className="dark:bg-[#022C22]">{c}</option>)}
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">Composition</label>
                                <input 
                                    type="text" name="composition" required placeholder="e.g., Amoxicillin 500mg" 
                                    className="w-full px-5 py-4 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white placeholder:text-gray-400"
                                    value={formData.composition} onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2" ref={dropdownRef}>
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">Manufacturer</label>
                                <div className="relative">
                                    <input 
                                        type="text" name="manufacturer" required placeholder="Search manufacturer..." 
                                        className="w-full px-5 py-4 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white placeholder:text-gray-400"
                                        value={formData.manufacturer} onChange={handleChange}
                                        onFocus={() => setShowManufacturers(true)}
                                    />
                                    {showManufacturers && formData.manufacturer.length > 0 && (
                                        <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-[#052E24] border border-gray-100 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-20">
                                            {manufacturersList.filter(m => m.toLowerCase().includes(formData.manufacturer.toLowerCase())).map(m => (
                                                <div key={m} onClick={() => { setFormData({...formData, manufacturer: m}); setShowManufacturers(false); }} className="px-5 py-3 hover:bg-emerald-50 dark:hover:bg-white/5 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                                                    {m}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">Price per Unit</label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">$</div>
                                    <input 
                                        type="number" step="0.01" name="price" required placeholder="0.00" 
                                        className="w-full pl-10 pr-5 py-4 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
                                        value={formData.price} onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">Stock Quantity</label>
                                <div className="flex items-center gap-4 px-4 py-2 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl transition-all group-focus-within:border-emerald-500">
                                    <button type="button" onClick={() => handleQuantity('dec')} className="w-10 h-10 flex items-center justify-center bg-white dark:bg-white/10 text-gray-400 rounded-xl hover:text-rose-500 transition-all active:scale-90 border border-transparent hover:border-rose-100 shadow-sm text-xl font-medium">–</button>
                                    <div className="flex-1 flex items-center justify-center gap-1">
                                        <input 
                                            type="number" name="stock" required 
                                            className="w-12 bg-transparent text-center text-base font-bold outline-none dark:text-white"
                                            value={formData.stock} onChange={handleChange}
                                        />
                                        <span className="text-xs font-medium text-gray-400">Enter quantity</span>
                                    </div>
                                    <button type="button" onClick={() => handleQuantity('inc')} className="w-10 h-10 flex items-center justify-center bg-white dark:bg-white/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all active:scale-90 border border-transparent shadow-sm text-xl font-medium">+</button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">Expiry Date</label>
                                <div className="relative">
                                    <input 
                                        type="date" name="expiryDate" required 
                                        className="w-full px-12 py-4 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white cursor-pointer"
                                        value={formData.expiryDate} onChange={handleChange}
                                    />
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Description</label>
                                    <span className="text-[10px] font-medium text-gray-400">{formData.description.length}/500</span>
                                </div>
                                <textarea 
                                    name="description" maxLength="500" placeholder="Add notes about the medicine..."
                                    className="w-full h-56 px-6 py-5 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white resize-none placeholder:text-gray-400"
                                    value={formData.description} onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="md:col-span-2 flex flex-col sm:flex-row gap-5 pt-4">
                            <button 
                                type="button" onClick={() => setFormData({ name: '', brandName: '', category: '', composition: '', manufacturer: '', price: '', stock: 0, expiryDate: '', description: '' })}
                                className="flex-1 py-4 bg-white dark:bg-transparent text-emerald-600 dark:text-emerald-400 border border-emerald-600 dark:border-emerald-500 rounded-xl font-bold text-sm tracking-tight hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all active:scale-[0.98]"
                            >
                                Reset Form
                            </button>
                            <button 
                                type="submit"
                                className="flex-[2] py-4 bg-emerald-600 text-white rounded-xl font-bold text-sm tracking-tight med-shadow-glow-emerald hover:bg-emerald-700 hover:shadow-[0_20px_40px_-5px_rgba(16,185,129,0.4)] transition-all active:scale-[0.98]"
                            >
                                Add Medicine
                            </button>
                        </div>
                    </form>

                    {/* Loading Overlay */}
                    {loading && (
                        <div className="absolute inset-0 z-50 bg-white/40 dark:bg-black/40 backdrop-blur-md flex items-center justify-center rounded-[40px] animate-in fade-in duration-300">
                            <div className="bg-white dark:bg-[#052E24] p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-white/10 flex flex-col items-center gap-5">
                                <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="font-bold text-sm text-gray-800 dark:text-white">Adding Medicine...</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AddMedicine;
