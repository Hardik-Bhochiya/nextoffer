import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  GitBranch,
  Layout,
  Server,
  Database,
  Cpu,
  CheckCircle2,
  Circle,
  ExternalLink,
  BookOpen,
  Sparkles,
  Target,
  Lock,
  Unlock,
  Check
} from 'lucide-react';

export const Roadmaps = () => {
  const { user } = useAuth();
  const { roadmaps, toggleRoadmapTopic, toggleEnrollRoadmap } = useData();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getIcon = (id) => {
    switch (id) {
      case 'frontend':
        return Layout;
      case 'backend':
        return Server;
      case 'database':
        return Database;
      case 'devops':
        return Cpu;
      default:
        return GitBranch;
    }
  };

  const totalTopics = roadmaps.reduce((acc, r) => acc + (r.topics?.length || 0), 0);
  const completedTopics = roadmaps.reduce((acc, r) => acc + (r.topics?.filter(t => t.completed).length || 0), 0);
  const overallPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  const enrolledCount = roadmaps.filter(r => r.isEnrolled).length;

  const filteredRoadmaps = selectedFilter === 'all'
    ? roadmaps
    : roadmaps.filter(r => r.id === selectedFilter);

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto pb-12">
      {/* Clean Professional Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-indigo-400" /> Full-Stack Placement Roadmaps
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Structured learning curriculum. Select and enroll in your focus tracks to begin marking milestones.
          </p>
        </div>

        {/* Global Progress Pill */}
        <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl flex items-center gap-3 self-start sm:self-auto shadow-sm">
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Tracks Progress</p>
            <p className="text-xs font-bold text-indigo-400">{completedTopics} / {totalTopics} Milestones</p>
          </div>
          <div className="w-11 h-11 rounded-xl border border-indigo-500/30 flex items-center justify-center font-bold text-xs text-slate-100 bg-slate-950">
            {overallPercentage}%
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-1 border-b border-slate-800/80">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`text-xs px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
            selectedFilter === 'all'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          All Tracks ({roadmaps.length})
        </button>
        {roadmaps.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelectedFilter(r.id)}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
              selectedFilter === r.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>{r.category}</span>
            {r.isEnrolled && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            )}
          </button>
        ))}
      </div>

      {/* Roadmap Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRoadmaps.map((roadmap) => {
          const Icon = getIcon(roadmap.id);
          const total = roadmap.topics?.length || 0;
          const completed = roadmap.topics?.filter(t => t.completed).length || 0;
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
          const isEnrolled = !!roadmap.isEnrolled;

          return (
            <div
              key={roadmap.id}
              className={`rounded-3xl p-6 flex flex-col justify-between space-y-4 border transition-all ${
                isEnrolled
                  ? 'bg-slate-900/90 border-indigo-900/50 shadow-md'
                  : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${
                      isEnrolled ? 'bg-indigo-950/80 border-indigo-700/50 text-indigo-400' : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white flex items-center gap-2">
                        {roadmap.category}
                        {isEnrolled && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                            Active Track
                          </span>
                        )}
                      </h2>
                      <p className="text-[11px] text-slate-400">
                        {completed} of {total} Milestones Solved
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-bold text-slate-200">{pct}%</span>
                </div>

                <p className="text-xs text-slate-300 mb-3 leading-relaxed">{roadmap.description}</p>

                {/* Progress Bar */}
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(2, pct)}%` }}
                  />
                </div>
              </div>

              {/* Enrollment Trigger / Status */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">
                  {isEnrolled ? '✓ Enrolled in this track' : 'Not enrolled yet'}
                </span>
                <button
                  type="button"
                  onClick={() => toggleEnrollRoadmap(roadmap.id)}
                  className={`text-xs px-3.5 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
                    isEnrolled
                      ? 'bg-slate-800 text-slate-300 hover:bg-rose-950 hover:text-rose-400 border border-slate-700'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                  }`}
                >
                  {isEnrolled ? (
                    <>
                      <Unlock className="w-3.5 h-3.5" /> Enrolled (Click to Leave)
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" /> Enroll in this Track
                    </>
                  )}
                </button>
              </div>

              {/* Checklist Topics */}
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {!isEnrolled && (
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center space-y-1 my-1">
                    <Lock className="w-5 h-5 text-slate-500 mx-auto" />
                    <p className="text-xs font-semibold text-slate-300">Enroll to Start This Roadmap</p>
                    <p className="text-[11px] text-slate-500">Click the "Enroll in this Track" button above to track your milestones.</p>
                  </div>
                )}

                {roadmap.topics?.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => {
                      if (!isEnrolled) {
                        toggleEnrollRoadmap(roadmap.id);
                      }
                      toggleRoadmapTopic(roadmap.id, topic.id);
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      topic.completed
                        ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-200 shadow-sm'
                        : isEnrolled
                        ? 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-400'
                        : 'bg-slate-950/30 border-slate-900 text-slate-600 opacity-60 hover:opacity-90'
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
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 shrink-0 font-mono">
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
    </div>
  );
};
export default Roadmaps;
