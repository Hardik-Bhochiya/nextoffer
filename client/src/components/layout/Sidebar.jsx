import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Code2,
  GitBranch,
  FolderGit2,
  BookOpen,
  CalendarCheck,
  Bot,
  BarChart3,
  User,
  Rocket,
  LogOut,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/dsa', icon: Code2, label: 'DSA Tracker' },
    { to: '/roadmaps', icon: GitBranch, label: 'Roadmaps' },
    { to: '/projects', icon: FolderGit2, label: 'Projects' },
    { to: '/notes', icon: BookOpen, label: 'Smart Notes' },
    { to: '/revision', icon: CalendarCheck, label: 'Revision Planner' },
    { to: '/ai-mentor', icon: Bot, label: 'AI Study Mentor', highlight: true },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/profile', icon: User, label: 'Profile & Goals' },
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
        <nav className="p-4 space-y-1.5">
          <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Core Modules
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 font-semibold'
                      : item.highlight
                      ? 'text-indigo-400 bg-indigo-950/30 hover:bg-indigo-900/40 hover:text-indigo-300 border border-indigo-900/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`
                }
              >
                <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${item.highlight ? 'text-indigo-400' : ''}`} />
                <span className="flex-1">{item.label}</span>
                {item.highlight && (
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Target Goal & Footer */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        {/* Goal Card */}
        <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Target Batch</span>
            <span className="font-semibold text-slate-200">{user?.gradYear || '2026'}</span>
          </div>
          <p className="text-xs font-semibold text-indigo-300 truncate">{user?.dreamCompany || 'Top Tech Companies'}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <a
            href="https://github.com/Hardik-Bhochiya/nextoffer"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-slate-300 transition-colors"
          >
            <ExternalLink className="w-3 h-3" /> GitHub
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-1 hover:text-rose-400 transition-colors"
          >
            <LogOut className="w-3 h-3" /> Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};
