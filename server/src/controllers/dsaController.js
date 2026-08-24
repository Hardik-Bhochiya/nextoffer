import DsaProblem from '../models/DsaProblem.js';

const formatDoc = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  obj.id = obj._id ? obj._id.toString() : obj.id;
  return obj;
};

export const getProblems = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { topic, difficulty, status, search } = req.query;
    let query = { userId };

    if (topic && topic !== 'All') query.topic = topic;
    if (difficulty && difficulty !== 'All') query.difficulty = difficulty;
    if (status && status !== 'All') query.status = status;
    if (search) {
      query.$and = [
        { userId },
        {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { topic: { $regex: search, $options: 'i' } },
            { notes: { $regex: search, $options: 'i' } }
          ]
        }
      ];
    }

    const problems = await DsaProblem.find(query).sort({ createdAt: -1 });
    return res.json({ success: true, count: problems.length, data: problems.map(formatDoc) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProblem = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const updated = await DsaProblem.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }
    return res.json({ success: true, data: formatDoc(updated) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addProblem = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { title, topic, difficulty, url, notes, timeComplexity, spaceComplexity, status } = req.body;
    if (!title || !topic) {
      return res.status(400).json({ success: false, message: 'Title and Topic are required' });
    }
    const newProblem = await DsaProblem.create({
      userId,
      title,
      topic,
      difficulty: difficulty || 'Medium',
      url: url || 'https://leetcode.com',
      notes: notes || '',
      timeComplexity: timeComplexity || 'O(n)',
      spaceComplexity: spaceComplexity || 'O(1)',
      status: status || 'Solved',
      revisionsCount: 0,
      lastRevised: new Date()
    });
    return res.status(201).json({ success: true, data: formatDoc(newProblem) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProblem = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const deleted = await DsaProblem.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }
    return res.json({ success: true, message: 'Problem deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
