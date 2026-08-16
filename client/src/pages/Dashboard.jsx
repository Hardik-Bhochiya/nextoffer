import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  Target,
  Code2,
  GitBranch,
  FolderGit2,
  Calendar,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Flame,
  ChevronRight,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export const Dashboard = () => {
  const { user } = useAuth();
  const { metrics, dsaProblems, roadmaps, revisions, toggleRevision } = useData();

  const readiness = metrics?.readinessScore ?? 84;
  const dsaStats = metrics?.dsaStats || {
    total: dsaProblems.length || 24,
    solved: dsaProblems.filter(p => p.status === 'Solved').length || 18,
    easySolved: 7,
    mediumSolved: 9,
    hardSolved: 2
  };
  const roadmapStats = metrics?.roadmapStats || { percentage: 65, completed: 17, total: 26 };
  const pendingRevisions = revisions.filter(r => !r.completed).slice(0, 3);
  const chartData = metrics?.studyActivities || [
    { date: 'Mon', hours: 4.5, dsaSolved: 3 },
    { date: 'Tue', hours: 6.0, dsaSolved: 5 },
    { date: 'Wed', hours: 3.5, dsaSolved: 2 },
    { date: 'Thu', hours: 5.5, dsaSolved: 4 },
    { date: 'Fri', hours: 7.0, dsaSolved: 6 },
    { date: 'Sat', hours: 8.0, dsaSolved: 7 },
    { date: 'Sun', hours: 4.0, dsaSolved: 3 }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-900/40 p-6 md:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-700/40 text-xs text-indigo-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI Placement Preparation Engine Active</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-gradient">{user?.name || 'Hardik'}</span>! 👋
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              You are targeting <span className="font-semibold text-slate-100">{user?.targetRole || 'Full Stack SDE'}</span> roles at <span className="text-indigo-400 font-medium">{user?.dreamCompany || 'Tier-1 Tech Companies'}</span>. Your placement readiness index is up by <span className="text-emerald-400 font-semibold">+8% this week</span>.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/dsa"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              <Code2 className="w-4 h-4" /> Practice DSA
            </Link>
            <Link
              to="/ai-mentor"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all hover:border-slate-600"
            >
              <BrainCircuit className="w-4 h-4 text-indigo-400" /> Ask AI Mentor
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Placement Readiness Gauge */}
        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Readiness Score</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-800/50 flex items-center justify-center">
              <Target className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{readiness}%</span>
            <span className="text-xs font-medium text-emerald-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> High
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-700"
              style={{ width: `${readiness}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Calculated from DSA, Roadmaps & Projects</p>
        </div>

        {/* DSA Solved */}
        <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">DSA Solved</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{dsaStats.solved}</span>
            <span className="text-xs text-slate-400">/ {dsaStats.total} Core Questions</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
              {dsaStats.easySolved} Easy
            </span>
            <span className="px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/40">
              {dsaStats.mediumSolved} Med
            </span>
            <span className="px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-400 border border-rose-800/40">
              {dsaStats.hardSolved} Hard
            </span>
          </div>
        </div>

        {/* Roadmap Progress */}
        <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Roadmap Progress</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center">
              <GitBranch className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{roadmapStats.percentage}%</span>
            <span className="text-xs text-slate-400">Mastered</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${roadmapStats.percentage}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">{roadmapStats.completed} / {roadmapStats.total} modules checked</p>
        </div>

        {/* Streak & Consistency */}
        <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Daily Consistency</span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-800/50 flex items-center justify-center">
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{metrics?.user?.streak || user?.streak || 12}</span>
            <span className="text-xs text-amber-400 font-semibold">Days Active 🔥</span>
          </div>
          <p className="text-[11px] text-slate-400">Top 5% consistency among 2026 batch candidates</p>
        </div>
      </div>

      {/* Charts & Revision Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Preparation Hours Chart */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">Weekly Study Activity & Velocity</h2>
              <p className="text-xs text-slate-400">Hours spent coding and problems solved over the last 7 days</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-indigo-400 border border-slate-700">
              Avg 5.5 hrs/day
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Bar dataKey="hours" name="Study Hours" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="dsaSolved" name="DSA Solved" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spaced Repetition & Daily Revision Card */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <h2 className="text-base font-bold text-white">Today's Revisions</h2>
            </div>
            <Link to="/revision" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center">
              View all <ChevronRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {pendingRevisions.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                <p className="text-xs text-slate-300 font-medium">All revisions up to date!</p>
              </div>
            ) : (
              pendingRevisions.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex items-start justify-between gap-2"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        rev.priority === 'High' ? 'bg-rose-950 text-rose-400 border border-rose-800/50' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {rev.priority} Priority
                      </span>
                      <span className="text-[10px] text-slate-400">{rev.category}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200 truncate">{rev.topic}</p>
                  </div>
                  <button
                    onClick={() => toggleRevision(rev.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-950 hover:text-emerald-400 text-slate-400 transition-colors"
                    title="Mark as Revised"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* AI Smart Advisory Card */}
          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" /> AI Recommendation
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your recent attempts, reviewing <span className="text-white font-medium">Dynamic Programming</span> and <span className="text-white font-medium">LRU Cache</span> will give you the highest placement score boost.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
