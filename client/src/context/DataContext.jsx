import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dsaProblems, setDsaProblems] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [projects, setProjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [revisions, setRevisions] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all initial data
  const refreshData = async () => {
    try {
      setLoading(true);
      const [dsaRes, roadmapsRes, projectsRes, notesRes, revRes, analyticsRes] = await Promise.allSettled([
        api.get('/dsa'),
        api.get('/roadmap'),
        api.get('/projects'),
        api.get('/notes'),
        api.get('/revision'),
        api.get('/analytics/dashboard')
      ]);

      if (dsaRes.status === 'fulfilled' && dsaRes.value?.data) setDsaProblems(dsaRes.value.data);
      if (roadmapsRes.status === 'fulfilled' && roadmapsRes.value?.data) setRoadmaps(roadmapsRes.value.data);
      if (projectsRes.status === 'fulfilled' && projectsRes.value?.data) setProjects(projectsRes.value.data);
      if (notesRes.status === 'fulfilled' && notesRes.value?.data) setNotes(notesRes.value.data);
      if (revRes.status === 'fulfilled' && revRes.value?.data) setRevisions(revRes.value.data);
      if (analyticsRes.status === 'fulfilled' && analyticsRes.value?.data) setMetrics(analyticsRes.value.data);
    } catch (err) {
      console.warn('Data sync fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // DSA Actions
  const updateDsaStatus = async (id, status, notes = '') => {
    // Optimistic UI update
    setDsaProblems(prev => prev.map(p => p.id === id ? { ...p, status, notes: notes || p.notes } : p));
    try {
      await api.put(`/dsa/${id}`, { status, notes });
      const anRes = await api.get('/analytics/dashboard').catch(() => null);
      if (anRes?.data) setMetrics(anRes.data);
    } catch (err) {
      console.error('Update DSA failed:', err);
    }
  };

  const addDsaProblem = async (newProb) => {
    try {
      const res = await api.post('/dsa', newProb);
      if (res?.data) {
        setDsaProblems(prev => [res.data, ...prev]);
        const anRes = await api.get('/analytics/dashboard').catch(() => null);
        if (anRes?.data) setMetrics(anRes.data);
      }
    } catch (err) {
      const localProb = { id: `dsa-${Date.now()}`, revisionsCount: 0, ...newProb };
      setDsaProblems(prev => [localProb, ...prev]);
    }
  };

  // Roadmap Actions
  const toggleRoadmapTopic = async (roadmapId, topicId) => {
    // Optimistic update
    setRoadmaps(prev => prev.map(r => {
      if (r.id === roadmapId) {
        return {
          ...r,
          topics: r.topics.map(t => t.id === topicId ? { ...t, completed: !t.completed } : t)
        };
      }
      return r;
    }));

    try {
      await api.patch(`/roadmap/${roadmapId}/topic/${topicId}`);
      const anRes = await api.get('/analytics/dashboard').catch(() => null);
      if (anRes?.data) setMetrics(anRes.data);
    } catch (err) {
      console.error('Toggle topic failed:', err);
    }
  };

  // Project Actions
  const addProject = async (projectData) => {
    try {
      const res = await api.post('/projects', projectData);
      if (res?.data) {
        setProjects(prev => [res.data, ...prev]);
      }
    } catch (err) {
      const localProj = { id: `proj-${Date.now()}`, milestones: [], ...projectData };
      setProjects(prev => [localProj, ...prev]);
    }
  };

  const updateProject = async (id, updates) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    try {
      await api.put(`/projects/${id}`, updates);
    } catch (err) {
      console.error('Update project failed:', err);
    }
  };

  const deleteProject = async (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    try {
      await api.delete(`/projects/${id}`);
    } catch (err) {
      console.error('Delete project failed:', err);
    }
  };

  // Notes Actions
  const addNote = async (noteData) => {
    try {
      const res = await api.post('/notes', noteData);
      if (res?.data) {
        setNotes(prev => [res.data, ...prev]);
      }
    } catch (err) {
      const localNote = { id: `note-${Date.now()}`, updatedAt: new Date().toISOString(), ...noteData };
      setNotes(prev => [localNote, ...prev]);
    }
  };

  const updateNote = async (id, updates) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
    try {
      await api.put(`/notes/${id}`, updates);
    } catch (err) {
      console.error('Update note failed:', err);
    }
  };

  const deleteNote = async (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    try {
      await api.delete(`/notes/${id}`);
    } catch (err) {
      console.error('Delete note failed:', err);
    }
  };

  // Revision Actions
  const addRevision = async (revData) => {
    try {
      const res = await api.post('/revision', revData);
      if (res?.data) {
        setRevisions(prev => [res.data, ...prev]);
      }
    } catch (err) {
      const localRev = { id: `rev-${Date.now()}`, completed: false, ...revData };
      setRevisions(prev => [localRev, ...prev]);
    }
  };

  const toggleRevision = async (id) => {
    setRevisions(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
    try {
      await api.patch(`/revision/${id}/toggle`);
    } catch (err) {
      console.error('Toggle revision failed:', err);
    }
  };

  const deleteRevision = async (id) => {
    setRevisions(prev => prev.filter(r => r.id !== id));
    try {
      await api.delete(`/revision/${id}`);
    } catch (err) {
      console.error('Delete revision failed:', err);
    }
  };

  return (
    <DataContext.Provider value={{
      dsaProblems,
      roadmaps,
      projects,
      notes,
      revisions,
      metrics,
      loading,
      refreshData,
      updateDsaStatus,
      addDsaProblem,
      toggleRoadmapTopic,
      addProject,
      updateProject,
      deleteProject,
      addNote,
      updateNote,
      deleteNote,
      addRevision,
      toggleRevision,
      deleteRevision
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
