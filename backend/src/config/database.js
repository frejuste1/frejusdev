import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

/**
 * Database connection configuration
 */
export const connectDB = async () => {
  try {
    const mongoURI = process.env.NODE_ENV === 'test' 
      ? process.env.MONGODB_TEST_URI 
      : process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferMaxEntries: 0, // Disable mongoose buffering
      bufferCommands: false, // Disable mongoose buffering
    };

    const conn = await mongoose.connect(mongoURI, options);

    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
    logger.info(`📊 Database: ${conn.connection.name}`);

    // Connection event listeners
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed through app termination');
        process.exit(0);
      } catch (error) {
        logger.error('Error during MongoDB disconnection:', error);
        process.exit(1);
      }
    });

  } catch (error) {
    logger.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

/**
 * Database health check
 */
export const checkDBHealth = async () => {
  try {
    const state = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    return {
      status: states[state] || 'unknown',
      connected: state === 1,
      host: mongoose.connection.host,
      name: mongoose.connection.name,
      collections: Object.keys(mongoose.connection.collections).length
    };
  } catch (error) {
    return {
      status: 'error',
      connected: false,
      error: error.message
    };
  }
};