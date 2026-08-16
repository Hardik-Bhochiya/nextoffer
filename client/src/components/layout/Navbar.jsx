import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Flame, Sparkles, Target, Bell, Search, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  const { user } = useAuth();
  const { metrics } = useData();

  const readiness = metrics?.readinessScore ?? user?.readinessScore ?? 84;
  const streak = metrics?.user?.streak ?? user?.streak ?? 12;

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search & Breadcrumb */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search problems, topics, notes (Ctrl + K)..."
            className="w-full bg-slate-950/60 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Center & Right Badges */}
      <div className="flex items-center gap-4">
        {/* Placement Readiness Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-indigo-950/50 border border-indigo-800/40 px-3 py-1 rounded-full">
          <Target className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span className="text-xs text-slate-300 font-medium">Placement Readiness:</span>
          <span className="text-xs font-bold text-indigo-400">{readiness}%</span>
          <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden ml-1">
            <div
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${readiness}%` }}
            />
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 bg-amber-950/40 border border-amber-800/40 px-3 py-1 rounded-full">
          <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
          <span className="text-xs font-bold text-amber-400">{streak} Day Streak</span>
        </div>

        {/* AI Ready Indicator */}
        <div className="hidden md:flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] font-semibold text-emerald-400">AI Mentor Active</span>
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-xs text-white shadow-md">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'H'}
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-medium text-slate-200 leading-tight">{user?.name || 'Hardik Bhochiya'}</p>
            <p className="text-[10px] text-slate-400 leading-tight">{user?.targetRole || 'Full Stack SDE'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
