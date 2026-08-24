import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import api from '../services/api';
import {
  User as UserIcon,
  Briefcase,
  Building,
  GraduationCap,
  GitBranch,
  Globe,
  Code2,
  Sparkles,
  Save,
  CheckCircle2,
  Flame,
  Award,
  RefreshCw,
  TrendingUp,
  Target,
  ArrowRight,
  PlusCircle,
  Layers
} from 'lucide-react';

const sdeRoles = [
  'Full Stack Software Engineer',
  'Frontend Engineer (React / Next.js)',
  'Backend Engineer (Node.js / Java / Python)',
  'Systems & Distributed Systems Engineer',
  'DevOps & Cloud Infrastructure Engineer',
  'Software Development Engineer in Test (SDET)'
];

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
  const [batchEnrolling, setBatchEnrolling] = useState(false);
  const [batchEnrolledMessage, setBatchEnrolledMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateProfile(formData);
    setLoading(false);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
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
      setSyncMessage('Profiles synced successfully with LeetCode & GitHub!');
      setTimeout(() => setSyncMessage(''), 4000);
    } catch (err) {
      setSyncMessage('Failed to sync profile. Check your usernames.');
      setTimeout(() => setSyncMessage(''), 4000);
    } finally {
      setSyncing(false);
    }
  };

  const handleEnrollRecommendedRoadmaps = async () => {
    if (!metrics?.recommendedRoadmapIds?.length) return;
    setBatchEnrolling(true);
    try {
      await api.post('/roadmap/enroll-batch', {
        roadmapIds: metrics.recommendedRoadmapIds
      });
      setBatchEnrolledMessage('Enrolled in all recommended roadmaps for your role!');
      setTimeout(() => setBatchEnrolledMessage(''), 4000);
      refreshData();
    } catch (err) {
      console.error(err);
    } finally {
      setBatchEnrolling(false);
    }
  };

  const lc = user?.codingStats?.leetcode || {};
  const gh = user?.codingStats?.github || {};
  const readiness = metrics?.readinessScore ?? user?.readinessScore ?? 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <UserIcon className="w-6 h-6 text-indigo-400" /> SDE Career Profile & Predictive Telemetry
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Target role configuration, recommended learning tracks, and predictive placement probability analysis.
          </p>
        </div>
      </div>

      {savedMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-800/80 text-emerald-300 text-sm flex items-center gap-2 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Profile updated successfully! Role weights & predictive scores recalculated.</span>
        </div>
      )}

      {syncMessage && (
        <div className="p-4 rounded-2xl bg-indigo-950/70 border border-indigo-800/80 text-indigo-300 text-sm flex items-center gap-2 shadow-sm animate-fadeIn">
          <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
          <span>{syncMessage}</span>
        </div>
      )}

      {batchEnrolledMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-800/80 text-emerald-300 text-sm flex items-center gap-2 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{batchEnrolledMessage}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* PREDICTIVE PLACEMENT PROBABILITY & ROLE ECOSYSTEM */}
      {/* ============================================================ */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" /> Placement Readiness Prediction
            </span>
            <h2 className="text-xl font-bold text-white">
              {formData.targetRole}
            </h2>
            <p className="text-xs text-slate-400">
              Placement probability is dynamically derived from your role-specific roadmap milestones and DSA velocity.
            </p>
          </div>

          <div className="text-left sm:text-right bg-slate-950 px-4 py-3 rounded-2xl border border-slate-800 shrink-0">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Readiness Score</span>
            <span className="text-3xl font-black text-slate-100">{readiness}%</span>
            <p className="text-[10px] text-indigo-400 font-semibold">{metrics?.placementTier || 'In Preparation'}</p>
          </div>
        </div>

        {/* Recommended Roadmaps for this Role */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Recommended Curriculum Tracks for {formData.targetRole.split(' ')[0]} SDE
            </h3>

            <button
              type="button"
              onClick={handleEnrollRecommendedRoadmaps}
              disabled={batchEnrolling}
              className="text-xs px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 self-start sm:self-auto transition-all shadow-sm disabled:opacity-50"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{batchEnrolling ? 'Enrolling...' : 'Enroll All Recommended Tracks'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {metrics?.recommendedRoadmapTitles?.map((title, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3 text-xs text-slate-200"
              >
                <div className="w-6 h-6 rounded-lg bg-indigo-950/80 border border-indigo-800/40 flex items-center justify-center text-indigo-400 font-bold text-[10px] shrink-0">
                  {i + 1}
                </div>
                <span className="font-semibold truncate">{title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Next Steps to Reach 85%+ Readiness */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Recommended Action Items to Boost Placement Score
          </h3>

          <div className="space-y-2">
            {metrics?.nextActionItems?.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl border flex items-center justify-between gap-3 text-xs transition-all ${
                  item.done
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {item.done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                  )}
                  <span className={`truncate ${item.done ? 'line-through text-slate-500' : 'font-medium'}`}>
                    {item.action}
                  </span>
                </div>

                <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-950/80 text-indigo-300 border border-indigo-800/40 font-mono shrink-0 font-bold">
                  {item.boost}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Coding Profiles Telemetry Banner */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-amber-400" />
              Live Coding Profiles Telemetry
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live statistics fetched from your public LeetCode and GitHub profiles.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSyncProfiles}
            disabled={syncing}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all self-start sm:self-auto disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Syncing Profiles...' : 'Sync Live Stats'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-500">LeetCode Solved</p>
            <p className="text-xl font-black text-white mt-0.5">{lc.totalSolved || 0}</p>
            <div className="flex justify-center gap-1.5 text-[9px] mt-1 font-semibold">
              <span className="text-emerald-400">{lc.easySolved || 0}E</span>
              <span className="text-amber-400">{lc.mediumSolved || 0}M</span>
              <span className="text-rose-400">{lc.hardSolved || 0}H</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-500">LeetCode Rank</p>
            <p className="text-xl font-black text-amber-300 mt-0.5">{lc.ranking ? `#${lc.ranking.toLocaleString()}` : 'Unranked'}</p>
            <p className="text-[9px] text-slate-400 mt-1">Global Standing</p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-500">GitHub Repos</p>
            <p className="text-xl font-black text-cyan-300 mt-0.5">{gh.publicRepos || 0}</p>
            <p className="text-[9px] text-slate-400 mt-1">Public Repositories</p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-500">GitHub Followers</p>
            <p className="text-xl font-black text-indigo-300 mt-0.5">{gh.followers || 0}</p>
            <p className="text-[9px] text-slate-400 mt-1">Developer Network</p>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Placement Targets */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-sm">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Software Engineering Career Target
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Target Developer Role</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={formData.targetRole}
                  onChange={(e) => handleChange('targetRole', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  {sdeRoles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Dream Companies</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.dreamCompany}
                  onChange={(e) => handleChange('dreamCompany', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Google, Microsoft, Amazon, Atlassian, Uber"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-sm">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            Education & Academics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">College / University</label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => handleChange('college', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="University name"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Branch / Degree</label>
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => handleChange('branch', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Computer Engineering"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Graduation Year</label>
              <input
                type="text"
                value={formData.gradYear}
                onChange={(e) => handleChange('gradYear', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="2026"
              />
            </div>
          </div>
        </div>

        {/* Social & Coding Handles */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-sm">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            Coding Profiles & Handles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">LeetCode Username</label>
              <input
                type="text"
                value={formData.socialLinks.leetcode}
                onChange={(e) => handleSocialChange('leetcode', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="e.g. neetcode"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">GitHub Username</label>
              <input
                type="text"
                value={formData.socialLinks.github}
                onChange={(e) => handleSocialChange('github', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="e.g. torvalds"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">LinkedIn Profile URL</label>
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

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition-all hover:scale-105 flex items-center gap-2 disabled:opacity-50"
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
