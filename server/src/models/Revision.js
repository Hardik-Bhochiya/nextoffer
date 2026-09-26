import mongoose from 'mongoose';

const revisionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  topic: {
    type: String,
    required: [true, 'Topic is required'],
    trim: true
  },
  category: {
    type: String,
    default: 'DSA'
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  difficulty: {
    type: String,
    enum: ['Hard', 'Medium', 'Easy'],
    default: 'Medium'
  },
  interval: {
    type: String,
    enum: ['Day 1', 'Day 3', 'Day 7', 'Day 14', 'Day 30'],
    default: 'Day 1'
  },
  confidence: {
    type: String,
    enum: ['Needs Practice', 'Familiar', 'Mastered'],
    default: 'Needs Practice'
  },
  scheduledDate: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  completed: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    default: ''
  },
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

const Revision = mongoose.model('Revision', revisionSchema);
export default Revision;
