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
    const projId = project.id || project._id;
    const updatedMilestones = project.milestones.map((m, idx) =>
      idx === mIdx ? { ...m, completed: !m.completed } : m
    );
    const allCompleted = updatedMilestones.every(m => m.completed);
    updateProject(projId, {
      milestones: updatedMilestones,
      status: allCompleted ? 'Completed' : 'In Progress'
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#e6edf3] flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-[#58a6ff]" /> Capstone Projects & Showcase
          </h1>
          <p className="text-xs text-[#8b949e] mt-1">
            Build resume-worthy, industry-standard fullstack systems with structured milestone trackers.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-medium shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" /> Add Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((proj) => {
          const projId = proj.id || proj._id;
          const completedMilestones = proj.milestones?.filter(m => m.completed).length || 0;
          const totalMilestones = proj.milestones?.length || 1;
          const pct = Math.round((completedMilestones / totalMilestones) * 100);

          return (
            <div key={projId} className="rounded-lg bg-[#161b22] border border-[#30363d] p-5 flex flex-col justify-between space-y-4 hover:border-[#58a6ff]/40 transition-colors shadow-sm">
              <div>
                {/* Status & Delete */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                    proj.status === 'Completed'
                      ? 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/40'
                      : 'bg-[#bb8009]/15 text-[#d29922] border-[#bb8009]/40'
                  }`}>
                    {proj.status}
                  </span>
                  <button
                    onClick={() => deleteProject(projId)}
                    className="p-1 rounded text-[#8b949e] hover:text-[#f85149] hover:bg-[#21262d] transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Project Title & Description */}
                <h2 className="text-base font-bold text-[#e6edf3] mb-1.5">{proj.title}</h2>
                <p className="text-xs text-[#8b949e] leading-relaxed mb-4">{proj.description}</p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.techStack?.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0d1117] text-[#58a6ff] border border-[#30363d]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Milestones Checklist */}
                <div className="space-y-1.5 mb-4 bg-[#0d1117] p-3 rounded-md border border-[#30363d]">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8b949e] mb-2">Milestones ({completedMilestones}/{totalMilestones})</p>
                  {proj.milestones?.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      onClick={() => toggleMilestone(proj, mIdx)}
                      className="flex items-center gap-2 text-xs text-[#c9d1d9] hover:text-[#e6edf3] cursor-pointer py-1"
                    >
                      {m.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-[#484f58] hover:text-[#58a6ff] shrink-0" />
                      )}
                      <span className={m.completed ? 'line-through text-[#8b949e]' : ''}>{m.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#30363d]">
                <div className="flex items-center gap-3">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#8b949e] hover:text-[#58a6ff] transition-colors"
                    >
                      <GitBranch className="w-3.5 h-3.5" /> Repository
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#58a6ff] hover:underline transition-colors font-medium"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                </div>
                <span className="text-xs font-mono font-bold text-[#8b949e]">{pct}% Ready</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
              <h2 className="text-sm font-bold text-[#e6edf3] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#58a6ff]" /> Add Portfolio Project
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NextOffer - Placement Readiness Platform"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Description</label>
                <textarea
                  rows="3"
                  placeholder="Key features, problem solved, architecture details..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  placeholder="React, Node.js, Express, MongoDB, Tailwind CSS"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#c9d1d9] mb-1">GitHub URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={newGithub}
                    onChange={(e) => setNewGithub(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newLive}
                    onChange={(e) => setNewLive(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#30363d]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-medium shadow-sm"
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
export default Projects;
