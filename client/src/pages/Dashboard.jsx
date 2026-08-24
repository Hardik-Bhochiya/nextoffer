import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  Target,
  Code2,
  GitBranch,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Building,
  Plus
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

  const readiness = metrics?.readinessScore ?? user?.readinessScore ?? 0;
  
  const dsaStats = metrics?.dsaStats || {
    total: dsaProblems.length,
    solved: dsaProblems.filter(p => p.status === 'Solved').length,
    easySolved: dsaProblems.filter(p => p.status === 'Solved' && p.difficulty === 'Easy').length,
    mediumSolved: dsaProblems.filter(p => p.status === 'Solved' && p.difficulty === 'Medium').length,
    hardSolved: dsaProblems.filter(p => p.status === 'Solved' && p.difficulty === 'Hard').length
  };

  const totalRoadmapTopics = roadmaps.reduce((acc, r) => acc + (r.topics?.length || 0), 0);
  const completedRoadmapTopics = roadmaps.reduce((acc, r) => acc + (r.topics?.filter(t => t.completed).length || 0), 0);
  const roadmapPct = totalRoadmapTopics > 0 ? Math.round((completedRoadmapTopics / totalRoadmapTopics) * 100) : 0;

  const pendingRevisions = revisions.filter(r => !r.completed).slice(0, 3);
  
  // Weekly activity telemetry chart data (clean baseline)
  const chartData = [
    { day: 'Mon', solved: dsaStats.solved > 0 ? Math.min(dsaStats.solved, 2) : 0 },
    { day: 'Tue', solved: dsaStats.solved > 2 ? 1 : 0 },
    { day: 'Wed', solved: dsaStats.solved > 4 ? 2 : 0 },
    { day: 'Thu', solved: dsaStats.solved > 6 ? 1 : 0 },
    { day: 'Fri', solved: dsaStats.solved > 8 ? 2 : 0 },
    { day: 'Sat', solved: dsaStats.solved > 10 ? 3 : 0 },
    { day: 'Sun', solved: dsaStats.solved > 12 ? 2 : 0 }
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto pb-12">
      {/* Clean Welcome Banner */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs text-indigo-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <span>Placement Preparation Command Center</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
              Welcome back, <span className="text-indigo-400">{user?.name || 'Candidate'}</span>
            </h1>
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
              Targeting <span className="font-semibold text-slate-200">{user?.targetRole || 'Full Stack Engineer'}</span> for <span className="text-indigo-300 font-semibold">{user?.dreamCompany || 'Tier-1 Tech'}</span>. Your readiness index reflects active milestones across DSA, Roadmaps, and Core CS.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/dsa"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Code2 className="w-4 h-4" /> Practice DSA
            </Link>
            <Link
              to="/roadmaps"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
            >
              <GitBranch className="w-4 h-4 text-indigo-400" /> View Roadmaps
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Key Placement Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Readiness Score */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Readiness Score</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-950/80 border border-indigo-800/50 flex items-center justify-center text-indigo-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-100">{readiness}%</span>
            <span className="text-[10px] text-slate-500 font-medium">Role Weighted</span>
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(2, readiness)}%` }}
            />
          </div>
        </div>

        {/* Metric 2: DSA Problems Solved */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">DSA Solved</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
              <Code2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-100">{dsaStats.solved}</span>
            <span className="text-[10px] text-slate-500">/ {dsaStats.total} Questions</span>
          </div>
          <p className="text-[10px] text-slate-400">
            {dsaStats.easySolved} Easy • {dsaStats.mediumSolved} Medium • {dsaStats.hardSolved} Hard
          </p>
        </div>

        {/* Metric 3: Roadmaps Milestones */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Roadmap Progress</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
              <GitBranch className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-100">{roadmapPct}%</span>
            <span className="text-[10px] text-slate-500">{completedRoadmapTopics}/{totalRoadmapTopics} Topics</span>
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-cyan-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(2, roadmapPct)}%` }}
            />
          </div>
        </div>

        {/* Metric 4: Daily Consistency Streak */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Study Streak</span>
            <div className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-800/50 flex items-center justify-center text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-100">{user?.streak || 1}</span>
            <span className="text-[10px] text-slate-500">Days Active</span>
          </div>
          <p className="text-[10px] text-amber-400 font-medium">
            Daily consistency multiplier
          </p>
        </div>
      </div>

      {/* Main Grid: Weekly Activity Chart + Pending Revisions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Study Velocity Chart (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" /> Weekly Activity Telemetry
              </h2>
              <p className="text-[11px] text-slate-400">DSA problem solving velocity over the current cycle</p>
            </div>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: '#f8fafc' }}
                />
                <Bar dataKey="solved" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Quick Action Shortcuts & Revision Due (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Revision Card */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                Spaced Revision Due
              </h2>
              <Link to="/revision" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
                View All
              </Link>
            </div>

            <div className="space-y-2">
              {pendingRevisions.length === 0 ? (
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center space-y-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
                  <p className="text-xs font-semibold text-slate-300">All Revisions Cleared</p>
                  <p className="text-[10px] text-slate-500">No overdue concepts right now.</p>
                </div>
              ) : (
                pendingRevisions.map((rev) => (
                  <div
                    key={rev.id || rev._id}
                    className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-all"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-200 truncate">{rev.topic}</p>
                      <p className="text-[10px] text-slate-400">{rev.category} • Due {rev.scheduledDate || 'Today'}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleRevision(rev.id || rev._id)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 hover:bg-emerald-900 text-[11px] font-semibold shrink-0 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Module Navigation Links */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/notes"
              className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center gap-2.5 text-xs text-slate-300 hover:text-white transition-all shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Smart Notes</span>
            </Link>

            <Link
              to="/analytics"
              className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center gap-2.5 text-xs text-slate-300 hover:text-white transition-all shadow-sm"
            >
              <Target className="w-4 h-4 text-cyan-400" />
              <span>Analytics</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
