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
    if (!id) return;
    toggleDailyTask(id);
    const isCompleted = currentStatus === true || currentStatus === 'Completed';
    if (!isCompleted) {
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
      taskStatus: false
    });

    setNewTaskDetails('');
    setIsTaskModalOpen(false);
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayRevisions = revisions.filter(r => (r.scheduledDate || r.revisionDate) <= todayStr);
  const upcomingRevisions = revisions.filter(r => (r.scheduledDate || r.revisionDate) > todayStr);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#e6edf3] flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-[#58a6ff]" /> Daily Planner & Revision Management
          </h1>
          <p className="text-xs text-[#8b949e] mt-1">
            Organize placement study goals, daily execution checklists, and spaced repetition intervals.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1.5 bg-[#161b22] border border-[#30363d] p-1 rounded-md self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('planner')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'planner'
                ? 'bg-[#1f6feb] text-white shadow-sm'
                : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            Study Goals & Tasks
          </button>
          <button
            onClick={() => setActiveTab('spaced-repetition')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'spaced-repetition'
                ? 'bg-[#1f6feb] text-white shadow-sm'
                : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            Spaced Revisions
          </button>
        </div>
      </div>

      {activeTab === 'planner' ? (
        /* DAILY PLANNER & GOALS VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Study Goals */}
          <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-5 space-y-4 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#58a6ff]" />
                <div>
                  <h2 className="text-sm font-semibold text-[#e6edf3]">Placement Study Goals</h2>
                  <p className="text-[11px] text-[#8b949e]">Target milestones & deadlines</p>
                </div>
              </div>
              <button
                onClick={() => setIsGoalModalOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-medium shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Add Goal
              </button>
            </div>

            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[460px] pr-1">
              {studyGoals.length === 0 ? (
                <p className="text-xs text-[#8b949e] text-center py-8">No goals created yet. Set your first goal!</p>
              ) : (
                studyGoals.map((g) => {
                  const goalId = g.id || g._id || g.goalId || g.plannerId;
                  return (
                    <div
                      key={goalId}
                      className="p-3.5 rounded-md bg-[#0d1117] border border-[#30363d] hover:border-[#8b949e] space-y-2.5 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                              g.priority === 'High' ? 'bg-[#da3633]/15 text-[#f85149] border border-[#da3633]/40' : 'bg-[#21262d] text-[#8b949e] border border-[#30363d]'
                            }`}>
                              {g.priority} Priority
                            </span>
                            <span className="text-[10px] text-[#8b949e] flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#58a6ff]" /> Deadline: {g.deadline}
                            </span>
                          </div>
                          <h3 className="text-xs font-semibold text-[#e6edf3]">{g.goalTitle}</h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteStudyGoal(goalId)}
                          className="p-1 text-[#8b949e] hover:text-[#f85149] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-[#8b949e] font-medium">
                          <span>Status: <span className={g.taskStatus === 'Completed' || g.progress === 100 ? 'text-[#3fb950]' : 'text-[#d29922]'}>{g.taskStatus || (g.progress === 100 ? 'Completed' : 'In Progress')}</span></span>
                          <span className="font-mono">{g.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-[#21262d] h-1.5 rounded-full overflow-hidden border border-[#30363d]">
                          <div
                            className="h-full bg-[#238636] rounded-full transition-all duration-300"
                            style={{ width: `${g.progress || 0}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Daily Tasks */}
          <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-5 space-y-4 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-[#3fb950]" />
                <div>
                  <h2 className="text-sm font-semibold text-[#e6edf3]">Daily Execution Checklist</h2>
                  <p className="text-[11px] text-[#8b949e]">{dailyTasks.filter(t => t.taskStatus === true || t.taskStatus === 'Completed').length} of {dailyTasks.length} Done Today</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsTaskModalOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-medium shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Task
              </button>
            </div>

            <div className="space-y-2 flex-1 overflow-y-auto max-h-[460px] pr-1">
              {dailyTasks.length === 0 ? (
                <p className="text-xs text-[#8b949e] text-center py-8">No tasks for today. Add a new task!</p>
              ) : (
                dailyTasks.map((t) => {
                  const taskId = t.id || t._id || t.taskId;
                  const isCompleted = t.taskStatus === true || t.taskStatus === 'Completed';
                  return (
                    <div
                      key={taskId}
                      className={`p-3 rounded-md border transition-all flex items-center justify-between gap-3 ${
                        isCompleted
                          ? 'bg-[#238636]/10 border-[#238636]/30 text-[#8b949e]'
                          : 'bg-[#0d1117] border-[#30363d] hover:border-[#8b949e] text-[#e6edf3]'
                      }`}
                    >
                      <div
                        onClick={() => handleToggleTask(taskId, t.taskStatus)}
                        className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer"
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-[#3fb950] shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-[#484f58] hover:text-[#58a6ff] shrink-0 transition-colors" />
                        )}
                        <span className={`text-xs font-medium truncate ${isCompleted ? 'line-through text-[#8b949e]' : ''}`}>
                          {t.taskDetails}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteDailyTask(taskId)}
                        className="p-1 text-[#8b949e] hover:text-[#f85149] cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      ) : (
        /* SPACED REPETITIONS VIEW */
        <div className="space-y-6">
          {/* Spaced Intervals Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#161b22] border border-[#30363d] p-3.5 rounded-lg text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b949e]">Day 1</span>
              <p className="text-xs font-bold text-[#58a6ff]">Immediate Recall</p>
              <p className="text-[10px] text-[#8b949e]">Solidify initial intuition</p>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] p-3.5 rounded-lg text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#58a6ff]">Day 3</span>
              <p className="text-xs font-bold text-[#58a6ff]">Edge Case Check</p>
              <p className="text-[10px] text-[#8b949e]">Test boundaries without code</p>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] p-3.5 rounded-lg text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#d29922]">Day 7</span>
              <p className="text-xs font-bold text-[#d29922]">Active Recall Test</p>
              <p className="text-[10px] text-[#8b949e]">Write dry run on whiteboard</p>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] p-3.5 rounded-lg text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3fb950]">Day 14</span>
              <p className="text-xs font-bold text-[#3fb950]">Long-Term Memory</p>
              <p className="text-[10px] text-[#8b949e]">Mock interview condition</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Due Today Section */}
            <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-[#e6edf3] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#d29922]" /> Due Today / Overdue ({todayRevisions.filter(r => !r.completed).length})
                </h2>
                <button
                  onClick={() => setIsRevisionModalOpen(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-medium shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> Schedule
                </button>
              </div>

              <div className="space-y-2.5">
                {todayRevisions.length === 0 ? (
                  <p className="text-xs text-[#8b949e] py-6 text-center">No revisions scheduled for today. Great job!</p>
                ) : (
                  todayRevisions.map((r) => (
                    <div
                      key={r.id || r.revisionId}
                      className={`p-3 rounded-md border transition-all flex items-start justify-between gap-3 ${
                        r.completed
                          ? 'bg-[#238636]/10 border-[#238636]/30 text-[#8b949e]'
                          : 'bg-[#0d1117] border-[#30363d] hover:border-[#8b949e] text-[#e6edf3]'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        <button
                          onClick={() => handleToggleRevision(r.id || r.revisionId, r.completed)}
                          className="mt-0.5"
                        >
                          {r.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-[#3fb950]" />
                          ) : (
                            <Circle className="w-4 h-4 text-[#484f58] hover:text-[#58a6ff] transition-colors" />
                          )}
                        </button>

                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                              r.priority === 'High' ? 'bg-[#da3633]/15 text-[#f85149] border border-[#da3633]/40' : 'bg-[#21262d] text-[#8b949e] border border-[#30363d]'
                            }`}>
                              {r.priority}
                            </span>
                            <span className="text-[10px] text-[#8b949e] font-medium">{r.category}</span>
                            {r.revisionTime && <span className="text-[10px] text-[#58a6ff] font-mono">{r.revisionTime}</span>}
                          </div>
                          <p className={`text-xs font-semibold leading-tight ${r.completed ? 'line-through text-[#8b949e]' : 'text-[#e6edf3]'}`}>
                            {r.topic}
                          </p>
                          {r.notes && (
                            <p className="text-[11px] text-[#8b949e] leading-snug">{r.notes}</p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => deleteRevision(r.id || r.revisionId)}
                        className="p-1 text-[#8b949e] hover:text-[#f85149]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Upcoming Revisions Section */}
            <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-[#e6edf3] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#58a6ff]" /> Upcoming Revisions ({upcomingRevisions.length})
                </h2>
              </div>

              <div className="space-y-2.5">
                {upcomingRevisions.length === 0 ? (
                  <p className="text-xs text-[#8b949e] py-6 text-center">No upcoming revisions scheduled yet.</p>
                ) : (
                  upcomingRevisions.map((r) => (
                    <div
                      key={r.id || r.revisionId}
                      className="p-3 rounded-md bg-[#0d1117] border border-[#30363d] flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-[#58a6ff] font-mono font-medium">
                            Scheduled: {r.scheduledDate || r.revisionDate}
                          </span>
                          <span className="text-[10px] text-[#8b949e]">•</span>
                          <span className="text-[10px] text-[#8b949e]">{r.category}</span>
                        </div>
                        <p className="text-xs font-semibold text-[#e6edf3]">{r.topic}</p>
                        {r.notes && (
                          <p className="text-[11px] text-[#8b949e]">{r.notes}</p>
                        )}
                      </div>

                      <button
                        onClick={() => deleteRevision(r.id || r.revisionId)}
                        className="p-1 text-[#8b949e] hover:text-[#f85149]"
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
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
              <h2 className="text-sm font-bold text-[#e6edf3] flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#58a6ff]" /> Schedule Topic Revision
              </h2>
              <button
                onClick={() => setIsRevisionModalOpen(false)}
                className="p-1 rounded hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRevisionSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Topic / Problem to Revise *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Graph Cycle Detection (DFS & Kahn's Algorithm)"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                  >
                    <option value="DSA">DSA</option>
                    <option value="Core Subjects">Core Subjects</option>
                    <option value="System Design">System Design</option>
                    <option value="HR & Behavioral">HR & Behavioral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Time</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="10:00 AM"
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Revision Cue / Key Notes</label>
                <textarea
                  rows="2"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Key catch or memory trigger..."
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#30363d]">
                <button
                  type="button"
                  onClick={() => setIsRevisionModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-medium shadow-sm"
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
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
              <h2 className="text-sm font-bold text-[#e6edf3] flex items-center gap-2">
                <Target className="w-4 h-4 text-[#58a6ff]" /> Create Placement Goal
              </h2>
              <button
                onClick={() => setIsGoalModalOpen(false)}
                className="p-1 rounded hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGoalSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Goal Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solve 50 DP Questions before Month End"
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Priority</label>
                  <select
                    value={newGoalPriority}
                    onChange={(e) => setNewGoalPriority(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Target Deadline</label>
                  <input
                    type="date"
                    value={newGoalDeadline}
                    onChange={(e) => setNewGoalDeadline(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#30363d]">
                <button
                  type="button"
                  onClick={() => setIsGoalModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-medium shadow-sm"
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
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
              <h2 className="text-sm font-bold text-[#e6edf3] flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-[#3fb950]" /> Add Daily Task
              </h2>
              <button
                onClick={() => setIsTaskModalOpen(false)}
                className="p-1 rounded hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTaskSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1">Task Details *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Review OS Paging vs Segmentation notes"
                  value={newTaskDetails}
                  onChange={(e) => setNewTaskDetails(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#30363d]">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-medium shadow-sm"
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

export default RevisionPlanner;
