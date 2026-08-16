import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import api from '../services/api';
import {
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  Code2,
  GitBranch,
  FolderGit2,
  CheckCircle2,
  Flame,
  Plus
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

export const Analytics = () => {
  const { metrics, dsaProblems, refreshData } = useData();

  const [hoursInput, setHoursInput] = useState(2);
  const [dsaInput, setDsaInput] = useState(3);
  const [logging, setLogging] = useState(false);
  const [logSuccess, setLogSuccess] = useState(false);

  const readiness = metrics?.readinessScore ?? 84;
  const dsaStats = metrics?.dsaStats || {
    total: dsaProblems.length || 24,
    solved: 18,
    easySolved: 7,
    mediumSolved: 9,
    hardSolved: 2
  };

  const difficultyData = [
    { name: 'Easy', value: dsaStats.easySolved || 7, color: '#10b981' },
    { name: 'Medium', value: dsaStats.mediumSolved || 9, color: '#f59e0b' },
    { name: 'Hard', value: dsaStats.hardSolved || 2, color: '#f43f5e' }
  ];

  const topicData = Object.entries(metrics?.topicBreakdown || {
    'Arrays & Hashing': { total: 5, solved: 4 },
    'Two Pointers': { total: 2, solved: 1 },
    'Sliding Window': { total: 2, solved: 1 },
    'Linked List': { total: 4, solved: 3 },
    'Trees': { total: 4, solved: 4 },
    'Graphs': { total: 3, solved: 1 },
    'Dynamic Programming': { total: 4, solved: 3 }
  }).map(([topic, stat]) => ({
    topic,
    Solved: stat.solved,
    Remaining: stat.total - stat.solved
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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-400" /> Placement Readiness & Analytics
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Real-time telemetry on coding consistency, topic mastery distributions, and interview readiness.
        </p>
      </div>

      {/* Top 3 Metric Summary Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Placement Readiness Breakdown */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Readiness Score Formula</h2>
            <Target className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white">{readiness}%</span>
            <span className="text-xs font-semibold text-emerald-400">Target: 80%+</span>
          </div>

          {/* Formula weights */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>DSA Solved (50%)</span>
              <span className="font-semibold text-slate-200">
                {Math.round((dsaStats.solved / (dsaStats.total || 1)) * 50)} / 50 pts
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Roadmaps (30%)</span>
              <span className="font-semibold text-slate-200">
                {Math.round(((metrics?.roadmapStats?.completed || 17) / (metrics?.roadmapStats?.total || 26)) * 30)} / 30 pts
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Projects (20%)</span>
              <span className="font-semibold text-slate-200">14 / 20 pts</span>
            </div>
          </div>
        </div>

        {/* Difficulty Distribution Chart */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Difficulty Breakdown</h2>
            <Code2 className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="h-44 w-full">
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
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '11px', bottom: -5 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Study Log Tracker */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Log Today's Preparation</h2>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>

          <form onSubmit={handleLogStudy} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Study Time (Hours)</label>
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
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">DSA Questions Solved</label>
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
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{logging ? 'Logging...' : 'Record Study Session'}</span>
            </button>

            {logSuccess && (
              <p className="text-[11px] text-emerald-400 text-center font-medium">Session recorded successfully!</p>
            )}
          </form>
        </div>
      </div>

      {/* Topic-Wise Mastery Bar Chart */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Topic-Wise DSA Mastery Distribution</h2>
            <p className="text-xs text-slate-400">Solved vs Pending problems across each data structure category</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topicData} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
              <XAxis dataKey="topic" stroke="#64748b" fontSize={11} angle={-15} textAnchor="end" />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', top: -10 }} />
              <Bar dataKey="Solved" fill="#6366f1" stackId="a" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Remaining" fill="#334155" stackId="a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
