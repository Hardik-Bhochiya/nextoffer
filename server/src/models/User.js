import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
  streak: {
    type: Number,
    default: 1
  },
  readinessScore: {
    type: Number,
    default: 0
  },
  completedTopics: [{
    type: String
  }],
  enrolledRoadmaps: [{
    type: String
  }],
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    leetcode: { type: String, default: '' }
  },
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
