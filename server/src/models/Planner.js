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
  deadline: {
    type: String,
    default: '2026-06-30'
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'High'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
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
  taskStatus: {
    type: Boolean,
    default: false
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  }
}, {
  timestamps: true
});

export const StudyGoal = mongoose.model('StudyGoal', studyGoalSchema);
export const DailyTask = mongoose.model('DailyTask', dailyTaskSchema);
