import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Code2,
  GitBranch,
  BookOpen,
  BarChart3,
  CalendarCheck,
  FolderGit2,
  Target,
  Sparkles,
  Plus,
  Check,
  ChevronRight,
  X,
  Settings2,
  Terminal
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { getRoleConfig, getReadinessTier } from '../../data/rolesData';
import { UserAvatar } from '../common/UserAvatar';

const popularCompaniesList = [
  'Google',
  'Microsoft',
  'Amazon',
  'Uber',
  'Stripe',
  'Meta',
  'Apple',
  'Netflix',
  'NVIDIA',
  'Atlassian'
];

export const Sidebar = ({ isMobileOpen = false, onClose }) => {
  const { user, updateProfile } = useAuth();
  const { metrics, refreshData } = useData();

  const [isCompanyFlyoutOpen, setIsCompanyFlyoutOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const flyoutRef = useRef(null);

  // Core Platform Modules
  const mainModules = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/dsa', icon: Code2, label: 'DSA Tracker' },
    { to: '/roadmaps', icon: GitBranch, label: 'Roadmaps' },
    { to: '/projects', icon: FolderGit2, label: 'Projects' },
    { to: '/notes', icon: BookOpen, label: 'Smart Notes' },
    { to: '/planner', icon: CalendarCheck, label: 'Goal & Task Setter' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const roleConfig = getRoleConfig(user?.targetRole);
  const readiness = metrics?.readinessScore ?? user?.readinessScore ?? 0;
  const tierInfo = getReadinessTier(readiness);

  const parsedCompanies = user?.dreamCompany
    ? user.dreamCompany.split(',').map(c => c.trim()).filter(Boolean)
    : ['Google', 'Microsoft'];

  // Click outside to close target company flyout
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (flyoutRef.current && !flyoutRef.current.contains(e.target)) {
        setIsCompanyFlyoutOpen(false);
      }
    };
    if (isCompanyFlyoutOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCompanyFlyoutOpen]);

  const handleToggleCompany = async (companyName) => {
    setUpdating(true);
    let updated;
    if (parsedCompanies.includes(companyName)) {
      updated = parsedCompanies.filter(c => c !== companyName);
      if (updated.length === 0) updated = ['Top Tech Companies'];
    } else {
      updated = [...parsedCompanies.filter(c => c !== 'Top Tech Companies'), companyName];
    }

    try {
      await updateProfile({ dreamCompany: updated.join(', ') });
      refreshData();
    } catch (e) {
      console.error('Failed to update target companies:', e);
    } finally {
      setUpdating(false);
    }
  };

  const handleNavLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-fadeIn"
        />
      )}

      <aside
        className={`w-64 bg-[#0d1117] border-r border-[#30363d] flex flex-col justify-between shrink-0 h-screen z-40 transition-transform duration-300 md:translate-x-0 md:sticky md:top-0 font-sans ${
          isMobileOpen ? 'fixed top-0 left-0 bottom-0 translate-x-0 shadow-2xl ring-1 ring-[#30363d]' : 'fixed -translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="h-14 px-4 flex items-center justify-between border-b border-[#30363d]">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#58a6ff] shrink-0">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm font-bold tracking-tight text-[#f0f6fc] flex items-center gap-1.5 truncate">
                  NextOffer <span className="text-[10px] bg-[#21262d] text-[#8b949e] border border-[#30363d] px-1.5 py-0.2 rounded font-mono">v1.0</span>
                </h1>
                <p className="text-[10px] text-[#8b949e] truncate">Placement Platform</p>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] md:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)]">
            <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#6e7681]">
              Platform Modules
            </p>
            {mainModules.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={handleNavLinkClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-[#21262d] text-[#f0f6fc] font-semibold border-l-2 border-[#58a6ff] rounded-r-md rounded-l-none pl-2.5'
                        : 'text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#161b22] rounded-md'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
                  <span className="flex-1 truncate">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* CANDIDATE PLACEMENT TARGET WIDGET (GitHub Card Style) */}
        <div className="p-3 border-t border-[#30363d] relative" ref={flyoutRef}>
          {/* Main Card */}
          <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] space-y-2.5 relative">
            {/* Top Bar: User Avatar & Role */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <UserAvatar
                  user={user}
                  size="xs"
                  showStatus={false}
                />
                <span className="text-[11px] font-semibold text-[#f0f6fc] truncate" title={roleConfig.title}>
                  {roleConfig.shortLabel}
                </span>
              </div>

              <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-md border shrink-0 ${tierInfo.badgeClass}`}>
                {tierInfo.label}
              </span>
            </div>

            {/* Target Tech Companies Header */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-semibold text-[#8b949e] tracking-wider">
                  Target Firms
                </span>
                <button
                  type="button"
                  onClick={() => setIsCompanyFlyoutOpen(!isCompanyFlyoutOpen)}
                  className="text-[10px] text-[#58a6ff] hover:text-[#79c0ff] font-medium flex items-center gap-0.5 hover:underline"
                  title="Quick add or remove target companies"
                >
                  <Settings2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>

              {/* Company Chips */}
              <div className="flex flex-wrap gap-1 max-h-14 overflow-hidden">
                {parsedCompanies.slice(0, 3).map((comp) => (
                  <span
                    key={comp}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-[#21262d] text-[#c9d1d9] border border-[#30363d] font-medium truncate max-w-[90px]"
                    title={comp}
                  >
                    {comp}
                  </span>
                ))}
                {parsedCompanies.length > 3 && (
                  <span
                    onClick={() => setIsCompanyFlyoutOpen(true)}
                    className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#388bfd]/15 text-[#58a6ff] border border-[#388bfd]/30 font-medium cursor-pointer hover:bg-[#388bfd]/25"
                  >
                    +{parsedCompanies.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Direct Link to Profile Dossier */}
            <Link
              to="/profile"
              className="w-full pt-2 border-t border-[#30363d] flex items-center justify-between text-[10px] font-medium text-[#8b949e] hover:text-[#58a6ff] transition-colors group"
            >
              <span>Candidate Dossier</span>
              <ChevronRight className="w-3 h-3 text-[#6e7681] group-hover:text-[#58a6ff] transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* TARGET COMPANIES FLYOUT POPOVER (GitHub Popover Style) */}
          {isCompanyFlyoutOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-2 bg-[#161b22] border border-[#30363d] rounded-lg shadow-2xl p-3 z-50 animate-fadeIn space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#30363d] pb-2">
                <span className="text-xs font-semibold text-[#f0f6fc] flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#58a6ff]" /> Target Tech Firms
                </span>
                <button
                  type="button"
                  onClick={() => setIsCompanyFlyoutOpen(false)}
                  className="text-[#8b949e] hover:text-[#f0f6fc] p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-[10px] text-[#8b949e] leading-tight">
                Select your primary target hiring companies:
              </p>

              {/* Toggle Company Grid */}
              <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-0.5">
                {popularCompaniesList.map((comp) => {
                  const isSelected = parsedCompanies.includes(comp);
                  return (
                    <button
                      key={comp}
                      type="button"
                      disabled={updating}
                      onClick={() => handleToggleCompany(comp)}
                      className={`px-2 py-1.5 rounded-md text-[10px] font-medium flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#388bfd]/15 text-[#58a6ff] border border-[#388bfd]/40'
                          : 'bg-[#0d1117] hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] border border-[#30363d]'
                      }`}
                    >
                      <span className="truncate">{comp}</span>
                      {isSelected ? <Check className="w-3 h-3 text-[#58a6ff] shrink-0" /> : <Plus className="w-2.5 h-2.5 text-[#6e7681] shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-[#30363d] flex items-center justify-between text-[10px]">
                <span className="text-[#8b949e]">{parsedCompanies.length} Selected</span>
                <Link
                  to="/profile"
                  onClick={() => setIsCompanyFlyoutOpen(false)}
                  className="text-[#58a6ff] hover:underline font-medium"
                >
                  Full Profile &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
