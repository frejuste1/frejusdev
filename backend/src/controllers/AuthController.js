import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { logger } from '../utils/logger.js';
import { EmailService } from '../services/EmailService.js';

/**
 * Contrôleur d'authentification
 * Gestion de l'inscription, connexion, et gestion des tokens
 */
export class AuthController {
  
  /**
   * Inscription d'un nouvel utilisateur
   */
  static register = catchAsync(async (req, res, next) => {
    // Vérifier les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError('Données invalides', 400, errors.array()));
    }

    const { firstName, lastName, email, password, company, position, phone } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return next(new AppError('Un utilisateur avec cet email existe déjà', 409));
    }

    // Créer le nouvel utilisateur
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      company,
      position,
      phone,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    // Générer le token de vérification email
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    user.emailVerificationToken = crypto
      .createHash('sha256')
      .update(emailVerificationToken)
      .digest('hex');
    user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 heures

    await user.save();

    // Envoyer l'email de vérification
    try {
      const verificationUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/verify-email/${emailVerificationToken}`;
      
      await EmailService.sendWelcomeEmail({
        to: user.email,
        firstName: user.firstName,
        verificationUrl
      });
    } catch (error) {
      logger.error('Erreur envoi email de vérification:', error);
      // Ne pas faire échouer l'inscription si l'email ne peut pas être envoyé
    }

    // Générer les tokens
    const authToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    // Réponse sans le mot de passe
    const userResponse = user.getPublicProfile();

    logger.info(`Nouvel utilisateur inscrit: ${user.email}`);

    res.status(201).json({
      success: true,
      message: 'Inscription réussie. Veuillez vérifier votre email.',
      data: {
        user: userResponse,
        tokens: {
          access: authToken,
          refresh: refreshToken
        }
      }
    });
  });

  /**
   * Connexion utilisateur
   */
  static login = catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError('Données invalides', 400, errors.array()));
    }

    const { email, password, rememberMe = false } = req.body;

    // Trouver l'utilisateur avec le mot de passe
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return next(new AppError('Email ou mot de passe incorrect', 401));
    }

    // Vérifier si le compte est verrouillé
    if (user.isLocked) {
      return next(new AppError('Compte temporairement verrouillé. Réessayez plus tard.', 423));
    }

    // Vérifier si le compte est actif
    if (!user.isActive) {
      return next(new AppError('Compte désactivé. Contactez l\'administrateur.', 403));
    }

    // Vérifier le mot de passe
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      // Incrémenter les tentatives de connexion
      await user.incLoginAttempts();
      return next(new AppError('Email ou mot de passe incorrect', 401));
    }

    // Réinitialiser les tentatives de connexion en cas de succès
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }

    // Mettre à jour les informations de connexion
    user.lastLogin = new Date();
    user.ipAddress = req.ip;
    user.userAgent = req.get('User-Agent');
    await user.save();

    // Générer les tokens
    const authToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    // Configuration du cookie pour le refresh token si "Se souvenir de moi"
    if (rememberMe) {
      const cookieOptions = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      };
      
      res.cookie('refreshToken', refreshToken, cookieOptions);
    }

    const userResponse = user.getPublicProfile();

    logger.info(`Utilisateur connecté: ${user.email}`);

    res.json({
      success: true,
      message: 'Connexion réussie',
      data: {
        user: userResponse,
        tokens: {
          access: authToken,
          refresh: refreshToken
        }
      }
    });
  });

  /**
   * Déconnexion utilisateur
   */
  static logout = catchAsync(async (req, res, next) => {
    // Supprimer le cookie refresh token
    res.clearCookie('refreshToken');

    logger.info(`Utilisateur déconnecté: ${req.user?.email}`);

    res.json({
      success: true,
      message: 'Déconnexion réussie'
    });
  });

  /**
   * Rafraîchir le token d'accès
   */
  static refreshToken = catchAsync(async (req, res, next) => {
    const { refreshToken } = req.body || req.cookies;

    if (!refreshToken) {
      return next(new AppError('Token de rafraîchissement manquant', 401));
    }

    try {
      // Vérifier le refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      
      // Trouver l'utilisateur
      const user = await User.findById(decoded.id);
      if (!user || !user.isActive) {
        return next(new AppError('Utilisateur non trouvé ou inactif', 401));
      }

      // Générer un nouveau token d'accès
      const newAuthToken = user.generateAuthToken();

      res.json({
        success: true,
        data: {
          token: newAuthToken
        }
      });

    } catch (error) {
      return next(new AppError('Token de rafraîchissement invalide', 401));
    }
  });

  /**
   * Vérification de l'email
   */
  static verifyEmail = catchAsync(async (req, res, next) => {
    const { token } = req.params;

    // Hasher le token reçu
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Trouver l'utilisateur avec ce token
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return next(new AppError('Token de vérification invalide ou expiré', 400));
    }

    // Marquer l'email comme vérifié
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    logger.info(`Email vérifié pour: ${user.email}`);

    res.json({
      success: true,
      message: 'Email vérifié avec succès'
    });
  });

  /**
   * Demande de réinitialisation de mot de passe
   */
  static forgotPassword = catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError('Email invalide', 400, errors.array()));
    }

    const { email } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      // Ne pas révéler si l'email existe ou non
      return res.json({
        success: true,
        message: 'Si cet email existe, vous recevrez un lien de réinitialisation'
      });
    }

    // Générer le token de réinitialisation
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Envoyer l'email de réinitialisation
    try {
      const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
      
      await EmailService.sendPasswordResetEmail({
        to: user.email,
        firstName: user.firstName,
        resetUrl
      });

      logger.info(`Email de réinitialisation envoyé à: ${user.email}`);

    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      logger.error('Erreur envoi email de réinitialisation:', error);
      return next(new AppError('Erreur lors de l\'envoi de l\'email', 500));
    }

    res.json({
      success: true,
      message: 'Email de réinitialisation envoyé'
    });
  });

  /**
   * Réinitialisation du mot de passe
   */
  static resetPassword = catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError('Données invalides', 400, errors.array()));
    }

    const { token } = req.params;
    const { password } = req.body;

    // Hasher le token reçu
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Trouver l'utilisateur avec ce token
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return next(new AppError('Token de réinitialisation invalide ou expiré', 400));
    }

    // Mettre à jour le mot de passe
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    logger.info(`Mot de passe réinitialisé pour: ${user.email}`);

    // Générer un nouveau token
    const authToken = user.generateAuthToken();

    res.json({
      success: true,
      message: 'Mot de passe réinitialisé avec succès',
      data: {
        token: authToken
      }
    });
  });

  /**
   * Obtenir le profil utilisateur actuel
   */
  static getProfile = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return next(new AppError('Utilisateur non trouvé', 404));
    }

    res.json({
      success: true,
      data: {
        user: user.getPublicProfile()
      }
    });
  });

  /**
   * Mettre à jour le profil utilisateur
   */
  static updateProfile = catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError('Données invalides', 400, errors.array()));
    }

    const allowedFields = ['firstName', 'lastName', 'company', 'position', 'phone', 'preferences'];
    const updates = {};

    // Filtrer les champs autorisés
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!user) {
      return next(new AppError('Utilisateur non trouvé', 404));
    }

    logger.info(`Profil mis à jour pour: ${user.email}`);

    res.json({
      success: true,
      message: 'Profil mis à jour avec succès',
      data: {
        user: user.getPublicProfile()
      }
    });
  });

  /**
   * Changer le mot de passe
   */
  static changePassword = catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError('Données invalides', 400, errors.array()));
    }

    const { currentPassword, newPassword } = req.body;

    // Récupérer l'utilisateur avec le mot de passe
    const user = await User.findById(req.user.id).select('+password');
    
    if (!user) {
      return next(new AppError('Utilisateur non trouvé', 404));
    }

    // Vérifier le mot de passe actuel
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return next(new AppError('Mot de passe actuel incorrect', 400));
    }

    // Mettre à jour le mot de passe
    user.password = newPassword;
    await user.save();

    logger.info(`Mot de passe changé pour: ${user.email}`);

    res.json({
      success: true,
      message: 'Mot de passe changé avec succès'
    });
  });
}