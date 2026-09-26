import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
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
  Rocket,
  Server,
  Layout,
  Cpu,
  Workflow,
  Smartphone,
  Boxes,
  ShieldCheck,
  Sparkles,
  Target,
  RefreshCw,
  Sliders,
  ChevronDown
} from 'lucide-react';
import {
  PROJECT_ARCHETYPES,
  ALL_ALLOCATED_ROLES,
  getProjectTypeConfig,
  getRecommendedProjectTypeForRole
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
  const { user } = useAuth();
  const { projects = [], addProject, updateProject, deleteProject } = useData();

  // Search & Filter state
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);

  // Add Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newProjectType, setNewProjectType] = useState(PROJECT_ARCHETYPES[0].title);
  const [newAllocatedRole, setNewAllocatedRole] = useState(PROJECT_ARCHETYPES[0].allocatedRole);
  const [newTech, setNewTech] = useState(PROJECT_ARCHETYPES[0].defaultTech);
  const [newGithub, setNewGithub] = useState('');
  const [newLive, setNewLive] = useState('');
  const [newStatus, setNewStatus] = useState('In Progress');
  const [newMilestones, setNewMilestones] = useState(PROJECT_ARCHETYPES[0].milestones);
  const [newMilestoneInput, setNewMilestoneInput] = useState('');

  // Edit Form State
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editProjectType, setEditProjectType] = useState(PROJECT_ARCHETYPES[0].title);
  const [editAllocatedRole, setEditAllocatedRole] = useState(PROJECT_ARCHETYPES[0].allocatedRole);
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

  // Open Add Modal with recommendations based on user target role
  const handleOpenAddModal = () => {
    const recommended = getRecommendedProjectTypeForRole(user?.targetRole);
    setNewTitle('');
    setNewDesc('');
    setNewProjectType(recommended.title);
    setNewAllocatedRole(recommended.allocatedRole);
    setNewTech(recommended.defaultTech);
    setNewGithub('');
    setNewLive('');
    setNewStatus('In Progress');
    setNewMilestones(recommended.milestones.map(m => ({ ...m, completed: false })));
    setNewMilestoneInput('');
    setIsAddModalOpen(true);
  };

  // Handle switching Project Type in Add Form
  const handleSelectAddProjectType = (typeTitle) => {
    const config = getProjectTypeConfig(typeTitle);
    setNewProjectType(config.title);
    setNewAllocatedRole(config.allocatedRole);
    setNewTech(config.defaultTech);
    setNewMilestones(config.milestones.map(m => ({ ...m, completed: false })));
    showToast(`Loaded ${config.shortLabel} milestones for ${config.allocatedRole}`);
  };

  // Submit Add Project
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      await addProject({
        title: newTitle.trim(),
        description: newDesc.trim(),
        category: newProjectType,
        projectType: newProjectType,
        allocatedRole: newAllocatedRole,
        techStack: newTech.split(',').map(s => s.trim()).filter(Boolean),
        githubUrl: formatExternalUrl(newGithub),
        liveUrl: formatExternalUrl(newLive),
        status: newStatus,
        milestones: newMilestones
      });

      showToast(`Created ${newProjectType} project "${newTitle.trim()}"!`);
      setIsAddModalOpen(false);
    } catch (err) {
      showToast('Failed to create project', true);
    }
  };

  // Open Edit Modal prefilled with project data
  const handleOpenEditModal = (project) => {
    const currentTypeConfig = getProjectTypeConfig(project.projectType || project.category);
    setEditingProject(project);
    setEditTitle(project.title || '');
    setEditDesc(project.description || '');
    setEditProjectType(project.projectType || currentTypeConfig.title);
    setEditAllocatedRole(project.allocatedRole || currentTypeConfig.allocatedRole);
    setEditTech(Array.isArray(project.techStack) ? project.techStack.join(', ') : '');
    setEditGithub(project.githubUrl || '');
    setEditLive(project.liveUrl || '');
    setEditStatus(project.status || 'In Progress');
    setEditMilestones(
      Array.isArray(project.milestones) && project.milestones.length > 0
        ? project.milestones.map(m => ({ ...m }))
        : currentTypeConfig.milestones.map(m => ({ ...m, completed: false }))
    );
    setEditMilestoneInput('');
  };

  // Handle switching Project Type in Edit Form
  const handleSelectEditProjectType = (typeTitle, reloadMilestones = false) => {
    const config = getProjectTypeConfig(typeTitle);
    setEditProjectType(config.title);
    setEditAllocatedRole(config.allocatedRole);
    if (!editTech) setEditTech(config.defaultTech);
    if (reloadMilestones) {
      setEditMilestones(config.milestones.map(m => ({ ...m, completed: false })));
      showToast(`Loaded ${config.shortLabel} lifecycle template`);
    }
  };

  // Reload template milestones in Edit Form
  const handleReloadEditMilestonesTemplate = () => {
    const config = getProjectTypeConfig(editProjectType);
    setEditMilestones(config.milestones.map(m => ({ ...m, completed: false })));
    showToast(`Reset to ${config.shortLabel} 8-phase lifecycle`);
  };

  // Submit Edit Project
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editTitle.trim() || !editingProject) return;

    const projId = editingProject.id || editingProject._id;
    const allDone = editMilestones.length > 0 && editMilestones.every(m => m.completed);
    const resolvedStatus = allDone ? 'Completed' : editStatus;

    try {
      await updateProject(projId, {
        title: editTitle.trim(),
        description: editDesc.trim(),
        category: editProjectType,
        projectType: editProjectType,
        allocatedRole: editAllocatedRole,
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

  // Sequential Milestone Toggle Enforcement ("before prev milestone i cannot go further like without coding i cannot hosting")
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
      const allDone = updated.every(m => m.completed);
      updateProject(projId, {
        milestones: updated,
        status: allDone ? 'Completed' : project.status === 'Planning' ? 'In Progress' : project.status
      });
      showToast(`Completed milestone: ${target.title}`);
    } else {
      // Unchecking: uncheck this milestone and any subsequent ones that depended on it
      const updated = milestones.map((m, idx) =>
        idx >= mIdx ? { ...m, completed: false } : m
      );
      updateProject(projId, {
        milestones: updated,
        status: project.status === 'Completed' ? 'In Progress' : project.status
      });
      showToast(`Reopened milestone: ${target.title}`);
    }
  };

  // Add Milestone to Add Form
  const handleAddMilestoneToAddForm = () => {
    if (!newMilestoneInput.trim()) return;
    setNewMilestones([
      ...newMilestones,
      { title: newMilestoneInput.trim(), phase: 'Custom', completed: false }
    ]);
    setNewMilestoneInput('');
  };

  // Remove Milestone from Add Form
  const handleRemoveMilestoneFromAddForm = (index) => {
    if (newMilestones.length <= 1) return;
    setNewMilestones(newMilestones.filter((_, i) => i !== index));
  };

  // Add Milestone to Edit Form
  const handleAddMilestoneToEditForm = () => {
    if (!editMilestoneInput.trim()) return;
    setEditMilestones([
      ...editMilestones,
      { title: editMilestoneInput.trim(), phase: 'Custom', completed: false }
    ]);
    setEditMilestoneInput('');
  };

  // Remove Milestone from Edit Form
  const handleRemoveMilestoneFromEditForm = (index) => {
    if (editMilestones.length <= 1) return;
    setEditMilestones(editMilestones.filter((_, i) => i !== index));
  };

  // Check if project allocated role matches user's target role
  const isProjectRoleAligned = (project) => {
    if (!user?.targetRole) return false;
    const userRoleLower = user.targetRole.toLowerCase();
    const projRoleLower = (project.allocatedRole || '').toLowerCase();
    const projTypeLower = (project.projectType || project.category || '').toLowerCase();

    return (
      projRoleLower.includes(userRoleLower) ||
      userRoleLower.includes(projRoleLower) ||
      (userRoleLower.includes('backend') && (projRoleLower.includes('backend') || projTypeLower.includes('backend'))) ||
      (userRoleLower.includes('frontend') && (projRoleLower.includes('frontend') || projTypeLower.includes('frontend'))) ||
      (userRoleLower.includes('full') && (projRoleLower.includes('full') || projTypeLower.includes('full'))) ||
      (userRoleLower.includes('ai') && (projRoleLower.includes('ai') || projTypeLower.includes('ai'))) ||
      (userRoleLower.includes('devops') && (projRoleLower.includes('devops') || projTypeLower.includes('devops'))) ||
      (userRoleLower.includes('mobile') && (projRoleLower.includes('mobile') || projTypeLower.includes('mobile'))) ||
      (userRoleLower.includes('sde') && (projRoleLower.includes('sde') || projTypeLower.includes('system'))) ||
      (userRoleLower.includes('sdet') && (projRoleLower.includes('sdet') || projTypeLower.includes('test')))
    );
  };

  // Filtered Projects List
  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const q = search.toLowerCase().trim();
      const projType = proj.projectType || proj.category || 'Full Stack Web Application';
      const projRole = proj.allocatedRole || 'Full Stack Engineer';

      const matchSearch =
        !q ||
        proj.title?.toLowerCase().includes(q) ||
        proj.description?.toLowerCase().includes(q) ||
        projType.toLowerCase().includes(q) ||
        projRole.toLowerCase().includes(q) ||
        (Array.isArray(proj.techStack) && proj.techStack.some(t => t.toLowerCase().includes(q))) ||
        (Array.isArray(proj.milestones) && proj.milestones.some(m => m.title?.toLowerCase().includes(q)));

      const matchStatus = selectedStatus === 'All' || proj.status === selectedStatus;
      const matchType = selectedType === 'All' || projType === selectedType;
      const matchRole = selectedRole === 'All' || projRole === selectedRole;

      return matchSearch && matchStatus && matchType && matchRole;
    });
  }, [projects, search, selectedStatus, selectedType, selectedRole]);

  // Telemetry Stats
  const stats = useMemo(() => {
    const total = projects.length;
    let completed = 0;
    let inProgress = 0;
    let totalMilestones = 0;
    let completedMilestones = 0;
    let deployed = 0;
    let roleAlignedCount = 0;

    projects.forEach(p => {
      if (p.status === 'Completed') completed++;
      if (p.status === 'In Progress') inProgress++;
      if (p.liveUrl) deployed++;
      if (isProjectRoleAligned(p)) roleAlignedCount++;
      if (Array.isArray(p.milestones)) {
        totalMilestones += p.milestones.length;
        completedMilestones += p.milestones.filter(m => m.completed).length;
      }
    });

    const completionRate = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

    return { total, completed, inProgress, deployed, roleAlignedCount, completionRate };
  }, [projects, user?.targetRole]);

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
            <FolderGit2 className="w-5 h-5 text-[#58a6ff]" /> Projects & Engineering Archetypes
            <span className="text-xs font-normal text-[#8b949e] px-2 py-0.5 rounded-full bg-[#161b22] border border-[#30363d] font-mono">
              {projects.length} Total
            </span>
          </h1>
          <p className="text-xs text-[#8b949e] mt-1">
            Build domain-typed software systems with role allocations and sequential engineering lifecycles tailored for each CS discipline.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/30 text-white text-xs font-medium shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" /> Add Typed Project
        </button>
      </div>

      {/* Stats Telemetry Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d]">
          <span className="text-[11px] text-[#8b949e] block">Total Systems</span>
          <span className="text-lg font-bold text-[#e6edf3] font-mono">{stats.total}</span>
        </div>

        <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d]">
          <span className="text-[11px] text-[#8b949e] block">Deployed / Live</span>
          <span className="text-lg font-bold text-[#3fb950] font-mono flex items-center gap-1">
            {stats.deployed} <Globe className="w-3.5 h-3.5 text-[#3fb950]" />
          </span>
        </div>

        <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d]">
          <span className="text-[11px] text-[#8b949e] block">Completed Lifecycle</span>
          <span className="text-lg font-bold text-[#58a6ff] font-mono">{stats.completed}</span>
        </div>

        <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d]">
          <span className="text-[11px] text-[#8b949e] block">Target Role Aligned</span>
          <span className="text-lg font-bold text-[#bc8cff] font-mono flex items-center gap-1">
            {stats.roleAlignedCount} <Target className="w-3.5 h-3.5 text-[#bc8cff]" />
          </span>
        </div>

        <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d]">
          <span className="text-[11px] text-[#8b949e] block">Milestone Completion</span>
          <span className="text-lg font-bold text-[#d29922] font-mono">{stats.completionRate}%</span>
        </div>
      </div>

      {/* Domain Archetypes Quick Filter / Showcase Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sliders className="w-3 h-3 text-[#58a6ff]" /> Domains:
        </span>
        <button
          onClick={() => setSelectedType('All')}
          className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
            selectedType === 'All'
              ? 'bg-[#58a6ff] text-white shadow-sm'
              : 'bg-[#161b22] text-[#8b949e] hover:text-[#c9d1d9] border border-[#30363d]'
          }`}
        >
          All Archetypes
        </button>
        {PROJECT_ARCHETYPES.map((arch) => {
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
            placeholder="Search projects, domain archetypes, allocated roles, tech stacks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-8 pr-3 py-1.5 text-xs text-[#e6edf3] placeholder-[#6e7681] focus:outline-none focus:border-[#58a6ff]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#c9d1d9] focus:outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Planning">Planning</option>
            <option value="On Hold">On Hold</option>
          </select>

          {/* Allocated Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#c9d1d9] focus:outline-none cursor-pointer max-w-[170px] truncate"
          >
            <option value="All">All Allocated Roles</option>
            {ALL_ALLOCATED_ROLES.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>

          {(search || selectedStatus !== 'All' || selectedType !== 'All' || selectedRole !== 'All') && (
            <button
              onClick={() => { setSearch(''); setSelectedStatus('All'); setSelectedType('All'); setSelectedRole('All'); }}
              className="text-[#8b949e] hover:text-[#f85149] hover:underline text-xs cursor-pointer whitespace-nowrap px-1"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
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
                ? 'Create typed software engineering projects with domain-specific sequential milestones (Full Stack, Backend, AI/ML, DevOps, Mobile, System Design LLD, or SDET).'
                : 'Try adjusting your search query or reset status, domain archetype, and role filters.'}
            </p>
          </div>
          {projects.length === 0 ? (
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/30 text-white text-xs font-medium shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add First Typed Project
            </button>
          ) : (
            <button
              onClick={() => { setSearch(''); setSelectedStatus('All'); setSelectedType('All'); setSelectedRole('All'); }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredProjects.map((proj) => {
            const projId = proj.id || proj._id;
            const projTypeTitle = proj.projectType || proj.category || 'Full Stack Web Application';
            const typeConfig = getProjectTypeConfig(projTypeTitle);
            const allocatedRoleTitle = proj.allocatedRole || typeConfig.allocatedRole;
            const isAlignedWithTarget = isProjectRoleAligned(proj);

            const milestones = Array.isArray(proj.milestones) ? proj.milestones : [];
            const completedCount = milestones.filter(m => m.completed).length;
            const totalCount = milestones.length;
            const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
            const formattedGithub = formatExternalUrl(proj.githubUrl);
            const formattedLive = formatExternalUrl(proj.liveUrl);

            return (
              <div
                key={projId}
                className="rounded-lg bg-[#161b22] border border-[#30363d] p-5 flex flex-col justify-between space-y-4 hover:border-[#58a6ff]/40 transition-colors shadow-sm"
              >
                <div>
                  {/* Top Bar: Domain Archetype Badge, Role Allocation & Edit/Delete Icons */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                      {/* Project Type Badge */}
                      <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${typeConfig.badgeColor}`}>
                        {renderTypeIcon(typeConfig.iconName, 'w-3 h-3')}
                        <span>{typeConfig.shortLabel}</span>
                      </span>

                      {/* Allocated Role Badge */}
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0d1117] text-[#c9d1d9] border border-[#30363d] truncate max-w-[200px]" title={allocatedRoleTitle}>
                        Role: {allocatedRoleTitle.split('(')[0].trim()}
                      </span>

                      {/* Target Role Alignment Indicator */}
                      {isAlignedWithTarget && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold px-1.5 py-0.2 rounded bg-[#bc8cff]/15 text-[#d2a8ff] border border-[#bc8cff]/30">
                          <Target className="w-2.5 h-2.5" /> Target Match
                        </span>
                      )}

                      {/* Status Badge */}
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                          proj.status === 'Completed'
                            ? 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/40'
                            : proj.status === 'Planning'
                            ? 'bg-[#1f6feb]/15 text-[#58a6ff] border-[#388bfd]/40'
                            : 'bg-[#bb8009]/15 text-[#d29922] border-[#bb8009]/40'
                        }`}
                      >
                        {proj.status}
                      </span>
                    </div>

                    {/* Edit & Delete Buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(proj)}
                        className="p-1 rounded text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#21262d] transition-colors cursor-pointer"
                        title="Edit Project Archetype & Milestones"
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
                  <p className="text-xs text-[#8b949e] leading-relaxed mb-3">
                    {proj.description || 'No detailed architecture description provided.'}
                  </p>

                  {/* Tech Stack Badges */}
                  {Array.isArray(proj.techStack) && proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
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
                        {typeConfig.shortLabel} Lifecycle ({completedCount}/{totalCount})
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

                    {/* Sequential Milestones Checklist */}
                    <div className="space-y-1">
                      {milestones.map((m, mIdx) => {
                        const isPrevDone = mIdx === 0 || milestones[mIdx - 1]?.completed;
                        const isLocked = !m.completed && !isPrevDone;
                        const isCurrentActive = !m.completed && isPrevDone;

                        return (
                          <div
                            key={mIdx}
                            onClick={() => handleToggleMilestone(proj, mIdx)}
                            title={
                              isLocked
                                ? `Locked: Complete previous milestone "${milestones[mIdx - 1]?.title}" first.`
                                : m.completed
                                ? 'Click to uncheck milestone (will uncheck subsequent milestones)'
                                : 'Click to complete milestone'
                            }
                            className={`flex items-start gap-2 text-xs py-1.5 px-2 rounded-md transition-all ${
                              isLocked
                                ? 'text-[#484f58] cursor-not-allowed bg-[#161b22]/30'
                                : m.completed
                                ? 'text-[#8b949e] hover:bg-[#161b22] cursor-pointer'
                                : 'text-[#f0f6fc] hover:bg-[#1f6feb]/10 hover:border-[#388bfd]/30 border border-transparent cursor-pointer'
                            }`}
                          >
                            {/* Icon state */}
                            <div className="mt-0.5 shrink-0">
                              {m.completed ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950]" />
                              ) : isCurrentActive ? (
                                <PlayCircle className="w-3.5 h-3.5 text-[#58a6ff] animate-pulse" />
                              ) : (
                                <Lock className="w-3.5 h-3.5 text-[#484f58]" />
                              )}
                            </div>

                            {/* Title & Phase */}
                            <div className="flex-1 min-w-0">
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

                {/* Bottom Bar: Live & Repo Links with Verification */}
                <div className="flex items-center justify-between pt-3 border-t border-[#30363d] text-xs">
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
                    {completedCount === totalCount && totalCount > 0 ? (
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

      {/* ADD TYPED PROJECT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
              <div>
                <h2 className="text-sm font-bold text-[#e6edf3] flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#58a6ff]" /> Add Typed Project & Allocate Role
                </h2>
                <p className="text-[11px] text-[#8b949e] mt-0.5">
                  Milestones automatically adapt to the specific engineering requirements of this CS discipline.
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
              {/* Project Type & Role Allocation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#0d1117] rounded-md border border-[#30363d]">
                <div>
                  <label className="block text-xs font-semibold text-[#58a6ff] mb-1 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" /> Project Archetype (Domain) *
                  </label>
                  <select
                    value={newProjectType}
                    onChange={(e) => handleSelectAddProjectType(e.target.value)}
                    className="w-full bg-[#161b22] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff] cursor-pointer"
                  >
                    {PROJECT_ARCHETYPES.map(arch => (
                      <option key={arch.id} value={arch.title}>{arch.title}</option>
                    ))}
                  </select>
                  <p className="text-[10px] text-[#8b949e] mt-1">
                    {getProjectTypeConfig(newProjectType).summary}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#bc8cff] mb-1 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" /> Allocated Target Role *
                  </label>
                  <select
                    value={newAllocatedRole}
                    onChange={(e) => setNewAllocatedRole(e.target.value)}
                    className="w-full bg-[#161b22] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#bc8cff] cursor-pointer"
                  >
                    {ALL_ALLOCATED_ROLES.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  {user?.targetRole && (
                    <p className="text-[10px] text-[#3fb950] mt-1 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Your Active Target: {user.targetRole}
                    </p>
                  )}
                </div>
              </div>

              {/* Title & Tech Stack */}
              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Event-Driven Message Broker"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Architecture & System Description</label>
                <textarea
                  rows="2"
                  placeholder="High-level architecture, design patterns, bottlenecks handled, and problem solved..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              {/* Repo and Live links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#c9d1d9] mb-1">GitHub / Repository Link</label>
                  <input
                    type="text"
                    placeholder="https://github.com/username/project"
                    value={newGithub}
                    onChange={(e) => setNewGithub(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Live Demo / Deployed URL</label>
                  <input
                    type="text"
                    placeholder="https://myproject.vercel.app"
                    value={newLive}
                    onChange={(e) => setNewLive(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>
              </div>

              {/* Milestone Lifecycle Hierarchy Manager */}
              <div className="space-y-2 pt-2 border-t border-[#30363d]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#e6edf3] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#58a6ff]" />
                    {getProjectTypeConfig(newProjectType).shortLabel} Lifecycle Milestones ({newMilestones.length} Stages)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleSelectAddProjectType(newProjectType)}
                    className="text-[11px] text-[#58a6ff] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Reload {getProjectTypeConfig(newProjectType).shortLabel} Preset
                  </button>
                </div>
                <p className="text-[11px] text-[#8b949e]">
                  Milestones are sequentially locked: you must complete prerequisite stages before unlocking downstream steps.
                </p>

                {/* Milestone list */}
                <div className="max-h-48 overflow-y-auto space-y-1.5 p-2 bg-[#0d1117] rounded-md border border-[#30363d]">
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
                    placeholder="Add custom stage (e.g. 9. Chaos Engineering & Canary Deployments)..."
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
                  Save Typed Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PROJECT MODAL */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
              <div>
                <h2 className="text-sm font-bold text-[#e6edf3] flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[#58a6ff]" /> Edit Project Archetype & Milestones
                </h2>
                <p className="text-[11px] text-[#8b949e] mt-0.5">
                  Update domain type, role allocation, tech stack, and sequential lifecycle steps.
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
              {/* Project Type & Role Allocation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#0d1117] rounded-md border border-[#30363d]">
                <div>
                  <label className="block text-xs font-semibold text-[#58a6ff] mb-1 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" /> Project Archetype (Domain) *
                  </label>
                  <select
                    value={editProjectType}
                    onChange={(e) => handleSelectEditProjectType(e.target.value, false)}
                    className="w-full bg-[#161b22] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff] cursor-pointer"
                  >
                    {PROJECT_ARCHETYPES.map(arch => (
                      <option key={arch.id} value={arch.title}>{arch.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#bc8cff] mb-1 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" /> Allocated Target Role *
                  </label>
                  <select
                    value={editAllocatedRole}
                    onChange={(e) => setEditAllocatedRole(e.target.value)}
                    className="w-full bg-[#161b22] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#bc8cff] cursor-pointer"
                  >
                    {ALL_ALLOCATED_ROLES.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Title & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                <div>
                  <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff] cursor-pointer"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Planning">Planning</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Architecture & System Description</label>
                <textarea
                  rows="2"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  value={editTech}
                  onChange={(e) => setEditTech(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#c9d1d9] mb-1">GitHub / Repository URL</label>
                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={editGithub}
                    onChange={(e) => setEditGithub(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Live Demo / Deployed URL</label>
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
                    {getProjectTypeConfig(editProjectType).shortLabel} Milestones ({editMilestones.length} Stages)
                  </label>
                  <button
                    type="button"
                    onClick={handleReloadEditMilestonesTemplate}
                    className="text-[11px] text-[#58a6ff] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Load {getProjectTypeConfig(editProjectType).shortLabel} Template
                  </button>
                </div>

                <div className="max-h-48 overflow-y-auto space-y-1.5 p-2 bg-[#0d1117] rounded-md border border-[#30363d]">
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
                  Update Typed Project
                </button>
              </div>
            </form>
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
