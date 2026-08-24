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
    default: 'Software Engineer'
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
    default: 65
  },
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    leetcode: { type: String, default: '' }
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
