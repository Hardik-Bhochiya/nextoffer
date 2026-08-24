import { StudyGoal, DailyTask } from '../models/Planner.js';

const formatDoc = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  obj.id = obj._id ? obj._id.toString() : obj.id;
  return obj;
};

export const getPlannerData = async (req, res) => {
  try {
    const userId = req.user?.id;
    const studyGoals = await StudyGoal.find({ userId }).sort({ createdAt: -1 });
    const dailyTasks = await DailyTask.find({ userId }).sort({ createdAt: -1 });
    return res.json({
      success: true,
      data: {
        studyGoals: studyGoals.map(formatDoc),
        dailyTasks: dailyTasks.map(formatDoc)
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createStudyGoal = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { goalTitle, deadline, priority, progress } = req.body;
    if (!goalTitle) {
      return res.status(400).json({ success: false, message: 'Goal title is required' });
    }
    const newGoal = await StudyGoal.create({
      userId,
      goalTitle,
      deadline: deadline || '2026-12-31',
      priority: priority || 'High',
      progress: progress || 0
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
    const updated = await StudyGoal.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Goal not found' });
    }
    return res.json({ success: true, data: formatDoc(updated) });
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
    return res.json({ success: true, message: 'Goal deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addDailyTask = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { taskDetails, taskStatus } = req.body;
    if (!taskDetails) {
      return res.status(400).json({ success: false, message: 'Task details are required' });
    }
    const newTask = await DailyTask.create({
      userId,
      taskDetails,
      taskStatus: !!taskStatus
    });
    return res.status(201).json({ success: true, data: formatDoc(newTask) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleDailyTask = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const task = await DailyTask.findOne({ _id: id, userId });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    task.taskStatus = !task.taskStatus;
    await task.save();
    return res.json({ success: true, data: formatDoc(task) });
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
    return res.json({ success: true, message: 'Task deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
