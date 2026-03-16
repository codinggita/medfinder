import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import signupImage from '../assets/signup_page.png';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('User');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
        role: role.toLowerCase()
      });
      
      login(data);
      if (data.role === 'pharmacy') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white overflow-hidden">
      {/* Left side: Image Background */}
      <div className="hidden md:block md:w-1/2 relative">
        <img 
          src={signupImage} 
          alt="MedFinder Signup Graphic" 
          className="absolute inset-0 w-full h-full object-cover object-left"
        />
      </div>

      {/* Right side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-12 relative bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(42, 42) rotate(45)">
                <defs>
                  <linearGradient id="pillGradLogo" x1="0" y1="-35" x2="0" y2="35" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                </defs>
                <rect x="-18" y="-35" width="36" height="70" rx="18" fill="url(#pillGradLogo)" />
                <path d="M -12, -6 L -12, -17 A 12,12 0 0,1 12,-17 L 12, -6 Z" fill="white" />
                <path d="M -11, 4 L -11, 17 A 11,11 0 0,0 -3, 27.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </g>
              <circle cx="72" cy="72" r="22" fill="#34d399" stroke="white" strokeWidth="4" />
              <path d="M72,59 L72,85 M59,72 L85,72" stroke="white" strokeWidth="5" strokeLinecap="round" />
            </svg>
            <span className="text-xl font-extrabold text-[#059669] tracking-tight">MedFinder</span>
          </div>

          <h2 className="text-3xl font-extrabold mb-8 text-center text-[#064e3b] dark:text-emerald-400">Create Account</h2>
          
          {error && <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-3 rounded-lg mb-4 text-center text-sm font-medium">{error}</div>}
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#10b981] group-focus-within:text-[#059669] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full p-3 pl-14 border-2 border-[#10b981]/30 rounded-full text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#059669] shadow-[0_5px_15px_rgba(16,185,129,0.1)] focus:shadow-[0_8px_25px_rgba(16,185,129,0.2)] bg-white dark:bg-gray-800/50 backdrop-blur-sm placeholder-gray-400 font-medium text-sm transition-all text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#10b981] group-focus-within:text-[#059669] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full p-3 pl-14 border-2 border-[#10b981]/30 rounded-full text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#059669] shadow-[0_5px_15px_rgba(16,185,129,0.1)] focus:shadow-[0_8px_25px_rgba(16,185,129,0.2)] bg-white dark:bg-gray-800/50 backdrop-blur-sm placeholder-gray-400 font-medium text-sm transition-all text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#10b981] group-focus-within:text-[#059669] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full p-3 pl-14 border-2 border-[#10b981]/30 rounded-full text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#059669] shadow-[0_5px_15px_rgba(16,185,129,0.1)] focus:shadow-[0_8px_25px_rgba(16,185,129,0.2)] bg-white dark:bg-gray-800/50 backdrop-blur-sm placeholder-gray-400 font-medium text-sm transition-all text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#10b981] group-focus-within:text-[#059669] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                 type="password" 
                 placeholder="Confirm Password" 
                 className="w-full p-3 pl-14 border-2 border-[#10b981]/30 rounded-full text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#059669] shadow-[0_5px_15px_rgba(16,185,129,0.1)] focus:shadow-[0_8px_25px_rgba(16,185,129,0.2)] bg-white dark:bg-gray-800/50 backdrop-blur-sm placeholder-gray-400 font-medium text-sm transition-all text-sm"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 required
               />
            </div>
            <div className="pt-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 ml-1">Role</label>
              <select 
                className="w-full p-3 border-2 border-[#10b981] rounded-xl text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#059669] shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_20px_rgba(5,150,105,0.5)] bg-white dark:bg-gray-800 font-medium text-sm appearance-none cursor-pointer transition-all"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23059669'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.2em 1.2em'
                }}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="User" className="bg-green-50 dark:bg-gray-800">User</option>
                <option value="Pharmacy" className="bg-white dark:bg-gray-800">Pharmacy</option>
              </select>
            </div>
            
            <button type="submit" className="w-full bg-[#047857] text-white p-3 rounded-full font-bold text-sm hover:bg-[#064e3b] shadow-lg mt-6 transition-colors">
              Create Account
            </button>
          </form>
          
          <p className="mt-6 text-center text-gray-700 dark:text-gray-300 text-sm font-medium">
            Already have an account? <Link to="/login" className="text-[#059669] dark:text-emerald-400 font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
