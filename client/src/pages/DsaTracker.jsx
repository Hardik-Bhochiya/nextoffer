import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { getRoleConfig } from '../data/rolesData';
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
  const { user } = useAuth();
  const { dsaProblems, updateDsaStatus, addDsaProblem, deleteDsaProblem } = useData();

  const currentRole = user?.targetRole || 'Full Stack Software Engineer';
  const roleConfig = getRoleConfig(currentRole);

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
    const existing = dsaProblems.find(p => (p.title || p.problemTitle)?.toLowerCase() === potd.title?.toLowerCase());
    if (existing) {
      await updateDsaStatus(existing.id || existing._id, 'Solved', `Problem of the Day solved on ${potd.date}`);
    } else {
      await addDsaProblem({
        title: potd.title,
        problemTitle: potd.title,
        topic: potd.topic,
        difficulty: potd.difficulty,
        status: 'Solved',
        timeComplexity: potd.timeComplexity,
        spaceComplexity: potd.spaceComplexity,
        notes: `Problem of the Day solved on ${potd.date}`,
        url: potd.leetcodeUrl,
        leetcodeUrl: potd.leetcodeUrl
      });
    }
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-4">
        <div>
          <h1 className="text-xl font-bold text-[#f0f6fc] flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#58a6ff]" /> DSA Placement Tracker
          </h1>
          <p className="text-xs text-[#8b949e] mt-0.5">
            Curated placement questions across LeetCode, GFG & CodeStudio with spaced repetition intuition.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/30 text-white text-xs font-medium shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" /> Add Problem
        </button>
      </div>

      {/* Problem of the Day (POTD) Banner */}
      {potd && (
        <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#d29922]/15 text-[#d29922] border border-[#d29922]/30">
                  <Flame className="w-3 h-3 text-[#d29922]" /> Daily Challenge POTD
                </span>
                <span className="text-[10px] text-[#8b949e]">{potd.date}</span>
              </div>
              <h2 className="text-base font-bold text-[#f0f6fc]">{potd.title}</h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#8b949e]">
                <span className="px-2 py-0.5 rounded bg-[#21262d] text-[#c9d1d9] border border-[#30363d]">{potd.topic}</span>
                <span className={`px-2 py-0.5 rounded font-medium border ${
                  potd.difficulty === 'Easy' ? 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/30' :
                  potd.difficulty === 'Medium' ? 'bg-[#d29922]/15 text-[#d29922] border-[#d29922]/30' :
                  'bg-[#da3633]/15 text-[#f85149] border-[#da3633]/30'
                }`}>{potd.difficulty}</span>
                <span className="font-mono text-[11px] text-[#8b949e]">Target: {potd.timeComplexity}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5 text-[#d29922]" />
                <span>{showHint ? 'Hide Hint' : 'View Hint'}</span>
              </button>

              {potdAdded ? (
                <span className="px-3 py-1.5 rounded-md bg-[#238636]/15 text-[#3fb950] text-xs font-medium flex items-center gap-1 border border-[#238636]/30">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Solved & Added!
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleSolvePotd}
                  className="px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/30 text-white text-xs font-medium shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark as Solved (+1 Streak)</span>
                </button>
              )}
            </div>
          </div>

          {showHint && (
            <div className="p-3 rounded-md bg-[#0d1117] border border-[#30363d] text-xs text-[#d29922] leading-relaxed font-sans animate-fadeIn">
              💡 <span className="font-semibold">Algorithmic Hint:</span> {potd.hint}
            </div>
          )}
        </div>
      )}

      {/* Role Specialization Focus Guide */}
      <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#58a6ff] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#58a6ff]" /> {roleConfig.shortLabel} Priority Topics:
          </span>
          <span className="text-[11px] text-[#8b949e]">High-yield algorithmic patterns for your target role</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {roleConfig.recommendedDsaTopics.map((top) => {
            const isMatch = selectedTopic === top;
            return (
              <button
                key={top}
                type="button"
                onClick={() => setSelectedTopic(isMatch ? 'All' : top)}
                className={`text-[10px] px-2 py-0.5 rounded-md font-medium transition ${
                  isMatch
                    ? 'bg-[#21262d] text-[#f0f6fc] border border-[#8b949e]'
                    : 'bg-[#0d1117] text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] border border-[#30363d]'
                }`}
              >
                {top}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-3.5 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search problem title, topic..."
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-9 pr-3 py-1.5 text-xs text-[#f0f6fc] placeholder-[#6e7681] focus:outline-none focus:border-[#58a6ff]"
            />
          </div>

          {/* Platform Filter */}
          <div>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
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
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
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
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
            >
              <option value="All">Status: All</option>
              <option value="Solved">Solved</option>
              <option value="Attempted">Attempted</option>
              <option value="Needs Revision">Needs Revision</option>
            </select>
          </div>
        </div>

        {/* Topic Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#30363d]">
          {topicsList.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                selectedTopic === topic
                  ? 'bg-[#21262d] text-[#f0f6fc] border border-[#8b949e]'
                  : 'bg-[#0d1117] text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] border border-[#30363d]'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Problems Table */}
      <div className="rounded-lg bg-[#161b22] border border-[#30363d] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#161b22] border-b border-[#30363d] text-[#8b949e] font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Problem</th>
                <th className="py-3 px-4">Topic</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Complexity</th>
                <th className="py-3 px-4">Actions</th>
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
                          className={`px-2 py-0.5 rounded-md text-[11px] font-medium border focus:outline-none ${
                            status === 'Solved'
                              ? 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/30'
                              : status === 'Attempted'
                              ? 'bg-[#d29922]/15 text-[#d29922] border-[#d29922]/30'
                              : 'bg-[#da3633]/15 text-[#f85149] border-[#da3633]/30'
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
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setActiveNotesProblem(prob)}
                            className="p-1 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-[#f0f6fc] border border-[#30363d]"
                            title="Notes & Code Intuition"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteDsaProblem(prob.id)}
                            className="p-1 rounded-md bg-[#21262d] hover:bg-[#da3633]/15 text-[#8b949e] hover:text-[#f85149] border border-[#30363d]"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] max-w-lg w-full rounded-lg p-5 space-y-4 border border-[#30363d] shadow-2xl animate-fadeIn text-[#f0f6fc]">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-2.5">
              <h2 className="text-sm font-semibold text-[#f0f6fc] flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#58a6ff]" />
                Add New DSA Problem
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-[#8b949e] hover:text-[#f0f6fc]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Problem Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Trapping Rain Water"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Topic</label>
                  <select
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  >
                    {topicsList.filter(t => t !== 'All').map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Difficulty</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Notes & Intuition</label>
                <textarea
                  rows={3}
                  placeholder="Two pointer approach with maxLeft and maxRight..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-xs text-[#f0f6fc] font-mono focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#30363d]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/30 text-white text-xs font-medium shadow-sm"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] max-w-md w-full rounded-lg p-5 space-y-4 border border-[#30363d] shadow-2xl animate-fadeIn text-[#f0f6fc]">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-2.5">
              <h2 className="text-sm font-semibold text-[#f0f6fc] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#58a6ff]" />
                {activeNotesProblem.title}
              </h2>
              <button
                onClick={() => setActiveNotesProblem(null)}
                className="p-1 text-[#8b949e] hover:text-[#f0f6fc]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleNotesSave} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Key Intuition & Edge Cases</label>
                <textarea
                  rows={5}
                  value={activeNotesProblem.notes || ''}
                  onChange={(e) => setActiveNotesProblem({ ...activeNotesProblem, notes: e.target.value })}
                  placeholder="Record your algorithmic approach, trade-offs, and edge cases..."
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-xs text-[#f0f6fc] font-mono focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#30363d]">
                <button
                  type="button"
                  onClick={() => setActiveNotesProblem(null)}
                  className="px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/30 text-white text-xs font-medium shadow-sm"
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
