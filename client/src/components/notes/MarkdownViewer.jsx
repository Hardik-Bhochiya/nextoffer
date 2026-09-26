import React from 'react';
import { CodeHighlightBox } from './CodeHighlightBox';

export const MarkdownViewer = ({ content }) => {
  if (!content) {
    return <p className="text-xs text-[#8b949e] italic">No content in this note yet.</p>;
  }

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

          elements.push(
            <CodeHighlightBox
              key={`code-${blockIdx}`}
              code={codeString}
              language={codeLanguage}
            />
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
        <CodeHighlightBox
          key={`code-final-${blockIdx}`}
          code={codeString}
          language={codeLanguage}
        />
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
