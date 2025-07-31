import mongoose from 'mongoose';

/**
 * Project Schema
 * Gestion des projets portfolio avec métadonnées complètes
 */
const projectSchema = new mongoose.Schema({
  // Informations de base
  title: {
    type: String,
    required: [true, 'Le titre du projet est requis'],
    trim: true,
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
  },
  
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets']
  },
  
  description: {
    type: String,
    required: [true, 'La description est requise'],
    trim: true,
    maxlength: [500, 'La description ne peut pas dépasser 500 caractères']
  },
  
  longDescription: {
    type: String,
    trim: true,
    maxlength: [2000, 'La description longue ne peut pas dépasser 2000 caractères']
  },
  
  // Catégorie et tags
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: [
      'web-development',
      'mobile-development', 
      'fullstack-application',
      'api-backend',
      'ui-ux-design',
      'e-commerce',
      'cms-development',
      'consulting'
    ]
  },
  
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Technologies utilisées
  technologies: {
    frontend: [{
      name: String,
      version: String,
      icon: String // URL ou nom d'icône
    }],
    backend: [{
      name: String,
      version: String,
      icon: String
    }],
    database: [{
      name: String,
      version: String,
      icon: String
    }],
    tools: [{
      name: String,
      version: String,
      icon: String
    }]
  },
  
  // Médias
  images: {
    thumbnail: {
      url: String,
      alt: String,
      cloudinaryId: String
    },
    gallery: [{
      url: String,
      alt: String,
      cloudinaryId: String,
      order: {
        type: Number,
        default: 0
      }
    }],
    mockups: [{
      device: {
        type: String,
        enum: ['desktop', 'tablet', 'mobile']
      },
      url: String,
      alt: String,
      cloudinaryId: String
    }]
  },
  
  // Liens et démo
  links: {
    live: {
      url: String,
      label: String
    },
    github: {
      url: String,
      label: String
    },
    demo: {
      url: String,
      label: String,
      credentials: {
        username: String,
        password: String
      }
    },
    additional: [{
      url: String,
      label: String,
      type: {
        type: String,
        enum: ['documentation', 'api', 'design', 'other']
      }
    }]
  },
  
  // Informations client
  client: {
    name: String,
    company: String,
    industry: String,
    location: String,
    testimonial: {
      content: String,
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      date: Date
    }
  },
  
  // Détails du projet
  projectDetails: {
    duration: {
      start: Date,
      end: Date,
      estimated: String // "2 semaines", "3 mois", etc.
    },
    team: [{
      name: String,
      role: String,
      contribution: String
    }],
    budget: {
      range: {
        type: String,
        enum: ['< 5k', '5k-10k', '10k-25k', '25k-50k', '50k+']
      },
      currency: {
        type: String,
        default: 'EUR'
      }
    },
    challenges: [String],
    solutions: [String],
    results: [String]
  },
  
  // Statut et visibilité
  status: {
    type: String,
    enum: ['draft', 'in-progress', 'completed', 'archived'],
    default: 'draft'
  },
  
  isPublished: {
    type: Boolean,
    default: false
  },
  
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  publishedAt: Date,
  
  // Métriques et analytics
  metrics: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    },
    inquiries: {
      type: Number,
      default: 0
    }
  },
  
  // SEO
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    ogImage: String
  },
  
  // Ordre d'affichage
  order: {
    type: Number,
    default: 0
  },
  
  // Créateur
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes pour optimiser les performances
projectSchema.index({ slug: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ tags: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ isPublished: 1 });
projectSchema.index({ isFeatured: 1 });
projectSchema.index({ publishedAt: -1 });
projectSchema.index({ order: 1 });
projectSchema.index({ 'metrics.views': -1 });

// Virtual pour l'URL complète du projet
projectSchema.virtual('url').get(function() {
  return `/portfolio/${this.slug}`;
});

// Virtual pour la durée du projet
projectSchema.virtual('duration').get(function() {
  if (this.projectDetails.duration.start && this.projectDetails.duration.end) {
    const start = new Date(this.projectDetails.duration.start);
    const end = new Date(this.projectDetails.duration.end);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} mois`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} an${years > 1 ? 's' : ''}`;
    }
  }
  return this.projectDetails.duration.estimated || 'Non spécifié';
});

// Middleware pre-save pour générer le slug automatiquement
projectSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Supprimer les caractères spéciaux
      .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
      .replace(/-+/g, '-') // Supprimer les tirets multiples
      .trim('-'); // Supprimer les tirets en début/fin
  }
  
  // Mettre à jour publishedAt si le projet devient publié
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// Méthode pour incrémenter les vues
projectSchema.methods.incrementViews = function() {
  this.metrics.views += 1;
  return this.save();
};

// Méthode pour obtenir les projets similaires
projectSchema.methods.getSimilarProjects = function(limit = 3) {
  return this.constructor.find({
    _id: { $ne: this._id },
    category: this.category,
    isPublished: true,
    status: 'completed'
  })
  .sort({ 'metrics.views': -1, publishedAt: -1 })
  .limit(limit)
  .populate('createdBy', 'firstName lastName');
};

// Méthodes statiques
projectSchema.statics.findPublished = function() {
  return this.find({ isPublished: true, status: 'completed' });
};

projectSchema.statics.findFeatured = function() {
  return this.find({ 
    isPublished: true, 
    isFeatured: true, 
    status: 'completed' 
  }).sort({ order: 1, publishedAt: -1 });
};

projectSchema.statics.findByCategory = function(category) {
  return this.find({ 
    category, 
    isPublished: true, 
    status: 'completed' 
  }).sort({ publishedAt: -1 });
};

projectSchema.statics.search = function(query) {
  return this.find({
    $and: [
      { isPublished: true, status: 'completed' },
      {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } },
          { 'technologies.frontend.name': { $regex: query, $options: 'i' } },
          { 'technologies.backend.name': { $regex: query, $options: 'i' } }
        ]
      }
    ]
  }).sort({ 'metrics.views': -1, publishedAt: -1 });
};

const Project = mongoose.model('Project', projectSchema);

export default Project;