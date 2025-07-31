import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

/**
 * Middleware d'authentification JWT
 */
export const authMiddleware = catchAsync(async (req, res, next) => {
  // Récupérer le token depuis l'en-tête Authorization
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Token d\'accès manquant. Veuillez vous connecter.', 401));
  }

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Vérifier si l'utilisateur existe toujours
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('L\'utilisateur associé à ce token n\'existe plus.', 401));
    }

    // Vérifier si l'utilisateur est actif
    if (!user.isActive) {
      return next(new AppError('Votre compte a été désactivé. Contactez l\'administrateur.', 403));
    }

    // Ajouter l'utilisateur à la requête
    req.user = user;
    next();
    
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Token invalide. Veuillez vous reconnecter.', 401));
    } else if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expiré. Veuillez vous reconnecter.', 401));
    } else {
      return next(new AppError('Erreur d\'authentification.', 401));
    }
  }
});

/**
 * Middleware de vérification des rôles
 */
export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Authentification requise.', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Permissions insuffisantes pour accéder à cette ressource.', 403));
    }

    next();
  };
};

/**
 * Middleware optionnel d'authentification
 * N'échoue pas si aucun token n'est fourni
 */
export const optionalAuth = catchAsync(async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (user && user.isActive) {
      req.user = user;
    }
  } catch (error) {
    // Ignorer les erreurs de token en mode optionnel
  }

  next();
});

/**
 * Middleware pour vérifier si l'utilisateur est propriétaire de la ressource
 */
export const requireOwnership = (resourceUserField = 'createdBy') => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Authentification requise.', 401));
    }

    // Si l'utilisateur est admin, il peut accéder à toutes les ressources
    if (req.user.role === 'admin') {
      return next();
    }

    // Vérifier la propriété de la ressource
    const resource = req.resource; // La ressource doit être attachée par un middleware précédent
    
    if (!resource) {
      return next(new AppError('Ressource non trouvée.', 404));
    }

    const resourceUserId = resource[resourceUserField];
    
    if (!resourceUserId || resourceUserId.toString() !== req.user._id.toString()) {
      return next(new AppError('Accès non autorisé à cette ressource.', 403));
    }

    next();
  };
};