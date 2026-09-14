import React from 'react';
import {
  X,
  BookOpen,
  ExternalLink,
  CheckCircle2,
  Circle,
  HelpCircle,
  Sparkles,
  GitBranch,
  Layers,
  ArrowRight
} from 'lucide-react';
import { getTopicReference } from '../../data/topicReferenceData';
import { Link } from 'react-router-dom';

export const TopicInspectorModal = ({
  isOpen,
  onClose,
  topic,
  roadmapCategory,
  onToggleComplete
}) => {
  if (!isOpen || !topic) return null;

  const refData = getTopicReference(topic.title);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between bg-slate-950/50">
          <div className="space-y-1 pr-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-800/40">
                {roadmapCategory || 'Software Engineering Track'}
              </span>
              {topic.completed ? (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Completed
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800/40">
                  In Progress
                </span>
              )}
            </div>

            <h2 className="text-lg font-black text-white tracking-tight">{topic.title}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Architectural Overview */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Conceptual Overview
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Milestone Reference</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {refData.overview}
            </p>
          </div>

          {/* Key Interview Questions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Frequent Technical Interview Questions
              </h3>
            </div>

            <div className="space-y-2">
              {refData.interviewQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300"
                >
                  <span className="w-5 h-5 rounded-lg bg-indigo-950 text-indigo-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Documentation & Practice Links */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Official References & Standards
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {refData.docLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-xs text-slate-200 transition-all group"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                      {link.tag}
                    </span>
                    <span className="font-semibold truncate">{link.label}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Cross-Module Shortcuts */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-950/40 to-cyan-950/40 border border-indigo-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <p className="font-bold text-white">Apply in practice</p>
              <p className="text-[11px] text-slate-400">Add a smart note or solve related DSA problems.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/notes"
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition"
              >
                Create Note
              </Link>
              <Link
                to="/dsa"
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold shadow-md transition flex items-center gap-1"
              >
                <span>DSA Practice</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              onToggleComplete();
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
              topic.completed
                ? 'bg-slate-800 hover:bg-rose-950/80 text-slate-300 hover:text-rose-300 border border-slate-700'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
            }`}
          >
            {topic.completed ? (
              <>
                <Circle className="w-4 h-4" />
                <span>Mark Incomplete</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Milestone Solved (+Score)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicInspectorModal;
