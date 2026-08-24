import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
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
  TrendingUp
} from 'lucide-react';

export const Profile = () => {
  const { user, updateProfile, setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    targetRole: '',
    dreamCompany: '',
    college: '',
    branch: '',
    gradYear: '',
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
        targetRole: user.targetRole || '',
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
  };

  const handleSyncProfiles = async () => {
    setSyncing(true);
    setSyncMessage('');
    try {
      // First save current links
      await updateProfile(formData);
      const res = await api.post('/auth/sync-profiles', {
        github: formData.socialLinks.github,
        leetcode: formData.socialLinks.leetcode
      });
      if (res?.user) {
        setUser(res.user);
      }
      setSyncMessage('Live LeetCode & GitHub stats updated!');
      setTimeout(() => setSyncMessage(''), 4000);
    } catch (err) {
      console.error(err);
      setSyncMessage('Sync finished with available data.');
      setTimeout(() => setSyncMessage(''), 4000);
    } finally {
      setSyncing(false);
    }
  };

  const lc = user?.codingStats?.leetcode || { totalSolved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0, ranking: 0 };
  const gh = user?.codingStats?.github || { publicRepos: 0, followers: 0 };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900/60 via-slate-900 to-cyan-950/60 border border-slate-800 p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-indigo-600/30 border border-white/10">
              {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                {formData.name || 'Student Developer'}
              </h1>
              <p className="text-sm text-indigo-300 flex items-center gap-1.5 mt-0.5">
                <Briefcase className="w-3.5 h-3.5" />
                {formData.targetRole || 'Software Engineering Aspirant'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {formData.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Daily Streak</p>
                <p className="text-base font-black text-amber-300">{user?.streak || 1} Days</p>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Readiness</p>
                <p className="text-base font-black text-cyan-300">{user?.readinessScore || 0}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {savedMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-800/80 text-emerald-300 text-sm flex items-center gap-2 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Profile updated successfully! All changes have been saved to your account.</span>
        </div>
      )}

      {syncMessage && (
        <div className="p-4 rounded-2xl bg-indigo-950/70 border border-indigo-800/80 text-indigo-300 text-sm flex items-center gap-2 shadow-lg animate-fadeIn">
          <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
          <span>{syncMessage}</span>
        </div>
      )}

      {/* Live Coding Profiles Live Telemetry Banner */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-lg">
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
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-500">LeetCode Solved</p>
            <p className="text-xl font-black text-white mt-0.5">{lc.totalSolved || 0}</p>
            <div className="flex justify-center gap-1.5 text-[9px] mt-1">
              <span className="text-emerald-400">{lc.easySolved || 0}E</span>
              <span className="text-amber-400">{lc.mediumSolved || 0}M</span>
              <span className="text-rose-400">{lc.hardSolved || 0}H</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-500">LeetCode Rank</p>
            <p className="text-xl font-black text-amber-300 mt-0.5">{lc.ranking ? `#${lc.ranking.toLocaleString()}` : 'Unranked'}</p>
            <p className="text-[9px] text-slate-400 mt-1">Global Standing</p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-500">GitHub Repos</p>
            <p className="text-xl font-black text-cyan-300 mt-0.5">{gh.publicRepos || 0}</p>
            <p className="text-[9px] text-slate-400 mt-1">Public Repositories</p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-500">GitHub Followers</p>
            <p className="text-xl font-black text-indigo-300 mt-0.5">{gh.followers || 0}</p>
            <p className="text-[9px] text-slate-400 mt-1">Developer Network</p>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Placement Targets */}
        <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Placement Career Goals
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
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Target Job Role</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.targetRole}
                  onChange={(e) => handleChange('targetRole', e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Full Stack Developer, SDE-1"
                />
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
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Google, Microsoft, Amazon, Atlassian, Uber"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 space-y-4">
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
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="University name"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Branch / Degree</label>
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => handleChange('branch', e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Computer Engineering"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Graduation Year</label>
              <input
                type="text"
                value={formData.gradYear}
                onChange={(e) => handleChange('gradYear', e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="e.g. 2026"
              />
            </div>
          </div>
        </div>

        {/* Social / Coding Profiles */}
        <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-400" />
            Coding & Professional Profiles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5 text-slate-400" /> GitHub Profile
              </label>
              <input
                type="text"
                value={formData.socialLinks.github}
                onChange={(e) => handleSocialChange('github', e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="https://github.com/username"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-sky-400" /> LinkedIn Profile
              </label>
              <input
                type="text"
                value={formData.socialLinks.linkedin}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5 text-amber-400" /> LeetCode Profile
              </label>
              <input
                type="text"
                value={formData.socialLinks.leetcode}
                onChange={(e) => handleSocialChange('leetcode', e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="https://leetcode.com/username"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving Changes...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
export default Profile;
