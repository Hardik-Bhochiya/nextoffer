import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  CalendarCheck,
  Plus,
  CheckCircle2,
  Circle,
  Clock,
  Trash2,
  Calendar,
  Sparkles,
  X,
  RotateCcw,
  Target,
  ListTodo,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RevisionPlanner = () => {
  const {
    revisions,
    addRevision,
    toggleRevision,
    deleteRevision,
    studyGoals,
    addStudyGoal,
    deleteStudyGoal,
    dailyTasks,
    addDailyTask,
    toggleDailyTask,
    deleteDailyTask
  } = useData();

  const [activeTab, setActiveTab] = useState('planner'); // 'planner' | 'spaced-repetition'

  // Modals state
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Form states
  const [newTopic, setNewTopic] = useState('');
  const [newCategory, setNewCategory] = useState('DSA');
  const [newPriority, setNewPriority] = useState('High');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('10:00 AM');
  const [newNotes, setNewNotes] = useState('');

  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalPriority, setNewGoalPriority] = useState('High');
  const [newGoalDeadline, setNewGoalDeadline] = useState(new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]);

  const [newTaskDetails, setNewTaskDetails] = useState('');

  const handleToggleRevision = (id, currentlyCompleted) => {
    toggleRevision(id);
    if (!currentlyCompleted) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  const handleToggleTask = (id, currentStatus) => {
    toggleDailyTask(id);
    if (currentStatus !== 'Completed') {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.8 }
      });
    }
  };

  const handleAddRevisionSubmit = (e) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    addRevision({
      topic: newTopic.trim(),
      category: newCategory,
      priority: newPriority,
      scheduledDate: newDate,
      revisionDate: newDate,
      revisionTime: newTime,
      notes: newNotes
    });

    setNewTopic('');
    setNewNotes('');
    setIsRevisionModalOpen(false);
  };

  const handleAddGoalSubmit = (e) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    addStudyGoal({
      goalTitle: newGoalTitle.trim(),
      priority: newGoalPriority,
      deadline: newGoalDeadline,
      taskStatus: 'In Progress',
      progress: 0
    });

    setNewGoalTitle('');
    setIsGoalModalOpen(false);
  };

  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    if (!newTaskDetails.trim()) return;

    addDailyTask({
      taskDetails: newTaskDetails.trim(),
      taskStatus: 'Pending'
    });

    setNewTaskDetails('');
    setIsTaskModalOpen(false);
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayRevisions = revisions.filter(r => (r.scheduledDate || r.revisionDate) <= todayStr);
  const upcomingRevisions = revisions.filter(r => (r.scheduledDate || r.revisionDate) > todayStr);

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-indigo-400" /> Daily Planner & Revision Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Module R7: Organize placement goals, daily execution checklists, and spaced repetition schedules.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('planner')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'planner'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Study Goals & Daily Tasks
          </button>
          <button
            onClick={() => setActiveTab('spaced-repetition')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'spaced-repetition'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Spaced Revisions
          </button>
        </div>
      </div>

      {activeTab === 'planner' ? (
        /* DAILY PLANNER & GOALS VIEW (Module R7) */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Study Goals (Class Diagram: StudyGoal) */}
          <div className="glass-panel rounded-2xl p-6 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-400" />
                <div>
                  <h2 className="text-base font-bold text-white">Placement Study Goals</h2>
                  <p className="text-[11px] text-slate-400">Target milestones & deadlines</p>
                </div>
              </div>
              <button
                onClick={() => setIsGoalModalOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md"
              >
                <Plus className="w-3.5 h-3.5" /> Add Goal
              </button>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[460px] pr-1">
              {studyGoals.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-8">No goals created yet. Set your first goal!</p>
              ) : (
                studyGoals.map((g) => (
                  <div
                    key={g.goalId || g.plannerId}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 space-y-2.5 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            g.priority === 'High' ? 'bg-rose-950 text-rose-400 border border-rose-800/40' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {g.priority} Priority
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-indigo-400" /> Deadline: {g.deadline}
                          </span>
                        </div>
                        <h3 className="text-xs font-bold text-slate-100">{g.goalTitle}</h3>
                      </div>
                      <button
                        onClick={() => deleteStudyGoal(g.goalId || g.plannerId)}
                        className="p-1 text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                        <span>Status: <span className={g.taskStatus === 'Completed' ? 'text-emerald-400' : 'text-amber-400'}>{g.taskStatus}</span></span>
                        <span>{g.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                          style={{ width: `${g.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Daily Tasks (Class Diagram: DailyTask) */}
          <div className="glass-panel rounded-2xl p-6 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-emerald-400" />
                <div>
                  <h2 className="text-base font-bold text-white">Daily Execution Checklist</h2>
                  <p className="text-[11px] text-slate-400">{dailyTasks.filter(t => t.taskStatus === 'Completed').length} of {dailyTasks.length} Done Today</p>
                </div>
              </div>
              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md"
              >
                <Plus className="w-3.5 h-3.5" /> Add Task
              </button>
            </div>

            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[460px] pr-1">
              {dailyTasks.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-8">No tasks for today. Add a new task!</p>
              ) : (
                dailyTasks.map((t) => (
                  <div
                    key={t.taskId}
                    className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      t.taskStatus === 'Completed'
                        ? 'bg-emerald-950/20 border-emerald-900/30 text-slate-400'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-200'
                    }`}
                  >
                    <div
                      onClick={() => handleToggleTask(t.taskId, t.taskStatus)}
                      className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                    >
                      {t.taskStatus === 'Completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500 hover:text-emerald-400 shrink-0 transition-colors" />
                      )}
                      <span className={`text-xs font-medium truncate ${t.taskStatus === 'Completed' ? 'line-through text-slate-500' : ''}`}>
                        {t.taskDetails}
                      </span>
                    </div>

                    <button
                      onClick={() => deleteDailyTask(t.taskId)}
                      className="p-1 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        /* SPACED REPETITIONS VIEW */
        <div className="space-y-6">
          {/* Spaced Intervals Science Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="glass-panel p-3.5 rounded-xl text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Day 1</span>
              <p className="text-xs font-bold text-indigo-400">Immediate Recall</p>
              <p className="text-[10px] text-slate-500">Solidify initial intuition</p>
            </div>
            <div className="glass-panel p-3.5 rounded-xl text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Day 3</span>
              <p className="text-xs font-bold text-cyan-400">Edge Case Check</p>
              <p className="text-[10px] text-slate-500">Test boundaries without code</p>
            </div>
            <div className="glass-panel p-3.5 rounded-xl text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Day 7</span>
              <p className="text-xs font-bold text-amber-400">Active Recall Test</p>
              <p className="text-[10px] text-slate-500">Write dry run on whiteboard</p>
            </div>
            <div className="glass-panel p-3.5 rounded-xl text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Day 14</span>
              <p className="text-xs font-bold text-emerald-400">Long-Term Memory</p>
              <p className="text-[10px] text-slate-500">Mock interview condition</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Due Today Section */}
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" /> Due Today / Overdue ({todayRevisions.filter(r => !r.completed).length})
                </h2>
                <button
                  onClick={() => setIsRevisionModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" /> Schedule
                </button>
              </div>

              <div className="space-y-3">
                {todayRevisions.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">No revisions scheduled for today. Great job!</p>
                ) : (
                  todayRevisions.map((r) => (
                    <div
                      key={r.id || r.revisionId}
                      className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                        r.completed
                          ? 'bg-emerald-950/20 border-emerald-900/30 text-slate-400'
                          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <button
                          onClick={() => handleToggleRevision(r.id || r.revisionId, r.completed)}
                          className="mt-0.5"
                        >
                          {r.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-500 hover:text-indigo-400 transition-colors" />
                          )}
                        </button>

                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              r.priority === 'High' ? 'bg-rose-950 text-rose-400' : 'bg-slate-800 text-slate-300'
                            }`}>
                              {r.priority}
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold">{r.category}</span>
                            {r.revisionTime && <span className="text-[10px] text-indigo-400 font-mono">{r.revisionTime}</span>}
                          </div>
                          <p className={`text-xs font-bold leading-tight ${r.completed ? 'line-through' : 'text-slate-100'}`}>
                            {r.topic}
                          </p>
                          {r.notes && (
                            <p className="text-[11px] text-slate-400 leading-snug">{r.notes}</p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => deleteRevision(r.id || r.revisionId)}
                        className="p-1 text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Upcoming Revisions Section */}
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" /> Upcoming Revisions ({upcomingRevisions.length})
                </h2>
              </div>

              <div className="space-y-3">
                {upcomingRevisions.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">No upcoming revisions scheduled yet.</p>
                ) : (
                  upcomingRevisions.map((r) => (
                    <div
                      key={r.id || r.revisionId}
                      className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-indigo-400 font-mono font-semibold">
                            Scheduled: {r.scheduledDate || r.revisionDate}
                          </span>
                          <span className="text-[10px] text-slate-500">•</span>
                          <span className="text-[10px] text-slate-400">{r.category}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-200">{r.topic}</p>
                        {r.notes && (
                          <p className="text-[11px] text-slate-400">{r.notes}</p>
                        )}
                      </div>

                      <button
                        onClick={() => deleteRevision(r.id || r.revisionId)}
                        className="p-1 text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Revision Modal */}
      {isRevisionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel bg-slate-900 border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-indigo-400" /> Schedule Topic Revision
              </h2>
              <button
                onClick={() => setIsRevisionModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRevisionSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Topic / Problem to Revise *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Graph Cycle Detection (DFS & Kahn's Algorithm)"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="DSA">DSA</option>
                    <option value="Core Subjects">Core Subjects</option>
                    <option value="System Design">System Design</option>
                    <option value="HR & Behavioral">HR & Behavioral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Time</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="10:00 AM"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Revision Cue / Key Notes</label>
                <textarea
                  rows="2"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Key catch or memory trigger..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRevisionModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Study Goal Modal */}
      {isGoalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel bg-slate-900 border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-400" /> Create Placement Goal
              </h2>
              <button
                onClick={() => setIsGoalModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGoalSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Goal Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solve 50 DP Questions before Month End"
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                  <select
                    value={newGoalPriority}
                    onChange={(e) => setNewGoalPriority(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Deadline</label>
                  <input
                    type="date"
                    value={newGoalDeadline}
                    onChange={(e) => setNewGoalDeadline(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsGoalModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Daily Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel bg-slate-900 border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-emerald-400" /> Add Daily Task
              </h2>
              <button
                onClick={() => setIsTaskModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTaskSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Task Details *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Review OS Paging vs Segmentation notes"
                  value={newTaskDetails}
                  onChange={(e) => setNewTaskDetails(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
