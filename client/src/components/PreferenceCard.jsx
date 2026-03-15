import React from 'react';

const PreferenceCard = ({ theme, toggleTheme }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-[30px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-700 h-full">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">Account Preferences</h3>
      
      <div className="space-y-6">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
          <button 
            onClick={toggleTheme}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${theme === 'dark' ? 'bg-[#059669]' : 'bg-gray-300'}`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-8' : 'translate-x-1'}`}
            />
          </button>
        </div>

        {/* Checkbox Options */}
        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input type="checkbox" className="peer appearance-none h-6 w-6 border-2 border-[#10b981] rounded-md checked:bg-[#059669] checked:border-[#059669] transition-all" defaultChecked />
              <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#059669] transition-colors">Email Notifications</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input type="checkbox" className="peer appearance-none h-6 w-6 border-2 border-[#10b981] rounded-md checked:bg-[#059669] checked:border-[#059669] transition-all" />
              <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#059669] transition-colors">SMS Notifications</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input type="checkbox" className="peer appearance-none h-6 w-6 border-2 border-[#10b981] rounded-md checked:bg-[#059669] checked:border-[#059669] transition-all" defaultChecked />
              <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#059669] transition-colors">App Alerts</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PreferenceCard;
