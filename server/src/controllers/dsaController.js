import DsaProblem from '../models/DsaProblem.js';
import User from '../models/User.js';

const formatDoc = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  obj.id = obj._id ? obj._id.toString() : obj.id;
  return obj;
};

const potdPool = [
  {
    id: 'potd-1',
    title: 'Container With Most Water',
    topic: 'Two Pointers',
    difficulty: 'Medium',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hint: 'Use two pointers from left and right boundaries. Move the pointer with smaller height inward.',
    leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/'
  },
  {
    id: 'potd-2',
    title: 'Lowest Common Ancestor of a Binary Search Tree',
    topic: 'Trees & BST',
    difficulty: 'Medium',
    timeComplexity: 'O(h)',
    spaceComplexity: 'O(1)',
    hint: 'Utilize BST properties: if both p and q values are greater than root, search right; if both smaller, search left.',
    leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/'
  },
  {
    id: 'potd-3',
    title: 'Subarray Sum Equals K',
    topic: 'Arrays & Prefix Sum',
    difficulty: 'Medium',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hint: 'Maintain prefix sum and store frequency of prefix sums in a HashMap.',
    leetcodeUrl: 'https://leetcode.com/problems/subarray-sum-equals-k/'
  },
  {
    id: 'potd-4',
    title: 'Word Break Problem',
    topic: 'Dynamic Programming',
    difficulty: 'Medium',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(n)',
    hint: 'Use 1D DP boolean array where dp[i] indicates if s[0...i] can be segmented using the dictionary.',
    leetcodeUrl: 'https://leetcode.com/problems/word-break/'
  }
];

export const getProblemOfTheDay = async (req, res) => {
  try {
    const today = new Date();
    const dayIndex = (today.getFullYear() * 365 + today.getMonth() * 31 + today.getDate()) % potdPool.length;
    const potd = potdPool[dayIndex];

    const userId = req.user?.id;
    const existing = await DsaProblem.findOne({ userId, title: potd.title });

    return res.json({
      success: true,
      data: {
        ...potd,
        isSolved: existing?.status === 'Solved',
        status: existing?.status || 'Unsolved',
        date: today.toISOString().split('T')[0]
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProblems = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { topic, difficulty, status, search } = req.query;
    let query = { userId };

    if (topic && topic !== 'All') {
      query.topic = topic;
    }
    if (difficulty && difficulty !== 'All') {
      query.difficulty = difficulty;
    }
    if (status && status !== 'All') {
      query.status = status;
    }
    if (search && search.trim()) {
      query.title = { $regex: search.trim(), $options: 'i' };
    }

    const problems = await DsaProblem.find(query).sort({ createdAt: -1 });
    return res.json({ success: true, count: problems.length, data: problems.map(formatDoc) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addProblem = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { title, topic, difficulty, status, timeComplexity, spaceComplexity, notes, leetcodeUrl } = req.body;

    if (!title || !topic) {
      return res.status(400).json({ success: false, message: 'Title and topic are required' });
    }

    const newProblem = await DsaProblem.create({
      userId,
      title: title.trim(),
      topic,
      difficulty: difficulty || 'Medium',
      status: status || 'Needs Revision',
      timeComplexity: timeComplexity || 'O(n)',
      spaceComplexity: spaceComplexity || 'O(1)',
      notes: notes || '',
      leetcodeUrl: leetcodeUrl || ''
    });

    return res.status(201).json({ success: true, data: formatDoc(newProblem) });
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
      return res.status(404).json({ success: false, message: 'DSA Problem not found' });
    }

    return res.json({ success: true, data: formatDoc(updated) });
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
      return res.status(404).json({ success: false, message: 'DSA Problem not found' });
    }

    return res.json({ success: true, message: 'Problem deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
