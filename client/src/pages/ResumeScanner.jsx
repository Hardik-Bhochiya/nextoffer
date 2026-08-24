import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Target,
  ArrowRight,
  Copy,
  Check,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

export const ResumeScanner = () => {
  const { user } = useAuth();

  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copiedKw, setCopiedKw] = useState('');

  const handleScan = async (e) => {
    e.preventDefault();
    if (!resumeText.trim() || resumeText.trim().length < 50) {
      setError('Please paste your resume text (at least 50 characters) to analyze.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await api.post('/ai/scan-resume', {
        resumeText,
        jobDescription,
        targetRole: user?.targetRole || 'Full Stack Engineer'
      });

      if (res?.data) {
        setResult(res.data);
      }
    } catch (err) {
      setError(err?.message || 'Error analyzing resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyKeyword = (kw) => {
    navigator.clipboard.writeText(kw);
    setCopiedKw(kw);
    setTimeout(() => setCopiedKw(''), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-indigo-400" /> AI Resume ATS Scanner & Optimizer
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Scan your resume against ATS algorithms for <span className="text-indigo-300 font-semibold">{user?.targetRole || 'Software Engineering'}</span> roles to maximize interview callbacks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Textarea Pane (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <form onSubmit={handleScan} className="glass-panel rounded-3xl p-6 space-y-4 border border-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Resume Content
              </h2>
              <button
                type="button"
                onClick={() => setResumeText(`John Doe\nSoftware Engineer | john@example.com | github.com/johndoe\n\nTECHNICAL SKILLS\nLanguages: JavaScript, TypeScript, Python, HTML/CSS\nFrameworks & Libraries: React, Node.js, Express, Tailwind CSS\nDatabases & Cloud: MongoDB, PostgreSQL, Docker, Git\n\nEXPERIENCE & PROJECTS\n- Developed a real-time collaborative editor using React, Socket.io, and Node.js, improving synchronization latency by 35% for 200+ users.\n- Architected a microservices backend with Express and MongoDB, implementing JWT authentication and rate limiting.`)}
                className="text-[11px] text-indigo-400 hover:underline"
              >
                Load Sample
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Paste Resume Text (or Markdown) *
              </label>
              <textarea
                required
                rows={12}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste the text from your PDF or Word resume here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500 placeholder-slate-600 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Target Job Description (Optional)
              </label>
              <textarea
                rows={3}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste a specific job description to match exact keywords..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 placeholder-slate-600"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-xs text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning ATS Score...</span>
                </>
              ) : (
                <>
                  <Target className="w-4 h-4" />
                  <span>Scan Resume with AI</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: ATS Report & Actionable Suggestions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <>
              {/* ATS Score Card */}
              <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">ATS Match Index</span>
                    <h2 className="text-xl font-black text-white mt-0.5">{result.summary}</h2>
                    <p className="text-xs text-slate-400 mt-1">Role: <span className="text-indigo-300 font-semibold">{result.targetRole}</span></p>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <div className={`w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center shadow-xl ${
                      result.overallScore >= 80 
                        ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300 shadow-emerald-600/20' 
                        : result.overallScore >= 60 
                        ? 'border-amber-500/50 bg-amber-950/40 text-amber-300 shadow-amber-600/20' 
                        : 'border-rose-500/50 bg-rose-950/40 text-rose-300 shadow-rose-600/20'
                    }`}>
                      <span className="text-2xl font-black">{result.overallScore}%</span>
                      <span className="text-[9px] uppercase font-bold tracking-wider">Score</span>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      result.overallScore >= 80 ? 'bg-emerald-500' : result.overallScore >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${result.overallScore}%` }}
                  />
                </div>
              </div>

              {/* Keywords Match & Missing */}
              <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-cyan-400" />
                  Industry Keywords Analysis
                </h3>

                {/* Missing Keywords (Actionable) */}
                {result.missingKeywords?.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5" /> Missing High-Impact Keywords (Click to copy):
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {result.missingKeywords.map((kw, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => copyKeyword(kw)}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-rose-950/50 text-rose-300 border border-rose-900/60 hover:bg-rose-900/50 flex items-center gap-1 transition-all"
                        >
                          <span>+{kw}</span>
                          {copiedKw === kw ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-60" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matched Keywords */}
                {result.matchedKeywords?.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Found Keywords:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {result.matchedKeywords.map((kw, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-900/50 font-medium">
                          ✓ {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Formatting & Structure Checklist */}
              <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ATS Layout & Structure Checklist
                </h3>

                <div className="space-y-2">
                  {result.formatChecks?.map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs">
                      <span className="text-slate-300">{c.check}</span>
                      {c.passed ? (
                        <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-4 h-4" /> Passed
                        </span>
                      ) : (
                        <span className="text-amber-400 flex items-center gap-1 font-semibold">
                          <AlertTriangle className="w-4 h-4" /> Missing
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="glass-panel rounded-3xl p-12 border border-slate-800 text-center space-y-4 flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-indigo-950/60 border border-indigo-800/50 flex items-center justify-center text-indigo-400">
                <FileText className="w-8 h-8" />
              </div>
              <div className="max-w-md space-y-1">
                <h2 className="text-base font-bold text-white">Ready for Instant ATS Analysis</h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Paste your resume on the left to check your score against Tier-1 tech screening criteria, discover missing keywords, and get Google XYZ formula recommendations.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ResumeScanner;
