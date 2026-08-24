import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  GitBranch,
  Layout,
  Server,
  Code2,
  Database,
  Cpu,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Circle,
  Lock,
  Unlock,
  Layers,
  GraduationCap,
  Plus,
  ArrowRight,
  BookmarkCheck,
  Compass
} from 'lucide-react';

import { getRoleConfig } from '../data/rolesData';

export const Roadmaps = () => {
  const { user } = useAuth();
  const { roadmaps, toggleRoadmapTopic, toggleEnrollRoadmap } = useData();
  const [catalogFilter, setCatalogFilter] = useState('All');

  const currentRole = user?.targetRole || 'Full Stack Software Engineer';
  const roleConfig = getRoleConfig(currentRole);

  const groups = [
    'All',
    '🎯 Role Recommended',
    'Frontend',
    'Backend',
    'Full Stack',
    'DSA & Algorithms',
    'System Design',
    'Core CS',
    'DevOps'
  ];

  const getIcon = (groupId) => {
    switch (groupId?.toLowerCase()) {
      case 'frontend':
        return Layout;
      case 'backend':
        return Server;
      case 'dsa & algorithms':
        return Code2;
      case 'system design':
        return GitBranch;
      case 'core cs':
        return BookOpen;
      case 'devops':
        return Cpu;
      default:
        return Layers;
    }
  };

  const totalTopics = roadmaps.reduce((acc, r) => acc + (r.topics?.length || 0), 0);
  const completedTopics = roadmaps.reduce((acc, r) => acc + (r.topics?.filter(t => t.completed).length || 0), 0);
  const overallPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  // Split into Enrolled (Active) vs Available (Catalog)
  const enrolledRoadmaps = roadmaps.filter(r => r.isEnrolled);
  const availableRoadmaps = catalogFilter === 'All'
    ? roadmaps
    : catalogFilter === '🎯 Role Recommended'
    ? roadmaps.filter(r => (roleConfig.recommendedRoadmapIds || []).includes(r.id))
    : roadmaps.filter(r => (r.categoryGroup || '').toLowerCase() === catalogFilter.toLowerCase() || r.category?.toLowerCase().includes(catalogFilter.toLowerCase()));

  return (
    <div className="space-y-10 animate-fadeIn max-w-6xl mx-auto pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-indigo-400" /> Software Engineering Learning Paths
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Sectionized workspace: Manage your active enrolled tracks above, and explore the complete curriculum below.
          </p>
        </div>

        {/* Global Progress Pill */}
        <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl flex items-center gap-3 self-start sm:self-auto shadow-sm">
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Enrolled Tracks: {enrolledRoadmaps.length}</p>
            <p className="text-xs font-bold text-indigo-400">{completedTopics} / {totalTopics} Milestones</p>
          </div>
          <div className="w-11 h-11 rounded-xl border border-indigo-500/30 flex items-center justify-center font-bold text-xs text-slate-100 bg-slate-950">
            {overallPercentage}%
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 1: ACTIVE ENROLLED TRACKS (WORKSPACE) */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <BookmarkCheck className="w-5 h-5 text-emerald-400" />
              My Active Enrolled Tracks ({enrolledRoadmaps.length})
            </h2>
            <p className="text-[11px] text-slate-400">
              Your personalized curriculum workspace. Mark milestones to dynamically boost your readiness score.
            </p>
          </div>
        </div>

        {enrolledRoadmaps.length === 0 ? (
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-200">No Roadmaps Enrolled Yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Browse the Software Engineering catalog below and click <span className="text-indigo-400 font-semibold">"Enroll in Track"</span> to add roadmaps to your active workspace.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledRoadmaps.map((roadmap) => {
              const Icon = getIcon(roadmap.categoryGroup || roadmap.id);
              const total = roadmap.topics?.length || 0;
              const completed = roadmap.topics?.filter(t => t.completed).length || 0;
              const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

              return (
                <div
                  key={roadmap.id}
                  className="rounded-3xl p-6 flex flex-col justify-between space-y-4 border bg-slate-900/90 border-indigo-900/50 shadow-md animate-fadeIn"
                >
                  {/* Card Top */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-950/80 border border-indigo-700/50 flex items-center justify-center text-indigo-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                            {roadmap.categoryGroup || 'Software Engineering'}
                          </span>
                          <h3 className="text-base font-bold text-white flex items-center gap-2">
                            {roadmap.category}
                          </h3>
                        </div>
                      </div>

                      <span className="text-sm font-black text-emerald-400">{pct}%</span>
                    </div>

                    <p className="text-xs text-slate-300 mb-3 leading-relaxed">{roadmap.description}</p>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(2, pct)}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions / Unenroll */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                    <span className="text-[11px] text-emerald-400 font-semibold">
                      ✓ {completed} of {total} Milestones Solved
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleEnrollRoadmap(roadmap.id)}
                      className="text-xs px-3 py-1.5 rounded-xl font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 border border-slate-800 transition-colors"
                    >
                      Leave Track
                    </button>
                  </div>

                  {/* Checklist Topics */}
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {roadmap.topics?.map((topic) => (
                      <div
                        key={topic.id}
                        onClick={() => toggleRoadmapTopic(roadmap.id, topic.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          topic.completed
                            ? 'bg-emerald-950/30 border-emerald-800/50 text-slate-200 shadow-sm'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {topic.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                          )}
                          <span className={`text-xs font-medium truncate ${topic.completed ? 'text-slate-100 font-semibold' : ''}`}>
                            {topic.title}
                          </span>
                        </div>

                        {topic.resources && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 shrink-0 font-mono">
                            {topic.resources}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* SECTION 2: EXPLORE & ENROLL IN CATALOG */}
      {/* ============================================================ */}
      <div className="space-y-6 pt-4 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" />
              Explore All Engineering Tracks & Catalog
            </h2>
            <p className="text-[11px] text-slate-400">
              Curated 2–3 roadmaps per software engineering discipline. Select any track to enroll.
            </p>
          </div>
        </div>

        {/* Catalog Filter Tabs */}
        <div className="flex flex-wrap gap-2 pb-1 border-b border-slate-800/80">
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => setCatalogFilter(group)}
              className={`text-xs px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
                catalogFilter === group
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {group}
            </button>
          ))}
        </div>

        {/* Catalog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableRoadmaps.map((roadmap) => {
            const Icon = getIcon(roadmap.categoryGroup || roadmap.id);
            const total = roadmap.topics?.length || 0;
            const completed = roadmap.topics?.filter(t => t.completed).length || 0;
            const isEnrolled = !!roadmap.isEnrolled;

            return (
              <div
                key={roadmap.id}
                className={`rounded-3xl p-5 flex flex-col justify-between space-y-4 border transition-all ${
                  isEnrolled
                    ? 'bg-slate-900/90 border-indigo-900/60 shadow-sm'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                        isEnrolled ? 'bg-indigo-950 text-indigo-400 border-indigo-800/50' : 'bg-slate-950 text-slate-500 border-slate-800'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-slate-500">
                          {roadmap.categoryGroup}
                        </span>
                        <h4 className="text-xs font-bold text-white leading-tight truncate max-w-[170px]">
                          {roadmap.category}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {(roleConfig.recommendedRoadmapIds || []).includes(roadmap.id) && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/50 font-bold">
                          🎯 {roleConfig.shortLabel}
                        </span>
                      )}
                      {isEnrolled && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50 font-bold">
                          Enrolled
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {roadmap.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] text-slate-500">
                    {total} Milestones • {isEnrolled ? `${completed} Done` : 'Ready to start'}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleEnrollRoadmap(roadmap.id)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1 ${
                      isEnrolled
                        ? 'bg-slate-800 text-slate-300 hover:bg-rose-950 hover:text-rose-400'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                    }`}
                  >
                    {isEnrolled ? (
                      <>
                        <Unlock className="w-3 h-3" /> In Workspace
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" /> Enroll Track
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Roadmaps;
