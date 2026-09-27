import mongoose from 'mongoose';

/**
 * User Schema
 * Represents an authenticated engineer in the NextOffer ecosystem.
 * Stores personal profile details, target career role, streak records,
 * activity history, custom DSA taxonomy, and live-synced LeetCode/GitHub stats.
 */
const userSchema = new mongoose.Schema({
  // Authentication & Credentials
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },

  // Career Aspirations & Education
  targetRole: {
    type: String,
    default: 'Full Stack Engineer'
  },
  dreamCompany: {
    type: String,
    default: 'Top Tech Companies'
  },
  gradYear: {
    type: String,
    default: '2026'
  },
  college: {
    type: String,
    default: ''
  },
  branch: {
    type: String,
    default: ''
  },

  // Daily Consistency & Streak Tracking
  streak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  lastActiveDate: {
    type: String, // Stored in YYYY-MM-DD format
    default: null
  },
  activityLog: [{
    date: { type: String }, // YYYY-MM-DD
    count: { type: Number, default: 0 },
    activities: [{ type: String }]
  }],

  // Profile Customization & Progress Metrics
  avatar: {
    type: String,
    default: ''
  },
  readinessScore: {
    type: Number,
    default: 0
  },
  completedTopics: [{
    type: String
  }],
  customDsaTopics: [{
    type: String,
    trim: true
  }],
  enrolledRoadmaps: [{
    type: String
  }],

  // Social & External Profile Links
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    leetcode: { type: String, default: '' }
  },

  // External Coding Platforms Live Sync Metrics
  codingStats: {
    leetcode: {
      totalSolved: { type: Number, default: 0 },
      easySolved: { type: Number, default: 0 },
      mediumSolved: { type: Number, default: 0 },
      hardSolved: { type: Number, default: 0 },
      ranking: { type: Number, default: 0 },
      acceptanceRate: { type: Number, default: 0 }
    },
    github: {
      publicRepos: { type: Number, default: 0 },
      followers: { type: Number, default: 0 },
      avatarUrl: { type: String, default: '' }
    },
    lastSynced: { type: Date, default: null }
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;

