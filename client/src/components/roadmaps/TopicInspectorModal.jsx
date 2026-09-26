import React from 'react';
import {
  X,
  BookOpen,
  ExternalLink,
  CheckCircle2,
  Circle,
  HelpCircle,
  Sparkles,
  Lock,
  ListChecks,
  ArrowRight
} from 'lucide-react';
import { getTopicReference } from '../../data/topicReferenceData';
import { Link } from 'react-router-dom';

export const TopicInspectorModal = ({
  isOpen,
  onClose,
  topic,
  roadmapCategory,
  isLocked = false,
  prerequisiteTitle = '',
  onToggleComplete
}) => {
  if (!isOpen || !topic) return null;

  const fallbackRef = getTopicReference(topic.title);

  const overview = topic.overview || fallbackRef.overview;
  const keyTakeaways = topic.keyTakeaways || [];
  const interviewQuestions = (topic.interviewQuestions && topic.interviewQuestions.length > 0)
    ? topic.interviewQuestions
    : fallbackRef.interviewQuestions;
  const docLinks = (topic.learningLinks && topic.learningLinks.length > 0)
    ? topic.learningLinks
    : fallbackRef.docLinks;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#30363d] flex items-start justify-between bg-[#161b22]">
          <div className="space-y-1.5 pr-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] uppercase font-bold text-[#58a6ff] bg-[#388bfd]/10 px-2 py-0.5 rounded border border-[#388bfd]/30">
                {roadmapCategory || 'Software Engineering Track'}
              </span>
              {topic.completed ? (
                <span className="text-[10px] font-semibold text-[#3fb950] bg-[#238636]/15 px-2 py-0.5 rounded border border-[#238636]/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Completed
                </span>
              ) : isLocked ? (
                <span className="text-[10px] font-semibold text-[#f85149] bg-[#da3633]/15 px-2 py-0.5 rounded border border-[#da3633]/40 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Prerequisite Locked
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-[#58a6ff] bg-[#388bfd]/15 px-2 py-0.5 rounded border border-[#388bfd]/40">
                  Ready to Solve
                </span>
              )}
            </div>

            <h2 className="text-base font-bold text-[#e6edf3] tracking-tight">{topic.title}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Prerequisite Alert if Locked */}
          {isLocked && (
            <div className="p-3.5 rounded-md bg-[#da3633]/10 border border-[#da3633]/30 flex items-start gap-3 text-xs text-[#f85149]">
              <Lock className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Sequential Track Locked</p>
                <p className="text-[#8b949e] mt-0.5">
                  Complete previous milestone <span className="text-[#e6edf3] font-medium font-mono">"{prerequisiteTitle}"</span> before checking off this milestone.
                </p>
              </div>
            </div>
          )}

          {/* Architectural Overview */}
          <div className="p-4 rounded-md bg-[#0d1117] border border-[#30363d] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] uppercase font-bold text-[#58a6ff] tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Conceptual Overview
              </span>
              <span className="text-[10px] text-[#8b949e] font-mono">Curated Notes</span>
            </div>
            <p className="text-xs text-[#c9d1d9] leading-relaxed font-sans">
              {overview}
            </p>
          </div>

          {/* Key Takeaways */}
          {keyTakeaways.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-[#3fb950]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#e6edf3]">
                  Key Engineering Takeaways
                </h3>
              </div>

              <div className="space-y-1.5">
                {keyTakeaways.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-md bg-[#0d1117] border border-[#30363d] flex items-start gap-2 text-xs text-[#c9d1d9]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Interview Questions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#d29922]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#e6edf3]">
                Top Interview Questions
              </h3>
            </div>

            <div className="space-y-2">
              {interviewQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-md bg-[#0d1117] border border-[#30363d] flex items-start gap-2.5 text-xs text-[#c9d1d9]"
                >
                  <span className="w-5 h-5 rounded bg-[#21262d] text-[#58a6ff] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-[#30363d]">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curated Resources & Practice Links */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#58a6ff]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#e6edf3]">
                Curated Free Documentation & Standards
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {docLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-md bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] hover:border-[#58a6ff]/50 flex items-center justify-between text-xs text-[#c9d1d9] transition-all group"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#21262d] text-[#58a6ff] border border-[#30363d]">
                      {link.tag || 'Guide'}
                    </span>
                    <span className="font-medium truncate text-[#e6edf3]">{link.label}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8b949e] group-hover:text-[#58a6ff] shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Cross-Module Shortcuts */}
          <div className="p-3.5 rounded-md bg-[#0d1117] border border-[#30363d] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <p className="font-semibold text-[#e6edf3]">Save Key Learnings</p>
              <p className="text-[11px] text-[#8b949e]">Record personal summary notes or cheatsheets for this specific milestone.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/notes"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-md bg-[#1f6feb] hover:bg-[#388bfd] text-white text-[11px] font-semibold transition flex items-center gap-1.5 shadow-sm"
              >
                <span>Create Revision Note</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#30363d] bg-[#161b22] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium transition-colors"
          >
            Close
          </button>

          <button
            type="button"
            disabled={isLocked && !topic.completed}
            onClick={() => {
              if (isLocked && !topic.completed) return;
              onToggleComplete();
            }}
            className={`px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-2 transition-all shadow-sm ${
              topic.completed
                ? 'bg-[#21262d] hover:bg-[#da3633]/20 text-[#8b949e] hover:text-[#f85149] border border-[#30363d]'
                : isLocked
                ? 'bg-[#21262d] text-[#484f58] border border-[#30363d] cursor-not-allowed'
                : 'bg-[#238636] hover:bg-[#2ea043] text-white'
            }`}
          >
            {topic.completed ? (
              <>
                <Circle className="w-3.5 h-3.5" />
                <span>Mark Incomplete (Resets Downstream)</span>
              </>
            ) : isLocked ? (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Locked: Complete Prerequisite First</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
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

