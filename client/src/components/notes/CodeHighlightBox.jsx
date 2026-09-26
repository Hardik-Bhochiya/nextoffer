import React, { useState } from 'react';
import { Copy, Check, Code2 } from 'lucide-react';

const SQL_KEYWORDS = new Set([
  'select', 'from', 'where', 'insert', 'into', 'values', 'update', 'set',
  'delete', 'create', 'table', 'database', 'drop', 'alter', 'join', 'inner',
  'left', 'right', 'full', 'outer', 'on', 'group', 'by', 'having', 'order',
  'asc', 'desc', 'limit', 'offset', 'and', 'or', 'not', 'null', 'primary',
  'key', 'foreign', 'references', 'index', 'unique', 'default', 'check',
  'union', 'all', 'view', 'trigger', 'procedure', 'distinct', 'as', 'in',
  'between', 'like', 'is', 'exists', 'case', 'when', 'then', 'else', 'end',
  'count', 'sum', 'avg', 'min', 'max', 'truncate', 'grant', 'revoke'
]);

const GENERAL_AND_PSEUDO_KEYWORDS = new Set([
  // Core programming keywords
  'abstract', 'arguments', 'as', 'async', 'await', 'boolean', 'break', 'byte',
  'case', 'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default',
  'delete', 'do', 'double', 'else', 'enum', 'eval', 'export', 'extends',
  'false', 'final', 'finally', 'float', 'for', 'from', 'function', 'get', 'goto',
  'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'let',
  'long', 'native', 'new', 'null', 'package', 'private', 'protected', 'public',
  'return', 'set', 'short', 'static', 'super', 'switch', 'synchronized', 'this',
  'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void',
  'volatile', 'while', 'with', 'yield', 'def', 'elif', 'lambda', 'pass',
  'None', 'True', 'False', 'self', 'include', 'using', 'namespace', 'struct',
  'template', 'typename', 'typedef', 'virtual', 'override', 'nullptr', 'auto',
  // Pseudo-code and CS algorithm keywords
  'algorithm', 'procedure', 'input', 'output', 'swap', 'repeat', 'until',
  'then', 'print', 'println', 'begin', 'end', 'initialize', 'declare',
  'step', 'loop', 'call', 'min', 'max', 'size', 'length', 'push', 'pop',
  'enqueue', 'dequeue', 'insert', 'remove', 'find', 'search', 'sort'
]);

const DATA_TYPES = new Set([
  'int', 'long', 'float', 'double', 'char', 'boolean', 'bool', 'void', 'byte',
  'short', 'string', 'String', 'Integer', 'Double', 'Boolean', 'Character',
  'Long', 'Float', 'Byte', 'Short', 'List', 'ArrayList', 'LinkedList', 'Map',
  'HashMap', 'TreeMap', 'Set', 'HashSet', 'TreeSet', 'Queue', 'Deque',
  'PriorityQueue', 'Stack', 'vector', 'pair', 'unordered_map', 'unordered_set',
  'ListNode', 'TreeNode', 'Node', 'Graph', 'size_t', 'int32_t', 'int64_t',
  'varchar', 'nvarchar', 'text', 'blob', 'date', 'datetime', 'timestamp',
  'decimal', 'numeric', 'bigint', 'tinyint', 'smallint', 'array', 'matrix'
]);

// Format tokens inside a single line
const highlightTokens = (line, lang = '') => {
  const isSql = lang.toLowerCase() === 'sql';
  const trimmed = line.trim();

  // Full-line comments (supports //, /*, *, --, #)
  if (
    trimmed.startsWith('//') ||
    trimmed.startsWith('/*') ||
    trimmed.startsWith('*') ||
    (isSql && trimmed.startsWith('--')) ||
    (!isSql && trimmed.startsWith('#'))
  ) {
    return <span className="text-[#8b949e] italic">{line}</span>;
  }

  // Tokenize line using comprehensive pattern
  const tokenRegex = /(<!--.*?-->|\/\*.*?\*\/|\/\/.*$|--.*$|#.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_]\w*\b|[{}()\[\];,\.]|[+\-*/%=!<>|&~^?:#]+|[^\s\w]+|\s+)/g;

  const matches = line.match(tokenRegex) || [line];

  return matches.map((token, idx) => {
    // Comments
    if (
      token.startsWith('//') ||
      token.startsWith('/*') ||
      (isSql && token.startsWith('--')) ||
      (!isSql && token.startsWith('#'))
    ) {
      return (
        <span key={idx} className="text-[#8b949e] italic">
          {token}
        </span>
      );
    }

    // Strings
    if (
      (token.startsWith('"') && token.endsWith('"')) ||
      (token.startsWith("'") && token.endsWith("'")) ||
      (token.startsWith('`') && token.endsWith('`'))
    ) {
      return (
        <span key={idx} className="text-[#a5d6ff]">
          {token}
        </span>
      );
    }

    // Numbers
    if (/^\d+(\.\d+)?$/.test(token)) {
      return (
        <span key={idx} className="text-[#d2a8ff]">
          {token}
        </span>
      );
    }

    // Keywords & Types
    const lower = token.toLowerCase();
    if (isSql) {
      if (SQL_KEYWORDS.has(lower)) {
        return (
          <span key={idx} className="text-[#ff7b72] font-semibold">
            {token}
          </span>
        );
      }
    } else {
      if (GENERAL_AND_PSEUDO_KEYWORDS.has(token) || GENERAL_AND_PSEUDO_KEYWORDS.has(lower)) {
        return (
          <span key={idx} className="text-[#ff7b72] font-semibold">
            {token}
          </span>
        );
      }
    }

    if (DATA_TYPES.has(token) || DATA_TYPES.has(lower)) {
      return (
        <span key={idx} className="text-[#79c0ff] font-medium">
          {token}
        </span>
      );
    }

    // Operators
    if (/^[+\-*/%=!<>|&~^?:#]+$/.test(token)) {
      return (
        <span key={idx} className="text-[#79c0ff]">
          {token}
        </span>
      );
    }

    // Delimiters
    if (/^[{}()\[\];,\.]+$/.test(token)) {
      return (
        <span key={idx} className="text-[#c9d1d9]">
          {token}
        </span>
      );
    }

    // Regular identifiers or whitespace
    return <span key={idx}>{token}</span>;
  });
};

export const CodeHighlightBox = ({ code, language = '' }) => {
  const [copied, setCopied] = useState(false);

  const cleanCode = code ? code.replace(/\r\n/g, '\n').replace(/\r/g, '\n') : '';
  const lines = cleanCode.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasSpecificLang = language && language.trim() && language.toLowerCase() !== 'code';
  const displayLabel = hasSpecificLang ? language.toUpperCase() : 'Code / Pseudo-code';

  return (
    <div className="my-3 rounded-md border border-[#30363d] bg-[#0d1117] overflow-hidden shadow-sm">
      {/* Clean Code Box Header */}
      <div className="px-3 py-1.5 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-[#58a6ff]" />
          <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-[#21262d] text-[#c9d1d9] border border-[#30363d]">
            {displayLabel}
          </span>
          <span className="text-[10px] text-[#8b949e] font-mono">
            {lines.length} {lines.length === 1 ? 'line' : 'lines'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium border transition-colors cursor-pointer ${
            copied
              ? 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/40'
              : 'bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-[#f0f6fc] border-[#30363d]'
          }`}
          title="Copy code to clipboard"
        >
          {copied ? (
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

      {/* Code Body with Line Numbers Gutter */}
      <div className="flex overflow-x-auto text-xs font-mono leading-relaxed">
        {/* Line Numbers Column */}
        <div className="select-none py-2.5 px-2.5 text-right text-[#6e7681] bg-[#161b22]/30 border-r border-[#30363d] font-mono text-[11px] shrink-0 min-w-[2.25rem]">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Content Column */}
        <div className="py-2.5 px-3.5 flex-1 overflow-x-auto font-mono text-xs leading-relaxed text-[#e6edf3]">
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre">
              {line.length > 0 ? highlightTokens(line, language) : '\u00A0'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeHighlightBox;
