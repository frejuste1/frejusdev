import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

// Components
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/common/ScrollToTop';
import NotificationContainer from '../components/common/NotificationContainer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <motion.main 
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      
      <Footer />
      
      {/* Composants utilitaires */}
      <ScrollToTop />
      <NotificationContainer />
    </div>
  );
};

export default MainLayout;