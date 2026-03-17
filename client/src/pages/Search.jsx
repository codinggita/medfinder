import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MedicineCard from "../components/MedicineCard";
import LuxeDropdown from "../components/LuxeDropdown";

const sortOptions = [
  { id: '', label: 'Relevance', icon: '🎯' },
  { id: 'price', label: 'Price (Low)', icon: '💰' },
  { id: 'stock', label: 'Availability', icon: '📦' },
];

const Search = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("");
  const inputRef = useRef();

  // Focus input automatically when search page mounts
  useEffect(() => {
    inputRef.current?.focus();
    // Check for query param from Home page
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get('keyword');
    if (keyword) {
      setSearchTerm(keyword);
    }
  }, []);

  // Debounce API calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchMedicines(searchTerm, page, sort);
    }, 500); // 500ms delay
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, page, sort]);

  const fetchMedicines = async (keyword, currentPage, sortBy) => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/api/medicines', {
        params: {
          keyword,
          page: currentPage,
          limit: 6,
          sort: sortBy
        }
      });
      setMedicines(data.medicines);
      setTotalPages(data.pages);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch medicines', error);
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSort("");
    setPage(1);
  };

  return (
    <div className="container mx-auto p-4 md:p-12 min-h-[calc(100vh-80px)] bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-emerald-400 mb-6 tracking-tight">
          Find Your Medicine
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-xl font-medium">
          Access a unified inventory of {totalPages * 6}+ healthcare products across local verified pharmacies.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12 bg-[#fcfdfc] dark:bg-gray-800/50 p-6 rounded-[35px] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-emerald-50 dark:border-gray-700/50 relative z-10 transition-all">
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#059669] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by name, category or brand..."
            className="w-full pl-16 pr-6 py-5 bg-white dark:bg-gray-900 border-2 border-emerald-50 dark:border-gray-700 rounded-full text-gray-900 dark:text-gray-100 text-lg font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-[#059669] outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600 shadow-inner"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-56">
            <LuxeDropdown
              options={sortOptions}
              selected={sort}
              onChange={(val) => {
                setSort(val);
                setPage(1);
              }}
              placeholder="Sort By"
            />
          </div>

          
          <button 
            onClick={clearFilters}
            className="px-8 py-5 bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 rounded-full font-black text-xs uppercase tracking-widest border-2 border-emerald-50 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-all"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Header */}
      {!loading && (
        <div className="mb-8 px-4 flex justify-between items-center">
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                FOUND <span className="text-[#059669]">{medicines.length}</span> RESULTS FOR "{searchTerm || 'ALL MEDICINES'}"
            </p>
        </div>
      )}

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-gray-50 dark:bg-gray-800/40 rounded-[35px] h-64 animate-pulse"></div>
            ))}
        </div>
      ) : medicines.length === 0 ? (
        <div className="text-center py-32 bg-[#fcfdfc] dark:bg-gray-800/30 rounded-[50px] border-2 border-dashed border-emerald-100 dark:border-gray-800 transition-colors">
          <div className="text-8xl mb-8 grayscale opacity-50">💊</div>
          <h3 className="text-3xl font-black text-gray-800 dark:text-gray-200 mb-4 tracking-tight">Out of Stock Everywhere</h3>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium max-w-md mx-auto">We couldn't find any pharmacy with "<span className="text-[#059669]">{searchTerm}</span>". Try a more general term like 'pain' or 'tablet'.</p>
          <button 
            onClick={clearFilters}
            className="mt-10 px-10 py-4 bg-[#059669] text-white rounded-full font-black text-lg shadow-xl hover:bg-[#047857] transition-all"
          >
            Reset Search
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {medicines.map((medicine) => (
              <div key={medicine._id} className="transform hover:scale-102 transition-transform duration-300">
                <MedicineCard medicine={medicine} />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-20 mb-12">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="w-16 h-16 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border-2 border-emerald-50 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center gap-2">
                 <span className="text-3xl font-black text-[#059669]">{page}</span>
                 <span className="text-gray-300 dark:text-gray-600 text-2xl font-black">/</span>
                 <span className="text-2xl font-black text-gray-400 dark:text-gray-500">{totalPages}</span>
              </div>

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="w-16 h-16 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border-2 border-emerald-50 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
      
      {/* Help Banner */}
      <div className="mt-32 p-12 bg-[#059669] dark:bg-emerald-950 rounded-[50px] text-center text-white relative overflow-hidden group">
         <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors"></div>
         <div className="relative z-10">
            <h4 className="text-3xl font-black mb-4">Need help finding a specific drug?</h4>
            <p className="text-emerald-100 mb-8 max-w-xl mx-auto font-medium">Our pharmacy support team is available 24/7 to help you locate rare or specialized medications.</p>
            <button className="px-12 py-5 bg-white text-[#059669] rounded-full font-black tracking-widest uppercase text-sm hover:scale-105 transition-all shadow-2xl">
                Chat with Specialist
            </button>
         </div>
      </div>
    </div>
  );
};

export default Search;
