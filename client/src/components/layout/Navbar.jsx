import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {
  Flame,
  Target,
  Search,
  User,
  X,
  Code2,
  BookOpen,
  LogOut,
  ChevronDown,
  Settings,
  Sparkles,
  Layers,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { metrics } = useData();
  const navigate = useNavigate();

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  // Profile Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const readiness = metrics?.readinessScore ?? user?.readinessScore ?? 0;
  const streak = metrics?.user?.streak ?? user?.streak ?? 1;

  // Handle Global Search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await api.get(`/search?q=${encodeURIComponent(searchQuery)}`);
        if (res?.data) {
          setSearchResults(res.data);
          setIsSearchOpen(true);
        }
      } catch (err) {
        console.error('Search error:', err);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside listener for search & profile dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (route) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(route);
  };

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Global Search Bar */}
      <div ref={searchRef} className="relative flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.trim() && setIsSearchOpen(true)}
            placeholder="Search problems, roadmaps, notes, topics..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Search Dropdown Results */}
        {isSearchOpen && searchResults && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto p-3 space-y-3 animate-fadeIn">
            {/* DSA Matches */}
            {searchResults.problems?.length > 0 && (
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                  <Code2 className="w-3 h-3" /> DSA Questions ({searchResults.problems.length})
                </p>
                {searchResults.problems.slice(0, 3).map((item) => (
                  <div
                    key={item._id || item.id}
                    onClick={() => handleResultClick('/dsa')}
                    className="p-2 rounded-xl hover:bg-slate-800/80 cursor-pointer flex items-center justify-between text-xs text-slate-200 transition-colors"
                  >
                    <span className="font-medium truncate">{item.title}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800">{item.topic}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Notes */}
            {searchResults.notes?.length > 0 && (
              <div className="space-y-1 pt-1 border-t border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> Placement Notes ({searchResults.notes.length})
                </p>
                {searchResults.notes.slice(0, 3).map((item) => (
                  <div
                    key={item._id || item.id}
                    onClick={() => handleResultClick('/notes')}
                    className="p-2 rounded-xl hover:bg-slate-800/80 cursor-pointer flex items-center justify-between text-xs text-slate-200 transition-colors"
                  >
                    <span className="truncate">{item.title}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {(!searchResults.problems?.length && !searchResults.notes?.length && !searchResults.projects?.length) && (
              <p className="text-xs text-slate-500 text-center py-3">No matching results found for "{searchQuery}"</p>
            )}
          </div>
        )}
      </div>

      {/* Center & Right Badges + User Dropdown */}
      <div className="flex items-center gap-4">
        {/* Placement Readiness Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-indigo-950/40 border border-indigo-800/40 px-3.5 py-1.5 rounded-2xl shadow-sm">
          <Target className="w-4 h-4 text-indigo-400" />
          <span className="text-xs text-slate-300 font-medium">Readiness:</span>
          <span className="text-xs font-black text-indigo-400">{readiness}%</span>
          <div className="w-10 bg-slate-800 h-1.5 rounded-full overflow-hidden ml-1">
            <div
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(4, readiness)}%` }}
            />
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 bg-amber-950/40 border border-amber-800/40 px-3 py-1.5 rounded-2xl shadow-sm">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs font-bold text-amber-400">{streak} Days</span>
        </div>

        {/* Top-Right Profile Avatar & Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2.5 p-1 rounded-2xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all cursor-pointer focus:outline-none"
            title="Profile & Role Recommendations"
          >
            {/* User Avatar Circle */}
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-sm text-white shadow-lg shadow-indigo-600/20 border border-white/10">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>

            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-100 leading-tight flex items-center gap-1">
                {user?.name || 'Developer'}
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </p>
              <p className="text-[10px] text-slate-400 leading-tight truncate max-w-[130px]">
                {user?.targetRole || 'Software Engineer'}
              </p>
            </div>
          </button>

          {/* Profile Dropdown Menu with Role Recommendations */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-3 z-50 animate-fadeIn space-y-3">
              {/* Header Info */}
              <div className="p-2 border-b border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-white truncate">{user?.name || 'Developer'}</p>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-bold border border-indigo-800/40">
                    {readiness}% Ready
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                <div className="mt-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800 font-medium truncate block text-center">
                    🎯 {user?.targetRole || 'Full Stack Software Engineer'}
                  </span>
                </div>
              </div>

              {/* Option 1: Profile */}
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate('/profile');
                  }}
                  className="w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold text-slate-200 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-400" />
                    <span>My Profile</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>

              {/* Option 2: Sign Out */}
              <div className="pt-1 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    logout();
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-medium text-rose-400 hover:bg-rose-950/40 flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
