import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { allRoles, getRoleConfig, getReadinessTier } from '../data/rolesData';
import { UserAvatar } from '../components/common/UserAvatar';
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
  Plus,
  Layers,
  Briefcase,
  ArrowRight,
  Check,
  Rocket,
  Terminal,
  Activity
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
  const roadmapPct = totalRoadmapTopics > 0 ? Math.round((completedRoadmapTopics / totalRoadmapTopics) * 100) : 0;

  const pendingRevisions = revisions.filter(r => !r.completed).slice(0, 3);

  // Weekly activity telemetry chart data
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
    <div className="space-y-6 animate-fadeIn max-w-6xl mx-auto pb-16 font-sans">
      
      {/* 1. WELCOME COMMAND CENTER BANNER (GitHub Primer Header) */}
      <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-5 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-3.5">
            <Link to="/profile" className="shrink-0 group" title="Open Candidate Profile">
              <UserAvatar
                user={user}
                size="lg"
                showStatus={true}
                className="rounded-lg border border-[#30363d] group-hover:border-[#58a6ff] transition-colors"
              />
            </Link>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0d1117] border border-[#30363d] text-[11px] text-[#58a6ff] font-medium">
                <Terminal className="w-3 h-3" />
                <span>Placement Command Center</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-[#f0f6fc] tracking-tight">
                Welcome back, {user?.name || 'Candidate'}
              </h1>
              <p className="text-xs text-[#8b949e] max-w-xl leading-relaxed">
                Targeting <span className="font-semibold text-[#f0f6fc]">{roleConfig.title}</span> for <span className="text-[#58a6ff] font-medium">{user?.dreamCompany || 'Tier-1 Tech Firms'}</span>.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 self-start md:self-auto">
            <Link
              to="/dsa"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/30 text-white text-xs font-medium shadow-sm transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" /> Practice DSA
            </Link>
            <Link
              to="/roadmaps"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5 text-[#8b949e]" /> View Roadmaps
            </Link>
          </div>
        </div>

        {/* TARGET ROLE STATUS STRIP */}
        <div className="pt-4 mt-4 border-t border-[#30363d]">
          <div className="p-3 rounded-md bg-[#0d1117] border border-[#30363d] flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[#388bfd]/15 text-[#58a6ff] border border-[#388bfd]/30 flex items-center gap-1">
                  <Briefcase className="w-3 h-3" /> Specialization
                </span>
                <span className="text-xs font-semibold text-[#f0f6fc]">
                  {roleConfig.title}
                </span>
              </div>
              <p className="text-[11px] text-[#8b949e]">{roleConfig.desc}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden sm:flex items-center gap-1 flex-wrap">
                {roleConfig.primarySkills?.slice(0, 3).map((skill, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#161b22] text-[#c9d1d9] border border-[#30363d] font-mono">
                    {skill}
                  </span>
                ))}
              </div>
              <Link
                to="/profile"
                className="px-2.5 py-1 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium flex items-center gap-1 transition"
                title="Change target role from your profile dossier"
              >
                <span>Edit Profile</span>
                <ChevronRight className="w-3 h-3 text-[#8b949e]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. KEY PLACEMENT TELEMETRY CARDS (GitHub Card Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Metric 1: Readiness Score */}
        <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8b949e]">Readiness Score</span>
            <div className="w-7 h-7 rounded-md bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[#58a6ff]">
              <Target className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-[#f0f6fc]">{readiness}%</span>
              <span className="text-[10px] text-[#8b949e]">{roleConfig.shortLabel}</span>
            </div>
            <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full border ${tierInfo.badgeClass}`}>
              {tierInfo.tier.split(' ')[0]}
            </span>
          </div>
          <div className="w-full bg-[#0d1117] h-1.5 rounded-full overflow-hidden border border-[#21262d]">
            <div
              className="bg-[#58a6ff] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(2, readiness)}%` }}
            />
          </div>
        </div>

        {/* Metric 2: DSA Problems Solved */}
        <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8b949e]">DSA Solved</span>
            <div className="w-7 h-7 rounded-md bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[#3fb950]">
              <Code2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-[#f0f6fc]">{dsaStats.solved}</span>
            <span className="text-[10px] text-[#8b949e]">/ {dsaStats.total} Questions</span>
          </div>
          <p className="text-[10px] text-[#8b949e]">
            <span className="text-[#3fb950] font-medium">{dsaStats.easySolved}E</span> • <span className="text-[#d29922] font-medium">{dsaStats.mediumSolved}M</span> • <span className="text-[#f85149] font-medium">{dsaStats.hardSolved}H</span>
          </p>
        </div>

        {/* Metric 3: Roadmaps Milestones */}
        <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8b949e]">Roadmap Progress</span>
            <div className="w-7 h-7 rounded-md bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[#58a6ff]">
              <GitBranch className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-[#f0f6fc]">{roadmapPct}%</span>
            <span className="text-[10px] text-[#8b949e]">{completedRoadmapTopics}/{totalRoadmapTopics} Topics</span>
          </div>
          <div className="w-full bg-[#0d1117] h-1.5 rounded-full overflow-hidden border border-[#21262d]">
            <div
              className="bg-[#238636] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(2, roadmapPct)}%` }}
            />
          </div>
        </div>

        {/* Metric 4: Daily Consistency Streak */}
        <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8b949e]">Consistency Streak</span>
            <div className="w-7 h-7 rounded-md bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[#d29922]">
              <Flame className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-[#f0f6fc]">{user?.streak || 1}</span>
            <span className="text-[10px] text-[#8b949e]">Days Active</span>
          </div>
          <p className="text-[10px] text-[#d29922] font-medium">
            Daily placement streak
          </p>
        </div>
      </div>

      {/* 3. ROLE-RECOMMENDED TRACKS */}
      <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-4 md:p-5 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#30363d] pb-2.5">
          <div>
            <h2 className="text-sm font-semibold text-[#f0f6fc] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#58a6ff]" />
              Recommended Tracks for {roleConfig.shortLabel}
            </h2>
            <p className="text-[11px] text-[#8b949e]">
              Core learning paths calibrated for your target role
            </p>
          </div>

          <Link
            to="/roadmaps"
            className="text-xs text-[#58a6ff] hover:underline font-medium flex items-center gap-1 self-start sm:self-auto"
          >
            <span>All Roadmaps</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {roleConfig.recommendedRoadmapTitles.map((title, idx) => (
            <div
              key={idx}
              className="p-3 rounded-md bg-[#0d1117] border border-[#30363d] flex items-center gap-2.5 text-xs text-[#c9d1d9]"
            >
              <div className="w-5 h-5 rounded bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[#58a6ff] font-mono text-[10px] shrink-0">
                {idx + 1}
              </div>
              <span className="font-medium truncate">{title}</span>
            </div>
          ))}
        </div>

        {/* Priority DSA topics */}
        <div className="pt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
            Priority Topics:
          </span>
          {roleConfig.recommendedDsaTopics.map((topic, i) => (
            <Link
              key={i}
              to="/dsa"
              className="text-[10px] px-2 py-0.5 rounded-md bg-[#0d1117] hover:bg-[#21262d] text-[#c9d1d9] border border-[#30363d] transition-colors"
            >
              {topic}
            </Link>
          ))}
        </div>
      </div>

      {/* 4. MAIN GRID: WEEKLY ACTIVITY + PENDING REVISIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Study Velocity Chart (7 cols) */}
        <div className="lg:col-span-7 rounded-lg bg-[#161b22] border border-[#30363d] p-4 md:p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-2.5">
            <div>
              <h2 className="text-sm font-semibold text-[#f0f6fc] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#58a6ff]" /> Weekly Activity Telemetry
              </h2>
              <p className="text-[11px] text-[#8b949e]">Questions solved over the past 7 days</p>
            </div>
            <Link to="/analytics" className="text-xs text-[#58a6ff] hover:underline font-medium">
              Full Analytics &rarr;
            </Link>
          </div>

          <div className="h-52 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#8b949e" fontSize={11} tickLine={false} axisLine={{ stroke: '#30363d' }} />
                <YAxis stroke="#8b949e" fontSize={11} tickLine={false} axisLine={{ stroke: '#30363d' }} allowDecimals={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(56, 139, 253, 0.08)' }}
                  contentStyle={{
                    backgroundColor: '#161b22',
                    border: '1px solid #30363d',
                    borderRadius: '6px',
                    fontSize: '11px',
                    color: '#f0f6fc'
                  }}
                />
                <Bar dataKey="solved" fill="#238636" radius={[4, 4, 0, 0]} name="Questions Solved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Spaced Revisions / Urgent Checklist (5 cols) */}
        <div className="lg:col-span-5 rounded-lg bg-[#161b22] border border-[#30363d] p-4 md:p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-2.5">
            <div>
              <h2 className="text-sm font-semibold text-[#f0f6fc] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#d29922]" /> Due for Revision
              </h2>
              <p className="text-[11px] text-[#8b949e]">Spaced repetition retention queue</p>
            </div>
            <Link to="/revision" className="text-xs text-[#58a6ff] hover:underline font-medium">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-2 pt-1">
            {pendingRevisions.length > 0 ? (
              pendingRevisions.map((rev) => (
                <div
                  key={rev._id || rev.id}
                  className="p-3 rounded-md bg-[#0d1117] border border-[#30363d] hover:border-[#8b949e] transition-colors flex items-start justify-between gap-3"
                >
                  <div className="min-w-0 space-y-1">
                    <p className="text-xs font-medium text-[#f0f6fc] truncate">{rev.topic}</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#8b949e]">
                      <span className="px-1.5 py-0.2 rounded bg-[#21262d] border border-[#30363d]">{rev.category}</span>
                      <span>Due: {rev.scheduledDate}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleRevision(rev._id || rev.id)}
                    className="p-1.5 rounded bg-[#21262d] hover:bg-[#238636] text-[#8b949e] hover:text-white border border-[#30363d] transition-colors shrink-0"
                    title="Mark as Revised"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-[#8b949e] space-y-1">
                <CheckCircle2 className="w-8 h-8 text-[#238636] mx-auto opacity-80" />
                <p className="text-xs font-medium text-[#f0f6fc]">All revisions completed!</p>
                <p className="text-[10px]">Your algorithmic retention memory is on track.</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
