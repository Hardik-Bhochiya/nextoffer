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

  // GitHub Primer Palette: Green, Amber, Red
  const difficultyData = [
    { name: 'Easy', value: dsaStats.easySolved, color: '#238636' },
    { name: 'Medium', value: dsaStats.mediumSolved, color: '#d29922' },
    { name: 'Hard', value: dsaStats.hardSolved, color: '#f85149' }
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
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      
      {/* 1. ANALYTICS HEADER */}
      <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0d1117] border border-[#30363d] text-xs text-[#58a6ff] font-medium">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Readiness Telemetry & Benchmarks</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[#e6edf3] tracking-tight">
              Placement Readiness & Performance Analytics
            </h1>
            <p className="text-xs text-[#8b949e] max-w-2xl leading-relaxed">
              Real-time predictive scoring calibrated for <span className="font-semibold text-[#e6edf3]">{roleConfig.title}</span>. Mathematical weights dynamically measure your DSA pattern mastery, completed roadmaps, and portfolio systems.
            </p>
          </div>

          {/* Quick Readiness Badge Callout */}
          <div className="px-4 py-3 rounded-md bg-[#0d1117] border border-[#30363d] flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#8b949e] block">Current Index</span>
              <span className="text-2xl font-bold font-mono text-[#58a6ff]">{readiness}%</span>
            </div>
            <div className="h-8 w-px bg-[#30363d]" />
            <div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border block text-center ${tierInfo.badgeClass}`}>
                {tierInfo.tier}
              </span>
              <span className="text-[10px] text-[#8b949e] font-medium block text-center mt-1">
                {tierInfo.label}
              </span>
            </div>
          </div>
        </div>

        {/* Configured Role Strip */}
        <div className="pt-4 mt-4 border-t border-[#30363d]">
          <div className="p-3 rounded-md bg-[#0d1117] border border-[#30363d] flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-[#388bfd]/10 text-[#58a6ff] border border-[#388bfd]/30 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-[#58a6ff]" /> Evaluation Model
                </span>
                <span className="text-xs font-semibold text-[#e6edf3]">
                  {roleConfig.title}
                </span>
              </div>
              <p className="text-[11px] text-[#8b949e]">Formula weights and benchmarks are configured specifically for this role.</p>
            </div>

            <Link
              to="/profile"
              className="px-3 py-1 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium flex items-center gap-1.5 transition self-start md:self-auto shrink-0"
              title="Change specialization from profile"
            >
              <span>Change in Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MATHEMATICAL FORMULA & ROLE BREAKDOWN */}
      <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-6 space-y-5 shadow-sm">
        <div className="border-b border-[#30363d] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${roleConfig.bgBadge}`}>
                {roleConfig.category}
              </span>
              <h2 className="text-sm font-bold text-[#e6edf3]">
                {roleConfig.title} Scoring Formula
              </h2>
            </div>
            <p className="text-xs text-[#8b949e] mt-1">{roleConfig.desc}</p>
          </div>

          <div className="shrink-0 bg-[#0d1117] px-3.5 py-1.5 rounded-md border border-[#30363d] text-center">
            <span className="text-[9px] uppercase font-bold text-[#8b949e] block">Target Benchmark</span>
            <span className="text-xs font-semibold text-[#3fb950] font-mono">
              {roleConfig.targetBenchmarks.minSolvedDsa}+ DSA • {roleConfig.targetBenchmarks.minProjects} Projects
            </span>
          </div>
        </div>

        {/* Formula strip */}
        <div className="p-3 rounded-md bg-[#0d1117] border border-[#30363d] space-y-1.5">
          <div className="flex items-center justify-between text-[10px] text-[#8b949e] font-semibold uppercase">
            <span className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#58a6ff]" /> Evaluation Formula
            </span>
            <span className="text-[#58a6ff] font-mono">100% Normalized</span>
          </div>
          <p className="text-xs font-mono text-[#58a6ff] font-medium bg-[#161b22] p-2.5 rounded border border-[#30363d] overflow-x-auto">
            {roleConfig.formulaDesc}
          </p>
        </div>

        {/* Dynamic Weight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {roleConfig.weightsList.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-md bg-[#0d1117] border border-[#30363d] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#c9d1d9] font-medium truncate pr-1">{item.label}</span>
                <span className="font-bold font-mono text-[#e6edf3]">{item.weight}%</span>
              </div>
              <div className="w-full bg-[#21262d] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#238636] h-full rounded-full" style={{ width: `${item.weight * 2}%` }} />
              </div>
              <span className="text-[10px] text-[#8b949e] block">Weight for {roleConfig.shortLabel}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 3-COLUMN METRICS: READINESS BREAKDOWN, DIFFICULTY PIE, STUDY LOGGER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Metric 1: Readiness Progress Bars */}
        <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-5 flex flex-col justify-between space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#e6edf3] flex items-center gap-1.5">
                <Target className="w-4 h-4 text-[#58a6ff]" />
                Component Progress
              </h2>
              <p className="text-[10px] text-[#8b949e]">{roleConfig.shortLabel}</p>
            </div>
            <span className="text-xl font-bold font-mono text-[#e6edf3]">{readiness}%</span>
          </div>

          <div className="space-y-3 text-xs pt-1">
            {/* DSA Mastery */}
            <div className="space-y-1">
              <div className="flex justify-between text-[#c9d1d9]">
                <span className="text-[11px] flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5 text-[#58a6ff]" /> DSA Problems
                </span>
                <span className="font-mono text-[#e6edf3]">
                  {dsaStats.solved}/{dsaStats.total || 0} ({Math.min(100, Math.round(((dsaStats.solved || 0) / 30) * 100))}%)
                </span>
              </div>
              <div className="w-full bg-[#0d1117] h-1.5 rounded-full overflow-hidden border border-[#30363d]">
                <div
                  className="h-full bg-[#238636] rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(2, Math.round(((dsaStats.solved || 0) / 30) * 100)))}%` }}
                />
              </div>
            </div>

            {/* Roadmaps */}
            <div className="space-y-1">
              <div className="flex justify-between text-[#c9d1d9]">
                <span className="text-[11px] flex items-center gap-1">
                  <GitBranch className="w-3.5 h-3.5 text-[#58a6ff]" /> Roadmap Tracks
                </span>
                <span className="font-mono text-[#e6edf3]">{roadmapPercentage}%</span>
              </div>
              <div className="w-full bg-[#0d1117] h-1.5 rounded-full overflow-hidden border border-[#30363d]">
                <div
                  className="h-full bg-[#1f6feb] rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(2, roadmapPercentage)}%` }}
                />
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-1">
              <div className="flex justify-between text-[#c9d1d9]">
                <span className="text-[11px] flex items-center gap-1">
                  <Rocket className="w-3.5 h-3.5 text-[#3fb950]" /> Portfolio Projects
                </span>
                <span className="font-mono text-[#e6edf3]">{projects?.length || 0} Deployed</span>
              </div>
              <div className="w-full bg-[#0d1117] h-1.5 rounded-full overflow-hidden border border-[#30363d]">
                <div
                  className="h-full bg-[#3fb950] rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(2, (projects?.length || 0) * 50))}%` }}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <div className="flex justify-between text-[#c9d1d9]">
                <span className="text-[11px] flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#d29922]" /> Core CS Notes
                </span>
                <span className="font-mono text-[#e6edf3]">{notes?.length || 0} Topics</span>
              </div>
              <div className="w-full bg-[#0d1117] h-1.5 rounded-full overflow-hidden border border-[#30363d]">
                <div
                  className="h-full bg-[#d29922] rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(2, (notes?.length || 0) * 25))}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Metric 2: Difficulty Distribution Chart */}
        <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-5 flex flex-col justify-between space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#e6edf3] flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-[#58a6ff]" />
              DSA Difficulty Ratio
            </h2>
            <span className="text-xs font-mono text-[#8b949e]">{dsaStats.solved} Solved</span>
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
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#161b22', borderColor: '#30363d', borderRadius: '6px', fontSize: '11px', color: '#e6edf3' }} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: '11px', bottom: -5 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-[#8b949e] text-xs py-6">
                <p>0 DSA problems solved yet.</p>
                <p className="text-[10px] text-[#8b949e] mt-1">Problems solved in DSA Tracker appear here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Metric 3: Study Log Tracker */}
        <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-5 flex flex-col justify-between space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#e6edf3] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#d29922]" />
              Daily Study Logger
            </h2>
            <span className="text-[10px] text-[#d29922] bg-[#bb8009]/15 px-2 py-0.5 rounded border border-[#bb8009]/40 font-semibold flex items-center gap-1">
              <Flame className="w-3 h-3" /> {user?.streak || 1}d Streak
            </span>
          </div>

          <form onSubmit={handleLogStudy} className="space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-[#c9d1d9] mb-1">Study Session (Hours)</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="24"
                value={hoursInput}
                onChange={(e) => setHoursInput(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#c9d1d9] mb-1">DSA Solved Today</label>
              <input
                type="number"
                min="0"
                max="50"
                value={dsaInput}
                onChange={(e) => setDsaInput(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
              />
            </div>

            <button
              type="submit"
              disabled={logging}
              className="w-full py-2 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-medium shadow-sm transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{logging ? 'Recording...' : 'Log Study Session'}</span>
            </button>

            {logSuccess && (
              <p className="text-[11px] text-[#3fb950] text-center font-medium">Session recorded successfully!</p>
            )}
          </form>
        </div>
      </div>

      {/* 4. TOPIC-WISE MASTERY BAR CHART */}
      <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-5 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-[#e6edf3]">DSA Category Distribution & Topic Coverage</h2>
            <p className="text-xs text-[#8b949e]">Solved vs Remaining questions across standard interview data structures</p>
          </div>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topicData} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
              <XAxis dataKey="topic" stroke="#8b949e" fontSize={11} angle={-15} textAnchor="end" />
              <YAxis stroke="#8b949e" fontSize={11} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#161b22', borderColor: '#30363d', borderRadius: '6px', fontSize: '11px', color: '#e6edf3' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', top: -10 }} />
              <Bar dataKey="Solved" fill="#238636" stackId="a" radius={[0, 0, 0, 0]} barSize={26} />
              <Bar dataKey="Remaining" fill="#21262d" stroke="#30363d" stackId="a" radius={[3, 3, 0, 0]} barSize={26} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
