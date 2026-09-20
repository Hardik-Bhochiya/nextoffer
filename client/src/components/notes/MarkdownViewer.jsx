import React, { useState } from 'react';
import { Copy, Check, Terminal, Code2 } from 'lucide-react';

export const MarkdownViewer = ({ content }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!content) {
    return <p className="text-xs text-[#8b949e] italic">No content in this note yet.</p>;
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
            <div key={`code-${blockIdx}`} className="my-3 rounded-md bg-[#0d1117] border border-[#30363d] overflow-hidden shadow-sm">
              <div className="px-3 py-1.5 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-[#8b949e] font-mono">
                  <Terminal className="w-3.5 h-3.5 text-[#58a6ff]" />
                  <span className="uppercase text-[10px] font-semibold text-[#8b949e]">
                    {codeLanguage || 'Code'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(codeString, blockIdx)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 transition-all ${
                    isCopied
                      ? 'bg-[#238636]/15 text-[#3fb950] border border-[#238636]/40'
                      : 'bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d]'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-[#3fb950]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 overflow-x-auto text-xs font-mono text-[#e6edf3] leading-relaxed">
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
          <h1 key={lineIdx} className="text-base font-bold text-[#e6edf3] tracking-tight mt-4 mb-2 pb-1.5 border-b border-[#30363d]">
            {line.replace(/^# /, '')}
          </h1>
        );
        return;
      }

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={lineIdx} className="text-sm font-bold text-[#e6edf3] tracking-tight mt-3 mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#58a6ff]" />
            {line.replace(/^## /, '')}
          </h2>
        );
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={lineIdx} className="text-xs font-bold text-[#c9d1d9] mt-2 mb-1">
            {line.replace(/^### /, '')}
          </h3>
        );
        return;
      }

      // Format Blockquotes
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={lineIdx} className="my-2 pl-3 border-l-4 border-[#30363d] text-[#8b949e] italic text-xs py-1">
            {line.replace(/^> /, '')}
          </blockquote>
        );
        return;
      }

      // Format Bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const bulletContent = line.trim().replace(/^[-*]\s+/, '');
        elements.push(
          <div key={lineIdx} className="flex items-start gap-2 text-xs text-[#c9d1d9] py-0.5 ml-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#58a6ff] mt-1.5 shrink-0" />
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
        <p key={lineIdx} className="text-xs text-[#c9d1d9] leading-relaxed py-0.5">
          {renderInlineFormatting(line)}
        </p>
      );
    });

    // If code block remained open at end of document
    if (inCodeBlock && currentCodeLines.length > 0) {
      const blockIdx = codeBlockCount++;
      const codeString = currentCodeLines.join('\n');
      elements.push(
        <div key={`code-final`} className="my-3 rounded-md bg-[#0d1117] border border-[#30363d] overflow-hidden">
          <pre className="p-3.5 overflow-x-auto text-xs font-mono text-[#e6edf3]">
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
          <code key={i} className="px-1.5 py-0.5 rounded bg-[#21262d] text-[#e6edf3] border border-[#30363d] font-mono text-[11px]">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-[#e6edf3]">
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
