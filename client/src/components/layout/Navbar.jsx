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
    <header className="h-14 border-b border-[#30363d] bg-[#161b22] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 font-sans">
      {/* Mobile Hamburger Drawer Trigger */}
      <button
        type="button"
        onClick={onToggleMobileMenu}
        className="p-1.5 -ml-1 mr-2 rounded-md text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] md:hidden flex items-center justify-center shrink-0"
        title="Toggle Menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Global Search Bar with Ctrl+K Shortcut */}
      <div ref={searchRef} className="relative flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.trim() && setIsSearchOpen(true)}
            placeholder="Type / to search questions, roadmaps, notes..."
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-9 pr-14 py-1.5 text-xs text-[#f0f6fc] placeholder-[#6e7681] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-colors"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="text-[#8b949e] hover:text-[#f0f6fc]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono font-semibold text-[#8b949e] bg-[#21262d] border border-[#30363d] rounded">
                Ctrl K
              </kbd>
            )}
          </div>
        </div>

        {/* Global Search Dropdown Results */}
        {isSearchOpen && searchResults && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#161b22] border border-[#30363d] rounded-md shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto p-2 space-y-2 animate-fadeIn">
            
            {/* 1. DSA Problems */}
            {searchResults.problems?.length > 0 && (
              <div className="space-y-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#58a6ff] flex items-center gap-1 px-2 py-1">
                  <Code2 className="w-3 h-3" /> DSA Questions ({searchResults.problems.length})
                </p>
                {searchResults.problems.slice(0, 3).map((item) => (
                  <div
                    key={item._id || item.id}
                    onClick={() => handleResultClick('/dsa')}
                    className="px-2 py-1.5 rounded-md hover:bg-[#21262d] cursor-pointer flex items-center justify-between text-xs text-[#f0f6fc] transition-colors"
                  >
                    <span className="font-medium truncate">{item.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium border ${
                      item.difficulty === 'Easy' ? 'bg-[#238636]/10 text-[#3fb950] border-[#238636]/30' :
                      item.difficulty === 'Medium' ? 'bg-[#d29922]/10 text-[#d29922] border-[#d29922]/30' :
                      'bg-[#da3633]/10 text-[#f85149] border-[#da3633]/30'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 2. Roadmaps */}
            {searchResults.roadmaps?.length > 0 && (
              <div className="space-y-0.5 pt-1 border-t border-[#30363d]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#58a6ff] flex items-center gap-1 px-2 py-1">
                  <GitBranch className="w-3 h-3" /> Roadmaps ({searchResults.roadmaps.length})
                </p>
                {searchResults.roadmaps.slice(0, 3).map((item) => (
                  <div
                    key={item._id || item.id}
                    onClick={() => handleResultClick('/roadmaps')}
                    className="px-2 py-1.5 rounded-md hover:bg-[#21262d] cursor-pointer flex items-center justify-between text-xs text-[#f0f6fc] transition-colors"
                  >
                    <span className="truncate">{item.title}</span>
                    <span className="text-[10px] text-[#8b949e]">{item.stageCount || item.stages?.length} Stages</span>
                  </div>
                ))}
              </div>
            )}

            {/* 3. Notes */}
            {searchResults.notes?.length > 0 && (
              <div className="space-y-0.5 pt-1 border-t border-[#30363d]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#3fb950] flex items-center gap-1 px-2 py-1">
                  <BookOpen className="w-3 h-3" /> Notes ({searchResults.notes.length})
                </p>
                {searchResults.notes.slice(0, 3).map((item) => (
                  <div
                    key={item._id || item.id}
                    onClick={() => handleResultClick('/notes')}
                    className="px-2 py-1.5 rounded-md hover:bg-[#21262d] cursor-pointer flex items-center justify-between text-xs text-[#f0f6fc] transition-colors"
                  >
                    <span className="truncate">{item.title}</span>
                    {item.tags?.[0] && (
                      <span className="text-[10px] text-[#8b949e] bg-[#21262d] px-1.5 py-0.2 rounded border border-[#30363d]">
                        #{item.tags[0]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 4. Projects */}
            {searchResults.projects?.length > 0 && (
              <div className="space-y-0.5 pt-1 border-t border-[#30363d]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#bc8cff] flex items-center gap-1 px-2 py-1">
                  <Rocket className="w-3 h-3" /> Projects ({searchResults.projects.length})
                </p>
                {searchResults.projects.slice(0, 3).map((item) => (
                  <div
                    key={item._id || item.id}
                    onClick={() => handleResultClick('/projects')}
                    className="px-2 py-1.5 rounded-md hover:bg-[#21262d] cursor-pointer flex items-center justify-between text-xs text-[#f0f6fc] transition-colors"
                  >
                    <span className="truncate font-medium">{item.title}</span>
                  </div>
                ))}
              </div>
            )}

            {/* 5. Revisions */}
            {searchResults.revisions?.length > 0 && (
              <div className="space-y-0.5 pt-1 border-t border-[#30363d]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#d29922] flex items-center gap-1 px-2 py-1">
                  <CalendarCheck className="w-3 h-3" /> Revisions ({searchResults.revisions.length})
                </p>
                {searchResults.revisions.slice(0, 3).map((item) => (
                  <div
                    key={item._id || item.id}
                    onClick={() => handleResultClick('/revision')}
                    className="px-2 py-1.5 rounded-md hover:bg-[#21262d] cursor-pointer flex items-center justify-between text-xs text-[#f0f6fc] transition-colors"
                  >
                    <span className="truncate">{item.topic}</span>
                    <span className="text-[10px] text-[#8b949e] bg-[#21262d] px-1.5 py-0.2 rounded border border-[#30363d]">
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!hasAnyResults && (
              <p className="text-xs text-[#8b949e] text-center py-3">No matching results found for "{searchQuery}"</p>
            )}
          </div>
        )}
      </div>

      {/* Center & Right Badges + User Dropdown */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Placement Readiness Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-[#21262d] border border-[#30363d] px-2.5 py-1 rounded-md">
          <Target className="w-3.5 h-3.5 text-[#58a6ff]" />
          <span className="text-xs text-[#8b949e]">Readiness:</span>
          <span className="text-xs font-semibold text-[#58a6ff]">{readiness}%</span>
          <div className="w-10 bg-[#0d1117] h-1.5 rounded-full overflow-hidden ml-0.5">
            <div
              className="bg-[#58a6ff] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(4, readiness)}%` }}
            />
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 bg-[#21262d] border border-[#30363d] px-2.5 py-1 rounded-md">
          <Flame className="w-3.5 h-3.5 text-[#d29922]" />
          <span className="text-xs font-semibold text-[#d29922]">{streak}d</span>
        </div>

        {/* Top-Right Profile Avatar & Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center gap-2 pl-1 pr-2 py-1 rounded-md border transition-all cursor-pointer focus:outline-none ${
              isDropdownOpen
                ? 'bg-[#21262d] border-[#58a6ff]'
                : 'hover:bg-[#21262d] border-transparent hover:border-[#30363d]'
            }`}
            title="Candidate Account"
          >
            <UserAvatar
              user={user}
              size="sm"
              showStatus={true}
            />

            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-[#f0f6fc] leading-tight flex items-center gap-1">
                <span className="truncate max-w-[90px]">{user?.name || 'Developer'}</span>
                <ChevronDown className={`w-3 h-3 text-[#8b949e] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#58a6ff]' : ''}`} />
              </p>
              <span className="text-[10px] text-[#8b949e] leading-tight block truncate max-w-[120px]">
                {roleConfig.shortLabel}
              </span>
            </div>
          </button>

          {/* GITHUB CANDIDATE PROFILE DROPDOWN */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-72 bg-[#161b22] border border-[#30363d] rounded-md shadow-2xl p-3 z-50 animate-fadeIn space-y-3 font-sans">
              
              {/* Candidate Identity Header */}
              <div className="flex items-start gap-2.5 pb-2.5 border-b border-[#30363d]">
                <UserAvatar
                  user={user}
                  size="md"
                  showStatus={false}
                />

                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-bold text-[#f0f6fc] truncate flex items-center gap-1">
                      {user?.name || 'Developer'}
                      <ShieldCheck className="w-3.5 h-3.5 text-[#58a6ff] shrink-0" />
                    </p>
                    <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-[#388bfd]/15 text-[#58a6ff] border border-[#388bfd]/30">
                      {readiness}%
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8b949e] truncate font-mono">{user?.email}</p>
                </div>
              </div>

              {/* Specialization & Targets */}
              <div className="p-2.5 rounded-md bg-[#0d1117] border border-[#30363d] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] uppercase font-semibold text-[#8b949e] flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-[#58a6ff]" /> Role
                  </span>
                  <span className="text-[10px] font-medium text-[#f0f6fc] truncate max-w-[130px]">
                    {roleConfig.shortLabel}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-[#8b949e]">Tier</span>
                    <span className="text-[#f0f6fc] font-medium">{tierInfo.tier}</span>
                  </div>
                  <div className="w-full bg-[#21262d] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#58a6ff] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(4, readiness)}%` }}
                    />
                  </div>
                </div>

                {parsedCompanies.length > 0 && (
                  <div className="pt-1.5 border-t border-[#21262d] flex items-center justify-between text-[10px]">
                    <span className="text-[#8b949e] flex items-center gap-1">
                      <Building className="w-3 h-3 text-[#3fb950]" /> Target
                    </span>
                    <div className="flex items-center gap-1">
                      {parsedCompanies.slice(0, 2).map((c, i) => (
                        <span key={i} className="px-1.5 py-0.2 rounded bg-[#161b22] text-[#c9d1d9] border border-[#30363d]">
                          {c}
                        </span>
                      ))}
                      {parsedCompanies.length > 2 && (
                        <span className="text-[#8b949e]">+{parsedCompanies.length - 2}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Menu Links */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate('/profile');
                  }}
                  className="w-full px-2.5 py-1.5 rounded-md hover:bg-[#21262d] flex items-center justify-between text-xs text-[#c9d1d9] hover:text-[#f0f6fc] transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#8b949e]" />
                    <span>Candidate Profile</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#6e7681]" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate('/analytics');
                  }}
                  className="w-full px-2.5 py-1.5 rounded-md hover:bg-[#21262d] flex items-center justify-between text-xs text-[#c9d1d9] hover:text-[#f0f6fc] transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-3.5 h-3.5 text-[#8b949e]" />
                    <span>Readiness Analytics</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#6e7681]" />
                </button>
              </div>

              {/* Sign Out */}
              <div className="pt-2 border-t border-[#30363d]">
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    logout();
                  }}
                  className="w-full px-2.5 py-1.5 rounded-md text-xs font-medium text-[#f85149] hover:bg-[#da3633]/15 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign out</span>
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
