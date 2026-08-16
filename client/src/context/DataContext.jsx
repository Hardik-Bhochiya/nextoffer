import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dsaProblems, setDsaProblems] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [projects, setProjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [revisions, setRevisions] = useState([]);
  const [studyGoals, setStudyGoals] = useState([]);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all initial data
  const refreshData = async () => {
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
        setStudyGoals(plannerRes.value.data.goals || []);
        setDailyTasks(plannerRes.value.data.tasks || []);
      }
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
    setDsaProblems(prev => prev.map(p => (p.id === id || p.trackerId === id) ? { ...p, status, problemStatus: status, notes: notes || p.notes } : p));
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

  const deleteDsaProblem = async (id) => {
    setDsaProblems(prev => prev.filter(p => p.id !== id && p.trackerId !== id));
    try {
      await api.delete(`/dsa/${id}`);
      const anRes = await api.get('/analytics/dashboard').catch(() => null);
      if (anRes?.data) setMetrics(anRes.data);
    } catch (err) {
      console.error('Delete DSA failed:', err);
    }
  };

  // Roadmap Actions
  const toggleRoadmapTopic = async (roadmapId, topicId) => {
    setRoadmaps(prev => prev.map(r => {
      if (r.id === roadmapId || r.roadmapId === roadmapId) {
        return {
          ...r,
          topics: r.topics.map(t => (t.id === topicId || t.topicId === topicId) ? { ...t, completed: !t.completed } : t)
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
    setProjects(prev => prev.map(p => (p.id === id || p.projectId === id) ? { ...p, ...updates } : p));
    try {
      await api.put(`/projects/${id}`, updates);
    } catch (err) {
      console.error('Update project failed:', err);
    }
  };

  const deleteProject = async (id) => {
    setProjects(prev => prev.filter(p => p.id !== id && p.projectId !== id));
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
    setNotes(prev => prev.map(n => (n.id === id || n.noteId === id) ? { ...n, ...updates } : n));
    try {
      await api.put(`/notes/${id}`, updates);
    } catch (err) {
      console.error('Update note failed:', err);
    }
  };

  const deleteNote = async (id) => {
    setNotes(prev => prev.filter(n => n.id !== id && n.noteId !== id));
    try {
      await api.delete(`/notes/${id}`);
    } catch (err) {
      console.error('Delete note failed:', err);
    }
  };

  // Daily Planner & Study Goals Actions (Module R7)
  const addStudyGoal = async (goalData) => {
    try {
      const res = await api.post('/planner/goals', goalData);
      if (res?.data) {
        setStudyGoals(prev => [res.data, ...prev]);
      }
    } catch (err) {
      const localGoal = { goalId: `goal-${Date.now()}`, ...goalData };
      setStudyGoals(prev => [localGoal, ...prev]);
    }
  };

  const updateStudyGoal = async (id, updates) => {
    setStudyGoals(prev => prev.map(g => (g.goalId === id || g.plannerId === id) ? { ...g, ...updates } : g));
    try {
      await api.put(`/planner/goals/${id}`, updates);
    } catch (err) {
      console.error('Update goal failed:', err);
    }
  };

  const deleteStudyGoal = async (id) => {
    setStudyGoals(prev => prev.filter(g => g.goalId !== id && g.plannerId !== id));
    try {
      await api.delete(`/planner/goals/${id}`);
    } catch (err) {
      console.error('Delete goal failed:', err);
    }
  };

  const addDailyTask = async (taskData) => {
    try {
      const res = await api.post('/planner/tasks', taskData);
      if (res?.data) {
        setDailyTasks(prev => [...prev, res.data]);
      }
    } catch (err) {
      const localTask = { taskId: `task-${Date.now()}`, ...taskData };
      setDailyTasks(prev => [...prev, localTask]);
    }
  };

  const toggleDailyTask = async (id) => {
    setDailyTasks(prev => prev.map(t => t.taskId === id ? { ...t, taskStatus: t.taskStatus === 'Completed' ? 'Pending' : 'Completed' } : t));
    try {
      await api.patch(`/planner/tasks/${id}/toggle`);
    } catch (err) {
      console.error('Toggle task failed:', err);
    }
  };

  const deleteDailyTask = async (id) => {
    setDailyTasks(prev => prev.filter(t => t.taskId !== id));
    try {
      await api.delete(`/planner/tasks/${id}`);
    } catch (err) {
      console.error('Delete task failed:', err);
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
    setRevisions(prev => prev.map(r => (r.id === id || r.revisionId === id) ? { ...r, completed: !r.completed } : r));
    try {
      await api.patch(`/revision/${id}/toggle`);
    } catch (err) {
      console.error('Toggle revision failed:', err);
    }
  };

  const deleteRevision = async (id) => {
    setRevisions(prev => prev.filter(r => r.id !== id && r.revisionId !== id));
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
      studyGoals,
      dailyTasks,
      metrics,
      loading,
      refreshData,
      updateDsaStatus,
      addDsaProblem,
      deleteDsaProblem,
      toggleRoadmapTopic,
      addProject,
      updateProject,
      deleteProject,
      addNote,
      updateNote,
      deleteNote,
      addStudyGoal,
      updateStudyGoal,
      deleteStudyGoal,
      addDailyTask,
      toggleDailyTask,
      deleteDailyTask,
      addRevision,
      toggleRevision,
      deleteRevision
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
