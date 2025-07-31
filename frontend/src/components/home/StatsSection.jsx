import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Users, 
  Award, 
  Clock,
  TrendingUp,
  Shield
} from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Code,
      number: '50+',
      label: 'Projets réalisés',
      description: 'Applications web et mobiles développées',
      color: 'primary'
    },
    {
      icon: Users,
      number: '30+',
      label: 'Clients satisfaits',
      description: 'Startups et entreprises accompagnées',
      color: 'secondary'
    },
    {
      icon: Award,
      number: '100%',
      label: 'Projets livrés',
      description: 'Respect des délais et cahiers des charges',
      color: 'accent'
    },
    {
      icon: Clock,
      number: '24h',
      label: 'Temps de réponse',
      description: 'Support et communication réactive',
      color: 'success'
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

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'from-primary-500 to-primary-600',
      secondary: 'from-secondary-400 to-secondary-500',
      accent: 'from-accent-400 to-accent-500',
      success: 'from-green-500 to-green-600'
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group text-center"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="relative">
                {/* Background Circle */}
                <div className="absolute inset-0 bg-white rounded-2xl shadow-soft group-hover:shadow-medium transition-all duration-300" />
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${getColorClasses(stat.color)} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Number */}
                  <motion.div
                    className="text-4xl font-bold text-gray-900 mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 300, 
                      damping: 25,
                      delay: index * 0.1 + 0.3
                    }}
                  >
                    {stat.number}
                  </motion.div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-green-200 rounded-full px-6 py-3 shadow-soft">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-green-700 font-medium">Garantie satisfaction 100%</span>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;