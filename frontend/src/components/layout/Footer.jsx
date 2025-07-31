import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Code, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter,
  Heart,
  Sparkles
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Développement Web', href: '/services#web-dev' },
      { name: 'Applications Mobile', href: '/services#mobile-dev' },
      { name: 'Consulting Tech', href: '/services#consulting' },
      { name: 'Maintenance & Support', href: '/services#support' },
    ],
    company: [
      { name: 'À propos', href: '/about' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Blog', href: '/blog' },
      { name: 'Carrières', href: '/careers' },
    ],
    legal: [
      { name: 'Mentions légales', href: '/legal' },
      { name: 'Politique de confidentialité', href: '/privacy' },
      { name: 'CGV', href: '/terms' },
      { name: 'Cookies', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/frejusdev' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/frejusdev' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/frejusdev' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'contact@frejusdev.com', href: 'mailto:contact@frejusdev.com' },
    { icon: Phone, text: '+33 6 XX XX XX XX', href: 'tel:+33600000000' },
    { icon: MapPin, text: 'Paris, France', href: '#' },
  ];

  return (
    <footer className="bg-dark-50 text-dark-900 border-t border-dark-200">
      <div className="container-custom">
        {/* Section principale */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Branding & Description */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-6 group">
                <div className="relative">
                  <Code className="w-8 h-8 text-primary-500 group-hover:text-primary-600 transition-colors duration-200" />
                  <Sparkles className="w-4 h-4 text-accent-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <span className="text-xl font-bold gradient-text">
                  FrejusDev
                </span>
              </Link>
              
              <p className="text-dark-600 mb-6 leading-relaxed">
                Votre partenaire technologique pour des solutions web innovantes et performantes. 
                De l'idée à la réalisation, nous transformons vos projets en succès numériques.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-3 text-dark-600 hover:text-primary-500 transition-colors duration-200 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <item.icon className="w-4 h-4 group-hover:text-primary-500 transition-colors duration-200" />
                    <span className="text-sm">{item.text}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold text-dark-900 mb-6">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-dark-600 hover:text-primary-500 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Entreprise */}
            <div>
              <h3 className="text-lg font-semibold text-dark-900 mb-6">Entreprise</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-dark-600 hover:text-primary-500 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div>
              <h3 className="text-lg font-semibold text-dark-900 mb-6">Restez connecté</h3>
              
              {/* Newsletter */}
              <div className="mb-6">
                <p className="text-dark-600 text-sm mb-4">
                  Recevez nos dernières actualités et conseils tech.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-4 py-2 bg-white border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full btn-primary text-sm py-2"
                  >
                    S'abonner
                  </button>
                </form>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-dark-600 text-sm mb-4">Suivez-nous</p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-dark-200 hover:bg-primary-500 text-dark-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section bottom */}
        <div className="py-8 border-t border-dark-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-dark-600 text-sm">
              <span>© {currentYear} FrejusDev. Fait avec</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>à Paris</span>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center space-x-6">
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-dark-600 hover:text-primary-500 transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;