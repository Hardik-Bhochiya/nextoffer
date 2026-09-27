import mongoose from 'mongoose';

/**
 * Topic Milestone Sub-Schema
 * Represents an individual milestone within a career track.
 * completion is governed by sequential prerequisite rules in roadmapController.
 */
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

/**
 * Roadmap Schema
 * Defines an engineering career curriculum track (e.g. SDE, Frontend, Backend, DevOps, AI/ML).
 * Tracks are identified by unique string keys (e.g. 'sde', 'frontend', 'backend').
 */
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

