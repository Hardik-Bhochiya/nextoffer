import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useData } from '../context/DataContext';
import {
  BookOpen,
  Plus,
  Search,
  Pin,
  Trash2,
  Edit3,
  X,
  FileCode,
  Download,
  Check,
  Eye,
  ArrowUpDown,
  FileText,
  Code2,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';
import { MarkdownViewer } from '../components/notes/MarkdownViewer';

// Canonical topic mapping so common acronyms (CN, OS, OOP, DBMS) match cleanly
const TOPIC_ALIASES = {
  'cn': 'Computer Networks',
  'computer networks': 'Computer Networks',
  'computer network': 'Computer Networks',
  'os': 'Operating Systems',
  'operating systems': 'Operating Systems',
  'operating system': 'Operating Systems',
  'dbms': 'DBMS',
  'database management systems': 'DBMS',
  'database management system': 'DBMS',
  'oops': 'OOPs',
  'oop': 'OOPs',
  'object oriented programming': 'OOPs',
  'dsa': 'DSA',
  'data structures and algorithms': 'DSA',
  'data structure and algorithms': 'DSA',
  'hr': 'HR & Behavioral',
  'behavioral': 'HR & Behavioral',
  'hr & behavioral': 'HR & Behavioral',
  'hr and behavioral': 'HR & Behavioral'
};

const normalizeTopicCanonical = (name) => {
  if (!name) return '';
  const clean = name.trim().toLowerCase();
  return TOPIC_ALIASES[clean] || name.trim();
};

// Only genuine Core CS, Interview & Coding topics (including HR & Behavioral)
const PREDEFINED_TOPICS = [
  'DBMS',
  'Operating Systems',
  'Computer Networks',
  'OOPs',
  'System Design',
  'DSA',
  'Coding Interview',
  'HR & Behavioral'
];

const NOTES_TOPIC_LIMIT = 5;

export const Notes = () => {
  const { notes = [], addNote, updateNote, deleteNote } = useData();

  // Selected note for viewing
  const [selectedNote, setSelectedNote] = useState(null);

  // Filters, search & sorting (Supports multi-topic selection with ALL matching by default)
  const [search, setSearch] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]); // Array of strings (empty means all)
  const [topicMatchMode, setTopicMatchMode] = useState('all'); // default to 'all' (AND) so selecting topics strictly narrows down
  const [showAllNotesTopics, setShowAllNotesTopics] = useState(false);

  const [selectedImportance, setSelectedImportance] = useState('All');
  const [sortBy, setSortBy] = useState('importance'); // 'importance' | 'newest' | 'title'
  const [notification, setNotification] = useState(null);

  // Multi-topic toggle helper (e.g. DBMS + HR & Behavioral)
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

  // Editor mode state
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingExisting, setIsEditingExisting] = useState(false);
  const [editorTab, setEditorTab] = useState('write'); // 'write' | 'preview'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [editTitle, setEditTitle] = useState('');
  const [editTopic, setEditTopic] = useState('DBMS');
  const [editImportance, setEditImportance] = useState('High');
  const [editContent, setEditContent] = useState('');
  const [editPinned, setEditPinned] = useState(false);

  // Helper to extract all distinct topics for any given note (supports colon/comma separation & canonical aliases)
  const getNoteTopics = (note) => {
    if (!note) return ['General'];
    const topicSet = new Set();

    if (note.topic) {
      note.topic
        .split(/[:;,]+/)
        .map(t => normalizeTopicCanonical(t))
        .filter(Boolean)
        .forEach(t => topicSet.add(t));
    }
    if (Array.isArray(note.tags)) {
      note.tags
        .map(t => normalizeTopicCanonical(String(t)))
        .filter(Boolean)
        .forEach(t => topicSet.add(t));
    }

    const list = Array.from(topicSet);
    return list.length > 0 ? list : ['General'];
  };

  // Extract all distinct topics dynamically (predefined Core CS + existing note topics)
  const allAvailableTopics = useMemo(() => {
    const fromNotes = [];
    notes.forEach(n => {
      getNoteTopics(n).forEach(t => fromNotes.push(t));
    });
    return Array.from(new Set(['All', ...PREDEFINED_TOPICS, ...fromNotes])).filter(Boolean);
  }, [notes]);

  // Topic pills displayed inline for Notes sidebar with preview limit & See More / See Less
  const displayedNotesTopics = useMemo(() => {
    const rawList = allAvailableTopics.filter(t => t !== 'All');
    if (showAllNotesTopics) return rawList;
    const preview = rawList.slice(0, NOTES_TOPIC_LIMIT);
    selectedTopics.forEach((st) => {
      if (!preview.some(t => t.toLowerCase() === st.toLowerCase())) {
        const found = rawList.find(t => t.toLowerCase() === st.toLowerCase()) || st;
        preview.push(found);
      }
    });
    return preview;
  }, [showAllNotesTopics, allAvailableTopics, selectedTopics]);

  const remainingNotesTopicsCount = Math.max(0, allAvailableTopics.filter(t => t !== 'All').length - NOTES_TOPIC_LIMIT);

  // Stats summary for header
  const stats = useMemo(() => {
    let high = 0;
    let pinned = 0;
    notes.forEach(n => {
      if (n.importance === 'High') high++;
      if (n.pinned) pinned++;
    });
    return { total: notes.length, high, pinned };
  }, [notes]);

  // Filtered and Sorted Notes List (Supports multi-topic Any/All matching, no topic a-z sort)
  const filteredAndSortedNotes = useMemo(() => {
    const list = notes.filter((n) => {
      const title = n.title || '';
      const content = n.content || '';
      const noteTopics = getNoteTopics(n);
      const importance = n.importance || 'Medium';

      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        title.toLowerCase().includes(q) ||
        content.toLowerCase().includes(q) ||
        noteTopics.some(t => t.toLowerCase().includes(q));

      const matchTopic =
        selectedTopics.length === 0 ||
        (topicMatchMode === 'all'
          ? selectedTopics.every((sel) =>
              noteTopics.some((t) => normalizeTopicCanonical(t).toLowerCase() === normalizeTopicCanonical(sel).toLowerCase())
            )
          : selectedTopics.some((sel) =>
              noteTopics.some((t) => normalizeTopicCanonical(t).toLowerCase() === normalizeTopicCanonical(sel).toLowerCase())
            ));

      const matchImportance =
        selectedImportance === 'All' ||
        importance.toLowerCase() === selectedImportance.toLowerCase();

      return matchSearch && matchTopic && matchImportance;
    });

    const importanceRank = { High: 3, Medium: 2, Low: 1 };

    return list.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;

      if (sortBy === 'importance') {
        const rankA = importanceRank[a.importance] || 2;
        const rankB = importanceRank[b.importance] || 2;
        if (rankA !== rankB) return rankB - rankA;
        return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
      }

      if (sortBy === 'title') {
        return (a.title || '').localeCompare(b.title || '');
      }

      return new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0);
    });
  }, [notes, search, selectedTopics, topicMatchMode, selectedImportance, sortBy]);

  // Synchronize selectedNote with filteredAndSortedNotes so non-matching notes are NEVER displayed in viewer
  useEffect(() => {
    if (filteredAndSortedNotes.length === 0) {
      setSelectedNote(null);
    } else if (!selectedNote || !filteredAndSortedNotes.some(n => (n.id === selectedNote.id || n._id === selectedNote._id))) {
      setSelectedNote(filteredAndSortedNotes[0]);
    } else {
      const fresh = filteredAndSortedNotes.find(n => (n.id === selectedNote.id || n._id === selectedNote._id));
      if (fresh && fresh !== selectedNote) {
        setSelectedNote(fresh);
      }
    }
  }, [filteredAndSortedNotes]);

  // Open Create Note Mode
  const handleStartCreate = () => {
    setSelectedNote(null);
    setEditTitle('');
    setEditTopic(selectedTopics.length > 0 ? selectedTopics.join(': ') : 'DBMS');
    setEditImportance('High');
    setEditContent('');
    setEditPinned(false);
    setIsEditingExisting(false);
    setEditorTab('write');
    setIsEditing(true);
  };

  // Open Edit Note Mode
  const handleStartEdit = (note) => {
    setSelectedNote(note);
    setEditTitle(note.title || '');
    const noteTopics = getNoteTopics(note);
    setEditTopic(noteTopics.join(': '));
    setEditImportance(note.importance || 'Medium');
    setEditContent(note.content || '');
    setEditPinned(!!note.pinned);
    setIsEditingExisting(true);
    setEditorTab('write');
    setIsEditing(true);
  };

  // Toggle or append an existing topic into colon-separated editTopic
  const handleTogglePredefinedTopic = (topicName) => {
    const currentList = editTopic
      .split(/[:;,]+/)
      .map(t => t.trim())
      .filter(Boolean);

    const exists = currentList.some(t => t.toLowerCase() === topicName.toLowerCase());
    let updatedList;
    if (exists) {
      updatedList = currentList.filter(t => t.toLowerCase() !== topicName.toLowerCase());
    } else {
      updatedList = [...currentList, topicName];
    }
    setEditTopic(updatedList.join(': '));
  };

  // Save Note Handler with Smart Topic Normalization (Matches existing topics case-insensitively)
  const handleSave = async (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    setIsSubmitting(true);
    try {
      const parsedTopics = editTopic
        .split(/[:;,]+/)
        .map(t => t.trim())
        .filter(Boolean);

      // Smart topic normalization: if topic already exists with different casing, match it
      const normalizedTopics = [];
      const seen = new Set();

      parsedTopics.forEach((typedTopic) => {
        const existingMatch = allAvailableTopics.find(
          (t) => t !== 'All' && t.toLowerCase() === typedTopic.toLowerCase()
        );
        const finalTopicName = existingMatch || typedTopic;
        const key = finalTopicName.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          normalizedTopics.push(finalTopicName);
        }
      });

      const cleanTopicString = normalizedTopics.join(': ') || 'General';
      const noteId = selectedNote?.id || selectedNote?._id;

      if (noteId && isEditingExisting) {
        const updated = await updateNote(noteId, {
          title: editTitle.trim(),
          content: editContent,
          topic: cleanTopicString,
          tags: normalizedTopics,
          importance: editImportance,
          pinned: editPinned
        });

        const updatedNoteObj = updated || {
          ...selectedNote,
          title: editTitle.trim(),
          content: editContent,
          topic: cleanTopicString,
          tags: normalizedTopics,
          importance: editImportance,
          pinned: editPinned
        };

        setSelectedNote(updatedNoteObj);
        setNotification(`Updated "${editTitle.trim()}"`);
      } else {
        const created = await addNote({
          title: editTitle.trim(),
          content: editContent,
          topic: cleanTopicString,
          tags: normalizedTopics,
          importance: editImportance,
          pinned: editPinned,
          isFavorite: false
        });

        // Reset filter states so user's new note is not hidden
        setSearch('');
        setSelectedTopics([]);
        setSelectedImportance('All');

        if (created) {
          setSelectedNote(created);
        }

        setNotification(`Saved "${editTitle.trim()}"`);
      }

      setTimeout(() => setNotification(null), 3000);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setNotification(`Failed to save: ${err?.message || 'Error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1-Click Pin Toggle
  const handleTogglePin = async (note, e) => {
    e?.stopPropagation();
    const noteId = note.id || note._id;
    if (!noteId) return;

    const newPinned = !note.pinned;
    await updateNote(noteId, { pinned: newPinned });
    if (selectedNote && (selectedNote.id === noteId || selectedNote._id === noteId)) {
      setSelectedNote({ ...selectedNote, pinned: newPinned });
    }
    setNotification(newPinned ? 'Pinned to top' : 'Unpinned');
    setTimeout(() => setNotification(null), 2000);
  };

  // 1-Click Priority update from viewer
  const handleQuickImportanceChange = async (newImportance) => {
    if (!selectedNote) return;
    const noteId = selectedNote.id || selectedNote._id;
    if (!noteId) return;

    await updateNote(noteId, { importance: newImportance });
    setSelectedNote({ ...selectedNote, importance: newImportance });
    setNotification(`Priority set to ${newImportance}`);
    setTimeout(() => setNotification(null), 2000);
  };

  // Download Note as Markdown file
  const handleDownloadMarkdown = (note) => {
    if (!note) return;
    const noteTopics = getNoteTopics(note);
    const blob = new Blob(
      [`# ${note.title}\n\n**Topics:** ${noteTopics.join(', ')} | **Priority:** ${note.importance || 'Medium'}\n\n---\n\n${note.content || ''}`],
      { type: 'text/markdown;charset=utf-8;' }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${note.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_notes.md`;
    link.click();
    URL.revokeObjectURL(url);
    setNotification(`Exported "${note.title}.md"`);
    setTimeout(() => setNotification(null), 2000);
  };

  // Markdown Helper Formatting
  const insertMarkdown = (prefix, suffix = '') => {
    const textarea = document.getElementById('note-markdown-textarea');
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = editContent;
    const selected = text.substring(start, end);
    const replacement = `${prefix}${selected || 'text'}${suffix}`;
    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setEditContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected.length || 4));
    }, 40);
  };

  // Clean Single Code / Pseudo-Code Box Inserter
  const insertCodeBox = () => {
    const textarea = document.getElementById('note-markdown-textarea');
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = editContent;
    const selected = text.substring(start, end);

    let insertion = '```\n// Write code or pseudo-code here\nfunction example() {\n    \n}\n```';
    if (selected.trim()) {
      insertion = `\`\`\`\n${selected}\n\`\`\``;
    }

    const needsNewlineBefore = start > 0 && text[start - 1] !== '\n';
    const newContent =
      text.substring(0, start) +
      (needsNewlineBefore ? '\n\n' : '') +
      insertion +
      '\n\n' +
      text.substring(end);
    setEditContent(newContent);

    setTimeout(() => {
      textarea.focus();
      const newCursor = start + (needsNewlineBefore ? 2 : 0) + 4;
      textarea.setSelectionRange(newCursor, newCursor);
    }, 40);
  };

  // Color helper according to universal standard: Red = High/Hard, Yellow = Medium/Med, Blue = Low/Easy
  const getImportanceDotColor = (importance) => {
    if (importance === 'High') return 'bg-[#f85149]'; // Red
    if (importance === 'Medium') return 'bg-[#d29922]'; // Yellow
    return 'bg-[#58a6ff]'; // Blue
  };

  const getImportanceBadgeStyles = (importance) => {
    if (importance === 'High') return 'text-[#f85149] bg-[#da3633]/15 border-[#da3633]/30'; // Red
    if (importance === 'Medium') return 'text-[#d29922] bg-[#d29922]/15 border-[#d29922]/30'; // Yellow
    return 'text-[#58a6ff] bg-[#388bfd]/15 border-[#388bfd]/30'; // Blue
  };

  return (
    <div className="space-y-3 animate-fadeIn pb-10">
      {/* Clean Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#30363d] pb-3">
        <div>
          <h1 className="text-base font-bold text-[#f0f6fc] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#58a6ff]" /> Interview Notes
            <span className="text-xs font-normal text-[#8b949e] px-2 py-0.5 rounded-full bg-[#161b22] border border-[#30363d]">
              {stats.total} notes
            </span>
          </h1>
          <p className="text-xs text-[#8b949e] mt-0.5">
            Core CS subjects revision, system design and interview cheatsheets
          </p>
        </div>

        <div className="flex items-center gap-2">
          {notification && (
            <div className="px-2.5 py-1 rounded bg-[#238636]/15 border border-[#238636]/30 text-[#3fb950] text-xs font-medium flex items-center gap-1.5 animate-fadeIn">
              <Check className="w-3.5 h-3.5" />
              <span>{notification}</span>
            </div>
          )}

          <button
            onClick={handleStartCreate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/30 text-white text-xs font-medium shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> New Note
          </button>
        </div>
      </div>

      {/* Unified Master-Detail Split Workspace */}
      <div className="border border-[#30363d] rounded-lg bg-[#0d1117] flex flex-col md:flex-row min-h-[640px] max-h-[calc(100vh-160px)] overflow-hidden shadow-sm">
        
        {/* Left Sidebar: Search, Topics & Note Items List */}
        <div className="w-full md:w-80 lg:w-96 shrink-0 border-r border-[#30363d] flex flex-col bg-[#0d1117] min-w-0">
          
          {/* Search & Filter Header */}
          <div className="p-3 border-b border-[#30363d] space-y-2 bg-[#161b22]/50">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8b949e] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search notes, topics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-8 pr-2.5 py-1 text-xs text-[#f0f6fc] placeholder-[#6e7681] focus:outline-none focus:border-[#58a6ff]"
              />
            </div>

            {/* Compact Filter Row: Sort & Priority (Clean 2-Column without Select Topics dropdown) */}
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-1 bg-[#0d1117] border border-[#30363d] rounded px-1.5 py-0.5 min-w-0">
                <ArrowUpDown className="w-3 h-3 text-[#8b949e] shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-transparent text-[#c9d1d9] focus:outline-none cursor-pointer truncate text-[11px]"
                  title="Sort notes"
                >
                  <option value="importance" className="bg-[#161b22]">High Priority</option>
                  <option value="newest" className="bg-[#161b22]">Recent</option>
                  <option value="title" className="bg-[#161b22]">Title: A-Z</option>
                </select>
              </div>

              {/* Priority Filter */}
              <select
                value={selectedImportance}
                onChange={(e) => setSelectedImportance(e.target.value)}
                className="bg-[#0d1117] border border-[#30363d] rounded px-1.5 py-0.5 text-[#c9d1d9] focus:outline-none cursor-pointer truncate text-[11px]"
                title="Filter by priority"
              >
                <option value="All" className="bg-[#161b22]">All Priority</option>
                <option value="High" className="bg-[#161b22] text-[#f85149]">High Priority</option>
                <option value="Medium" className="bg-[#161b22] text-[#d29922]">Medium Priority</option>
                <option value="Low" className="bg-[#161b22] text-[#58a6ff]">Low Priority</option>
              </select>
            </div>
          </div>

          {/* Clean Core CS & Interview Topic Quick-Pill Bar: Multi-Selection with See More / See Less */}
          <div className="px-3 py-1.5 border-b border-[#30363d] bg-[#0d1117] flex flex-wrap items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={clearTopics}
              className={`px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedTopics.length === 0
                  ? 'bg-[#21262d] text-[#f0f6fc] border border-[#8b949e]'
                  : 'text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#161b22]'
              }`}
            >
              All
            </button>
            {displayedNotesTopics.map((topic) => {
              const isActive = selectedTopics.some(t => t.toLowerCase() === topic.toLowerCase());
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleTopic(topic)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap transition-colors cursor-pointer inline-flex items-center gap-1 ${
                    isActive
                      ? 'bg-[#1f6feb]/20 text-[#58a6ff] border border-[#388bfd]/50 font-semibold shadow-xs'
                      : 'text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#161b22]'
                  }`}
                >
                  {isActive && <Check className="w-2.5 h-2.5 text-[#58a6ff]" />}
                  <span>{topic}</span>
                </button>
              );
            })}

            {/* Inline See More / See Less Toggle */}
            {allAvailableTopics.filter(t => t !== 'All').length > NOTES_TOPIC_LIMIT && (
              !showAllNotesTopics ? (
                <button
                  type="button"
                  onClick={() => setShowAllNotesTopics(true)}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#161b22] hover:bg-[#21262d] text-[#58a6ff] hover:text-[#79c0ff] border border-[#30363d] inline-flex items-center gap-0.5 cursor-pointer shadow-xs"
                >
                  <span>+{remainingNotesTopicsCount} more</span>
                  <ChevronDown className="w-2.5 h-2.5 text-[#58a6ff]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAllNotesTopics(false)}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#161b22] hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] border border-[#30363d] inline-flex items-center gap-0.5 cursor-pointer shadow-xs"
                >
                  <span>See Less</span>
                  <ChevronUp className="w-2.5 h-2.5 text-[#8b949e]" />
                </button>
              )
            )}
          </div>

          {/* Active Topics Bar (Visible when multiple topics are selected) */}
          {selectedTopics.length > 0 && (
            <div className="px-3 py-1 bg-[#161b22] border-b border-[#21262d] flex flex-wrap items-center gap-1 text-[10px]">
              <span className="text-[9px] text-[#8b949e] uppercase font-mono tracking-wider">
                Filter ({topicMatchMode === 'all' ? 'All' : 'Any'}):
              </span>
              {selectedTopics.map((top) => (
                <span
                  key={top}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#1f6feb]/15 border border-[#388bfd]/40 text-[#58a6ff] text-[10px]"
                >
                  <span>{top}</span>
                  <button
                    type="button"
                    onClick={() => toggleTopic(top)}
                    className="hover:text-white cursor-pointer"
                    title={`Remove ${top}`}
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))}
              {selectedTopics.length >= 2 && (
                <div className="inline-flex items-center bg-[#0d1117] border border-[#30363d] rounded p-0.5 ml-1 text-[9px]">
                  <button
                    type="button"
                    onClick={() => setTopicMatchMode('any')}
                    className={`px-1 py-0.2 rounded cursor-pointer ${topicMatchMode === 'any' ? 'bg-[#21262d] text-[#58a6ff] font-semibold' : 'text-[#8b949e]'}`}
                  >
                    Any
                  </button>
                  <button
                    type="button"
                    onClick={() => setTopicMatchMode('all')}
                    className={`px-1 py-0.2 rounded cursor-pointer ${topicMatchMode === 'all' ? 'bg-[#21262d] text-[#58a6ff] font-semibold' : 'text-[#8b949e]'}`}
                  >
                    All
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={clearTopics}
                className="text-[10px] text-[#8b949e] hover:text-[#f85149] hover:underline ml-1 cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}

          {/* Sleek Notes List Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#21262d]">
            {filteredAndSortedNotes.length === 0 ? (
              <div className="p-6 text-center text-[#8b949e] space-y-2">
                <FileText className="w-5 h-5 mx-auto text-[#6e7681]" />
                <p className="text-xs font-semibold text-[#c9d1d9]">No notes found</p>
                <p className="text-[11px] text-[#6e7681]">Create your first note or clear filters</p>
                <button
                  type="button"
                  onClick={handleStartCreate}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#238636] hover:bg-[#2ea043] text-white text-[11px] font-medium transition-colors cursor-pointer mt-1"
                >
                  <Plus className="w-3 h-3" /> Create Note
                </button>
              </div>
            ) : (
              filteredAndSortedNotes.map((note) => {
                const noteId = note.id || note._id;
                const isSelected = selectedNote && (selectedNote.id === noteId || selectedNote._id === noteId);
                const importance = note.importance || 'Medium';
                const noteTopics = getNoteTopics(note);

                return (
                  <div
                    key={noteId}
                    onClick={() => {
                      setSelectedNote(note);
                      setIsEditing(false);
                    }}
                    className={`px-3.5 py-2.5 transition-colors cursor-pointer group relative ${
                      isSelected
                        ? 'bg-[#161b22] border-l-2 border-[#238636]'
                        : 'hover:bg-[#161b22]/50'
                    }`}
                  >
                    {/* Title + Priority dot + Pin */}
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        {/* Clean Color Dot: Red = High, Yellow = Medium, Blue = Low */}
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${getImportanceDotColor(importance)}`}
                          title={`Priority: ${importance}`}
                        />
                        <h3 className={`text-xs truncate ${isSelected ? 'font-semibold text-[#f0f6fc]' : 'font-medium text-[#c9d1d9]'}`}>
                          {note.title}
                        </h3>
                      </div>

                      {note.pinned && (
                        <Pin className="w-3 h-3 text-[#d29922] shrink-0" fill="#d29922" />
                      )}
                    </div>

                    {/* Preview Snippet */}
                    <p className="text-[11px] text-[#8b949e] line-clamp-1 mt-0.5 pl-3 leading-snug">
                      {note.content?.replace(/[#*`_]/g, '') || 'Empty note...'}
                    </p>

                    {/* Multiple Topics Badges */}
                    <div className="flex items-center justify-between mt-1 pl-3 text-[10px]">
                      <div className="flex items-center gap-1 flex-wrap truncate max-w-[220px]">
                        {noteTopics.map((top, idx) => {
                          const isTopicActive = selectedTopics.some((t) => t.toLowerCase() === top.toLowerCase());
                          return (
                            <span
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTopic(top);
                              }}
                              title={isTopicActive ? `Remove ${top} from filter` : `Filter by ${top}`}
                              className={`font-mono text-[9px] px-1.5 py-0.5 rounded border transition-colors cursor-pointer inline-flex items-center gap-0.5 ${
                                isTopicActive
                                  ? 'bg-[#1f6feb]/25 border-[#388bfd]/60 text-[#58a6ff] font-semibold'
                                  : 'bg-[#0d1117] text-[#8b949e] border-[#30363d] hover:text-[#58a6ff] hover:border-[#58a6ff]'
                              }`}
                            >
                              {isTopicActive && <Check className="w-2 h-2 text-[#58a6ff]" />}
                              <span>{top}</span>
                            </span>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleTogglePin(note, e)}
                        className={`opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] transition-opacity`}
                        title={note.pinned ? 'Unpin' : 'Pin'}
                      >
                        <Pin className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Detail Pane: Viewer or Editor */}
        <div className="flex-1 bg-[#161b22] flex flex-col min-w-0">
          {isEditing ? (
            /* Editing / Creating Mode */
            <form onSubmit={handleSave} className="flex flex-col h-full">
              {/* Editor Top Bar */}
              <div className="h-11 border-b border-[#30363d] px-4 flex items-center justify-between shrink-0 bg-[#161b22]">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-3.5 h-3.5 text-[#58a6ff]" />
                  <span className="text-xs font-semibold text-[#f0f6fc]">
                    {isEditingExisting ? 'Edit Note' : 'Create Note'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex rounded bg-[#0d1117] border border-[#30363d] p-0.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setEditorTab('write')}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                        editorTab === 'write' ? 'bg-[#21262d] text-[#f0f6fc]' : 'text-[#8b949e] hover:text-[#f0f6fc]'
                      }`}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab('preview')}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 transition-all ${
                        editorTab === 'preview' ? 'bg-[#21262d] text-[#f0f6fc]' : 'text-[#8b949e] hover:text-[#f0f6fc]'
                      }`}
                    >
                      <Eye className="w-3 h-3" /> Preview
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="p-1 text-[#8b949e] hover:text-[#f0f6fc]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Form Body - Topic Input with Autocomplete & Existing Topic Normalization */}
              <div className="p-4 space-y-3 flex-1 flex flex-col overflow-y-auto">
                {/* Title */}
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Note Title (e.g. DBMS ACID & Normalization)..."
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-sm font-semibold text-[#f0f6fc] placeholder-[#6e7681] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>

                {/* Topics & Priority Inputs */}
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-medium text-[#8b949e]">
                          Topics (colon-separated, e.g. <span className="font-mono text-[#c9d1d9]">DBMS: OOPs</span>)
                        </label>
                        <span className="text-[10px] text-[#6e7681]">Matches existing topics</span>
                      </div>
                      <input
                        type="text"
                        list="existing-topics-list"
                        placeholder="Type topic or select from existing..."
                        value={editTopic}
                        onChange={(e) => setEditTopic(e.target.value)}
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
                      />
                      {/* Browser native datalist autocomplete */}
                      <datalist id="existing-topics-list">
                        {allAvailableTopics.filter(t => t !== 'All').map(t => (
                          <option key={t} value={t} />
                        ))}
                      </datalist>
                    </div>

                    <div>
                      <label className="block text-[10px] font-medium text-[#8b949e] mb-1">
                        Priority Level
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { key: 'High', label: 'High', active: 'border-[#da3633] text-[#f85149] bg-[#da3633]/15' },
                          { key: 'Medium', label: 'Medium', active: 'border-[#d29922] text-[#d29922] bg-[#d29922]/15' },
                          { key: 'Low', label: 'Low', active: 'border-[#388bfd] text-[#58a6ff] bg-[#388bfd]/15' }
                        ].map((item) => (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => setEditImportance(item.key)}
                            className={`py-1.5 rounded border text-[11px] font-medium text-center transition-all cursor-pointer ${
                              editImportance === item.key
                                ? item.active
                                : 'bg-[#0d1117] border-[#30363d] text-[#8b949e] hover:text-[#f0f6fc]'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Clean Existing Core CS Topics Quick-Add Bar */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-[#8b949e]">Existing:</span>
                    {allAvailableTopics.filter(t => t !== 'All').map((topicName) => {
                      const activeTopics = editTopic
                        .split(/[:;,]+/)
                        .map(t => t.trim().toLowerCase())
                        .filter(Boolean);
                      const isSelected = activeTopics.includes(topicName.toLowerCase());

                      return (
                        <button
                          key={topicName}
                          type="button"
                          onClick={() => handleTogglePredefinedTopic(topicName)}
                          className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer border ${
                            isSelected
                              ? 'bg-[#238636]/20 text-[#3fb950] border-[#238636]/50'
                              : 'bg-[#0d1117] text-[#8b949e] hover:text-[#f0f6fc] border-[#30363d] hover:border-[#8b949e]'
                          }`}
                        >
                          {isSelected ? `✓ ${topicName}` : `+ ${topicName}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Content Editor */}
                <div className="flex-1 flex flex-col space-y-1.5 min-h-[280px]">
                  {editorTab === 'write' ? (
                    <>
                      {/* Clean Markdown Formatting & Single Code Box Toolbar */}
                      <div className="flex items-center gap-1.5 flex-wrap text-[10px] pb-1.5 border-b border-[#30363d]/50">
                        <button
                          type="button"
                          onClick={() => insertMarkdown('# ', '')}
                          className="px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] font-semibold cursor-pointer"
                          title="Main Topic Heading (H1)"
                        >
                          H1
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown('## ', '')}
                          className="px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] font-semibold cursor-pointer"
                          title="Subtopic Heading (H2)"
                        >
                          H2 (Subtopic)
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown('### ', '')}
                          className="px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] font-semibold cursor-pointer"
                          title="Section Heading (H3)"
                        >
                          H3
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown('**', '**')}
                          className="px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] font-bold cursor-pointer"
                          title="Bold Text"
                        >
                          B
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown('- ', '')}
                          className="px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] cursor-pointer"
                          title="Bullet List"
                        >
                          • List
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown('> ', '')}
                          className="px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] cursor-pointer"
                          title="Quote / Note Block"
                        >
                          Quote
                        </button>

                        <div className="h-4 w-[1px] bg-[#30363d] mx-0.5" />

                        {/* Clean Single Code / Pseudo-Code Box button */}
                        <button
                          type="button"
                          onClick={insertCodeBox}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#0d1117] hover:bg-[#21262d] text-[#58a6ff] hover:text-[#79c0ff] border border-[#30363d] font-mono text-[10px] transition-colors cursor-pointer"
                          title="Insert Code or Pseudo-code Box"
                        >
                          <Code2 className="w-3 h-3" /> Code Box
                        </button>
                      </div>

                      <textarea
                        id="note-markdown-textarea"
                        placeholder="Write your note in Markdown formatting (# Heading, ## Subtopic, **bold**, code box, etc.)..."
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full flex-1 bg-[#0d1117] border border-[#30363d] rounded-md p-3 text-xs text-[#f0f6fc] font-mono leading-relaxed focus:outline-none focus:border-[#58a6ff] resize-none"
                      />
                    </>
                  ) : (
                    <div className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-md p-4 overflow-y-auto">
                      <h1 className="text-base font-bold text-[#f0f6fc] pb-2 border-b border-[#30363d] mb-3">
                        {editTitle || 'Untitled Note'}
                      </h1>
                      <MarkdownViewer content={editContent || '*No content written yet...*'} />
                    </div>
                  )}
                </div>
              </div>

              {/* Editor Footer */}
              <div className="h-12 border-t border-[#30363d] px-4 flex items-center justify-between shrink-0 bg-[#161b22]">
                <label className="flex items-center gap-1.5 text-xs text-[#c9d1d9] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editPinned}
                    onChange={(e) => setEditPinned(e.target.checked)}
                    className="rounded bg-[#0d1117] border-[#30363d] text-[#238636] focus:ring-0"
                  />
                  <span className="text-[11px]">Pin to top</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 rounded bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d] text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-3 py-1 rounded bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 disabled:cursor-not-allowed border border-[#2ea043]/30 text-white text-xs font-medium shadow-sm transition-colors cursor-pointer"
                  >
                    {isSubmitting ? 'Saving...' : isEditingExisting ? 'Update Note' : 'Save Note'}
                  </button>
                </div>
              </div>
            </form>
          ) : selectedNote ? (
            /* Clean Document Viewer */
            <div className="flex flex-col h-full">
              {/* Document Header Bar */}
              <div className="h-11 border-b border-[#30363d] px-4 flex items-center justify-between shrink-0 bg-[#161b22]">
                {/* Left: Metadata breadcrumbs / topic badges */}
                <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                  {getNoteTopics(selectedNote).map((top, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#21262d] text-[#58a6ff] border border-[#30363d] truncate"
                    >
                      {top}
                    </span>
                  ))}

                  {/* Quick Priority Switcher (Red = High, Yellow = Medium, Blue = Low) */}
                  <div className={`flex items-center gap-1 rounded px-2 py-0.5 border ${getImportanceBadgeStyles(selectedNote.importance || 'Medium')}`}>
                    <span className="text-[9px] font-semibold">Priority:</span>
                    <select
                      value={selectedNote.importance || 'Medium'}
                      onChange={(e) => handleQuickImportanceChange(e.target.value)}
                      className="bg-transparent text-[10px] font-bold focus:outline-none cursor-pointer"
                    >
                      <option value="High" className="bg-[#161b22] text-[#f85149]">High</option>
                      <option value="Medium" className="bg-[#161b22] text-[#d29922]">Medium</option>
                      <option value="Low" className="bg-[#161b22] text-[#58a6ff]">Low</option>
                    </select>
                  </div>

                  {selectedNote.pinned && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[9px] px-1.5 py-0.2 rounded bg-[#d29922]/15 text-[#d29922] border border-[#d29922]/30 font-medium">
                      <Pin className="w-2.5 h-2.5" fill="#d29922" /> Pinned
                    </span>
                  )}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => handleTogglePin(selectedNote, e)}
                    className={`p-1.5 rounded border text-xs transition-colors cursor-pointer ${
                      selectedNote.pinned
                        ? 'bg-[#d29922]/15 text-[#d29922] border-[#d29922]/40'
                        : 'bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border-[#30363d]'
                    }`}
                    title={selectedNote.pinned ? 'Unpin' : 'Pin to top'}
                  >
                    <Pin className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadMarkdown(selectedNote)}
                    title="Export as Markdown"
                    className="p-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] text-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#58a6ff]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStartEdit(selectedNote)}
                    className="px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-[#f0f6fc] border border-[#30363d] text-xs flex items-center gap-1 font-medium transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      if (window.confirm(`Delete note "${selectedNote.title}"?`)) {
                        const noteId = selectedNote.id || selectedNote._id;
                        await deleteNote(noteId);
                        setNotification(`Deleted "${selectedNote.title}"`);
                        setTimeout(() => setNotification(null), 2500);
                        setSelectedNote(null);
                      }
                    }}
                    className="p-1.5 rounded bg-[#21262d] hover:bg-[#da3633]/20 hover:text-[#f85149] text-[#8b949e] border border-[#30363d] transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Document Reading Body */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-3xl">
                  {/* Note Title */}
                  <h1 className="text-xl font-bold text-[#f0f6fc] tracking-tight">
                    {selectedNote.title}
                  </h1>

                  <hr className="border-[#30363d] my-4" />

                  {/* Rendered Markdown Content */}
                  <MarkdownViewer content={selectedNote.content} />
                </div>
              </div>
            </div>
          ) : (
            /* Contextual Empty State */
            <div className="flex flex-col items-center justify-center h-full text-[#8b949e] space-y-3 p-6 text-center animate-fadeIn">
              <div className="w-10 h-10 rounded-md bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#58a6ff]">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#f0f6fc]">
                  {selectedTopics.length > 0
                    ? `No Notes Match "${selectedTopics.join(' + ')}"`
                    : 'No Note Selected'}
                </p>
                <p className="text-[11px] text-[#8b949e] mt-1 max-w-xs">
                  {selectedTopics.length > 0
                    ? 'None of your notes contain this topic. Clear your topic filter to see your notes, or create a new note.'
                    : 'Select a note from the left sidebar or create a new one.'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {selectedTopics.length > 0 && (
                  <button
                    type="button"
                    onClick={clearTopics}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] hover:text-[#f0f6fc] text-xs font-medium transition-colors cursor-pointer"
                  >
                    Clear Filter
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleStartCreate}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/30 text-white text-xs font-medium shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Create Note
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
