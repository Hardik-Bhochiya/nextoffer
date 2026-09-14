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
  ChevronRight,
  ShieldCheck,
  Briefcase,
  Building,
  BarChart3,
  Sparkles,
  Layers,
  GitBranch,
  Rocket,
  CalendarCheck,
  Menu
} from 'lucide-react';
import { getRoleConfig, getReadinessTier } from '../../data/rolesData';
import { UserAvatar } from '../common/UserAvatar';

export const Navbar = ({ onToggleMobileMenu }) => {
  const { user, logout } = useAuth();
  const { metrics } = useData();
  const navigate = useNavigate();

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  // Profile Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const readiness = metrics?.readinessScore ?? user?.readinessScore ?? 0;
  const streak = metrics?.user?.streak ?? user?.streak ?? 1;
  const roleConfig = getRoleConfig(user?.targetRole);
  const tierInfo = getReadinessTier(readiness);

  const parsedCompanies = user?.dreamCompany
    ? user.dreamCompany.split(',').map(c => c.trim()).filter(Boolean)
    : [];

  // Global Ctrl + K / Cmd + K Hotkey Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle Global Search with Debounce
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

  const hasAnyResults = searchResults && (
    (searchResults.problems?.length || 0) > 0 ||
    (searchResults.roadmaps?.length || 0) > 0 ||
    (searchResults.notes?.length || 0) > 0 ||
    (searchResults.projects?.length || 0) > 0 ||
    (searchResults.revisions?.length || 0) > 0
  );

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Mobile Hamburger Drawer Trigger */}
      <button
        type="button"
        onClick={onToggleMobileMenu}
        className="p-2 -ml-2 mr-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 md:hidden flex items-center justify-center shrink-0"
        title="Toggle Menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Global Search Bar with Ctrl+K Shortcut */}
      <div ref={searchRef} className="relative flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.trim() && setIsSearchOpen(true)}
            placeholder="Search questions, roadmaps, notes, topics..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-10 pr-16 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-mono font-semibold text-slate-500 bg-slate-950 border border-slate-800 rounded shadow-sm">
                Ctrl K
              </kbd>
            )}
          </div>
        </div>

        {/* Global Search Dropdown Results */}
        {isSearchOpen && searchResults && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto p-3 space-y-3 animate-fadeIn">
            
            {/* 1. DSA Problems */}
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
                    <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800 shrink-0">
                      {item.topic}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 2. Roadmaps Tracks */}
            {searchResults.roadmaps?.length > 0 && (
              <div className="space-y-1 pt-1 border-t border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                  <GitBranch className="w-3 h-3" /> Learning Roadmaps ({searchResults.roadmaps.length})
                </p>
                {searchResults.roadmaps.slice(0, 3).map((item) => (
                  <div
                    key={item._id || item.id}
                    onClick={() => handleResultClick('/roadmaps')}
                    className="p-2 rounded-xl hover:bg-slate-800/80 cursor-pointer flex items-center justify-between text-xs text-slate-200 transition-colors"
                  >
                    <span className="font-medium truncate">{item.category}</span>
                    <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-lg border border-cyan-800/40 shrink-0">
                      Track
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 3. Smart Notes */}
            {searchResults.notes?.length > 0 && (
              <div className="space-y-1 pt-1 border-t border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> Interview Notes ({searchResults.notes.length})
                </p>
                {searchResults.notes.slice(0, 3).map((item) => (
                  <div
                    key={item._id || item.id}
                    onClick={() => handleResultClick('/notes')}
                    className="p-2 rounded-xl hover:bg-slate-800/80 cursor-pointer flex items-center justify-between text-xs text-slate-200 transition-colors"
                  >
                    <span className="truncate">{item.title}</span>
                    {item.tags?.[0] && (
                      <span className="text-[10px] text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-lg border border-amber-800/40 shrink-0">
                        #{item.tags[0]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 4. Projects */}
            {searchResults.projects?.length > 0 && (
              <div className="space-y-1 pt-1 border-t border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <Rocket className="w-3 h-3" /> Capstone Projects ({searchResults.projects.length})
                </p>
                {searchResults.projects.slice(0, 3).map((item) => (
                  <div
                    key={item._id || item.id}
                    onClick={() => handleResultClick('/projects')}
                    className="p-2 rounded-xl hover:bg-slate-800/80 cursor-pointer flex items-center justify-between text-xs text-slate-200 transition-colors"
                  >
                    <span className="truncate font-medium">{item.title}</span>
                  </div>
                ))}
              </div>
            )}

            {/* 5. Revisions & Tasks */}
            {searchResults.revisions?.length > 0 && (
              <div className="space-y-1 pt-1 border-t border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1">
                  <CalendarCheck className="w-3 h-3" /> Goals & Revisions ({searchResults.revisions.length})
                </p>
                {searchResults.revisions.slice(0, 3).map((item) => (
                  <div
                    key={item._id || item.id}
                    onClick={() => handleResultClick('/revision')}
                    className="p-2 rounded-xl hover:bg-slate-800/80 cursor-pointer flex items-center justify-between text-xs text-slate-200 transition-colors"
                  >
                    <span className="truncate">{item.topic}</span>
                    <span className="text-[10px] text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded-lg border border-purple-800/40 shrink-0">
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!hasAnyResults && (
              <p className="text-xs text-slate-500 text-center py-4">No matching results found for "{searchQuery}"</p>
            )}
          </div>
        )}
      </div>

      {/* Center & Right Badges + User Dropdown */}
      <div className="flex items-center gap-3 sm:gap-4">
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
            className={`flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-2xl border transition-all cursor-pointer focus:outline-none ${
              isDropdownOpen
                ? 'bg-slate-900 border-indigo-500/50 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                : 'hover:bg-slate-900/80 border-transparent hover:border-slate-800'
            }`}
            title="Candidate Dossier & Account"
          >
            {/* User Avatar Circle with Status Ping */}
            <UserAvatar
              user={user}
              size="sm"
              showStatus={true}
            />

            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-100 leading-tight flex items-center gap-1">
                <span className="truncate max-w-[90px]">{user?.name || 'Developer'}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-indigo-400' : ''}`} />
              </p>
              <span className="text-[10px] font-semibold text-indigo-400/90 leading-tight block truncate max-w-[120px]">
                {roleConfig.shortLabel}
              </span>
            </div>
          </button>

          {/* LUXURIOUS EXECUTIVE CANDIDATE DROPDOWN */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 rounded-3xl shadow-2xl p-4 z-50 animate-fadeIn space-y-3.5 ring-1 ring-white/10">
              
              {/* Candidate Identity Header */}
              <div className="flex items-start gap-3 pb-3 border-b border-slate-800/80">
                <UserAvatar
                  user={user}
                  size="md"
                  showStatus={false}
                />

                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-black text-white truncate flex items-center gap-1">
                      {user?.name || 'Developer'}
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    </p>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${tierInfo.badgeClass}`}>
                      {readiness}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate font-mono">{user?.email}</p>
                </div>
              </div>

              {/* Specialization & Readiness Micro-Dashboard */}
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-indigo-400" /> Specialization
                  </span>
                  <span className="text-[10px] font-bold text-indigo-300 truncate max-w-[140px]">
                    {roleConfig.shortLabel}
                  </span>
                </div>

                {/* Mini readiness gauge bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Readiness Tier</span>
                    <span className="text-slate-200 font-semibold">{tierInfo.tier}</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(4, readiness)}%` }}
                    />
                  </div>
                </div>

                {/* Target companies strip */}
                {parsedCompanies.length > 0 && (
                  <div className="pt-1.5 border-t border-slate-900 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Building className="w-3 h-3 text-cyan-400" /> Target
                    </span>
                    <div className="flex items-center gap-1">
                      {parsedCompanies.slice(0, 2).map((c, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 font-semibold">
                          {c}
                        </span>
                      ))}
                      {parsedCompanies.length > 2 && (
                        <span className="text-slate-500 font-bold">+{parsedCompanies.length - 2}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Menu Links */}
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate('/profile');
                  }}
                  className="w-full p-2.5 rounded-2xl bg-slate-950/60 hover:bg-slate-800/90 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between text-xs transition-all group shadow-sm text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-indigo-950 border border-indigo-800/50 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-200 group-hover:text-white transition-colors">Candidate Dossier</p>
                      <p className="text-[10px] text-slate-500">Edit specialization, targets & handles</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate('/analytics');
                  }}
                  className="w-full p-2.5 rounded-2xl bg-slate-950/60 hover:bg-slate-800/90 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between text-xs transition-all group shadow-sm text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-cyan-950 border border-cyan-800/50 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <BarChart3 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-200 group-hover:text-white transition-colors">Performance Analytics</p>
                      <p className="text-[10px] text-slate-500">Scoring formula & breakdown</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>

              {/* Log Out Action */}
              <div className="pt-2 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    logout();
                  }}
                  className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out Account</span>
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
