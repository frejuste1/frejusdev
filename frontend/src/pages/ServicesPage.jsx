import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Smartphone, 
  Globe, 
  Database, 
  Zap, 
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Users,
  Award
} from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      id: 'web-development',
      icon: Globe,
      title: 'Développement Web',
      description: 'Sites web modernes et applications web performantes avec les dernières technologies.',
      longDescription: 'Je crée des sites web et applications web sur mesure, optimisés pour la performance et l\'expérience utilisateur. De la simple vitrine au portail complexe, chaque projet est développé avec les meilleures pratiques du web moderne.',
      features: [
        'Sites web responsive et modernes',
        'Applications web single-page (SPA)',
        'Progressive Web Apps (PWA)',
        'Optimisation SEO et performance',
        'Intégration CMS (Headless)',
        'E-commerce et boutiques en ligne'
      ],
      technologies: ['React', 'Vue.js', 'Next.js', 'Nuxt.js', 'TypeScript', 'Tailwind CSS'],
      pricing: 'À partir de 2 500€',
      duration: '2-8 semaines',
      color: 'primary',
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      id: 'mobile-development',
      icon: Smartphone,
      title: 'Applications Mobile',
      description: 'Applications mobiles natives et cross-platform pour iOS et Android.',
      longDescription: 'Développement d\'applications mobiles performantes et intuitives. Que ce soit en natif ou cross-platform, je m\'assure que votre app offre une expérience utilisateur exceptionnelle sur tous les appareils.',
      features: [
        'Applications iOS et Android',
        'Développement cross-platform',
        'Interface utilisateur intuitive',
        'Intégration API et services cloud',
        'Notifications push',
        'Publication sur les stores'
      ],
      technologies: ['React Native', 'Flutter', 'Expo', 'Firebase', 'Redux', 'Native APIs'],
      pricing: 'À partir de 5 000€',
      duration: '6-16 semaines',
      color: 'secondary',
      gradient: 'from-secondary-400 to-secondary-500'
    },
    {
      id: 'backend-api',
      icon: Database,
      title: 'Backend & API',
      description: 'Architectures backend robustes et APIs RESTful/GraphQL sécurisées.',
      longDescription: 'Conception et développement d\'architectures backend scalables et sécurisées. APIs REST ou GraphQL, bases de données optimisées, authentification avancée et déploiement cloud.',
      features: [
        'APIs REST et GraphQL',
        'Bases de données optimisées',
        'Authentification et autorisation',
        'Architecture microservices',
        'Intégrations tierces',
        'Monitoring et logging'
      ],
      technologies: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis', 'Docker'],
      pricing: 'À partir de 3 500€',
      duration: '4-12 semaines',
      color: 'accent',
      gradient: 'from-accent-400 to-accent-500'
    },
    {
      id: 'performance',
      icon: Zap,
      title: 'Optimisation Performance',
      description: 'Amélioration des performances et de la vitesse de vos applications.',
      longDescription: 'Audit complet et optimisation de vos applications existantes. J\'améliore les temps de chargement, l\'expérience utilisateur et le référencement naturel grâce aux meilleures pratiques de performance.',
      features: [
        'Audit de performance complet',
        'Optimisation Core Web Vitals',
        'Mise en cache avancée',
        'Optimisation des images',
        'Lazy loading et code splitting',
        'Monitoring continu'
      ],
      technologies: ['Lighthouse', 'WebPageTest', 'CDN', 'Service Workers', 'Webpack', 'Vite'],
      pricing: 'À partir de 1 500€',
      duration: '1-4 semaines',
      color: 'success',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'security',
      icon: Shield,
      title: 'Sécurité & Maintenance',
      description: 'Sécurisation et maintenance continue de vos applications.',
      longDescription: 'Sécurisation complète de vos applications et maintenance préventive. Audits de sécurité, mise à jour des dépendances, sauvegardes automatisées et monitoring 24/7.',
      features: [
        'Audit de sécurité complet',
        'Mise à jour des dépendances',
        'Sauvegardes automatisées',
        'Monitoring 24/7',
        'Certificats SSL/TLS',
        'Protection contre les attaques'
      ],
      technologies: ['OWASP', 'SSL/TLS', 'JWT', 'OAuth', 'Helmet.js', 'Rate Limiting'],
      pricing: 'À partir de 800€/mois',
      duration: 'Service continu',
      color: 'warning',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'consulting',
      icon: Code,
      title: 'Consulting Tech',
      description: 'Conseil en architecture technique et choix technologiques.',
      longDescription: 'Accompagnement stratégique pour vos projets techniques. Choix de la stack technologique, architecture système, code review et formation de vos équipes.',
      features: [
        'Choix de stack technologique',
        'Architecture système',
        'Code review et audit',
        'Formation des équipes',
        'Stratégie technique',
        'Accompagnement projet'
      ],
      technologies: ['Architecture', 'Best Practices', 'Code Review', 'Mentoring', 'Documentation'],
      pricing: 'À partir de 150€/heure',
      duration: 'Sur mesure',
      color: 'info',
      gradient: 'from-blue-500 to-blue-600'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Analyse des besoins',
      description: 'Échange approfondi pour comprendre vos objectifs et contraintes.'
    },
    {
      step: '02',
      title: 'Proposition technique',
      description: 'Présentation de la solution technique et du planning détaillé.'
    },
    {
      step: '03',
      title: 'Développement',
      description: 'Réalisation du projet avec points d\'étape réguliers.'
    },
    {
      step: '04',
      title: 'Tests & Livraison',
      description: 'Tests complets, formation et mise en production.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-600 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Services</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Des solutions complètes pour{' '}
              <span className="gradient-text">tous vos besoins</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              De la conception à la mise en production, je vous accompagne à chaque étape 
              de votre projet digital avec expertise et passion.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/devis-simulator"
                className="btn-primary flex items-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Simulateur de devis</span>
              </Link>
              <Link
                to="/contact"
                className="btn-outline flex items-center space-x-2"
              >
                <span>Discutons de votre projet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group card-hover relative overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.longDescription}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 4).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Technologies :</h4>
                  <div className="flex flex-wrap gap-1">
                    {service.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {service.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{service.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing & Duration */}
                <div className="flex items-center justify-between mb-6 text-sm">
                  <div>
                    <span className="text-gray-500">À partir de</span>
                    <div className="font-semibold text-primary-600">{service.pricing}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500">Durée</span>
                    <div className="font-semibold text-gray-900">{service.duration}</div>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to="/contact"
                  className="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors duration-300"
                >
                  <span className="text-sm">Demander un devis</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Mon processus de{' '}
              <span className="gradient-text">développement</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une méthodologie éprouvée pour garantir la réussite de votre projet.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-secondary-200 transform -translate-x-8" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, number: '30+', label: 'Clients satisfaits' },
              { icon: Code, number: '50+', label: 'Projets réalisés' },
              { icon: Award, number: '100%', label: 'Projets livrés' },
              { icon: Clock, number: '24h', label: 'Temps de réponse' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Discutons de vos besoins et créons ensemble la solution parfaite.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/devis-simulator"
                className="bg-white text-primary-600 hover:bg-accent-50 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>Simulateur de devis gratuit</span>
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center space-x-2"
              >
                <span>Contactez-moi</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;