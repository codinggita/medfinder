import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [name, setName] = useState(user?.name || 'John Doe');
  const [email, setEmail] = useState(user?.email || 'john.doe@email.com');
  const [password, setPassword] = useState('********');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      alert('Profile updated successfully! (Simulated)');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left Side - Profile Form */}
        <div className="bg-[#fcfdfc] dark:bg-gray-800/50 p-12 rounded-[50px] shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-emerald-50 dark:border-gray-700/50 backdrop-blur-xl">
          <div className="flex flex-col items-center mb-16">
            <div className="relative mb-8 group">
              <div className="w-40 h-40 rounded-full border-8 border-emerald-50 dark:border-emerald-900/30 p-1 bg-white dark:bg-gray-800 shadow-xl overflow-hidden transition-all duration-500 group-hover:scale-105">
                <img
                  src={`https://ui-avatars.com/api/?name=${name}&background=059669&color=fff&size=200`}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <label className="absolute bottom-2 right-2 bg-[#059669] text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-[#047857] hover:scale-110 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input type="file" className="hidden" />
              </label>
            </div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2">{name}</h2>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
              <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs">{user?.role || 'Guest'} ACCOUNT</p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase ml-6 tracking-widest">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-8 py-5 bg-white dark:bg-gray-900 border-2 border-emerald-50 dark:border-gray-700/50 rounded-full text-gray-800 dark:text-white focus:outline-none focus:border-[#059669] transition-all font-bold shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase ml-6 tracking-widest">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-8 py-5 bg-white dark:bg-gray-900 border-2 border-emerald-50 dark:border-gray-700/50 rounded-full text-gray-800 dark:text-white focus:outline-none focus:border-[#059669] transition-all font-bold shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase ml-6 tracking-widest">Account Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-8 py-5 bg-white dark:bg-gray-900 border-2 border-emerald-50 dark:border-gray-700/50 rounded-full text-gray-800 dark:text-white focus:outline-none focus:border-[#059669] transition-all font-bold shadow-inner"
                />
                <button type="button" className="absolute right-6 top-1/2 -translate-y-1/2 text-[#059669] font-bold text-sm tracking-widest hover:text-[#047857]">REVEAL</button>
              </div>
            </div>

            <div className="pt-10 flex flex-col md:flex-row gap-6">
              <button
                type="submit"
                disabled={isUpdating}
                className="flex-1 bg-[#059669] text-white py-6 rounded-full font-black text-xl hover:bg-[#047857] shadow-xl hover:shadow-[#059669]/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {isUpdating ? 'Saving Changes...' : 'Save Settings'}
              </button>
              <button
                type="button"
                className="flex-1 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 py-6 rounded-full font-black text-xl hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700 transition-all active:scale-95"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Preferences & History */}
        <div className="space-y-12">
          {/* Preferences Card */}
          <div className="bg-[#fcfdfc] dark:bg-gray-800/50 p-12 rounded-[50px] shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-emerald-50 dark:border-gray-700/50">
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-10">Account Preferences</h3>
            <div className="space-y-8">
              <div className="flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-[30px] shadow-sm">
                <div>
                  <div className="font-black text-gray-800 dark:text-gray-100 text-lg">Dark Mode</div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Easier on the eyes in low light.</p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`w-16 h-8 rounded-full transition-colors duration-300 relative ${theme === 'dark' ? 'bg-[#059669]' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300 transform ${theme === 'dark' ? 'translate-x-9' : 'translate-x-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-[30px] shadow-sm">
                <div>
                  <div className="font-black text-gray-800 dark:text-gray-100 text-lg">Email Alerts</div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Get notified when stock is back.</p>
                </div>
                <button className="w-16 h-8 rounded-full bg-[#059669] relative">
                  <div className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white"></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-[30px] shadow-sm">
                <div>
                  <div className="font-black text-gray-800 dark:text-gray-100 text-lg">App Sync</div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Sync history across devices.</p>
                </div>
                <button className="w-16 h-8 rounded-full bg-gray-200 relative">
                  <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Search History */}
          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-12 rounded-[50px] border border-emerald-100/50 dark:border-emerald-800/30">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-black text-gray-900 dark:text-white">Recent Activity</h3>
              <button className="text-[#059669] dark:text-[#34d399] font-black text-xs tracking-widest uppercase hover:underline">Clear All</button>
            </div>
            <div className="space-y-4">
              {[
                { term: 'Amoxicillin', date: 'Oct 26, 2023', status: 'Found' },
                { term: 'Ibuprofen', date: 'Oct 25, 2023', status: 'In Stock' },
                { term: 'Paracetamol', date: 'Oct 24, 2023', status: 'Not Found' }
              ].map((search, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 bg-white dark:bg-gray-800/80 rounded-[30px] shadow-sm hover:scale-102 transition-transform cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${search.status === 'Found' ? 'bg-emerald-100 text-emerald-700' : search.status === 'In Stock' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                      {search.term.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 dark:text-white">{search.term}</div>
                      <div className="text-xs text-gray-500 font-medium">{search.date}</div>
                    </div>
                  </div>
                  <div className={`text-xs font-black uppercase tracking-widest ${search.status === 'Found' ? 'text-emerald-500' : search.status === 'In Stock' ? 'text-blue-500' : 'text-red-500'}`}>
                    {search.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
