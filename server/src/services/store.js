import { defaultDsaProblems, defaultRoadmaps, defaultProjects, defaultNotes, defaultRevisions } from '../data/seedData.js';

// In-Memory fallback store with preloaded seed data
class InMemoryStore {
  constructor() {
    this.users = [
      {
        id: 'user-demo-1',
        name: 'Hardik Bhochiya',
        email: 'hardik@nextoffer.dev',
        password: '$2a$10$w8TKnk2x.Q0j4h9X7CgXUeM3bI8oD0m6xL7z9p1a.B3c4d5e6f7g8', // demo hashed password
        targetRole: 'Full Stack SDE',
        dreamCompany: 'Google / Microsoft / Tier-1 Startups',
        gradYear: '2026',
        streak: 12,
        readinessScore: 84,
        socialLinks: {
          github: 'https://github.com/Hardik-Bhochiya',
          linkedin: 'https://linkedin.com/in/hardik-bhochiya',
          leetcode: 'https://leetcode.com'
        },
        createdAt: new Date().toISOString()
      }
    ];
    this.dsaProblems = [...defaultDsaProblems];
    this.roadmaps = JSON.parse(JSON.stringify(defaultRoadmaps));
    this.projects = JSON.parse(JSON.stringify(defaultProjects));
    this.notes = JSON.parse(JSON.stringify(defaultNotes));
    this.revisions = JSON.parse(JSON.stringify(defaultRevisions));
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

  // DSA Helpers
  getProblems(filters = {}) {
    let result = [...this.dsaProblems];
    if (filters.topic && filters.topic !== 'All') {
      result = result.filter(p => p.topic === filters.topic);
    }
    if (filters.difficulty && filters.difficulty !== 'All') {
      result = result.filter(p => p.difficulty === filters.difficulty);
    }
    if (filters.status && filters.status !== 'All') {
      result = result.filter(p => p.status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.topic.toLowerCase().includes(q));
    }
    return result;
  }

  updateProblem(id, updates) {
    const idx = this.dsaProblems.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.dsaProblems[idx] = { ...this.dsaProblems[idx], ...updates, lastRevised: new Date().toISOString() };
      return this.dsaProblems[idx];
    }
    return null;
  }

  addProblem(problem) {
    const newProblem = {
      id: `dsa-${Date.now()}`,
      revisionsCount: 0,
      lastRevised: new Date().toISOString(),
      ...problem
    };
    this.dsaProblems.unshift(newProblem);
    return newProblem;
  }

  deleteProblem(id) {
    const idx = this.dsaProblems.findIndex(p => p.id === id);
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
    const roadmap = this.roadmaps.find(r => r.id === roadmapId);
    if (roadmap) {
      const topic = roadmap.topics.find(t => t.id === topicId);
      if (topic) {
        topic.completed = !topic.completed;
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
    const newProj = {
      id: `proj-${Date.now()}`,
      milestones: [],
      ...project
    };
    this.projects.unshift(newProj);
    return newProj;
  }

  updateProject(id, updates) {
    const idx = this.projects.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.projects[idx] = { ...this.projects[idx], ...updates };
      return this.projects[idx];
    }
    return null;
  }

  deleteProject(id) {
    const idx = this.projects.findIndex(p => p.id === id);
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
    const newNote = {
      id: `note-${Date.now()}`,
      pinned: false,
      isFavorite: false,
      updatedAt: new Date().toISOString(),
      ...note
    };
    this.notes.unshift(newNote);
    return newNote;
  }

  updateNote(id, updates) {
    const idx = this.notes.findIndex(n => n.id === id);
    if (idx !== -1) {
      this.notes[idx] = { ...this.notes[idx], ...updates, updatedAt: new Date().toISOString() };
      return this.notes[idx];
    }
    return null;
  }

  deleteNote(id) {
    const idx = this.notes.findIndex(n => n.id === id);
    if (idx !== -1) {
      return this.notes.splice(idx, 1)[0];
    }
    return null;
  }

  // Revisions Helpers
  getRevisions() {
    return this.revisions;
  }

  addRevision(revision) {
    const newRev = {
      id: `rev-${Date.now()}`,
      completed: false,
      scheduledDate: new Date().toISOString().split('T')[0],
      ...revision
    };
    this.revisions.unshift(newRev);
    return newRev;
  }

  toggleRevision(id) {
    const rev = this.revisions.find(r => r.id === id);
    if (rev) {
      rev.completed = !rev.completed;
      return rev;
    }
    return null;
  }

  deleteRevision(id) {
    const idx = this.revisions.findIndex(r => r.id === id);
    if (idx !== -1) {
      return this.revisions.splice(idx, 1)[0];
    }
    return null;
  }

  // Analytics Helpers
  getAnalytics() {
    const totalDsa = this.dsaProblems.length;
    const solvedDsa = this.dsaProblems.filter(p => p.status === 'Solved').length;
    const attemptedDsa = this.dsaProblems.filter(p => p.status === 'Attempted').length;
    const revisionDsa = this.dsaProblems.filter(p => p.status === 'Needs Revision').length;

    let totalRoadmapTopics = 0;
    let completedRoadmapTopics = 0;
    this.roadmaps.forEach(r => {
      totalRoadmapTopics += r.topics.length;
      completedRoadmapTopics += r.topics.filter(t => t.completed).length;
    });

    const totalProjects = this.projects.length;
    const completedProjects = this.projects.filter(p => p.status === 'Completed').length;

    // Calculate Placement Readiness Score (0-100%)
    // Weightings: DSA (50%), Roadmap (30%), Projects (20%)
    const dsaScore = totalDsa > 0 ? (solvedDsa / totalDsa) * 50 : 0;
    const roadmapScore = totalRoadmapTopics > 0 ? (completedRoadmapTopics / totalRoadmapTopics) * 30 : 0;
    const projectScore = totalProjects > 0 ? (completedProjects / totalProjects) * 20 : 0;
    const readinessScore = Math.min(100, Math.round(dsaScore + roadmapScore + projectScore + 10)); // Baseline 10 bonus

    // Topic breakdown for charts
    const topicBreakdown = {};
    this.dsaProblems.forEach(p => {
      if (!topicBreakdown[p.topic]) {
        topicBreakdown[p.topic] = { total: 0, solved: 0 };
      }
      topicBreakdown[p.topic].total += 1;
      if (p.status === 'Solved') {
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
        easySolved: this.dsaProblems.filter(p => p.difficulty === 'Easy' && p.status === 'Solved').length,
        mediumSolved: this.dsaProblems.filter(p => p.difficulty === 'Medium' && p.status === 'Solved').length,
        hardSolved: this.dsaProblems.filter(p => p.difficulty === 'Hard' && p.status === 'Solved').length
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
