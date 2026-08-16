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
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RevisionPlanner = () => {
  const { revisions, addRevision, toggleRevision, deleteRevision } = useData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [newCategory, setNewCategory] = useState('DSA');
  const [newPriority, setNewPriority] = useState('High');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newNotes, setNewNotes] = useState('');

  const handleToggle = (id, currentlyCompleted) => {
    toggleRevision(id);
    if (!currentlyCompleted) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    addRevision({
      topic: newTopic.trim(),
      category: newCategory,
      priority: newPriority,
      scheduledDate: newDate,
      notes: newNotes
    });

    setNewTopic('');
    setNewNotes('');
    setIsAddModalOpen(false);
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayRevisions = revisions.filter(r => r.scheduledDate <= todayStr);
  const upcomingRevisions = revisions.filter(r => r.scheduledDate > todayStr);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-indigo-400" /> Spaced Repetition Revision Planner
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Retain DSA patterns and core CS concepts permanently using scientific spaced intervals.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Schedule Revision
        </button>
      </div>

      {/* Spaced Intervals Science Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-panel p-3.5 rounded-xl text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Day 1</span>
          <p className="text-xs font-bold text-indigo-400">Immediate Recall</p>
          <p className="text-[10px] text-slate-500">Solidify initial intuition</p>
        </div>
        <div className="glass-panel p-3.5 rounded-xl text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Day 3</span>
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

      {/* Main Revision Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Due Today Section */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" /> Due Today / Overdue ({todayRevisions.filter(r => !r.completed).length})
            </h2>
            <span className="text-xs text-slate-400">{todayStr}</span>
          </div>

          <div className="space-y-3">
            {todayRevisions.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No revisions scheduled for today. Great job!</p>
            ) : (
              todayRevisions.map((r) => (
                <div
                  key={r.id}
                  className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    r.completed
                      ? 'bg-emerald-950/20 border-emerald-900/30 text-slate-400'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => handleToggle(r.id, r.completed)}
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
                    onClick={() => deleteRevision(r.id)}
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
                  key={r.id}
                  className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-indigo-400 font-mono font-semibold">
                        Scheduled: {r.scheduledDate}
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
                    onClick={() => deleteRevision(r.id)}
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

      {/* Add Revision Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel bg-slate-900 border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-indigo-400" /> Schedule Topic Revision
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
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

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Scheduled Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
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
                  onClick={() => setIsAddModalOpen(false)}
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
    </div>
  );
};
