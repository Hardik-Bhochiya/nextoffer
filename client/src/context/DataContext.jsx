import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();

  const [dsaProblems, setDsaProblems] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [projects, setProjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [revisions, setRevisions] = useState([]);
  const [studyGoals, setStudyGoals] = useState([]);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleApiError = (err) => {
    if (err?.status === 401 || err?.message?.includes('401')) {
      logout();
    }
  };

  const refreshData = async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      const [dsaRes, roadmapsRes, projectsRes, notesRes, revRes, plannerRes, analyticsRes] = await Promise.allSettled([
        api.get('/dsa'),
        api.get('/roadmap'),
        api.get('/projects'),
        api.get('/notes'),
        api.get('/revision'),
        api.get('/planner'),
        api.get('/analytics/dashboard')
      ]);

      if (dsaRes.status === 'fulfilled' && dsaRes.value?.data) setDsaProblems(dsaRes.value.data);
      if (roadmapsRes.status === 'fulfilled' && roadmapsRes.value?.data) setRoadmaps(roadmapsRes.value.data);
      if (projectsRes.status === 'fulfilled' && projectsRes.value?.data) setProjects(projectsRes.value.data);
      if (notesRes.status === 'fulfilled' && notesRes.value?.data) setNotes(notesRes.value.data);
      if (revRes.status === 'fulfilled' && revRes.value?.data) setRevisions(revRes.value.data);
      if (plannerRes.status === 'fulfilled' && plannerRes.value?.data) {
        setStudyGoals(plannerRes.value.data.studyGoals || []);
        setDailyTasks(plannerRes.value.data.dailyTasks || []);
      }
      if (analyticsRes.status === 'fulfilled' && analyticsRes.value?.data) setMetrics(analyticsRes.value.data);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    } else {
      setDsaProblems([]);
      setRoadmaps([]);
      setProjects([]);
      setNotes([]);
      setRevisions([]);
      setStudyGoals([]);
      setDailyTasks([]);
      setMetrics(null);
      setLoading(false);
    }
  }, [isAuthenticated]);

  // ---- DSA Actions ----
  const updateDsaStatus = async (id, status, notes = '') => {
    setDsaProblems(prev => prev.map(p => (p.id === id || p._id === id) ? { ...p, status, notes: notes || p.notes } : p));
    try {
      await api.put(`/dsa/${id}`, { status, notes });
      const anRes = await api.get('/analytics/dashboard').catch(() => null);
      if (anRes?.data) setMetrics(anRes.data);
    } catch (err) { handleApiError(err); }
  };

  const addDsaProblem = async (newProb) => {
    try {
      const res = await api.post('/dsa', newProb);
      if (res?.data) {
        setDsaProblems(prev => [res.data, ...prev]);
        const anRes = await api.get('/analytics/dashboard').catch(() => null);
        if (anRes?.data) setMetrics(anRes.data);
      }
    } catch (err) { handleApiError(err); }
  };

  const deleteDsaProblem = async (id) => {
    setDsaProblems(prev => prev.filter(p => p.id !== id && p._id !== id));
    try {
      await api.delete(`/dsa/${id}`);
      const anRes = await api.get('/analytics/dashboard').catch(() => null);
      if (anRes?.data) setMetrics(anRes.data);
    } catch (err) { handleApiError(err); }
  };

  // ---- Roadmap Actions ----
  const toggleEnrollRoadmap = async (roadmapId) => {
    setRoadmaps(prev => prev.map(r => {
      if (r.id === roadmapId || r._id?.toString() === roadmapId) {
        return { ...r, isEnrolled: !r.isEnrolled };
      }
      return r;
    }));
    try {
      await api.post(`/roadmap/${roadmapId}/enroll`);
      const anRes = await api.get('/analytics/dashboard').catch(() => null);
      if (anRes?.data) setMetrics(anRes.data);
    } catch (err) { handleApiError(err); }
  };

  const toggleRoadmapTopic = async (roadmapId, topicId) => {
    setRoadmaps(prev => prev.map(r => {
      if (r.id === roadmapId || r._id?.toString() === roadmapId) {
        return {
          ...r,
          isEnrolled: true,
          topics: r.topics.map(t => (t.id === topicId || t._id?.toString() === topicId) ? { ...t, completed: !t.completed } : t)
        };
      }
      return r;
    }));
    try {
      await api.patch(`/roadmap/${roadmapId}/topic/${topicId}`);
      const anRes = await api.get('/analytics/dashboard').catch(() => null);
      if (anRes?.data) setMetrics(anRes.data);
    } catch (err) { handleApiError(err); }
  };

  // ---- Project Actions ----
  const addProject = async (projectData) => {
    try {
      const res = await api.post('/projects', projectData);
      if (res?.data) setProjects(prev => [res.data, ...prev]);
    } catch (err) { handleApiError(err); }
  };

  const updateProject = async (id, updates) => {
    setProjects(prev => prev.map(p => (p.id === id || p._id === id) ? { ...p, ...updates } : p));
    try {
      await api.put(`/projects/${id}`, updates);
    } catch (err) { handleApiError(err); }
  };

  const deleteProject = async (id) => {
    setProjects(prev => prev.filter(p => p.id !== id && p._id !== id));
    try {
      await api.delete(`/projects/${id}`);
    } catch (err) { handleApiError(err); }
  };

  // ---- Notes Actions ----
  const addNote = async (noteData) => {
    try {
      const res = await api.post('/notes', noteData);
      if (res?.data) setNotes(prev => [res.data, ...prev]);
    } catch (err) { handleApiError(err); }
  };

  const updateNote = async (id, updates) => {
    setNotes(prev => prev.map(n => (n.id === id || n._id === id) ? { ...n, ...updates } : n));
    try {
      await api.put(`/notes/${id}`, updates);
    } catch (err) { handleApiError(err); }
  };

  const deleteNote = async (id) => {
    setNotes(prev => prev.filter(n => n.id !== id && n._id !== id));
    try {
      await api.delete(`/notes/${id}`);
    } catch (err) { handleApiError(err); }
  };

  // ---- Planner Actions ----
  const addStudyGoal = async (goalData) => {
    try {
      const res = await api.post('/planner/goals', goalData);
      if (res?.data) setStudyGoals(prev => [res.data, ...prev]);
    } catch (err) { handleApiError(err); }
  };

  const updateStudyGoal = async (id, updates) => {
    setStudyGoals(prev => prev.map(g => (g.id === id || g._id === id) ? { ...g, ...updates } : g));
    try {
      await api.put(`/planner/goals/${id}`, updates);
    } catch (err) { handleApiError(err); }
  };

  const deleteStudyGoal = async (id) => {
    setStudyGoals(prev => prev.filter(g => g.id !== id && g._id !== id));
    try {
      await api.delete(`/planner/goals/${id}`);
    } catch (err) { handleApiError(err); }
  };

  const addDailyTask = async (taskData) => {
    try {
      const res = await api.post('/planner/tasks', taskData);
      if (res?.data) setDailyTasks(prev => [...prev, res.data]);
    } catch (err) { handleApiError(err); }
  };

  const toggleDailyTask = async (id) => {
    setDailyTasks(prev => prev.map(t => (t.id === id || t._id === id) ? { ...t, taskStatus: !t.taskStatus } : t));
    try {
      await api.patch(`/planner/tasks/${id}/toggle`);
    } catch (err) { handleApiError(err); }
  };

  const deleteDailyTask = async (id) => {
    setDailyTasks(prev => prev.filter(t => t.id !== id && t._id !== id));
    try {
      await api.delete(`/planner/tasks/${id}`);
    } catch (err) { handleApiError(err); }
  };

  // ---- Revision Actions ----
  const addRevision = async (revData) => {
    try {
      const res = await api.post('/revision', revData);
      if (res?.data) setRevisions(prev => [res.data, ...prev]);
    } catch (err) { handleApiError(err); }
  };

  const toggleRevision = async (id) => {
    setRevisions(prev => prev.map(r => (r.id === id || r._id === id) ? { ...r, completed: !r.completed } : r));
    try {
      await api.patch(`/revision/${id}/toggle`);
    } catch (err) { handleApiError(err); }
  };

  const deleteRevision = async (id) => {
    setRevisions(prev => prev.filter(r => r.id !== id && r._id !== id));
    try {
      await api.delete(`/revision/${id}`);
    } catch (err) { handleApiError(err); }
  };

  return (
    <DataContext.Provider value={{
      dsaProblems, roadmaps, projects, notes, revisions,
      studyGoals, dailyTasks, metrics, loading,
      refreshData,
      updateDsaStatus, addDsaProblem, deleteDsaProblem,
      toggleEnrollRoadmap, toggleRoadmapTopic,
      addProject, updateProject, deleteProject,
      addNote, updateNote, deleteNote,
      addStudyGoal, updateStudyGoal, deleteStudyGoal,
      addDailyTask, toggleDailyTask, deleteDailyTask,
      addRevision, toggleRevision, deleteRevision
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
