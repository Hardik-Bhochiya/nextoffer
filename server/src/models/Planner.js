import mongoose from 'mongoose';

const studyGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  goalTitle: {
    type: String,
    required: [true, 'Goal title is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'SDE & Core DSA'
  },
  targetRole: {
    type: String,
    default: ''
  },
  deadline: {
    type: String,
    default: '2026-12-31'
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'High'
  },
  difficulty: {
    type: String,
    enum: ['Hard', 'Medium', 'Easy'],
    default: 'Hard'
  },
  status: {
    type: String,
    enum: ['In Progress', 'On Track', 'Behind Schedule', 'Completed'],
    default: 'In Progress'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  milestones: [{
    id: { type: String },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date, default: null }
  }],
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

const dailyTaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  taskDetails: {
    type: String,
    required: [true, 'Task details are required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'DSA Practice'
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'High'
  },
  difficulty: {
    type: String,
    enum: ['Hard', 'Medium', 'Easy'],
    default: 'Medium'
  },
  deadline: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  dueTime: {
    type: String,
    default: '06:00 PM'
  },
  associatedGoalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudyGoal',
    default: null
  },
  taskStatus: {
    type: Boolean,
    default: false
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

export const StudyGoal = mongoose.model('StudyGoal', studyGoalSchema);
export const DailyTask = mongoose.model('DailyTask', dailyTaskSchema);
