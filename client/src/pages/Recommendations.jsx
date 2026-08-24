import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  Sparkles,
  Target,
  Layers,
  TrendingUp,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Code2,
  Building,
  BrainCircuit,
  BookOpen,
  ChevronRight,
  RefreshCw,
  Lightbulb
} from 'lucide-react';

export const Recommendations = () => {
  const { user } = useAuth();
  const { metrics, refreshData, roadmaps } = useData();

  const [batchEnrolling, setBatchEnrolling] = useState(false);
  const [batchEnrolledMessage, setBatchEnrolledMessage] = useState('');
  const [weaknessData, setWeaknessData] = useState(null);
  const [loadingWeakness, setLoadingWeakness] = useState(false);

  const readiness = metrics?.readinessScore ?? user?.readinessScore ?? 0;
  const targetRole = user?.targetRole || metrics?.targetRole || 'Full Stack Software Engineer';
  const dreamCompany = user?.dreamCompany || 'Top Tech Tier-1 Companies';
  const weightsExplanation = metrics?.weightsExplanation || {
    roleCategory: targetRole,
    breakdown: [
      { label: 'Role Specific Roadmaps', score: 0, weight: '35%' },
      { label: 'DSA Mastery & Patterns', score: 0, weight: '35%' },
      { label: 'Portfolio Projects', score: 0, weight: '20%' },
      { label: 'Core CS Notes & Flashcards', score: 0, weight: '10%' }
    ]
  };

  useEffect(() => {
    const fetchWeakness = async () => {
      setLoadingWeakness(true);
      try {
        const res = await api.get('/ai/weakness');
        if (res?.data) {
          setWeaknessData(res.data);
        }
      } catch (err) {
        console.error('Failed to load weakness data:', err);
      } finally {
        setLoadingWeakness(false);
      }
    };
    fetchWeakness();
  }, []);

  const handleEnrollRecommendedRoadmaps = async () => {
    if (!metrics?.recommendedRoadmapIds?.length) return;
    setBatchEnrolling(true);
    try {
      await api.post('/roadmap/enroll-batch', {
        roadmapIds: metrics.recommendedRoadmapIds
      });
      setBatchEnrolledMessage('Successfully enrolled in all recommended tracks for your role!');
      setTimeout(() => setBatchEnrolledMessage(''), 4000);
      refreshData();
    } catch (err) {
      console.error(err);
    } finally {
      setBatchEnrolling(false);
    }
  };

  // Company Specific Preparation Insights
  const getCompanyInsights = (companyName) => {
    const name = (companyName || '').toLowerCase();
    if (name.includes('google')) {
      return {
        focus: 'DSA & Graph Algorithms, Distributed Systems, Clean Coding',
        keyTopics: ['Graphs (BFS/DFS, Dijkstra)', 'Dynamic Programming', 'Tries & Segment Trees', 'Concurrency'],
        interviewRounds: '4-5 Rounds: DSA Heavy + System Design + Googliness (Behavioral)'
      };
    } else if (name.includes('amazon')) {
      return {
        focus: '16 Leadership Principles (LP), Tree/Graph DSA, Object Oriented LLD',
        keyTopics: ['Trees & Graphs', 'Sliding Window', 'LLD & Design Patterns', 'STAR Method Stories'],
        interviewRounds: '4 Rounds: Online Assessment + 3 Technical & LP Bar Raiser'
      };
    } else if (name.includes('microsoft')) {
      return {
        focus: 'Problem Solving, Low-Level Design, Data Modeling & Azure/Cloud',
        keyTopics: ['Linked Lists & Arrays', 'Binary Trees', 'Database Schema Design', 'System Architecture'],
        interviewRounds: '4 Rounds: DSA Problem Solving + LLD + System Design'
      };
    } else if (name.includes('uber') || name.includes('meta')) {
      return {
        focus: 'High Scale Distributed Systems, Complex DSA (DP/Graphs), Fast Execution',
        keyTopics: ['Graph Algorithms', 'Caching (Redis/Memcached)', 'Rate Limiting & Sharding', 'Message Queues (Kafka)'],
        interviewRounds: '5 Rounds: Coding (Hard/Medium) + High-Level Design (HLD) + Culture'
      };
    }
    return {
      focus: 'Strong algorithmic fundamentals, Clean Low-Level Design, and Full Stack Architecture',
      keyTopics: ['Two Pointers & Sliding Window', 'Tree Traversals', 'REST APIs & DB Indexing', 'Project Architecture'],
      interviewRounds: '3-4 Rounds: Coding Assessment + Technical SDE + Behavioral'
    };
  };

  const companyIntel = getCompanyInsights(dreamCompany);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-xs text-indigo-400 font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Placement Intelligence Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Curated Placement Recommendations
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Custom curriculum tracks, predictive readiness telemetry, actionable score-boosting milestones, and targeted company intel.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={refreshData}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-2 transition shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
            <span>Refresh Telemetry</span>
          </button>
        </div>
      </div>

      {batchEnrolledMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-800/80 text-emerald-300 text-sm flex items-center gap-2 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{batchEnrolledMessage}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. HERO PREDICTIVE READINESS CARD */}
      {/* ============================================================ */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4" /> Role Prediction Model
            </span>
            <h2 className="text-2xl font-black text-white">
              {targetRole}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your placement probability index is derived from role-specific curriculum coverage, algorithmic velocity, and capstone project implementations.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs text-slate-400">Targeting:</span>
              <span className="text-xs font-bold text-indigo-300 bg-indigo-950/80 px-2.5 py-1 rounded-lg border border-indigo-800/50">
                {dreamCompany}
              </span>
              <Link to="/profile" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-2">
                Edit Role in Profile
              </Link>
            </div>
          </div>

          <div className="bg-slate-950/90 p-5 rounded-2xl border border-slate-800 shrink-0 text-center sm:text-right min-w-[200px] space-y-2 shadow-inner">
            <span className="text-[10px] text-slate-500 font-bold uppercase block tracking-wider">Placement Readiness</span>
            <div className="flex items-baseline justify-center sm:justify-end gap-1">
              <span className="text-4xl font-black text-slate-100">{readiness}</span>
              <span className="text-base font-bold text-indigo-400">%</span>
            </div>
            <p className="text-[11px] font-bold text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-md border border-indigo-800/40 inline-block">
              {metrics?.placementTier || 'In Preparation'}
            </p>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800 mt-2">
              <div
                className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.max(4, readiness)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Weights Breakdown Progress Pills */}
        {weightsExplanation?.breakdown && (
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" /> Evaluation Weight Distribution ({weightsExplanation.roleCategory})
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {weightsExplanation.breakdown.map((b, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium truncate">{b.label}</span>
                    <span className="text-[10px] font-bold text-indigo-400 shrink-0">{b.score || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full"
                      style={{ width: `${Math.min(100, Math.max(5, b.score || 0))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 2. RECOMMENDED CURRICULUM TRACKS */}
      {/* ============================================================ */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">Recommended Curriculum Tracks</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Hand-picked roadmap modules structured specifically for candidate preparation towards {targetRole}.
            </p>
          </div>

          <button
            type="button"
            onClick={handleEnrollRecommendedRoadmaps}
            disabled={batchEnrolling}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 self-start sm:self-auto transition shadow-lg shadow-indigo-600/20 disabled:opacity-50"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{batchEnrolling ? 'Enrolling...' : 'Enroll in All Recommended Tracks'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metrics?.recommendedRoadmapTitles?.map((title, i) => {
            const trackId = metrics.recommendedRoadmapIds?.[i];
            const activeRoadmap = roadmaps.find(r => r.id === trackId || r._id?.toString() === trackId);
            const isEnrolled = activeRoadmap?.isEnrolled;

            return (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 flex flex-col justify-between gap-3 hover:border-slate-700 transition group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-950/90 border border-indigo-800/50 flex items-center justify-center text-indigo-400 font-bold text-xs shrink-0 group-hover:scale-105 transition">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xs font-bold text-slate-200 truncate group-hover:text-indigo-300 transition">
                        {title}
                      </h3>
                      {isEnrolled ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800/60 text-emerald-400 font-semibold shrink-0">
                          Enrolled
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-medium shrink-0">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {activeRoadmap?.category || 'Core SDE Module'} • {activeRoadmap?.topics?.length || 4} Key Concepts
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">
                    {activeRoadmap?.topics?.filter(t => t.completed).length || 0}/{activeRoadmap?.topics?.length || 4} Completed
                  </span>
                  <Link
                    to="/roadmaps"
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Open Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          }) || (
            <div className="col-span-2 p-6 rounded-2xl bg-slate-950 text-center text-slate-400 text-xs">
              Select your target role in profile to generate curriculum recommendations.
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. ACTIONABLE SCORE-BOOSTING ACTION ITEMS */}
      {/* ============================================================ */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Actionable Steps to Reach 85%+ Readiness</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              High-impact actionable tasks curated by AI to maximize your placement probability tier.
            </p>
          </div>
        </div>

        <div className="space-y-2.5 pt-2">
          {metrics?.nextActionItems?.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border flex items-center justify-between gap-4 text-xs transition-all ${
                item.done
                  ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-300'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {item.done ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-600 flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold text-slate-500">{idx + 1}</span>
                  </div>
                )}
                <span className={`text-xs ${item.done ? 'line-through text-slate-500' : 'font-semibold text-slate-200'}`}>
                  {item.action}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800/50 font-mono font-bold">
                  {item.boost}
                </span>
                {item.done ? (
                  <span className="text-[10px] text-emerald-400 font-semibold uppercase">Done</span>
                ) : (
                  <span className="text-[10px] text-amber-400 font-semibold uppercase">Pending</span>
                )}
              </div>
            </div>
          )) || (
            <p className="text-xs text-slate-500 py-3">No active action items at the moment.</p>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. TWO-COLUMN: AI WEAKNESS ANALYSIS + COMPANY BLUEPRINT */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: AI DSA Weakness Diagnostic */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">DSA Weakness Diagnostic</h2>
            </div>
            <Link to="/dsa" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
              <span>Open DSA</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-xs text-slate-400">
            {weaknessData?.summary || 'Identifies algorithmic areas where you have attempted or flagged questions for revision.'}
          </p>

          <div className="space-y-2.5 pt-1">
            {weaknessData?.weakTopics?.slice(0, 3).map((w, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">{w.topic}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800/40 font-semibold">
                    {w.pendingCount} Needs Work
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{w.recommendation}</p>
              </div>
            )) || (
              <div className="p-4 rounded-2xl bg-slate-950 text-center text-xs text-slate-400">
                Log problems in the DSA Tracker to unlock personalized algorithmic gap analysis.
              </div>
            )}
          </div>
        </div>

        {/* Right: Target Company Interview Blueprint */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-bold text-white">{dreamCompany} Blueprint</h2>
            </div>
            <Link to="/company-archives" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
              <span>Archives</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-xs text-slate-400">
            High-yield focus topics curated from past interview experiences at {dreamCompany}.
          </p>

          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                <Lightbulb className="w-3 h-3" /> Strategic Core Focus
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {companyIntel.focus}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                Key Recommended Topics
              </span>
              <div className="flex flex-wrap gap-1.5">
                {companyIntel.keyTopics.map((topic, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 font-medium">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Interview Structure
              </span>
              <p className="text-[11px] text-slate-300">
                {companyIntel.interviewRounds}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
