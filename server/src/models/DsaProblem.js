import mongoose from 'mongoose';

const dsaProblemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Problem title is required'],
    trim: true
  },
  topic: {
    type: String,
    trim: true,
    default: 'General'
  },
  topics: [{
    type: String,
    trim: true
  }],
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  platform: {
    type: String,
    default: 'LeetCode'
  },
  url: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Completed', 'Solved', 'Attended', 'Attempted', 'Needs Revision', 'Revising', 'Unsolved'],
    default: 'Completed'
  },
  timeComplexity: {
    type: String,
    default: 'O(n)'
  },
  spaceComplexity: {
    type: String,
    default: 'O(1)'
  },
  companies: [{
    type: String,
    trim: true
  }],
  notes: {
    type: String,
    default: ''
  },
  revisionsCount: {
    type: Number,
    default: 0
  },
  lastRevised: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

const DsaProblem = mongoose.model('DsaProblem', dsaProblemSchema);
export default DsaProblem;
