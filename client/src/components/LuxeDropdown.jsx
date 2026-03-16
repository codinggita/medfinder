import React, { useState, useRef, useEffect, useMemo } from 'react';

const LuxeDropdown = ({ 
  options = [], 
  selected, 
  onChange, 
  placeholder = "Select Category",
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
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

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => (prev + 1) % (filteredOptions.length || 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev - 1 + (filteredOptions.length || 1)) % (filteredOptions.length || 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleSelect = (option) => {
    onChange(option.id || option.label);
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef} onKeyDown={handleKeyDown}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-white/5 border ${isOpen ? 'border-emerald-500 ring-4 ring-emerald-500/10' : 'border-gray-100 dark:border-white/5'} rounded-2xl text-left transition-all duration-300 hover:border-emerald-500/30 group shadow-sm hover:shadow-md`}
      >
        <div className="flex items-center gap-3">
          {selectedOption ? (
            <>
              {selectedOption.icon && <span className="text-xl">{selectedOption.icon}</span>}
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white">
                {selectedOption.label}
              </span>
            </>
          ) : (
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-emerald-600/50 transition-colors">
              {placeholder}
            </span>
          )}
        </div>
        <div className={`transition-transform duration-300 pointer-events-none text-emerald-600 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-[100] w-full mt-3 bg-white/95 dark:bg-[#064E3B]/95 backdrop-blur-xl border border-emerald-500/20 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(16,185,129,0.15)] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          
          {/* Search Input */}
          <div className="p-3 border-b border-gray-100 dark:border-white/5">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setHighlightedIndex(0);
                }}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 dark:text-white placeholder:text-gray-400"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-[250px] overflow-y-auto luxe-scrollbar p-2 space-y-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const isSelected = selected === option.id || selected === option.label;
                const isHighlighted = highlightedIndex === index;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 group/item ${
                      isSelected 
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                        : isHighlighted 
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-emerald-50/50 dark:hover:bg-white/5 hover:text-emerald-600'
                    }`}
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
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="py-8 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">No options found</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .luxe-scrollbar::-webkit-scrollbar {
          width: 4px;
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
