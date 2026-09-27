import mongoose from 'mongoose';

/**
 * Milestone Sub-Schema
 * Tracks individual phases of completion (e.g. 'DB Design', 'Auth Flow', 'Deploy')
 * within a portfolio project showcase.
 */
const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { _id: false });

/**
 * Project Schema
 * Represents a technical project built by the user to demonstrate domain expertise.
 * Indexed by `userId` to ensure fast query times and multi-tenant security.
 */
const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  techStack: [{
    type: String,
    trim: true
  }],
  githubUrl: {
    type: String,
    default: ''
  },
  liveUrl: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'Full Stack',
    trim: true
  },
  projectType: {
    type: String,
    default: 'Full Stack Web Application',
    trim: true
  },
  status: {
    type: String,
    enum: ['In Progress', 'Completed', 'Planning', 'On Hold'],
    default: 'In Progress'
  },
  milestones: [milestoneSchema]
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
export default Project;

