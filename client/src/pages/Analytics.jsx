import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  BarChart3,
  Target,
  Code2,
  GitBranch,
  CheckCircle2,
  BookOpen,
  Rocket,
  ChevronRight,
  AlertCircle,
  Sparkles,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Activity,
  ShieldCheck,
  Award,
  Check
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

import {
  allRoles,
  getRoleConfig,
  getReadinessTier,
  calculateCandidateReadiness
} from '../data/rolesData';
import { LeetCodeProgressRing } from '../components/dsa/LeetCodeProgressRing';
import { Link } from 'react-router-dom';

export const Analytics = () => {
  const { user } = useAuth();
  const { metrics, dsaProblems, roadmaps, notes, projects } = useData();

  // Selected role for dynamic evaluation / simulator
  const activeUserRole = user?.targetRole || 'Full Stack Engineer';
  const [simulatedRoleId, setSimulatedRoleId] = useState('');

  const targetRoleTitle = simulatedRoleId
    ? allRoles.find(r => r.id === simulatedRoleId)?.title || activeUserRole
    : activeUserRole;

  const roleConfig = getRoleConfig(targetRoleTitle);

  // Calculate live readiness using client formula evaluator
  const calculatedReadiness = useMemo(() => {
    return calculateCandidateReadiness(targetRoleTitle, {
      dsaProblems,
      roadmaps,
      projects,
      notes
    });
  }, [targetRoleTitle, dsaProblems, roadmaps, projects, notes]);

  // Overall readiness score
  const isSimulating = simulatedRoleId && simulatedRoleId !== getRoleConfig(activeUserRole).id;
  const readiness = isSimulating
    ? calculatedReadiness.score
    : (metrics?.readinessScore ?? calculatedReadiness.score);

  const tierInfo = getReadinessTier(readiness);

  // Solved DSA Stats
  const solvedProblems = useMemo(() => (dsaProblems || []).filter(p => p.status === 'Solved' || p.status === 'Completed'), [dsaProblems]);
  const easySolved = solvedProblems.filter(p => p.difficulty === 'Easy').length;
  const mediumSolved = solvedProblems.filter(p => p.difficulty === 'Medium').length;
  const hardSolved = solvedProblems.filter(p => p.difficulty === 'Hard').length;

  const easyTotal = (dsaProblems || []).filter(p => p.difficulty === 'Easy').length;
  const mediumTotal = (dsaProblems || []).filter(p => p.difficulty === 'Medium').length;
  const hardTotal = (dsaProblems || []).filter(p => p.difficulty === 'Hard').length;

  const dsaStats = {
    total: dsaProblems.length,
    solved: solvedProblems.length,
    easySolved,
    mediumSolved,
    hardSolved,
    easyTotal,
    mediumTotal,
    hardTotal
  };

  // Standard Topics List for Countable Problem Tracking (1 tick = 1 count)
  const standardTopics = [
    'Arrays & Hashing',
    'Two Pointers',
    'Sliding Window',
    'Stack & Queue',
    'Linked List',
    'Binary Search',
    'Trees & BST',
    'Dynamic Programming',
    'Graphs & BFS/DFS',
    'Heap & Priority',
    'Backtracking',
    'Strings'
  ];

  // Topic-by-topic countable problem stats
  const topicBreakdown = useMemo(() => {
    return standardTopics.map(topicName => {
      const firstWord = topicName.toLowerCase().split(' ')[0];
      const matching = (dsaProblems || []).filter(p => {
        const pTopics = Array.isArray(p.topics) && p.topics.length > 0 ? p.topics : [p.topic].filter(Boolean);
        return pTopics.some(t => {
          const lowerT = t.toLowerCase();
          return lowerT === topicName.toLowerCase() || lowerT.includes(firstWord);
        });
      });

      const solvedList = matching.filter(p => p.status === 'Solved' || p.status === 'Completed');
      const solved = solvedList.length;
      const total = matching.length;
      const easy = solvedList.filter(p => p.difficulty === 'Easy').length;
      const med = solvedList.filter(p => p.difficulty === 'Medium').length;
      const hard = solvedList.filter(p => p.difficulty === 'Hard').length;

      return {
        topic: topicName.replace(' & ', '/').replace('BFS/DFS', ''),
        fullName: topicName,
        Solved: solved,
        Remaining: Math.max(0, total - solved),
        total,
        easy,
        med,
        hard,
        pct: total > 0 ? Math.round((solved / total) * 100) : 0
      };
    });
  }, [dsaProblems]);

  // Core CS 4 Subjects Tactics Data
  const coreCsSubjects = [
    {
      id: 'cs-os',
      name: 'Operating Systems',
      desc: 'Processes, Threads, Memory Management',
      roadmap: roadmaps.find(r => r.id === 'cs-os')
    },
    {
      id: 'cs-dbms',
      name: 'DBMS & SQL',
      desc: 'Indexing, ACID, Normalization',
      roadmap: roadmaps.find(r => r.id === 'cs-dbms')
    },
    {
      id: 'cs-networks',
      name: 'Computer Networks',
      desc: 'TCP/IP, HTTP/2/3, DNS, Sockets',
      roadmap: roadmaps.find(r => r.id === 'cs-networks')
    },
    {
      id: 'cs-oop-lld',
      name: 'OOP & Clean LLD',
      desc: 'Design Patterns, SOLID Principles',
      roadmap: roadmaps.find(r => r.id === 'cs-oop-lld')
    }
  ];

  // Role readiness comparison matrix
  const roleReadinessMatrix = useMemo(() => {
    return allRoles.map(role => {
      const res = calculateCandidateReadiness(role.id, {
        dsaProblems,
        roadmaps,
        projects,
        notes
      });
      const tierObj = res.tier || getReadinessTier(res.score);
      const tierLabel = typeof tierObj === 'object' ? (tierObj.tier || tierObj.label || 'Foundation') : String(tierObj);
      return {
        role,
        score: res.score,
        tier: tierLabel
      };
    });
  }, [dsaProblems, roadmaps, projects, notes]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 font-sans">
      
      {/* 1. EXECUTIVE READINESS COMMAND HEADER */}
      <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#388bfd]/15 text-[#58a6ff] border border-[#388bfd]/30 flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5" /> Placement Analytics & Numbers
              </span>
              <span className="text-xs text-[#8b949e]">
                Targeting <strong className="text-[#f0f6fc]">{roleConfig.shortLabel}</strong>
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[#f0f6fc] tracking-tight">
              Topic-wise Problem Mastery & Placement Readiness
            </h1>
          </div>

          {/* Role Simulator & Reset */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-[#8b949e]">Target Role:</span>
            <select
              value={simulatedRoleId || getRoleConfig(activeUserRole).id}
              onChange={(e) => setSimulatedRoleId(e.target.value)}
              className="bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-3 py-1.5 font-semibold focus:outline-none focus:border-[#58a6ff] cursor-pointer"
            >
              {allRoles.map(r => (
                <option key={r.id} value={r.id}>
                  {r.shortLabel}
                </option>
              ))}
            </select>

            {isSimulating && (
              <button
                type="button"
                onClick={() => setSimulatedRoleId('')}
                className="text-xs text-[#58a6ff] hover:underline font-medium px-2 py-1 bg-[#0d1117] rounded border border-[#30363d]"
              >
                Reset
              </button>
            )}

            <Link
              to="/profile"
              className="text-xs text-[#8b949e] hover:text-[#58a6ff] px-2.5 py-1 bg-[#0d1117] rounded border border-[#30363d] flex items-center gap-1 transition"
            >
              <span>Profile</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* 4 Dimension Progress Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-[#30363d]">
          {/* DSA */}
          <div className="p-3 rounded-md bg-[#0d1117] border border-[#30363d] space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#8b949e] font-medium flex items-center gap-1">
                <Code2 className="w-3 h-3 text-[#58a6ff]" /> DSA ({calculatedReadiness.dimensions.dsa.weight}%)
              </span>
              <span className="font-mono font-bold text-[#58a6ff]">{dsaStats.solved} / {dsaStats.total}</span>
            </div>
            <div className="w-full bg-[#21262d] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#58a6ff] h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(2, calculatedReadiness.dimensions.dsa.score)}%` }} />
            </div>
          </div>

          {/* Roadmaps */}
          <div className="p-3 rounded-md bg-[#0d1117] border border-[#30363d] space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#8b949e] font-medium flex items-center gap-1">
                <GitBranch className="w-3 h-3 text-[#3fb950]" /> Roadmaps ({calculatedReadiness.dimensions.roadmaps.weight}%)
              </span>
              <span className="font-mono font-bold text-[#3fb950]">{calculatedReadiness.dimensions.roadmaps.score}%</span>
            </div>
            <div className="w-full bg-[#21262d] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#3fb950] h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(2, calculatedReadiness.dimensions.roadmaps.score)}%` }} />
            </div>
          </div>

          {/* Projects */}
          <div className="p-3 rounded-md bg-[#0d1117] border border-[#30363d] space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#8b949e] font-medium flex items-center gap-1">
                <Rocket className="w-3 h-3 text-[#bc8cff]" /> Projects ({calculatedReadiness.dimensions.projects.weight}%)
              </span>
              <span className="font-mono font-bold text-[#bc8cff]">{projects.length} / 2</span>
            </div>
            <div className="w-full bg-[#21262d] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#bc8cff] h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(2, calculatedReadiness.dimensions.projects.score)}%` }} />
            </div>
          </div>

          {/* Core CS */}
          <div className="p-3 rounded-md bg-[#0d1117] border border-[#30363d] space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#8b949e] font-medium flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-[#d29922]" /> Core CS ({calculatedReadiness.dimensions.coreCs.weight}%)
              </span>
              <span className="font-mono font-bold text-[#d29922]">{calculatedReadiness.dimensions.coreCs.score}%</span>
            </div>
            <div className="w-full bg-[#21262d] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#d29922] h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(2, calculatedReadiness.dimensions.coreCs.score)}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY TOPIC-BY-TOPIC GRAPH + LEETCODE RING */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* LEFT: REAL TOPIC-WISE SOLVED PROBLEM GRAPH (7 cols) */}
        <div className="lg:col-span-7 rounded-lg bg-[#161b22] border border-[#30363d] p-5 space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-2.5">
            <div>
              <h2 className="text-sm font-semibold text-[#f0f6fc] flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#58a6ff]" /> Problem Counts per Topic
              </h2>
              <p className="text-[11px] text-[#8b949e]">Every solved problem counts as 1 for that topic</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#3fb950]">
              {dsaStats.solved} / {dsaStats.total} Solved
            </span>
          </div>

          <div className="h-64 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicBreakdown} margin={{ top: 10, right: 10, left: -25, bottom: 25 }}>
                <XAxis dataKey="topic" stroke="#8b949e" fontSize={9} angle={-25} textAnchor="end" interval={0} />
                <YAxis stroke="#8b949e" fontSize={10} tickLine={false} axisLine={{ stroke: '#30363d' }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#161b22',
                    border: '1px solid #30363d',
                    borderRadius: '6px',
                    fontSize: '11px',
                    color: '#f0f6fc'
                  }}
                  formatter={(value, name) => [`${value} Question${value !== 1 ? 's' : ''}`, name]}
                  labelFormatter={(label) => `Topic: ${label}`}
                />
                <Bar dataKey="Solved" fill="#238636" stackId="a" radius={[0, 0, 0, 0]} name="Solved" barSize={16} />
                <Bar dataKey="Remaining" fill="#21262d" stroke="#30363d" stackId="a" radius={[3, 3, 0, 0]} name="Remaining" barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT: LEETCODE DIFFICULTY RATIOS (5 cols) */}
        <div className="lg:col-span-5 rounded-lg bg-[#161b22] border border-[#30363d] p-5 space-y-3 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-2.5">
            <div>
              <h2 className="text-sm font-semibold text-[#f0f6fc] flex items-center gap-2">
                <Target className="w-4 h-4 text-[#3fb950]" /> Difficulty Distribution
              </h2>
              <p className="text-[11px] text-[#8b949e]">Solved ratios by official LeetCode difficulty</p>
            </div>
            <Link to="/dsa" className="text-xs text-[#58a6ff] hover:underline flex items-center gap-0.5">
              <span>Practice DSA</span> <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Ring Widget */}
          <div className="p-3 rounded-lg bg-[#0d1117] border border-[#30363d]">
            <LeetCodeProgressRing
              easySolved={dsaStats.easySolved}
              easyTotal={dsaStats.easyTotal}
              mediumSolved={dsaStats.mediumSolved}
              mediumTotal={dsaStats.mediumTotal}
              hardSolved={dsaStats.hardSolved}
              hardTotal={dsaStats.hardTotal}
              totalSolved={dsaStats.solved}
              totalQuestions={dsaStats.total}
              size={110}
              strokeWidth={8}
            />
          </div>

          {/* Exact Numbers */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded bg-[#0d1117] border border-[#30363d]">
              <span className="text-[10px] text-[#3fb950] font-semibold block">Easy</span>
              <span className="font-mono font-bold text-[#f0f6fc] text-sm">{dsaStats.easySolved} / {dsaStats.easyTotal}</span>
            </div>
            <div className="p-2 rounded bg-[#0d1117] border border-[#30363d]">
              <span className="text-[10px] text-[#d29922] font-semibold block">Medium</span>
              <span className="font-mono font-bold text-[#f0f6fc] text-sm">{dsaStats.mediumSolved} / {dsaStats.mediumTotal}</span>
            </div>
            <div className="p-2 rounded bg-[#0d1117] border border-[#30363d]">
              <span className="text-[10px] text-[#f85149] font-semibold block">Hard</span>
              <span className="font-mono font-bold text-[#f0f6fc] text-sm">{dsaStats.hardSolved} / {dsaStats.hardTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TOPIC BREAKDOWN NUMBER CARDS GRID */}
      <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-5 space-y-3 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#30363d] pb-2.5">
          <div>
            <h2 className="text-sm font-semibold text-[#f0f6fc] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#58a6ff]" /> Topic Mastery Cards & Exact Problem Counts
            </h2>
            <p className="text-[11px] text-[#8b949e]">Solved vs. Total questions for every key pattern</p>
          </div>
          <span className="text-[11px] text-[#8b949e]">
            {standardTopics.length} Core Patterns
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {topicBreakdown.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-md bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff]/50 transition-colors space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#f0f6fc] truncate">{item.fullName}</span>
                <span className="font-mono text-xs font-bold text-[#58a6ff]">{item.Solved}/{item.total}</span>
              </div>

              <div className="w-full bg-[#21262d] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#238636] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(item.total > 0 ? 4 : 0, item.pct)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#8b949e]">
                <span>{item.pct}% Completed</span>
                <span className="flex items-center gap-1 font-mono">
                  <span className="text-[#3fb950]">{item.easy}E</span>
                  <span className="text-[#d29922]">{item.med}M</span>
                  <span className="text-[#f85149]">{item.hard}H</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CORE CS & HIGH-IMPACT ACTION BOOSTERS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Core CS 4 Subjects (6 cols) */}
        <div className="lg:col-span-6 rounded-lg bg-[#161b22] border border-[#30363d] p-5 space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-2.5">
            <div>
              <h2 className="text-sm font-semibold text-[#f0f6fc] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#d29922]" /> Core Computer Science Subjects
              </h2>
              <p className="text-[11px] text-[#8b949e]">The 4 foundational pillars required for technical interviews</p>
            </div>
            <Link to="/roadmaps" className="text-xs text-[#58a6ff] hover:underline flex items-center gap-0.5">
              <span>Roadmaps</span> <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {coreCsSubjects.map((subject) => {
              const total = subject.roadmap?.topics?.length || 5;
              const completed = subject.roadmap?.topics?.filter(t => t.completed).length || 0;
              const pct = Math.round((completed / total) * 100);

              return (
                <div key={subject.id} className="p-3 rounded-md bg-[#0d1117] border border-[#30363d] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#f0f6fc] truncate">{subject.name}</span>
                    <span className="font-mono text-[11px] text-[#d29922] font-bold">{completed}/{total}</span>
                  </div>
                  <div className="w-full bg-[#21262d] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#d29922] h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(2, pct)}%` }} />
                  </div>
                  <p className="text-[10px] text-[#8b949e] truncate">{subject.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* High-Impact Boosters (6 cols) */}
        <div className="lg:col-span-6 rounded-lg bg-[#161b22] border border-[#30363d] p-5 space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-2">
            <h2 className="text-sm font-semibold text-[#f0f6fc] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#d29922]" /> High-Impact Score Boosters
            </h2>
            <span className="text-[10px] text-[#8b949e]">Target: &ge; 85%</span>
          </div>

          <div className="space-y-2">
            {(metrics?.nextActionItems || [
              { action: `Solve ${roleConfig.targetBenchmarks.minSolvedDsa}+ DSA patterns in dynamic programming and graphs`, boost: '+20%', done: dsaStats.solved >= roleConfig.targetBenchmarks.minSolvedDsa },
              { action: `Complete compulsory ${roleConfig.compulsoryRoadmapTitles[0] || 'domain'} roadmap track`, boost: '+15%', done: calculatedReadiness.dimensions.roadmaps.score >= 50 },
              { action: `Deploy ${roleConfig.targetBenchmarks.minProjects} full architecture capstone applications`, boost: '+15%', done: projects.length >= roleConfig.targetBenchmarks.minProjects }
            ]).map((item, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-md border flex items-start justify-between gap-2 text-xs ${
                  item.done
                    ? 'bg-[#238636]/10 border-[#238636]/30 text-[#8b949e]'
                    : 'bg-[#0d1117] border-[#30363d] text-[#c9d1d9]'
                }`}
              >
                <div className="flex items-start gap-2 min-w-0">
                  {item.done ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-[#58a6ff] shrink-0 mt-0.5" />
                  )}
                  <p className={`text-[11px] leading-tight ${item.done ? 'line-through text-[#8b949e]' : 'text-[#f0f6fc]'}`}>
                    {item.action}
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#58a6ff] shrink-0 bg-[#388bfd]/15 px-1.5 py-0.5 rounded">
                  {item.boost}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. CROSS-ROLE PREPARATION MATRIX (8 ROLES) */}
      <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-5 space-y-3 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#30363d] pb-2">
          <h2 className="text-sm font-semibold text-[#f0f6fc] flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#58a6ff]" /> Cross-Role Matrix (8 Software Engineering Tracks)
          </h2>
          <span className="text-[10px] text-[#8b949e]">Click any role card to simulate</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {roleReadinessMatrix.map((item) => {
            const isCurrent = item.role.id === (simulatedRoleId || getRoleConfig(activeUserRole).id);
            return (
              <button
                key={item.role.id}
                type="button"
                onClick={() => setSimulatedRoleId(item.role.id)}
                className={`p-3 rounded-md border text-left flex flex-col justify-between gap-1.5 transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#0d1117] border-[#58a6ff] ring-1 ring-[#58a6ff]/50 shadow-md'
                    : 'bg-[#0d1117] border-[#30363d] hover:border-[#8b949e]/60'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-semibold text-[#f0f6fc] truncate">{item.role.shortLabel}</span>
                  <span className="text-xs font-mono font-bold text-[#58a6ff]">{item.score}%</span>
                </div>

                <div className="w-full bg-[#21262d] h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.score >= 85 ? 'bg-[#238636]' : item.score >= 65 ? 'bg-[#1f6feb]' : 'bg-[#d29922]'
                    }`}
                    style={{ width: `${Math.max(3, item.score)}%` }}
                  />
                </div>
                <span className="text-[10px] text-[#8b949e] truncate">{item.tier}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Analytics;

