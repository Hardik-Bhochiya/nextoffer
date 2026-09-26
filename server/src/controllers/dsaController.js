import DsaProblem from '../models/DsaProblem.js';
import User from '../models/User.js';

const formatDoc = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  obj.id = obj._id ? obj._id.toString() : obj.id;
  // Ensure topics array is populated even for legacy records with only `topic`
  if (!Array.isArray(obj.topics) || obj.topics.length === 0) {
    obj.topics = obj.topic ? [obj.topic] : [];
  }
  return obj;
};

export const defaultTopics = [
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Stack & Queue',
  'Linked List',
  'Binary Search',
  'Trees & BST',
  'Heap & Priority Queue',
  'Backtracking & Recursion',
  'Graphs & BFS/DFS',
  'Dynamic Programming',
  'Greedy Algorithms',
  'Bit Manipulation',
  'Trie',
  'Math & Geometry',
  'Strings & Pattern Matching',
  'Intervals',
  'Matrix & 2D Grid'
];

export const getTopics = async (req, res) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId).select('customDsaTopics');
    const customTopics = user?.customDsaTopics || [];
    const problemTopics = await DsaProblem.distinct('topics', { userId });
    const legacyTopics = await DsaProblem.distinct('topic', { userId });
    const allTopics = Array.from(new Set([...defaultTopics, ...customTopics, ...problemTopics, ...legacyTopics])).filter(Boolean);
    return res.json({ success: true, data: allTopics });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addTopic = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { topic } = req.body;
    if (!topic || !topic.trim()) {
      return res.status(400).json({ success: false, message: 'Topic name is required' });
    }
    const trimmed = topic.trim();
    const user = await User.findById(userId);
    if (user) {
      if (!user.customDsaTopics) user.customDsaTopics = [];
      const alreadyExists = user.customDsaTopics.some(t => t.toLowerCase() === trimmed.toLowerCase());
      if (!alreadyExists) {
        user.customDsaTopics.push(trimmed);
        await user.save();
      }
    }
    const customTopics = user?.customDsaTopics || [];
    const problemTopics = await DsaProblem.distinct('topics', { userId });
    const legacyTopics = await DsaProblem.distinct('topic', { userId });
    const allTopics = Array.from(new Set([...defaultTopics, ...customTopics, ...problemTopics, ...legacyTopics, trimmed])).filter(Boolean);
    return res.status(201).json({ success: true, data: allTopics, addedTopic: trimmed });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
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
    topic: 'Arrays & Hashing',
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
        isSolved: existing?.status === 'Solved' || existing?.status === 'Completed',
        status: existing?.status || 'Unsolved',
        date: today.toISOString().split('T')[0]
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const escapeRegex = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const parseCompanies = (input) => {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.map(c => String(c).trim()).filter(Boolean);
  }
  if (typeof input === 'string') {
    return input.split(/[,;\n]+/).map(c => c.trim()).filter(Boolean);
  }
  return [];
};

const parseTopics = (topicsInput, topicInput) => {
  let list = [];
  if (Array.isArray(topicsInput)) {
    list = topicsInput.map(t => String(t).trim()).filter(Boolean);
  } else if (typeof topicsInput === 'string' && topicsInput.trim()) {
    list = topicsInput.split(/[,;\n]+/).map(t => t.trim()).filter(Boolean);
  }
  if (topicInput && typeof topicInput === 'string' && topicInput.trim()) {
    list.push(topicInput.trim());
  }
  return Array.from(new Set(list));
};

export const getProblems = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { topic, difficulty, status, search, company } = req.query;
    let query = { userId };

    if (topic && topic !== 'All') {
      query.$or = [{ topic: topic }, { topics: topic }];
    }
    if (difficulty && difficulty !== 'All') {
      query.difficulty = difficulty;
    }
    if (status && status !== 'All') {
      if (status === 'Completed') {
        query.status = { $in: ['Completed', 'Solved'] };
      } else if (status === 'Attended') {
        query.status = { $in: ['Attended', 'Attempted'] };
      } else {
        query.status = status;
      }
    }
    if (company && company !== 'All') {
      query.companies = { $regex: escapeRegex(company.trim()), $options: 'i' };
    }
    if (search && search.trim()) {
      const safePattern = escapeRegex(search.trim());
      const searchConditions = [
        { title: { $regex: safePattern, $options: 'i' } },
        { topic: { $regex: safePattern, $options: 'i' } },
        { topics: { $elemMatch: { $regex: safePattern, $options: 'i' } } },
        { notes: { $regex: safePattern, $options: 'i' } },
        { companies: { $elemMatch: { $regex: safePattern, $options: 'i' } } }
      ];
      if (query.$or) {
        query = {
          $and: [
            query,
            { $or: searchConditions }
          ]
        };
      } else {
        query.$or = searchConditions;
      }
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
    const {
      title,
      topic,
      topics,
      difficulty,
      status,
      timeComplexity,
      spaceComplexity,
      notes,
      leetcodeUrl,
      url,
      companies,
      revisionsCount,
      platform
    } = req.body;

    const parsedTopics = parseTopics(topics, topic);

    if (!title || parsedTopics.length === 0) {
      return res.status(400).json({ success: false, message: 'Problem title and at least one topic are required' });
    }

    const primaryTopic = parsedTopics[0];

    // Auto-save any custom topics to user's customDsaTopics
    if (userId) {
      try {
        const user = await User.findById(userId);
        if (user) {
          if (!user.customDsaTopics) user.customDsaTopics = [];
          let hasNew = false;
          for (const t of parsedTopics) {
            if (!defaultTopics.includes(t) && !user.customDsaTopics.includes(t)) {
              user.customDsaTopics.push(t);
              hasNew = true;
            }
          }
          if (hasNew) await user.save();
        }
      } catch (err) {
        console.warn('Could not auto-save custom topic:', err.message);
      }
    }

    const newProblem = await DsaProblem.create({
      userId,
      title: title.trim(),
      topic: primaryTopic,
      topics: parsedTopics,
      difficulty: difficulty || 'Medium',
      status: status || 'Completed',
      url: url || leetcodeUrl || '',
      platform: platform || 'LeetCode',
      timeComplexity: timeComplexity || 'O(n)',
      spaceComplexity: spaceComplexity || 'O(1)',
      companies: parseCompanies(companies),
      revisionsCount: typeof revisionsCount === 'number' ? Math.max(0, revisionsCount) : 0,
      notes: notes || '',
      lastRevised: revisionsCount > 0 ? new Date() : null
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

    const updates = { ...req.body };

    if (updates.companies !== undefined) {
      updates.companies = parseCompanies(updates.companies);
    }

    if (updates.topics !== undefined || updates.topic !== undefined) {
      const parsedTopics = parseTopics(updates.topics, updates.topic);
      if (parsedTopics.length > 0) {
        updates.topics = parsedTopics;
        updates.topic = parsedTopics[0];

        // Auto-save any new custom topics into user profile
        if (userId) {
          try {
            const user = await User.findById(userId);
            if (user) {
              if (!user.customDsaTopics) user.customDsaTopics = [];
              let hasNew = false;
              for (const t of parsedTopics) {
                if (!defaultTopics.includes(t) && !user.customDsaTopics.includes(t)) {
                  user.customDsaTopics.push(t);
                  hasNew = true;
                }
              }
              if (hasNew) await user.save();
            }
          } catch (err) {}
        }
      }
    }

    if (updates.revisionsCount !== undefined) {
      updates.revisionsCount = Math.max(0, Number(updates.revisionsCount) || 0);
      updates.lastRevised = new Date();
    }

    let updated = null;
    try {
      updated = await DsaProblem.findOneAndUpdate(
        { _id: id, userId },
        updates,
        { new: true, runValidators: true }
      );
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message || 'Failed to update problem' });
    }

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

    let deleted = null;
    try {
      deleted = await DsaProblem.findOneAndDelete({ _id: id, userId });
    } catch (castErr) {
      return res.status(404).json({ success: false, message: 'DSA Problem not found' });
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'DSA Problem not found' });
    }

    return res.json({ success: true, message: 'Problem deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
