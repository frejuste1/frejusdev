import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle,
  Clock,
  MessageCircle,
  User,
  Building,
  Calendar
} from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

// Schema de validation
const contactSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Veuillez entrer une adresse email valide'),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Veuillez sélectionner un type de projet'),
  budget: z.string().min(1, 'Veuillez sélectionner une fourchette de budget'),
  timeline: z.string().min(1, 'Veuillez sélectionner un délai'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  newsletter: z.boolean().optional()
});

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(contactSchema)
  });

  const projectTypes = [
    { value: 'web-development', label: 'Développement Web' },
    { value: 'mobile-app', label: 'Application Mobile' },
    { value: 'fullstack-app', label: 'Application Fullstack' },
    { value: 'e-commerce', label: 'E-commerce' },
    { value: 'ui-ux-design', label: 'UI/UX Design' },
    { value: 'consulting', label: 'Consulting Tech' },
    { value: 'maintenance', label: 'Maintenance & Support' },
    { value: 'other', label: 'Autre' }
  ];

  const budgetRanges = [
    { value: '< 5k', label: 'Moins de 5 000€' },
    { value: '5k-10k', label: '5 000€ - 10 000€' },
    { value: '10k-25k', label: '10 000€ - 25 000€' },
    { value: '25k-50k', label: '25 000€ - 50 000€' },
    { value: '50k+', label: 'Plus de 50 000€' },
    { value: 'to-discuss', label: 'À discuter' }
  ];

  const timelines = [
    { value: 'asap', label: 'Dès que possible' },
    { value: '1-month', label: 'Dans le mois' },
    { value: '2-3-months', label: '2-3 mois' },
    { value: '3-6-months', label: '3-6 mois' },
    { value: '6-months+', label: 'Plus de 6 mois' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@frejusdev.com',
      href: 'mailto:contact@frejusdev.com',
      description: 'Réponse sous 24h'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+33 6 XX XX XX XX',
      href: 'tel:+33600000000',
      description: 'Lun-Ven 9h-18h'
    },
    {
      icon: MapPin,
      title: 'Localisation',
      value: 'Paris, France',
      href: '#',
      description: 'Disponible en remote'
    }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form data:', data);
      
      showSuccess('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
      reset();
    } catch (error) {
      showError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
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
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Contact</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Discutons de votre{' '}
            <span className="gradient-text">projet</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vous avez un projet en tête ? Parlons-en ! Je vous accompagne 
            de l'idée à la réalisation avec expertise et passion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Restons en contact
                </h2>
                <p className="text-gray-600 mb-8">
                  N'hésitez pas à me contacter pour discuter de votre projet. 
                  Je vous répondrai rapidement avec des conseils personnalisés.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300">
                      <info.icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-primary-600 font-medium mb-1">
                        {info.value}
                      </p>
                      <p className="text-sm text-gray-500">
                        {info.description}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Availability */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-semibold text-green-800">Disponible</span>
                </div>
                <p className="text-green-700 text-sm">
                  Actuellement disponible pour de nouveaux projets. 
                  Réponse garantie sous 24h.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-soft p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Parlez-moi de votre projet
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        {...register('firstName')}
                        className={`input-field pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                        placeholder="Votre prénom"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        {...register('lastName')}
                        className={`input-field pl-10 ${errors.lastName ? 'border-red-500' : ''}`}
                        placeholder="Votre nom"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        {...register('email')}
                        className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="votre@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        {...register('phone')}
                        className="input-field pl-10"
                        placeholder="+33 6 XX XX XX XX"
                      />
                    </div>
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entreprise
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      {...register('company')}
                      className="input-field pl-10"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de projet *
                    </label>
                    <select
                      {...register('projectType')}
                      className={`input-field ${errors.projectType ? 'border-red-500' : ''}`}
                    >
                      <option value="">Sélectionner</option>
                      {projectTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget *
                    </label>
                    <select
                      {...register('budget')}
                      className={`input-field ${errors.budget ? 'border-red-500' : ''}`}
                    >
                      <option value="">Sélectionner</option>
                      {budgetRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                    {errors.budget && (
                      <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Délai souhaité *
                    </label>
                    <select
                      {...register('timeline')}
                      className={`input-field ${errors.timeline ? 'border-red-500' : ''}`}
                    >
                      <option value="">Sélectionner</option>
                      {timelines.map((timeline) => (
                        <option key={timeline.value} value={timeline.value}>
                          {timeline.label}
                        </option>
                      ))}
                    </select>
                    {errors.timeline && (
                      <p className="text-red-500 text-sm mt-1">{errors.timeline.message}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Décrivez votre projet *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={6}
                    className={`input-field resize-none ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Décrivez votre projet, vos objectifs, vos contraintes techniques, etc."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Newsletter */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    {...register('newsletter')}
                    id="newsletter"
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-600">
                    Je souhaite recevoir des conseils et actualités tech (optionnel)
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center space-x-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>
              </form>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">
                      Que se passe-t-il après ?
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Réponse sous 24h avec mes premières recommandations</li>
                      <li>• Appel de découverte gratuit (30 min)</li>
                      <li>• Proposition technique détaillée et devis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;