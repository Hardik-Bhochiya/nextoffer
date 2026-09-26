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
  Flame,
  Target,
  GitBranch,
  Award,
  ChevronRight,
  ShieldCheck,
  Zap,
  BookOpen,
  Info
} from 'lucide-react';

import { allRoles, getRoleConfig, getReadinessTier } from '../data/rolesData';
import { UserAvatar } from '../components/common/UserAvatar';
import { AvatarPickerModal } from '../components/profile/AvatarPickerModal';

export const Profile = () => {
  const { user, updateProfile, setUser } = useAuth();
  const { metrics, refreshData } = useData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    targetRole: 'Full Stack Engineer',
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
        targetRole: user.targetRole || 'Full Stack Engineer',
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

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-20 font-sans">
      
      {/* 1. CANDIDATE PROFILE OVERVIEW HEADER */}
      <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-5 md:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          {/* Avatar & Candidate Identity */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0 group">
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
                <h1 className="text-xl font-bold text-[#f0f6fc] tracking-tight">
                  {formData.name || 'Candidate Profile'}
                </h1>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${tierInfo.badgeClass}`}>
                  {tierInfo.tier}
                </span>
                <button
                  type="button"
                  onClick={() => setIsAvatarModalOpen(true)}
                  className="text-[10px] px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] font-medium transition flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#58a6ff]" /> Edit Photo
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#8b949e]">
                <span className="font-mono text-[#c9d1d9] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#58a6ff]" /> {formData.email}
                </span>
                {formData.college && (
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-[#3fb950]" />
                    {formData.college} {formData.gradYear ? `('${formData.gradYear.slice(-2)})` : ''}
                  </span>
                )}
              </div>

              <div className="pt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#388bfd]/15 border border-[#388bfd]/30 text-[11px] font-semibold text-[#58a6ff]">
                  <Briefcase className="w-3 h-3" /> {activeRoleObj.shortLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Chips */}
          <div className="flex items-center gap-2.5 self-start lg:self-center shrink-0">
            {/* Readiness */}
            <div className="px-3 py-2 rounded-md bg-[#0d1117] border border-[#30363d] text-center min-w-[90px]">
              <span className="text-[10px] text-[#8b949e] font-semibold uppercase block">Readiness</span>
              <span className="text-base font-bold text-[#58a6ff]">{readiness}%</span>
            </div>

            {/* Streak */}
            <div className="px-3 py-2 rounded-md bg-[#0d1117] border border-[#30363d] text-center min-w-[90px]">
              <span className="text-[10px] text-[#8b949e] font-semibold uppercase block">Streak</span>
              <span className="text-base font-bold text-[#d29922] flex items-center justify-center gap-0.5">
                <Flame className="w-3.5 h-3.5" /> {streak}d
              </span>
            </div>

            {/* LeetCode */}
            <div className="px-3 py-2 rounded-md bg-[#0d1117] border border-[#30363d] text-center min-w-[90px]">
              <span className="text-[10px] text-[#8b949e] font-semibold uppercase block">DSA Solved</span>
              <span className="text-base font-bold text-[#3fb950]">{lc.totalSolved || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {savedMessage && (
        <div className="p-3 rounded-md bg-[#238636]/15 border border-[#238636]/40 text-[#3fb950] text-xs font-semibold flex items-center gap-2 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Profile dossier and target specialization saved successfully!</span>
        </div>
      )}

      {syncMessage.text && (
        <div className={`p-3 rounded-md border text-xs font-semibold flex items-center gap-2 shadow-sm animate-fadeIn ${
          syncMessage.type === 'error'
            ? 'bg-[#da3633]/15 border-[#da3633]/40 text-[#f85149]'
            : 'bg-[#388bfd]/15 border-[#388bfd]/40 text-[#58a6ff]'
        }`}>
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>{syncMessage.text}</span>
        </div>
      )}

      {/* 2. TARGET ENGINEERING SPECIALIZATION SELECTOR */}
      <div className="bg-[#161b22] rounded-lg border border-[#30363d] p-5 md:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#30363d] pb-2.5">
          <div>
            <h2 className="text-sm font-bold text-[#f0f6fc] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#58a6ff]" /> Target Engineering Specialization
            </h2>
            <p className="text-xs text-[#8b949e] mt-0.5">
              Select your goal engineering discipline to tune preparation weights and syllabus expectations.
            </p>
          </div>
          <span className="text-xs font-mono text-[#58a6ff] bg-[#388bfd]/10 px-2.5 py-1 rounded border border-[#388bfd]/20 hidden sm:inline-block">
            {activeRoleObj.shortLabel}
          </span>
        </div>

        {/* 8-Role Compact Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {allRoles.map((role) => {
            const isSelected = role.title === formData.targetRole || role.id === activeRoleObj.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => handleChange('targetRole', role.title)}
                className={`p-2.5 rounded-md border text-left flex flex-col justify-between gap-1 transition-all ${
                  isSelected
                    ? 'bg-[#21262d] border-[#58a6ff] text-[#f0f6fc]'
                    : 'bg-[#0d1117] hover:bg-[#21262d]/60 border-[#30363d] text-[#8b949e] hover:text-[#f0f6fc]'
                }`}
              >
                <div>
                  <span className="text-[9px] font-medium uppercase tracking-wider block text-[#8b949e]">
                    {role.category}
                  </span>
                  <span className={`text-xs font-semibold line-clamp-1 mt-0.5 ${isSelected ? 'text-[#f0f6fc]' : 'text-[#c9d1d9]'}`}>
                    {role.shortLabel}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-[#58a6ff]">
                  {role.weights.dsa ? `${Math.round(role.weights.dsa * 100)}% DSA` : `${Math.round(role.weights.roadmaps * 100)}% Tracks`}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Role Syllabus & Core Competencies Box */}
        <div className="p-4 rounded-md bg-[#0d1117] border border-[#30363d] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#30363d] pb-2">
            <div>
              <h3 className="text-xs font-bold text-[#f0f6fc]">
                {activeRoleObj.fullName || activeRoleObj.title}
              </h3>
              <p className="text-[11px] text-[#58a6ff] font-medium mt-0.5">
                {activeRoleObj.roleFullForm || activeRoleObj.title}
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#3fb950] font-semibold">
              Benchmark: {activeRoleObj.targetBenchmarks?.minSolvedDsa || 50}+ DSA • {activeRoleObj.targetBenchmarks?.minProjects || 2} Capstones
            </span>
          </div>

          {activeRoleObj.knowledgeRequired && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-[#8b949e] tracking-wider block">
                  Core Topics Required:
                </span>
                <ul className="space-y-1 text-[#c9d1d9] text-[11px]">
                  {activeRoleObj.knowledgeRequired.coreCompetencies.slice(0, 3).map((comp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#3fb950] font-bold">✓</span>
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-[#8b949e] tracking-wider block">
                  Recommended Tech Stack:
                </span>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {activeRoleObj.knowledgeRequired.requiredLanguages.map((lang, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161b22] text-[#58a6ff] border border-[#30363d]">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. MAIN FORM: DOSSIER & CODING PROFILES */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Academic & Target Organizations */}
        <div className="bg-[#161b22] rounded-lg border border-[#30363d] p-5 md:p-6 space-y-4 shadow-sm">
          <div className="border-b border-[#30363d] pb-2.5">
            <h2 className="text-sm font-bold text-[#f0f6fc] flex items-center gap-2">
              <Building className="w-4 h-4 text-[#58a6ff]" /> Candidate Dossier & Academic Info
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Candidate Full Name</label>
              <div className="relative">
                <UserIcon className="w-3.5 h-3.5 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-9 pr-3 py-2 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  placeholder="Full Name"
                />
              </div>
            </div>

            {/* Target Dream Companies */}
            <div>
              <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Target Companies</label>
              <div className="relative">
                <Building className="w-3.5 h-3.5 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.dreamCompany}
                  onChange={(e) => handleChange('dreamCompany', e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-9 pr-3 py-2 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  placeholder="Google, Microsoft, Amazon, Uber..."
                />
              </div>
            </div>

            {/* College */}
            <div>
              <label className="block text-xs font-medium text-[#c9d1d9] mb-1">College / University</label>
              <div className="relative">
                <GraduationCap className="w-3.5 h-3.5 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => handleChange('college', e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-9 pr-3 py-2 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  placeholder="College Name"
                />
              </div>
            </div>

            {/* Degree & Grad Year */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Degree / Branch</label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) => handleChange('branch', e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  placeholder="B.Tech CS"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Grad Year</label>
                <input
                  type="text"
                  value={formData.gradYear}
                  onChange={(e) => handleChange('gradYear', e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-[#f0f6fc] font-mono focus:outline-none focus:border-[#58a6ff]"
                  placeholder="2026"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Public Handles & Coding Telemetry */}
        <div className="bg-[#161b22] rounded-lg border border-[#30363d] p-5 md:p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-2.5">
            <div>
              <h2 className="text-sm font-bold text-[#f0f6fc] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#58a6ff]" /> Coding Profiles & Telemetry
              </h2>
              <p className="text-xs text-[#8b949e]">Handles used to synchronize external LeetCode & GitHub stats.</p>
            </div>

            <button
              type="button"
              onClick={handleSyncProfiles}
              disabled={syncing}
              className="px-3 py-1 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#58a6ff] ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Syncing...' : 'Sync Live Stats'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* LeetCode */}
            <div>
              <label className="block text-xs font-medium text-[#c9d1d9] mb-1">LeetCode Username</label>
              <div className="relative">
                <Code2 className="w-3.5 h-3.5 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.socialLinks.leetcode}
                  onChange={(e) => handleSocialChange('leetcode', e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-9 pr-3 py-2 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  placeholder="leetcode_handle"
                />
              </div>
              {lc.totalSolved > 0 && (
                <span className="text-[10px] text-[#3fb950] font-mono mt-1 block">
                  ✓ {lc.totalSolved} Solved ({lc.easySolved || 0}E • {lc.mediumSolved || 0}M • {lc.hardSolved || 0}H)
                </span>
              )}
            </div>

            {/* GitHub */}
            <div>
              <label className="block text-xs font-medium text-[#c9d1d9] mb-1">GitHub Username</label>
              <div className="relative">
                <GitBranch className="w-3.5 h-3.5 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.socialLinks.github}
                  onChange={(e) => handleSocialChange('github', e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-9 pr-3 py-2 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  placeholder="github_username"
                />
              </div>
              {gh.publicRepos > 0 && (
                <span className="text-[10px] text-[#58a6ff] font-mono mt-1 block">
                  ✓ {gh.publicRepos} Public Repositories
                </span>
              )}
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-xs font-medium text-[#c9d1d9] mb-1">LinkedIn Profile URL</label>
              <div className="relative">
                <Globe className="w-3.5 h-3.5 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.socialLinks.linkedin}
                  onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-9 pr-3 py-2 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  placeholder="linkedin.com/in/username"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Actions Bar */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-[#8b949e] flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-[#58a6ff]" /> Updates reflect instantly on Dashboard & Analytics
          </span>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-md bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/30 text-white text-xs font-semibold shadow-sm transition flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
