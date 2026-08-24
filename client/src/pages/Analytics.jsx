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
  FolderGit2,
  CheckCircle2,
  Flame,
  Plus,
  Sparkles,
  Info
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
  const { user } = useAuth();
  const { metrics, dsaProblems, refreshData } = useData();

  const [hoursInput, setHoursInput] = useState(2);
  const [dsaInput, setDsaInput] = useState(3);
  const [logging, setLogging] = useState(false);
  const [logSuccess, setLogSuccess] = useState(false);

  const readiness = metrics?.readinessScore ?? user?.readinessScore ?? 0;
  
  const dsaStats = metrics?.dsaStats || {
    total: dsaProblems.length,
    solved: dsaProblems.filter(p => p.status === 'Solved').length,
    easySolved: dsaProblems.filter(p => p.status === 'Solved' && p.difficulty === 'Easy').length,
    mediumSolved: dsaProblems.filter(p => p.status === 'Solved' && p.difficulty === 'Medium').length,
    hardSolved: dsaProblems.filter(p => p.status === 'Solved' && p.difficulty === 'Hard').length
  };

  const weightsInfo = metrics?.weightsExplanation || {
    roleCategory: user?.targetRole || 'Full Stack SDE-1',
    breakdown: [
      { label: 'DSA Mastery', score: Math.min(100, (dsaStats.solved / (dsaStats.total || 1)) * 100), weight: '35%' },
      { label: 'Roadmap Progress', score: metrics?.roadmapStats?.percentage || 0, weight: '35%' },
      { label: 'Portfolio Projects', score: Math.min(100, (metrics?.totalProjects || 0) * 35), weight: '20%' },
      { label: 'Core CS Notes', score: Math.min(100, (metrics?.totalNotes || 0) * 25), weight: '10%' }
    ]
  };

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
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-400" /> Placement Readiness & Analytics
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Dynamic readiness score tailored to your target role ({user?.targetRole || 'Full Stack SDE'}).
        </p>
      </div>

      {/* Top 3 Metric Summary Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Placement Readiness Breakdown */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Target className="w-4 h-4 text-indigo-400" />
                Role-Based Score
              </h2>
              <p className="text-[10px] text-indigo-300 font-medium">{weightsInfo.roleCategory}</p>
            </div>
            <span className="text-3xl font-black text-white">{readiness}%</span>
          </div>

          {/* Formula weights */}
          <div className="space-y-2 text-xs">
            {weightsInfo.breakdown?.map((b, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span className="text-[11px]">{b.label}</span>
                  <span className="font-semibold text-indigo-300">{b.score}%</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(3, b.score)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty Distribution Chart */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
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
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: '11px', bottom: -5 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-slate-500 text-xs py-6">
                <p>No solved DSA problems yet.</p>
                <p className="text-[10px] text-slate-600 mt-1">Add problems in the DSA Tracker to see difficulty distribution.</p>
              </div>
            )}
          </div>
        </div>

        {/* Study Log Tracker */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              Log Study Velocity
            </h2>
            <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40 font-bold">
              {user?.streak || 1} Day Streak
            </span>
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
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">DSA Questions Solved Today</label>
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
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{logging ? 'Recording...' : 'Record Daily Session'}</span>
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
            <h2 className="text-base font-bold text-white">DSA Category Distribution</h2>
            <p className="text-xs text-slate-400">Solved vs Remaining questions across data structure topics</p>
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
export default Analytics;
