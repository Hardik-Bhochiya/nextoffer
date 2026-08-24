import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'nextoffer_super_secure_jwt_secret_2026';

const formatUser = (user) => {
  if (!user) return null;
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  obj.id = obj._id ? obj._id.toString() : obj.id;
  return obj;
};

export const register = async (req, res) => {
  try {
    const { fullName, name, email, password, targetRole, dreamCompany, gradYear, college, branch } = req.body;
    const finalName = fullName || name;

    if (!finalName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name: finalName,
      email: email.toLowerCase(),
      password: hashedPassword,
      targetRole: targetRole || 'Full Stack Engineer',
      dreamCompany: dreamCompany || 'Top Tech Companies',
      gradYear: gradYear || '2026',
      college: college || '',
      branch: branch || '',
      streak: 1,
      readinessScore: 0,
      socialLinks: {
        github: '',
        linkedin: '',
        leetcode: ''
      }
    });

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: formatUser(newUser)
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: formatUser(user)
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, user: formatUser(user) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const updated = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, message: 'Profile updated', user: formatUser(updated) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Sync live LeetCode and GitHub stats
export const syncCodingProfiles = async (req, res) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const ghUrl = user.socialLinks?.github || req.body?.github || '';
    const lcUrl = user.socialLinks?.leetcode || req.body?.leetcode || '';

    let ghUsername = '';
    if (ghUrl) {
      ghUsername = ghUrl.replace(/^https?:\/\/(www\.)?github\.com\//, '').replace(/\/$/, '').trim();
    }

    let lcUsername = '';
    if (lcUrl) {
      lcUsername = lcUrl.replace(/^https?:\/\/(www\.)?leetcode\.com\/(u\/)?/, '').replace(/\/$/, '').trim();
    }

    let lcStats = {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      ranking: 0,
      acceptanceRate: 0
    };

    let ghStats = {
      publicRepos: 0,
      followers: 0,
      avatarUrl: ''
    };

    // 1. Fetch GitHub stats
    if (ghUsername) {
      try {
        const ghRes = await fetch(`https://api.github.com/users/${ghUsername}`, {
          headers: { 'User-Agent': 'NextOffer-Placement-App' }
        });
        if (ghRes.ok) {
          const ghData = await ghRes.json();
          ghStats = {
            publicRepos: ghData.public_repos || 0,
            followers: ghData.followers || 0,
            avatarUrl: ghData.avatar_url || ''
          };
        }
      } catch (e) {
        console.warn('GitHub API fetch failed:', e.message);
      }
    }

    // 2. Fetch LeetCode stats via public API or fallback
    if (lcUsername) {
      try {
        const lcRes = await fetch(`https://leetcode-stats-api.herokuapp.com/${lcUsername}`);
        if (lcRes.ok) {
          const lcData = await lcRes.json();
          if (lcData.status === 'success') {
            lcStats = {
              totalSolved: lcData.totalSolved || 0,
              easySolved: lcData.easySolved || 0,
              mediumSolved: lcData.mediumSolved || 0,
              hardSolved: lcData.hardSolved || 0,
              ranking: lcData.ranking || 0,
              acceptanceRate: lcData.acceptanceRate || 0
            };
          }
        }
      } catch (e) {
        console.warn('LeetCode API fetch failed:', e.message);
      }
    }

    user.codingStats = {
      leetcode: lcStats,
      github: ghStats,
      lastSynced: new Date()
    };

    await user.save();

    return res.json({
      success: true,
      message: 'Coding profiles synchronized successfully!',
      data: user.codingStats,
      user: formatUser(user)
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
