import React, { useState, useRef, useEffect } from 'react';
import api from '../services/api';
import {
  Bot,
  Send,
  Sparkles,
  User,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  RotateCcw,
  Layers,
  ArrowRight
} from 'lucide-react';

export const AiMentor = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `### 👋 Hello Hardik! I am your NextOffer AI Placement Mentor.

I am here to help you accelerate your interview readiness:
- 💡 **Algorithm Intuition & DSA Walkthroughs**
- 🎯 **Personalized Study Roadmaps**
- 📄 **ATS Resume & Portfolio Project Reviews**
- 🎤 **System Design & Mock Technical Questions**

What topic or challenge would you like to tackle today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [weaknessData, setWeaknessData] = useState(null);
  const [loadingWeakness, setLoadingWeakness] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (customPrompt) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const res = await api.post('/ai/mentor', {
        prompt: textToSend,
        conversationHistory: messages
      });

      const aiReply = res?.data?.reply || 'I am analyzing your placement roadmap. Keep consistent with your daily DSA goals!';

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Here is a quick tip: Focus on understanding the core pattern (Two Pointers, Sliding Window, DFS/BFS) rather than memorizing solutions.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeakness = async () => {
    setLoadingWeakness(true);
    try {
      const res = await api.get('/ai/weakness');
      if (res?.data) {
        setWeaknessData(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingWeakness(false);
    }
  };

  const quickPrompts = [
    { label: '🎯 4-Week Study Plan', prompt: 'Create a targeted 4-week placement acceleration plan for SDE interviews.' },
    { label: '📄 ATS Resume Checklist', prompt: 'Give me the top ATS resume optimization tips for SDE roles.' },
    { label: '🎤 System Design Challenge', prompt: 'Give me a mock system design interview challenge with solution hints.' },
    { label: '⏱️ Big-O Complexity Sheet', prompt: 'Explain the time and space complexity cheat sheet for common algorithms.' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Bot className="w-6 h-6 text-indigo-400" /> AI Placement Study Mentor
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            24/7 personalized AI guidance for DSA, System Design, ATS Resumes, and Mock Interviews.
          </p>
        </div>

        <button
          onClick={fetchWeakness}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-indigo-300 text-xs font-semibold shadow-md transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          {loadingWeakness ? 'Analyzing...' : 'Run Weakness Audit'}
        </button>
      </div>

      {/* Weakness Banner (if triggered) */}
      {weaknessData && (
        <div className="glass-panel p-4 rounded-2xl border-indigo-800/60 bg-indigo-950/30 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>AI Weakness Analysis Report</span>
            </div>
            <button
              onClick={() => setWeaknessData(null)}
              className="text-xs text-slate-500 hover:text-white"
            >
              Dismiss
            </button>
          </div>
          <p className="text-xs text-slate-300">{weaknessData.summary}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {weaknessData.weakTopics?.map((w, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-200">
                  <span>{w.topic}</span>
                  <span className="text-rose-400 text-[10px] bg-rose-950 px-1.5 py-0.5 rounded">
                    {w.pendingCount} pending
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{w.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Chat Window */}
      <div className="glass-panel rounded-2xl flex flex-col h-[620px] overflow-hidden border border-slate-800">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                  m.role === 'user'
                    ? 'bg-gradient-to-tr from-indigo-600 to-violet-500 text-white'
                    : 'bg-indigo-950 border border-indigo-700/50 text-indigo-400'
                }`}
              >
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{m.content}</div>
                <div
                  className={`text-[10px] mt-2 font-mono text-right ${
                    m.role === 'user' ? 'text-indigo-200' : 'text-slate-500'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-950 border border-indigo-700/50 flex items-center justify-center text-indigo-400">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span>AI Mentor is formulating placement guidance...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-6 py-2.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp.prompt)}
              className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] font-medium whitespace-nowrap transition-colors flex items-center gap-1 shrink-0"
            >
              <span>{qp.label}</span>
              <ArrowRight className="w-3 h-3 text-indigo-400" />
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything (e.g. Explain LRU Cache, how to answer 'Tell me about yourself', DP patterns)..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
