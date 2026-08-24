import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Code2,
  GitBranch,
  BookOpen,
  BarChart3,
  CalendarCheck,
  Building,
  Layers,
  BrainCircuit,
  FileText,
  Bot,
  Rocket,
  Sparkles,
  Target
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = () => {
  const { user } = useAuth();

  // Core Documentation Modules
  const mainModules = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/dsa', icon: Code2, label: 'DSA Tracker' },
    { to: '/roadmaps', icon: GitBranch, label: 'Roadmaps' },
    { to: '/notes', icon: BookOpen, label: 'Smart Notes' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/revision', icon: CalendarCheck, label: 'Goal & Task Setter' },
  ];

  // Extended Placement Suite (Company & AI Strategy Suite)
  const advancedTools = [
    { to: '/recommendations', icon: Sparkles, label: 'AI Recommendations', highlight: true },
    { to: '/company-archives', icon: Building, label: 'Company Archives' },
    { to: '/mock-interview', icon: BrainCircuit, label: 'Mock Interview' },
    { to: '/resume', icon: FileText, label: 'ATS Resume Scanner' },
    { to: '/flashcards', icon: Layers, label: 'Core CS Flashcards' },
    { to: '/ai-mentor', icon: Bot, label: 'AI Study Mentor' },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800/80">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              NextOffer <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded font-mono font-normal">v1.0</span>
            </h1>
            <p className="text-[10px] text-slate-400">Placement Prep Platform</p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-140px)]">
          {/* Main Modules */}
          <div className="space-y-1">
            <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Primary Modules
            </p>
            {mainModules.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
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
          </div>

          {/* Advanced Placement Tools */}
          <div className="space-y-1 pt-2 border-t border-slate-800/80">
            <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
              Placement Suite
            </p>
            {advancedTools.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 font-semibold'
                        : item.highlight
                        ? 'text-indigo-400 bg-indigo-950/30 hover:bg-indigo-900/40 hover:text-indigo-300 border border-indigo-900/40'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`
                  }
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${item.highlight ? 'text-indigo-400' : ''}`} />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.highlight && (
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Clean Placement Target Card Footer */}
      <div className="p-4 border-t border-slate-800/80">
        <Link
          to="/profile"
          className="block p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/40 border border-slate-800 hover:border-slate-700 space-y-1.5 shadow-sm group transition-all"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 group-hover:text-indigo-400 transition-colors">
              <Target className="w-3 h-3 text-indigo-400" /> Target Profile
            </span>
            <span className="text-[10px] font-semibold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-800/40">
              {user?.gradYear || '2026'} Grad
            </span>
          </div>
          <p className="text-xs font-bold text-slate-100 truncate group-hover:text-indigo-300 transition-colors">
            {user?.dreamCompany || 'Top Tech Companies'}
          </p>
          <p className="text-[10px] text-slate-400 truncate">
            {user?.targetRole || 'Software Engineer'}
          </p>
        </Link>
      </div>
    </aside>
  );
};
