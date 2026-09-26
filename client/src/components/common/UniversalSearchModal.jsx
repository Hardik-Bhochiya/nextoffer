import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  Search,
  Code2,
  GitBranch,
  FolderGit2,
  BookOpen,
  CalendarCheck,
  BarChart3,
  User,
  LayoutDashboard,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Command,
  X,
  Tag,
  CheckCircle2,
  Clock,
  Flame,
  CornerDownLeft
} from 'lucide-react';
import api from '../../services/api';

export const UniversalSearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { dsaProblems, roadmaps, projects, notes } = useData();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [remoteResults, setRemoteResults] = useState(null);
  const inputRef = useRef(null);
  const resultsContainerRef = useRef(null);

  // App navigation routes
  const appRoutes = [
    { title: 'Dashboard', desc: 'Placement Command Center & Readiness', path: '/dashboard', icon: LayoutDashboard, category: 'Pages' },
    { title: 'DSA Practice Tracker', desc: 'Blind 75 & LeetCode Practice Matrix', path: '/dsa', icon: Code2, category: 'Pages' },
    { title: 'Domain Roadmaps', desc: 'SDE, Backend, Frontend & Core CS tracks', path: '/roadmaps', icon: GitBranch, category: 'Pages' },
    { title: 'Capstone Projects', desc: 'Full-Stack & Distributed Systems Portfolio', path: '/projects', icon: FolderGit2, category: 'Pages' },
    { title: 'Revision & Task Planner', desc: 'Daily Action Checklist & Consistency Streak', path: '/planner', icon: CalendarCheck, category: 'Pages' },
    { title: 'Readiness Analytics', desc: 'Competency Radar & Role Evaluation Matrix', path: '/analytics', icon: BarChart3, category: 'Pages' },
    { title: 'Candidate Profile Dossier', desc: 'Target Role, Dream Companies & Socials', path: '/profile', icon: User, category: 'Pages' },
  ];

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setRemoteResults(null);
    }
  }, [isOpen]);

  // Debounced API call for deep database lookup
  useEffect(() => {
    if (!query.trim()) {
      setRemoteResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await api.get(`/search?q=${encodeURIComponent(query.trim())}`);
        if (res?.data) {
          setRemoteResults(res.data);
        }
      } catch (err) {
        // Fall back gracefully to client in-memory search
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  // Compute local instant match results combining memory and remote results
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    // 1. Navigation Pages
    const matchedPages = !q
      ? appRoutes.slice(0, 4)
      : appRoutes.filter(r => r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q));

    // 2. DSA Problems
    const localProblems = (dsaProblems || []).filter(p => {
      if (!q) return false;
      const titleMatch = p.title?.toLowerCase().includes(q);
      const topicMatch = p.topic?.toLowerCase().includes(q) || (Array.isArray(p.topics) && p.topics.some(t => t.toLowerCase().includes(q)));
      const compMatch = Array.isArray(p.companies) && p.companies.some(c => c.toLowerCase().includes(q));
      const diffMatch = p.difficulty?.toLowerCase().includes(q);
      return titleMatch || topicMatch || compMatch || diffMatch;
    });
    const combinedProblems = Array.from(
      new Map([...(remoteResults?.problems || []), ...localProblems].map(item => [item.id || item._id || item.title, item])).values()
    );

    // 3. Roadmaps & Topic Stages
    const matchedRoadmaps = [];
    (roadmaps || []).forEach(r => {
      if (!q) return;
      const catMatch = (r.category || r.title || '').toLowerCase().includes(q);
      const descMatch = (r.description || '').toLowerCase().includes(q);
      if (catMatch || descMatch) {
        matchedRoadmaps.push({
          id: r.id || r._id,
          title: r.category || r.title,
          description: r.description || `${r.topics?.length || 0} stages`,
          type: 'Roadmap Track',
          path: '/roadmaps'
        });
      }

      // Also match individual topics within the roadmap
      (r.topics || []).forEach(t => {
        if (t.title?.toLowerCase().includes(q)) {
          matchedRoadmaps.push({
            id: `${r.id}-${t.title}`,
            title: t.title,
            description: `Topic in ${r.category || r.title}`,
            type: 'Milestone Topic',
            completed: t.completed,
            path: '/roadmaps'
          });
        }
      });
    });

    // 4. Projects
    const localProjects = (projects || []).filter(p => {
      if (!q) return false;
      const titleMatch = p.title?.toLowerCase().includes(q);
      const descMatch = p.description?.toLowerCase().includes(q);
      const techMatch = Array.isArray(p.techStack) ? p.techStack.some(t => t.toLowerCase().includes(q)) : p.techStack?.toLowerCase().includes(q);
      return titleMatch || descMatch || techMatch;
    });
    const combinedProjects = Array.from(
      new Map([...(remoteResults?.projects || []), ...localProjects].map(item => [item.id || item._id || item.title, item])).values()
    );

    // 5. Notes
    const localNotes = (notes || []).filter(n => {
      if (!q) return false;
      const titleMatch = n.title?.toLowerCase().includes(q);
      const contentMatch = n.content?.toLowerCase().includes(q);
      const tagMatch = Array.isArray(n.tags) && n.tags.some(t => t.toLowerCase().includes(q));
      return titleMatch || contentMatch || tagMatch;
    });
    const combinedNotes = Array.from(
      new Map([...(remoteResults?.notes || []), ...localNotes].map(item => [item.id || item._id || item.title, item])).values()
    );

    return {
      pages: matchedPages,
      problems: combinedProblems,
      roadmaps: matchedRoadmaps,
      projects: combinedProjects,
      notes: combinedNotes
    };
  }, [query, remoteResults, dsaProblems, roadmaps, projects, notes]);

  // Flatten active category items for keyboard selection
  const flatItems = useMemo(() => {
    const list = [];

    if (activeCategory === 'all' || activeCategory === 'pages') {
      filteredResults.pages.forEach(p => list.push({ ...p, kind: 'page', action: () => navigate(p.path) }));
    }
    if (activeCategory === 'all' || activeCategory === 'dsa') {
      filteredResults.problems.forEach(p => list.push({ ...p, kind: 'dsa', action: () => navigate('/dsa') }));
    }
    if (activeCategory === 'all' || activeCategory === 'roadmaps') {
      filteredResults.roadmaps.forEach(r => list.push({ ...r, kind: 'roadmap', action: () => navigate(r.path || '/roadmaps') }));
    }
    if (activeCategory === 'all' || activeCategory === 'projects') {
      filteredResults.projects.forEach(p => list.push({ ...p, kind: 'project', action: () => navigate('/projects') }));
    }
    if (activeCategory === 'all' || activeCategory === 'notes') {
      filteredResults.notes.forEach(n => list.push({ ...n, kind: 'note', action: () => navigate('/notes') }));
    }

    return list;
  }, [activeCategory, filteredResults, navigate]);

  // Reset selected index when query or category changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  // Handle keyboard shortcuts inside modal
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1 < flatItems.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 >= 0 ? prev - 1 : Math.max(0, flatItems.length - 1)));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatItems[selectedIndex]) {
        flatItems[selectedIndex].action();
        onClose();
      }
    }
  };

  const totalCount =
    filteredResults.problems.length +
    filteredResults.roadmaps.length +
    filteredResults.projects.length +
    filteredResults.notes.length +
    (query ? filteredResults.pages.length : 0);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#000000]/70 backdrop-blur-sm flex items-start justify-center pt-12 sm:pt-20 px-4 animate-fadeIn font-sans"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Top Search Input Bar */}
        <div className="p-3 sm:p-4 border-b border-[#30363d] flex items-center gap-3 bg-[#0d1117]">
          <Search className="w-5 h-5 text-[#58a6ff] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems, roadmaps, notes, projects, or commands..."
            className="flex-1 bg-transparent text-sm text-[#f0f6fc] placeholder-[#6e7681] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-[#8b949e] bg-[#21262d] border border-[#30363d] rounded">
            ESC
          </kbd>
        </div>

        {/* Category Pill Filters */}
        <div className="px-3 py-2 border-b border-[#30363d] bg-[#161b22] flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'All Results', count: query ? totalCount : null },
            { id: 'dsa', label: 'DSA Questions', count: filteredResults.problems.length },
            { id: 'roadmaps', label: 'Roadmaps', count: filteredResults.roadmaps.length },
            { id: 'projects', label: 'Projects', count: filteredResults.projects.length },
            { id: 'notes', label: 'Notes', count: filteredResults.notes.length },
            { id: 'pages', label: 'Navigation', count: filteredResults.pages.length },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-[#1f6feb] text-white'
                  : 'text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && tab.count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategory === tab.id ? 'bg-white/20 text-white' : 'bg-[#21262d] text-[#8b949e]'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Results List View */}
        <div ref={resultsContainerRef} className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-[#21262d]/50">
          {flatItems.length > 0 ? (
            flatItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={`${item.kind}-${item.id || item._id || item.title || idx}`}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-2.5 rounded-lg flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#1f6feb]/15 border border-[#1f6feb]/40' : 'hover:bg-[#21262d] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Item Icon */}
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 border ${
                      item.kind === 'page' ? 'bg-[#388bfd]/10 text-[#58a6ff] border-[#388bfd]/30' :
                      item.kind === 'dsa' ? 'bg-[#238636]/10 text-[#3fb950] border-[#238636]/30' :
                      item.kind === 'roadmap' ? 'bg-[#58a6ff]/10 text-[#58a6ff] border-[#58a6ff]/30' :
                      item.kind === 'project' ? 'bg-[#bc8cff]/10 text-[#bc8cff] border-[#bc8cff]/30' :
                      'bg-[#d29922]/10 text-[#d29922] border-[#d29922]/30'
                    }`}>
                      {item.kind === 'page' && <item.icon className="w-4 h-4" />}
                      {item.kind === 'dsa' && <Code2 className="w-4 h-4" />}
                      {item.kind === 'roadmap' && <GitBranch className="w-4 h-4" />}
                      {item.kind === 'project' && <FolderGit2 className="w-4 h-4" />}
                      {item.kind === 'note' && <BookOpen className="w-4 h-4" />}
                    </div>

                    {/* Title & Metadata */}
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`text-xs font-semibold truncate ${isSelected ? 'text-[#58a6ff]' : 'text-[#f0f6fc]'}`}>
                          {item.title}
                        </p>

                        {/* DSA Badges */}
                        {item.difficulty && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium border ${
                            item.difficulty === 'Easy' ? 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/30' :
                            item.difficulty === 'Medium' ? 'bg-[#d29922]/15 text-[#d29922] border-[#d29922]/30' :
                            'bg-[#da3633]/15 text-[#f85149] border-[#da3633]/30'
                          }`}>
                            {item.difficulty}
                          </span>
                        )}

                        {/* Topic or Stage tag */}
                        {item.topic && (
                          <span className="text-[10px] text-[#8b949e] bg-[#21262d] px-1.5 py-0.2 rounded border border-[#30363d]">
                            {item.topic}
                          </span>
                        )}

                        {item.type && (
                          <span className="text-[10px] text-[#58a6ff] bg-[#388bfd]/10 px-1.5 py-0.2 rounded border border-[#388bfd]/20">
                            {item.type}
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-[#8b949e] truncate max-w-md">
                        {item.desc || item.description || item.content || (item.companies?.join(', ')) || 'Click to view details'}
                      </p>
                    </div>
                  </div>

                  {/* Right Action Hint */}
                  <div className="flex items-center gap-2 shrink-0">
                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#58a6ff] font-medium">
                        <span>Open</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#6e7681]" />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 space-y-2">
              <Search className="w-8 h-8 text-[#8b949e] mx-auto opacity-50" />
              <p className="text-xs font-medium text-[#f0f6fc]">No matching items found for "{query}"</p>
              <p className="text-[11px] text-[#8b949e]">
                Try searching for problem titles (e.g. "Two Sum"), topics ("Dynamic Programming"), roadmaps ("Backend"), or projects.
              </p>
            </div>
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="p-2.5 bg-[#0d1117] border-t border-[#30363d] flex items-center justify-between text-[11px] text-[#8b949e] px-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-[#21262d] border border-[#30363d] font-mono text-[9px]">&uarr;&darr;</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-[#21262d] border border-[#30363d] font-mono text-[9px]">Enter</kbd> Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-[#21262d] border border-[#30363d] font-mono text-[9px]">Esc</kbd> Close
            </span>
          </div>

          <span className="text-[10px] text-[#6e7681] hidden sm:inline">
            NextOffer Global Command Palette
          </span>
        </div>
      </div>
    </div>
  );
};
