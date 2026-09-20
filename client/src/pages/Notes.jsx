import React, { useState, useEffect } from 'react';
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
import { MarkdownViewer } from '../components/notes/MarkdownViewer';

export const Notes = () => {
  const { notes, addNote, updateNote, deleteNote } = useData();

  const [selectedNote, setSelectedNote] = useState(notes[0] || null);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState('');

  // Auto-select first note when notes load asynchronously
  useEffect(() => {
    if (!selectedNote && notes.length > 0) {
      setSelectedNote(notes[0]);
    }
  }, [notes, selectedNote]);

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
    const noteId = selectedNote?.id || selectedNote?._id;

    if (noteId) {
      updateNote(noteId, {
        title: editTitle.trim(),
        content: editContent,
        tags: tagsArray
      });
      setSelectedNote({
        ...selectedNote,
        title: editTitle.trim(),
        content: editContent,
        tags: tagsArray
      });
    } else {
      addNote({
        title: editTitle.trim(),
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
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#e6edf3] tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#58a6ff]" />
            Interview Smart Notes
          </h1>
          <p className="text-xs text-[#8b949e] mt-1">
            Markdown-powered revision notes for Core CS, OOPs, DBMS, Operating Systems, and System Design.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-medium shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Note</span>
        </button>
      </div>

      {/* Main Grid: Left Notes List + Right Content Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Notes List & Filters */}
        <div className="lg:col-span-1 space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-9 pr-3 py-1.5 text-xs text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff]"
            />
          </div>

          {/* Tags Pills */}
          <div className="flex flex-wrap gap-1.5 pb-1">
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                className={`text-[10px] px-2 py-0.5 rounded-md font-medium transition-all ${
                  selectedTag === t
                    ? 'bg-[#1f6feb] text-white'
                    : 'bg-[#21262d] text-[#8b949e] hover:text-[#c9d1d9] border border-[#30363d]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Notes Cards List */}
          <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#8b949e] bg-[#161b22] rounded-md border border-[#30363d]">
                No notes found. Create your first note!
              </div>
            ) : (
              filteredNotes.map((n) => {
                const noteId = n.id || n._id;
                const isSelected = selectedNote && (selectedNote.id === noteId || selectedNote._id === noteId);
                return (
                  <div
                    key={noteId}
                    onClick={() => {
                      setSelectedNote(n);
                      setIsEditing(false);
                    }}
                    className={`p-3 rounded-md border transition-all cursor-pointer space-y-1.5 ${
                      isSelected
                        ? 'bg-[#0d1117] border-[#388bfd] shadow-sm'
                        : 'bg-[#161b22] border-[#30363d] hover:border-[#8b949e]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-semibold text-[#e6edf3] truncate flex-1">{n.title}</h3>
                      {n.pinned && <Pin className="w-3.5 h-3.5 text-[#d29922] shrink-0 ml-1" />}
                    </div>

                    <p className="text-[11px] text-[#8b949e] line-clamp-2 leading-relaxed">
                      {n.content?.replace(/[#*`_]/g, '') || ''}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {n.tags?.map((t, i) => (
                        <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-[#21262d] text-[#58a6ff] font-mono border border-[#30363d]">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Markdown Viewer or Editor */}
        <div className="lg:col-span-2 rounded-lg bg-[#161b22] border border-[#30363d] p-5 flex flex-col justify-between h-[620px] overflow-hidden shadow-sm">
          {isEditing ? (
            /* Editing Form */
            <form onSubmit={handleSave} className="flex flex-col h-full space-y-4">
              <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
                <h2 className="text-sm font-semibold text-[#e6edf3] flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[#58a6ff]" />
                  {selectedNote?.id ? 'Edit Note' : 'Create Note'}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="p-1 text-[#8b949e] hover:text-[#e6edf3]"
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
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs font-semibold text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Tags separated by comma (e.g. DBMS, SQL, Normalization)"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>

                <div className="flex-1">
                  <textarea
                    placeholder="Write note in Markdown formatting (# Heading, **bold**, `code`)..."
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-full min-h-[300px] bg-[#0d1117] border border-[#30363d] rounded-md p-3 text-xs text-[#e6edf3] font-mono focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#30363d]">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-md bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d] text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-medium shadow-sm"
                >
                  Save Note
                </button>
              </div>
            </form>
          ) : selectedNote ? (
            /* Note Viewer */
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between border-b border-[#30363d] pb-3 mb-4">
                <div>
                  <h2 className="text-base font-bold text-[#e6edf3]">{selectedNote.title}</h2>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {selectedNote.tags?.map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#21262d] text-[#58a6ff] border border-[#30363d] font-mono">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadMarkdown(selectedNote)}
                    title="Export as Markdown"
                    className="p-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-[#e6edf3] border border-[#30363d] text-xs flex items-center gap-1 font-medium"
                  >
                    <Download className="w-3.5 h-3.5 text-[#58a6ff]" /> Export .md
                  </button>
                  <button
                    onClick={() => handleStartEdit(selectedNote)}
                    className="p-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-[#e6edf3] border border-[#30363d] text-xs flex items-center gap-1 font-medium"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      const noteId = selectedNote.id || selectedNote._id;
                      if (noteId) deleteNote(noteId);
                      setSelectedNote(null);
                    }}
                    className="p-1.5 rounded-md bg-[#21262d] hover:bg-[#da3633]/20 hover:text-[#f85149] text-[#8b949e] border border-[#30363d]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Note Content */}
              <div className="flex-1 overflow-y-auto pr-2">
                <MarkdownViewer content={selectedNote.content} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-[#8b949e]">
              <FileCode className="w-8 h-8 mb-2 opacity-50 text-[#58a6ff]" />
              <p className="text-xs font-medium">Select a note from the left or create a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Notes;
