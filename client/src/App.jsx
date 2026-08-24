import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { AppLayout } from './components/layout/AppLayout';

import { Dashboard } from './pages/Dashboard';
import { DsaTracker } from './pages/DsaTracker';
import { CompanyArchives } from './pages/CompanyArchives';
import { Flashcards } from './pages/Flashcards';
import { Roadmaps } from './pages/Roadmaps';
import { Projects } from './pages/Projects';
import { Notes } from './pages/Notes';
import { RevisionPlanner } from './pages/RevisionPlanner';
import { MockInterview } from './pages/MockInterview';
import { ResumeScanner } from './pages/ResumeScanner';
import { AiMentor } from './pages/AiMentor';
import { Analytics } from './pages/Analytics';
import { Profile } from './pages/Profile';
import { Recommendations } from './pages/Recommendations';
import { AuthPage } from './pages/AuthPage';

// Protected Route - redirects to /auth if not logged in
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center mx-auto animate-pulse">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-slate-400 text-sm">Loading NextOffer...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

// Public Route - redirects to / if already logged in
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 animate-pulse" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            {/* Public - Auth page */}
            <Route
              path="/auth"
              element={
                <PublicRoute>
                  <AuthPage />
                </PublicRoute>
              }
            />

            {/* Protected - App pages */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/dsa" element={<DsaTracker />} />
              <Route path="/company-archives" element={<CompanyArchives />} />
              <Route path="/flashcards" element={<Flashcards />} />
              <Route path="/roadmaps" element={<Roadmaps />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/revision" element={<RevisionPlanner />} />
              <Route path="/mock-interview" element={<MockInterview />} />
              <Route path="/resume" element={<ResumeScanner />} />
              <Route path="/ai-mentor" element={<AiMentor />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
