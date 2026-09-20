import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  User as UserIcon,
  Briefcase,
  Building,
  GraduationCap,
  Globe,
  Code2,
  Sparkles,
  Save,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Flame,
  Target,
  ExternalLink,
  GitBranch,
  Award,
  Layers,
  Check,
  ChevronRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Cpu,
  BarChart3,
  Bookmark,
  Info
} from 'lucide-react';

import { allRoles, getRoleConfig, getReadinessTier } from '../data/rolesData';
import { UserAvatar } from '../components/common/UserAvatar';
import { AvatarPickerModal } from '../components/profile/AvatarPickerModal';

const popularCompanies = [
  'Google',
  'Microsoft',
  'Amazon',
  'Uber',
  'Stripe',
  'Meta',
  'Apple',
  'Netflix',
  'NVIDIA',
  'Atlassian'
];

export const Profile = () => {
  const { user, updateProfile, setUser } = useAuth();
  const { metrics, refreshData } = useData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    targetRole: 'Full Stack Engineer (MERN / Next.js / APIs)',
    dreamCompany: '',
    college: '',
    branch: '',
    gradYear: '2026',
    socialLinks: {
      github: '',
      linkedin: '',
      leetcode: ''
    }
  });

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || user.fullName || '',
        email: user.email || '',
        avatar: user.avatar || '',
        targetRole: user.targetRole || 'Full Stack Engineer (MERN / Next.js / APIs)',
        dreamCompany: user.dreamCompany || '',
        college: user.college || '',
        branch: user.branch || '',
        gradYear: user.gradYear || user.graduationYear || '2026',
        socialLinks: {
          github: user.socialLinks?.github || '',
          linkedin: user.socialLinks?.linkedin || '',
          leetcode: user.socialLinks?.leetcode || ''
        }
      });
    }
  }, [user]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarSave = async (newAvatar) => {
    setFormData(prev => ({
      ...prev,
      avatar: newAvatar
    }));
    try {
      await updateProfile({ avatar: newAvatar });
      setSavedMessage(true);
      setTimeout(() => setSavedMessage(false), 3000);
      refreshData();
    } catch (e) {
      console.error('Failed to update avatar:', e);
    }
  };

  const handleSocialChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleAddCompany = (comp) => {
    const current = formData.dreamCompany
      ? formData.dreamCompany.split(',').map(c => c.trim()).filter(Boolean)
      : [];
    if (!current.includes(comp)) {
      const updated = [...current, comp].join(', ');
      handleChange('dreamCompany', updated);
    }
  };

  const handleRemoveCompany = (compToRemove) => {
    const current = formData.dreamCompany
      ? formData.dreamCompany.split(',').map(c => c.trim()).filter(Boolean)
      : [];
    const updated = current.filter(c => c !== compToRemove).join(', ');
    handleChange('dreamCompany', updated);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
      setSavedMessage(true);
      setTimeout(() => setSavedMessage(false), 3500);
      refreshData();
    } catch (err) {
      console.error('Failed to save profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncProfiles = async () => {
    setSyncing(true);
    setSyncMessage({ text: '', type: '' });
    try {
      await updateProfile(formData);
      const res = await api.post('/auth/sync-profiles', {
        github: formData.socialLinks.github,
        leetcode: formData.socialLinks.leetcode
      });
      if (res?.user) {
        setUser(res.user);
      }
      setSyncMessage({
        text: 'Live telemetry synchronized from LeetCode & GitHub successfully!',
        type: 'success'
      });
      setTimeout(() => setSyncMessage({ text: '', type: '' }), 4500);
      refreshData();
    } catch (err) {
      setSyncMessage({
        text: 'Unable to sync profiles. Ensure your handles are public and valid.',
        type: 'error'
      });
      setTimeout(() => setSyncMessage({ text: '', type: '' }), 4500);
    } finally {
      setSyncing(false);
    }
  };

  const lc = user?.codingStats?.leetcode || {};
  const gh = user?.codingStats?.github || {};
  const readiness = metrics?.readinessScore ?? user?.readinessScore ?? 0;
  const streak = metrics?.user?.streak ?? user?.streak ?? 1;
  const tierInfo = getReadinessTier(readiness);
  const activeRoleObj = getRoleConfig(formData.targetRole);

  const parsedDreamCompanies = formData.dreamCompany
    ? formData.dreamCompany.split(',').map(c => c.trim()).filter(Boolean)
    : [];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-24">
      
      {/* 1. CANDIDATE PROFILE HEADER (GitHub Primer Header) */}
      <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-5 md:p-6 shadow-sm relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* Avatar & Candidate Credentials */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative shrink-0">
              <UserAvatar
                avatar={formData.avatar}
                name={formData.name}
                size="2xl"
                showStatus={true}
                editable={true}
                onEditClick={() => setIsAvatarModalOpen(true)}
              />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#f0f6fc] tracking-tight">
                  {formData.name || 'Candidate Profile'}
                </h1>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${tierInfo.badgeClass}`}>
                  {tierInfo.tier}
                </span>
                <button
                  type="button"
                  onClick={() => setIsAvatarModalOpen(true)}
                  className="text-[10px] px-2.5 py-0.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] hover:text-[#f0f6fc] font-medium transition flex items-center gap-1 cursor-pointer"
                  title="Change avatar picture"
                >
                  <Sparkles className="w-3 h-3 text-[#58a6ff]" />
                  <span>Edit Picture</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                <span className="font-mono text-slate-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  {formData.email}
                </span>
                {formData.college && (
                  <span className="flex items-center gap-1 text-slate-400">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                    {formData.college} {formData.gradYear ? `('${formData.gradYear.slice(-2)})` : ''}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-indigo-950/80 border border-indigo-800/40 text-[11px] font-bold text-indigo-300">
                  <Briefcase className="w-3 h-3 text-indigo-400" />
                  {activeRoleObj.shortLabel} Specialization
                </div>
              </div>
            </div>
          </div>

          {/* Live Readiness Telemetry Dial & Quick Stats */}
          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
            {/* Readiness Dial Card */}
            <div className="px-3.5 py-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] flex items-center gap-3">
              <div className="relative w-11 h-11 flex items-center justify-center">
                <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#21262d]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#58a6ff] transition-all duration-700"
                    strokeDasharray={`${readiness}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-bold text-[#f0f6fc]">{readiness}%</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8b949e] font-semibold uppercase tracking-wider block">
                  Readiness Index
                </span>
                <span className="text-xs font-semibold text-[#58a6ff]">{tierInfo.label}</span>
              </div>
            </div>

            {/* Streak Counter */}
            <div className="px-3.5 py-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] text-center min-w-[90px]">
              <span className="text-[10px] text-[#8b949e] font-semibold uppercase tracking-wider block">
                Consistency
              </span>
              <span className="text-base font-bold text-[#d29922] flex items-center justify-center gap-1">
                <Flame className="w-4 h-4" /> {streak}d
              </span>
            </div>

            {/* LeetCode Counter */}
            <div className="px-3.5 py-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] text-center min-w-[90px]">
              <span className="text-[10px] text-[#8b949e] font-semibold uppercase tracking-wider block">
                DSA Solved
              </span>
              <span className="text-base font-bold text-[#3fb950]">
                {lc.totalSolved || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Tier Assessment Callout */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full shrink-0 ${tierInfo.dotClass}`} />
            <span><strong className="text-slate-200">Evaluation Assessment:</strong> {tierInfo.description}</span>
          </div>
          <Link
            to="/analytics"
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 shrink-0 transition"
          >
            <span>View Full Analytics</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Notifications */}
      {savedMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center gap-2.5 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Candidate dossier and specialization targets updated successfully! Placement weights recalculated.</span>
        </div>
      )}

      {syncMessage.text && (
        <div className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-2.5 shadow-sm animate-fadeIn ${
          syncMessage.type === 'error'
            ? 'bg-rose-950/80 border-rose-800 text-rose-300'
            : 'bg-indigo-950/80 border-indigo-800 text-indigo-300'
        }`}>
          <Sparkles className="w-5 h-5 shrink-0 text-indigo-400" />
          <span>{syncMessage.text}</span>
        </div>
      )}

      {/* 2. ROLE SPECIALIZATION & READINESS EVALUATION MATRIX */}
      <div className="bg-[#161b22] rounded-lg border border-[#30363d] p-5 md:p-6 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#30363d] pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#388bfd]/15 text-[#58a6ff] border border-[#388bfd]/30 text-[10px] font-semibold uppercase tracking-wider mb-1">
              <Cpu className="w-3 h-3" /> Specialization Matrix
            </div>
            <h2 className="text-base font-bold text-[#f0f6fc] flex items-center gap-2">
              Role-Wise Placement Scoring & Formula Weights
            </h2>
            <p className="text-xs text-[#8b949e] mt-0.5">
              Select your target engineering profile to inspect its exact mathematical formula, prioritized DSA topics, and roadmap tracks.
            </p>
          </div>
        </div>

        {/* 8-Role Interactive Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {allRoles.map((role) => {
            const isSelected = role.title === formData.targetRole || role.id === activeRoleObj.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => handleChange('targetRole', role.title)}
                className={`p-2.5 rounded-md border text-left flex flex-col justify-between gap-1.5 transition-all relative ${
                  isSelected
                    ? 'bg-[#21262d] border-[#58a6ff] text-[#f0f6fc]'
                    : 'bg-[#0d1117] hover:bg-[#21262d]/60 border-[#30363d] text-[#8b949e] hover:text-[#f0f6fc]'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#58a6ff]" />
                )}
                <div>
                  <span className="text-[9px] font-medium uppercase tracking-wider block text-[#8b949e]">
                    {role.category.split(' ')[0]}
                  </span>
                  <span className={`text-xs font-semibold line-clamp-2 mt-0.5 ${isSelected ? 'text-[#f0f6fc]' : 'text-[#c9d1d9]'}`}>
                    {role.shortLabel}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-[#58a6ff] font-medium">
                  {role.weights.dsa ? `${Math.round(role.weights.dsa * 100)}% DSA` : `${Math.round(role.weights.roadmaps * 100)}% Trk`}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Role Detailed Deep-Dive Breakdown Panel */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5 md:p-6 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${activeRoleObj.bgBadge}`}>
                  {activeRoleObj.category}
                </span>
                <h3 className="text-sm md:text-base font-black text-white">
                  {activeRoleObj.title}
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">{activeRoleObj.desc}</p>
            </div>

            <div className="shrink-0 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 text-center">
              <span className="text-[9px] uppercase font-bold text-slate-500 block">Target Benchmark</span>
              <span className="text-xs font-bold text-emerald-400">
                {activeRoleObj.targetBenchmarks.minSolvedDsa}+ Solved • {activeRoleObj.targetBenchmarks.minProjects} Projects
              </span>
            </div>
          </div>

          {/* Mathematical Formula Callout */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-indigo-400" /> Evaluation Formula
              </span>
              <span className="text-[10px] text-indigo-400 font-mono font-bold">100% Total Scale</span>
            </div>
            <p className="text-xs font-mono text-cyan-300 font-semibold bg-slate-950 px-3 py-2 rounded-lg border border-slate-800/90 overflow-x-auto">
              {activeRoleObj.formulaDesc}
            </p>
          </div>

          {/* Weights Distribution Bars */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Weight Distribution Breakdown
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {activeRoleObj.weightsList.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium truncate pr-1">{item.label}</span>
                    <span className={`font-black ${item.color}`}>{item.weight}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div className={`${item.barColor} h-full rounded-full`} style={{ width: `${item.weight * 2}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended DSA Topics & Roadmaps Chips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Priority DSA Topics */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Priority DSA Problem Topics
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeRoleObj.recommendedDsaTopics.map((topic, i) => (
                  <Link
                    key={i}
                    to="/dsa"
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-700 font-medium transition flex items-center gap-1"
                  >
                    <Code2 className="w-3 h-3 text-indigo-400" />
                    <span>{topic}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recommended Learning Tracks */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Recommended Learning Tracks
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeRoleObj.recommendedRoadmapTitles.map((title, i) => (
                  <Link
                    key={i}
                    to="/roadmaps"
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-700 font-medium transition flex items-center gap-1"
                  >
                    <GitBranch className="w-3 h-3 text-cyan-400" />
                    <span className="truncate max-w-[200px]">{title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. LIVE CODING FOOTPRINT & TELEMETRY */}
      <div className="bg-[#161b22] rounded-lg border border-[#30363d] p-5 md:p-6 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#d29922]/15 text-[#d29922] border border-[#d29922]/30 text-[10px] font-semibold uppercase tracking-wider mb-1">
              <Zap className="w-3 h-3" /> Live Telemetry
            </div>
            <h2 className="text-base font-bold text-[#f0f6fc] flex items-center gap-2">
              Public Coding Profiles Telemetry
            </h2>
            <p className="text-xs text-[#8b949e] mt-0.5">
              Synchronized metrics from public LeetCode and GitHub profiles.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSyncProfiles}
            disabled={syncing}
            className="px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium flex items-center gap-2 transition-colors self-start sm:self-auto disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#58a6ff] ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Synchronizing...' : 'Sync Live Stats'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: LC Solved */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">LeetCode Solved</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-white">{lc.totalSolved || 0}</p>
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="text-emerald-400">{lc.easySolved || 0} Easy</span>
                <span className="text-amber-400">{lc.mediumSolved || 0} Med</span>
                <span className="text-rose-400">{lc.hardSolved || 0} Hard</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${Math.min(100, ((lc.easySolved || 0) / Math.max(1, lc.totalSolved || 1)) * 100)}%` }}
                  className="bg-emerald-500 h-full"
                  title={`Easy: ${lc.easySolved || 0}`}
                />
                <div
                  style={{ width: `${Math.min(100, ((lc.mediumSolved || 0) / Math.max(1, lc.totalSolved || 1)) * 100)}%` }}
                  className="bg-amber-500 h-full"
                  title={`Medium: ${lc.mediumSolved || 0}`}
                />
                <div
                  style={{ width: `${Math.min(100, ((lc.hardSolved || 0) / Math.max(1, lc.totalSolved || 1)) * 100)}%` }}
                  className="bg-rose-500 h-full"
                  title={`Hard: ${lc.hardSolved || 0}`}
                />
              </div>
            </div>
          </div>

          {/* Card 2: LC Global Rank */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">Global Ranking</span>
              <Target className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-black text-amber-300">
              {lc.ranking ? `#${lc.ranking.toLocaleString()}` : 'Unranked'}
            </p>
            <p className="text-[10px] text-slate-400">
              {lc.acceptanceRate ? `${lc.acceptanceRate}% Acceptance Rate` : 'Worldwide competitive percentile'}
            </p>
          </div>

          {/* Card 3: GitHub Repos */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">Public Repos</span>
              <GitBranch className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-black text-cyan-300">{gh.publicRepos || 0}</p>
            <p className="text-[10px] text-slate-400">Open source repositories on GitHub</p>
          </div>

          {/* Card 4: GitHub Followers */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">Developer Network</span>
              <Globe className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-2xl font-black text-indigo-300">{gh.followers || 0}</p>
            <p className="text-[10px] text-slate-400">GitHub Followers & Reach</p>
          </div>
        </div>
      </div>

      {/* 4. CANDIDATE PROFILE & ACADEMIC DOSSIER FORM */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Candidate Identity & Target Companies */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-800/80 pb-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800/50 text-[10px] font-bold uppercase tracking-wider mb-1">
              <Building className="w-3 h-3" /> Career Objectives
            </div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Candidate Dossier & Target Organizations
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Personal identity details and priority hiring firms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Candidate Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="Full Name (e.g. Alex Chen)"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Registered Email (Immutable)</label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  disabled
                  value={formData.email}
                  className="w-full bg-slate-950/60 border border-slate-800/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-500 cursor-not-allowed font-mono"
                />
              </div>
            </div>

            {/* Dream Companies with Quick-Add Pills */}
            <div className="md:col-span-2 space-y-3">
              <label className="block text-xs font-semibold text-slate-300">Target Dream Tech Companies</label>
              
              <div className="relative">
                <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.dreamCompany}
                  onChange={(e) => handleChange('dreamCompany', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="Comma-separated targets: Google, Microsoft, Uber, Stripe..."
                />
              </div>

              {/* Selected Company Tags */}
              {parsedDreamCompanies.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-slate-500 font-semibold mr-1">Active Targets:</span>
                  {parsedDreamCompanies.map((comp) => (
                    <span
                      key={comp}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800/60 text-xs font-semibold"
                    >
                      <span>{comp}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCompany(comp)}
                        className="text-indigo-400 hover:text-white transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Quick Add Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-500 font-semibold mr-1">1-Click Quick Add:</span>
                {popularCompanies.map((c) => {
                  const isAdded = parsedDreamCompanies.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => (isAdded ? handleRemoveCompany(c) : handleAddCompany(c))}
                      className={`text-[10px] px-2.5 py-1 rounded-lg border font-semibold transition ${
                        isAdded
                          ? 'bg-indigo-950 text-indigo-300 border-indigo-700'
                          : 'bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800'
                      }`}
                    >
                      {isAdded ? `✓ ${c}` : `+ ${c}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Academic Background */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-800/80 pb-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/50 text-[10px] font-bold uppercase tracking-wider mb-1">
              <GraduationCap className="w-3 h-3" /> Academic Milestones
            </div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              University & Degree Background
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Academic institution, department stream, and expected graduation cohort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">College / University</label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => handleChange('college', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Stanford University / IIT Delhi"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Degree & Specialization</label>
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => handleChange('branch', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="e.g. B.Tech Computer Science & Eng"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Graduation Cohort Year</label>
              <input
                type="text"
                value={formData.gradYear}
                onChange={(e) => handleChange('gradYear', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                placeholder="2026"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Coding Profiles & Social Coordinates */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-800/80 pb-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50 text-[10px] font-bold uppercase tracking-wider mb-1">
              <Globe className="w-3 h-3" /> Public Handles
            </div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Coding Profiles & Online Handles
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Handles used for telemetry tracking and technical dossier sharing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">LeetCode Username</label>
              <div className="relative">
                <Code2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.socialLinks.leetcode}
                  onChange={(e) => handleSocialChange('leetcode', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. tour_de_code"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">GitHub Username</label>
              <div className="relative">
                <GitBranch className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.socialLinks.github}
                  onChange={(e) => handleSocialChange('github', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. octocat"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">LinkedIn Profile URL</label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.socialLinks.linkedin}
                  onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Actionable Milestones Checklist */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-4 shadow-sm">
          <div className="border-b border-slate-800/80 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Specialization Action Milestones ({activeRoleObj.shortLabel})
              </h2>
              <p className="text-[11px] text-slate-400">
                Action items calibrated to increase your readiness index for this specialization.
              </p>
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            {metrics?.nextActionItems?.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs transition-all ${
                  item.done
                    ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    item.done ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                  </div>
                  <span className={item.done ? 'line-through opacity-80' : 'font-medium'}>{item.action}</span>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${
                  item.done
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    : 'bg-indigo-950 text-indigo-300 border-indigo-800'
                }`}>
                  {item.done ? 'Completed' : item.boost}
                </span>
              </div>
            )) || (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 text-xs text-center">
                Solve DSA problems and start roadmaps to generate customized actionable milestones.
              </div>
            )}
          </div>
        </div>

        {/* Submit Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Updates dynamically synchronize across Dashboard and Analytics telemetry.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-md bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/30 text-white text-xs font-medium shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Save Profile</span>
          </button>
        </div>
      </form>

      {/* Avatar Picker Modal */}
      <AvatarPickerModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        currentAvatar={formData.avatar}
        userName={formData.name}
        targetRole={formData.targetRole}
        onSaveAvatar={handleAvatarSave}
      />
    </div>
  );
};

export default Profile;
