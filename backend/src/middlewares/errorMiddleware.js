import { AppError } from '../utils/AppError.js';
import { logger } from '../utils/logger.js';

/**
 * Middleware de gestion des erreurs 404
 */
export const notFound = (req, res, next) => {
  const error = new AppError(`Route non trouvée: ${req.originalUrl}`, 404);
  next(error);
};

/**
 * Middleware principal de gestion des erreurs
 */
export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log de l'erreur
  logger.error('Erreur capturée:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    user: req.user?.id || 'Anonymous'
  });

  // Erreur de validation Mongoose
  if (err.name === 'ValidationError') {
    const message = 'Données invalides';
    const details = Object.values(err.errors).map(val => ({
      field: val.path,
      message: val.message
    }));
    error = new AppError(message, 400, details);
  }

  // Erreur de duplication Mongoose (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `${field} '${value}' existe déjà`;
    error = new AppError(message, 409);
  }

  // Erreur de cast Mongoose (ObjectId invalide)
  if (err.name === 'CastError') {
    const message = 'Ressource non trouvée';
    error = new AppError(message, 404);
  }

  // Erreur JWT
  if (err.name === 'JsonWebTokenError') {
    const message = 'Token invalide';
    error = new AppError(message, 401);
  }

  // Token JWT expiré
  if (err.name === 'TokenExpiredError') {
    const message = 'Token expiré';
    error = new AppError(message, 401);
  }

  // Erreur Multer (upload de fichiers)
  if (err.code === 'LIMIT_FILE_SIZE') {
    const message = 'Fichier trop volumineux';
    error = new AppError(message, 413);
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    const message = 'Type de fichier non autorisé';
    error = new AppError(message, 400);
  }

  // Si ce n'est pas une erreur opérationnelle, la convertir
  if (!error.isOperational) {
    error = new AppError(
      process.env.NODE_ENV === 'production' 
        ? 'Une erreur est survenue' 
        : err.message,
      500
    );
  }

  // Réponse d'erreur
  res.status(error.statusCode || 500).json(error.toJSON());
};

/**
 * Middleware pour capturer les rejections non gérées
 */
export const handleUnhandledRejection = () => {
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', {
      reason: reason,
      promise: promise
    });
    
    // Fermer le serveur proprement
    process.exit(1);
  });
};

/**
 * Middleware pour capturer les exceptions non gérées
 */
export const handleUncaughtException = () => {
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', {
      message: error.message,
      stack: error.stack
    });
    
    // Fermer le serveur immédiatement
    process.exit(1);
  });
};