import User from '../models/User.js';

/**
 * Returns the current date in YYYY-MM-DD format (local/server)
 */
export const getTodayDateString = (offsetDays = 0) => {
  const d = new Date();
  if (offsetDays !== 0) {
    d.setDate(d.getDate() + offsetDays);
  }
  return d.toISOString().split('T')[0];
};

/**
 * Calculates current streak status for a user.
 * If user missed more than 1 day (lastActiveDate < yesterday), streak resets to 0.
 */
export const calculateStreakStatus = async (user) => {
  if (!user) return { currentStreak: 0, longestStreak: 0, isActiveToday: false, streakAtRisk: true };

  const todayStr = getTodayDateString(0);
  const yesterdayStr = getTodayDateString(-1);

  const lastActive = user.lastActiveDate || null;
  let currentStreak = user.streak || 0;
  let longestStreak = user.longestStreak || currentStreak;
  let isActiveToday = false;
  let streakAtRisk = false;

  if (lastActive === todayStr) {
    // User already completed a qualifying activity today
    isActiveToday = true;
    streakAtRisk = false;
  } else if (lastActive === yesterdayStr) {
    // User was active yesterday; streak is preserved until midnight today
    isActiveToday = false;
    streakAtRisk = currentStreak > 0;
  } else {
    // User missed yesterday or has never been active -> streak breaks to 0
    if (currentStreak > 0) {
      currentStreak = 0;
      user.streak = 0;
      await user.save().catch(() => null);
    }
    isActiveToday = false;
    streakAtRisk = false;
  }

  // Count activities today from activityLog
  const todayLog = (user.activityLog || []).find(l => l.date === todayStr);
  const activitiesToday = todayLog ? todayLog.count : (isActiveToday ? 1 : 0);

  return {
    currentStreak,
    longestStreak,
    isActiveToday,
    streakAtRisk,
    lastActiveDate: lastActive,
    activitiesToday
  };
};

/**
 * Records a qualifying user activity (completed task, solved problem, checked revision, finished milestone)
 * and updates user's daily streak according to strict calendar rules.
 */
export const recordUserActivity = async (userId, activityDescription = 'Completed daily placement task') => {
  try {
    if (!userId) return null;
    const user = await User.findById(userId);
    if (!user) return null;

    const todayStr = getTodayDateString(0);
    const yesterdayStr = getTodayDateString(-1);
    const lastActive = user.lastActiveDate || null;

    let newStreak = user.streak || 0;
    let longestStreak = user.longestStreak || 0;

    if (lastActive === todayStr) {
      // Already active today; do not increment streak again on the same day
      newStreak = Math.max(1, newStreak);
    } else if (lastActive === yesterdayStr) {
      // Active yesterday -> increment streak by 1
      newStreak = (user.streak || 0) + 1;
    } else {
      // Inactive yesterday or broken -> starts fresh at 1
      newStreak = 1;
    }

    longestStreak = Math.max(longestStreak, newStreak);

    // Update User Activity Log
    if (!user.activityLog) user.activityLog = [];
    let todayLog = user.activityLog.find(l => l.date === todayStr);
    if (todayLog) {
      todayLog.count = (todayLog.count || 0) + 1;
      if (activityDescription && !todayLog.activities.includes(activityDescription)) {
        todayLog.activities.push(activityDescription);
      }
    } else {
      user.activityLog.push({
        date: todayStr,
        count: 1,
        activities: [activityDescription]
      });
      // Keep last 60 days of activity log to prevent unbounded document growth
      if (user.activityLog.length > 60) {
        user.activityLog = user.activityLog.slice(-60);
      }
    }

    user.streak = newStreak;
    user.longestStreak = longestStreak;
    user.lastActiveDate = todayStr;

    await user.save();

    return {
      currentStreak: newStreak,
      longestStreak,
      isActiveToday: true,
      lastActiveDate: todayStr,
      activitiesToday: todayLog ? todayLog.count : 1
    };
  } catch (err) {
    console.error('Error in recordUserActivity:', err);
    return null;
  }
};
