import React, { useState } from 'react';
import { Copy, Check, Terminal, Code2 } from 'lucide-react';

export const MarkdownViewer = ({ content }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!content) {
    return <p className="text-xs text-slate-500 italic">No content in this note yet.</p>;
  }

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  // Parse lines and code blocks
  const renderFormattedContent = () => {
    const lines = content.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeLanguage = '';
    let currentCodeLines = [];
    let codeBlockCount = 0;

    lines.forEach((line, lineIdx) => {
      // Check for code block boundary
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          // Close code block
          const blockIdx = codeBlockCount++;
          const codeString = currentCodeLines.join('\n');
          const isCopied = copiedIndex === blockIdx;

          elements.push(
            <div key={`code-${blockIdx}`} className="my-3 rounded-2xl bg-slate-950 border border-slate-800/90 overflow-hidden shadow-lg">
              <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-400 font-mono">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="uppercase text-[10px] font-bold text-slate-400">
                    {codeLanguage || 'Code Snippet'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(codeString, blockIdx)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-all ${
                    isCopied
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-xs font-mono text-cyan-200/90 leading-relaxed">
                <code>{codeString}</code>
              </pre>
            </div>
          );
          currentCodeLines = [];
          inCodeBlock = false;
          codeLanguage = '';
        } else {
          // Open code block
          inCodeBlock = true;
          codeLanguage = line.trim().replace(/^```/, '').trim();
        }
        return;
      }

      if (inCodeBlock) {
        currentCodeLines.push(line);
        return;
      }

      // Format Headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={lineIdx} className="text-lg font-black text-white tracking-tight mt-4 mb-2 pb-1 border-b border-slate-800">
            {line.replace(/^# /, '')}
          </h1>
        );
        return;
      }

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={lineIdx} className="text-sm font-black text-indigo-300 tracking-tight mt-3 mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            {line.replace(/^## /, '')}
          </h2>
        );
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={lineIdx} className="text-xs font-bold text-slate-200 mt-2 mb-1">
            {line.replace(/^### /, '')}
          </h3>
        );
        return;
      }

      // Format Blockquotes
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={lineIdx} className="my-2 pl-3 border-l-2 border-indigo-500 text-slate-300 italic text-xs bg-indigo-950/20 py-1 rounded-r-lg">
            {line.replace(/^> /, '')}
          </blockquote>
        );
        return;
      }

      // Format Bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const bulletContent = line.trim().replace(/^[-*]\s+/, '');
        elements.push(
          <div key={lineIdx} className="flex items-start gap-2 text-xs text-slate-300 py-0.5 ml-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
            <span>{renderInlineFormatting(bulletContent)}</span>
          </div>
        );
        return;
      }

      // Format regular lines or blank spaces
      if (!line.trim()) {
        elements.push(<div key={lineIdx} className="h-2" />);
        return;
      }

      elements.push(
        <p key={lineIdx} className="text-xs text-slate-300 leading-relaxed py-0.5">
          {renderInlineFormatting(line)}
        </p>
      );
    });

    // If code block remained open at end of document
    if (inCodeBlock && currentCodeLines.length > 0) {
      const blockIdx = codeBlockCount++;
      const codeString = currentCodeLines.join('\n');
      elements.push(
        <div key={`code-final`} className="my-3 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
          <pre className="p-4 overflow-x-auto text-xs font-mono text-cyan-200">
            <code>{codeString}</code>
          </pre>
        </div>
      );
    }

    return elements;
  };

  // Format bold (**text**) and inline code (`code`)
  const renderInlineFormatting = (text) => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-slate-950 text-indigo-300 border border-slate-800 font-mono text-[11px]">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return <div className="space-y-1">{renderFormattedContent()}</div>;
};

export default MarkdownViewer;
