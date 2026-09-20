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

    const forceSeed = process.argv.includes('--force') || process.env.SEED_FORCE === 'true';

    // Check if database already contains permanent user data
    const existingUserCount = await User.countDocuments();
    if (existingUserCount > 0 && !forceSeed) {
      console.log(`🛡️ Permanent Data Protection: Found ${existingUserCount} existing user account(s).`);
      console.log(`🔒 Skipping wipe to preserve your permanent database data.`);
      console.log(`ℹ️ If you intentionally want to reset and re-seed all collections, run:\n   npm run seed -- --force\n`);
      process.exit(0);
    }

    if (forceSeed) {
      console.log('⚠️ Force flag detected. Cleaning up existing collections...');
    }

    // Clean existing collections
    await User.deleteMany({});
    await Note.deleteMany({});
    await Project.deleteMany({});
    await DsaProblem.deleteMany({});
    await Revision.deleteMany({});
    await StudyGoal.deleteMany({});
    await DailyTask.deleteMany({});
    await Roadmap.deleteMany({});

    console.log('🧹 Cleaned up collections.');

    // Seed Demo Users
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

    const demoUserAlex = await User.create({
      name: 'Alex Developer',
      email: 'alex@example.com',
      password: hashedPassword,
      targetRole: 'Full Stack Engineer',
      dreamCompany: 'Google, Uber, Microsoft',
      gradYear: '2026',
      streak: 14,
      readinessScore: 82,
      socialLinks: {
        github: 'https://github.com/alex-dev',
        linkedin: 'https://linkedin.com',
        leetcode: 'https://leetcode.com'
      }
    });
    console.log(`👤 Seeded demo users: ${demoUser.email}, ${demoUserAlex.email} (password: password123)`);

    const usersToSeed = [demoUser, demoUserAlex];

    // Seed Roadmaps (global catalog)
    await Roadmap.insertMany(defaultRoadmaps);
    console.log(`🗺️ Seeded ${defaultRoadmaps.length} Roadmaps.`);

    for (const u of usersToSeed) {
      // Seed DSA Problems
      const dsaDocs = defaultDsaProblems.map(({ id, ...rest }) => ({ ...rest, userId: u._id }));
      await DsaProblem.insertMany(dsaDocs);

      // Seed Projects
      const projectDocs = defaultProjects.map(({ id, ...rest }) => ({ ...rest, userId: u._id }));
      await Project.insertMany(projectDocs);

      // Seed Notes
      const noteDocs = defaultNotes.map(({ id, ...rest }) => ({ ...rest, userId: u._id }));
      await Note.insertMany(noteDocs);

      // Seed Revisions
      const revDocs = defaultRevisions.map(({ id, ...rest }) => ({ ...rest, userId: u._id }));
      await Revision.insertMany(revDocs);

      // Seed Planner Goals & Daily Tasks
      await StudyGoal.create([
        { userId: u._id, goalTitle: 'Solve 100 LeetCode Blind 75 questions', deadline: '2026-06-30', priority: 'High', progress: 45 },
        { userId: u._id, goalTitle: 'Complete System Design high-level architectures', deadline: '2026-07-15', priority: 'Medium', progress: 30 }
      ]);
      await DailyTask.create([
        { userId: u._id, taskDetails: 'Solve 2 Tree Traversal problems (LeetCode 102 & 104)', taskStatus: true },
        { userId: u._id, taskDetails: 'Revise ACID properties and SQL joins for interview', taskStatus: false },
        { userId: u._id, taskDetails: 'Build Mongoose CRUD models and test with Postman', taskStatus: true }
      ]);
    }
    console.log(`💡 Seeded DSA, Projects, Notes, Revisions, and Planner tasks for users.`);

    console.log('🎉 All Seed Data Inserted Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedDatabase();
