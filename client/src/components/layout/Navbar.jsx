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
  FolderGit2,
  CalendarCheck,
  Menu
} from 'lucide-react';
import { getRoleConfig, getReadinessTier } from '../../data/rolesData';
import { UserAvatar } from '../common/UserAvatar';

import { UniversalSearchModal } from '../common/UniversalSearchModal';

export const Navbar = ({ onToggleMobileMenu }) => {
  const { user, logout } = useAuth();
  const { metrics } = useData();
  const navigate = useNavigate();

  // Search Modal State
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside listener for profile dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <UniversalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      <header className="relative h-14 border-b border-[#30363d] bg-[#161b22]/95 backdrop-blur shadow-sm px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 font-sans">
        {/* Mobile Hamburger Drawer Trigger */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="p-1.5 -ml-1 mr-2 rounded-md text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] md:hidden flex items-center justify-center shrink-0"
          title="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar (Triggers Universal Command Palette) */}
        <div className="relative flex-1 max-w-md">
          <button
            type="button"
            onClick={() => setIsSearchModalOpen(true)}
            className="w-full bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff]/60 hover:bg-[#161b22] rounded-md pl-9 pr-3 py-1.5 text-xs text-[#8b949e] hover:text-[#c9d1d9] flex items-center justify-between transition-all group text-left cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#8b949e] group-hover:text-[#58a6ff] absolute left-3 top-1/2 -translate-y-1/2 transition-colors" />
            <span className="truncate">Type <span className="font-mono text-[#58a6ff]">Ctrl K</span> or click to search...</span>
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono font-semibold text-[#8b949e] bg-[#21262d] border border-[#30363d] rounded group-hover:text-[#f0f6fc]">
              Ctrl K
            </kbd>
          </button>
        </div>

      {/* Right Side: Readiness Metrics & Candidate Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Pill */}
        {streak > 0 && (
          <div
            className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#21262d]/60 border border-[#30363d] text-xs font-semibold text-[#f0883e]"
            title={`Active Streak: ${streak} day${streak > 1 ? 's' : ''}`}
          >
            <Flame className="w-3.5 h-3.5 fill-[#f0883e]" />
            <span>{streak}d</span>
          </div>
        )}

        {/* Interactive Readiness Score Pill Badge */}
        <button
          type="button"
          onClick={() => navigate('/analytics')}
          className="flex items-center gap-2 px-2 sm:px-2.5 py-1 rounded-md bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff]/60 hover:bg-[#21262d] transition-all group cursor-pointer"
          title={`Live Placement Readiness: ${readiness}% (${tierInfo.tier}). Click to view detailed analytics.`}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
            <span className="text-[11px] font-medium text-[#8b949e] group-hover:text-[#c9d1d9] transition-colors hidden md:inline">
              Readiness
            </span>
            <span className="text-xs font-bold text-[#58a6ff] font-mono">
              {readiness}%
            </span>
          </div>

          {/* Mini in-pill progress bar */}
          <div className="hidden sm:block w-10 md:w-14 h-1.5 bg-[#21262d] rounded-full overflow-hidden border border-[#30363d]/50">
            <div
              className="h-full bg-gradient-to-r from-[#1f6feb] to-[#3fb950] rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(readiness > 0 ? 5 : 0, readiness))}%` }}
            />
          </div>
        </button>

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

      {/* Persistent Live Readiness Score Progress Line on Fixed Navbar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#21262d]/50 overflow-hidden pointer-events-none"
        title={`Placement Readiness: ${readiness}% (${tierInfo.tier})`}
      >
        <div
          className="h-full bg-gradient-to-r from-[#1f6feb] via-[#58a6ff] to-[#3fb950] transition-all duration-700 ease-out shadow-[0_0_8px_rgba(88,166,255,0.7)]"
          style={{ width: `${Math.min(100, Math.max(readiness > 0 ? 3 : 0, readiness))}%` }}
        />
      </div>
    </header>
  </>
  );
};

export default Navbar;
