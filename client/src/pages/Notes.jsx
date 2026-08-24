import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  BookOpen,
  Plus,
  Search,
  Tag,
  Pin,
  Trash2,
  Edit3,
  X,
  FileCode,
  Sparkles,
  Download
} from 'lucide-react';

export const Notes = () => {
  const { notes, addNote, updateNote, deleteNote } = useData();

  const [selectedNote, setSelectedNote] = useState(notes[0] || null);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState('');

  // Extract all unique tags
  const allTags = ['All', ...new Set(notes.flatMap(n => n.tags || []))];

  const filteredNotes = notes.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase());
    const matchTag = selectedTag === 'All' || (n.tags && n.tags.includes(selectedTag));
    return matchSearch && matchTag;
  });

  const handleStartCreate = () => {
    setSelectedNote(null);
    setEditTitle('');
    setEditContent('');
    setEditTags('DBMS, SQL, SystemDesign');
    setIsEditing(true);
  };

  const handleStartEdit = (n) => {
    setSelectedNote(n);
    setEditTitle(n.title);
    setEditContent(n.content);
    setEditTags(n.tags?.join(', ') || '');
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    const tagsArray = editTags.split(',').map(t => t.trim()).filter(Boolean);

    if (selectedNote?.id) {
      updateNote(selectedNote.id, {
        title: editTitle,
        content: editContent,
        tags: tagsArray
      });
      setSelectedNote({
        ...selectedNote,
        title: editTitle,
        content: editContent,
        tags: tagsArray
      });
    } else {
      addNote({
        title: editTitle,
        content: editContent,
        tags: tagsArray,
        pinned: false,
        isFavorite: false
      });
    }

    setIsEditing(false);
  };

  const handleDownloadMarkdown = (note) => {
    if (!note) return;
    const blob = new Blob([`# ${note.title}\n\nTags: ${note.tags?.join(', ') || 'None'}\n\n---\n\n${note.content}`], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${note.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_notes.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-400" />
            Interview Smart Notes
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Markdown-powered revision notes for Core CS, OOPs, DBMS, and System Design.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="btn-primary self-start sm:self-auto flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </button>
      </div>

      {/* Main Grid: Left Notes List + Right Content Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Notes List & Filters */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Tags Pills */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                className={`text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedTag === t
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Notes Cards List */}
          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500 bg-slate-900/20 rounded-xl border border-slate-800/40">
                No notes found. Create your first interview note!
              </div>
            ) : (
              filteredNotes.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    setSelectedNote(n);
                    setIsEditing(false);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                    selectedNote?.id === n.id
                      ? 'bg-indigo-950/40 border-indigo-700/50 shadow-md'
                      : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-100 truncate flex-1">{n.title}</h3>
                    {n.pinned && <Pin className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />}
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {n.content?.replace(/[#*`_]/g, '') || ''}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {n.tags?.map((t, i) => (
                      <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Markdown Viewer or Editor */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 flex flex-col justify-between h-[650px] overflow-hidden">
          {isEditing ? (
            /* Editing Form */
            <form onSubmit={handleSave} className="flex flex-col h-full space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-indigo-400" />
                  {selectedNote?.id ? 'Edit Note' : 'Create Note'}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 flex-1 flex flex-col">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Note Title..."
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Tags separated by comma (e.g. DBMS, SQL, Normalization)"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex-1">
                  <textarea
                    placeholder="Write note in Markdown formatting (# Heading, **bold**, `code`)..."
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-full min-h-[300px] bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30"
                >
                  Save Note
                </button>
              </div>
            </form>
          ) : selectedNote ? (
            /* Note Viewer */
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">{selectedNote.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    {selectedNote.tags?.map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/40">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadMarkdown(selectedNote)}
                    title="Download as Markdown"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1 font-semibold"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" /> Export .md
                  </button>
                  <button
                    onClick={() => handleStartEdit(selectedNote)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1 font-semibold"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteNote(selectedNote.id);
                      setSelectedNote(null);
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 border border-slate-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Note Content */}
              <div className="flex-1 overflow-y-auto pr-2 prose prose-invert max-w-none text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-sans">
                {selectedNote.content}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <FileCode className="w-10 h-10 mb-2 opacity-50 text-indigo-400" />
              <p className="text-xs">Select a note or create a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Notes;
