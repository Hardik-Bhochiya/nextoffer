import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Rocket,
  Eye,
  EyeOff,
  CheckCircle2,
  Mail,
  Lock,
  User,
  Briefcase,
  Building,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Code2,
  TrendingUp,
  BrainCircuit,
  ArrowRight
} from 'lucide-react';

import { allRoles } from '../data/rolesData';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [targetRole, setTargetRole] = useState('Full Stack Software Engineer');
  const [dreamCompany, setDreamCompany] = useState('');
  const [gradYear, setGradYear] = useState('2026');

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleFillDemo = () => {
    setEmail('alex@example.com');
    setPassword('password123');
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    if (isLogin) {
      const res = await login(email, password);
      setLoading(false);
      if (res?.success) {
        navigate('/');
      } else {
        setError(res?.message || 'Invalid email or password. Please check your credentials.');
      }
    } else {
      const res = await register({
        fullName,
        name: fullName,
        email,
        password,
        targetRole,
        dreamCompany: dreamCompany || 'Tier-1 Tech Companies',
        gradYear
      });
      setLoading(false);
      if (res?.success) {
        setSuccessMessage('Account created successfully! Please sign in with your password to continue.');
        setIsLogin(true);
        setPassword('');
        setFullName('');
        setDreamCompany('');
      } else {
        setError(res?.message || 'Registration failed. Please try again.');
      }
    }
  };

  const switchMode = (loginMode) => {
    setIsLogin(loginMode);
    setError('');
    setSuccessMessage('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 lg:p-8 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Background Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container Card */}
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden relative z-10">
        
        {/* Left Column: Brand Story & Platform Highlights */}
        <div className="lg:col-span-5 p-8 lg:p-10 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                  NextOffer <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-mono font-normal">AI v1.0</span>
                </span>
                <p className="text-[11px] text-slate-400 font-medium">Placement Preparation Platform</p>
              </div>
            </div>

            {/* Hero Copy */}
            <div className="space-y-2 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/50 text-[11px] text-indigo-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Predictive Placement Engine</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight tracking-tight">
                Master your technical placement journey.
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Streamline your DSA patterns, track curated roadmaps, diagnose algorithmic weak spots, and benchmark your readiness index for top tech companies.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-indigo-950/90 border border-indigo-800/40 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                  <Code2 className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-200">Curated DSA & Spaced Revision</p>
                  <p className="text-[11px] text-slate-400">Master 350+ pattern-based interview problems with automated revision schedules.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-cyan-950/90 border border-cyan-800/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-200">Predictive Readiness Index</p>
                  <p className="text-[11px] text-slate-400">Dynamic score telemetry weighted for your specific target software engineering role.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-amber-950/90 border border-amber-800/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <BrainCircuit className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-200">ATS Resume Scanner & AI Mentor</p>
                  <p className="text-[11px] text-slate-400">Real-time keyword diagnostics, mock challenges, and live coding profile sync.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof / Metrics Footer */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Stack Placement Suite</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">2026 Batch Ready</span>
          </div>
        </div>

        {/* Right Column: Authentication Form */}
        <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-center space-y-6">
          
          {/* Tab Switcher */}
          <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => switchMode(true)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isLogin
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchMode(false)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                !isLogin
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form Subheader & Demo Helper */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">
                {isLogin ? 'Sign In to Your Workspace' : 'Create Candidate Account'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {isLogin ? 'Enter your credentials to continue your preparation' : 'Fill in your target details to build your custom roadmap'}
              </p>
            </div>

            {isLogin && (
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-950/80 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-800/40 font-semibold transition"
                title="Auto-fill sample credentials"
              >
                ⚡ Demo Account
              </button>
            )}
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-200 flex items-start gap-3 shadow-sm animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-300">Registration Complete!</p>
                <p className="text-emerald-400/90 mt-0.5 leading-relaxed">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-800/80 text-xs text-rose-300 flex items-center gap-2 animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Actual Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name (Register Only) */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Kumar"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isLogin ? '••••••••' : 'Minimum 6 characters'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Extra Register Fields */}
            {!isLogin && (
              <div className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Developer Role</label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 transition"
                    >
                      {allRoles.map((role) => (
                        <option key={role.id} value={role.title}>{role.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Dream Companies</label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={dreamCompany}
                        onChange={(e) => setDreamCompany(e.target.value)}
                        placeholder="e.g. Google, Uber"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Graduation Year</label>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={gradYear}
                        onChange={(e) => setGradYear(e.target.value)}
                        placeholder="2026"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Please wait...' : isLogin ? 'Sign In to Workspace' : 'Create Candidate Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Mode Switch Helper */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-400">
              {isLogin ? "Don't have an account yet? " : 'Already have a registered account? '}
              <button
                type="button"
                onClick={() => switchMode(!isLogin)}
                className="text-indigo-400 font-bold hover:underline transition"
              >
                {isLogin ? 'Create one now' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
