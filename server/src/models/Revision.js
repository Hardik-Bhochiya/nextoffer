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
  }
}, {
  timestamps: true
});

const Revision = mongoose.model('Revision', revisionSchema);
export default Revision;
