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
import { TopicInspectorModal } from '../components/roadmaps/TopicInspectorModal';

export const Roadmaps = () => {
  const { user } = useAuth();
  const { roadmaps, toggleRoadmapTopic, toggleEnrollRoadmap } = useData();
  const [catalogFilter, setCatalogFilter] = useState('All');
  const [activeInspectorTopic, setActiveInspectorTopic] = useState(null);

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
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#e6edf3] flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-[#58a6ff]" /> Engineering Learning Paths
          </h1>
          <p className="text-xs text-[#8b949e] mt-1">
            Sectionized workspace: Track your enrolled paths above and explore the full computer science curriculum below.
          </p>
        </div>

        {/* Global Progress Pill */}
        <div className="bg-[#161b22] border border-[#30363d] px-4 py-2.5 rounded-lg flex items-center gap-3 self-start sm:self-auto shadow-sm">
          <div className="text-right">
            <p className="text-[10px] text-[#8b949e] font-semibold uppercase tracking-wider">Enrolled Tracks: {enrolledRoadmaps.length}</p>
            <p className="text-xs font-bold text-[#58a6ff]">{completedTopics} / {totalTopics} Milestones</p>
          </div>
          <div className="w-10 h-10 rounded-md border border-[#388bfd]/30 flex items-center justify-center font-bold text-xs text-[#e6edf3] bg-[#0d1117]">
            {overallPercentage}%
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 1: ACTIVE ENROLLED TRACKS (WORKSPACE) */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-1">
          <div>
            <h2 className="text-sm font-semibold text-[#e6edf3] flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-[#3fb950]" />
              Active Enrolled Tracks ({enrolledRoadmaps.length})
            </h2>
            <p className="text-[11px] text-[#8b949e]">
              Your ongoing curriculum. Mark topics as completed to dynamically boost your readiness metrics.
            </p>
          </div>
        </div>

        {enrolledRoadmaps.length === 0 ? (
          <div className="p-8 rounded-lg bg-[#161b22] border border-[#30363d] text-center space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#8b949e] mx-auto">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#e6edf3]">No Roadmaps Enrolled Yet</h3>
              <p className="text-xs text-[#8b949e] max-w-md mx-auto mt-1">
                Browse the catalog below and click <span className="text-[#58a6ff] font-semibold">"Enroll Track"</span> to add paths to your active workspace.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {enrolledRoadmaps.map((roadmap) => {
              const Icon = getIcon(roadmap.categoryGroup || roadmap.id);
              const total = roadmap.topics?.length || 0;
              const completed = roadmap.topics?.filter(t => t.completed).length || 0;
              const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

              return (
                <div
                  key={roadmap.id}
                  className="rounded-lg p-5 flex flex-col justify-between space-y-4 border bg-[#161b22] border-[#30363d] hover:border-[#58a6ff]/40 transition-colors shadow-sm"
                >
                  {/* Card Top */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-md bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#58a6ff]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#58a6ff] tracking-wider">
                            {roadmap.categoryGroup || 'Software Engineering'}
                          </span>
                          <h3 className="text-sm font-semibold text-[#e6edf3] flex items-center gap-2">
                            {roadmap.category}
                          </h3>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-[#3fb950] font-mono">{pct}%</span>
                    </div>

                    <p className="text-xs text-[#8b949e] mb-3 leading-relaxed">{roadmap.description}</p>

                    {/* Progress Bar */}
                    <div className="w-full bg-[#0d1117] h-1.5 rounded-full overflow-hidden border border-[#30363d]">
                      <div
                        className="h-full bg-[#238636] rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(2, pct)}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions / Unenroll */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#30363d]">
                    <span className="text-[11px] text-[#3fb950] font-medium">
                      ✓ {completed} of {total} Solved
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleEnrollRoadmap(roadmap.id)}
                      className="text-xs px-2.5 py-1 rounded-md font-medium text-[#8b949e] hover:text-[#f85149] hover:bg-[#f85149]/10 border border-[#30363d] transition-colors"
                    >
                      Leave Track
                    </button>
                  </div>

                  {/* Checklist Topics */}
                  <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                    {roadmap.topics?.map((topic) => (
                      <div
                        key={topic.id}
                        className={`p-2.5 rounded-md border transition-all flex items-center justify-between gap-2.5 ${
                          topic.completed
                            ? 'bg-[#238636]/10 border-[#238636]/30 text-[#e6edf3]'
                            : 'bg-[#0d1117] border-[#30363d] hover:border-[#58a6ff]/40 text-[#c9d1d9]'
                        }`}
                      >
                        <div
                          onClick={() => toggleRoadmapTopic(roadmap.id, topic.id)}
                          className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
                        >
                          {topic.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-[#3fb950] shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-[#484f58] hover:text-[#58a6ff] shrink-0 transition-colors" />
                          )}
                          <span className={`text-xs ${topic.completed ? 'text-[#8b949e] line-through' : 'text-[#c9d1d9]'}`}>
                            {topic.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {topic.resources && (
                            <button
                              type="button"
                              onClick={() => setActiveInspectorTopic({ topic, roadmapCategory: roadmap.category, roadmapId: roadmap.id })}
                              className="text-[10px] px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#58a6ff] font-mono transition flex items-center gap-1"
                              title="Inspect conceptual overview and docs"
                            >
                              <span>{topic.resources}</span>
                              <Sparkles className="w-2.5 h-2.5 text-[#58a6ff]" />
                            </button>
                          )}
                        </div>
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
      <div className="space-y-5 pt-4 border-t border-[#30363d]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-[#e6edf3] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#58a6ff]" />
              Explore Engineering Curriculum Catalog
            </h2>
            <p className="text-[11px] text-[#8b949e]">
              Curated tracks per software engineering discipline. Select any track to enroll in your workspace.
            </p>
          </div>
        </div>

        {/* Catalog Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 pb-1">
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => setCatalogFilter(group)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
                catalogFilter === group
                  ? 'bg-[#1f6feb] text-white'
                  : 'bg-[#21262d] text-[#8b949e] hover:text-[#c9d1d9] border border-[#30363d]'
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
                className={`rounded-lg p-4 flex flex-col justify-between space-y-4 border transition-all ${
                  isEnrolled
                    ? 'bg-[#161b22] border-[#388bfd]/50 shadow-sm'
                    : 'bg-[#161b22] border-[#30363d] hover:border-[#8b949e]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center border ${
                        isEnrolled ? 'bg-[#0d1117] text-[#58a6ff] border-[#388bfd]/40' : 'bg-[#0d1117] text-[#8b949e] border-[#30363d]'
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-[#8b949e]">
                          {roadmap.categoryGroup}
                        </span>
                        <h4 className="text-xs font-semibold text-[#e6edf3] leading-tight truncate max-w-[170px]">
                          {roadmap.category}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {(roleConfig.recommendedRoadmapIds || []).includes(roadmap.id) && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#388bfd]/10 text-[#58a6ff] border border-[#388bfd]/30 font-semibold">
                          🎯 {roleConfig.shortLabel}
                        </span>
                      )}
                      {isEnrolled && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#238636]/15 text-[#3fb950] border border-[#238636]/40 font-semibold">
                          Enrolled
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-[#8b949e] line-clamp-2 leading-relaxed">
                    {roadmap.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#30363d]">
                  <span className="text-[10px] text-[#8b949e]">
                    {total} Milestones • {isEnrolled ? `${completed} Done` : 'Available'}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleEnrollRoadmap(roadmap.id)}
                    className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
                      isEnrolled
                        ? 'bg-[#21262d] text-[#c9d1d9] hover:bg-[#da3633]/20 hover:text-[#f85149] border border-[#30363d]'
                        : 'bg-[#238636] hover:bg-[#2ea043] text-white'
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

      {/* Topic Inspector Modal */}
      <TopicInspectorModal
        isOpen={Boolean(activeInspectorTopic)}
        onClose={() => setActiveInspectorTopic(null)}
        topic={activeInspectorTopic?.topic}
        roadmapCategory={activeInspectorTopic?.roadmapCategory}
        onToggleComplete={() => {
          if (activeInspectorTopic?.roadmapId && activeInspectorTopic?.topic?.id) {
            toggleRoadmapTopic(activeInspectorTopic.roadmapId, activeInspectorTopic.topic.id);
            setActiveInspectorTopic(prev => prev ? ({
              ...prev,
              topic: {
                ...prev.topic,
                completed: !prev.topic.completed
              }
            }) : null);
          }
        }}
      />
    </div>
  );
};
export default Roadmaps;
