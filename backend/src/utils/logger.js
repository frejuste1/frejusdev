import fs from 'fs';
import path from 'path';

/**
 * Simple logger utility
 * Gestion des logs avec différents niveaux et rotation
 */
class Logger {
  constructor() {
    this.logDir = 'logs';
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaString = Object.keys(meta).length > 0 ? ` | ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaString}`;
  }

  writeToFile(level, formattedMessage) {
    const date = new Date().toISOString().split('T')[0];
    const filename = path.join(this.logDir, `${date}.log`);
    
    fs.appendFileSync(filename, formattedMessage + '\n');
    
    // Log des erreurs dans un fichier séparé
    if (level === 'error') {
      const errorFilename = path.join(this.logDir, `${date}-errors.log`);
      fs.appendFileSync(errorFilename, formattedMessage + '\n');
    }
  }

  log(level, message, meta = {}) {
    const formattedMessage = this.formatMessage(level, message, meta);
    
    // Console output avec couleurs
    if (process.env.NODE_ENV !== 'test') {
      const colors = {
        error: '\x1b[31m',   // Rouge
        warn: '\x1b[33m',    // Jaune
        info: '\x1b[36m',    // Cyan
        debug: '\x1b[35m',   // Magenta
        reset: '\x1b[0m'     // Reset
      };
      
      const color = colors[level] || colors.reset;
      console.log(`${color}${formattedMessage}${colors.reset}`);
    }
    
    // Écriture en fichier en production
    if (process.env.NODE_ENV === 'production') {
      this.writeToFile(level, formattedMessage);
    }
  }

  error(message, meta = {}) {
    this.log('error', message, meta);
  }

  warn(message, meta = {}) {
    this.log('warn', message, meta);
  }

  info(message, meta = {}) {
    this.log('info', message, meta);
  }

  debug(message, meta = {}) {
    if (process.env.NODE_ENV === 'development') {
      this.log('debug', message, meta);
    }
  }

  // Méthode pour nettoyer les anciens logs
  cleanOldLogs(daysToKeep = 30) {
    try {
      const files = fs.readdirSync(this.logDir);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      files.forEach(file => {
        const filePath = path.join(this.logDir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.mtime < cutoffDate) {
          fs.unlinkSync(filePath);
          this.info(`Ancien fichier de log supprimé: ${file}`);
        }
      });
    } catch (error) {
      this.error('Erreur lors du nettoyage des logs:', { error: error.message });
    }
  }
}

export const logger = new Logger();

// Nettoyage automatique des logs au démarrage
if (process.env.NODE_ENV === 'production') {
  logger.cleanOldLogs();
}