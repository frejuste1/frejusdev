/**
 * Classe d'erreur personnalisée pour l'application
 * Gestion centralisée des erreurs avec codes de statut HTTP
 */
export class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.details = details;
    
    // Capturer la stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Méthodes statiques pour créer des erreurs communes
   */
  static badRequest(message = 'Requête invalide', details = null) {
    return new AppError(message, 400, details);
  }

  static unauthorized(message = 'Non autorisé') {
    return new AppError(message, 401);
  }

  static forbidden(message = 'Accès interdit') {
    return new AppError(message, 403);
  }

  static notFound(message = 'Ressource non trouvée') {
    return new AppError(message, 404);
  }

  static conflict(message = 'Conflit de données') {
    return new AppError(message, 409);
  }

  static unprocessableEntity(message = 'Données non traitables', details = null) {
    return new AppError(message, 422, details);
  }

  static tooManyRequests(message = 'Trop de requêtes') {
    return new AppError(message, 429);
  }

  static internal(message = 'Erreur interne du serveur') {
    return new AppError(message, 500);
  }

  static serviceUnavailable(message = 'Service indisponible') {
    return new AppError(message, 503);
  }

  /**
   * Convertir l'erreur en objet JSON pour la réponse
   */
  toJSON() {
    const error = {
      success: false,
      status: this.status,
      message: this.message,
      statusCode: this.statusCode
    };

    // Ajouter les détails si disponibles
    if (this.details) {
      error.details = this.details;
    }

    // Ajouter la stack trace en développement
    if (process.env.NODE_ENV === 'development') {
      error.stack = this.stack;
    }

    return error;
  }
}