import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import api from '../api/config';
import { AuthContext } from '../context/AuthContext';
import loginImage from '../assets/login_page.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const { data } = await api.post('/auth/login', {
        email,
        password
      });
      
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white overflow-hidden">
      {/* Left side: Image Background */}
      <div className="hidden md:block md:w-1/2 relative">
        <img 
          src={loginImage} 
          alt="MedFinder Login Graphic" 
          className="absolute inset-0 w-full h-full object-cover object-left"
        />
      </div>

      {/* Right side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center items-center gap-2 mb-10">
            <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <span className="text-2xl font-extrabold text-[#059669] tracking-tight">MedFinder</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-[#064e3b] dark:text-emerald-400">Welcome Back</h2>
          
          {error && <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-3 rounded mb-4 text-center">{error}</div>}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#10b981] group-focus-within:text-[#059669] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full p-4 pl-14 border-2 border-[#10b981]/30 rounded-full text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#059669] shadow-[0_5px_15px_rgba(16,185,129,0.1)] focus:shadow-[0_8px_25px_rgba(16,185,129,0.2)] bg-white dark:bg-gray-800/50 backdrop-blur-sm placeholder-gray-400 font-medium transition-all"
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
                className="w-full p-4 pl-14 border-2 border-[#10b981]/30 rounded-full text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#059669] shadow-[0_5px_15px_rgba(16,185,129,0.1)] focus:shadow-[0_8px_25px_rgba(16,185,129,0.2)] bg-white dark:bg-gray-800/50 backdrop-blur-sm placeholder-gray-400 font-medium transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="w-full bg-[#047857] text-white p-4 rounded-full font-bold text-lg hover:bg-[#064e3b] shadow-lg mt-8 transition-colors">
              Login
            </button>
          </form>
          
          <p className="mt-8 text-center text-gray-700 dark:text-gray-300 font-medium">
            Don't have an account? <Link to="/signup" className="text-[#059669] dark:text-emerald-400 font-bold hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
