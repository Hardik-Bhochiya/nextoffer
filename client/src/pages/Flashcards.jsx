import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Database,
  Cpu,
  Code2,
  Network
} from 'lucide-react';

const flashcardsData = [
  // DBMS
  {
    id: 'fc-1',
    category: 'DBMS & SQL',
    question: 'What are the 4 ACID properties in Database Transactions?',
    answer: '1. **Atomicity**: All or nothing execution.\n2. **Consistency**: Database transitions between valid states preserving constraints.\n3. **Isolation**: Concurrent transactions do not interfere with each other.\n4. **Durability**: Committed data survives power loss or crashes (Write-Ahead Logging).',
    importance: 'Very High (100% asked in Tier-1 DBMS rounds)'
  },
  {
    id: 'fc-2',
    category: 'DBMS & SQL',
    question: 'Why do relational databases use B+ Trees instead of Binary Search Trees for Indexing?',
    answer: '1. **Disk I/O Efficiency**: B+ Trees have high fan-out, reducing tree height so fewer disk page reads are needed.\n2. **Range Queries**: Leaf nodes in B+ Trees are linked sequentially in a doubly linked list, making range scans `O(k)` fast.\n3. **Uniform Depth**: Every search takes equal time.',
    importance: 'High'
  },
  // OS
  {
    id: 'fc-3',
    category: 'Operating Systems',
    question: 'What are the 4 necessary Coffman conditions for a Deadlock to occur?',
    answer: '1. **Mutual Exclusion**: At least one resource is non-shareable.\n2. **Hold and Wait**: Process holds resources while waiting for more.\n3. **No Preemption**: Resources cannot be forcibly taken away.\n4. **Circular Wait**: A closed chain of processes each waiting for resource held by next.',
    importance: 'Very High (Classic OS Interview Question)'
  },
  {
    id: 'fc-4',
    category: 'Operating Systems',
    question: 'What is the fundamental difference between a Process and a Thread?',
    answer: '- **Process**: Independent execution unit with its own separate virtual address space, memory heap, and file descriptors. Context switching is heavier.\n- **Thread**: Light-weight unit inside a process that shares code, heap, and open files, but has its own independent stack and program counter.',
    importance: 'Very High'
  },
  // OOPs & Design
  {
    id: 'fc-5',
    category: 'OOPs & SOLID',
    question: 'Explain the 5 SOLID Design Principles with practical examples.',
    answer: '- **S (Single Responsibility)**: A class should have one reason to change.\n- **O (Open/Closed)**: Open for extension, closed for modification.\n- **L (Liskov Substitution)**: Subtypes must be substitutable for their base types.\n- **I (Interface Segregation)**: Small focused interfaces over bloated ones.\n- **D (Dependency Inversion)**: Depend on abstractions, not concrete implementations.',
    importance: 'High (Standard Machine Coding criteria)'
  },
  // System Design & Networks
  {
    id: 'fc-6',
    category: 'System Design & Networks',
    question: 'Explain the CAP Theorem and why no distributed system can achieve all three.',
    answer: '- **Consistency (C)**: Every read receives the most recent write.\n- **Availability (A)**: Every request receives a non-error response.\n- **Partition Tolerance (P)**: System operates despite network packet loss.\n\nIn real distributed networks, network partition (P) is inevitable, forcing a choice between **CP** (e.g. MongoDB, HBase) or **AP** (e.g. Cassandra, DynamoDB).',
    importance: 'Very High (System Design Foundation)'
  }
];

export const Flashcards = () => {
  const [cards, setCards] = useState(flashcardsData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [masteredIds, setMasteredIds] = useState(new Set());

  const categories = ['All', 'DBMS & SQL', 'Operating Systems', 'OOPs & SOLID', 'System Design & Networks'];

  const filteredCards = selectedCategory === 'All'
    ? cards
    : cards.filter(c => c.category === selectedCategory);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  const markMastered = (id) => {
    setMasteredIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    handleNext();
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-400" /> Core CS Flashcard Revision Drills
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Rapid active recall for DBMS, Operating Systems, OOPs, SOLID Principles, and System Design.
          </p>
        </div>

        {/* Mastered Counter */}
        <div className="glass-panel px-4 py-2 rounded-2xl flex items-center gap-3 self-start sm:self-auto border border-slate-800">
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Cards Mastered</p>
            <p className="text-xs font-black text-emerald-400">{masteredIds.size} / {cards.length}</p>
          </div>
          <button
            type="button"
            onClick={handleShuffle}
            title="Shuffle Cards"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3D Flip Card Container */}
      {currentCard && (
        <div className="space-y-6">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[340px] rounded-3xl p-8 cursor-pointer transition-all duration-500 relative flex flex-col justify-between border shadow-2xl overflow-hidden group select-none bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/40 border-slate-800 hover:border-indigo-600/50 hover:shadow-indigo-600/10"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-950/80 text-indigo-300 font-bold border border-indigo-900/50">
                {currentCard.category}
              </span>
              <span className="font-mono text-slate-500">
                Card {currentIndex + 1} of {filteredCards.length}
              </span>
            </div>

            {/* Question / Answer View */}
            <div className="my-6">
              {!isFlipped ? (
                /* Question View */
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                    <HelpCircle className="w-4 h-4" /> Interview Question
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
                    {currentCard.question}
                  </h2>
                  <p className="text-xs text-slate-400 italic pt-2">
                    💡 Click card to flip and reveal the verified answer
                  </p>
                </div>
              ) : (
                /* Answer View */
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> Technical Explanation
                  </div>
                  <div className="prose prose-invert max-w-none text-xs md:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                    {currentCard.answer}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
              <span className="text-slate-400 font-medium">
                {currentCard.importance}
              </span>
              <span className="text-indigo-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <RotateCcw className="w-3.5 h-3.5" /> Flip Card
              </span>
            </div>
          </div>

          {/* Controls & Rating Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Prev / Next */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1 text-xs font-semibold"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1 text-xs font-semibold"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Action Feedback Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" /> Repeat Later
              </button>
              <button
                type="button"
                onClick={() => markMastered(currentCard.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all ${
                  masteredIds.has(currentCard.id)
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                    : 'bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-indigo-600/30'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{masteredIds.has(currentCard.id) ? 'Mastered ✓' : 'Mark Mastered'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Flashcards;
