import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Code, 
  Smartphone, 
  Globe, 
  Zap, 
  Users, 
  Award,
  CheckCircle,
  Star,
  Sparkles
} from 'lucide-react';

// Components
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import PortfolioPreview from '../components/home/PortfolioPreview';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import StatsSection from '../components/home/StatsSection';

const HomePage = () => {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Portfolio Preview */}
      <PortfolioPreview />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default HomePage;