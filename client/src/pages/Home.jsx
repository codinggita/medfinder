import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import homePageBg from "../assets/home_page_bg.png";

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?keyword=${searchTerm}`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section
        className="relative bg-[#f5fbf7] dark:bg-emerald-950/20 bg-cover bg-center bg-no-repeat overflow-hidden py-10 lg:py-28 px-4 flex flex-col items-center justify-center min-h-[500px]"
        style={{ backgroundImage: `url(${homePageBg})` }}
      >
        <div className="absolute inset-0 bg-white/20 dark:bg-black/10"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#064e3b] dark:text-emerald-400 mb-6 tracking-tight leading-tight">
            Never Search Store <br className="hidden md:block" /> to Store Again
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto">
            Find the medicines you need at pharmacies near you, instantly.
          </p>
          
          <form onSubmit={handleSearch} className="flex items-center bg-white dark:bg-gray-800 p-2.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] max-w-3xl mx-auto border border-gray-100 dark:border-gray-700 relative z-20 hover:shadow-2xl transition-all duration-300">
            <div className="pl-6 text-[#059669]">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by medicine name..."
              className="flex-1 bg-transparent px-6 py-4 outline-none text-gray-800 dark:text-gray-100 text-xl w-full placeholder-gray-400 dark:placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="bg-[#059669] text-white px-12 py-4 rounded-full font-bold hover:bg-[#047857] shadow-lg text-xl transition-all active:scale-95">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Popular Medicines Section */}
      <section className="py-24 px-4 md:px-12 lg:px-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">Popular Medicines</h2>
              <p className="text-gray-500 dark:text-gray-400 text-xl">Quickly find the most searched healthcare products.</p>
            </div>
            <button 
              onClick={() => navigate('/search')}
              className="hidden md:flex items-center gap-2 text-[#059669] dark:text-[#34d399] font-bold text-lg hover:gap-4 transition-all"
            >
              View All Medicines <span>→</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Paracetamol', desc: 'Pain & Fever', color: 'emerald' },
              { name: 'Dolo 650', desc: 'Fast Relief', color: 'blue' },
              { name: 'Crocin', desc: 'Cold & Flu', color: 'pink' },
              { name: 'Aspirin', desc: 'Pain Reliever', color: 'orange' }
            ].map((med, idx) => (
              <div 
                key={idx}
                onClick={() => navigate(`/search?keyword=${med.name}`)}
                className="bg-[#fcfdfc] dark:bg-gray-800 border-2 border-emerald-50 dark:border-gray-700/50 rounded-[40px] p-10 flex flex-col items-center text-center shadow-sm hover:shadow-2xl hover:-translate-y-3 group cursor-pointer transition-all duration-500"
              >
                <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                   <svg className="w-12 h-12 text-[#059669] dark:text-[#34d399]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 4V2h10v2h2v4h-2v14H7V8H5V4h2zm2-2v2h6V2H9zm8 6H7v12h10V8zm-6 2h2v2h2v2h-2v2h-2v-2H9v-2h2v-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-2">{med.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">{med.desc}</p>
                <div className="w-full h-px bg-gray-100 dark:bg-gray-700 mb-6"></div>
                <span className="text-[#059669] dark:text-[#34d399] font-bold group-hover:tracking-widest transition-all">
                  CHECK STOCK
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 md:px-12 lg:px-24 bg-gray-50 dark:bg-gray-950/20 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-100 mb-6 tracking-tight">Why MedFinder?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-xl leading-relaxed">We combine local pharmacy inventory with smart search to save you time and stress.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: 'Real-time Stock', 
                desc: 'Our unique algorithm syncs with local store data to show you exactly what is in stock.', 
                icon: (
                  <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              { 
                title: 'Price Alerts', 
                desc: 'Find the lowest prices and get notified when your essential meds go on sale.', 
                icon: (
                  <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3 1.343 3 3-1.343 3-3 3m0-12c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m0-2v2m0 16v2" />
                  </svg>
                )
              },
              { 
                title: 'Verified Only', 
                desc: 'Safety first. Every pharmacy on our platform is 100% certified and vetted.', 
                icon: (
                  <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-12 rounded-[50px] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-10px_rgba(16,185,129,0.15)] transition-all duration-500 border border-gray-100 dark:border-gray-700 group hover:-translate-y-2">
                <div className="mb-8 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-emerald-400 mb-6">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 px-4 md:px-12 lg:px-24 bg-[#059669] dark:bg-emerald-900 transition-colors overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center text-white">
            <div className="space-y-2">
              <div className="text-5xl md:text-7xl font-black">50k+</div>
              <div className="text-emerald-200 font-bold tracking-[0.2em] uppercase text-xs">Medicines Listed</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-7xl font-black">200+</div>
              <div className="text-emerald-200 font-bold tracking-[0.2em] uppercase text-xs">Partner Stores</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-7xl font-black">10k+</div>
              <div className="text-emerald-200 font-bold tracking-[0.2em] uppercase text-xs">Happy Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-7xl font-black">24/7</div>
              <div className="text-emerald-200 font-bold tracking-[0.2em] uppercase text-xs">Live Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-10 text-emerald-400">
            <svg className="w-16 h-16 opacity-30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14H17.017C15.9124 14 15.017 13.1046 15.017 12V9C15.017 7.89543 15.9124 7 17.017 7H20.017V10H18.017V12H21.017V16C21.017 18.7614 18.7784 21 16.017 21L14.017 21ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8V14H6V12C6 10.8954 6.89543 10 8 10V7H5C3.89543 7 3 7.89543 3 9V12H6V14H5C3.89543 14 3 14.8954 3 16V21H3Z" />
            </svg>
          </div>
          <h3 className="text-3xl md:text-4xl font-serif text-gray-800 dark:text-gray-200 leading-tight mb-12 italic">
            "MedFinder has completely automated how I procure health supplements and chronic care meds. No more store-hopping or frustrating calls. It just works."
          </h3>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 overflow-hidden">
               <img src="https://ui-avatars.com/api/?name=Sarah+Jenkins&background=059669&color=fff" alt="User" />
            </div>
            <div className="text-left">
              <div className="font-bold text-xl text-gray-900 dark:text-white">Sarah Jenkins</div>
              <div className="text-[#059669] font-medium">Verified User • London, UK</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="bg-gray-50 dark:bg-gray-950 p-12 md:p-24 rounded-[60px] m-4 md:m-8 overflow-hidden relative">
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-8">Ready to find your meds?</h2>
          <button 
            onClick={() => navigate('/search')}
            className="bg-[#059669] text-white px-16 py-6 rounded-full font-black text-2xl hover:scale-105 hover:bg-[#047857] transition-all shadow-2xl"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
