import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Code2,
  GitBranch,
  BookOpen,
  BarChart3,
  CalendarCheck,
  Building,
  Rocket,
  Target,
  Plus,
  Check,
  ChevronRight,
  Sparkles,
  Briefcase,
  X,
  Settings2
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
    { to: '/projects', icon: Rocket, label: 'Capstone Projects' },
    { to: '/notes', icon: BookOpen, label: 'Smart Notes' },
    { to: '/revision', icon: CalendarCheck, label: 'Goal & Task Setter' },
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
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-30 md:hidden animate-fadeIn"
        />
      )}

      <aside
        className={`w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0 h-screen z-40 transition-transform duration-300 md:translate-x-0 md:sticky md:top-0 ${
          isMobileOpen ? 'fixed top-0 left-0 bottom-0 translate-x-0 shadow-2xl ring-1 ring-slate-800' : 'fixed -translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5 truncate">
                  NextOffer <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded font-mono font-normal">v1.0</span>
                </h1>
                <p className="text-[10px] text-slate-400 truncate">Preparation Command Center</p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)]">
            <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Navigation
            </p>
            {mainModules.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={handleNavLinkClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span className="flex-1 truncate">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

      {/* DYNAMIC BOTTOM-LEFT CANDIDATE PLACEMENT TARGET WIDGET */}
      <div className="p-3 border-t border-slate-800/80 relative" ref={flyoutRef}>
        
        {/* Main Card */}
        <div className="p-3 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/50 border border-slate-800/90 shadow-lg space-y-2.5 relative">
          
          {/* Top Bar: User Avatar & Role */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <UserAvatar
                user={user}
                size="xs"
                showStatus={false}
              />
              <span className="text-[11px] font-bold text-slate-200 truncate" title={roleConfig.title}>
                {roleConfig.shortLabel}
              </span>
            </div>

            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border shrink-0 ${tierInfo.badgeClass}`}>
              {readiness}%
            </span>
          </div>

          {/* Dream Companies Tag Row with Quick Popover Trigger */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold">
              <span className="flex items-center gap-1">
                <Building className="w-3 h-3 text-cyan-400" /> Target Companies
              </span>
              <button
                type="button"
                onClick={() => setIsCompanyFlyoutOpen(!isCompanyFlyoutOpen)}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-0.5 hover:underline"
                title="Quick add or remove target companies"
              >
                <Settings2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>

            {/* Dynamic Interactive Company Chips */}
            <div className="flex flex-wrap gap-1 max-h-14 overflow-hidden">
              {parsedCompanies.slice(0, 3).map((comp) => (
                <span
                  key={comp}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-200 border border-slate-800 font-semibold truncate max-w-[90px]"
                  title={comp}
                >
                  {comp}
                </span>
              ))}
              {parsedCompanies.length > 3 && (
                <span
                  onClick={() => setIsCompanyFlyoutOpen(true)}
                  className="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800/50 font-bold cursor-pointer hover:bg-indigo-900"
                >
                  +{parsedCompanies.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Direct Link to Profile Dossier */}
          <Link
            to="/profile"
            className="w-full pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-bold text-slate-400 hover:text-indigo-300 transition-colors group"
          >
            <span>Candidate Dossier</span>
            <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-indigo-300 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* QUICK TARGET COMPANIES FLYOUT POPOVER */}
        {isCompanyFlyoutOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-2 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-3 z-50 animate-fadeIn space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-indigo-400" /> Target Tech Firms
              </span>
              <button
                type="button"
                onClick={() => setIsCompanyFlyoutOpen(false)}
                className="text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[10px] text-slate-400 leading-tight">
              1-Click toggle your primary target hiring companies:
            </p>

            {/* Quick Toggle Company Grid */}
            <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-0.5">
              {popularCompaniesList.map((comp) => {
                const isSelected = parsedCompanies.includes(comp);
                return (
                  <button
                    key={comp}
                    type="button"
                    disabled={updating}
                    onClick={() => handleToggleCompany(comp)}
                    className={`px-2 py-1.5 rounded-lg text-[10px] font-semibold flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-indigo-950 text-indigo-300 border border-indigo-700/80'
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    <span className="truncate">{comp}</span>
                    {isSelected ? <Check className="w-3 h-3 text-indigo-400 shrink-0" /> : <Plus className="w-2.5 h-2.5 text-slate-500 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
              <span className="text-slate-500">{parsedCompanies.length} Active Target{parsedCompanies.length !== 1 ? 's' : ''}</span>
              <Link
                to="/profile"
                onClick={() => setIsCompanyFlyoutOpen(false)}
                className="text-indigo-400 hover:text-indigo-300 font-bold"
              >
                Full Profile →
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
