import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import api from '../services/api';
import {
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  Code2,
  GitBranch,
  CheckCircle2,
  Flame,
  Plus,
  Info,
  Layers,
  Sparkles,
  Check,
  Cpu,
  BookOpen,
  Rocket
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

import { allRoles, getRoleConfig, getReadinessTier } from '../data/rolesData';
import { Link } from 'react-router-dom';

export const Analytics = () => {
  const { user } = useAuth();
  const { metrics, dsaProblems, roadmaps, notes, projects, refreshData } = useData();

  const [hoursInput, setHoursInput] = useState(2);
  const [dsaInput, setDsaInput] = useState(3);
  const [logging, setLogging] = useState(false);
  const [logSuccess, setLogSuccess] = useState(false);

  const currentRole = user?.targetRole || 'Full Stack Engineer (MERN / Next.js / APIs)';
  const roleConfig = getRoleConfig(currentRole);

  const readiness = metrics?.readinessScore ?? user?.readinessScore ?? 0;
  const tierInfo = getReadinessTier(readiness);
  
  const dsaStats = metrics?.dsaStats || {
    total: dsaProblems.length,
    solved: dsaProblems.filter(p => p.status === 'Solved').length,
    easySolved: dsaProblems.filter(p => p.status === 'Solved' && p.difficulty === 'Easy').length,
    mediumSolved: dsaProblems.filter(p => p.status === 'Solved' && p.difficulty === 'Medium').length,
    hardSolved: dsaProblems.filter(p => p.status === 'Solved' && p.difficulty === 'Hard').length
  };

  const totalRoadmapTopics = roadmaps.reduce((acc, r) => acc + (r.topics?.length || 0), 0);
  const completedRoadmapTopics = roadmaps.reduce((acc, r) => acc + (r.topics?.filter(t => t.completed).length || 0), 0);
  const roadmapPercentage = totalRoadmapTopics > 0 ? Math.round((completedRoadmapTopics / totalRoadmapTopics) * 100) : 0;

  const difficultyData = [
    { name: 'Easy', value: dsaStats.easySolved, color: '#10b981' },
    { name: 'Medium', value: dsaStats.mediumSolved, color: '#f59e0b' },
    { name: 'Hard', value: dsaStats.hardSolved, color: '#f43f5e' }
  ];

  const hasDifficultyData = dsaStats.easySolved > 0 || dsaStats.mediumSolved > 0 || dsaStats.hardSolved > 0;

  const topicData = Object.entries(metrics?.topicBreakdown || {
    'Arrays & Hashing': { total: 0, solved: 0 },
    'Two Pointers': { total: 0, solved: 0 },
    'Sliding Window': { total: 0, solved: 0 },
    'Linked List': { total: 0, solved: 0 },
    'Trees': { total: 0, solved: 0 },
    'Graphs': { total: 0, solved: 0 },
    'Dynamic Programming': { total: 0, solved: 0 }
  }).map(([topic, stat]) => ({
    topic,
    Solved: stat.solved || 0,
    Remaining: Math.max(0, (stat.total || 0) - (stat.solved || 0))
  }));

  const handleLogStudy = async (e) => {
    e.preventDefault();
    setLogging(true);
    try {
      await api.post('/analytics/log-study', {
        hours: Number(hoursInput),
        dsaSolved: Number(dsaInput)
      });
      setLogSuccess(true);
      setTimeout(() => setLogSuccess(false), 3000);
      refreshData();
    } catch (err) {
      console.error(err);
    } finally {
      setLogging(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto pb-16">
      
      {/* 1. ANALYTICS HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs text-indigo-400 font-semibold">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Readiness Telemetry & Benchmarks</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Placement Readiness & Performance Analytics
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Real-time predictive scoring calibrated for <span className="font-bold text-white">{roleConfig.title}</span>. Mathematical weights dynamically measure your DSA pattern mastery, completed learning tracks, and portfolio systems.
            </p>
          </div>

          {/* Quick Readiness Badge Callout */}
          <div className="px-5 py-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center gap-4 shrink-0 shadow-inner">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Index</span>
              <span className="text-2xl font-black text-indigo-400">{readiness}%</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border block text-center ${tierInfo.badgeClass}`}>
                {tierInfo.tier}
              </span>
              <span className="text-[10px] text-slate-500 font-medium block text-center mt-1">
                {tierInfo.label}
              </span>
            </div>
          </div>
        </div>

        {/* Configured Role Strip */}
        <div className="pt-5 mt-5 border-t border-slate-800/80">
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800/50 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-cyan-400" /> Active Evaluation Model
                </span>
                <span className="text-xs font-bold text-white">
                  {roleConfig.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Formula and weights are tailored for this specialization.</p>
            </div>

            <Link
              to="/profile"
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-950 border border-slate-700 hover:border-indigo-700 text-slate-300 hover:text-indigo-300 text-xs font-semibold flex items-center gap-1.5 transition self-start md:self-auto shrink-0"
              title="Change specialization from profile"
            >
              <span>Change in Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MATHEMATICAL FORMULA & ROLE BREAKDOWN */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="border-b border-slate-800/80 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${roleConfig.bgBadge}`}>
                {roleConfig.category}
              </span>
              <h2 className="text-base font-bold text-white">
                {roleConfig.title} Scoring Formula
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">{roleConfig.desc}</p>
          </div>

          <div className="shrink-0 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-center">
            <span className="text-[9px] uppercase font-bold text-slate-500 block">Target Benchmark</span>
            <span className="text-xs font-bold text-emerald-400">
              {roleConfig.targetBenchmarks.minSolvedDsa}+ DSA • {roleConfig.targetBenchmarks.minProjects} Projects
            </span>
          </div>
        </div>

        {/* Formula strip */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase">
            <span className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-400" /> Active Weighted Evaluation Model
            </span>
            <span className="text-indigo-400 font-mono">100% Scale</span>
          </div>
          <p className="text-xs font-mono text-cyan-300 font-bold bg-slate-900/90 p-3 rounded-xl border border-slate-800 overflow-x-auto">
            {roleConfig.formulaDesc}
          </p>
        </div>

        {/* Dynamic Weight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roleConfig.weightsList.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium truncate pr-1">{item.label}</span>
                <span className={`font-black ${item.color}`}>{item.weight}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className={`${item.barColor} h-full rounded-full`} style={{ width: `${item.weight * 2}%` }} />
              </div>
              <span className="text-[10px] text-slate-500 block">Calibrated for {roleConfig.shortLabel}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 3-COLUMN METRICS: READINESS BREAKDOWN, DIFFICULTY PIE, STUDY LOGGER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Metric 1: Readiness Progress Bars */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-indigo-400" />
                Component Progress
              </h2>
              <p className="text-[10px] text-indigo-400 font-semibold">{roleConfig.shortLabel}</p>
            </div>
            <span className="text-2xl font-black text-slate-100">{readiness}%</span>
          </div>

          <div className="space-y-3 text-xs pt-1">
            {/* DSA Mastery */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span className="text-[11px] flex items-center gap-1">
                  <Code2 className="w-3 h-3 text-indigo-400" /> DSA Problems
                </span>
                <span className="font-semibold text-slate-200">
                  {dsaStats.solved}/{dsaStats.total || 0} ({Math.min(100, Math.round(((dsaStats.solved || 0) / 30) * 100))}%)
                </span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(2, Math.round(((dsaStats.solved || 0) / 30) * 100)))}%` }}
                />
              </div>
            </div>

            {/* Roadmaps */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span className="text-[11px] flex items-center gap-1">
                  <GitBranch className="w-3 h-3 text-cyan-400" /> Roadmap Tracks
                </span>
                <span className="font-semibold text-slate-200">{roadmapPercentage}%</span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(2, roadmapPercentage)}%` }}
                />
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span className="text-[11px] flex items-center gap-1">
                  <Rocket className="w-3 h-3 text-emerald-400" /> Portfolio Projects
                </span>
                <span className="font-semibold text-slate-200">{projects?.length || 0} Deployed</span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(2, (projects?.length || 0) * 50))}%` }}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span className="text-[11px] flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-amber-400" /> Core CS Notes
                </span>
                <span className="font-semibold text-slate-200">{notes?.length || 0} Topics</span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(2, (notes?.length || 0) * 25))}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Metric 2: Difficulty Distribution Chart */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-cyan-400" />
              DSA Difficulty Ratio
            </h2>
            <span className="text-xs text-slate-400">{dsaStats.solved} Solved</span>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            {hasDifficultyData ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={difficultyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={62}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: '#fff' }} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: '11px', bottom: -5 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-slate-500 text-xs py-6">
                <p>0 DSA problems solved yet.</p>
                <p className="text-[10px] text-slate-600 mt-1">Problems solved in DSA Tracker appear here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Metric 3: Study Log Tracker */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              Daily Study Logger
            </h2>
            <span className="text-[10px] text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-800/40 font-bold flex items-center gap-1">
              <Flame className="w-3 h-3" /> {user?.streak || 1}d Streak
            </span>
          </div>

          <form onSubmit={handleLogStudy} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Study Session (Hours)</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="24"
                value={hoursInput}
                onChange={(e) => setHoursInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">DSA Solved Today</label>
              <input
                type="number"
                min="0"
                max="50"
                value={dsaInput}
                onChange={(e) => setDsaInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={logging}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{logging ? 'Recording...' : 'Log Study Session'}</span>
            </button>

            {logSuccess && (
              <p className="text-[11px] text-emerald-400 text-center font-medium">Session recorded successfully!</p>
            )}
          </form>
        </div>
      </div>

      {/* 4. TOPIC-WISE MASTERY BAR CHART */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-100">DSA Category Distribution & Topic Coverage</h2>
            <p className="text-xs text-slate-400">Solved vs Remaining questions across standard interview data structures</p>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topicData} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
              <XAxis dataKey="topic" stroke="#64748b" fontSize={11} angle={-15} textAnchor="end" />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', top: -10 }} />
              <Bar dataKey="Solved" fill="#6366f1" stackId="a" radius={[0, 0, 0, 0]} barSize={28} />
              <Bar dataKey="Remaining" fill="#334155" stackId="a" radius={[4, 4, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
