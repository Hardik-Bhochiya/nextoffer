import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import {
  FolderGit2,
  Plus,
  ExternalLink,
  GitBranch,
  CheckCircle2,
  Trash2,
  Edit3,
  Lock,
  PlayCircle,
  Globe,
  Search,
  Layers,
  X,
  Check,
  AlertCircle,
  Server,
  Layout,
  Cpu,
  Workflow,
  Smartphone,
  Boxes,
  ShieldCheck,
  RefreshCw,
  Sliders,
  BookOpen,
  HelpCircle,
  Lightbulb,
  CheckSquare,
  Wrench,
  Copy
} from 'lucide-react';
import {
  ARCHITECTURE_TYPES,
  getArchitectureTypeConfig
} from '../data/projectTypesData';

const formatExternalUrl = (rawUrl) => {
  if (!rawUrl) return '';
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

const renderTypeIcon = (iconName, className = 'w-3.5 h-3.5') => {
  switch (iconName) {
    case 'Server':
      return <Server className={className} />;
    case 'Layout':
      return <Layout className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'Workflow':
      return <Workflow className={className} />;
    case 'Smartphone':
      return <Smartphone className={className} />;
    case 'Boxes':
      return <Boxes className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Globe':
    default:
      return <Globe className={className} />;
  }
};

export const Projects = () => {
  const { projects = [], addProject, updateProject, deleteProject } = useData();

  // Search & Filter state
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
  const [activeStepGuide, setActiveStepGuide] = useState(null); // { milestone, archType }

  // Add Form State (Clean & Uncluttered)
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newArchType, setNewArchType] = useState(ARCHITECTURE_TYPES[0].title);
  const [newTech, setNewTech] = useState(ARCHITECTURE_TYPES[0].defaultTech);
  const [newGithub, setNewGithub] = useState('');
  const [newLive, setNewLive] = useState('');
  const [newStatus, setNewStatus] = useState('In Progress'); // 'In Progress', 'Planning', 'On Hold'
  const [newMilestones, setNewMilestones] = useState(ARCHITECTURE_TYPES[0].milestones);
  const [newMilestoneInput, setNewMilestoneInput] = useState('');

  // Edit Form State
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editArchType, setEditArchType] = useState(ARCHITECTURE_TYPES[0].title);
  const [editTech, setEditTech] = useState('');
  const [editGithub, setEditGithub] = useState('');
  const [editLive, setEditLive] = useState('');
  const [editStatus, setEditStatus] = useState('In Progress');
  const [editMilestones, setEditMilestones] = useState([]);
  const [editMilestoneInput, setEditMilestoneInput] = useState('');

  // Toast / Feedback message
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, isError = false) => {
    setToastMessage({ text: msg, isError });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Open Add Modal with clean defaults
  const handleOpenAddModal = () => {
    const defaultArch = ARCHITECTURE_TYPES[0];
    setNewTitle('');
    setNewDesc('');
    setNewArchType(defaultArch.title);
    setNewTech(defaultArch.defaultTech);
    setNewGithub('');
    setNewLive('');
    setNewStatus('In Progress');
    setNewMilestones(defaultArch.milestones.map(m => ({ ...m, completed: false })));
    setNewMilestoneInput('');
    setIsAddModalOpen(true);
  };

  // Handle Architecture Type Change in Add Form
  const handleSelectAddArchType = (typeTitle) => {
    const config = getArchitectureTypeConfig(typeTitle);
    setNewArchType(config.title);
    setNewTech(config.defaultTech);
    setNewMilestones(config.milestones.map(m => ({ ...m, completed: false })));
    showToast(`Loaded ${config.shortLabel} 8-step lifecycle`);
  };

  // Submit Add Project
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Status logic: Completed is purely automatic if all milestones are checked
    const allDone = newMilestones.length > 0 && newMilestones.every(m => m.completed);
    const resolvedStatus = allDone ? 'Completed' : newStatus === 'Completed' ? 'In Progress' : newStatus;

    try {
      await addProject({
        title: newTitle.trim(),
        description: newDesc.trim(),
        category: newArchType,
        projectType: newArchType,
        techStack: newTech.split(',').map(s => s.trim()).filter(Boolean),
        githubUrl: formatExternalUrl(newGithub),
        liveUrl: formatExternalUrl(newLive),
        status: resolvedStatus,
        milestones: newMilestones
      });

      showToast(`Created project "${newTitle.trim()}"!`);
      setIsAddModalOpen(false);
    } catch (err) {
      showToast('Failed to create project', true);
    }
  };

  // Open Edit Modal
  const handleOpenEditModal = (project) => {
    const currentArchConfig = getArchitectureTypeConfig(project.projectType || project.category);
    setEditingProject(project);
    setEditTitle(project.title || '');
    setEditDesc(project.description || '');
    setEditArchType(project.projectType || currentArchConfig.title);
    setEditTech(Array.isArray(project.techStack) ? project.techStack.join(', ') : '');
    setEditGithub(project.githubUrl || '');
    setEditLive(project.liveUrl || '');
    // If project is currently completed, show 'In Progress' as the base selectable status for when milestones reopen
    setEditStatus(project.status === 'Completed' ? 'In Progress' : project.status || 'In Progress');
    setEditMilestones(
      Array.isArray(project.milestones) && project.milestones.length > 0
        ? project.milestones.map(m => ({ ...m }))
        : currentArchConfig.milestones.map(m => ({ ...m, completed: false }))
    );
    setEditMilestoneInput('');
  };

  // Handle Architecture Type Change in Edit Form
  const handleSelectEditArchType = (typeTitle, reloadMilestones = false) => {
    const config = getArchitectureTypeConfig(typeTitle);
    setEditArchType(config.title);
    if (!editTech) setEditTech(config.defaultTech);
    if (reloadMilestones) {
      setEditMilestones(config.milestones.map(m => ({ ...m, completed: false })));
      showToast(`Loaded ${config.shortLabel} lifecycle template`);
    }
  };

  // Reload template milestones in Edit Form
  const handleReloadEditMilestonesTemplate = () => {
    const config = getArchitectureTypeConfig(editArchType);
    setEditMilestones(config.milestones.map(m => ({ ...m, completed: false })));
    showToast(`Reset to ${config.shortLabel} 8-step lifecycle`);
  };

  // Submit Edit Project
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editTitle.trim() || !editingProject) return;

    const projId = editingProject.id || editingProject._id;
    // Automatic status determination: 'Completed' if all done, else user's selected status
    const allDone = editMilestones.length > 0 && editMilestones.every(m => m.completed);
    const resolvedStatus = allDone ? 'Completed' : editStatus === 'Completed' ? 'In Progress' : editStatus;

    try {
      await updateProject(projId, {
        title: editTitle.trim(),
        description: editDesc.trim(),
        category: editArchType,
        projectType: editArchType,
        techStack: editTech.split(',').map(s => s.trim()).filter(Boolean),
        githubUrl: formatExternalUrl(editGithub),
        liveUrl: formatExternalUrl(editLive),
        status: resolvedStatus,
        milestones: editMilestones
      });

      showToast(`Updated "${editTitle.trim()}"!`);
      setEditingProject(null);
    } catch (err) {
      showToast('Failed to update project', true);
    }
  };

  // Sequential Milestone Toggle Enforcement with Automatic Status Synchronization
  const handleToggleMilestone = (project, mIdx) => {
    const projId = project.id || project._id;
    const milestones = project.milestones || [];
    const target = milestones[mIdx];
    if (!target) return;

    if (!target.completed) {
      // Trying to complete this milestone: check if all preceding milestones are completed
      const prevIncompleteIdx = milestones.findIndex((m, idx) => idx < mIdx && !m.completed);
      if (prevIncompleteIdx !== -1) {
        const prevTitle = milestones[prevIncompleteIdx]?.title || `Milestone #${prevIncompleteIdx + 1}`;
        showToast(`Sequential order: Please complete "${prevTitle}" before unlocking this step.`, true);
        return;
      }

      // Mark completed
      const updated = milestones.map((m, idx) =>
        idx === mIdx ? { ...m, completed: true } : m
      );
      const allDone = updated.length > 0 && updated.every(m => m.completed);

      // Status is automatically 'Completed' when all milestones are done
      updateProject(projId, {
        milestones: updated,
        status: allDone ? 'Completed' : project.status === 'Planning' ? 'In Progress' : project.status
      });

      if (allDone) {
        showToast(`🎉 All milestones completed! Project marked as Completed.`);
      } else {
        showToast(`Completed milestone: ${target.title}`);
      }
    } else {
      // Unchecking: uncheck this milestone and any subsequent ones that depended on it
      const updated = milestones.map((m, idx) =>
        idx >= mIdx ? { ...m, completed: false } : m
      );

      // Automatic reversion: if project was 'Completed', revert to 'In Progress'
      updateProject(projId, {
        milestones: updated,
        status: project.status === 'Completed' ? 'In Progress' : project.status
      });
      showToast(`Reopened milestone: ${target.title}`);
    }
  };

  // Milestone manager helpers
  const handleAddMilestoneToAddForm = () => {
    if (!newMilestoneInput.trim()) return;
    setNewMilestones([
      ...newMilestones,
      { title: newMilestoneInput.trim(), phase: 'Custom', completed: false }
    ]);
    setNewMilestoneInput('');
  };

  const handleRemoveMilestoneFromAddForm = (index) => {
    if (newMilestones.length <= 1) return;
    setNewMilestones(newMilestones.filter((_, i) => i !== index));
  };

  const handleAddMilestoneToEditForm = () => {
    if (!editMilestoneInput.trim()) return;
    setEditMilestones([
      ...editMilestones,
      { title: editMilestoneInput.trim(), phase: 'Custom', completed: false }
    ]);
    setEditMilestoneInput('');
  };

  const handleRemoveMilestoneFromEditForm = (index) => {
    if (editMilestones.length <= 1) return;
    setEditMilestones(editMilestones.filter((_, i) => i !== index));
  };

  // Open Step Learning Guide
  const handleOpenStepGuide = (milestone, archTypeTitle) => {
    const archConfig = getArchitectureTypeConfig(archTypeTitle);
    // Find matching milestone guide from template or build a fallback
    const matched = archConfig.milestones.find(
      m => m.title.toLowerCase().trim() === milestone.title.toLowerCase().trim() ||
           m.title.includes(milestone.title) ||
           milestone.title.includes(m.title)
    );

    const guideData = milestone.guide || matched?.guide || {
      overview: `Implement the core engineering requirements for "${milestone.title}". Focus on modular code, boundary testing, and clean architecture.`,
      keyTasks: [
        `Clarify requirements and edge cases for ${milestone.title}`,
        'Write modular, testable implementation code with clean separation of concerns',
        'Add error handling, input validation, and logging',
        'Verify functionality with unit/integration test assertions'
      ],
      recommendedTools: ['Git / GitHub', 'VS Code / IDE', 'Postman / Chrome DevTools'],
      interviewTip: `Explain the trade-offs, architecture choices, and challenges you overcame while implementing this stage.`
    };

    setActiveStepGuide({
      milestoneTitle: milestone.title,
      phase: milestone.phase || matched?.phase || 'Engineering',
      archTitle: archConfig.title,
      shortLabel: archConfig.shortLabel,
      guide: guideData
    });
  };

  // Filtered Projects List
  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const q = search.toLowerCase().trim();
      const projArch = proj.projectType || proj.category || 'Full Stack Web Application';
      const milestones = Array.isArray(proj.milestones) ? proj.milestones : [];
      const isCompleted = milestones.length > 0 && milestones.every(m => m.completed);
      const computedStatus = isCompleted ? 'Completed' : (proj.status === 'Completed' ? 'In Progress' : proj.status || 'In Progress');

      const matchSearch =
        !q ||
        proj.title?.toLowerCase().includes(q) ||
        proj.description?.toLowerCase().includes(q) ||
        projArch.toLowerCase().includes(q) ||
        (Array.isArray(proj.techStack) && proj.techStack.some(t => t.toLowerCase().includes(q))) ||
        milestones.some(m => m.title?.toLowerCase().includes(q));

      const matchStatus = selectedStatus === 'All' || computedStatus === selectedStatus;
      const matchType = selectedType === 'All' || projArch === selectedType;

      return matchSearch && matchStatus && matchType;
    });
  }, [projects, search, selectedStatus, selectedType]);

  // Telemetry Stats
  const stats = useMemo(() => {
    const total = projects.length;
    let completed = 0;
    let inProgress = 0;
    let totalMilestones = 0;
    let completedMilestones = 0;
    let deployed = 0;

    projects.forEach(p => {
      const milestones = Array.isArray(p.milestones) ? p.milestones : [];
      const isCompleted = milestones.length > 0 && milestones.every(m => m.completed);
      if (isCompleted) {
        completed++;
      } else {
        inProgress++;
      }
      if (p.liveUrl) deployed++;
      totalMilestones += milestones.length;
      completedMilestones += milestones.filter(m => m.completed).length;
    });

    const completionRate = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

    return { total, completed, inProgress, deployed, completionRate };
  }, [projects]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 animate-fadeIn">
      {/* Toast Alert */}
      {toastMessage && (
        <div
          className={`fixed top-18 right-6 z-50 px-3.5 py-2 rounded-md shadow-xl text-xs font-medium border flex items-center gap-2 animate-fadeIn ${
            toastMessage.isError
              ? 'bg-[#da3633]/15 text-[#f85149] border-[#da3633]/40'
              : 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/40'
          }`}
        >
          {toastMessage.isError ? <AlertCircle className="w-4 h-4 shrink-0" /> : <Check className="w-4 h-4 shrink-0" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#e6edf3] flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-[#58a6ff]" /> Projects
            <span className="text-xs font-normal text-[#8b949e] px-2 py-0.5 rounded-full bg-[#161b22] border border-[#30363d] font-mono">
              {projects.length} Total
            </span>
          </h1>
          <p className="text-xs text-[#8b949e] mt-1">
            Build resume-worthy engineering systems with sequential lifecycle hierarchies and interactive learning guides.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/30 text-white text-xs font-medium shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" /> Add Project
        </button>
      </div>

      {/* Stats Telemetry Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d]">
          <span className="text-[11px] text-[#8b949e] block">Total Systems</span>
          <span className="text-lg font-bold text-[#e6edf3] font-mono">{stats.total}</span>
        </div>

        <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d]">
          <span className="text-[11px] text-[#8b949e] block">Live & Deployed</span>
          <span className="text-lg font-bold text-[#3fb950] font-mono flex items-center gap-1">
            {stats.deployed} <Globe className="w-3.5 h-3.5 text-[#3fb950]" />
          </span>
        </div>

        <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d]">
          <span className="text-[11px] text-[#8b949e] block">Fully Completed</span>
          <span className="text-lg font-bold text-[#58a6ff] font-mono">{stats.completed}</span>
        </div>

        <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d]">
          <span className="text-[11px] text-[#8b949e] block">Overall Milestones Done</span>
          <span className="text-lg font-bold text-[#d29922] font-mono">{stats.completionRate}%</span>
        </div>
      </div>

      {/* Architecture Type Quick Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sliders className="w-3 h-3 text-[#58a6ff]" /> Types:
        </span>
        <button
          onClick={() => setSelectedType('All')}
          className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
            selectedType === 'All'
              ? 'bg-[#58a6ff] text-white shadow-sm'
              : 'bg-[#161b22] text-[#8b949e] hover:text-[#c9d1d9] border border-[#30363d]'
          }`}
        >
          All Types
        </button>
        {ARCHITECTURE_TYPES.map((arch) => {
          const isSelected = selectedType === arch.title;
          return (
            <button
              key={arch.id}
              onClick={() => setSelectedType(isSelected ? 'All' : arch.title)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all shrink-0 cursor-pointer border ${
                isSelected
                  ? 'bg-[#1f6feb]/20 text-[#58a6ff] border-[#388bfd]'
                  : 'bg-[#161b22] text-[#8b949e] hover:text-[#c9d1d9] border-[#30363d]'
              }`}
            >
              {renderTypeIcon(arch.iconName, 'w-3 h-3')}
              <span>{arch.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#161b22] p-3 rounded-lg border border-[#30363d]">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects, architecture types, tech stacks, or milestone steps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-8 pr-3 py-1.5 text-xs text-[#e6edf3] placeholder-[#6e7681] focus:outline-none focus:border-[#58a6ff]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#c9d1d9] focus:outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed (Auto)</option>
            <option value="Planning">Planning</option>
            <option value="On Hold">On Hold</option>
          </select>

          {(search || selectedStatus !== 'All' || selectedType !== 'All') && (
            <button
              onClick={() => { setSearch(''); setSelectedStatus('All'); setSelectedType('All'); }}
              className="text-[#8b949e] hover:text-[#f85149] hover:underline text-xs cursor-pointer whitespace-nowrap px-1"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid: Balanced, Structured 2-Column Responsive Layout */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-10 text-center space-y-3">
          <div className="w-10 h-10 rounded-md bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#58a6ff] mx-auto">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#e6edf3]">
              {projects.length === 0 ? 'No Portfolio Projects Added Yet' : 'No Projects Match Filters'}
            </h3>
            <p className="text-xs text-[#8b949e] max-w-md mx-auto mt-1">
              {projects.length === 0
                ? 'Create projects with domain-specific sequential milestones (Full Stack, Backend, AI/ML, DevOps, Mobile, System Design LLD, or SDET).'
                : 'Try adjusting your search query or reset status and architecture filters.'}
            </p>
          </div>
          {projects.length === 0 ? (
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/30 text-white text-xs font-medium shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add First Project
            </button>
          ) : (
            <button
              onClick={() => { setSearch(''); setSelectedStatus('All'); setSelectedType('All'); }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          {filteredProjects.map((proj) => {
            const projId = proj.id || proj._id;
            const projArchTitle = proj.projectType || proj.category || 'Full Stack Web Application';
            const archConfig = getArchitectureTypeConfig(projArchTitle);

            const milestones = Array.isArray(proj.milestones) ? proj.milestones : [];
            const completedCount = milestones.filter(m => m.completed).length;
            const totalCount = milestones.length;
            const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
            const isCompletedAuto = totalCount > 0 && completedCount === totalCount;
            const displayStatus = isCompletedAuto ? 'Completed' : proj.status;

            const formattedGithub = formatExternalUrl(proj.githubUrl);
            const formattedLive = formatExternalUrl(proj.liveUrl);

            return (
              <div
                key={projId}
                className="rounded-lg bg-[#161b22] border border-[#30363d] p-5 flex flex-col justify-between space-y-4 hover:border-[#58a6ff]/40 transition-colors shadow-sm h-full"
              >
                <div>
                  {/* Top Bar: Architecture Badge, Auto Status, Action Icons */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                      {/* Architecture Badge */}
                      <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${archConfig.badgeColor}`}>
                        {renderTypeIcon(archConfig.iconName, 'w-3 h-3')}
                        <span>{archConfig.shortLabel}</span>
                      </span>

                      {/* Status Badge (Automatic for Completed) */}
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                          displayStatus === 'Completed'
                            ? 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/40'
                            : displayStatus === 'Planning'
                            ? 'bg-[#1f6feb]/15 text-[#58a6ff] border-[#388bfd]/40'
                            : 'bg-[#bb8009]/15 text-[#d29922] border-[#bb8009]/40'
                        }`}
                      >
                        {displayStatus === 'Completed' ? '✓ Completed' : displayStatus}
                      </span>
                    </div>

                    {/* Edit & Delete Buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(proj)}
                        className="p-1 rounded text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#21262d] transition-colors cursor-pointer"
                        title="Edit Project & Milestones"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmationId(projId)}
                        className="p-1 rounded text-[#8b949e] hover:text-[#f85149] hover:bg-[#21262d] transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-base font-bold text-[#e6edf3] mb-1.5 flex items-center gap-2">
                    {proj.title}
                  </h2>
                  <p className="text-xs text-[#8b949e] leading-relaxed mb-3 line-clamp-2">
                    {proj.description || 'No detailed architecture description provided.'}
                  </p>

                  {/* Tech Stack Badges */}
                  {Array.isArray(proj.techStack) && proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      {proj.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0d1117] text-[#c9d1d9] border border-[#30363d]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Sequential Milestones Section */}
                  <div className="bg-[#0d1117] p-3 rounded-md border border-[#30363d] space-y-2">
                    <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-[#21262d]">
                      <span className="font-semibold text-[#c9d1d9] flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#58a6ff]" />
                        Sequential Lifecycle ({completedCount}/{totalCount})
                      </span>
                      <span className="font-mono font-bold text-xs text-[#58a6ff]">{pct}% Done</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-[#21262d] h-1.5 rounded-full overflow-hidden mb-2">
                      <div
                        className={`h-full transition-all duration-300 ${
                          pct === 100 ? 'bg-[#3fb950]' : 'bg-[#58a6ff]'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    {/* Sequential Milestones Checklist with Learning Guides */}
                    <div className="space-y-1 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                      {milestones.map((m, mIdx) => {
                        const isPrevDone = mIdx === 0 || milestones[mIdx - 1]?.completed;
                        const isLocked = !m.completed && !isPrevDone;
                        const isCurrentActive = !m.completed && isPrevDone;

                        return (
                          <div
                            key={mIdx}
                            className={`group flex items-start gap-2 text-xs py-1.5 px-2 rounded-md transition-all ${
                              isLocked
                                ? 'text-[#484f58] bg-[#161b22]/30'
                                : m.completed
                                ? 'text-[#8b949e] hover:bg-[#161b22]'
                                : 'text-[#f0f6fc] hover:bg-[#1f6feb]/10 hover:border-[#388bfd]/30 border border-transparent'
                            }`}
                          >
                            {/* Toggle Tick Box */}
                            <div
                              onClick={() => handleToggleMilestone(proj, mIdx)}
                              className="mt-0.5 shrink-0 cursor-pointer"
                              title={
                                isLocked
                                  ? `Locked: Complete previous milestone "${milestones[mIdx - 1]?.title}" first.`
                                  : m.completed
                                  ? 'Click to uncheck milestone (will uncheck subsequent milestones)'
                                  : 'Click to complete milestone'
                              }
                            >
                              {m.completed ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950]" />
                              ) : isCurrentActive ? (
                                <PlayCircle className="w-3.5 h-3.5 text-[#58a6ff] animate-pulse" />
                              ) : (
                                <Lock className="w-3.5 h-3.5 text-[#484f58]" />
                              )}
                            </div>

                            {/* Title & Phase */}
                            <div
                              onClick={() => handleToggleMilestone(proj, mIdx)}
                              className="flex-1 min-w-0 cursor-pointer"
                            >
                              <span
                                className={`text-xs block ${
                                  m.completed
                                    ? 'line-through text-[#6e7681]'
                                    : isCurrentActive
                                    ? 'font-medium text-[#f0f6fc]'
                                    : 'text-[#6e7681]'
                                }`}
                              >
                                {m.title}
                              </span>
                            </div>

                            {/* Step Learning Guide Button ("if i have to learn about that specific step") */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenStepGuide(m, projArchTitle);
                              }}
                              className="p-1 rounded text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#21262d] transition-colors shrink-0 cursor-pointer"
                              title="Open Step Implementation & Learning Guide"
                            >
                              <BookOpen className="w-3 h-3 text-[#58a6ff]" />
                            </button>

                            {/* Badge */}
                            {m.completed ? (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30 shrink-0">
                                Done
                              </span>
                            ) : isCurrentActive ? (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#1f6feb]/20 text-[#58a6ff] border border-[#388bfd]/40 font-semibold shrink-0">
                                Ready
                              </span>
                            ) : (
                              <span className="text-[9px] font-mono text-[#484f58] shrink-0">
                                Locked
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: Live & Repo Links */}
                <div className="flex items-center justify-between pt-3 border-t border-[#30363d] text-xs mt-auto">
                  <div className="flex items-center gap-2">
                    {/* GitHub Repo Link */}
                    {formattedGithub ? (
                      <a
                        href={formattedGithub}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-white border border-[#30363d] transition-colors font-medium cursor-pointer"
                        title={`Open repository: ${formattedGithub}`}
                      >
                        <GitBranch className="w-3.5 h-3.5 text-[#58a6ff]" />
                        <span>Repository</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(proj)}
                        className="inline-flex items-center gap-1 text-[#6e7681] hover:text-[#8b949e] text-[11px] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Add Repo
                      </button>
                    )}

                    {/* Live Demo Link */}
                    {formattedLive ? (
                      <a
                        href={formattedLive}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#238636]/15 hover:bg-[#238636]/25 text-[#3fb950] hover:text-[#56d364] border border-[#238636]/40 transition-colors font-semibold cursor-pointer"
                        title={`Open live app: ${formattedLive}`}
                      >
                        <Globe className="w-3.5 h-3.5 text-[#3fb950]" />
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(proj)}
                        className="inline-flex items-center gap-1 text-[#6e7681] hover:text-[#8b949e] text-[11px] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Add Live Link
                      </button>
                    )}
                  </div>

                  <span className="text-[11px] font-mono text-[#8b949e]">
                    {isCompletedAuto ? (
                      <span className="text-[#3fb950] font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Production Ready
                      </span>
                    ) : (
                      `${totalCount - completedCount} stages left`
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CLEAN, STREAMLINED ADD PROJECT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
              <div>
                <h2 className="text-sm font-bold text-[#e6edf3] flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#58a6ff]" /> Add Project
                </h2>
                <p className="text-[11px] text-[#8b949e] mt-0.5">
                  Pick an architecture type to automatically set up the industry-standard 8-step lifecycle.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              {/* Architecture Type & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#58a6ff] mb-1 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" /> Architecture Type *
                  </label>
                  <select
                    value={newArchType}
                    onChange={(e) => handleSelectAddArchType(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff] cursor-pointer"
                  >
                    {ARCHITECTURE_TYPES.map(arch => (
                      <option key={arch.id} value={arch.title}>{arch.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c9d1d9] mb-1">
                    Initial Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff] cursor-pointer"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Planning">Planning</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                  <span className="text-[10px] text-[#8b949e] block mt-1">
                    * Completed is automatically marked when all 8 milestones are done.
                  </span>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Real-Time Distributed Task Queue & Broker"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Architecture & Problem Solved (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="Key features, scalability choices, bottlenecks solved, and system goals..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#c9d1d9] mb-1">GitHub / Repo URL</label>
                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={newGithub}
                    onChange={(e) => setNewGithub(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Live Demo / Deployed URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={newLive}
                    onChange={(e) => setNewLive(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>
              </div>

              {/* Milestones Checklist Preview & Customizer */}
              <div className="space-y-2 pt-2 border-t border-[#30363d]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#e6edf3] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#58a6ff]" />
                    {getArchitectureTypeConfig(newArchType).shortLabel} Milestones ({newMilestones.length} Stages)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleSelectAddArchType(newArchType)}
                    className="text-[11px] text-[#58a6ff] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset Template
                  </button>
                </div>

                {/* Milestone list */}
                <div className="max-h-40 overflow-y-auto space-y-1.5 p-2 bg-[#0d1117] rounded-md border border-[#30363d]">
                  {newMilestones.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs bg-[#161b22] p-1.5 rounded border border-[#21262d]">
                      <span className="w-5 h-5 rounded-full bg-[#21262d] text-[#8b949e] flex items-center justify-center text-[10px] font-mono shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={m.title}
                        onChange={(e) => {
                          const updated = [...newMilestones];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setNewMilestones(updated);
                        }}
                        className="flex-1 bg-transparent text-xs text-[#f0f6fc] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveMilestoneFromAddForm(idx)}
                        className="p-1 text-[#8b949e] hover:text-[#f85149] cursor-pointer"
                        title="Delete Milestone"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new milestone inline */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add custom stage (e.g. 9. Chaos Testing & Fault Injection)..."
                    value={newMilestoneInput}
                    onChange={(e) => setNewMilestoneInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddMilestoneToAddForm(); } }}
                    className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1 text-xs text-[#e6edf3] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddMilestoneToAddForm}
                    className="px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-white text-xs font-medium cursor-pointer shrink-0"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-[#30363d]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/30 text-white text-xs font-medium shadow-sm transition-colors cursor-pointer"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PROJECT MODAL */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
              <div>
                <h2 className="text-sm font-bold text-[#e6edf3] flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[#58a6ff]" /> Edit Project
                </h2>
                <p className="text-[11px] text-[#8b949e] mt-0.5">
                  Update project metadata, architecture type, or customize lifecycle milestones.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="p-1 rounded hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              {/* Architecture Type & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#58a6ff] mb-1 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" /> Architecture Type *
                  </label>
                  <select
                    value={editArchType}
                    onChange={(e) => handleSelectEditArchType(e.target.value, false)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff] cursor-pointer"
                  >
                    {ARCHITECTURE_TYPES.map(arch => (
                      <option key={arch.id} value={arch.title}>{arch.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c9d1d9] mb-1">Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff] cursor-pointer"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Planning">Planning</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                  <span className="text-[10px] text-[#8b949e] block mt-1">
                    * Completed is automatically set when all milestones are done.
                  </span>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  value={editTech}
                  onChange={(e) => setEditTech(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Architecture & Problem Solved</label>
                <textarea
                  rows="2"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#c9d1d9] mb-1">GitHub / Repo URL</label>
                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={editGithub}
                    onChange={(e) => setEditGithub(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Live Demo URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={editLive}
                    onChange={(e) => setEditLive(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>
              </div>

              {/* Edit Milestones Section */}
              <div className="space-y-2 pt-2 border-t border-[#30363d]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#e6edf3] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#58a6ff]" />
                    {getArchitectureTypeConfig(editArchType).shortLabel} Milestones ({editMilestones.length} Stages)
                  </label>
                  <button
                    type="button"
                    onClick={handleReloadEditMilestonesTemplate}
                    className="text-[11px] text-[#58a6ff] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Load Template Preset
                  </button>
                </div>

                <div className="max-h-40 overflow-y-auto space-y-1.5 p-2 bg-[#0d1117] rounded-md border border-[#30363d]">
                  {editMilestones.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs bg-[#161b22] p-1.5 rounded border border-[#21262d]">
                      <span className="w-5 h-5 rounded-full bg-[#21262d] text-[#8b949e] flex items-center justify-center text-[10px] font-mono shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={m.title}
                        onChange={(e) => {
                          const updated = [...editMilestones];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setEditMilestones(updated);
                        }}
                        className="flex-1 bg-transparent text-xs text-[#f0f6fc] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveMilestoneFromEditForm(idx)}
                        className="p-1 text-[#8b949e] hover:text-[#f85149] cursor-pointer"
                        title="Delete Milestone"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add milestone to edit form */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add stage to this project..."
                    value={editMilestoneInput}
                    onChange={(e) => setEditMilestoneInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddMilestoneToEditForm(); } }}
                    className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1 text-xs text-[#e6edf3] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddMilestoneToEditForm}
                    className="px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-white text-xs font-medium cursor-pointer shrink-0"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-[#30363d]">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-3.5 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/30 text-white text-xs font-medium shadow-sm transition-colors cursor-pointer"
                >
                  Update Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STEP LEARNING & IMPLEMENTATION GUIDE MODAL ("if i have to learn about that specific step") */}
      {activeStepGuide && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-xl w-full p-6 space-y-4 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-[#30363d] pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1f6feb]/20 text-[#58a6ff] border border-[#388bfd]/30 font-semibold">
                    {activeStepGuide.phase} Phase
                  </span>
                  <span className="text-[10px] text-[#8b949e]">
                    {activeStepGuide.shortLabel} Architecture
                  </span>
                </div>
                <h2 className="text-sm font-bold text-[#e6edf3] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#58a6ff]" />
                  {activeStepGuide.milestoneTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveStepGuide(null)}
                className="p-1 rounded hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Overview */}
            <div className="bg-[#0d1117] p-3.5 rounded-md border border-[#30363d] space-y-1.5">
              <span className="text-[11px] font-semibold text-[#58a6ff] flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" /> Stage Objective & Overview
              </span>
              <p className="text-xs text-[#c9d1d9] leading-relaxed">
                {activeStepGuide.guide.overview}
              </p>
            </div>

            {/* Implementation Tasks Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#e6edf3] flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-[#3fb950]" /> Concrete Implementation Checklist
              </span>
              <div className="space-y-1.5">
                {activeStepGuide.guide.keyTasks.map((task, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs bg-[#0d1117] p-2 rounded-md border border-[#21262d]">
                    <span className="w-4 h-4 rounded-full bg-[#238636]/20 text-[#3fb950] flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-[#f0f6fc] leading-relaxed">{task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Tools & Libraries */}
            {activeStepGuide.guide.recommendedTools?.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-[#e6edf3] flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#d29922]" /> Recommended Industry Tools & Libraries
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeStepGuide.guide.recommendedTools.map((tool, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#0d1117] text-[#c9d1d9] border border-[#30363d]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Interview & System Design Tip */}
            {activeStepGuide.guide.interviewTip && (
              <div className="bg-[#bb8009]/10 p-3.5 rounded-md border border-[#bb8009]/30 space-y-1">
                <span className="text-[11px] font-semibold text-[#d29922] flex items-center gap-1.5">
                  ⭐ Interviewer & Resume Talking Point
                </span>
                <p className="text-xs text-[#e6edf3] leading-relaxed">
                  {activeStepGuide.guide.interviewTip}
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-[#30363d]">
              <button
                type="button"
                onClick={() => {
                  const copyText = `${activeStepGuide.milestoneTitle}\n\nTasks:\n${activeStepGuide.guide.keyTasks.map(t => `- ${t}`).join('\n')}\n\nTools:\n${activeStepGuide.guide.recommendedTools.join(', ')}`;
                  navigator.clipboard?.writeText(copyText);
                  showToast('Copied step checklist to clipboard!');
                }}
                className="inline-flex items-center gap-1 text-xs text-[#8b949e] hover:text-[#58a6ff] cursor-pointer"
              >
                <Copy className="w-3 h-3" /> Copy Checklist
              </button>
              <button
                type="button"
                onClick={() => setActiveStepGuide(null)}
                className="px-3.5 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-white text-xs font-medium cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmationId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-sm w-full p-5 space-y-4 shadow-2xl animate-fadeIn text-center">
            <div className="w-10 h-10 rounded-full bg-[#da3633]/15 text-[#f85149] border border-[#da3633]/30 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#e6edf3]">Delete Portfolio Project?</h3>
              <p className="text-xs text-[#8b949e] mt-1">
                Are you sure you want to remove this project? This will permanently delete its sequential milestone progress and links.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmationId(null)}
                className="px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  await deleteProject(deleteConfirmationId);
                  setDeleteConfirmationId(null);
                  showToast('Project deleted.');
                }}
                className="px-3 py-1.5 rounded-md bg-[#da3633] hover:bg-[#b62324] text-white text-xs font-medium shadow-sm transition-colors cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
