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
  Layers
} from 'lucide-react';

import { allRoles } from '../data/rolesData';

const popularCompanies = ['Google', 'Microsoft', 'Amazon', 'Uber', 'Stripe', 'Atlassian', 'Apple', 'Meta'];

export const Profile = () => {
  const { user, updateProfile, setUser } = useAuth();
  const { metrics, refreshData } = useData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    targetRole: 'Full Stack Software Engineer',
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

  const [savedMessage, setSavedMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || user.fullName || '',
        email: user.email || '',
        targetRole: user.targetRole || 'Full Stack Software Engineer',
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
    const current = formData.dreamCompany ? formData.dreamCompany.split(',').map(c => c.trim()) : [];
    if (!current.includes(comp)) {
      const updated = [...current, comp].filter(Boolean).join(', ');
      handleChange('dreamCompany', updated);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateProfile(formData);
    setLoading(false);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3500);
    refreshData();
  };

  const handleSyncProfiles = async () => {
    setSyncing(true);
    setSyncMessage('');
    try {
      await updateProfile(formData);
      const res = await api.post('/auth/sync-profiles', {
        github: formData.socialLinks.github,
        leetcode: formData.socialLinks.leetcode
      });
      if (res?.user) {
        setUser(res.user);
      }
      setSyncMessage('Profiles synchronized successfully with live LeetCode & GitHub data!');
      setTimeout(() => setSyncMessage(''), 4000);
      refreshData();
    } catch (err) {
      setSyncMessage('Failed to sync profile. Please check that your usernames are valid.');
      setTimeout(() => setSyncMessage(''), 4000);
    } finally {
      setSyncing(false);
    }
  };

  const lc = user?.codingStats?.leetcode || {};
  const gh = user?.codingStats?.github || {};
  const readiness = metrics?.readinessScore ?? user?.readinessScore ?? 0;
  const streak = metrics?.user?.streak ?? user?.streak ?? 1;
  const activeRoleObj = allRoles.find(r => r.title === formData.targetRole) || allRoles[0];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-20">
      
      {/* 1. TOP HERO AVATAR & STATS BANNER */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          {/* Avatar & User Details */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-2xl sm:text-3xl font-black text-white shadow-xl shadow-indigo-600/30 border border-white/15">
                {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 shadow" title="Active Candidate" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {formData.name || 'Candidate Profile'}
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/50">
                  {formData.gradYear || '2026'} Candidate
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">{formData.email}</p>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                  {formData.targetRole}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="px-3.5 py-2 rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-[90px]">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Readiness</span>
              <span className="text-lg font-black text-indigo-400">{readiness}%</span>
            </div>

            <div className="px-3.5 py-2 rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-[90px]">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Streak</span>
              <span className="text-lg font-black text-amber-400 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4" /> {streak}d
              </span>
            </div>

            <div className="px-3.5 py-2 rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-[90px]">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">LC Solved</span>
              <span className="text-lg font-black text-emerald-400">{lc.totalSolved || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {savedMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center gap-2.5 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Profile configuration saved successfully! Your placement analytics have been updated.</span>
        </div>
      )}

      {/* Sync Notification */}
      {syncMessage && (
        <div className="p-4 rounded-2xl bg-indigo-950/80 border border-indigo-800 text-indigo-300 text-xs font-semibold flex items-center gap-2.5 shadow-sm animate-fadeIn">
          <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
          <span>{syncMessage}</span>
        </div>
      )}

      {/* 2. PLACEMENT RECOMMENDATION AI CTA BANNER */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 md:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Looking for your AI Placement Roadmap & Strategy?
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Explore your personalized curriculum tracks, score-boosting tasks, and target company blueprints.
            </p>
          </div>
        </div>

        <Link
          to="/recommendations"
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-indigo-600/20 self-start sm:self-auto shrink-0"
        >
          <span>Open AI Recommendations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 3. LIVE CODING TELEMETRY (LEETCODE + GITHUB) */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-amber-400" />
              Live Coding Profiles Telemetry
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-time problem solving statistics synchronized from your public LeetCode and GitHub accounts.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSyncProfiles}
            disabled={syncing}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition-all self-start sm:self-auto disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Synchronizing Data...' : 'Sync Live Stats'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: LC Solved */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">LeetCode Solved</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-white">{lc.totalSolved || 0}</p>
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[10px] font-semibold">
                <span className="text-emerald-400">{lc.easySolved || 0} Easy</span>
                <span className="text-amber-400">{lc.mediumSolved || 0} Med</span>
                <span className="text-rose-400">{lc.hardSolved || 0} Hard</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden flex">
                <div style={{ width: `${Math.min(100, ((lc.easySolved || 0) / Math.max(1, lc.totalSolved || 1)) * 100)}%` }} className="bg-emerald-500 h-full" />
                <div style={{ width: `${Math.min(100, ((lc.mediumSolved || 0) / Math.max(1, lc.totalSolved || 1)) * 100)}%` }} className="bg-amber-500 h-full" />
                <div style={{ width: `${Math.min(100, ((lc.hardSolved || 0) / Math.max(1, lc.totalSolved || 1)) * 100)}%` }} className="bg-rose-500 h-full" />
              </div>
            </div>
          </div>

          {/* Card 2: LC Global Rank */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">Global Ranking</span>
              <Target className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-black text-amber-300">
              {lc.ranking ? `#${lc.ranking.toLocaleString()}` : 'Unranked'}
            </p>
            <p className="text-[10px] text-slate-500">
              {lc.acceptanceRate ? `${lc.acceptanceRate}% Acceptance Rate` : 'Worldwide competitive rank'}
            </p>
          </div>

          {/* Card 3: GitHub Repos */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">Public Repos</span>
              <GitBranch className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-black text-cyan-300">{gh.publicRepos || 0}</p>
            <p className="text-[10px] text-slate-500">Public Open Source Repositories</p>
          </div>

          {/* Card 4: GitHub Followers */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">GH Followers</span>
              <Globe className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-2xl font-black text-indigo-300">{gh.followers || 0}</p>
            <p className="text-[10px] text-slate-500">Developer Network & Reach</p>
          </div>
        </div>
      </div>

      {/* 4. PROFILE & ACADEMIC SETTINGS FORM */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Career Placement Focus */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-5 shadow-sm">
          <div className="border-b border-slate-800/80 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Career & Placement Targets
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Set your target role and dream tech companies to dynamically tailor your roadmaps.
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
                  placeholder="Your Full Name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Registered Email (Read Only)</label>
              <input
                type="email"
                disabled
                value={formData.email}
                className="w-full bg-slate-950/60 border border-slate-800/60 rounded-xl px-4 py-2.5 text-xs text-slate-500 cursor-not-allowed font-mono"
              />
            </div>

            {/* Target Role Selector */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-xs font-semibold text-slate-300">Target Engineering Specialization</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={formData.targetRole}
                  onChange={(e) => handleChange('targetRole', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  {allRoles.map((role) => (
                    <option key={role.id} value={role.title}>{role.title}</option>
                  ))}
                </select>
              </div>

              {/* Active Role Description Callout */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
                <span className="text-indigo-400 font-bold shrink-0">Scope:</span>
                <span>{activeRoleObj.desc}</span>
              </div>
            </div>

            {/* Dream Companies Input & Quick Tags */}
            <div className="md:col-span-2 space-y-2.5">
              <label className="block text-xs font-semibold text-slate-300">Dream Tech Companies</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.dreamCompany}
                  onChange={(e) => handleChange('dreamCompany', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Google, Microsoft, Amazon, Uber, Stripe"
                />
              </div>

              {/* Quick Click Company Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-500 font-semibold mr-1">Quick Add:</span>
                {popularCompanies.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleAddCompany(c)}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-950 hover:bg-indigo-950 hover:text-indigo-300 border border-slate-800 hover:border-indigo-800/50 text-slate-400 transition"
                  >
                    + {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Academic Background */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-5 shadow-sm">
          <div className="border-b border-slate-800/80 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              Academic Background
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              University, degree stream, and graduation timeline details.
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
                placeholder="e.g. Stanford University"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Degree & Department</label>
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => handleChange('branch', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="e.g. B.Tech Computer Science"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Graduation Year</label>
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

        {/* Section 3: Social & Coding Handles */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-5 shadow-sm">
          <div className="border-b border-slate-800/80 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              Coding Profiles & Handles
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Handles for automatic metric synchronization and resume profile links.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">LeetCode Username</label>
              <input
                type="text"
                value={formData.socialLinks.leetcode}
                onChange={(e) => handleSocialChange('leetcode', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="e.g. neetcode"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">GitHub Username</label>
              <input
                type="text"
                value={formData.socialLinks.github}
                onChange={(e) => handleSocialChange('github', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="e.g. torvalds"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">LinkedIn Profile URL</label>
              <input
                type="text"
                value={formData.socialLinks.linkedin}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>
        </div>

        {/* Submit Actions Footer */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-slate-500">
            All updates immediately recalculate your placement readiness scoring weights.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving Changes...' : 'Save Career Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
