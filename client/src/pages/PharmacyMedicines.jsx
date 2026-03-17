import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MedicineCard from '../components/MedicineCard';

const PharmacyMedicines = () => {
  const { pharmacyId, pharmacyName } = useParams();
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const decodedName = decodeURIComponent(pharmacyName || '');

  useEffect(() => {
    const timer = setTimeout(() => fetchMedicines(), 400);
    return () => clearTimeout(timer);
  }, [pharmacyId, search, sort, page]);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/api/medicines', {
        params: { pharmacyId, keyword: search, sort, page, limit: 9 },
      });
      setMedicines(data.medicines);
      setTotalPages(data.pages);
      setTotal(data.total);
    } catch (err) {
      setError('Failed to load medicines.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (p) => {
    if (p >= 1 && p <= totalPages) {
      setPage(p);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Header */}
      <div className="bg-white dark:bg-gray-900 border-b-2 border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
            <button onClick={() => navigate('/pharmacies')} className="hover:text-emerald-600 transition-colors font-medium">
              Pharmacies
            </button>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-600 dark:text-gray-300 font-semibold">{decodedName}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Pharmacy Icon */}
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-inner">
                <svg className="w-10 h-10 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{decodedName}</h1>
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold uppercase tracking-widest rounded-full border border-emerald-200 dark:border-emerald-800">
                    ✓ Verified Partner
                  </span>
                </div>
                <p className="text-gray-500 text-sm">
                  {loading ? 'Loading...' : `${total} medicine${total !== 1 ? 's' : ''} available`}
                </p>
              </div>
            </div>

            {/* Search for this pharmacy */}
            <div className="relative w-full lg:w-80">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search in this pharmacy..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-12 pr-5 py-3.5 bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-sm text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
              />
            </div>
          </div>

          {/* Sort Row */}
          <div className="flex items-center gap-3 mt-6 flex-wrap">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Sort by:</span>
            {[
              { label: 'Relevance', value: '' },
              { label: 'Price: Low → High', value: 'price' },
              { label: 'Availability', value: 'stock' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => { setSort(opt.value); setPage(1); }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border-2 ${
                  sort === opt.value
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700 hover:border-emerald-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border-2 border-rose-200 rounded-2xl text-rose-600 text-sm font-medium">{error}</div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-3xl h-72 animate-pulse" />
            ))}
          </div>
        ) : medicines.length === 0 ? (
          <div className="text-center py-32 space-y-6">
            <div className="text-7xl">💊</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {search ? `No results for "${search}"` : 'No medicines listed yet'}
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              {search ? 'Try a different search term.' : 'This pharmacy hasn\'t added any medicines to their inventory yet.'}
            </p>
            {search && (
              <button onClick={() => setSearch('')} className="px-8 py-3 bg-emerald-600 text-white rounded-2xl font-semibold hover:bg-emerald-700 transition-all">
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {medicines.map(medicine => (
                <MedicineCard key={medicine._id} medicine={medicine} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-16">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 text-gray-500 hover:bg-emerald-50 hover:border-emerald-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-emerald-600">{page}</span>
                  <span className="text-gray-300 font-bold">/</span>
                  <span className="text-xl font-bold text-gray-400">{totalPages}</span>
                </div>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 text-gray-500 hover:bg-emerald-50 hover:border-emerald-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PharmacyMedicines;
