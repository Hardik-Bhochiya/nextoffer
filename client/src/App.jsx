import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { AppLayout } from './components/layout/AppLayout';

import { Dashboard } from './pages/Dashboard';
import { DsaTracker } from './pages/DsaTracker';
import { Roadmaps } from './pages/Roadmaps';
import { Projects } from './pages/Projects';
import { Notes } from './pages/Notes';
import { RevisionPlanner } from './pages/RevisionPlanner';
import { AiMentor } from './pages/AiMentor';
import { Analytics } from './pages/Analytics';
import { AuthPage } from './pages/AuthPage';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dsa" element={<DsaTracker />} />
              <Route path="/roadmaps" element={<Roadmaps />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/revision" element={<RevisionPlanner />} />
              <Route path="/ai-mentor" element={<AiMentor />} />
              <Route path="/analytics" element={<Analytics />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
