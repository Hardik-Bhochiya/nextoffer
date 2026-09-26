import React, { useState } from 'react';
import confetti from 'canvas-confetti';
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
  Compass,
  AlertTriangle,
  Users,
  Check,
  ExternalLink,
  Info
} from 'lucide-react';

import { allRoles, getRoleConfig } from '../data/rolesData';
import { TopicInspectorModal } from '../components/roadmaps/TopicInspectorModal';

export const Roadmaps = () => {
  const { user } = useAuth();
  const { roadmaps, toggleRoadmapTopic, toggleEnrollRoadmap, enrollBatchRoadmaps } = useData();
  const [activeTab, setActiveTab] = useState('All');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All');
  const [activeInspectorTopic, setActiveInspectorTopic] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const currentRole = user?.targetRole || 'Full Stack Software Engineer';
  const roleConfig = getRoleConfig(currentRole);

  const showSequentialToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(prev => prev === message ? null : prev);
    }, 4000);
  };

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

  // 4 Core CS Roadmap IDs
  const coreCsIds = ['cs-os', 'cs-dbms', 'cs-networks', 'cs-oop-lld'];
  const coreCsRoadmaps = roadmaps.filter(r => r.isCoreCS || coreCsIds.includes(r.id));
  const enrolledCoreCsCount = coreCsRoadmaps.filter(r => r.isEnrolled).length;

  // Role Compulsory Roadmaps
  const compulsoryIds = roleConfig.compulsoryRoadmapIds || [];
  const compulsoryRoadmaps = roadmaps.filter(r => compulsoryIds.includes(r.id));
  const enrolledCompulsoryCount = compulsoryRoadmaps.filter(r => r.isEnrolled).length;

  const totalTopics = roadmaps.reduce((acc, r) => acc + (r.topics?.length || 0), 0);
  const completedTopics = roadmaps.reduce((acc, r) => acc + (r.topics?.filter(t => t.completed).length || 0), 0);
  const overallPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  // Enrolled Tracks
  const enrolledRoadmaps = roadmaps.filter(r => r.isEnrolled);

  // Dynamic Tab Definitions with Counts
  const tabDefinitions = [
    { id: 'All', label: `All Tracks (${roadmaps.length})` },
    { id: 'CoreCS', label: `Universal Core CS (4)` },
    { id: 'Compulsory', label: `Compulsory for ${roleConfig.shortLabel} (${compulsoryIds.length})` },
    { id: 'DSA & Algorithms', label: `DSA & Algorithms (${roadmaps.filter(r => (r.categoryGroup || '').toLowerCase() === 'dsa & algorithms').length})` },
    { id: 'Frontend', label: `Frontend (${roadmaps.filter(r => (r.categoryGroup || '').toLowerCase() === 'frontend').length})` },
    { id: 'Backend', label: `Backend (${roadmaps.filter(r => (r.categoryGroup || '').toLowerCase() === 'backend').length})` },
    { id: 'System Design', label: `System Design (${roadmaps.filter(r => (r.categoryGroup || '').toLowerCase() === 'system design').length})` },
    { id: 'DevOps', label: `DevOps (${roadmaps.filter(r => (r.categoryGroup || '').toLowerCase() === 'devops').length})` },
    { id: 'AI & Data Science', label: `AI & Data Science (${roadmaps.filter(r => (r.categoryGroup || '').toLowerCase() === 'ai & data science').length})` },
    { id: 'Testing & QA', label: `Testing & QA (${roadmaps.filter(r => (r.categoryGroup || '').toLowerCase() === 'testing & qa').length})` },
  ];

  // Filter Catalog
  const filterRoadmaps = (list) => {
    return list.filter(r => {
      // 1. Tab Filtering
      let tabMatch = true;
      if (activeTab === 'CoreCS') {
        tabMatch = !!r.isCoreCS || coreCsIds.includes(r.id);
      } else if (activeTab === 'Compulsory') {
        tabMatch = compulsoryIds.includes(r.id);
      } else if (activeTab !== 'All') {
        tabMatch = (r.categoryGroup || '').toLowerCase() === activeTab.toLowerCase() || (r.category || '').toLowerCase().includes(activeTab.toLowerCase());
      }

      if (!tabMatch) return false;

      // 2. Role Dropdown Filtering
      if (selectedRoleFilter !== 'All') {
        const matchingRoleObj = allRoles.find(role => role.id === selectedRoleFilter || role.shortLabel === selectedRoleFilter);
        if (matchingRoleObj) {
          const roleTitle = matchingRoleObj.title.toLowerCase();
          const shortLabel = matchingRoleObj.shortLabel.toLowerCase();
          const applies = (r.applicableRoles || []).some(role => 
            role.toLowerCase().includes(shortLabel) || 
            role.toLowerCase().includes(roleTitle) ||
            roleTitle.includes(role.toLowerCase())
          );
          if (!applies && !r.isCoreCS) return false;
        }
      }

      return true;
    });
  };

  const visibleEnrolledRoadmaps = filterRoadmaps(enrolledRoadmaps);
  const visibleCatalogRoadmaps = filterRoadmaps(roadmaps);

  // Handle milestone click with sequential checks
  const handleMilestoneClick = async (roadmap, topicIndex) => {
    const topic = roadmap.topics[topicIndex];
    if (!topic) return;

    // If trying to complete, verify all previous milestones are completed
    if (!topic.completed) {
      for (let j = 0; j < topicIndex; j++) {
        if (!roadmap.topics[j].completed) {
          showSequentialToast(`⚠️ Prerequisite milestone locked! Complete Step ${j + 1}: "${roadmap.topics[j].title}" before proceeding.`);
          return;
        }
      }
    }

    const res = await toggleRoadmapTopic(roadmap.id, topic.id);
    if (res && res.success === false) {
      showSequentialToast(`⚠️ ${res.message || 'Prerequisite locked'}`);
    } else if (!topic.completed && topicIndex === roadmap.topics.length - 1) {
      // Completed the entire track!
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleEnrollAllCoreCS = async () => {
    if (enrollBatchRoadmaps) {
      await enrollBatchRoadmaps(coreCsIds);
    } else {
      for (const id of coreCsIds) {
        const r = roadmaps.find(item => item.id === id);
        if (r && !r.isEnrolled) {
          await toggleEnrollRoadmap(id);
        }
      }
    }
  };

  const handleEnrollAllCompulsory = async () => {
    if (enrollBatchRoadmaps) {
      await enrollBatchRoadmaps(compulsoryIds);
    } else {
      for (const id of compulsoryIds) {
        const r = roadmaps.find(item => item.id === id);
        if (r && !r.isEnrolled) {
          await toggleEnrollRoadmap(id);
        }
      }
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#da3633] text-white px-4 py-3 rounded-lg shadow-xl border border-red-400/40 flex items-center gap-3 text-xs font-semibold animate-slideUp">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#e6edf3] flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-[#58a6ff]" /> Engineering Curriculum & Structured Roadmaps
          </h1>
          <p className="text-xs text-[#8b949e] mt-1">
            23 Comprehensive Tracks • 4 Universal Core CS Subjects • 2–3 Compulsory Specialization Tracks for {roleConfig.title}
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
      {/* 2 COMPULSORY DUAL BANNERS (CORE CS & TARGET ROLE SPECIALIZATION) */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Banner 1: Universal Core CS */}
        <div className="p-4.5 rounded-lg bg-gradient-to-r from-[#161b22] via-[#0d1117] to-[#161b22] border border-[#388bfd]/40 shadow-sm flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#388bfd]/15 text-[#58a6ff] border border-[#388bfd]/30 flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> Universal Foundations
              </span>
              <span className="text-[10px] font-semibold text-[#3fb950] bg-[#238636]/15 px-2 py-0.5 rounded border border-[#238636]/30">
                Common for All CS Roles (4 Tracks)
              </span>
            </div>
            <h2 className="text-xs font-bold text-[#e6edf3]">
              The 4 Universal Core CS Subjects
            </h2>
            <p className="text-[11px] text-[#8b949e] leading-relaxed">
              Mandatory for top tech interviews across all roles: <span className="text-[#c9d1d9]">OS & Concurrency, DBMS & SQL, Computer Networks, OOP & LLD Design</span>.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#30363d]/60">
            <span className="text-[11px] font-mono text-[#58a6ff]">Enrolled: {enrolledCoreCsCount}/4</span>
            {enrolledCoreCsCount === 4 ? (
              <div className="px-3 py-1 rounded bg-[#238636]/15 border border-[#238636]/40 text-[#3fb950] text-[11px] font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> All 4 Active
              </div>
            ) : (
              <button
                type="button"
                onClick={handleEnrollAllCoreCS}
                className="px-3 py-1 rounded bg-[#1f6feb] hover:bg-[#388bfd] text-white text-[11px] font-semibold shadow transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Enroll All 4 Core CS
              </button>
            )}
          </div>
        </div>

        {/* Banner 2: Compulsory Domain Tracks for Role */}
        <div className="p-4.5 rounded-lg bg-gradient-to-r from-[#161b22] via-[#0d1117] to-[#161b22] border border-amber-500/40 shadow-sm flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Role Compulsory
              </span>
              <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                {roleConfig.shortLabel} Specialization ({compulsoryIds.length} Tracks)
              </span>
            </div>
            <h2 className="text-xs font-bold text-[#e6edf3]">
              Required Domain Tracks for {roleConfig.title}
            </h2>
            <p className="text-[11px] text-[#8b949e] leading-relaxed">
              Domain-specific compulsory roadmaps: <span className="text-amber-200">{roleConfig.compulsoryRoadmapTitles?.join(' • ') || 'Key domain tracks'}</span>.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#30363d]/60">
            <span className="text-[11px] font-mono text-amber-300">Enrolled: {enrolledCompulsoryCount}/{compulsoryIds.length}</span>
            {enrolledCompulsoryCount === compulsoryIds.length ? (
              <div className="px-3 py-1 rounded bg-[#238636]/15 border border-[#238636]/40 text-[#3fb950] text-[11px] font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> All Compulsory Active
              </div>
            ) : (
              <button
                type="button"
                onClick={handleEnrollAllCompulsory}
                className="px-3 py-1 rounded bg-[#d29922] hover:bg-[#e3b341] text-[#0d1117] text-[11px] font-bold shadow transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Enroll {roleConfig.shortLabel} Tracks ({compulsoryIds.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* FILTER CONTROLS: CATEGORIES & ROLE SELECTOR */}
      {/* ============================================================ */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {tabDefinitions.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1f6feb] text-white font-semibold shadow-sm'
                    : 'bg-[#21262d] text-[#8b949e] hover:text-[#c9d1d9] border border-[#30363d]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Role Dropdown Filter */}
          <div className="flex items-center gap-2 shrink-0">
            <Users className="w-3.5 h-3.5 text-[#8b949e]" />
            <span className="text-[11px] text-[#8b949e] font-medium">Filter Role:</span>
            <select
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value)}
              className="bg-[#161b22] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-[#58a6ff]"
            >
              <option value="All">All Roles (Universal)</option>
              {allRoles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.shortLabel}
                </option>
              ))}
            </select>
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
              Active Enrolled Workspace ({visibleEnrolledRoadmaps.length})
            </h2>
            <p className="text-[11px] text-[#8b949e]">
              Sequential milestone tracks. You must complete prior steps before unlocking downstream steps.
            </p>
          </div>
        </div>

        {visibleEnrolledRoadmaps.length === 0 ? (
          <div className="p-8 rounded-lg bg-[#161b22] border border-[#30363d] text-center space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#8b949e] mx-auto">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#e6edf3]">No Matching Enrolled Tracks</h3>
              <p className="text-xs text-[#8b949e] max-w-md mx-auto mt-1">
                Explore the engineering curriculum below and click <span className="text-[#58a6ff] font-semibold">"Enroll Track"</span> to add paths to your active workspace.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {visibleEnrolledRoadmaps.map((roadmap) => {
              const Icon = getIcon(roadmap.categoryGroup || roadmap.id);
              const total = roadmap.topics?.length || 0;
              const completed = roadmap.topics?.filter(t => t.completed).length || 0;
              const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
              const isCoreCS = roadmap.isCoreCS || coreCsIds.includes(roadmap.id);
              const isCompulsory = compulsoryIds.includes(roadmap.id);

              return (
                <div
                  key={roadmap.id}
                  className="rounded-lg p-5 flex flex-col justify-between space-y-4 border bg-[#161b22] border-[#30363d] hover:border-[#58a6ff]/40 transition-colors shadow-sm"
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-md bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#58a6ff] shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] uppercase font-bold text-[#58a6ff] tracking-wider">
                              {roadmap.categoryGroup || 'Software Engineering'}
                            </span>
                            {isCoreCS && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#388bfd]/15 text-[#58a6ff] border border-[#388bfd]/30 font-semibold">
                                Universal Core CS
                              </span>
                            )}
                            {isCompulsory && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
                                Compulsory ({roleConfig.shortLabel})
                              </span>
                            )}
                          </div>
                          <h3 className="text-sm font-semibold text-[#e6edf3]">
                            {roadmap.category}
                          </h3>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-[#3fb950] font-mono">{pct}%</span>
                    </div>

                    <p className="text-xs text-[#8b949e] mb-3 leading-relaxed">{roadmap.description}</p>

                    {/* Multi-role Tags */}
                    {roadmap.applicableRoles && roadmap.applicableRoles.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap mb-3">
                        <span className="text-[10px] text-[#8b949e] mr-1">Applies to:</span>
                        {roadmap.applicableRoles.slice(0, 3).map((role, rIdx) => (
                          <span
                            key={rIdx}
                            className="text-[9px] px-1.5 py-0.5 rounded bg-[#21262d] text-[#c9d1d9] border border-[#30363d]"
                          >
                            {role.split('(')[0].trim()}
                          </span>
                        ))}
                        {roadmap.applicableRoles.length > 3 && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e] border border-[#30363d]">
                            +{roadmap.applicableRoles.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Progress Bar */}
                    <div className="w-full bg-[#0d1117] h-1.5 rounded-full overflow-hidden border border-[#30363d]">
                      <div
                        className="h-full bg-[#238636] rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(2, pct)}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions / Track Header Control */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#30363d]">
                    <span className="text-[11px] text-[#3fb950] font-medium">
                      ✓ {completed} of {total} Solved (Strict Sequential)
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleEnrollRoadmap(roadmap.id)}
                      className="text-xs px-2.5 py-1 rounded-md font-medium text-[#8b949e] hover:text-[#f85149] hover:bg-[#f85149]/10 border border-[#30363d] transition-colors"
                    >
                      Leave Track
                    </button>
                  </div>

                  {/* Sequential Checklist Topics */}
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {roadmap.topics?.map((topic, tIdx) => {
                      // Sequential lock check: topic is locked if prior topic is not completed AND this topic is not completed
                      const isFirst = tIdx === 0;
                      const prevCompleted = isFirst || !!roadmap.topics[tIdx - 1]?.completed;
                      const isLocked = !prevCompleted && !topic.completed;
                      const isNextReady = prevCompleted && !topic.completed;
                      const prerequisiteTitle = !isFirst ? roadmap.topics[tIdx - 1]?.title : '';

                      return (
                        <div
                          key={topic.id}
                          className={`p-2.5 rounded-md border transition-all flex items-center justify-between gap-2.5 ${
                            topic.completed
                              ? 'bg-[#238636]/10 border-[#238636]/30 text-[#e6edf3]'
                              : isLocked
                              ? 'bg-[#0d1117]/60 border-[#21262d] text-[#6e7681] opacity-75'
                              : 'bg-[#0d1117] border-[#388bfd]/30 text-[#c9d1d9] shadow-sm'
                          }`}
                        >
                          <div
                            onClick={() => handleMilestoneClick(roadmap, tIdx)}
                            className={`flex items-center gap-2.5 min-w-0 flex-1 ${
                              isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
                            }`}
                            title={isLocked ? `Complete "${prerequisiteTitle}" first` : 'Click to toggle milestone'}
                          >
                            {topic.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-[#3fb950] shrink-0" />
                            ) : isLocked ? (
                              <Lock className="w-4 h-4 text-[#484f58] shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-[#58a6ff] hover:text-[#3fb950] shrink-0 transition-colors animate-pulse" />
                            )}

                            <div className="min-w-0 flex-1">
                              <span className={`text-xs block leading-tight ${topic.completed ? 'text-[#8b949e] line-through' : isLocked ? 'text-[#6e7681]' : 'text-[#e6edf3] font-medium'}`}>
                                {topic.title}
                              </span>
                              {isLocked && (
                                <span className="text-[10px] text-[#8b949e] block mt-0.5">
                                  🔒 Locked • Requires Step {tIdx}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => setActiveInspectorTopic({
                                topic,
                                roadmapCategory: roadmap.category,
                                roadmapId: roadmap.id,
                                isLocked,
                                prerequisiteTitle
                              })}
                              className={`text-[10px] px-2 py-0.5 rounded border font-mono transition flex items-center gap-1 ${
                                isLocked
                                  ? 'bg-[#161b22] border-[#30363d] text-[#8b949e] hover:text-[#c9d1d9]'
                                  : 'bg-[#21262d] hover:bg-[#30363d] border-[#30363d] text-[#58a6ff]'
                              }`}
                              title="Inspect conceptual overview and curated resources"
                            >
                              <span>Learn</span>
                              <Sparkles className="w-2.5 h-2.5 text-[#58a6ff]" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
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
              Explore All Engineering & Core CS Paths ({visibleCatalogRoadmaps.length})
            </h2>
            <p className="text-[11px] text-[#8b949e]">
              Click "Enroll Track" to activate any path into your strict sequential workspace.
            </p>
          </div>
        </div>

        {/* Catalog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleCatalogRoadmaps.map((roadmap) => {
            const Icon = getIcon(roadmap.categoryGroup || roadmap.id);
            const total = roadmap.topics?.length || 0;
            const completed = roadmap.topics?.filter(t => t.completed).length || 0;
            const isEnrolled = !!roadmap.isEnrolled;
            const isCoreCS = roadmap.isCoreCS || coreCsIds.includes(roadmap.id);
            const isCompulsory = compulsoryIds.includes(roadmap.id);

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
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center border shrink-0 ${
                        isEnrolled ? 'bg-[#0d1117] text-[#58a6ff] border-[#388bfd]/40' : 'bg-[#0d1117] text-[#8b949e] border-[#30363d]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[9px] uppercase font-bold text-[#8b949e]">
                            {roadmap.categoryGroup}
                          </span>
                          {isCoreCS && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#388bfd]/15 text-[#58a6ff] border border-[#388bfd]/30 font-semibold">
                              Universal Core CS
                            </span>
                          )}
                          {isCompulsory && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
                              Compulsory ({roleConfig.shortLabel})
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs font-semibold text-[#e6edf3] leading-tight line-clamp-1">
                          {roadmap.category}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {isEnrolled && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#238636]/15 text-[#3fb950] border border-[#238636]/40 font-semibold">
                          Active
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-[#8b949e] line-clamp-2 leading-relaxed">
                    {roadmap.description}
                  </p>

                  {/* Multi-role badges */}
                  {roadmap.applicableRoles && (
                    <div className="flex items-center gap-1 flex-wrap pt-1">
                      {roadmap.applicableRoles.slice(0, 2).map((role, rIdx) => (
                        <span
                          key={rIdx}
                          className="text-[8px] px-1.5 py-0.5 rounded bg-[#0d1117] text-[#8b949e] border border-[#30363d]"
                        >
                          {role.split('(')[0].trim()}
                        </span>
                      ))}
                      {roadmap.applicableRoles.length > 2 && (
                        <span className="text-[8px] px-1 py-0.5 rounded bg-[#0d1117] text-[#8b949e] border border-[#30363d]">
                          +{roadmap.applicableRoles.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#30363d]">
                  <span className="text-[10px] text-[#8b949e]">
                    {total} Milestones • {isEnrolled ? `${completed} Done` : 'Sequential'}
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
        isLocked={activeInspectorTopic?.isLocked}
        prerequisiteTitle={activeInspectorTopic?.prerequisiteTitle}
        onToggleComplete={async () => {
          if (activeInspectorTopic?.roadmapId && activeInspectorTopic?.topic?.id) {
            const topicId = activeInspectorTopic.topic.id;
            const roadmapId = activeInspectorTopic.roadmapId;
            const res = await toggleRoadmapTopic(roadmapId, topicId);
            if (res && res.success === false) {
              showSequentialToast(`⚠️ ${res.message || 'Prerequisite locked'}`);
            } else {
              setActiveInspectorTopic(prev => prev ? ({
                ...prev,
                topic: {
                  ...prev.topic,
                  completed: !prev.topic.completed
                }
              }) : null);
            }
          }
        }}
      />
    </div>
  );
};

export default Roadmaps;
