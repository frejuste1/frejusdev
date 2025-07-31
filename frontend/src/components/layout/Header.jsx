import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code, Sparkles } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'Simulateur Devis', href: '/devis-simulator' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-neutral-200/50' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Code className="w-8 h-8 text-primary-500 group-hover:text-primary-600 transition-colors duration-200" />
              <Sparkles className="w-4 h-4 text-accent-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-xl font-bold gradient-text">
              FrejusDev
            </span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-500'
                    : 'text-gray-700 hover:text-primary-500'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden lg:block">
            <Link
              to="/devis-simulator"
              className="btn-primary"
            >
              Devis Gratuit
            </Link>
          </div>

          {/* Menu Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-neutral-200/50 shadow-soft"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-6 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-primary-500 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-neutral-200">
                  <Link
                    to="/devis-simulator"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary w-full text-center"
                  >
                    Devis Gratuit
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;