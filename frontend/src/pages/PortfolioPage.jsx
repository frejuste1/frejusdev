import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  ExternalLink, 
  Github, 
  Search,
  Code,
  Smartphone,
  Globe,
  Database,
  Palette,
  ShoppingCart
} from 'lucide-react';

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Tous les projets', icon: Filter },
    { id: 'web-development', name: 'Développement Web', icon: Code },
    { id: 'mobile-development', name: 'Applications Mobile', icon: Smartphone },
    { id: 'fullstack-application', name: 'Applications Fullstack', icon: Database },
    { id: 'ui-ux-design', name: 'UI/UX Design', icon: Palette },
    { id: 'e-commerce', name: 'E-commerce', icon: ShoppingCart },
  ];

  // Données d'exemple pour les projets
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Plateforme e-commerce complète avec gestion des stocks, paiements Stripe et analytics avancés.',
      longDescription: 'Une solution e-commerce moderne développée avec React et Node.js, intégrant un système de paiement sécurisé, une gestion avancée des stocks, et un tableau de bord analytique complet.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'e-commerce',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
      links: {
        live: '#',
        github: '#'
      },
      featured: true,
      status: 'completed',
      duration: '3 mois',
      client: 'TechCommerce'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Application de gestion de tâches collaborative avec temps réel et notifications.',
      longDescription: 'Application web collaborative permettant la gestion de projets en équipe avec des fonctionnalités temps réel, système de notifications et intégrations multiples.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'fullstack-application',
      technologies: ['Vue.js', 'Express', 'Socket.io', 'PostgreSQL', 'Redis'],
      links: {
        live: '#',
        github: '#'
      },
      status: 'completed',
      duration: '2 mois',
      client: 'ProductiveCorp'
    },
    {
      id: 3,
      title: 'Restaurant Website',
      description: 'Site vitrine moderne avec système de réservation en ligne et menu interactif.',
      longDescription: 'Site web responsive pour restaurant avec système de réservation intégré, menu interactif et galerie photos optimisée.',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'web-development',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Sanity CMS'],
      links: {
        live: '#',
        github: '#'
      },
      status: 'completed',
      duration: '1 mois',
      client: 'Le Gourmet'
    },
    {
      id: 4,
      title: 'Fitness Mobile App',
      description: 'Application mobile de fitness avec suivi des entraînements et programmes personnalisés.',
      longDescription: 'Application mobile cross-platform pour le suivi fitness avec programmes d\'entraînement personnalisés, tracking des performances et communauté intégrée.',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'mobile-development',
      technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
      links: {
        live: '#',
        github: '#'
      },
      status: 'completed',
      duration: '4 mois',
      client: 'FitLife'
    },
    {
      id: 5,
      title: 'Portfolio Designer',
      description: 'Portfolio créatif pour designer avec animations avancées et galerie interactive.',
      longDescription: 'Portfolio sur mesure pour designer graphique avec animations fluides, galerie interactive et système de contact intégré.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'ui-ux-design',
      technologies: ['Next.js', 'Three.js', 'GSAP', 'Contentful'],
      links: {
        live: '#',
        github: '#'
      },
      status: 'completed',
      duration: '6 semaines',
      client: 'Creative Studio'
    },
    {
      id: 6,
      title: 'SaaS Dashboard',
      description: 'Tableau de bord SaaS avec analytics en temps réel et gestion multi-tenant.',
      longDescription: 'Interface d\'administration complète pour application SaaS avec analytics temps réel, gestion des utilisateurs et architecture multi-tenant.',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'fullstack-application',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Chart.js'],
      links: {
        live: '#',
        github: '#'
      },
      status: 'completed',
      duration: '5 mois',
      client: 'DataFlow'
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

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
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-600 rounded-full px-4 py-2 mb-6">
            <Code className="w-4 h-4" />
            <span className="text-sm font-medium">Portfolio</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Mes{' '}
            <span className="gradient-text">réalisations</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez une sélection de projets qui illustrent mon expertise 
            en développement web, mobile et design d'interfaces.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un projet ou une technologie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeFilter === category.id
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="text-sm">{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter + searchTerm}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group card-hover bg-white rounded-xl overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      Terminé
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-accent-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                        ⭐ Mis en avant
                      </span>
                    </div>
                  )}

                  {/* Overlay Links */}
                  <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.links.live}
                      className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full transition-colors duration-200"
                      title="Voir le projet"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <a
                      href={project.links.github}
                      className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full transition-colors duration-200"
                      title="Code source"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className="text-sm text-gray-500">{project.duration}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Client */}
                  <div className="text-sm text-primary-600 font-medium mb-4">
                    Client: {project.client}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center space-x-4">
                    <a
                      href={project.links.live}
                      className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Voir le projet</span>
                    </a>
                    <a
                      href={project.links.github}
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 font-medium transition-colors duration-200"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucun projet trouvé
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche ou de filtrage.
            </p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16 py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Prêt à créer votre projet ?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discutons de vos besoins et transformons votre vision en réalité digitale.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/contact"
              className="btn-primary flex items-center space-x-2"
            >
              <span>Démarrer un projet</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/devis-simulator"
              className="btn-outline flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Simulateur de devis</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioPage;