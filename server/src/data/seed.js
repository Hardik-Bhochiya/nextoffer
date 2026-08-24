import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { defaultDsaProblems, defaultRoadmaps, defaultProjects, defaultNotes, defaultRevisions } from './seedData.js';
import User from '../models/User.js';
import Note from '../models/Note.js';
import Project from '../models/Project.js';
import DsaProblem from '../models/DsaProblem.js';
import Revision from '../models/Revision.js';
import { StudyGoal, DailyTask } from '../models/Planner.js';
import Roadmap from '../models/Roadmap.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nextoffer';

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB at:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clean existing collections
    await User.deleteMany({});
    await Note.deleteMany({});
    await Project.deleteMany({});
    await DsaProblem.deleteMany({});
    await Revision.deleteMany({});
    await StudyGoal.deleteMany({});
    await DailyTask.deleteMany({});
    await Roadmap.deleteMany({});

    console.log('🧹 Cleaned up existing collections.');

    // Seed Demo User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    const demoUser = await User.create({
      name: 'Hardik Bhochiya',
      email: 'hardik@nextoffer.dev',
      password: hashedPassword,
      targetRole: 'Full Stack Engineer',
      dreamCompany: 'Google, Uber, Microsoft',
      gradYear: '2026',
      streak: 14,
      readinessScore: 82,
      socialLinks: {
        github: 'https://github.com/Hardik-Bhochiya',
        linkedin: 'https://linkedin.com/in/hardik-bhochiya',
        leetcode: 'https://leetcode.com/hardik-bhochiya'
      }
    });
    console.log(`👤 Seeded demo user: ${demoUser.email} (password: password123)`);

    // Seed DSA Problems
    const dsaDocs = defaultDsaProblems.map(({ id, ...rest }) => rest);
    await DsaProblem.insertMany(dsaDocs);
    console.log(`💡 Seeded ${dsaDocs.length} DSA Problems.`);

    // Seed Roadmaps
    await Roadmap.insertMany(defaultRoadmaps);
    console.log(`🗺️ Seeded ${defaultRoadmaps.length} Roadmaps.`);

    // Seed Projects
    const projectDocs = defaultProjects.map(({ id, ...rest }) => rest);
    await Project.insertMany(projectDocs);
    console.log(`🚀 Seeded ${projectDocs.length} Projects.`);

    // Seed Notes
    const noteDocs = defaultNotes.map(({ id, ...rest }) => rest);
    await Note.insertMany(noteDocs);
    console.log(`📝 Seeded ${noteDocs.length} Notes.`);

    // Seed Revisions
    const revDocs = defaultRevisions.map(({ id, ...rest }) => rest);
    await Revision.insertMany(revDocs);
    console.log(`🔄 Seeded ${revDocs.length} Revision items.`);

    // Seed Planner Goals & Daily Tasks
    await StudyGoal.create([
      { goalTitle: 'Solve 100 LeetCode Blind 75 questions', deadline: '2026-06-30', priority: 'High', progress: 45 },
      { goalTitle: 'Complete System Design high-level architectures', deadline: '2026-07-15', priority: 'Medium', progress: 30 }
    ]);
    await DailyTask.create([
      { taskDetails: 'Solve 2 Tree Traversal problems (LeetCode 102 & 104)', taskStatus: true },
      { taskDetails: 'Revise ACID properties and SQL joins for interview', taskStatus: false },
      { taskDetails: 'Build Mongoose CRUD models and test with Postman', taskStatus: true }
    ]);
    console.log(`📅 Seeded Planner Goals and Daily Tasks.`);

    console.log('🎉 All Seed Data Inserted Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedDatabase();
