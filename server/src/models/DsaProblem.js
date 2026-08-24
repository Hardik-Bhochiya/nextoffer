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
    required: [true, 'Topic is required'],
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  url: {
    type: String,
    default: 'https://leetcode.com'
  },
  status: {
    type: String,
    enum: ['Solved', 'Attempted', 'Needs Revision', 'Unsolved'],
    default: 'Unsolved'
  },
  timeComplexity: {
    type: String,
    default: 'O(n)'
  },
  spaceComplexity: {
    type: String,
    default: 'O(1)'
  },
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
