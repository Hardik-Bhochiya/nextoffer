import { memoryStore } from '../services/store.js';

export const getProblems = (req, res) => {
  try {
    const { topic, difficulty, status, search } = req.query;
    const problems = memoryStore.getProblems({ topic, difficulty, status, search });
    return res.json({ success: true, count: problems.length, data: problems });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProblem = (req, res) => {
  try {
    const { id } = req.params;
    const updated = memoryStore.updateProblem(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }
    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addProblem = (req, res) => {
  try {
    const { title, topic, difficulty, url, notes, timeComplexity, spaceComplexity, status } = req.body;
    if (!title || !topic) {
      return res.status(400).json({ success: false, message: 'Title and Topic are required' });
    }
    const newProblem = memoryStore.addProblem({
      title,
      topic,
      difficulty: difficulty || 'Medium',
      url: url || 'https://leetcode.com',
      notes: notes || '',
      timeComplexity: timeComplexity || 'O(n)',
      spaceComplexity: spaceComplexity || 'O(1)',
      status: status || 'Solved'
    });
    return res.status(201).json({ success: true, data: newProblem });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProblem = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = memoryStore.deleteProblem(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }
    return res.json({ success: true, message: 'Problem deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
