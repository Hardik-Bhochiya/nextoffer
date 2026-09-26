import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  Code2,
  Search,
  Plus,
  ExternalLink,
  RotateCcw,
  X,
  FileText,
  Trash2,
  Building2,
  Globe,
  Tag,
  Edit3,
  Layers,
  Check,
  ChevronDown,
  ChevronUp,
  Filter,
  Target,
  Sparkles
} from 'lucide-react';
import { LeetCodeProgressRing } from '../components/dsa/LeetCodeProgressRing';

const CODING_PLATFORMS = [
  {
    name: 'LeetCode',
    tagline: 'Top Interview 150 & Daily POTD',
    url: 'https://leetcode.com/problemset/all/',
    badge: 'Standard',
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400'
  },
  {
    name: 'GeeksforGeeks',
    tagline: 'Topic-wise Practice & Placement Sheets',
    url: 'https://www.geeksforgeeks.org/explore?page=1&sortBy=submissions',
    badge: 'Popular',
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400'
  },
  {
    name: "Striver's A2Z Sheet",
    tagline: 'TakeUForward Complete Placement Sheet',
    url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
    badge: 'SDE Core',
    color: 'from-red-500/20 to-rose-500/10 border-red-500/30 text-red-400'
  },
  {
    name: 'NeetCode 150',
    tagline: 'Blind 75 & NeetCode Roadmap',
    url: 'https://neetcode.io/practice',
    badge: 'Curated',
    color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400'
  },
  {
    name: 'Code360 by Coding Ninjas',
    tagline: 'Company Interview Archive & Questions',
    url: 'https://www.naukri.com/code360/problems',
    badge: 'Company Qs',
    color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400'
  },
  {
    name: 'CodeChef',
    tagline: 'Contests, Star Ratings & Practice',
    url: 'https://www.codechef.com/practice',
    badge: 'Contests',
    color: 'from-yellow-500/20 to-amber-500/10 border-yellow-500/30 text-yellow-400'
  },
  {
    name: 'Codeforces',
    tagline: 'Competitive Programming Problemset',
    url: 'https://codeforces.com/problemset',
    badge: 'Algorithms',
    color: 'from-sky-500/20 to-blue-500/10 border-sky-500/30 text-sky-400'
  },
  {
    name: 'InterviewBit',
    tagline: 'Structured Company-wise Tracks',
    url: 'https://www.interviewbit.com/practice/',
    badge: 'Interviews',
    color: 'from-teal-500/20 to-emerald-500/10 border-teal-500/30 text-teal-400'
  }
];

const COMMON_TC = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n^2)', 'O(2^n)'];
const COMMON_SC = ['O(1)', 'O(log n)', 'O(n)', 'O(h)', 'O(n^2)'];

// Core standard DSA topics for the interactive quick-pill bar
const CORE_DSA_QUICK_TOPICS = [
  'Arrays & Hashing',
  'Two Pointers',
  'Binary Search',
  'Sliding Window',
  'Stack & Queue',
  'Linked List',
  'Trees & BST',
  'Dynamic Programming',
  'Graphs & BFS/DFS',
  'Greedy Algorithms',
  'Heap & Priority Queue',
  'Backtracking & Recursion'
];

const TOPIC_PREVIEW_LIMIT = 8;

const formatExternalUrl = (rawUrl) => {
  if (!rawUrl) return '';
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

export const DsaTracker = () => {
  const {
    dsaProblems = [],
    topics = [],
    addTopic,
    addDsaProblem,
    updateDsaStatus,
    updateDsaProblem,
    deleteDsaProblem,
    incrementRevision
  } = useData();

  // Search & Multi-Topic Filter state
  const [search, setSearch] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]); // Array of strings (empty means all)
  const [topicMatchMode, setTopicMatchMode] = useState('all'); // default to 'all' (AND) so selecting multiple topics strictly narrows down
  const [showAllTopics, setShowAllTopics] = useState(false); // Inline See More / See Less toggle for 10+ topics

  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [notification, setNotification] = useState(null);

  // Topic multi-select toggle helper (e.g. clicking Array + Binary Search)
  const toggleTopic = (topic) => {
    if (topic === 'All') {
      setSelectedTopics([]);
      return;
    }
    setSelectedTopics((prev) => {
      const exists = prev.some((t) => t.toLowerCase() === topic.toLowerCase());
      if (exists) {
        return prev.filter((t) => t.toLowerCase() !== topic.toLowerCase());
      } else {
        return [...prev, topic];
      }
    });
  };

  const clearTopics = () => setSelectedTopics([]);

  // Inline topic creation directly in Topics section
  const [isAddingFilterTopic, setIsAddingFilterTopic] = useState(false);
  const [filterTopicInput, setFilterTopicInput] = useState('');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [activeNotesProblem, setActiveNotesProblem] = useState(null);

  // Add problem form state (supports MULTIPLE topics)
  const [formTitle, setFormTitle] = useState('');
  const [formTopics, setFormTopics] = useState(['Arrays & Hashing']);

  const hasActiveFilters =
    selectedTopics.length > 0 ||
    selectedDifficulty !== 'All' ||
    selectedStatus !== 'All' ||
    selectedCompany !== 'All' ||
    search.trim() !== '';

  const clearAllFilters = () => {
    setSelectedTopics([]);
    setSelectedDifficulty('All');
    setSelectedStatus('All');
    setSelectedCompany('All');
    setSearch('');
  };
  const [formDifficulty, setFormDifficulty] = useState('Medium');
  const [formUrl, setFormUrl] = useState('');
  const [formPlatform, setFormPlatform] = useState('LeetCode');
  const [formTimeComp, setFormTimeComp] = useState('O(n)');
  const [formSpaceComp, setFormSpaceComp] = useState('O(1)');
  const [formCompanies, setFormCompanies] = useState('');
  const [formStatus, setFormStatus] = useState('Completed');
  const [formRevisions, setFormRevisions] = useState(0);
  const [formNotes, setFormNotes] = useState('');
  const [inlineNewTopic, setInlineNewTopic] = useState('');
  const [isAddingInlineTopic, setIsAddingInlineTopic] = useState(false);

  // Edit problem form state (supports MULTIPLE topics)
  const [editTitle, setEditTitle] = useState('');
  const [editTopics, setEditTopics] = useState([]);
  const [editDifficulty, setEditDifficulty] = useState('Medium');
  const [editUrl, setEditUrl] = useState('');
  const [editPlatform, setEditPlatform] = useState('LeetCode');
  const [editTimeComp, setEditTimeComp] = useState('O(n)');
  const [editSpaceComp, setEditSpaceComp] = useState('O(1)');
  const [editCompanies, setEditCompanies] = useState('');
  const [editStatus, setEditStatus] = useState('Completed');
  const [editRevisions, setEditRevisions] = useState(0);
  const [editNotes, setEditNotes] = useState('');
  const [isAddingEditInlineTopic, setIsAddingEditInlineTopic] = useState(false);
  const [editInlineTopicInput, setEditInlineTopicInput] = useState('');

  // Compute live DSA progress statistics
  const stats = useMemo(() => {
    let completed = 0;
    let attended = 0;
    let needsRev = 0;
    let unsolved = 0;
    let easyTotal = 0;
    let mediumTotal = 0;
    let hardTotal = 0;
    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;

    dsaProblems.forEach(p => {
      const s = p.status || p.problemStatus;
      const isSolved = s === 'Completed' || s === 'Solved';
      if (isSolved) completed++;
      else if (s === 'Attended' || s === 'Attempted') attended++;
      else if (s === 'Needs Revision') needsRev++;
      else unsolved++;

      const d = p.difficulty;
      if (d === 'Easy') {
        easyTotal++;
        if (isSolved) easySolved++;
      } else if (d === 'Hard') {
        hardTotal++;
        if (isSolved) hardSolved++;
      } else {
        mediumTotal++;
        if (isSolved) mediumSolved++;
      }
    });

    return {
      total: dsaProblems.length,
      completed,
      attended,
      needsRev,
      unsolved,
      easyTotal,
      mediumTotal,
      hardTotal,
      easySolved,
      mediumSolved,
      hardSolved
    };
  }, [dsaProblems]);

  // Combine and deduplicate topics from list + questions, prioritizing core DSA topics first
  const allAvailableTopics = useMemo(() => {
    const fromProblems = [];
    dsaProblems.forEach(p => {
      if (Array.isArray(p.topics)) {
        p.topics.forEach(t => fromProblems.push(t));
      } else if (p.topic) {
        fromProblems.push(p.topic);
      }
    });
    const combined = Array.from(new Set([...topics, ...fromProblems])).filter(Boolean);
    const coreMap = new Map(CORE_DSA_QUICK_TOPICS.map((t, idx) => [t.toLowerCase(), idx]));
    return combined.sort((a, b) => {
      const idxA = coreMap.has(a.toLowerCase()) ? coreMap.get(a.toLowerCase()) : 999;
      const idxB = coreMap.has(b.toLowerCase()) ? coreMap.get(b.toLowerCase()) : 999;
      if (idxA !== idxB) return idxA - idxB;
      return a.localeCompare(b);
    });
  }, [topics, dsaProblems]);

  // Topic pills displayed inline (with preview limit and See More / See Less toggle)
  const displayedTopics = useMemo(() => {
    if (showAllTopics) {
      return allAvailableTopics;
    }
    const preview = allAvailableTopics.slice(0, TOPIC_PREVIEW_LIMIT);
    // Keep any currently selected topic visible even if beyond the preview slice
    selectedTopics.forEach((st) => {
      if (!preview.some((t) => t.toLowerCase() === st.toLowerCase())) {
        const found = allAvailableTopics.find((t) => t.toLowerCase() === st.toLowerCase()) || st;
        preview.push(found);
      }
    });
    return preview;
  }, [showAllTopics, allAvailableTopics, selectedTopics]);

  const remainingTopicsCount = Math.max(0, allAvailableTopics.length - TOPIC_PREVIEW_LIMIT);

  // Topic frequency count for the dropdown list
  const topicCounts = useMemo(() => {
    const counts = {};
    dsaProblems.forEach((p) => {
      const pTopics = Array.isArray(p.topics) && p.topics.length > 0 ? p.topics : (p.topic ? [p.topic] : []);
      pTopics.forEach((t) => {
        const key = t.toLowerCase();
        counts[key] = (counts[key] || 0) + 1;
      });
    });
    return counts;
  }, [dsaProblems]);

  // Extract all distinct companies for filtering
  const allCompanies = useMemo(() => {
    const set = new Set();
    dsaProblems.forEach(p => {
      if (Array.isArray(p.companies)) {
        p.companies.forEach(c => set.add(c));
      }
    });
    return Array.from(set).sort();
  }, [dsaProblems]);

  // Filter problems (supports multi-topic filtering with Any (OR) or All (AND) matching)
  const filteredProblems = useMemo(() => {
    return dsaProblems.filter((prob) => {
      const title = prob.title || prob.problemTitle || '';
      const probTopics = Array.isArray(prob.topics) && prob.topics.length > 0
        ? prob.topics
        : (prob.topic ? [prob.topic] : []);
      const status = prob.status || prob.problemStatus || 'Completed';
      const difficulty = prob.difficulty || 'Medium';
      const companies = Array.isArray(prob.companies) ? prob.companies : [];
      const notes = prob.notes || '';

      const query = search.toLowerCase().trim();
      const matchSearch =
        !query ||
        title.toLowerCase().includes(query) ||
        probTopics.some(t => t.toLowerCase().includes(query)) ||
        notes.toLowerCase().includes(query) ||
        companies.some(c => c.toLowerCase().includes(query));

      const matchTopic =
        selectedTopics.length === 0 ||
        (topicMatchMode === 'all'
          ? selectedTopics.every((sel) =>
              probTopics.some((t) => t.toLowerCase() === sel.toLowerCase())
            )
          : selectedTopics.some((sel) =>
              probTopics.some((t) => t.toLowerCase() === sel.toLowerCase())
            ));

      const matchDifficulty = selectedDifficulty === 'All' || difficulty === selectedDifficulty;

      const matchStatus =
        selectedStatus === 'All' ||
        status === selectedStatus ||
        (selectedStatus === 'Completed' && (status === 'Solved' || status === 'Completed')) ||
        (selectedStatus === 'Attended' && (status === 'Attempted' || status === 'Attended'));

      const matchCompany =
        selectedCompany === 'All' ||
        companies.some(c => c.toLowerCase() === selectedCompany.toLowerCase());

      return matchSearch && matchTopic && matchDifficulty && matchStatus && matchCompany;
    });
  }, [dsaProblems, search, selectedTopics, topicMatchMode, selectedDifficulty, selectedStatus, selectedCompany]);

  // Handle adding new topic directly in the Topics Section
  const handleFilterAddTopic = async (e) => {
    e?.preventDefault();
    if (!filterTopicInput.trim()) return;
    const added = await addTopic(filterTopicInput.trim());
    setFilterTopicInput('');
    setIsAddingFilterTopic(false);
    if (added) {
      setSelectedTopics((prev) => {
        if (prev.some((t) => t.toLowerCase() === added.toLowerCase())) return prev;
        return [...prev, added];
      });
    }
  };

  // Topic multi-select helpers for Add Modal
  const handleAddTopicToForm = (topic) => {
    if (!topic || topic === '__ADD_NEW__') return;
    if (!formTopics.includes(topic)) {
      setFormTopics([...formTopics, topic]);
    }
  };

  const handleRemoveTopicFromForm = (topicToRemove) => {
    if (formTopics.length <= 1) return; // Keep at least one
    setFormTopics(formTopics.filter(t => t !== topicToRemove));
  };

  const handleCreateInlineTopic = async () => {
    if (!inlineNewTopic.trim()) return;
    const added = await addTopic(inlineNewTopic.trim());
    if (added && !formTopics.includes(added)) {
      setFormTopics([...formTopics, added]);
    }
    setInlineNewTopic('');
    setIsAddingInlineTopic(false);
  };

  // Topic multi-select helpers for Edit Modal
  const handleAddTopicToEdit = (topic) => {
    if (!topic || topic === '__ADD_NEW__') return;
    if (!editTopics.includes(topic)) {
      setEditTopics([...editTopics, topic]);
    }
  };

  const handleRemoveTopicFromEdit = (topicToRemove) => {
    if (editTopics.length <= 1) return;
    setEditTopics(editTopics.filter(t => t !== topicToRemove));
  };

  const handleCreateEditInlineTopic = async () => {
    if (!editInlineTopicInput.trim()) return;
    const added = await addTopic(editInlineTopicInput.trim());
    if (added && !editTopics.includes(added)) {
      setEditTopics([...editTopics, added]);
    }
    setEditInlineTopicInput('');
    setIsAddingEditInlineTopic(false);
  };

  // Open Add Modal with smart defaults based on current selection
  const handleOpenAddModal = () => {
    setFormTitle('');
    const defaultTopic = (selectedTopics.length > 0 && allAvailableTopics.some(t => t.toLowerCase() === selectedTopics[0].toLowerCase()))
      ? selectedTopics[0]
      : (allAvailableTopics[0] || 'Arrays & Hashing');
    setFormTopics(selectedTopics.length > 0 ? selectedTopics.slice(0, 2) : [defaultTopic]);
    setFormDifficulty('Medium');
    setFormUrl('');
    setFormPlatform('LeetCode');
    setFormTimeComp('O(n)');
    setFormSpaceComp('O(1)');
    setFormCompanies('');
    setFormStatus('Completed');
    setFormRevisions(0);
    setFormNotes('');
    setIsAddingInlineTopic(false);
    setInlineNewTopic('');
    setIsAddModalOpen(true);
  };

  // Handle Add Problem Submit
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    setIsSubmitting(true);
    try {
      let topicsToSave = [...formTopics];
      if (isAddingInlineTopic && inlineNewTopic.trim()) {
        const added = await addTopic(inlineNewTopic.trim());
        if (added && !topicsToSave.includes(added)) topicsToSave.push(added);
      }

      if (topicsToSave.length === 0) {
        topicsToSave = ['General'];
      }

      const savedProblemTitle = formTitle.trim();

      await addDsaProblem({
        title: savedProblemTitle,
        topics: topicsToSave,
        topic: topicsToSave[0],
        difficulty: formDifficulty,
        platform: formPlatform,
        url: formatExternalUrl(formUrl),
        timeComplexity: formTimeComp.trim() || 'O(n)',
        spaceComplexity: formSpaceComp.trim() || 'O(1)',
        companies: formCompanies,
        status: formStatus,
        revisionsCount: Number(formRevisions) || 0,
        notes: formNotes.trim()
      });

      // Reset filters so the user immediately sees their newly added question right at the top
      clearAllFilters();

      // Trigger success notification
      setNotification(`🎉 Question "${savedProblemTitle}" added to your tracker!`);
      setTimeout(() => setNotification(null), 4500);

      setIsAddModalOpen(false);
    } catch (err) {
      console.error(err);
      setNotification(`⚠️ Could not add question: ${err?.message || 'Error occurred'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open Edit Modal
  const handleOpenEditModal = (prob) => {
    setEditingProblem(prob);
    setEditTitle(prob.title || prob.problemTitle || '');
    const currentTopics = Array.isArray(prob.topics) && prob.topics.length > 0
      ? prob.topics
      : (prob.topic ? [prob.topic] : [allAvailableTopics[0] || 'Arrays & Hashing']);
    setEditTopics(currentTopics);
    setEditDifficulty(prob.difficulty || 'Medium');
    setEditUrl(prob.url || prob.leetcodeUrl || '');
    setEditPlatform(prob.platform || 'LeetCode');
    setEditTimeComp(prob.timeComplexity || 'O(n)');
    setEditSpaceComp(prob.spaceComplexity || 'O(1)');
    setEditCompanies(Array.isArray(prob.companies) ? prob.companies.join(', ') : (prob.companies || ''));
    setEditStatus(prob.status === 'Solved' ? 'Completed' : prob.status === 'Attempted' ? 'Attended' : (prob.status || 'Completed'));
    setEditRevisions(prob.revisionsCount || 0);
    setEditNotes(prob.notes || '');
    setIsAddingEditInlineTopic(false);
    setEditInlineTopicInput('');
  };

  // Handle Edit Problem Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingProblem || !editTitle.trim()) return;

    setIsSubmittingEdit(true);
    try {
      let topicsToSave = [...editTopics];
      if (isAddingEditInlineTopic && editInlineTopicInput.trim()) {
        const added = await addTopic(editInlineTopicInput.trim());
        if (added && !topicsToSave.includes(added)) topicsToSave.push(added);
      }

      if (topicsToSave.length === 0) {
        topicsToSave = ['General'];
      }

      const problemId = editingProblem.id || editingProblem._id;
      await updateDsaProblem(problemId, {
        title: editTitle.trim(),
        topics: topicsToSave,
        topic: topicsToSave[0],
        difficulty: editDifficulty,
        platform: editPlatform,
        url: formatExternalUrl(editUrl),
        timeComplexity: editTimeComp.trim() || 'O(n)',
        spaceComplexity: editSpaceComp.trim() || 'O(1)',
        companies: editCompanies,
        status: editStatus,
        revisionsCount: Number(editRevisions) || 0,
        notes: editNotes.trim()
      });

      setNotification(`✅ Problem "${editTitle.trim()}" updated successfully!`);
      setTimeout(() => setNotification(null), 3500);
      setEditingProblem(null);
    } catch (err) {
      console.error(err);
      setNotification(`⚠️ Could not update problem: ${err?.message || 'Error occurred'}`);
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  // Handle Notes Quick Save
  const handleNotesSave = async (e) => {
    e.preventDefault();
    if (!activeNotesProblem) return;
    const problemId = activeNotesProblem.id || activeNotesProblem._id;
    await updateDsaProblem(problemId, {
      notes: activeNotesProblem.notes
    });
    setNotification(`📝 Notes saved for "${activeNotesProblem.title || 'problem'}"`);
    setTimeout(() => setNotification(null), 3500);
    setActiveNotesProblem(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Page Header - Clean & Focused */}
      <div className="border-b border-[#30363d] pb-4">
        <h1 className="text-xl font-bold text-[#f0f6fc] flex items-center gap-2">
          <Code2 className="w-5 h-5 text-[#58a6ff]" /> DSA Placement Tracker
        </h1>
        <p className="text-xs text-[#8b949e] mt-0.5">
          Curated algorithmic tracking across platforms with Multi-Topic tagging, Time Complexity (TC), Hardness, Revisions & Companies.
        </p>
      </div>

      {/* Toast Notification Banner */}
      {notification && (
        <div className="p-3 rounded-lg bg-[#238636]/15 border border-[#238636]/40 text-[#3fb950] text-xs font-medium flex items-center justify-between animate-fadeIn shadow-sm">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#3fb950]" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-[#3fb950] hover:opacity-75 cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* DSA Placement Mastery Overview with LeetCode Circular Ring */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* LeetCode Circular Progress Ring Card (5 cols) */}
        <div className="lg:col-span-5 bg-[#161b22] border border-[#30363d] rounded-lg p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-2.5 mb-3">
            <span className="text-xs font-semibold text-[#f0f6fc] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#58a6ff]" /> Difficulty Distribution
            </span>
            <span className="text-[10px] text-[#8b949e] font-mono">
              {stats.total > 0 ? `${Math.round((stats.completed / stats.total) * 100)}% Complete` : '0%'}
            </span>
          </div>

          <LeetCodeProgressRing
            easySolved={stats.easySolved}
            easyTotal={stats.easyTotal}
            mediumSolved={stats.mediumSolved}
            mediumTotal={stats.mediumTotal}
            hardSolved={stats.hardSolved}
            hardTotal={stats.hardTotal}
            totalSolved={stats.completed}
            totalQuestions={stats.total}
            size={120}
            strokeWidth={8}
          />
        </div>

        {/* 4 Stat Overview Cards (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-2.5">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3.5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-[#8b949e] font-medium uppercase tracking-wider">Total Questions</p>
              <div className="w-7 h-7 rounded-md bg-[#58a6ff]/10 border border-[#58a6ff]/20 flex items-center justify-center text-[#58a6ff]">
                <Code2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl font-bold text-[#f0f6fc]">{stats.total}</span>
              <span className="text-[10px] text-[#8b949e]">in question bank</span>
            </div>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3.5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-[#8b949e] font-medium uppercase tracking-wider">Completed / Solved</p>
              <div className="w-7 h-7 rounded-md bg-[#238636]/10 border border-[#238636]/20 flex items-center justify-center text-[#3fb950]">
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl font-bold text-[#3fb950]">{stats.completed}</span>
              <span className="text-[10px] text-[#3fb950]/80">
                {stats.total > 0 ? `${Math.round((stats.completed / stats.total) * 100)}%` : '0%'}
              </span>
            </div>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3.5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-[#8b949e] font-medium uppercase tracking-wider">Attended / Attempted</p>
              <div className="w-7 h-7 rounded-md bg-[#d29922]/10 border border-[#d29922]/20 flex items-center justify-center text-[#d29922]">
                <Layers className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl font-bold text-[#d29922]">{stats.attended}</span>
              <span className="text-[10px] text-[#d29922]/80">in progress</span>
            </div>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3.5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-[#8b949e] font-medium uppercase tracking-wider">Needs Revision</p>
              <div className="w-7 h-7 rounded-md bg-[#da3633]/10 border border-[#da3633]/20 flex items-center justify-center text-[#f85149]">
                <RotateCcw className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl font-bold text-[#f85149]">{stats.needsRev}</span>
              <span className="text-[10px] text-[#f85149]/80">to review</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coding Platforms Quick Launch Hub */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#f0f6fc]">
            <Globe className="w-4 h-4 text-[#58a6ff]" />
            <span>Coding Platforms & SDE Sheets</span>
            <span className="text-[10px] text-[#8b949e] font-normal">Direct launch into your daily practice hubs</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {CODING_PLATFORMS.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group p-3 rounded-lg bg-gradient-to-br ${platform.color} bg-[#161b22] border hover:border-[#58a6ff]/50 transition-all duration-200 hover:-translate-y-0.5 shadow-sm flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#f0f6fc] group-hover:text-[#58a6ff] transition-colors">
                    {platform.name}
                  </span>
                  <ExternalLink className="w-3 h-3 text-[#8b949e] group-hover:text-[#58a6ff] transition-colors" />
                </div>
                <p className="text-[10px] text-[#8b949e] line-clamp-1 leading-relaxed">
                  {platform.tagline}
                </p>
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[9px]">
                <span className="px-1.5 py-0.5 rounded bg-[#0d1117]/60 text-[#c9d1d9] font-mono border border-white/5">
                  {platform.badge}
                </span>
                <span className="text-[#58a6ff] group-hover:underline flex items-center gap-0.5 font-medium">
                  Open ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-lg bg-[#161b22] border border-[#30363d] p-3.5 space-y-3 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search problem, company, topic..."
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-9 pr-3 py-1.5 text-xs text-[#f0f6fc] placeholder-[#6e7681] focus:outline-none focus:border-[#58a6ff]"
            />
          </div>

          {/* Difficulty / Hardness Filter */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
            >
              <option value="All">Hardness: All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Status / Attended Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
            >
              <option value="All">Status: All Statuses</option>
              <option value="Completed">Completed / Solved</option>
              <option value="Attended">Attended / Attempted</option>
              <option value="Needs Revision">Needs Revision</option>
              <option value="Unsolved">Unsolved</option>
            </select>
          </div>

          {/* Company Filter */}
          <div>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
            >
              <option value="All">Company: All Companies</option>
              {allCompanies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* TOPICS SECTION: Multi-Topic Selector with Quick-Pills & Dropdown (No bulky Show More/Less) */}
        <div className="pt-2.5 border-t border-[#30363d] space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#8b949e]">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span className="font-semibold text-[#f0f6fc]">Filter by Topics:</span>
              {selectedTopics.length === 0 ? (
                <span className="text-[#8b949e] font-mono text-[10px]">All ({allAvailableTopics.length})</span>
              ) : (
                <span className="px-1.5 py-0.5 rounded-full bg-[#1f6feb]/20 text-[#58a6ff] text-[10px] font-semibold border border-[#388bfd]/30 font-mono">
                  {selectedTopics.length} selected
                </span>
              )}

              {/* Match Mode toggle when 2+ topics selected (Any OR vs All AND) */}
              {selectedTopics.length >= 2 && (
                <div className="inline-flex items-center bg-[#0d1117] border border-[#30363d] rounded p-0.5 text-[10px] ml-1">
                  <button
                    type="button"
                    onClick={() => setTopicMatchMode('any')}
                    title="Show problems matching ANY selected topic (OR)"
                    className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                      topicMatchMode === 'any'
                        ? 'bg-[#21262d] text-[#58a6ff] font-semibold'
                        : 'text-[#8b949e] hover:text-[#f0f6fc]'
                    }`}
                  >
                    Any (OR)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTopicMatchMode('all')}
                    title="Show problems matching ALL selected topics (AND)"
                    className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                      topicMatchMode === 'all'
                        ? 'bg-[#21262d] text-[#58a6ff] font-semibold'
                        : 'text-[#8b949e] hover:text-[#f0f6fc]'
                    }`}
                  >
                    All (AND)
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {selectedTopics.length > 0 && (
                <button
                  type="button"
                  onClick={clearTopics}
                  className="text-[#8b949e] hover:text-[#f85149] hover:underline text-[10px] cursor-pointer"
                >
                  Clear Selection
                </button>
              )}

              {/* Single GitHub green "+ Add Topic" button */}
              <button
                type="button"
                onClick={() => setIsAddingFilterTopic(!isAddingFilterTopic)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/30 text-white text-[11px] font-medium shadow-sm transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-3 h-3" /> Add Topic
              </button>
            </div>
          </div>

          {/* Inline topic input right inside the Topics Section */}
          {isAddingFilterTopic && (
            <form onSubmit={handleFilterAddTopic} className="flex items-center gap-2 p-2 rounded-md bg-[#0d1117] border border-[#238636]/60 animate-fadeIn">
              <Tag className="w-3.5 h-3.5 text-[#3fb950] shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Enter new topic name (e.g. Segment Trees, Bitmask DP, Trie)..."
                value={filterTopicInput}
                onChange={(e) => setFilterTopicInput(e.target.value)}
                className="flex-1 bg-transparent text-xs text-[#f0f6fc] placeholder-[#6e7681] focus:outline-none"
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded bg-[#238636] hover:bg-[#2ea043] text-white text-[11px] font-medium transition-colors shadow-sm cursor-pointer"
              >
                Save Topic
              </button>
              <button
                type="button"
                onClick={() => { setIsAddingFilterTopic(false); setFilterTopicInput(''); }}
                className="px-2 py-1 rounded text-[#8b949e] hover:text-[#f0f6fc] text-[11px] cursor-pointer"
              >
                Cancel
              </button>
            </form>
          )}

          {/* Clean Quick Topic Pills: Multi-Select with Inline See More / See Less (No dropdown popover!) */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={clearTopics}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                selectedTopics.length === 0
                  ? 'bg-[#21262d] text-[#f0f6fc] border border-[#8b949e]'
                  : 'bg-[#0d1117] text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] border border-[#30363d]'
              }`}
            >
              All Topics
            </button>

            {displayedTopics.map((topic) => {
              const isActive = selectedTopics.some((t) => t.toLowerCase() === topic.toLowerCase());
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleTopic(topic)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1f6feb]/20 text-[#58a6ff] border border-[#388bfd]/50 font-semibold shadow-xs'
                      : 'bg-[#0d1117] text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] border border-[#30363d]'
                  }`}
                >
                  {isActive && <Check className="w-3 h-3 text-[#58a6ff]" />}
                  <span>{topic}</span>
                </button>
              );
            })}

            {/* Inline See More / See Less Button for 10+ more topics */}
            {allAvailableTopics.length > TOPIC_PREVIEW_LIMIT && (
              !showAllTopics ? (
                <button
                  type="button"
                  onClick={() => setShowAllTopics(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#21262d] hover:bg-[#30363d] text-[#58a6ff] hover:text-[#79c0ff] border border-[#30363d] hover:border-[#58a6ff]/40 transition-all cursor-pointer shadow-xs"
                >
                  <span>+ {remainingTopicsCount} More Topics</span>
                  <ChevronDown className="w-3 h-3 text-[#58a6ff]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAllTopics(false)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-[#f0f6fc] border border-[#30363d] transition-all cursor-pointer shadow-xs"
                >
                  <span>See Less</span>
                  <ChevronUp className="w-3 h-3 text-[#8b949e]" />
                </button>
              )
            )}
          </div>

          {/* Active Filter Badges Bar (Shows selected topics with quick ✕ removal) */}
          {selectedTopics.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#21262d]/60 text-xs">
              <span className="text-[10px] text-[#8b949e] uppercase font-mono tracking-wider mr-0.5">
                Active Filter ({topicMatchMode === 'all' ? 'All match' : 'Any match'}):
              </span>
              {selectedTopics.map((top) => (
                <span
                  key={top}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1f6feb]/15 border border-[#388bfd]/40 text-[#58a6ff] text-[11px] font-medium"
                >
                  <span>{top}</span>
                  <button
                    type="button"
                    onClick={() => toggleTopic(top)}
                    className="hover:text-white p-0.5 rounded-full hover:bg-[#388bfd]/30 cursor-pointer"
                    title={`Remove ${top}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={clearTopics}
                className="text-[10px] text-[#8b949e] hover:text-[#f85149] hover:underline ml-1 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Problems Section */}
      <div className="rounded-lg bg-[#161b22] border border-[#30363d] overflow-hidden shadow-sm">
        <div className="p-3.5 border-b border-[#30363d] flex items-center justify-between bg-[#161b22]">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-[#f0f6fc] flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-[#58a6ff]" /> Problems & Questions
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#21262d] text-[#8b949e] text-[10px] font-mono border border-[#30363d]">
              {filteredProblems.length} of {dsaProblems.length}
            </span>
          </div>

          {/* "+ Add Problem" placed directly in the Problems section */}
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/30 text-white text-xs font-medium shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Problem
          </button>
        </div>

        {/* Active Filters Alert Bar */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between px-3.5 py-2 bg-[#21262d]/70 border-b border-[#30363d] text-xs">
            <span className="text-[#8b949e] flex items-center gap-1.5 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#58a6ff] animate-pulse"></span>
              Filters active: showing {filteredProblems.length} of {dsaProblems.length} questions
            </span>
            <button
              onClick={clearAllFilters}
              className="text-[#58a6ff] hover:text-[#79c0ff] hover:underline font-medium text-[11px] transition-colors cursor-pointer"
            >
              Clear all filters (show all questions)
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#161b22] border-b border-[#30363d] text-[#8b949e] font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-3.5">Status / Attended</th>
                <th className="py-3 px-3.5">Problem & Link</th>
                <th className="py-3 px-3.5">Topics</th>
                <th className="py-3 px-3.5">Hardness</th>
                <th className="py-3 px-3.5">TC & SC</th>
                <th className="py-3 px-3.5">Revisions</th>
                <th className="py-3 px-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363d]/60">
              {filteredProblems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#8b949e]">
                    <div className="max-w-sm mx-auto space-y-2">
                      <Code2 className="w-8 h-8 text-[#58a6ff] mx-auto opacity-50" />
                      <p className="text-xs text-[#f0f6fc] font-medium">No matching questions found</p>
                      <p className="text-[11px] text-[#8b949e]">
                        Click <span className="text-[#3fb950] font-semibold">+ Add Problem</span> above to track questions with multiple topics, time complexity, and companies!
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProblems.map((prob) => {
                  const probId = prob.id || prob._id;
                  const status = prob.status || prob.problemStatus || 'Completed';
                  const title = prob.title || prob.problemTitle || 'Untitled Problem';
                  const url = prob.url || prob.leetcodeUrl || '';
                  const difficulty = prob.difficulty || 'Medium';
                  const tc = prob.timeComplexity || 'O(n)';
                  const sc = prob.spaceComplexity || 'O(1)';
                  const revCount = typeof prob.revisionsCount === 'number' ? prob.revisionsCount : 0;
                  const companiesList = Array.isArray(prob.companies) ? prob.companies : [];
                  const probTopics = Array.isArray(prob.topics) && prob.topics.length > 0
                    ? prob.topics
                    : (prob.topic ? [prob.topic] : ['General']);

                  return (
                    <tr key={probId} className="hover:bg-[#21262d]/50 transition-colors">
                      {/* Status / Attended Dropdown */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <select
                          value={status === 'Solved' ? 'Completed' : status === 'Attempted' ? 'Attended' : status}
                          onChange={(e) => updateDsaStatus(probId, e.target.value)}
                          className={`px-2 py-1 rounded-md text-[11px] font-medium border focus:outline-none transition-colors cursor-pointer ${
                            status === 'Completed' || status === 'Solved'
                              ? 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/40 hover:bg-[#238636]/25'
                              : status === 'Attended' || status === 'Attempted'
                              ? 'bg-[#d29922]/15 text-[#d29922] border-[#d29922]/40 hover:bg-[#d29922]/25'
                              : status === 'Needs Revision'
                              ? 'bg-[#da3633]/15 text-[#f85149] border-[#da3633]/40 hover:bg-[#da3633]/25'
                              : 'bg-[#21262d] text-[#8b949e] border-[#30363d]'
                          }`}
                        >
                          <option value="Completed">Completed</option>
                          <option value="Attended">Attended</option>
                          <option value="Needs Revision">Needs Revision</option>
                          <option value="Unsolved">Unsolved</option>
                        </select>
                      </td>

                      {/* Problem Title & Link & Companies */}
                      <td className="py-3 px-3.5 max-w-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-semibold text-[#f0f6fc] text-xs">
                              {title}
                            </span>
                            {url && (
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#58a6ff] hover:text-[#79c0ff] inline-flex items-center gap-0.5 transition-colors"
                                title="Open problem link"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>

                          {companiesList.length > 0 && (
                            <div className="flex items-center gap-1 flex-wrap">
                              <Building2 className="w-2.5 h-2.5 text-[#8b949e]" />
                              {companiesList.map((comp) => (
                                <span
                                  key={comp}
                                  onClick={() => setSelectedCompany(comp)}
                                  className="text-[9px] px-1.5 py-0.2 rounded bg-[#0d1117] text-[#c9d1d9] border border-[#30363d] cursor-pointer hover:border-[#58a6ff]"
                                >
                                  {comp}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Topics (Supports Multiple Topics per Question) */}
                      <td className="py-3 px-3.5">
                        <div className="flex flex-wrap gap-1 max-w-[220px]">
                          {probTopics.map((top) => {
                            const isTopicActive = selectedTopics.some((t) => t.toLowerCase() === top.toLowerCase());
                            return (
                              <span
                                key={top}
                                onClick={() => toggleTopic(top)}
                                title={isTopicActive ? `Remove ${top} from filter` : `Filter by ${top}`}
                                className={`px-1.5 py-0.5 rounded text-[10px] cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-0.5 ${
                                  isTopicActive
                                    ? 'bg-[#1f6feb]/25 border border-[#388bfd]/60 text-[#58a6ff] font-semibold shadow-xs'
                                    : 'bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] hover:border-[#58a6ff]'
                                }`}
                              >
                                {isTopicActive && <Check className="w-2.5 h-2.5 text-[#58a6ff]" />}
                                {top}
                              </span>
                            );
                          })}
                        </div>
                      </td>

                      {/* Hardness / Difficulty */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded border ${
                            difficulty === 'Easy'
                              ? 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/30'
                              : difficulty === 'Medium'
                              ? 'bg-[#d29922]/15 text-[#d29922] border-[#d29922]/30'
                              : 'bg-[#da3633]/15 text-[#f85149] border-[#da3633]/30'
                          }`}
                        >
                          {difficulty}
                        </span>
                      </td>

                      {/* Complexity (TC & SC) */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <div className="flex flex-col font-mono text-[10px] space-y-0.5">
                          <span className="text-[#58a6ff]">TC: {tc}</span>
                          <span className="text-[#8b949e]">SC: {sc}</span>
                        </div>
                      </td>

                      {/* Revisions Count + Quick "+1 Revise" button */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                            revCount > 0
                              ? 'bg-[#21262d] text-[#f0f6fc] border-[#8b949e]/40'
                              : 'bg-[#0d1117] text-[#8b949e] border-[#30363d]'
                          }`}>
                            {revCount} {revCount === 1 ? 'rev' : 'revs'}
                          </span>
                          <button
                            type="button"
                            onClick={async () => {
                              await incrementRevision(probId);
                              setNotification(`🔄 Revision +1 marked for "${title}"`);
                              setTimeout(() => setNotification(null), 3000);
                            }}
                            className="p-1 rounded bg-[#21262d] hover:bg-[#30363d] text-[#58a6ff] hover:text-[#79c0ff] border border-[#30363d] text-[10px] font-medium transition-colors cursor-pointer"
                            title="Mark as revised (+1)"
                          >
                            <RotateCcw className="w-2.5 h-2.5 inline mr-0.5" /> +1
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(prob)}
                            className="p-1 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-[#f0f6fc] border border-[#30363d] transition-colors cursor-pointer"
                            title="Edit details (TC, difficulty, topics, companies)"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setActiveNotesProblem(prob)}
                            className="p-1 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-[#58a6ff] border border-[#30363d] transition-colors cursor-pointer"
                            title="Key Intuition & Notes"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (window.confirm(`Delete "${title}"?`)) {
                                await deleteDsaProblem(probId);
                                setNotification(`🗑️ Problem "${title}" deleted`);
                                setTimeout(() => setNotification(null), 3500);
                              }
                            }}
                            className="p-1 rounded-md bg-[#21262d] hover:bg-[#da3633]/20 text-[#8b949e] hover:text-[#f85149] border border-[#30363d] transition-colors cursor-pointer"
                            title="Delete problem"
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

      {/* Add Problem Modal (With Multi-Topic Tagging) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#161b22] max-w-lg w-full rounded-lg p-5 space-y-4 border border-[#30363d] shadow-2xl animate-fadeIn text-[#f0f6fc] my-8">
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

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              {/* Problem Title */}
              <div>
                <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Problem Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Trapping Rain Water, LRU Cache..."
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              {/* Multi-Topic Selection & Creation */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-medium text-[#8b949e]">
                    Topics ({formTopics.length} selected) *
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsAddingInlineTopic(!isAddingInlineTopic)}
                    className="text-[10px] text-[#58a6ff] hover:underline flex items-center gap-0.5 font-medium"
                  >
                    {isAddingInlineTopic ? 'Cancel' : '+ Create Custom Topic'}
                  </button>
                </div>

                {/* Selected Topics Badges */}
                <div className="flex flex-wrap gap-1.5 p-2 rounded-md bg-[#0d1117] border border-[#30363d] min-h-[38px] items-center mb-2">
                  {formTopics.map((top) => (
                    <span
                      key={top}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#21262d] text-[#58a6ff] text-[11px] font-medium border border-[#58a6ff]/30 animate-fadeIn"
                    >
                      {top}
                      {formTopics.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTopicFromForm(top)}
                          className="text-[#8b949e] hover:text-[#f85149] transition-colors ml-0.5"
                          title="Remove topic"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                  {formTopics.length === 0 && (
                    <span className="text-[11px] text-[#8b949e]">Select at least one topic below</span>
                  )}
                </div>

                {/* Inline new topic creation form */}
                {isAddingInlineTopic ? (
                  <div className="flex gap-1.5 animate-fadeIn mb-2">
                    <input
                      type="text"
                      autoFocus
                      placeholder="Type new custom topic name..."
                      value={inlineNewTopic}
                      onChange={(e) => setInlineNewTopic(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleCreateInlineTopic();
                        }
                      }}
                      className="flex-1 bg-[#0d1117] border border-[#238636] rounded-md px-2.5 py-1.5 text-xs text-[#f0f6fc] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleCreateInlineTopic}
                      className="px-2.5 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-[11px] font-medium shadow-sm"
                    >
                      Add Topic
                    </button>
                  </div>
                ) : (
                  /* Topic Dropdown to add multiple topics */
                  <select
                    value=""
                    onChange={(e) => {
                      if (e.target.value === '__ADD_NEW__') {
                        setIsAddingInlineTopic(true);
                      } else if (e.target.value) {
                        handleAddTopicToForm(e.target.value);
                      }
                    }}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
                  >
                    <option value="" disabled>+ Add another topic to this question...</option>
                    {allAvailableTopics
                      .filter((t) => !formTopics.includes(t))
                      .map((t) => (
                        <option key={t} value={t}>+ {t}</option>
                      ))}
                    <option value="__ADD_NEW__" className="text-[#58a6ff] font-semibold">+ Create New Custom Topic...</option>
                  </select>
                )}
              </div>

              {/* Hardness & Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Hardness / Difficulty</label>
                  <select
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  >
                    <option value="Easy">Easy (Green)</option>
                    <option value="Medium">Medium (Amber)</option>
                    <option value="Hard">Hard (Red)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Status / Attended</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  >
                    <option value="Completed">Completed / Solved</option>
                    <option value="Attended">Attended / Attempted</option>
                    <option value="Needs Revision">Needs Revision</option>
                    <option value="Unsolved">Unsolved</option>
                  </select>
                </div>
              </div>

              {/* Time Complexity (TC) & Space Complexity (SC) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Time Complexity (TC)</label>
                  <input
                    type="text"
                    placeholder="e.g. O(n), O(log n)"
                    value={formTimeComp}
                    onChange={(e) => setFormTimeComp(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs font-mono text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  />
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {COMMON_TC.slice(0, 4).map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setFormTimeComp(c)}
                        className="text-[9px] px-1 py-0.2 rounded bg-[#21262d] text-[#8b949e] hover:text-white"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Space Complexity (SC)</label>
                  <input
                    type="text"
                    placeholder="e.g. O(1), O(n)"
                    value={formSpaceComp}
                    onChange={(e) => setFormSpaceComp(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs font-mono text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  />
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {COMMON_SC.slice(0, 3).map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setFormSpaceComp(c)}
                        className="text-[9px] px-1 py-0.2 rounded bg-[#21262d] text-[#8b949e] hover:text-white"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Companies & Revisions Count */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Companies (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Google, Amazon, Microsoft"
                    value={formCompanies}
                    onChange={(e) => setFormCompanies(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Initial Revision Count</label>
                  <input
                    type="number"
                    min="0"
                    value={formRevisions}
                    onChange={(e) => setFormRevisions(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs font-mono text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>
              </div>

              {/* Question Link */}
              <div>
                <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Problem URL / Link (Optional)</label>
                <input
                  type="url"
                  placeholder="https://leetcode.com/problems/..."
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              {/* Notes & Intuition */}
              <div>
                <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Notes & Key Intuition</label>
                <textarea
                  rows={2}
                  placeholder="Approach, edge cases, formulas or key patterns..."
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
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
                  disabled={isSubmitting}
                  className="px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 disabled:cursor-not-allowed border border-[#2ea043]/30 text-white text-xs font-medium shadow-sm cursor-pointer transition-colors"
                >
                  {isSubmitting ? 'Saving Problem...' : 'Save Problem'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Problem Modal (With Multi-Topic Tagging) */}
      {editingProblem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#161b22] max-w-lg w-full rounded-lg p-5 space-y-4 border border-[#30363d] shadow-2xl animate-fadeIn text-[#f0f6fc] my-8">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-2.5">
              <h2 className="text-sm font-semibold text-[#f0f6fc] flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#58a6ff]" />
                Edit Problem Details
              </h2>
              <button
                onClick={() => setEditingProblem(null)}
                className="p-1 text-[#8b949e] hover:text-[#f0f6fc]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Problem Title *</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              {/* Edit Multi-Topic Selection */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-medium text-[#8b949e]">
                    Topics ({editTopics.length} assigned) *
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsAddingEditInlineTopic(!isAddingEditInlineTopic)}
                    className="text-[10px] text-[#58a6ff] hover:underline flex items-center gap-0.5 font-medium"
                  >
                    {isAddingEditInlineTopic ? 'Cancel' : '+ Create Custom Topic'}
                  </button>
                </div>

                {/* Selected Topics Badges */}
                <div className="flex flex-wrap gap-1.5 p-2 rounded-md bg-[#0d1117] border border-[#30363d] min-h-[38px] items-center mb-2">
                  {editTopics.map((top) => (
                    <span
                      key={top}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#21262d] text-[#58a6ff] text-[11px] font-medium border border-[#58a6ff]/30 animate-fadeIn"
                    >
                      {top}
                      {editTopics.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTopicFromEdit(top)}
                          className="text-[#8b949e] hover:text-[#f85149] transition-colors ml-0.5"
                          title="Remove topic"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                  {editTopics.length === 0 && (
                    <span className="text-[11px] text-[#8b949e]">Select at least one topic below</span>
                  )}
                </div>

                {isAddingEditInlineTopic ? (
                  <div className="flex gap-1.5 animate-fadeIn mb-2">
                    <input
                      type="text"
                      autoFocus
                      placeholder="Type new custom topic name..."
                      value={editInlineTopicInput}
                      onChange={(e) => setEditInlineTopicInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleCreateEditInlineTopic();
                        }
                      }}
                      className="flex-1 bg-[#0d1117] border border-[#238636] rounded-md px-2.5 py-1.5 text-xs text-[#f0f6fc] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleCreateEditInlineTopic}
                      className="px-2.5 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-[11px] font-medium shadow-sm"
                    >
                      Add Topic
                    </button>
                  </div>
                ) : (
                  <select
                    value=""
                    onChange={(e) => {
                      if (e.target.value === '__ADD_NEW__') {
                        setIsAddingEditInlineTopic(true);
                      } else if (e.target.value) {
                        handleAddTopicToEdit(e.target.value);
                      }
                    }}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
                  >
                    <option value="" disabled>+ Add another topic to this question...</option>
                    {allAvailableTopics
                      .filter((t) => !editTopics.includes(t))
                      .map((t) => (
                        <option key={t} value={t}>+ {t}</option>
                      ))}
                    <option value="__ADD_NEW__" className="text-[#58a6ff] font-semibold">+ Create New Custom Topic...</option>
                  </select>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Hardness</label>
                  <select
                    value={editDifficulty}
                    onChange={(e) => setEditDifficulty(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Status / Attended</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Attended">Attended</option>
                    <option value="Needs Revision">Needs Revision</option>
                    <option value="Unsolved">Unsolved</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Time Complexity (TC)</label>
                  <input
                    type="text"
                    value={editTimeComp}
                    onChange={(e) => setEditTimeComp(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs font-mono text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Space Complexity (SC)</label>
                  <input
                    type="text"
                    value={editSpaceComp}
                    onChange={(e) => setEditSpaceComp(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs font-mono text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Companies (comma separated)</label>
                  <input
                    type="text"
                    value={editCompanies}
                    onChange={(e) => setEditCompanies(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Revision Count</label>
                  <input
                    type="number"
                    min="0"
                    value={editRevisions}
                    onChange={(e) => setEditRevisions(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs font-mono text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Problem URL / Link</label>
                <input
                  type="url"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#8b949e] mb-1">Notes & Intuition</label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-xs text-[#f0f6fc] font-mono focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#30363d]">
                <button
                  type="button"
                  onClick={() => setEditingProblem(null)}
                  className="px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingEdit}
                  className="px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 disabled:cursor-not-allowed border border-[#2ea043]/30 text-white text-xs font-medium shadow-sm cursor-pointer transition-colors"
                >
                  {isSubmittingEdit ? 'Updating Problem...' : 'Update Problem'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {activeNotesProblem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] max-w-md w-full rounded-lg p-5 space-y-4 border border-[#30363d] shadow-2xl animate-fadeIn text-[#f0f6fc]">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-2.5">
              <h2 className="text-sm font-semibold text-[#f0f6fc] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#58a6ff]" />
                {activeNotesProblem.title || activeNotesProblem.problemTitle}
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
                  rows={6}
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
                  Save Notes
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
