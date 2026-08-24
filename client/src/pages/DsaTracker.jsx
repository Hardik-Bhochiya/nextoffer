import React, { useState, useEffect, useMemo } from 'react';
import { useData } from '../context/DataContext';
import api from '../services/api';
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
  Trash2,
  Sparkles,
  Flame,
  CheckCircle2,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

export const DsaTracker = () => {
  const { dsaProblems, updateDsaStatus, addDsaProblem, deleteDsaProblem } = useData();

  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // POTD state
  const [potd, setPotd] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [potdAdded, setPotdAdded] = useState(false);

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
    'Trees & BST',
    'Graphs',
    'Dynamic Programming'
  ];

  const platformsList = ['All', 'LeetCode', 'GeeksforGeeks', 'HackerRank', 'CodeStudio', 'CodeChef'];

  // Fetch POTD on mount
  useEffect(() => {
    const fetchPotd = async () => {
      try {
        const res = await api.get('/dsa/potd');
        if (res?.data) {
          setPotd(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPotd();
  }, []);

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
      const matchDifficulty = selectedDifficulty === 'All' || prob.difficulty === selectedDifficulty;
      const matchPlatform = selectedPlatform === 'All' || platform === selectedPlatform;
      const matchStatus = selectedStatus === 'All' || status === selectedStatus;

      return matchSearch && matchTopic && matchDifficulty && matchPlatform && matchStatus;
    });
  }, [dsaProblems, search, selectedTopic, selectedDifficulty, selectedPlatform, selectedStatus]);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    await addDsaProblem({
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

  const handleSolvePotd = async () => {
    if (!potd) return;
    await addDsaProblem({
      title: potd.title,
      topic: potd.topic,
      difficulty: potd.difficulty,
      status: 'Solved',
      timeComplexity: potd.timeComplexity,
      spaceComplexity: potd.spaceComplexity,
      notes: `Problem of the Day solved on ${potd.date}`,
      leetcodeUrl: potd.leetcodeUrl
    });
    setPotdAdded(true);
    setTimeout(() => setPotdAdded(false), 3000);
  };

  const handleNotesSave = (e) => {
    e.preventDefault();
    if (!activeNotesProblem) return;
    updateDsaStatus(activeNotesProblem.id, activeNotesProblem.status, activeNotesProblem.notes);
    setActiveNotesProblem(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
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

      {/* Problem of the Day (POTD) Banner */}
      {potd && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-800/40 p-6 shadow-xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Flame className="w-3 h-3 text-amber-400" /> Daily Challenge POTD
                </span>
                <span className="text-[10px] text-slate-400">{potd.date}</span>
              </div>
              <h2 className="text-lg font-black text-white">{potd.title}</h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">{potd.topic}</span>
                <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/40 font-bold">{potd.difficulty}</span>
                <span className="font-mono text-[11px] text-slate-400">Target: {potd.timeComplexity}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>{showHint ? 'Hide Hint' : 'View Hint'}</span>
              </button>

              {potdAdded ? (
                <span className="px-4 py-2 rounded-xl bg-emerald-950 text-emerald-300 text-xs font-semibold flex items-center gap-1 border border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Solved & Added!
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleSolvePotd}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark as Solved (+1 Streak)</span>
                </button>
              )}
            </div>
          </div>

          {showHint && (
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-amber-200/90 leading-relaxed font-sans animate-fadeIn">
              💡 <span className="font-bold">Algorithmic Hint:</span> {potd.hint}
            </div>
          )}
        </div>
      )}

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

          {/* Platform Filter */}
          <div>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {platformsList.map((p) => (
                <option key={p} value={p}>Platform: {p}</option>
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
              <option value="All">Difficulty: All</option>
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
              <option value="All">Status: All</option>
              <option value="Solved">Solved</option>
              <option value="Attempted">Attempted</option>
              <option value="Needs Revision">Needs Revision</option>
            </select>
          </div>
        </div>

        {/* Topic Pills */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-800/80">
          {topicsList.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedTopic === topic
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Problems Table */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Problem</th>
                <th className="py-3.5 px-4">Topic</th>
                <th className="py-3.5 px-4">Difficulty</th>
                <th className="py-3.5 px-4">Complexity</th>
                <th className="py-3.5 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProblems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No DSA problems found. Add your first problem above or solve today's POTD!
                  </td>
                </tr>
              ) : (
                filteredProblems.map((prob) => {
                  const status = prob.status || prob.problemStatus || 'Solved';
                  const title = prob.title || prob.problemTitle;
                  const platform = prob.platform || 'LeetCode';

                  return (
                    <tr key={prob.id} className="hover:bg-slate-900/40 transition-colors">
                      {/* Status select */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={status}
                          onChange={(e) => updateDsaStatus(prob.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border focus:outline-none ${
                            status === 'Solved'
                              ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/50'
                              : status === 'Attempted'
                              ? 'bg-amber-950/80 text-amber-400 border-amber-800/50'
                              : 'bg-rose-950/80 text-rose-400 border-rose-800/50'
                          }`}
                        >
                          <option value="Solved">Solved</option>
                          <option value="Attempted">Attempted</option>
                          <option value="Needs Revision">Needs Revision</option>
                        </select>
                      </td>

                      {/* Title + Link */}
                      <td className="py-3.5 px-4 font-medium text-slate-200">
                        <div className="flex items-center gap-2">
                          <span>{title}</span>
                          {(prob.url || prob.leetcodeUrl) && (
                            <a
                              href={prob.url || prob.leetcodeUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-500 hover:text-indigo-400"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Topic */}
                      <td className="py-3.5 px-4 text-slate-400">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px]">
                          {prob.topic}
                        </span>
                      </td>

                      {/* Difficulty */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`font-semibold ${
                            prob.difficulty === 'Easy'
                              ? 'text-emerald-400'
                              : prob.difficulty === 'Medium'
                              ? 'text-amber-400'
                              : 'text-rose-400'
                          }`}
                        >
                          {prob.difficulty}
                        </span>
                      </td>

                      {/* Complexity */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                        {prob.timeComplexity || 'O(n)'}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveNotesProblem(prob)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                            title="Notes & Code Intuition"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteDsaProblem(prob.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400"
                            title="Delete"
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

      {/* Add Problem Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-lg w-full rounded-2xl p-6 space-y-4 border border-slate-800 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-400" />
                Add New DSA Problem
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Problem Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Trapping Rain Water"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Topic</label>
                  <select
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    {topicsList.filter(t => t !== 'All').map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Difficulty</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Notes & Intuition</label>
                <textarea
                  rows={3}
                  placeholder="Two pointer approach with maxLeft and maxRight..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30"
                >
                  Save Problem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {activeNotesProblem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-md w-full rounded-2xl p-6 space-y-4 border border-slate-800 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                {activeNotesProblem.title}
              </h2>
              <button
                onClick={() => setActiveNotesProblem(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleNotesSave} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Key Intuition & Edge Cases</label>
                <textarea
                  rows={5}
                  value={activeNotesProblem.notes || ''}
                  onChange={(e) => setActiveNotesProblem({ ...activeNotesProblem, notes: e.target.value })}
                  placeholder="Record your algorithmic approach, trade-offs, and edge cases..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveNotesProblem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30"
                >
                  Update Notes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default DsaTracker;
