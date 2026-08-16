import { defaultDsaProblems, defaultRoadmaps, defaultProjects, defaultNotes, defaultRevisions } from '../data/seedData.js';

// In-Memory store perfectly matching the NextOffer ER & Class Diagram
class InMemoryStore {
  constructor() {
    this.users = [
      {
        id: 'usr-1',
        userId: 'usr-1',
        fullName: 'Hardik Bhochiya',
        name: 'Hardik Bhochiya',
        email: 'hardik@nextoffer.dev',
        password: '$2a$10$w8TKnk2x.Q0j4h9X7CgXUeM3bI8oD0m6xL7z9p1a.B3c4d5e6f7g8',
        role: 'Student',
        college: 'Gujarat Technological University',
        branch: 'Computer Engineering',
        graduationYear: '2026',
        targetRole: 'Full Stack SDE',
        dreamCompany: 'Google / Microsoft / Tier-1 Tech',
        streak: 12,
        readinessScore: 84,
        socialLinks: {
          github: 'https://github.com/Hardik-Bhochiya',
          linkedin: 'https://linkedin.com/in/hardik-bhochiya',
          leetcode: 'https://leetcode.com'
        },
        createdAt: new Date().toISOString()
      },
      {
        id: 'admin-1',
        userId: 'admin-1',
        fullName: 'NextOffer Administrator',
        name: 'Admin',
        email: 'admin@nextoffer.dev',
        password: '$2a$10$w8TKnk2x.Q0j4h9X7CgXUeM3bI8oD0m6xL7z9p1a.B3c4d5e6f7g8',
        role: 'Admin',
        college: 'NextOffer HQ',
        branch: 'System Architecture',
        graduationYear: '2024',
        targetRole: 'Platform Admin',
        dreamCompany: 'NextOffer Core Team',
        streak: 30,
        readinessScore: 100,
        createdAt: new Date().toISOString()
      }
    ];

    // DSA Tracker (ER Diagram: trackerId, fk:userId, problemTitle, platform, topic, difficulty, status)
    this.dsaProblems = defaultDsaProblems.map(p => ({
      ...p,
      trackerId: p.id,
      problemTitle: p.title,
      platform: p.url.includes('geeksforgeeks') ? 'GeeksforGeeks' : 'LeetCode',
      problemStatus: p.status,
      problemLink: p.url,
      userId: 'usr-1'
    }));

    // Roadmaps (ER Diagram: roadmapId, fk:userId, category, topic, status, progress)
    this.roadmaps = JSON.parse(JSON.stringify(defaultRoadmaps)).map(r => ({
      ...r,
      roadmapId: r.id,
      userId: 'usr-1'
    }));

    // Projects (ER Diagram: projectId, fk:userId, projectTitle, technologies, githubLink, liveLink, status)
    this.projects = JSON.parse(JSON.stringify(defaultProjects)).map(p => ({
      ...p,
      projectId: p.id,
      projectTitle: p.title,
      technologies: p.techStack.join(', '),
      githubLink: p.githubUrl,
      liveLink: p.liveUrl,
      projectStatus: p.status,
      userId: 'usr-1'
    }));

    // Notes (ER Diagram: noteId, fk:userId, noteTitle, noteContent, tags)
    this.notes = JSON.parse(JSON.stringify(defaultNotes)).map(n => ({
      ...n,
      noteId: n.id,
      noteTitle: n.title,
      noteContent: n.content,
      userId: 'usr-1'
    }));

    // Daily Planner & Goals (ER Diagram: plannerId, fk:userId, goalTitle, priority, deadline, taskStatus)
    this.studyGoals = [
      {
        goalId: 'goal-1',
        plannerId: 'goal-1',
        userId: 'usr-1',
        goalTitle: 'Master Dynamic Programming (Knapsack & LCS)',
        priority: 'High',
        deadline: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        taskStatus: 'In Progress',
        progress: 60
      },
      {
        goalId: 'goal-2',
        plannerId: 'goal-2',
        userId: 'usr-1',
        goalTitle: 'Complete System Design Notes for Caching & Sharding',
        priority: 'Medium',
        deadline: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
        taskStatus: 'In Progress',
        progress: 40
      },
      {
        goalId: 'goal-3',
        plannerId: 'goal-3',
        userId: 'usr-1',
        goalTitle: 'Deploy Capstone Project to Vercel & Render',
        priority: 'High',
        deadline: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
        taskStatus: 'Completed',
        progress: 100
      }
    ];

    this.dailyTasks = [
      {
        taskId: 'task-1',
        userId: 'usr-1',
        taskDetails: 'Solve 2 LeetCode Mediums on Graph BFS/DFS',
        taskStatus: 'Completed'
      },
      {
        taskId: 'task-2',
        userId: 'usr-1',
        taskDetails: 'Revise DBMS ACID Properties & Normalization',
        taskStatus: 'Completed'
      },
      {
        taskId: 'task-3',
        userId: 'usr-1',
        taskDetails: 'Implement Redis Caching in Backend API',
        taskStatus: 'Pending'
      }
    ];

    // Revisions (ER Diagram: revisionId, topic, revisionDate, revisionTime)
    this.revisions = JSON.parse(JSON.stringify(defaultRevisions)).map(r => ({
      ...r,
      revisionId: r.id,
      revisionDate: r.scheduledDate,
      revisionTime: '10:00 AM',
      userId: 'usr-1'
    }));

    this.studyActivities = [
      { date: 'Mon', hours: 4.5, dsaSolved: 3 },
      { date: 'Tue', hours: 6.0, dsaSolved: 5 },
      { date: 'Wed', hours: 3.5, dsaSolved: 2 },
      { date: 'Thu', hours: 5.5, dsaSolved: 4 },
      { date: 'Fri', hours: 7.0, dsaSolved: 6 },
      { date: 'Sat', hours: 8.0, dsaSolved: 7 },
      { date: 'Sun', hours: 4.0, dsaSolved: 3 }
    ];
  }

  // Global Search Controller (Matching Class Diagram: SearchFilter.globalSearch())
  globalSearch(keyword) {
    if (!keyword) return { dsa: [], roadmaps: [], projects: [], notes: [], goals: [] };
    const q = keyword.toLowerCase();

    const dsaMatches = this.dsaProblems.filter(p =>
      (p.title || p.problemTitle).toLowerCase().includes(q) ||
      p.topic.toLowerCase().includes(q) ||
      p.platform?.toLowerCase().includes(q)
    );

    const roadmapMatches = [];
    this.roadmaps.forEach(r => {
      r.topics?.forEach(t => {
        if (t.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)) {
          roadmapMatches.push({ ...t, category: r.category, roadmapId: r.id });
        }
      });
    });

    const projectMatches = this.projects.filter(p =>
      (p.title || p.projectTitle).toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      (Array.isArray(p.techStack) ? p.techStack.join(' ') : p.technologies || '').toLowerCase().includes(q)
    );

    const noteMatches = this.notes.filter(n =>
      (n.title || n.noteTitle).toLowerCase().includes(q) ||
      (n.content || n.noteContent).toLowerCase().includes(q) ||
      n.tags?.some(tag => tag.toLowerCase().includes(q))
    );

    const goalMatches = this.studyGoals.filter(g =>
      g.goalTitle.toLowerCase().includes(q) ||
      g.priority.toLowerCase().includes(q)
    );

    return {
      dsa: dsaMatches,
      roadmaps: roadmapMatches,
      projects: projectMatches,
      notes: noteMatches,
      goals: goalMatches
    };
  }

  // DSA Helpers
  getProblems(filters = {}) {
    let result = [...this.dsaProblems];
    if (filters.topic && filters.topic !== 'All') {
      result = result.filter(p => p.topic === filters.topic);
    }
    if (filters.difficulty && filters.difficulty !== 'All') {
      result = result.filter(p => p.difficulty === filters.difficulty);
    }
    if (filters.platform && filters.platform !== 'All') {
      result = result.filter(p => (p.platform || 'LeetCode') === filters.platform);
    }
    if (filters.status && filters.status !== 'All') {
      result = result.filter(p => (p.status || p.problemStatus) === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(p =>
        (p.title || p.problemTitle).toLowerCase().includes(q) ||
        p.topic.toLowerCase().includes(q)
      );
    }
    return result;
  }

  updateProblem(id, updates) {
    const idx = this.dsaProblems.findIndex(p => p.id === id || p.trackerId === id);
    if (idx !== -1) {
      this.dsaProblems[idx] = {
        ...this.dsaProblems[idx],
        ...updates,
        problemTitle: updates.title || this.dsaProblems[idx].problemTitle || this.dsaProblems[idx].title,
        problemStatus: updates.status || this.dsaProblems[idx].problemStatus || this.dsaProblems[idx].status,
        lastRevised: new Date().toISOString()
      };
      return this.dsaProblems[idx];
    }
    return null;
  }

  addProblem(problem) {
    const id = `dsa-${Date.now()}`;
    const newProblem = {
      id,
      trackerId: id,
      title: problem.title || problem.problemTitle,
      problemTitle: problem.title || problem.problemTitle,
      platform: problem.platform || 'LeetCode',
      topic: problem.topic,
      difficulty: problem.difficulty || 'Medium',
      url: problem.url || problem.problemLink || 'https://leetcode.com',
      problemLink: problem.url || problem.problemLink || 'https://leetcode.com',
      status: problem.status || problem.problemStatus || 'Solved',
      problemStatus: problem.status || problem.problemStatus || 'Solved',
      notes: problem.notes || '',
      timeComplexity: problem.timeComplexity || 'O(n)',
      spaceComplexity: problem.spaceComplexity || 'O(1)',
      revisionsCount: 0,
      userId: 'usr-1',
      lastRevised: new Date().toISOString()
    };
    this.dsaProblems.unshift(newProblem);
    return newProblem;
  }

  deleteProblem(id) {
    const idx = this.dsaProblems.findIndex(p => p.id === id || p.trackerId === id);
    if (idx !== -1) {
      return this.dsaProblems.splice(idx, 1)[0];
    }
    return null;
  }

  // Roadmap Helpers
  getRoadmaps() {
    return this.roadmaps;
  }

  toggleRoadmapTopic(roadmapId, topicId) {
    const roadmap = this.roadmaps.find(r => r.id === roadmapId || r.roadmapId === roadmapId);
    if (roadmap) {
      const topic = roadmap.topics.find(t => t.id === topicId || t.topicId === topicId);
      if (topic) {
        topic.completed = !topic.completed;
        topic.topicStatus = topic.completed ? 'Completed' : 'Pending';
        return { roadmap, topic };
      }
    }
    return null;
  }

  // Projects Helpers
  getProjects() {
    return this.projects;
  }

  addProject(project) {
    const id = `proj-${Date.now()}`;
    const newProj = {
      id,
      projectId: id,
      title: project.title || project.projectTitle,
      projectTitle: project.title || project.projectTitle,
      description: project.description || '',
      techStack: Array.isArray(project.techStack) ? project.techStack : (project.technologies ? project.technologies.split(',').map(s=>s.trim()) : []),
      technologies: Array.isArray(project.techStack) ? project.techStack.join(', ') : project.technologies || '',
      githubUrl: project.githubUrl || project.githubLink || '',
      githubLink: project.githubUrl || project.githubLink || '',
      liveUrl: project.liveUrl || project.liveLink || '',
      liveLink: project.liveUrl || project.liveLink || '',
      status: project.status || project.projectStatus || 'In Progress',
      projectStatus: project.status || project.projectStatus || 'In Progress',
      milestones: project.milestones || [],
      userId: 'usr-1'
    };
    this.projects.unshift(newProj);
    return newProj;
  }

  updateProject(id, updates) {
    const idx = this.projects.findIndex(p => p.id === id || p.projectId === id);
    if (idx !== -1) {
      this.projects[idx] = { ...this.projects[idx], ...updates };
      return this.projects[idx];
    }
    return null;
  }

  deleteProject(id) {
    const idx = this.projects.findIndex(p => p.id === id || p.projectId === id);
    if (idx !== -1) {
      return this.projects.splice(idx, 1)[0];
    }
    return null;
  }

  // Notes Helpers
  getNotes() {
    return this.notes;
  }

  addNote(note) {
    const id = `note-${Date.now()}`;
    const newNote = {
      id,
      noteId: id,
      title: note.title || note.noteTitle,
      noteTitle: note.title || note.noteTitle,
      content: note.content || note.noteContent,
      noteContent: note.content || note.noteContent,
      tags: Array.isArray(note.tags) ? note.tags : (note.tags ? note.tags.split(',').map(t=>t.trim()) : []),
      pinned: false,
      isFavorite: false,
      userId: 'usr-1',
      updatedAt: new Date().toISOString()
    };
    this.notes.unshift(newNote);
    return newNote;
  }

  updateNote(id, updates) {
    const idx = this.notes.findIndex(n => n.id === id || n.noteId === id);
    if (idx !== -1) {
      this.notes[idx] = {
        ...this.notes[idx],
        ...updates,
        noteTitle: updates.title || this.notes[idx].noteTitle,
        noteContent: updates.content || this.notes[idx].noteContent,
        updatedAt: new Date().toISOString()
      };
      return this.notes[idx];
    }
    return null;
  }

  deleteNote(id) {
    const idx = this.notes.findIndex(n => n.id === id || n.noteId === id);
    if (idx !== -1) {
      return this.notes.splice(idx, 1)[0];
    }
    return null;
  }

  // Daily Planner & Study Goals Helpers (Module R7)
  getPlannerData() {
    return {
      goals: this.studyGoals,
      tasks: this.dailyTasks,
      revisions: this.revisions
    };
  }

  addStudyGoal(goal) {
    const id = `goal-${Date.now()}`;
    const newGoal = {
      goalId: id,
      plannerId: id,
      userId: 'usr-1',
      goalTitle: goal.goalTitle || goal.title,
      priority: goal.priority || 'Medium',
      deadline: goal.deadline || new Date().toISOString().split('T')[0],
      taskStatus: goal.taskStatus || 'In Progress',
      progress: goal.progress || 0
    };
    this.studyGoals.unshift(newGoal);
    return newGoal;
  }

  updateStudyGoal(id, updates) {
    const idx = this.studyGoals.findIndex(g => g.goalId === id || g.plannerId === id);
    if (idx !== -1) {
      this.studyGoals[idx] = { ...this.studyGoals[idx], ...updates };
      return this.studyGoals[idx];
    }
    return null;
  }

  deleteStudyGoal(id) {
    const idx = this.studyGoals.findIndex(g => g.goalId === id || g.plannerId === id);
    if (idx !== -1) {
      return this.studyGoals.splice(idx, 1)[0];
    }
    return null;
  }

  addDailyTask(task) {
    const id = `task-${Date.now()}`;
    const newTask = {
      taskId: id,
      userId: 'usr-1',
      taskDetails: task.taskDetails || task.title,
      taskStatus: task.taskStatus || 'Pending'
    };
    this.dailyTasks.push(newTask);
    return newTask;
  }

  toggleDailyTask(id) {
    const task = this.dailyTasks.find(t => t.taskId === id);
    if (task) {
      task.taskStatus = task.taskStatus === 'Completed' ? 'Pending' : 'Completed';
      return task;
    }
    return null;
  }

  deleteDailyTask(id) {
    const idx = this.dailyTasks.findIndex(t => t.taskId === id);
    if (idx !== -1) {
      return this.dailyTasks.splice(idx, 1)[0];
    }
    return null;
  }

  // Revisions Helpers
  getRevisions() {
    return this.revisions;
  }

  addRevision(revision) {
    const id = `rev-${Date.now()}`;
    const newRev = {
      id,
      revisionId: id,
      topic: revision.topic,
      category: revision.category || 'DSA',
      priority: revision.priority || 'Medium',
      scheduledDate: revision.scheduledDate || revision.revisionDate || new Date().toISOString().split('T')[0],
      revisionDate: revision.scheduledDate || revision.revisionDate || new Date().toISOString().split('T')[0],
      revisionTime: revision.revisionTime || '10:00 AM',
      completed: false,
      notes: revision.notes || '',
      userId: 'usr-1'
    };
    this.revisions.unshift(newRev);
    return newRev;
  }

  toggleRevision(id) {
    const rev = this.revisions.find(r => r.id === id || r.revisionId === id);
    if (rev) {
      rev.completed = !rev.completed;
      return rev;
    }
    return null;
  }

  deleteRevision(id) {
    const idx = this.revisions.findIndex(r => r.id === id || r.revisionId === id);
    if (idx !== -1) {
      return this.revisions.splice(idx, 1)[0];
    }
    return null;
  }

  // Analytics Helpers
  getAnalytics() {
    const totalDsa = this.dsaProblems.length;
    const solvedDsa = this.dsaProblems.filter(p => (p.status || p.problemStatus) === 'Solved').length;
    const attemptedDsa = this.dsaProblems.filter(p => (p.status || p.problemStatus) === 'Attempted').length;
    const revisionDsa = this.dsaProblems.filter(p => (p.status || p.problemStatus) === 'Needs Revision').length;

    let totalRoadmapTopics = 0;
    let completedRoadmapTopics = 0;
    this.roadmaps.forEach(r => {
      totalRoadmapTopics += r.topics.length;
      completedRoadmapTopics += r.topics.filter(t => t.completed).length;
    });

    const totalProjects = this.projects.length;
    const completedProjects = this.projects.filter(p => (p.status || p.projectStatus) === 'Completed').length;

    const dsaScore = totalDsa > 0 ? (solvedDsa / totalDsa) * 50 : 0;
    const roadmapScore = totalRoadmapTopics > 0 ? (completedRoadmapTopics / totalRoadmapTopics) * 30 : 0;
    const projectScore = totalProjects > 0 ? (completedProjects / totalProjects) * 20 : 0;
    const readinessScore = Math.min(100, Math.round(dsaScore + roadmapScore + projectScore + 10));

    const topicBreakdown = {};
    this.dsaProblems.forEach(p => {
      if (!topicBreakdown[p.topic]) {
        topicBreakdown[p.topic] = { total: 0, solved: 0 };
      }
      topicBreakdown[p.topic].total += 1;
      if ((p.status || p.problemStatus) === 'Solved') {
        topicBreakdown[p.topic].solved += 1;
      }
    });

    return {
      readinessScore,
      dsaStats: {
        total: totalDsa,
        solved: solvedDsa,
        attempted: attemptedDsa,
        needsRevision: revisionDsa,
        easySolved: this.dsaProblems.filter(p => p.difficulty === 'Easy' && (p.status || p.problemStatus) === 'Solved').length,
        mediumSolved: this.dsaProblems.filter(p => p.difficulty === 'Medium' && (p.status || p.problemStatus) === 'Solved').length,
        hardSolved: this.dsaProblems.filter(p => p.difficulty === 'Hard' && (p.status || p.problemStatus) === 'Solved').length
      },
      roadmapStats: {
        total: totalRoadmapTopics,
        completed: completedRoadmapTopics,
        percentage: totalRoadmapTopics > 0 ? Math.round((completedRoadmapTopics / totalRoadmapTopics) * 100) : 0
      },
      projectStats: {
        total: totalProjects,
        completed: completedProjects
      },
      topicBreakdown,
      studyActivities: this.studyActivities
    };
  }
}

export const memoryStore = new InMemoryStore();
