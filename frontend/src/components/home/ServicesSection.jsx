import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  Globe, 
  Database, 
  Zap, 
  Shield,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Globe,
      title: 'Développement Web',
      description: 'Sites web modernes et applications web performantes avec les dernières technologies.',
      features: ['React/Vue.js', 'Node.js/Express', 'Responsive Design', 'SEO Optimisé'],
      color: 'primary',
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      icon: Smartphone,
      title: 'Applications Mobile',
      description: 'Applications mobiles natives et cross-platform pour iOS et Android.',
      features: ['React Native', 'Flutter', 'Progressive Web Apps', 'App Store Deploy'],
      color: 'secondary',
      gradient: 'from-secondary-400 to-secondary-500'
    },
    {
      icon: Database,
      title: 'Backend & API',
      description: 'Architectures backend robustes et APIs RESTful/GraphQL sécurisées.',
      features: ['Node.js/Python', 'MongoDB/PostgreSQL', 'Authentication', 'Cloud Deploy'],
      color: 'accent',
      gradient: 'from-accent-400 to-accent-500'
    },
    {
      icon: Zap,
      title: 'Optimisation Performance',
      description: 'Amélioration des performances et de la vitesse de vos applications.',
      features: ['Core Web Vitals', 'Lazy Loading', 'Caching Strategy', 'CDN Setup'],
      color: 'success',
      gradient: 'from-success-500 to-success-600'
    },
    {
      icon: Shield,
      title: 'Sécurité & Maintenance',
      description: 'Sécurisation et maintenance continue de vos applications.',
      features: ['Security Audit', 'SSL/HTTPS', 'Backup Strategy', 'Monitoring'],
      color: 'warning',
      gradient: 'from-warning-500 to-warning-600'
    },
    {
      icon: Code,
      title: 'Consulting Tech',
      description: 'Conseil en architecture technique et choix technologiques.',
      features: ['Tech Stack', 'Code Review', 'Best Practices', 'Team Training'],
      color: 'info',
      gradient: 'from-info-500 to-info-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-600 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Services</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Des solutions complètes pour{' '}
            <span className="gradient-text">tous vos besoins</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            De la conception à la mise en production, je vous accompagne à chaque étape 
            de votre projet digital avec expertise et passion.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
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
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors duration-300">
                <span className="text-sm">En savoir plus</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-600 mb-8">
            Vous avez un projet en tête ? Discutons-en ensemble !
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
              <Zap className="w-4 h-4" />
              <span>Simulateur de devis</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;