import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();

  const [dsaProblems, setDsaProblems] = useState([]);
  const [topics, setTopics] = useState([
    'Arrays & Hashing',
    'Two Pointers',
    'Sliding Window',
    'Stack & Queue',
    'Linked List',
    'Binary Search',
    'Trees & BST',
    'Heap & Priority Queue',
    'Backtracking & Recursion',
    'Graphs & BFS/DFS',
    'Dynamic Programming',
    'Greedy Algorithms',
    'Bit Manipulation',
    'Trie',
    'Math & Geometry',
    'Strings & Pattern Matching',
    'Intervals',
    'Matrix & 2D Grid'
  ]);
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
      const [dsaRes, topicsRes, roadmapsRes, projectsRes, notesRes, revRes, plannerRes, analyticsRes] = await Promise.allSettled([
        api.get('/dsa'),
        api.get('/dsa/topics'),
        api.get('/roadmap'),
        api.get('/projects'),
        api.get('/notes'),
        api.get('/revision'),
        api.get('/planner'),
        api.get('/analytics/dashboard')
      ]);

      if (dsaRes.status === 'fulfilled' && dsaRes.value?.data) setDsaProblems(dsaRes.value.data);
      if (topicsRes.status === 'fulfilled' && topicsRes.value?.data) {
        setTopics(prev => Array.from(new Set([...prev, ...(topicsRes.value.data || [])])));
      }
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
  const matchDsaId = (problem, targetId) => {
    if (!problem || !targetId) return false;
    return (
      problem.id === targetId ||
      problem._id === targetId ||
      problem.id?.toString() === targetId?.toString() ||
      problem._id?.toString() === targetId?.toString()
    );
  };

  const addTopic = async (topicName) => {
    if (!topicName || !topicName.trim()) return;
    const cleanTopic = topicName.trim();
    setTopics(prev => Array.from(new Set([...prev, cleanTopic])));
    try {
      const res = await api.post('/dsa/topics', { topic: cleanTopic });
      if (res?.data) {
        setTopics(Array.from(new Set(res.data)));
      }
      return cleanTopic;
    } catch (err) {
      handleApiError(err);
      return cleanTopic;
    }
  };

  const updateDsaStatus = async (id, status, notes = '') => {
    setDsaProblems(prev => prev.map(p => matchDsaId(p, id) ? { ...p, status, notes: notes || p.notes } : p));
    try {
      await api.put(`/dsa/${id}`, { status, notes });
      const anRes = await api.get('/analytics/dashboard').catch(() => null);
      if (anRes?.data) setMetrics(anRes.data);
    } catch (err) { handleApiError(err); }
  };

  const updateDsaProblem = async (id, updates) => {
    setDsaProblems(prev => prev.map(p => matchDsaId(p, id) ? { ...p, ...updates } : p));
    if (updates.topic) {
      setTopics(prev => Array.from(new Set([...prev, updates.topic.trim()])));
    }
    if (Array.isArray(updates.topics)) {
      setTopics(prev => Array.from(new Set([...prev, ...updates.topics.map(t => t.trim()).filter(Boolean)])));
    }
    try {
      const res = await api.put(`/dsa/${id}`, updates);
      if (res?.data) {
        setDsaProblems(prev => prev.map(p => matchDsaId(p, id) ? { ...p, ...res.data } : p));
      }
      const anRes = await api.get('/analytics/dashboard').catch(() => null);
      if (anRes?.data) setMetrics(anRes.data);
      return res?.data;
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  };

  const incrementRevision = async (id) => {
    const target = dsaProblems.find(p => matchDsaId(p, id));
    const newCount = (target?.revisionsCount || 0) + 1;
    return updateDsaProblem(id, { revisionsCount: newCount });
  };

  const addDsaProblem = async (newProb) => {
    try {
      if (newProb.topic) {
        setTopics(prev => Array.from(new Set([...prev, newProb.topic.trim()])));
      }
      if (Array.isArray(newProb.topics)) {
        setTopics(prev => Array.from(new Set([...prev, ...newProb.topics.map(t => t.trim()).filter(Boolean)])));
      }
      const res = await api.post('/dsa', newProb);
      if (res?.data) {
        setDsaProblems(prev => [res.data, ...prev]);
        const anRes = await api.get('/analytics/dashboard').catch(() => null);
        if (anRes?.data) setMetrics(anRes.data);
        return res.data;
      }
      return res;
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  };

  const deleteDsaProblem = async (id) => {
    setDsaProblems(prev => prev.filter(p => !matchDsaId(p, id)));
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
    let isAllowed = true;
    let warningMsg = '';

    setRoadmaps(prev => prev.map(r => {
      if (r.id === roadmapId || r._id?.toString() === roadmapId) {
        const topicsList = r.topics || [];
        const tIndex = topicsList.findIndex(t => t.id === topicId || t._id?.toString() === topicId || t.title === topicId);
        if (tIndex === -1) return r;

        const currentTopic = topicsList[tIndex];
        const willBeCompleted = !currentTopic.completed;

        if (willBeCompleted) {
          // Check all previous milestones
          for (let j = 0; j < tIndex; j++) {
            if (!topicsList[j].completed) {
              isAllowed = false;
              warningMsg = `Prerequisite milestone locked! Complete "${topicsList[j].title}" first.`;
              return r;
            }
          }
          const updatedTopics = topicsList.map((t, idx) => idx === tIndex ? { ...t, completed: true } : t);
          return { ...r, isEnrolled: true, topics: updatedTopics };
        } else {
          // Cascading uncheck: uncheck this milestone AND all subsequent milestones
          const updatedTopics = topicsList.map((t, idx) => idx >= tIndex ? { ...t, completed: false } : t);
          return { ...r, topics: updatedTopics };
        }
      }
      return r;
    }));

    if (!isAllowed) {
      return { success: false, message: warningMsg };
    }

    try {
      const res = await api.patch(`/roadmap/${roadmapId}/topic/${topicId}`);
      if (res?.data?.data) {
        setRoadmaps(res.data.data);
      }
      const anRes = await api.get('/analytics/dashboard').catch(() => null);
      if (anRes?.data) setMetrics(anRes.data);
      return { success: true };
    } catch (err) {
      handleApiError(err);
      refreshData();
      return { success: false, message: err.response?.data?.message || err.message };
    }
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
      if (res?.data) {
        setNotes(prev => [res.data, ...prev]);
        return res.data;
      }
      return res;
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  };

  const updateNote = async (id, updates) => {
    setNotes(prev => prev.map(n => matchDsaId(n, id) ? { ...n, ...updates } : n));
    try {
      const res = await api.put(`/notes/${id}`, updates);
      if (res?.data) {
        setNotes(prev => prev.map(n => matchDsaId(n, id) ? { ...n, ...res.data } : n));
      }
      return res?.data;
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  };

  const deleteNote = async (id) => {
    setNotes(prev => prev.filter(n => !matchDsaId(n, id)));
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
      dsaProblems, topics, roadmaps, projects, notes, revisions,
      studyGoals, dailyTasks, metrics, loading,
      refreshData,
      updateDsaStatus, updateDsaProblem, addDsaProblem, deleteDsaProblem, incrementRevision,
      addTopic,
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
