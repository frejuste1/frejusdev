import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import DevisSimulatorPage from './pages/DevisSimulatorPage';
import AdminPage from './pages/AdminPage';

// Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Router>
          <div className="App min-h-screen bg-white dark:bg-dark-50 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="portfolio" element={<PortfolioPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="devis-simulator" element={<DevisSimulatorPage />} />
                <Route path="admin" element={<AdminPage />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;