import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
  BrainCircuit,
  Clock,
  Code2,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Send,
  Building,
  Award,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

export const MockInterview = () => {
  const { user } = useAuth();

  const [allRounds, setAllRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(null);
  const [selectedRoundId, setSelectedRoundId] = useState('mock-1');
  const [answerCode, setAnswerCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 mins
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Fetch question on round change
  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/ai/mock-question?roundId=${selectedRoundId}`);
        if (res?.data) {
          setCurrentRound(res.data);
          setAnswerCode(res.data.starterCode || '');
          setEvaluation(null);
        }
        if (res?.allRounds) {
          setAllRounds(res.allRounds);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [selectedRoundId]);

  // Timer countdown
  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmitAnswer = async () => {
    if (!answerCode.trim()) return;
    setEvaluating(true);
    try {
      const res = await api.post('/ai/submit-mock', {
        questionId: currentRound?.id,
        answerCode,
        timeSpentSeconds: 45 * 60 - timeLeft
      });
      if (res?.data) {
        setEvaluation(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-indigo-400" /> AI Mock Technical Interview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulate realistic Tier-1 technical coding & system design rounds with instant AI evaluation.
          </p>
        </div>

        {/* Timer Box */}
        <div className="glass-panel px-4 py-2 rounded-2xl flex items-center gap-3 self-start sm:self-auto border border-slate-800">
          <Clock className={`w-4 h-4 ${timeLeft < 300 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Session Timer</p>
            <p className={`text-base font-black font-mono ${timeLeft < 300 ? 'text-rose-400' : 'text-slate-100'}`}>
              {formatTime(timeLeft)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white ml-2 text-xs"
          >
            {isTimerRunning ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      {/* Round Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {allRounds.map((r, i) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setSelectedRoundId(r.id)}
            className={`p-4 rounded-2xl border text-left transition-all space-y-1 ${
              selectedRoundId === r.id
                ? 'bg-indigo-950/50 border-indigo-600/60 shadow-lg shadow-indigo-600/20'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-indigo-400 uppercase">{r.round}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                r.difficulty === 'Hard' ? 'bg-rose-950 text-rose-300' : 'bg-amber-950 text-amber-300'
              }`}>{r.difficulty}</span>
            </div>
            <p className="text-xs font-bold text-white truncate">{r.title}</p>
            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <Building className="w-3 h-3 text-slate-500" /> {r.company}
            </p>
          </button>
        ))}
      </div>

      {/* Main Workspace: Left Problem Description + Right Code Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Problem Prompt (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 max-h-[620px] overflow-y-auto">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/40">
                {currentRound?.topic || 'Coding Challenge'}
              </span>
              <h2 className="text-lg font-bold text-white mt-2">{currentRound?.title}</h2>
            </div>

            <div className="prose prose-invert max-w-none text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
              {currentRound?.prompt}
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-900/40 space-y-1">
              <p className="text-[11px] font-bold text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Target Complexity:
              </p>
              <p className="text-xs font-mono text-slate-300">{currentRound?.expectedComplexity}</p>
            </div>
          </div>
        </div>

        {/* Right: Code Workspace & AI Scorecard (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                Technical Solution Workspace
              </h3>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAnswerCode(currentRound?.starterCode || '')}
                  className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>
            </div>

            {/* Code Input */}
            <textarea
              rows={14}
              value={answerCode}
              onChange={(e) => setAnswerCode(e.target.value)}
              placeholder="// Write clean, production-grade code or architecture design here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-emerald-400 font-mono focus:outline-none focus:border-indigo-500 leading-relaxed shadow-inner"
            />

            {/* Action Bar */}
            <div className="flex justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={evaluating || !answerCode.trim()}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                {evaluating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Evaluating Solution...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit for AI Review</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Scorecard Result */}
          {evaluation && (
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Interview Evaluation</span>
                  <h3 className="text-lg font-black text-white mt-0.5">{evaluation.summary}</h3>
                </div>

                <div className="text-right">
                  <span className={`text-xl font-black ${
                    evaluation.score >= 80 ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {evaluation.score}/100
                  </span>
                  <p className="text-[10px] uppercase font-bold text-indigo-400">{evaluation.verdict}</p>
                </div>
              </div>

              {/* Feedback Points */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                {evaluation.feedback?.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
                {evaluation.edgeCases?.map((ec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-amber-300">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{ec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MockInterview;
