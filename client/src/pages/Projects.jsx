import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  FolderGit2,
  Plus,
  ExternalLink,
  GitBranch,
  CheckCircle2,
  Circle,
  Trash2,
  Sparkles,
  X,
  Layers
} from 'lucide-react';

export const Projects = () => {
  const { projects, addProject, updateProject, deleteProject } = useData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTech, setNewTech] = useState('React, Node.js, Express, MongoDB, Tailwind CSS');
  const [newGithub, setNewGithub] = useState('');
  const [newLive, setNewLive] = useState('');
  const [newStatus, setNewStatus] = useState('In Progress');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addProject({
      title: newTitle.trim(),
      description: newDesc,
      techStack: newTech.split(',').map(s => s.trim()).filter(Boolean),
      githubUrl: newGithub,
      liveUrl: newLive,
      status: newStatus,
      milestones: [
        { title: 'Core architecture & UI setup', completed: true },
        { title: 'API Integration & state management', completed: newStatus === 'Completed' },
        { title: 'Testing & Production deployment', completed: newStatus === 'Completed' }
      ]
    });

    setNewTitle('');
    setNewDesc('');
    setNewGithub('');
    setNewLive('');
    setIsAddModalOpen(false);
  };

  const toggleMilestone = (project, mIdx) => {
    const updatedMilestones = project.milestones.map((m, idx) =>
      idx === mIdx ? { ...m, completed: !m.completed } : m
    );
    const allCompleted = updatedMilestones.every(m => m.completed);
    updateProject(project.id, {
      milestones: updatedMilestones,
      status: allCompleted ? 'Completed' : 'In Progress'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-indigo-400" /> Capstone Projects & Showcase
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build resume-worthy, industry-standard fullstack projects with milestone trackers.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => {
          const completedMilestones = proj.milestones?.filter(m => m.completed).length || 0;
          const totalMilestones = proj.milestones?.length || 1;
          const pct = Math.round((completedMilestones / totalMilestones) * 100);

          return (
            <div key={proj.id} className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all">
              <div>
                {/* Status & Delete */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    proj.status === 'Completed'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    {proj.status}
                  </span>
                  <button
                    onClick={() => deleteProject(proj.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Project Title & Description */}
                <h2 className="text-lg font-bold text-white mb-2">{proj.title}</h2>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{proj.description}</p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.techStack?.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-indigo-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Milestones Checklist */}
                <div className="space-y-2 mb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Milestones ({completedMilestones}/{totalMilestones})</p>
                  {proj.milestones?.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      onClick={() => toggleMilestone(proj, mIdx)}
                      className="flex items-center gap-2 text-xs text-slate-300 hover:text-white cursor-pointer py-0.5"
                    >
                      {m.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      )}
                      <span className={m.completed ? 'line-through text-slate-500' : ''}>{m.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      <GitBranch className="w-3.5 h-3.5" /> Repository
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-semibold"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                </div>
                <span className="text-xs font-bold text-slate-400">{pct}% Ready</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel bg-slate-900 border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" /> Add Portfolio Project
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NextOffer - AI Placement Platform"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows="3"
                  placeholder="Key features, problem solved, architecture..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  placeholder="React, Node.js, Express, MongoDB, Tailwind CSS"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={newGithub}
                    onChange={(e) => setNewGithub(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newLive}
                    onChange={(e) => setNewLive(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
