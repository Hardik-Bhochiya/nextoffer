import { StudyGoal, DailyTask } from '../models/Planner.js';
import User from '../models/User.js';
import { recordUserActivity, calculateStreakStatus } from '../utils/streakHelper.js';

const formatDoc = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  obj.id = obj._id ? obj._id.toString() : obj.id;
  return obj;
};

export const getPlannerData = async (req, res) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    const streakInfo = await calculateStreakStatus(user);

    const studyGoals = await StudyGoal.find({ userId }).sort({ deadline: 1, createdAt: -1 });
    const dailyTasks = await DailyTask.find({ userId }).sort({ deadline: 1, createdAt: -1 });

    return res.json({
      success: true,
      data: {
        studyGoals: studyGoals.map(formatDoc),
        dailyTasks: dailyTasks.map(formatDoc),
        streakInfo
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createStudyGoal = async (req, res) => {
  try {
    const userId = req.user?.id;
    const {
      goalTitle,
      description,
      category,
      targetRole,
      deadline,
      priority,
      difficulty,
      status,
      progress,
      milestones
    } = req.body;

    if (!goalTitle || !goalTitle.trim()) {
      return res.status(400).json({ success: false, message: 'Goal title is required' });
    }

    const newGoal = await StudyGoal.create({
      userId,
      goalTitle: goalTitle.trim(),
      description: description ? description.trim() : '',
      category: category || 'SDE & Core DSA',
      targetRole: targetRole || '',
      deadline: deadline || '2026-12-31',
      priority: priority || 'High',
      difficulty: difficulty || 'Hard',
      status: status || 'In Progress',
      progress: typeof progress === 'number' ? progress : 0,
      milestones: Array.isArray(milestones) ? milestones : []
    });

    return res.status(201).json({ success: true, data: formatDoc(newGoal) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStudyGoal = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    let goal = await StudyGoal.findOne({ _id: id, userId });
    if (!goal) {
      return res.status(404).json({ success: false, message: 'Goal not found' });
    }

    // Update fields if present in req.body
    if (req.body.goalTitle !== undefined) goal.goalTitle = req.body.goalTitle.trim();
    if (req.body.description !== undefined) goal.description = req.body.description.trim();
    if (req.body.category !== undefined) goal.category = req.body.category;
    if (req.body.targetRole !== undefined) goal.targetRole = req.body.targetRole;
    if (req.body.deadline !== undefined) goal.deadline = req.body.deadline;
    if (req.body.priority !== undefined) goal.priority = req.body.priority;
    if (req.body.difficulty !== undefined) goal.difficulty = req.body.difficulty;
    if (req.body.status !== undefined) goal.status = req.body.status;
    if (req.body.progress !== undefined) goal.progress = req.body.progress;
    if (req.body.milestones !== undefined) goal.milestones = req.body.milestones;

    // Auto-calculate progress if milestones exist and progress wasn't explicitly set
    if (Array.isArray(goal.milestones) && goal.milestones.length > 0 && req.body.progress === undefined) {
      const completedCount = goal.milestones.filter(m => m.completed).length;
      goal.progress = Math.round((completedCount / goal.milestones.length) * 100);
      if (goal.progress === 100) {
        goal.status = 'Completed';
        goal.completedAt = new Date();
      }
    }

    await goal.save();
    return res.json({ success: true, data: formatDoc(goal) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteStudyGoal = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const deleted = await StudyGoal.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Goal not found' });
    }
    return res.json({ success: true, message: 'Goal deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addDailyTask = async (req, res) => {
  try {
    const userId = req.user?.id;
    const {
      taskDetails,
      description,
      category,
      priority,
      difficulty,
      deadline,
      dueTime,
      associatedGoalId,
      taskStatus
    } = req.body;

    if (!taskDetails || !taskDetails.trim()) {
      return res.status(400).json({ success: false, message: 'Task details are required' });
    }

    const isCompleted = taskStatus === true || taskStatus === 'Completed' || taskStatus === 'true';

    const newTask = await DailyTask.create({
      userId,
      taskDetails: taskDetails.trim(),
      description: description ? description.trim() : '',
      category: category || 'DSA Practice',
      priority: priority || 'High',
      difficulty: difficulty || 'Medium',
      deadline: deadline || new Date().toISOString().split('T')[0],
      dueTime: dueTime || '06:00 PM',
      associatedGoalId: associatedGoalId || null,
      taskStatus: isCompleted,
      completedAt: isCompleted ? new Date() : null
    });

    if (isCompleted) {
      await recordUserActivity(userId, `Completed Task: ${newTask.taskDetails}`);
    }

    return res.status(201).json({ success: true, data: formatDoc(newTask) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDailyTask = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    let task = await DailyTask.findOne({ _id: id, userId });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (req.body.taskDetails !== undefined) task.taskDetails = req.body.taskDetails.trim();
    if (req.body.description !== undefined) task.description = req.body.description.trim();
    if (req.body.category !== undefined) task.category = req.body.category;
    if (req.body.priority !== undefined) task.priority = req.body.priority;
    if (req.body.difficulty !== undefined) task.difficulty = req.body.difficulty;
    if (req.body.deadline !== undefined) task.deadline = req.body.deadline;
    if (req.body.dueTime !== undefined) task.dueTime = req.body.dueTime;
    if (req.body.associatedGoalId !== undefined) task.associatedGoalId = req.body.associatedGoalId || null;
    if (req.body.taskStatus !== undefined) {
      const wasCompleted = task.taskStatus;
      task.taskStatus = !!req.body.taskStatus;
      if (!wasCompleted && task.taskStatus) {
        task.completedAt = new Date();
        await recordUserActivity(userId, `Completed Task: ${task.taskDetails}`);
      } else if (!task.taskStatus) {
        task.completedAt = null;
      }
    }

    await task.save();
    return res.json({ success: true, data: formatDoc(task) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleDailyTask = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    let task = await DailyTask.findOne({ _id: id, userId });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    task.taskStatus = !task.taskStatus;
    let streakUpdate = null;

    if (task.taskStatus) {
      task.completedAt = new Date();
      streakUpdate = await recordUserActivity(userId, `Completed Task: ${task.taskDetails}`);
    } else {
      task.completedAt = null;
    }

    await task.save();

    return res.json({
      success: true,
      data: formatDoc(task),
      streakInfo: streakUpdate
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDailyTask = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const deleted = await DailyTask.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    return res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
