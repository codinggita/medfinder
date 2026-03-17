import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

const LuxeDropdown = ({
  options = [],
  selected,
  onChange,
  placeholder = "Select Category",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const filteredOptions = useMemo(() => {
    return options.filter(opt =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, options]);

  const selectedOption = options.find(opt => opt.id === selected || opt.label === selected);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option.id || option.label);
    setIsOpen(false);
    setSearchTerm('');
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-6 py-4 
          bg-white dark:bg-gray-900 border-2 
          ${isOpen ? 'border-emerald-500 shadow-lg shadow-emerald-500/10' : 'border-gray-100 dark:border-gray-700'} 
          rounded-2xl text-left transition-all duration-300 group
        `}
      >
        <div className="flex items-center gap-3">
          {selectedOption ? (
            <>
              {selectedOption.icon && <span className="text-xl group-hover:scale-110 transition-transform">{selectedOption.icon}</span>}
              <span className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">
                {selectedOption.label}
              </span>
            </>
          ) : (
            <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-emerald-500 transition-colors">
              {placeholder}
            </span>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-emerald-500 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} strokeWidth={3} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="
          absolute z-[100] w-full mt-3 
          bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl 
          border-2 border-emerald-500/20 dark:border-emerald-500/10 
          rounded-[2rem] shadow-[0_25px_70px_rgba(0,0,0,0.15)] 
          overflow-hidden origin-top transition-all duration-300 animate-in fade-in zoom-in-95
        ">
          
          {/* Search Input */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter options..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 dark:text-white placeholder:text-gray-500"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" strokeWidth={3} />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-[300px] overflow-y-auto p-2 space-y-1 luxe-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const isSelected = selected === option.id || selected === option.label;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`
                      w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl 
                      transition-all duration-200 group/item
                      ${isSelected 
                        ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-400'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {option.icon && (
                        <span className={`text-lg transition-transform duration-300 group-hover/item:scale-125 ${isSelected ? 'scale-110' : ''}`}>
                          {option.icon}
                        </span>
                      )}
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-white' : ''}`}>
                        {option.label}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" strokeWidth={4} />
                      </div>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="py-12 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">No matches found</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .luxe-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .luxe-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .luxe-scrollbar::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 10px;
        }
        .luxe-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}} />
    </div>
  );
};

export default LuxeDropdown;
