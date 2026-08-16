import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {
  Flame,
  Sparkles,
  Target,
  Search,
  User,
  X,
  Code2,
  GitBranch,
  FolderGit2,
  BookOpen,
  GraduationCap,
  Building,
  CalendarCheck,
  Check
} from 'lucide-react';

export const Navbar = () => {
  const { user, updateProfile } = useAuth();
  const { metrics } = useData();
  const navigate = useNavigate();

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  // Profile Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || user?.name || '',
    college: user?.college || '',
    branch: user?.branch || '',
    graduationYear: user?.graduationYear || '',
    targetRole: user?.targetRole || '',
    dreamCompany: user?.dreamCompany || ''
  });
  const [profileSaved, setProfileSaved] = useState(false);

  const readiness = metrics?.readinessScore ?? user?.readinessScore ?? 84;
  const streak = metrics?.user?.streak ?? user?.streak ?? 12;

  // Handle Global Search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await api.get(`/search?q=${encodeURIComponent(searchQuery)}`);
        if (res?.data) {
          setSearchResults(res.data);
          setIsSearchOpen(true);
        }
      } catch (err) {
        console.error('Search error:', err);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside listener for search popup
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(profileForm);
    setProfileSaved(true);
    setTimeout(() => {
      setProfileSaved(false);
      setIsProfileModalOpen(false);
    }, 1200);
  };

  const handleResultClick = (route) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(route);
  };

  return (
    <>
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
        {/* Global Search Bar (Matching Class Diagram: SearchFilter) */}
        <div ref={searchRef} className="relative flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setIsSearchOpen(true)}
              placeholder="Global Search (DSA, Roadmaps, Projects, Notes, Goals)..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {isSearchOpen && searchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto p-3 space-y-3">
              {/* DSA Matches */}
              {searchResults.dsa?.length > 0 && (
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                    <Code2 className="w-3 h-3" /> DSA Questions ({searchResults.dsa.length})
                  </p>
                  {searchResults.dsa.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick('/dsa')}
                      className="p-2 rounded-lg hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs text-slate-200"
                    >
                      <span className="font-medium truncate">{item.title || item.problemTitle}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded">{item.topic}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Roadmaps */}
              {searchResults.roadmaps?.length > 0 && (
                <div className="space-y-1 pt-1 border-t border-slate-800">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                    <GitBranch className="w-3 h-3" /> Roadmap Milestones ({searchResults.roadmaps.length})
                  </p>
                  {searchResults.roadmaps.slice(0, 3).map((item, i) => (
                    <div
                      key={i}
                      onClick={() => handleResultClick('/roadmaps')}
                      className="p-2 rounded-lg hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs text-slate-200"
                    >
                      <span className="truncate">{item.title}</span>
                      <span className="text-[10px] text-slate-400">{item.category}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects */}
              {searchResults.projects?.length > 0 && (
                <div className="space-y-1 pt-1 border-t border-slate-800">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                    <FolderGit2 className="w-3 h-3" /> Projects ({searchResults.projects.length})
                  </p>
                  {searchResults.projects.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick('/projects')}
                      className="p-2 rounded-lg hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs text-slate-200"
                    >
                      <span className="truncate">{item.title || item.projectTitle}</span>
                      <span className="text-[10px] text-slate-400">{item.status}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Notes */}
              {searchResults.notes?.length > 0 && (
                <div className="space-y-1 pt-1 border-t border-slate-800">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> Placement Notes ({searchResults.notes.length})
                  </p>
                  {searchResults.notes.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick('/notes')}
                      className="p-2 rounded-lg hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs text-slate-200"
                    >
                      <span className="truncate">{item.title || item.noteTitle}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty state */}
              {(!searchResults.dsa?.length && !searchResults.roadmaps?.length && !searchResults.projects?.length && !searchResults.notes?.length) && (
                <p className="text-xs text-slate-500 text-center py-3">No matching results found for "{searchQuery}"</p>
              )}
            </div>
          )}
        </div>

        {/* Center & Right Badges */}
        <div className="flex items-center gap-4">
          {/* Placement Readiness Badge */}
          <div className="hidden sm:flex items-center gap-2 bg-indigo-950/50 border border-indigo-800/40 px-3 py-1 rounded-full">
            <Target className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-xs text-slate-300 font-medium">Placement Readiness:</span>
            <span className="text-xs font-bold text-indigo-400">{readiness}%</span>
            <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden ml-1">
              <div
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${readiness}%` }}
              />
            </div>
          </div>

          {/* Streak Counter */}
          <div className="flex items-center gap-1.5 bg-amber-950/40 border border-amber-800/40 px-3 py-1 rounded-full">
            <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
            <span className="text-xs font-bold text-amber-400">{streak} Day Streak</span>
          </div>

          {/* User Profile Pill (Triggers Profile Modal) */}
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-2.5 pl-2 border-l border-slate-800 hover:opacity-85 transition-opacity"
            title="Edit Academic & Placement Profile"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-xs text-white shadow-md">
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : (user?.name ? user.name.charAt(0).toUpperCase() : 'H')}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-medium text-slate-200 leading-tight">{user?.fullName || user?.name || 'Hardik Bhochiya'}</p>
              <p className="text-[10px] text-slate-400 leading-tight">{user?.branch || 'Computer Engineering'} ({user?.graduationYear || '2026'})</p>
            </div>
          </button>
        </div>
      </header>

      {/* Profile Management Modal (Matching ER Diagram & Use Case: Profile Management) */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-panel bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-700/50 flex items-center justify-center text-indigo-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Student Placement Profile</h2>
                  <p className="text-xs text-slate-400">Academic details & target placement goals</p>
                </div>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={profileForm.fullName}
                  onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">College / University</label>
                  <input
                    type="text"
                    value={profileForm.college}
                    onChange={(e) => setProfileForm({ ...profileForm, college: e.target.value })}
                    placeholder="Gujarat Tech University"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Branch / Degree</label>
                  <input
                    type="text"
                    value={profileForm.branch}
                    onChange={(e) => setProfileForm({ ...profileForm, branch: e.target.value })}
                    placeholder="Computer Engineering"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Graduation Year</label>
                  <input
                    type="text"
                    value={profileForm.graduationYear}
                    onChange={(e) => setProfileForm({ ...profileForm, graduationYear: e.target.value })}
                    placeholder="2026"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Role</label>
                  <input
                    type="text"
                    value={profileForm.targetRole}
                    onChange={(e) => setProfileForm({ ...profileForm, targetRole: e.target.value })}
                    placeholder="Full Stack SDE"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Dream Companies</label>
                <input
                  type="text"
                  value={profileForm.dreamCompany}
                  onChange={(e) => setProfileForm({ ...profileForm, dreamCompany: e.target.value })}
                  placeholder="Google, Microsoft, Tier-1 Tech"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                {profileSaved ? (
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Profile Updated!
                  </span>
                ) : <span />}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsProfileModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
