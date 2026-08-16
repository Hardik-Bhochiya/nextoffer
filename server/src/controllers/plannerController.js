import { memoryStore } from '../services/store.js';

export const getPlannerData = (req, res) => {
  try {
    const data = memoryStore.getPlannerData();
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createStudyGoal = (req, res) => {
  try {
    const { goalTitle, deadline, priority, progress } = req.body;
    if (!goalTitle) {
      return res.status(400).json({ success: false, message: 'Goal title is required' });
    }
    const newGoal = memoryStore.addStudyGoal({ goalTitle, deadline, priority, progress });
    return res.status(201).json({ success: true, data: newGoal });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStudyGoal = (req, res) => {
  try {
    const { id } = req.params;
    const updated = memoryStore.updateStudyGoal(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Goal not found' });
    }
    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteStudyGoal = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = memoryStore.deleteStudyGoal(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Goal not found' });
    }
    return res.json({ success: true, message: 'Goal deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addDailyTask = (req, res) => {
  try {
    const { taskDetails, taskStatus } = req.body;
    if (!taskDetails) {
      return res.status(400).json({ success: false, message: 'Task details are required' });
    }
    const newTask = memoryStore.addDailyTask({ taskDetails, taskStatus });
    return res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleDailyTask = (req, res) => {
  try {
    const { id } = req.params;
    const toggled = memoryStore.toggleDailyTask(id);
    if (!toggled) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    return res.json({ success: true, data: toggled });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDailyTask = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = memoryStore.deleteDailyTask(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    return res.json({ success: true, message: 'Task deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
