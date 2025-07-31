import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Import configurations and utilities
import { connectDB } from './src/config/database.js';
import { errorHandler, notFound } from './src/middlewares/errorMiddleware.js';
import { logger } from './src/utils/logger.js';

// Import routes
import authRoutes from './src/routes/authRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js';
import devisRoutes from './src/routes/devisRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Security middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));

// Body parsing middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API routes
const API_PREFIX = `/api/${process.env.API_VERSION || 'v1'}`;

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/projects`, projectRoutes);
app.use(`${API_PREFIX}/contact`, contactRoutes);
app.use(`${API_PREFIX}/devis`, devisRoutes);
app.use(`${API_PREFIX}/upload`, uploadRoutes);
app.use(`${API_PREFIX}/admin`, adminRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur l\'API FrejusDev! 🚀',
    version: process.env.npm_package_version || '1.0.0',
    documentation: '/api/docs',
    health: '/health'
  });
});

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  logger.info(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
  logger.info(`🏥 Health Check: http://localhost:${PORT}/health`);
});

export default app;