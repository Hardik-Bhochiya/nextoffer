import React from 'react';
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
  Sparkles
} from 'lucide-react';

export const Roadmaps = () => {
  const { roadmaps, toggleRoadmapTopic } = useData();

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-emerald-400" /> Full-Stack Placement Roadmaps
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Step-by-step verified curriculum covering Frontend, Backend, Database Architecture, and DevOps.
          </p>
        </div>

        {/* Global Progress Pill */}
        <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-3 self-start sm:self-auto">
          <div className="text-right">
            <p className="text-[11px] text-slate-400 font-medium">Overall Progress</p>
            <p className="text-xs font-bold text-emerald-400">{completedTopics} / {totalTopics} Completed</p>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-slate-800 flex items-center justify-center font-extrabold text-xs text-white bg-slate-900">
            {overallPercentage}%
          </div>
        </div>
      </div>

      {/* Roadmap Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roadmaps.map((roadmap) => {
          const Icon = getIcon(roadmap.id);
          const total = roadmap.topics?.length || 0;
          const completed = roadmap.topics?.filter(t => t.completed).length || 0;
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

          return (
            <div key={roadmap.id} className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-4">
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-950/70 border border-indigo-800/40 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">{roadmap.category}</h2>
                      <p className="text-[11px] text-slate-400">{completed} of {total} Milestones Solved</p>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-indigo-400">{pct}%</span>
                </div>

                <p className="text-xs text-slate-300 mb-3">{roadmap.description}</p>

                {/* Progress Bar */}
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Checklist Topics */}
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {roadmap.topics?.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => toggleRoadmapTopic(roadmap.id, topic.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      topic.completed
                        ? 'bg-emerald-950/20 border-emerald-900/30 text-slate-200'
                        : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {topic.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                      <span className={`text-xs font-medium truncate ${topic.completed ? 'text-slate-100' : ''}`}>
                        {topic.title}
                      </span>
                    </div>

                    {topic.resources && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800/90 text-indigo-300 shrink-0 font-medium">
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
