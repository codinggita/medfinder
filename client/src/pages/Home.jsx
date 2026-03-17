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
                <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner overflow-hidden">
                  {idx === 0 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" viewBox="0 0 40 64" id="MedicineBottle">
                      <g fill="#34a853">
                        <path d="M10.308 62h19.384A5.167 5.167 0 0 0 35 57V25.939a8.865 8.865 0 0 0-3.781-7.155L28 16.485v-2.493a3.083 3.083 0 0 0 3-3.076V5.084A3.088 3.088 0 0 0 27.916 2H12.084A3.088 3.088 0 0 0 9 5.084v5.832a3.083 3.083 0 0 0 3 3.076v2.493l-3.219 2.3A8.862 8.862 0 0 0 5 25.939V57a5.167 5.167 0 0 0 5.308 5Zm19.384-2H10.308A3.168 3.168 0 0 1 7 57v-1h26v1a3.168 3.168 0 0 1-3.308 3ZM7 54V28h26v26Zm19-38H14v-2h12Zm-15-5.084V5.084A1.085 1.085 0 0 1 12.084 4h15.832A1.085 1.085 0 0 1 29 5.084v5.832A1.085 1.085 0 0 1 27.916 12H12.084A1.085 1.085 0 0 1 11 10.916Zm-1.057 9.5L13.321 18h13.358l3.378 2.412A6.772 6.772 0 0 1 33 26H7a6.772 6.772 0 0 1 2.943-5.588Z"/>
                        <path d="M15 10a1 1 0 0 0 1-1V7a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1zm5 0a1 1 0 0 0 1-1V7a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1zm5 0a1 1 0 0 0 1-1V7a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1z"/>
                        <path d="M24 38h-1v-1a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v1h-1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm0 4h-2a1 1 0 0 0-1 1v2h-2v-2a1 1 0 0 0-1-1h-2v-2h2a1 1 0 0 0 1-1v-2h2v2a1 1 0 0 0 1 1h2z"/>
                        <path d="M30 30h-5a1 1 0 0 0 0 2h5a1 1 0 0 0 0-2zM15 50h-5a1 1 0 0 0 0 2h5a1 1 0 0 0 0-2z"/>
                      </g>
                    </svg>
                  ) : idx === 1 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 32 32" id="Pill">
                      <path fill="#34a853" d="M16.3178 3.52789C19.6883 0.157369 25.1515 0.157369 28.522 3.52789C31.8925 6.89842 31.8925 12.3616 28.522 15.7321L21.4249 22.8292L21.4149 22.8193L15.7321 28.5021C12.3616 31.8726 6.89842 31.8726 3.52789 28.5021C0.157369 25.1316 0.157369 19.6684 3.52789 16.2979L10.625 9.20078L10.6349 9.21073L16.3178 3.52789ZM20.0007 21.4051L10.6249 12.0293L4.94211 17.7121C2.35263 20.3016 2.35263 24.4984 4.94211 27.0879C7.53158 29.6774 11.7284 29.6774 14.3179 27.0879L20.0007 21.4051ZM28 10C28 8.89543 27.1046 8 26 8C24.8954 8 24 8.89543 24 10C24 11.1046 24.8954 12 26 12C27.1046 12 28 11.1046 28 10Z" className="color212121 svgShape"></path>
                    </svg>
                  ) : idx === 2 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" enable-background="new 0 0 64 64" viewBox="0 0 64 64" id="Pills">
                      <path d="M56.631,21.189C52.35,11.355,43.245,5,33.436,5c-2.986,0-5.878,0.604-8.597,1.796c0,0-6.32,2.73-6.385,2.759
		c-5.75,2.521-10.063,7.384-12.143,13.69c-2.064,6.259-1.68,13.197,1.079,19.539C11.771,52.849,21.167,59,30.637,59
		c2.434,0,4.867-0.434,7.226-1.283c0.058-0.017,0.642-0.242,0.642-0.242c0.23-0.092,0.465-0.161,0.694-0.264
		c0.063-0.024,6.354-2.826,6.354-2.826C57.372,49.201,62.342,34.311,56.631,21.189z M53.69,21.058L15.675,37.729
		c-4.338-11.49,0.057-24.094,10.205-28.544c2.388-1.047,4.931-1.576,7.557-1.576C41.816,7.608,49.634,12.851,53.69,21.058z
		 M9.772,41.74c-2.503-5.752-2.856-12.028-0.994-17.674c1.402-4.252,3.942-7.754,7.302-10.169
		c-5.084,6.979-6.295,16.962-2.32,26.093c3.899,8.958,11.802,15.011,20.592,16.024C24.745,57.945,14.309,52.164,9.772,41.74z
		 M44.512,51.995c-2.389,1.048-4.931,1.577-7.557,1.577c-8.38,0-16.197-5.243-20.253-13.449l38.015-16.671
		C59.054,34.942,54.66,47.545,44.512,51.995z" fill="#34a853" className="color000000 svgShape"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" viewBox="0 0 100 100" id="Syringe">
                      <path d="M32.2 75.7c.2.2.4.3.7.3s.5-.1.7-.3L56.3 53c.3-.3.4-.7.2-1.1-.2-.4-.5-.6-.9-.6H39.9c-.3 0-.5.1-.7.3L24.3 66.4c-.4.4-.4 1 0 1.4l7.9 7.9zm8.1-22.5h12.8L32.9 73.5l-6.4-6.4 13.8-13.9z" fill="#34a853" className="color000000 svgShape"></path>
                      <path d="M13.9 96.9c.7.7 1.7 1.1 2.7 1.1 1 0 2-.4 2.7-1.1.7-.7 1.1-1.7 1.1-2.7 0-1-.4-2-1.1-2.7l-2.7-2.7 7.6-7.6 4.6 4.6c.7.7 1.7 1.1 2.7 1.1s1.9-.4 2.7-1.1c1.4-1.4 1.5-3.7.2-5.2L72 42.9c1.2-1.2 1.8-2.8 1.8-4.5 0-1.3-.4-2.6-1.2-3.7l5.9-5.9c1.8-1.8 2-4.6.6-6.6L97.7 3.7c.4-.4.4-1 0-1.4s-1-.4-1.4 0L77.8 20.8c-2-1.4-4.8-1.2-6.6.6l-5.9 5.9c-1.1-.8-2.3-1.2-3.7-1.2-1.7 0-3.3.7-4.5 1.8L19.4 65.7c-.7-.6-1.6-1-2.5-1-1 0-2 .4-2.7 1.1-1.5 1.5-1.5 3.9 0 5.4l4.6 4.6-7.6 7.6-2.7-2.7c-.7-.7-1.7-1.1-2.7-1.1-1 0-2 .4-2.7 1.1-.7.7-1.1 1.7-1.1 2.7 0 1 .4 2 1.1 2.7l10.8 10.8zm58.7-74c1.3-1.3 3.3-1.3 4.6 0 1.3 1.3 1.3 3.3 0 4.6l-5.8 5.8L69 31l-2.3-2.3 5.9-5.8zM44.2 43.7l2 2c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4l-2-2 2.1-2.1 2.8 2.8c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4l-2.8-2.8 2.1-2.1 2 2c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4l-2-2 2.1-2.1 2.8 2.8c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4l-2.8-2.8 2.4-2.4c.8-.8 1.9-1.3 3-1.3 1.2 0 2.2.4 3 1.3l6 6c.8.8 1.3 1.9 1.3 3 0 1.2-.4 2.2-1.3 3L32.9 79.2l-6-6-6-6 23.3-23.5zM15.1 68.6c0-.5.2-.9.5-1.3.3-.3.8-.5 1.3-.5s.9.2 1.3.5l7.3 7.3 6.7 6.7.5.5c.7.7.7 1.8 0 2.5s-1.8.7-2.5 0L22.9 77l-2-2-5.3-5.3c-.3-.2-.5-.7-.5-1.1zm5.1 8.7 1.3 1.3 1.3 1.3-7.6 7.6-2.5-2.5 7.5-7.7zM4.5 82.1c.3-.3.8-.5 1.3-.5s.9.2 1.3.5l10.8 10.8c.3.3.5.8.5 1.3s-.2.9-.5 1.3c-.3.3-.8.5-1.3.5s-.9-.2-1.3-.5L4.5 84.6c-.3-.3-.5-.8-.5-1.2 0-.5.2-1 .5-1.3zm91.3-2.2c0-7.6-13-21-13.6-21.6-.4-.4-1.1-.4-1.4 0-.6.6-13.6 13.9-13.6 21.6 0 7.9 6.4 14.3 14.3 14.3s14.3-6.5 14.3-14.3zm-26.6 0c0-5.9 9.6-16.5 12.3-19.4 2.7 2.9 12.3 13.5 12.3 19.4 0 6.8-5.5 12.3-12.3 12.3s-12.3-5.6-12.3-12.3z" fill="#34a853" className="color000000 svgShape"></path>
                      <path d="M88.9 79.9c0-.6-.4-1-1-1s-1 .4-1 1c0 2.9-2.4 5.3-5.3 5.3-.6 0-1 .4-1 1s.4 1 1 1c4 0 7.3-3.3 7.3-7.3z" fill="#34a853" className="color000000 svgShape"></path>
                    </svg>
                  )}
                </div>
                <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-2">{med.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">{med.desc}</p>
                <div className="w-full h-px bg-gray-100 dark:bg-gray-700 mb-6"></div>
                <span className="text-[#059669] dark:text-[#34d399] font-bold group-hover:tracking-widest transition-all mb-4">
                  {med.btn}
                </span>
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 w-full opacity-60 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    Certified Product
                  </p>
                </div>
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
