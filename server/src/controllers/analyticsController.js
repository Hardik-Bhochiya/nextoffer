import { memoryStore } from '../services/store.js';

export const getDashboardMetrics = (req, res) => {
  try {
    const analytics = memoryStore.getAnalytics();
    const user = memoryStore.users[0];
    
    // Add streak & upcoming count
    const upcomingRevisions = memoryStore.revisions.filter(r => !r.completed);

    return res.json({
      success: true,
      data: {
        ...analytics,
        user: {
          name: user.name,
          streak: user.streak,
          targetRole: user.targetRole,
          dreamCompany: user.dreamCompany
        },
        pendingRevisionsCount: upcomingRevisions.length
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logStudyHours = (req, res) => {
  try {
    const { hours, dsaSolved } = req.body;
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    const existing = memoryStore.studyActivities.find(a => a.date === today);
    if (existing) {
      existing.hours += Number(hours) || 1;
      if (dsaSolved) existing.dsaSolved += Number(dsaSolved);
    } else {
      memoryStore.studyActivities.push({
        date: today,
        hours: Number(hours) || 1,
        dsaSolved: Number(dsaSolved) || 0
      });
    }
    return res.json({ success: true, message: 'Study hours logged', data: memoryStore.studyActivities });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
