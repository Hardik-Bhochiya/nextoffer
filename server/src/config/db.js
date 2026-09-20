import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;
let retryTimeout = null;

// Event listeners for connection lifecycle
mongoose.connection.on('connected', () => {
  isConnected = true;
  console.log('✅ MongoDB connection established and active.');
});

mongoose.connection.on('error', (err) => {
  isConnected = false;
  console.error(`❌ MongoDB connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('⚠️ MongoDB disconnected. Monitoring for automatic reconnection...');
});

export const connectDB = async (retryCount = 0, maxRetries = 10) => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nextoffer';

  // If already connected, skip
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 15000, // 15 seconds to comfortably support cloud MongoDB Atlas and local networks
      autoIndex: true,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    isConnected = false;
    console.error(`❌ MongoDB initial connection failed (${error.message})`);

    if (retryCount < maxRetries) {
      const backoffSec = Math.min(Math.pow(2, retryCount), 15);
      console.log(`🔄 Retrying database connection in ${backoffSec}s (attempt ${retryCount + 1}/${maxRetries})...`);
      clearTimeout(retryTimeout);
      retryTimeout = setTimeout(() => {
        connectDB(retryCount + 1, maxRetries);
      }, backoffSec * 1000);
    } else {
      console.error('🛑 Max database connection attempts reached. Ensure MongoDB is running locally or check your MONGODB_URI in .env.');
    }
  }
};

export const getDBStatus = () => isConnected && mongoose.connection.readyState === 1;
