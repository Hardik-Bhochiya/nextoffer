import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import {
  Code2,
  Search,
  Plus,
  ExternalLink,
  RotateCcw,
  BookOpen,
  Filter,
  X,
  FileText,
  Trash2
} from 'lucide-react';

export const DsaTracker = () => {
  const { dsaProblems, updateDsaStatus, addDsaProblem, deleteDsaProblem } = useData();

  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modals state
  const [activeNotesProblem, setActiveNotesProblem] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New problem form state
  const [newTitle, setNewTitle] = useState('');
  const [newTopic, setNewTopic] = useState('Arrays & Hashing');
  const [newDifficulty, setNewDifficulty] = useState('Medium');
  const [newPlatform, setNewPlatform] = useState('LeetCode');
  const [newUrl, setNewUrl] = useState('');
  const [newTimeComp, setNewTimeComp] = useState('O(n)');
  const [newSpaceComp, setNewSpaceComp] = useState('O(1)');
  const [newNotes, setNewNotes] = useState('');

  const topicsList = [
    'All',
    'Arrays & Hashing',
    'Two Pointers',
    'Sliding Window',
    'Linked List',
    'Trees',
    'Graphs',
    'Dynamic Programming'
  ];

  const platformsList = ['All', 'LeetCode', 'GeeksforGeeks', 'HackerRank', 'CodeStudio', 'CodeChef'];

  const filteredProblems = useMemo(() => {
    return dsaProblems.filter((prob) => {
      const title = prob.title || prob.problemTitle || '';
      const topic = prob.topic || '';
      const platform = prob.platform || (prob.url?.includes('geeksforgeeks') ? 'GeeksforGeeks' : 'LeetCode');
      const status = prob.status || prob.problemStatus || 'Solved';

      const matchSearch =
        title.toLowerCase().includes(search.toLowerCase()) ||
        topic.toLowerCase().includes(search.toLowerCase());
      const matchTopic = selectedTopic === 'All' || topic === selectedTopic;
      const matchDiff = selectedDifficulty === 'All' || prob.difficulty === selectedDifficulty;
      const matchPlatform = selectedPlatform === 'All' || platform === selectedPlatform;
      const matchStatus = selectedStatus === 'All' || status === selectedStatus;

      return matchSearch && matchTopic && matchDiff && matchPlatform && matchStatus;
    });
  }, [dsaProblems, search, selectedTopic, selectedDifficulty, selectedPlatform, selectedStatus]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addDsaProblem({
      title: newTitle.trim(),
      problemTitle: newTitle.trim(),
      topic: newTopic,
      difficulty: newDifficulty,
      platform: newPlatform,
      url: newUrl || 'https://leetcode.com',
      problemLink: newUrl || 'https://leetcode.com',
      timeComplexity: newTimeComp,
      spaceComplexity: newSpaceComp,
      notes: newNotes,
      status: 'Solved'
    });

    setNewTitle('');
    setNewUrl('');
    setNewNotes('');
    setIsAddModalOpen(false);
  };

  const handleNotesSave = (e) => {
    e.preventDefault();
    if (!activeNotesProblem) return;
    updateDsaStatus(activeNotesProblem.id, activeNotesProblem.status, activeNotesProblem.notes);
    setActiveNotesProblem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Code2 className="w-6 h-6 text-indigo-400" /> DSA Placement Tracker
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Curated placement questions across LeetCode, GFG & CodeStudio with spaced repetition intuition.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Problem
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel rounded-2xl p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search problem title, topic..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Platform Filter (ER Diagram Field) */}
          <div>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {platformsList.map(p => (
                <option key={p} value={p}>{p === 'All' ? 'All Platforms' : p}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Solved">Solved</option>
              <option value="Attempted">Attempted</option>
              <option value="Needs Revision">Needs Revision</option>
              <option value="Unsolved">Unsolved</option>
            </select>
          </div>
        </div>

        {/* Topic Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {topicsList.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedTopic === t
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Problems Table */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Problem</th>
                <th className="py-3.5 px-4">Platform</th>
                <th className="py-3.5 px-4">Topic</th>
                <th className="py-3.5 px-4">Difficulty</th>
                <th className="py-3.5 px-4">Complexity</th>
                <th className="py-3.5 px-4">Revisions</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredProblems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-500">
                    No problems match your current filters.
                  </td>
                </tr>
              ) : (
                filteredProblems.map((prob) => {
                  const title = prob.title || prob.problemTitle;
                  const platform = prob.platform || (prob.url?.includes('geeksforgeeks') ? 'GeeksforGeeks' : 'LeetCode');
                  const status = prob.status || prob.problemStatus || 'Solved';

                  return (
                    <tr key={prob.id} className="hover:bg-slate-900/50 transition-colors">
                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={status}
                          onChange={(e) => updateDsaStatus(prob.id, e.target.value)}
                          className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                            status === 'Solved'
                              ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/50'
                              : status === 'Needs Revision'
                              ? 'bg-amber-950/80 text-amber-400 border-amber-800/50'
                              : status === 'Attempted'
                              ? 'bg-blue-950/80 text-blue-400 border-blue-800/50'
                              : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          <option value="Solved">Solved</option>
                          <option value="Needs Revision">Needs Revision</option>
                          <option value="Attempted">Attempted</option>
                          <option value="Unsolved">Unsolved</option>
                        </select>
                      </td>

                      {/* Title & Link */}
                      <td className="py-3.5 px-4 font-semibold text-slate-100">
                        <div className="flex items-center gap-2">
                          <span>{title}</span>
                          {(prob.url || prob.problemLink) && (
                            <a
                              href={prob.url || prob.problemLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-500 hover:text-indigo-400 transition-colors"
                              title="Open Problem"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Platform Badge (ER Diagram: platform) */}
                      <td className="py-3.5 px-4">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-indigo-300">
                          {platform}
                        </span>
                      </td>

                      {/* Topic */}
                      <td className="py-3.5 px-4 text-slate-400 font-medium">
                        {prob.topic}
                      </td>

                      {/* Difficulty */}
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          prob.difficulty === 'Easy'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : prob.difficulty === 'Medium'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {prob.difficulty}
                        </span>
                      </td>

                      {/* Complexity */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                        <span className="text-indigo-300">{prob.timeComplexity || 'O(n)'}</span> / <span>{prob.spaceComplexity || 'O(1)'}</span>
                      </td>

                      {/* Revisions */}
                      <td className="py-3.5 px-4 text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{prob.revisionsCount || 0} times</span>
                        </div>
                      </td>

                      {/* Actions: Notes & Delete */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setActiveNotesProblem({ ...prob })}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors text-[11px]"
                            title="Notes"
                          >
                            <FileText className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Notes</span>
                          </button>
                          <button
                            onClick={() => deleteDsaProblem(prob.id)}
                            className="p-1 rounded-lg bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 transition-colors"
                            title="Delete Problem"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes Modal */}
      {activeNotesProblem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel bg-slate-900 border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" /> {activeNotesProblem.title || activeNotesProblem.problemTitle}
                </h2>
                <p className="text-xs text-slate-400">Personal approach & intuition notes</p>
              </div>
              <button
                onClick={() => setActiveNotesProblem(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleNotesSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Key Intuition & Edge Cases</label>
                <textarea
                  rows="6"
                  value={activeNotesProblem.notes || ''}
                  onChange={(e) => setActiveNotesProblem({ ...activeNotesProblem, notes: e.target.value })}
                  placeholder="e.g. Use a Hash Map to store seen complements. Check for negative numbers..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveNotesProblem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30"
                >
                  Save Notes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Problem Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel bg-slate-900 border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-400" /> Add New DSA Question
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Problem Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Subarray Sum Equals K"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Topic</label>
                  <select
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    {topicsList.filter(t => t !== 'All').map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    {platformsList.filter(p => p !== 'All').map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Difficulty</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Time Complexity</label>
                  <input
                    type="text"
                    value={newTimeComp}
                    onChange={(e) => setNewTimeComp(e.target.value)}
                    placeholder="O(n)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Problem URL (LeetCode / GFG)</label>
                <input
                  type="url"
                  placeholder="https://leetcode.com/problems/..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Notes & Intuition</label>
                <textarea
                  rows="3"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Core approach..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
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
                  Add to Tracker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
