import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  resources: {
    type: String,
    default: ''
  }
});

const roadmapSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'Layout'
  },
  topics: [topicSchema]
}, {
  timestamps: true
});

const Roadmap = mongoose.model('Roadmap', roadmapSchema);
export default Roadmap;
