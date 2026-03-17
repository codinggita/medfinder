import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Pharmacies = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/users/pharmacies");
        setPharmacies(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-12 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-emerald-400 mb-6 tracking-tight">
          Verified Pharmacies
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-xl font-medium">
          Connect with registered local healthcare providers and browse their live inventory.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 animate-pulse h-64 rounded-[40px]"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {pharmacies.map((pharmacy) => (
            <div key={pharmacy._id} className="bg-[#fcfdfc] dark:bg-gray-800 p-10 rounded-[40px] border-2 border-emerald-50 dark:border-gray-700/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                <svg className="w-12 h-12 text-[#059669] dark:text-[#34d399]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{pharmacy.name}</h3>
              <p className="text-[#059669] dark:text-[#34d399] font-bold text-sm tracking-widest uppercase mb-6">Certified Partner</p>
              
              <div className="space-y-3 mb-10 w-full">
                <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 font-medium italic">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{pharmacy.email}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 font-medium">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Local Inventory</span>
                </div>
              </div>

              <Link 
                to={`/pharmacy/${pharmacy._id}/${encodeURIComponent(pharmacy.name)}`}
                className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-semibold tracking-widest uppercase text-xs hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Browse Medicines
              </Link>
            </div>
          ))}
        </div>
      )}
      
      {/* Join the Network Banner */}
      <div className="mt-32 p-16 bg-gradient-to-br from-emerald-600 to-[#047857] dark:from-emerald-900 dark:to-[#064e3b] rounded-[60px] text-center text-white relative overflow-hidden group shadow-2xl">
         <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <div className="relative z-10">
            <h4 className="text-4xl font-black mb-6">Are you a Pharmacy Owner?</h4>
            <p className="text-emerald-50 text-xl mb-12 max-w-2xl mx-auto font-medium opacity-80">List your store and connect with thousands of patients in MedFinder. Boost your digital presence today.</p>
            <button className="px-16 py-6 bg-white text-[#059669] rounded-full font-black tracking-[0.2em] uppercase text-sm hover:scale-110 transition-all shadow-3xl">
                Partner with us
            </button>
         </div>
      </div>
    </div>
  );
};

export default Pharmacies;
