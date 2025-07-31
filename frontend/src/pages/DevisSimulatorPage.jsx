import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Clock,
  Users,
  Zap,
  Download,
  Mail
} from 'lucide-react';

const DevisSimulatorPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    features: [],
    complexity: '',
    design: '',
    timeline: '',
    maintenance: '',
    contact: {
      name: '',
      email: '',
      company: ''
    }
  });

  const totalSteps = 6;

  const projectTypes = [
    {
      id: 'website',
      title: 'Site Web',
      description: 'Site vitrine, portfolio, blog',
      basePrice: 2500,
      icon: '🌐'
    },
    {
      id: 'webapp',
      title: 'Application Web',
      description: 'SPA, dashboard, plateforme',
      basePrice: 5000,
      icon: '💻'
    },
    {
      id: 'ecommerce',
      title: 'E-commerce',
      description: 'Boutique en ligne complète',
      basePrice: 4000,
      icon: '🛒'
    },
    {
      id: 'mobile',
      title: 'App Mobile',
      description: 'iOS, Android, cross-platform',
      basePrice: 8000,
      icon: '📱'
    },
    {
      id: 'fullstack',
      title: 'Application Fullstack',
      description: 'Frontend + Backend + BDD',
      basePrice: 10000,
      icon: '⚡'
    }
  ];

  const features = {
    website: [
      { id: 'cms', name: 'Système de gestion de contenu', price: 800 },
      { id: 'seo', name: 'Optimisation SEO avancée', price: 600 },
      { id: 'multilang', name: 'Site multilingue', price: 1200 },
      { id: 'blog', name: 'Blog intégré', price: 500 },
      { id: 'contact', name: 'Formulaires avancés', price: 300 }
    ],
    webapp: [
      { id: 'auth', name: 'Système d\'authentification', price: 1500 },
      { id: 'dashboard', name: 'Tableau de bord', price: 2000 },
      { id: 'api', name: 'API REST/GraphQL', price: 2500 },
      { id: 'realtime', name: 'Fonctionnalités temps réel', price: 1800 },
      { id: 'analytics', name: 'Analytics intégrés', price: 1000 }
    ],
    ecommerce: [
      { id: 'payment', name: 'Paiement en ligne (Stripe)', price: 1000 },
      { id: 'inventory', name: 'Gestion des stocks', price: 1500 },
      { id: 'shipping', name: 'Calcul de livraison', price: 800 },
      { id: 'reviews', name: 'Système d\'avis clients', price: 600 },
      { id: 'admin', name: 'Interface d\'administration', price: 2000 }
    ],
    mobile: [
      { id: 'push', name: 'Notifications push', price: 800 },
      { id: 'offline', name: 'Mode hors ligne', price: 1200 },
      { id: 'camera', name: 'Intégration caméra/photos', price: 600 },
      { id: 'maps', name: 'Géolocalisation/cartes', price: 1000 },
      { id: 'store', name: 'Publication sur les stores', price: 500 }
    ],
    fullstack: [
      { id: 'microservices', name: 'Architecture microservices', price: 3000 },
      { id: 'docker', name: 'Containerisation Docker', price: 1500 },
      { id: 'ci-cd', name: 'Pipeline CI/CD', price: 2000 },
      { id: 'monitoring', name: 'Monitoring et logs', price: 1200 },
      { id: 'scaling', name: 'Auto-scaling', price: 2500 }
    ]
  };

  const complexityOptions = [
    { id: 'simple', name: 'Simple', description: 'Fonctionnalités de base', multiplier: 1 },
    { id: 'medium', name: 'Moyen', description: 'Logique métier modérée', multiplier: 1.3 },
    { id: 'complex', name: 'Complexe', description: 'Logique avancée, intégrations', multiplier: 1.7 }
  ];

  const designOptions = [
    { id: 'template', name: 'Template adapté', description: 'Design existant personnalisé', price: 0 },
    { id: 'custom', name: 'Design sur mesure', description: 'Création complète', price: 2000 },
    { id: 'premium', name: 'Design premium', description: 'Animations, interactions', price: 4000 }
  ];

  const timelineOptions = [
    { id: 'standard', name: 'Standard', description: '6-12 semaines', multiplier: 1 },
    { id: 'fast', name: 'Accéléré', description: '3-6 semaines', multiplier: 1.4 },
    { id: 'express', name: 'Express', description: '1-3 semaines', multiplier: 1.8 }
  ];

  const maintenanceOptions = [
    { id: 'none', name: 'Aucune', description: 'Livraison uniquement', price: 0 },
    { id: 'basic', name: 'Basique', description: '3 mois de support', price: 500 },
    { id: 'extended', name: 'Étendue', description: '12 mois de support', price: 1500 }
  ];

  const calculatePrice = () => {
    if (!formData.projectType) return 0;

    const baseProject = projectTypes.find(p => p.id === formData.projectType);
    let total = baseProject.basePrice;

    // Ajouter les fonctionnalités
    const projectFeatures = features[formData.projectType] || [];
    formData.features.forEach(featureId => {
      const feature = projectFeatures.find(f => f.id === featureId);
      if (feature) total += feature.price;
    });

    // Appliquer la complexité
    const complexity = complexityOptions.find(c => c.id === formData.complexity);
    if (complexity) total *= complexity.multiplier;

    // Ajouter le design
    const design = designOptions.find(d => d.id === formData.design);
    if (design) total += design.price;

    // Appliquer le délai
    const timeline = timelineOptions.find(t => t.id === formData.timeline);
    if (timeline) total *= timeline.multiplier;

    // Ajouter la maintenance
    const maintenance = maintenanceOptions.find(m => m.id === formData.maintenance);
    if (maintenance) total += maintenance.price;

    return Math.round(total);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleFeature = (featureId) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(id => id !== featureId)
        : [...prev.features, featureId]
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Quel type de projet souhaitez-vous réaliser ?
              </h2>
              <p className="text-gray-600">
                Sélectionnez le type de projet qui correspond le mieux à vos besoins.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectTypes.map((type) => (
                <motion.button
                  key={type.id}
                  onClick={() => updateFormData('projectType', type.id)}
                  className={`p-6 rounded-lg border-2 text-left transition-all duration-200 ${
                    formData.projectType === type.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-3xl mb-3">{type.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                  <p className="text-primary-600 font-medium">
                    À partir de {type.basePrice.toLocaleString()}€
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 2:
        const currentFeatures = features[formData.projectType] || [];
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Quelles fonctionnalités souhaitez-vous ?
              </h2>
              <p className="text-gray-600">
                Sélectionnez les fonctionnalités qui vous intéressent.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentFeatures.map((feature) => (
                <motion.button
                  key={feature.id}
                  onClick={() => toggleFeature(feature.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    formData.features.includes(feature.id)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">{feature.name}</h3>
                      <p className="text-primary-600 font-medium">+{feature.price}€</p>
                    </div>
                    {formData.features.includes(feature.id) && (
                      <CheckCircle className="w-5 h-5 text-primary-500" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Quel niveau de complexité ?
              </h2>
              <p className="text-gray-600">
                Évaluez la complexité technique de votre projet.
              </p>
            </div>
            
            <div className="space-y-4">
              {complexityOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => updateFormData('complexity', option.id)}
                  className={`w-full p-6 rounded-lg border-2 text-left transition-all duration-200 ${
                    formData.complexity === option.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{option.name}</h3>
                      <p className="text-gray-600">{option.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary-600 font-medium">
                        x{option.multiplier}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Quel type de design ?
              </h2>
              <p className="text-gray-600">
                Choisissez l'approche design qui vous convient.
              </p>
            </div>
            
            <div className="space-y-4">
              {designOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => updateFormData('design', option.id)}
                  className={`w-full p-6 rounded-lg border-2 text-left transition-all duration-200 ${
                    formData.design === option.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{option.name}</h3>
                      <p className="text-gray-600">{option.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary-600 font-medium">
                        {option.price > 0 ? `+${option.price}€` : 'Inclus'}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Quel délai souhaitez-vous ?
              </h2>
              <p className="text-gray-600">
                Sélectionnez le délai qui correspond à vos contraintes.
              </p>
            </div>
            
            <div className="space-y-4">
              {timelineOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => updateFormData('timeline', option.id)}
                  className={`w-full p-6 rounded-lg border-2 text-left transition-all duration-200 ${
                    formData.timeline === option.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{option.name}</h3>
                      <p className="text-gray-600">{option.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary-600 font-medium">
                        x{option.multiplier}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-gray-900 mb-4">Maintenance et support</h3>
              <div className="space-y-3">
                {maintenanceOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => updateFormData('maintenance', option.id)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      formData.maintenance === option.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{option.name}</h4>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                      <p className="text-primary-600 font-medium">
                        {option.price > 0 ? `+${option.price}€` : 'Gratuit'}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        const estimatedPrice = calculatePrice();
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Votre devis estimatif
              </h2>
              <div className="text-5xl font-bold text-primary-600 mb-4">
                {estimatedPrice.toLocaleString()}€
              </div>
              <p className="text-gray-600">
                Prix indicatif basé sur vos sélections
              </p>
            </div>

            {/* Récapitulatif */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Récapitulatif de votre projet</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Type de projet :</span>
                  <span className="font-medium">
                    {projectTypes.find(p => p.id === formData.projectType)?.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Fonctionnalités :</span>
                  <span className="font-medium">{formData.features.length} sélectionnées</span>
                </div>
                <div className="flex justify-between">
                  <span>Complexité :</span>
                  <span className="font-medium">
                    {complexityOptions.find(c => c.id === formData.complexity)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Design :</span>
                  <span className="font-medium">
                    {designOptions.find(d => d.id === formData.design)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Délai :</span>
                  <span className="font-medium">
                    {timelineOptions.find(t => t.id === formData.timeline)?.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Recevez votre devis détaillé
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="input-field"
                  value={formData.contact.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, name: e.target.value }
                  }))}
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  className="input-field"
                  value={formData.contact.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, email: e.target.value }
                  }))}
                />
              </div>
              <input
                type="text"
                placeholder="Votre entreprise (optionnel)"
                className="input-field mb-4"
                value={formData.contact.company}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  contact: { ...prev.contact, company: e.target.value }
                }))}
              />
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="btn-primary flex items-center justify-center space-x-2 flex-1">
                  <Mail className="w-4 h-4" />
                  <span>Recevoir le devis détaillé</span>
                </button>
                <button className="btn-outline flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Télécharger PDF</span>
                </button>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>
                Ce devis est indicatif. Le prix final sera ajusté selon vos besoins spécifiques 
                lors de notre échange.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-600 rounded-full px-4 py-2 mb-6">
            <Calculator className="w-4 h-4" />
            <span className="text-sm font-medium">Simulateur de devis</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Estimez le coût de votre{' '}
            <span className="gradient-text">projet</span>
          </h1>
          
          <p className="text-xl text-gray-600">
            Obtenez une estimation personnalisée en quelques clics
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Étape {currentStep} sur {totalSteps}
            </span>
            <span className="text-sm font-medium text-primary-600">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          className="bg-white rounded-2xl shadow-soft p-8 mb-8"
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Précédent</span>
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !formData.projectType) ||
                (currentStep === 3 && !formData.complexity) ||
                (currentStep === 4 && !formData.design) ||
                (currentStep === 5 && (!formData.timeline || !formData.maintenance))
              }
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Suivant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-2">
                Estimation basée sur vos sélections
              </p>
              <div className="text-2xl font-bold text-primary-600">
                {calculatePrice().toLocaleString()}€
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DevisSimulatorPage;