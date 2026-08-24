import mongoose from 'mongoose';

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
