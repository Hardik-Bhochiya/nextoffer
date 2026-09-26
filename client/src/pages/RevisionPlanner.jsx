import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  CalendarCheck,
  Plus,
  CheckCircle2,
  Circle,
  Clock,
  Trash2,
  Calendar,
  X,
  Target,
  ListTodo,
  AlertCircle,
  Flame,
  Trophy,
  Search,
  Check,
  Edit3,
  ChevronDown,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RevisionPlanner = ({ defaultTab = 'tasks' }) => {
  const { user } = useAuth();
  const {
    studyGoals,
    addStudyGoal,
    updateStudyGoal,
    deleteStudyGoal,
    dailyTasks,
    addDailyTask,
    updateDailyTask,
    toggleDailyTask,
    deleteDailyTask,
    metrics
  } = useData();

  const [searchParams, setSearchParams] = useSearchParams();
  const rawTabParam = searchParams.get('tab');

  const normalizeTab = (t) => {
    if (!t) return null;
    if (t === 'goals' || t === 'placement-goals' || t === 'goal') {
      return 'goals';
    }
    return 'tasks';
  };

  const initialTab = normalizeTab(rawTabParam) || normalizeTab(defaultTab) || 'tasks';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const normalized = normalizeTab(rawTabParam) || normalizeTab(defaultTab);
    if (normalized && normalized !== activeTab) {
      setActiveTab(normalized);
    }
  }, [rawTabParam, defaultTab]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [taskStatusFilter, setTaskStatusFilter] = useState('All'); // 'All' | 'Active' | 'Completed' | 'Overdue'

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

  // Edit states
  const [editingTask, setEditingTask] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);

  // Form states for Task
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCategory, setTaskCategory] = useState('DSA Practice');
  const [taskPriority, setTaskPriority] = useState('High');
  const [taskDifficulty, setTaskDifficulty] = useState('Medium');
  const [taskDeadline, setTaskDeadline] = useState(new Date().toISOString().split('T')[0]);
  const [taskDueTime, setTaskDueTime] = useState('06:00 PM');
  const [taskGoalId, setTaskGoalId] = useState('');

  // Form states for Goal
  const [goalTitle, setGoalTitle] = useState('');
  const [goalDescription, setGoalDescription] = useState('');
  const [goalCategory, setGoalCategory] = useState('SDE & Core DSA');
  const [goalPriority, setGoalPriority] = useState('High');
  const [goalDifficulty, setGoalDifficulty] = useState('Hard');
  const [goalDeadline, setGoalDeadline] = useState(new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0]);
  const [goalMilestonesInput, setGoalMilestonesInput] = useState('');

  // Quick Task state for instant inline addition
  const [quickTaskTitle, setQuickTaskTitle] = useState('');
  const [quickTaskCategory, setQuickTaskCategory] = useState('DSA Practice');
  const [quickTaskPriority, setQuickTaskPriority] = useState('High');

  // Expanded goal sub-milestones tracking
  const [expandedGoals, setExpandedGoals] = useState({});

  const todayStr = new Date().toISOString().split('T')[0];

  // Streak status from metrics/user
  const streak = metrics?.user?.streak ?? user?.streak ?? 0;
  const longestStreak = metrics?.user?.longestStreak ?? user?.longestStreak ?? streak;
  const isActiveToday = metrics?.user?.isActiveToday ?? false;
  const streakAtRisk = metrics?.user?.streakAtRisk ?? (streak > 0 && !isActiveToday);

  // -------------------------------------------------------------
  // Action Handlers
  // -------------------------------------------------------------
  const handleToggleTask = (id, currentStatus) => {
    if (!id) return;
    toggleDailyTask(id);
    if (!currentStatus) {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.75 }
      });
    }
  };

  // Open Task Modal (Create or Edit)
  const openTaskModal = (taskToEdit = null) => {
    if (taskToEdit) {
      setEditingTask(taskToEdit);
      setTaskTitle(taskToEdit.taskDetails || '');
      setTaskDescription(taskToEdit.description || '');
      setTaskCategory(taskToEdit.category || 'DSA Practice');
      setTaskPriority(taskToEdit.priority || 'High');
      setTaskDifficulty(taskToEdit.difficulty || 'Medium');
      setTaskDeadline(taskToEdit.deadline || todayStr);
      setTaskDueTime(taskToEdit.dueTime || '06:00 PM');
      setTaskGoalId(taskToEdit.associatedGoalId || '');
    } else {
      setEditingTask(null);
      setTaskTitle('');
      setTaskDescription('');
      setTaskCategory('DSA Practice');
      setTaskPriority('High');
      setTaskDifficulty('Medium');
      setTaskDeadline(todayStr);
      setTaskDueTime('06:00 PM');
      setTaskGoalId('');
    }
    setIsTaskModalOpen(true);
  };

  const handleSaveTaskSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const payload = {
      taskDetails: taskTitle.trim(),
      description: taskDescription.trim(),
      category: taskCategory,
      priority: taskPriority,
      difficulty: taskDifficulty,
      deadline: taskDeadline,
      dueTime: taskDueTime,
      associatedGoalId: taskGoalId || null
    };

    if (editingTask) {
      updateDailyTask(editingTask.id || editingTask._id, payload);
    } else {
      addDailyTask(payload);
    }

    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  // Open Goal Modal (Create or Edit)
  const openGoalModal = (goalToEdit = null) => {
    if (goalToEdit) {
      setEditingGoal(goalToEdit);
      setGoalTitle(goalToEdit.goalTitle || '');
      setGoalDescription(goalToEdit.description || '');
      setGoalCategory(goalToEdit.category || 'SDE & Core DSA');
      setGoalPriority(goalToEdit.priority || 'High');
      setGoalDifficulty(goalToEdit.difficulty || 'Hard');
      setGoalDeadline(goalToEdit.deadline || todayStr);
      setGoalMilestonesInput(
        (goalToEdit.milestones || []).map(m => m.title).join('\n')
      );
    } else {
      setEditingGoal(null);
      setGoalTitle('');
      setGoalDescription('');
      setGoalCategory('SDE & Core DSA');
      setGoalPriority('High');
      setGoalDifficulty('Hard');
      setGoalDeadline(new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0]);
      setGoalMilestonesInput('');
    }
    setIsGoalModalOpen(true);
  };

  const handleSaveGoalSubmit = (e) => {
    e.preventDefault();
    if (!goalTitle.trim()) return;

    if (editingGoal) {
      updateStudyGoal(editingGoal.id || editingGoal._id, {
        goalTitle: goalTitle.trim(),
        description: goalDescription.trim(),
        category: goalCategory,
        priority: goalPriority,
        difficulty: goalDifficulty,
        deadline: goalDeadline
      });
    } else {
      const parsedMilestones = goalMilestonesInput
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean)
        .map(title => ({ title, completed: false }));

      addStudyGoal({
        goalTitle: goalTitle.trim(),
        description: goalDescription.trim(),
        category: goalCategory,
        priority: goalPriority,
        difficulty: goalDifficulty,
        deadline: goalDeadline,
        milestones: parsedMilestones,
        progress: 0,
        status: 'In Progress'
      });
    }

    setIsGoalModalOpen(false);
    setEditingGoal(null);
  };

  // Toggle Goal Sub-milestone
  const handleToggleGoalMilestone = (goal, milestoneIdx) => {
    const goalId = goal.id || goal._id;
    if (!goal.milestones || !goal.milestones[milestoneIdx]) return;

    const updatedMilestones = goal.milestones.map((m, idx) => {
      if (idx === milestoneIdx) {
        return { ...m, completed: !m.completed };
      }
      return m;
    });

    const completedCount = updatedMilestones.filter(m => m.completed).length;
    const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);

    updateStudyGoal(goalId, {
      milestones: updatedMilestones,
      progress: newProgress,
      status: newProgress === 100 ? 'Completed' : 'In Progress'
    });

    if (newProgress === 100) {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    }
  };

  // -------------------------------------------------------------
  // Filtered & Sorted Daily Tasks
  // -------------------------------------------------------------
  const filteredTasks = useMemo(() => {
    return dailyTasks.filter(t => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (t.taskDetails || '').toLowerCase().includes(q);
        const matchDesc = (t.description || '').toLowerCase().includes(q);
        const matchCat = (t.category || '').toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchCat) return false;
      }

      // Priority
      if (selectedPriority !== 'All' && t.priority !== selectedPriority) return false;

      // Difficulty
      if (selectedDifficulty !== 'All' && t.difficulty !== selectedDifficulty) return false;

      // Category
      if (selectedCategory !== 'All' && (t.category || '').toLowerCase() !== selectedCategory.toLowerCase()) return false;

      // Status
      const isCompleted = t.taskStatus === true || t.taskStatus === 'Completed';
      const isOverdue = !isCompleted && (t.deadline || t.date) < todayStr;

      if (taskStatusFilter === 'Active' && isCompleted) return false;
      if (taskStatusFilter === 'Completed' && !isCompleted) return false;
      if (taskStatusFilter === 'Overdue' && !isOverdue) return false;

      return true;
    });
  }, [dailyTasks, searchQuery, selectedPriority, selectedDifficulty, selectedCategory, taskStatusFilter, todayStr]);

  // Group filtered tasks by urgency / deadline
  const overdueTasks = filteredTasks.filter(t => !t.taskStatus && (t.deadline || t.date) < todayStr);
  const dueTodayTasks = filteredTasks.filter(t => !t.taskStatus && (t.deadline || t.date) === todayStr);
  const upcomingTasks = filteredTasks.filter(t => !t.taskStatus && (t.deadline || t.date) > todayStr);
  const completedTasks = filteredTasks.filter(t => t.taskStatus === true || t.taskStatus === 'Completed');

  // Filtered Study Goals
  const filteredGoals = useMemo(() => {
    return studyGoals.filter(g => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (g.goalTitle || '').toLowerCase().includes(q);
        const matchCat = (g.category || '').toLowerCase().includes(q);
        if (!matchTitle && !matchCat) return false;
      }
      if (selectedPriority !== 'All' && g.priority !== selectedPriority) return false;
      if (selectedDifficulty !== 'All' && g.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [studyGoals, searchQuery, selectedPriority, selectedDifficulty]);

  // Helper for difficulty pill color
  const getDifficultyBadge = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'hard':
        return 'bg-[#da3633]/15 text-[#f85149] border-[#da3633]/40';
      case 'medium':
        return 'bg-[#d29922]/15 text-[#d29922] border-[#d29922]/40';
      case 'easy':
        return 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/40';
      default:
        return 'bg-[#21262d] text-[#8b949e] border-[#30363d]';
    }
  };

  // Helper for priority pill color
  const handleQuickAddTask = (e) => {
    e.preventDefault();
    if (!quickTaskTitle.trim()) return;
    addDailyTask({
      taskDetails: quickTaskTitle.trim(),
      category: quickTaskCategory,
      priority: quickTaskPriority,
      difficulty: 'Medium',
      deadline: todayStr,
      dueTime: '11:59 PM'
    });
    setQuickTaskTitle('');
  };

  const getPriorityBadge = (pri) => {
    switch (pri?.toLowerCase()) {
      case 'high':
        return 'bg-[#da3633]/15 text-[#f85149] border-[#da3633]/40';
      case 'medium':
        return 'bg-[#d29922]/15 text-[#d29922] border-[#d29922]/40';
      case 'low':
        return 'bg-[#1f6feb]/15 text-[#58a6ff] border-[#1f6feb]/40';
      default:
        return 'bg-[#21262d] text-[#8b949e] border-[#30363d]';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      
      {/* ============================================================ */}
      {/* 1. DAILY STREAK & DISCIPLINE STATUS BANNER */}
      {/* ============================================================ */}
      <div className="p-5 rounded-lg bg-gradient-to-r from-[#161b22] via-[#0d1117] to-[#161b22] border border-[#30363d] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner ${
            isActiveToday
              ? 'bg-[#d29922]/15 text-[#d29922] border-[#d29922]/40'
              : streak > 0
              ? 'bg-[#da3633]/15 text-[#f85149] border-[#da3633]/40 animate-pulse'
              : 'bg-[#0d1117] text-[#8b949e] border-[#30363d]'
          }`}>
            <Flame className="w-6 h-6 fill-current" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-[#e6edf3]">
                {streak} Day {streak === 1 ? 'Streak' : 'Streak'}
              </h2>
              {longestStreak > 0 && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#21262d] text-[#c9d1d9] border border-[#30363d] flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-[#d29922]" /> Best: {longestStreak}d
                </span>
              )}
            </div>

            <p className="text-xs text-[#8b949e]">
              {isActiveToday ? (
                <span className="text-[#3fb950] font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Daily study activity logged. Your streak is protected today!
                </span>
              ) : streakAtRisk ? (
                <span className="text-[#d29922] font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Complete at least 1 task before 11:59 PM to maintain your streak!
                </span>
              ) : (
                <span className="text-[#8b949e]">
                  Complete any daily task, solved problem, or milestone to ignite your streak. Miss a day and it resets to 0.
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <span className="text-[11px] text-[#8b949e] font-mono bg-[#0d1117] px-3 py-1.5 rounded border border-[#30363d]">
            Reset at 12:00 AM Midnight
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. NAVIGATION TABS & ACTION BUTTONS */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-4">
        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-[#161b22] border border-[#30363d] p-1 rounded-md self-start sm:self-auto">
          <button
            type="button"
            onClick={() => handleTabChange('tasks')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'tasks'
                ? 'bg-[#1f6feb] text-white font-semibold shadow-sm'
                : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            <ListTodo className="w-3.5 h-3.5" />
            <span>Daily Tasks ({dailyTasks.filter(t => !t.taskStatus).length})</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('goals')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'goals'
                ? 'bg-[#1f6feb] text-white font-semibold shadow-sm'
                : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Placement Goals ({studyGoals.length})</span>
          </button>
        </div>

        {/* Global Search & Filters Header */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#8b949e] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#161b22] border border-[#30363d] text-[#e6edf3] text-xs rounded-md pl-8 pr-3 py-1.5 w-44 focus:w-56 focus:outline-none focus:border-[#58a6ff] transition-all"
            />
          </div>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-[#161b22] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-[#58a6ff]"
          >
            <option value="All">All Difficulties</option>
            <option value="Hard">Hard</option>
            <option value="Medium">Medium</option>
            <option value="Easy">Easy</option>
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-[#161b22] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-[#58a6ff]"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. TAB 1: DAILY TASKS & CHECKLISTS (DEADLINE-SORTED) */}
      {/* ============================================================ */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          {/* Quick Add Task Input Card */}
          <form
            onSubmit={handleQuickAddTask}
            className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] flex flex-col sm:flex-row items-center gap-2.5 shadow-sm"
          >
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Quick-add a daily task (e.g. Solve 3 Binary Search Mediums, Revise DBMS Indexing)..."
                value={quickTaskTitle}
                onChange={(e) => setQuickTaskTitle(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md pl-3 pr-3 py-2 focus:outline-none focus:border-[#58a6ff] transition-all"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-between sm:justify-start">
              <select
                value={quickTaskCategory}
                onChange={(e) => setQuickTaskCategory(e.target.value)}
                className="bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-2.5 py-2 focus:outline-none focus:border-[#58a6ff]"
              >
                <option value="DSA Practice">DSA Practice</option>
                <option value="Core CS">Core CS</option>
                <option value="Project Work">Project Work</option>
                <option value="Topic Revision">Revision</option>
                <option value="Mock Interview">Mock Prep</option>
                <option value="Resume / Apply">Application</option>
              </select>

              <select
                value={quickTaskPriority}
                onChange={(e) => setQuickTaskPriority(e.target.value)}
                className="bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-2 py-2 focus:outline-none focus:border-[#58a6ff]"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <button
                type="submit"
                disabled={!quickTaskTitle.trim()}
                className="px-3.5 py-2 rounded-md bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 text-white text-xs font-semibold shadow transition-all flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>

              <button
                type="button"
                onClick={() => openTaskModal()}
                className="px-3 py-2 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-xs font-medium border border-[#30363d] transition shrink-0"
                title="Open detailed task modal"
              >
                + Details
              </button>
            </div>
          </form>

          {/* Quick Sub-Filter Pills */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              {[
                { id: 'All', label: `All (${filteredTasks.length})` },
                { id: 'Active', label: `Pending (${dailyTasks.filter(t => !t.taskStatus).length})` },
                { id: 'Overdue', label: `Overdue (${overdueTasks.length})` },
                { id: 'Completed', label: `Completed (${completedTasks.length})` }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setTaskStatusFilter(f.id)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                    taskStatusFilter === f.id
                      ? 'bg-[#238636] text-white font-semibold'
                      : 'bg-[#21262d] text-[#8b949e] hover:text-[#c9d1d9] border border-[#30363d]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#161b22] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-2.5 py-1 focus:outline-none focus:border-[#58a6ff]"
              >
                <option value="All">All Categories</option>
                <option value="DSA Practice">DSA Practice</option>
                <option value="Core CS">Core CS Fundamentals</option>
                <option value="Project Work">Project Work</option>
                <option value="Topic Revision">Topic Revision</option>
                <option value="Mock Interview">Mock Interview</option>
                <option value="Resume / Apply">Resume / Apply</option>
              </select>
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="p-12 rounded-lg bg-[#161b22] border border-[#30363d] text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#8b949e] mx-auto">
                <ListTodo className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-[#e6edf3]">No Daily Tasks Found</h3>
              <p className="text-xs text-[#8b949e] max-w-sm mx-auto">
                Create structured daily tasks for DSA practice, roadmap milestones, project features, or interview prep.
              </p>
              <button
                type="button"
                onClick={() => openTaskModal()}
                className="px-3.5 py-1.5 rounded-md bg-[#1f6feb] hover:bg-[#388bfd] text-white text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add First Task
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 1. OVERDUE TASKS */}
              {overdueTasks.length > 0 && taskStatusFilter !== 'Completed' && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#f85149]">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>OVERDUE DEADLINES ({overdueTasks.length})</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {overdueTasks.map(t => renderTaskCard(t))}
                  </div>
                </div>
              )}

              {/* 2. DUE TODAY */}
              {dueTodayTasks.length > 0 && taskStatusFilter !== 'Completed' && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#d29922]">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>TODAY'S ACTION ITEMS ({dueTodayTasks.length})</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {dueTodayTasks.map(t => renderTaskCard(t))}
                  </div>
                </div>
              )}

              {/* 3. UPCOMING SCHEDULE */}
              {upcomingTasks.length > 0 && taskStatusFilter !== 'Completed' && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#58a6ff]">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>UPCOMING SCHEDULE ({upcomingTasks.length})</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {upcomingTasks.map(t => renderTaskCard(t))}
                  </div>
                </div>
              )}

              {/* 4. COMPLETED ARCHIVE */}
              {completedTasks.length > 0 && (taskStatusFilter === 'All' || taskStatusFilter === 'Completed') && (
                <div className="space-y-2.5 pt-2 border-t border-[#30363d]/60">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#3fb950]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>COMPLETED TASKS ({completedTasks.length})</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {completedTasks.map(t => renderTaskCard(t))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. TAB 2: PLACEMENT STUDY GOALS (LONG-TERM & MILESTONES) */}
      {/* ============================================================ */}
      {activeTab === 'goals' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-1">
            <div>
              <h2 className="text-sm font-semibold text-[#e6edf3] flex items-center gap-2">
                <Target className="w-4 h-4 text-[#58a6ff]" /> High-Stakes Placement Study Goals
              </h2>
              <p className="text-[11px] text-[#8b949e]">
                Major multi-week placement milestones with target deadlines and sub-milestone execution.
              </p>
            </div>

            <button
              type="button"
              onClick={() => openGoalModal()}
              className="px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold shadow transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Create Goal
            </button>
          </div>

          {filteredGoals.length === 0 ? (
            <div className="p-12 rounded-lg bg-[#161b22] border border-[#30363d] text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#8b949e] mx-auto">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-[#e6edf3]">No Placement Goals Set</h3>
              <p className="text-xs text-[#8b949e] max-w-sm mx-auto">
                Establish 90-day placement targets, DSA mastery thresholds, or capstone project milestones.
              </p>
              <button
                type="button"
                onClick={() => openGoalModal()}
                className="px-3.5 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Create First Goal
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredGoals.map((g) => {
                const goalId = g.id || g._id;
                const isExpanded = !!expandedGoals[goalId];
                const isCompleted = g.progress === 100 || g.status === 'Completed';

                // Days remaining calculation
                const targetDeadline = new Date(g.deadline || todayStr);
                const today = new Date(todayStr);
                const diffTime = targetDeadline - today;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                return (
                  <div
                    key={goalId}
                    className="p-5 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff]/40 transition-all flex flex-col justify-between space-y-4 shadow-sm"
                  >
                    <div className="space-y-3">
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase ${getPriorityBadge(g.priority)}`}>
                              {g.priority} Priority
                            </span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase ${getDifficultyBadge(g.difficulty)}`}>
                              {g.difficulty}
                            </span>
                            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-[#0d1117] text-[#8b949e] border border-[#30363d]">
                              {g.category}
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-[#e6edf3] leading-snug">
                            {g.goalTitle}
                          </h3>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => openGoalModal(g)}
                            className="p-1 text-[#8b949e] hover:text-[#58a6ff] transition-colors"
                            title="Edit Goal"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteStudyGoal(goalId)}
                            className="p-1 text-[#8b949e] hover:text-[#f85149] transition-colors"
                            title="Delete Goal"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {g.description && (
                        <p className="text-xs text-[#8b949e] leading-relaxed">
                          {g.description}
                        </p>
                      )}

                      {/* Deadline Countdown & Status */}
                      <div className="flex items-center justify-between text-xs pt-1">
                        <div className="flex items-center gap-1.5 text-[#8b949e]">
                          <Clock className="w-3.5 h-3.5 text-[#58a6ff]" />
                          <span>Deadline: <strong className="text-[#c9d1d9]">{g.deadline}</strong></span>
                        </div>

                        <span className={`font-semibold ${
                          diffDays < 0
                            ? 'text-[#f85149]'
                            : diffDays === 0
                            ? 'text-[#d29922]'
                            : 'text-[#3fb950]'
                        }`}>
                          {diffDays < 0
                            ? `Overdue by ${Math.abs(diffDays)}d`
                            : diffDays === 0
                            ? 'Due Today'
                            : `${diffDays} days left`}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#8b949e]">
                            Execution Progress ({g.milestones?.filter(m => m.completed).length || 0}/{g.milestones?.length || 0} Milestones)
                          </span>
                          <span className="font-mono font-bold text-[#58a6ff]">{g.progress || 0}%</span>
                        </div>

                        <div className="w-full bg-[#0d1117] h-2 rounded-full overflow-hidden border border-[#30363d]">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isCompleted ? 'bg-[#238636]' : 'bg-[#1f6feb]'
                            }`}
                            style={{ width: `${Math.max(3, g.progress || 0)}%` }}
                          />
                        </div>
                      </div>

                      {/* Sub-Milestones Checklist Collapsible */}
                      {g.milestones && g.milestones.length > 0 && (
                        <div className="pt-2 border-t border-[#30363d]/60 space-y-2">
                          <button
                            type="button"
                            onClick={() => setExpandedGoals(prev => ({ ...prev, [goalId]: !prev[goalId] }))}
                            className="text-[11px] text-[#58a6ff] hover:underline flex items-center gap-1 font-medium"
                          >
                            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                            <span>{isExpanded ? 'Hide Key Milestones' : `View Key Milestones (${g.milestones.length})`}</span>
                          </button>

                          {isExpanded && (
                            <div className="space-y-1.5 pt-1 pl-1">
                              {g.milestones.map((m, mIdx) => (
                                <div
                                  key={m.id || mIdx}
                                  onClick={() => handleToggleGoalMilestone(g, mIdx)}
                                  className={`p-2 rounded border flex items-center gap-2 cursor-pointer transition text-xs ${
                                    m.completed
                                      ? 'bg-[#238636]/10 border-[#238636]/30 text-[#8b949e]'
                                      : 'bg-[#0d1117] border-[#30363d] text-[#c9d1d9] hover:border-[#58a6ff]/50'
                                  }`}
                                >
                                  {m.completed ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0" />
                                  ) : (
                                    <Circle className="w-3.5 h-3.5 text-[#484f58] shrink-0" />
                                  )}
                                  <span className={m.completed ? 'line-through text-[#8b949e]' : 'font-medium'}>
                                    {m.title}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. MODALS: TASK MODAL */}
      {/* ============================================================ */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-[#30363d] flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#e6edf3] flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-[#58a6ff]" />
                {editingTask ? 'Edit Daily Task' : 'Create Daily Placement Task'}
              </h3>
              <button
                type="button"
                onClick={() => setIsTaskModalOpen(false)}
                className="text-[#8b949e] hover:text-[#e6edf3]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTaskSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-semibold text-[#c9d1d9] mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solve 3 Graph DFS/BFS Problems, Revise OS Virtual Memory"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-3 py-2 focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c9d1d9] mb-1">Description / Notes</label>
                <textarea
                  rows={2}
                  placeholder="Optional details, edge cases to consider, or specific problem links..."
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-3 py-2 focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#c9d1d9] mb-1">Category</label>
                  <select
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-3 py-2 focus:outline-none focus:border-[#58a6ff]"
                  >
                    <option value="DSA Practice">DSA Practice</option>
                    <option value="Core CS">Core CS Fundamentals</option>
                    <option value="Project Work">Project Work</option>
                    <option value="Topic Revision">Topic Revision</option>
                    <option value="Mock Interview">Mock Interview</option>
                    <option value="Resume / Apply">Resume / Job Application</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c9d1d9] mb-1">Difficulty</label>
                  <select
                    value={taskDifficulty}
                    onChange={(e) => setTaskDifficulty(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-3 py-2 focus:outline-none focus:border-[#58a6ff]"
                  >
                    <option value="Hard">Hard (Heavy Focus)</option>
                    <option value="Medium">Medium (Standard)</option>
                    <option value="Easy">Easy (Quick Task)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#c9d1d9] mb-1">Priority</label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-3 py-2 focus:outline-none focus:border-[#58a6ff]"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c9d1d9] mb-1">Due Date</label>
                  <input
                    type="date"
                    value={taskDeadline}
                    onChange={(e) => setTaskDeadline(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-3 py-2 focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>
              </div>

              {studyGoals.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-[#c9d1d9] mb-1">Associated Placement Goal</label>
                  <select
                    value={taskGoalId}
                    onChange={(e) => setTaskGoalId(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-3 py-2 focus:outline-none focus:border-[#58a6ff]"
                  >
                    <option value="">None (Stand-alone Task)</option>
                    {studyGoals.map(g => (
                      <option key={g.id || g._id} value={g.id || g._id}>
                        {g.goalTitle}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#30363d]">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-xs font-medium text-[#c9d1d9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-[#1f6feb] hover:bg-[#388bfd] text-white text-xs font-semibold shadow"
                >
                  {editingTask ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 6. MODALS: GOAL MODAL */}
      {/* ============================================================ */}
      {isGoalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-[#30363d] flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#e6edf3] flex items-center gap-2">
                <Target className="w-4 h-4 text-[#238636]" />
                {editingGoal ? 'Edit Placement Goal' : 'Establish Long-Term Placement Goal'}
              </h3>
              <button
                type="button"
                onClick={() => setIsGoalModalOpen(false)}
                className="text-[#8b949e] hover:text-[#e6edf3]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGoalSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-semibold text-[#c9d1d9] mb-1">Goal Target Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master High-Level System Design & Distributed Systems"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-3 py-2 focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c9d1d9] mb-1">Strategy / Scope</label>
                <textarea
                  rows={2}
                  placeholder="What is your preparation strategy and target milestone criteria..."
                  value={goalDescription}
                  onChange={(e) => setGoalDescription(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-3 py-2 focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#c9d1d9] mb-1">Category Group</label>
                  <select
                    value={goalCategory}
                    onChange={(e) => setGoalCategory(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-3 py-2 focus:outline-none focus:border-[#58a6ff]"
                  >
                    <option value="SDE & Core DSA">SDE & Core DSA</option>
                    <option value="Full Stack Web">Full Stack Web</option>
                    <option value="Backend & Distributed">Backend & Distributed</option>
                    <option value="System Design">System Design</option>
                    <option value="DevOps & Cloud">DevOps & Cloud</option>
                    <option value="Core CS Fundamentals">Core CS Fundamentals</option>
                    <option value="General Placement">General Placement Target</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c9d1d9] mb-1">Difficulty</label>
                  <select
                    value={goalDifficulty}
                    onChange={(e) => setGoalDifficulty(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-3 py-2 focus:outline-none focus:border-[#58a6ff]"
                  >
                    <option value="Hard">Hard (Intensive Target)</option>
                    <option value="Medium">Medium</option>
                    <option value="Easy">Easy</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#c9d1d9] mb-1">Priority</label>
                  <select
                    value={goalPriority}
                    onChange={(e) => setGoalPriority(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-3 py-2 focus:outline-none focus:border-[#58a6ff]"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c9d1d9] mb-1">Target Deadline</label>
                  <input
                    type="date"
                    value={goalDeadline}
                    onChange={(e) => setGoalDeadline(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-3 py-2 focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>
              </div>

              {!editingGoal && (
                <div>
                  <label className="block text-xs font-semibold text-[#c9d1d9] mb-1">
                    Key Sub-Milestones (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Milestone 1: Complete Trees & Graphs&#10;Milestone 2: Build Production Capstone&#10;Milestone 3: 5 Mock Interviews"
                    value={goalMilestonesInput}
                    onChange={(e) => setGoalMilestonesInput(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-3 py-2 focus:outline-none focus:border-[#58a6ff] font-mono text-[11px]"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#30363d]">
                <button
                  type="button"
                  onClick={() => setIsGoalModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-xs font-medium text-[#c9d1d9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold shadow"
                >
                  {editingGoal ? 'Save Changes' : 'Establish Goal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );

  // -------------------------------------------------------------
  // Card Render Helpers
  // -------------------------------------------------------------
  function renderTaskCard(t) {
    const taskId = t.id || t._id;
    const isCompleted = t.taskStatus === true || t.taskStatus === 'Completed';
    const isOverdue = !isCompleted && (t.deadline || t.date) < todayStr;

    return (
      <div
        key={taskId}
        className={`p-3.5 rounded-md border transition-all flex items-start justify-between gap-3 ${
          isCompleted
            ? 'bg-[#238636]/10 border-[#238636]/30 text-[#8b949e]'
            : isOverdue
            ? 'bg-[#da3633]/10 border-[#da3633]/40 text-[#e6edf3]'
            : 'bg-[#161b22] border-[#30363d] hover:border-[#58a6ff]/50 text-[#e6edf3]'
        }`}
      >
        <div className="flex items-start gap-2.5 flex-1 min-w-0">
          <button
            type="button"
            onClick={() => handleToggleTask(taskId, isCompleted)}
            className="mt-0.5 shrink-0"
            title={isCompleted ? 'Mark Incomplete' : 'Complete task and advance streak'}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-4 h-4 text-[#3fb950]" />
            ) : (
              <Circle className="w-4 h-4 text-[#484f58] hover:text-[#58a6ff] transition-colors" />
            )}
          </button>

          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase ${getPriorityBadge(t.priority)}`}>
                {t.priority}
              </span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase ${getDifficultyBadge(t.difficulty)}`}>
                {t.difficulty}
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#0d1117] text-[#8b949e] border border-[#30363d]">
                {t.category}
              </span>

              <span className={`text-[10px] font-mono flex items-center gap-1 ml-auto ${
                isOverdue ? 'text-[#f85149] font-bold' : 'text-[#8b949e]'
              }`}>
                <Clock className="w-3 h-3" />
                {t.deadline} {t.dueTime ? `• ${t.dueTime}` : ''}
              </span>
            </div>

            <p className={`text-xs font-semibold leading-snug ${isCompleted ? 'line-through text-[#8b949e]' : 'text-[#e6edf3]'}`}>
              {t.taskDetails}
            </p>

            {t.description && (
              <p className="text-[11px] text-[#8b949e] leading-snug">
                {t.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => openTaskModal(t)}
            className="p-1 text-[#8b949e] hover:text-[#58a6ff] transition-colors"
            title="Edit Task"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => deleteDailyTask(taskId)}
            className="p-1 text-[#8b949e] hover:text-[#f85149] transition-colors"
            title="Delete Task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }
};

export default RevisionPlanner;
