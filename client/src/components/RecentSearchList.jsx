import React from 'react';

const RecentSearchList = () => {
  const searches = [
    { id: 1, medicine: "Amoxicillin", date: "Oct 26, 2023", time: "10:30 AM" },
    { id: 2, medicine: "Ibuprofen", date: "Oct 25, 2023", time: "2:15 PM" },
    { id: 3, medicine: "Paracetamol", date: "Oct 24, 2023", time: "9:45 AM" },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Recent Searches</h3>
      <div className="space-y-4">
        {searches.map((search) => (
          <div 
            key={search.id} 
            className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center group cursor-pointer hover:border-[#34d399] transition-all"
          >
            <div>
              <span className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-[#059669] transition-colors">{search.medicine}</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">- {search.date} {search.time}</span>
            </div>
            <div className="text-[#059669] opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearchList;
