import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

/**
 * Global Data Context
 * Central state container for all domain data across the application:
 * - DSA Tracker (problems, topics, revisions, status)
 * - Career Roadmaps (tracks, milestone prerequisites, progress)
 * - Projects (portfolio items, tech stack, deploy links)
 * - Revision Planner & Daily Tasks (goals, micro-tasks, streak tracking)
 * - Notes & Spaced Repetition (quick revision, markdown notes)
 * - Analytics & Readiness Metrics (readiness score, topic proficiency)
 */
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();

  // ==========================================
  // Global Domain State
  // ==========================================
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

  /**
   * Global API Error Interceptor
   * Gracefully logs out the user if the session token expires (401 Unauthorized)
   */
  const handleApiError = (err) => {
    if (err?.status === 401 || err?.message?.includes('401')) {
      logout();
    }
  };

  /**
   * Concurrent Data Rehydration
   * Fetches all 8 module endpoints concurrently using Promise.allSettled.
   * If any single endpoint fails, the remaining endpoints still hydrate successfully,
   * preventing a full-app blank-out.
   */
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

  // Re-fetch everything on auth state transition (login/logout)
  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    } else {
      // Clear sensitive user state upon logout
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

  // ==========================================
  // Helper: Resilient ID Matching
  // ==========================================
  /**
   * Matches entity by either custom `id` string or MongoDB `_id` ObjectId
   */
  const matchDsaId = (problem, targetId) => {
    if (!problem || !targetId) return false;
    return (
      problem.id === targetId ||
      problem._id === targetId ||
      problem.id?.toString() === targetId?.toString() ||
      problem._id?.toString() === targetId?.toString()
    );
  };

  // ==========================================
  // DSA Tracker Actions
  // ==========================================

  /**
   * Adds a new algorithmic category/tag to the user's available topic set
   */
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

  /**
   * Updates problem completion status ('Solved' | 'Attempted' | 'To Do') with optimistic UI
   */
  const updateDsaStatus = async (id, status, notes = '') => {
    // 1. Optimistic local update
    setDsaProblems(prev => prev.map(p => matchDsaId(p, id) ? { ...p, status, notes: notes || p.notes } : p));
    try {
      // 2. Persist to server
      await api.put(`/dsa/${id}`, { status, notes });
      // 3. Re-calculate analytics dashboard metrics in background
      const anRes = await api.get('/analytics/dashboard').catch(() => null);
      if (anRes?.data) setMetrics(anRes.data);
    } catch (err) { handleApiError(err); }
  };

  /**
   * Updates problem fields (title, difficulty, topics, notes, code snippet)
   */
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

  /**
   * Increments the spaced-repetition count for a mastered problem
   */
  const incrementRevision = async (id) => {
    const target = dsaProblems.find(p => matchDsaId(p, id));
    const newCount = (target?.revisionsCount || 0) + 1;
    return updateDsaProblem(id, { revisionsCount: newCount });
  };

  /**
   * Adds a new DSA problem to tracker and registers any new topics
   */
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

  /**
   * Deletes a DSA problem from tracker and refreshes metrics
   */
  const deleteDsaProblem = async (id) => {
    setDsaProblems(prev => prev.filter(p => !matchDsaId(p, id)));
    try {
      await api.delete(`/dsa/${id}`);
      const anRes = await api.get('/analytics/dashboard').catch(() => null);
      if (anRes?.data) setMetrics(anRes.data);
    } catch (err) { handleApiError(err); }
  };

  // ==========================================
  // Roadmap Actions
  // ==========================================

  /**
   * Toggles active enrollment in a structured career roadmap
   */
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

  /**
   * Toggles milestone completion with strict sequential prerequisite locks
   * and cascading uncheck logic:
   * - To check Milestone N: All previous milestones (0 to N-1) MUST be checked.
   * - To uncheck Milestone N: All subsequent milestones (N+1 to end) are automatically unchecked.
   */
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
      refreshData(); // Rollback local state to match server on error
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  // ==========================================
  // Project Showcase Actions
  // ==========================================
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

  // ==========================================
  // Notes & Flashcards Actions
  // ==========================================
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

  // ==========================================
  // Study Goals & Micro-Milestones
  // ==========================================

  /**
   * Creates a high-level study goal with optimistic temporary ID
   */
  const addStudyGoal = async (goalData) => {
    const tempId = 'goal_' + Date.now();
    const optimisticGoal = {
      _id: tempId,
      id: tempId,
      status: 'In Progress',
      progress: 0,
      milestones: [],
      createdAt: new Date().toISOString(),
      ...goalData
    };
    setStudyGoals(prev => [optimisticGoal, ...prev]);

    try {
      const res = await api.post('/planner/goals', goalData);
      const serverData = res?.data || res;
      if (serverData && (serverData.id || serverData._id)) {
        setStudyGoals(prev => prev.map(g => (g.id === tempId || g._id === tempId) ? { ...optimisticGoal, ...serverData } : g));
      }
    } catch (err) {
      // Rollback on server failure
      setStudyGoals(prev => prev.filter(g => g.id !== tempId && g._id !== tempId));
      handleApiError(err);
    }
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

  // ==========================================
  // Daily Action Tasks & Streak Tracking
  // ==========================================

  /**
   * Adds an actionable daily task with optimistic UI and linked goal metadata
   */
  const addDailyTask = async (taskData) => {
    const tempId = 'task_' + Date.now();
    const optimisticTask = {
      _id: tempId,
      id: tempId,
      taskStatus: false,
      deadline: taskData.deadline || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      ...taskData
    };
    setDailyTasks(prev => [optimisticTask, ...prev]);

    try {
      const res = await api.post('/planner/tasks', taskData);
      const serverData = res?.data || res;
      if (serverData && (serverData.id || serverData._id)) {
        setDailyTasks(prev => prev.map(t => (t.id === tempId || t._id === tempId) ? { ...optimisticTask, ...serverData } : t));
      }
      const anRes = await api.get('/analytics/dashboard').catch(() => null);
      if (anRes?.data) setMetrics(anRes.data);
    } catch (err) {
      // Rollback on server failure
      setDailyTasks(prev => prev.filter(t => t.id !== tempId && t._id !== tempId));
      handleApiError(err);
    }
  };

  const updateDailyTask = async (id, updates) => {
    setDailyTasks(prev => prev.map(t => (t.id === id || t._id === id) ? { ...t, ...updates } : t));
    try {
      const res = await api.put(`/planner/tasks/${id}`, updates);
      if (res?.data) {
        setDailyTasks(prev => prev.map(t => (t.id === id || t._id === id) ? { ...t, ...res.data } : t));
      }
      const anRes = await api.get('/analytics/dashboard').catch(() => null);
      if (anRes?.data) setMetrics(anRes.data);
    } catch (err) { handleApiError(err); }
  };

  /**
   * Toggles task completion and triggers streak recalculation on server
   */
  const toggleDailyTask = async (id) => {
    setDailyTasks(prev => prev.map(t => (t.id === id || t._id === id) ? { ...t, taskStatus: !t.taskStatus } : t));
    try {
      const res = await api.patch(`/planner/tasks/${id}/toggle`);
      if (res?.data) {
        setDailyTasks(prev => prev.map(t => (t.id === id || t._id === id) ? { ...t, ...res.data } : t));
      }
      const anRes = await api.get('/analytics/dashboard').catch(() => null);
      if (anRes?.data) setMetrics(anRes.data);
    } catch (err) { handleApiError(err); }
  };

  const deleteDailyTask = async (id) => {
    setDailyTasks(prev => prev.filter(t => t.id !== id && t._id !== id));
    try {
      await api.delete(`/planner/tasks/${id}`);
    } catch (err) { handleApiError(err); }
  };

  // ==========================================
  // Spaced Revisions Actions
  // ==========================================
  const addRevision = async (revData) => {
    try {
      const res = await api.post('/revision', revData);
      if (res?.data) {
        setRevisions(prev => [res.data, ...prev]);
        const anRes = await api.get('/analytics/dashboard').catch(() => null);
        if (anRes?.data) setMetrics(anRes.data);
      }
    } catch (err) { handleApiError(err); }
  };

  const updateRevision = async (id, updates) => {
    setRevisions(prev => prev.map(r => (r.id === id || r._id === id) ? { ...r, ...updates } : r));
    try {
      const res = await api.put(`/revision/${id}`, updates);
      if (res?.data) {
        setRevisions(prev => prev.map(r => (r.id === id || r._id === id) ? { ...r, ...res.data } : r));
      }
      const anRes = await api.get('/analytics/dashboard').catch(() => null);
      if (anRes?.data) setMetrics(anRes.data);
    } catch (err) { handleApiError(err); }
  };

  const toggleRevision = async (id) => {
    setRevisions(prev => prev.map(r => (r.id === id || r._id === id) ? { ...r, completed: !r.completed } : r));
    try {
      const res = await api.patch(`/revision/${id}/toggle`);
      if (res?.data) {
        setRevisions(prev => prev.map(r => (r.id === id || r._id === id) ? { ...r, ...res.data } : r));
      }
      const anRes = await api.get('/analytics/dashboard').catch(() => null);
      if (anRes?.data) setMetrics(anRes.data);
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
      // Data State
      dsaProblems, topics, roadmaps, projects, notes, revisions,
      studyGoals, dailyTasks, metrics, loading,
      // Lifecycle
      refreshData,
      // DSA
      updateDsaStatus, updateDsaProblem, addDsaProblem, deleteDsaProblem, incrementRevision,
      addTopic,
      // Roadmaps
      toggleEnrollRoadmap, toggleRoadmapTopic,
      // Projects
      addProject, updateProject, deleteProject,
      // Notes
      addNote, updateNote, deleteNote,
      // Planner
      addStudyGoal, updateStudyGoal, deleteStudyGoal,
      addDailyTask, updateDailyTask, toggleDailyTask, deleteDailyTask,
      // Revisions
      addRevision, updateRevision, toggleRevision, deleteRevision
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

