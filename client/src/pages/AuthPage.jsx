import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Code2,
  Terminal
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
      if (!fullName.trim()) {
        setError('Please enter your full name.');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        setLoading(false);
        return;
      }

      const res = await register({
        fullName: fullName.trim(),
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        targetRole,
        dreamCompany: dreamCompany || 'Google, Uber, Microsoft',
        gradYear
      });
      setLoading(false);
      if (res?.success) {
        setSuccessMessage('Account created successfully! Please sign in with your credentials.');
        setIsLogin(true);
        setPassword('');
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
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 font-sans bg-white">
      {/* LEFT COLUMN: Brand Identity & Mission (GitHub Dark Canvas) */}
      <div className="relative bg-[#0d1117] text-white flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-r border-[#30363d]/50">
        {/* Top bar: Back button (only shown when registering to navigate back to login) */}
        <div className="min-h-[36px]">
          {!isLogin && (
            <button
              type="button"
              onClick={() => switchMode(true)}
              className="inline-flex items-center gap-2 text-sm text-[#8b949e] hover:text-[#f0f6fc] transition-colors py-1.5 px-2.5 -ml-2.5 rounded-md hover:bg-[#161b22] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Login</span>
            </button>
          )}
        </div>

        {/* Center: Branding & Mission matching reference image */}
        <div className="flex flex-col items-center text-center my-auto py-12">
          {/* Logo Illustration */}
          <div className="mb-6 relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-[#161b22] to-[#21262d] border border-[#30363d] flex items-center justify-center shadow-2xl relative">
              <Terminal className="w-9 h-9 text-[#58a6ff]" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-[#238636] border-2 border-[#0d1117] flex items-center justify-center">
                <Code2 className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          </div>

          {/* Platform Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f0f6fc]">
            NextOffer
          </h1>

          {/* Subtitle / Description matching ICPC reference style */}
          <p className="mt-4 text-sm sm:text-base text-[#8b949e] max-w-md leading-relaxed font-normal">
            NextOffer is an algorithmic interview &amp; career placement acceleration platform for engineers.
          </p>

          {/* Feature Badges in GitHub style */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-sm">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#161b22] border border-[#30363d] text-[#c9d1d9]">
              <span className="w-2 h-2 rounded-full bg-[#238636]"></span>
              Curated DSA Patterns
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#161b22] border border-[#30363d] text-[#c9d1d9]">
              <span className="w-2 h-2 rounded-full bg-[#58a6ff]"></span>
              Role Readiness Engine
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#161b22] border border-[#30363d] text-[#c9d1d9]">
              <span className="w-2 h-2 rounded-full bg-[#d29922]"></span>
              Spaced Repetition
            </span>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-8 border-t border-[#21262d]/80">
          <p className="text-xs text-[#6e7681]">
            &copy; {new Date().getFullYear()} NextOffer. All rights reserved.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: Clean Minimalist Authentication Form (Light Canvas) */}
      <div className="bg-white text-slate-900 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-6">
          
          {/* Back to login shortcut for small screens when registering */}
          {!isLogin && (
            <button
              type="button"
              onClick={() => switchMode(true)}
              className="inline-flex items-center gap-1.5 text-xs text-[#0969da] hover:underline font-medium lg:hidden -mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </button>
          )}

          {/* Heading */}
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </h2>
            <p className="text-sm text-slate-500">
              {isLogin
                ? 'Enter your credentials to access the NextOffer platform'
                : 'Start tracking your technical placement prep and readiness'}
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <div className="p-3.5 rounded-lg text-xs font-medium bg-red-50 border border-red-200 text-red-700 flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1">{error}</div>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-lg text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">{successMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Registration specific fields */}
            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Developer"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0969da] focus:border-transparent transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="targetRole">
                      Target Role
                    </label>
                    <select
                      id="targetRole"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#0969da]"
                    >
                      {allRoles.map((role) => (
                        <option key={role.id} value={role.title}>
                          {role.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="gradYear">
                      Graduation Year
                    </label>
                    <select
                      id="gradYear"
                      value={gradYear}
                      onChange={(e) => setGradYear(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#0969da]"
                    >
                      {['2024', '2025', '2026', '2027', '2028'].map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0969da] focus:border-transparent transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700" htmlFor="password">
                  Password
                </label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => setShowHelpModal(true)}
                    className="text-xs text-slate-500 hover:text-slate-900 hover:underline transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isLogin ? 'Enter your password' : 'Create a password (min. 6 chars)'}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0969da] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 mt-2 bg-[#0d1117] hover:bg-[#161b22] active:bg-[#21262d] text-white text-sm font-semibold rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              <span>{isLogin ? 'Sign in' : 'Create account'}</span>
            </button>
          </form>

          {/* Toggle between Sign In and Sign Up */}
          <div className="text-center pt-2 text-xs text-slate-600">
            {isLogin ? (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode(false)}
                  className="font-semibold text-slate-900 hover:underline"
                >
                  Sign up
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode(true)}
                  className="font-semibold text-slate-900 hover:underline"
                >
                  Sign in
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
