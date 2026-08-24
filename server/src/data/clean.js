import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Note from '../models/Note.js';
import Project from '../models/Project.js';
import DsaProblem from '../models/DsaProblem.js';
import Revision from '../models/Revision.js';
import { StudyGoal, DailyTask } from '../models/Planner.js';
import Roadmap from '../models/Roadmap.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nextoffer';

const cleanDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    await User.deleteMany({});
    await Note.deleteMany({});
    await Project.deleteMany({});
    await DsaProblem.deleteMany({});
    await Revision.deleteMany({});
    await StudyGoal.deleteMany({});
    await DailyTask.deleteMany({});
    // We leave roadmaps or delete them as well if preferred. Roadmaps are learning curricula. Let's keep roadmaps clean or empty.
    
    console.log('✨ All dummy data completely wiped from MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('Error cleaning database:', err);
    process.exit(1);
  }
};

cleanDatabase();
