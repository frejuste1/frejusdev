import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  FileText, 
  BarChart3, 
  Settings,
  Mail,
  Calendar,
  TrendingUp,
  Eye,
  MessageSquare
} from 'lucide-react';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', name: 'Tableau de bord', icon: BarChart3 },
    { id: 'projects', name: 'Projets', icon: FileText },
    { id: 'contacts', name: 'Contacts', icon: Mail },
    { id: 'users', name: 'Utilisateurs', icon: Users },
    { id: 'settings', name: 'Paramètres', icon: Settings },
  ];

  const stats = [
    {
      title: 'Projets actifs',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: FileText,
      color: 'primary'
    },
    {
      title: 'Nouveaux contacts',
      value: '28',
      change: '+8',
      changeType: 'positive',
      icon: Mail,
      color: 'secondary'
    },
    {
      title: 'Devis générés',
      value: '45',
      change: '+12',
      changeType: 'positive',
      icon: Calendar,
      color: 'accent'
    },
    {
      title: 'Taux de conversion',
      value: '68%',
      change: '+5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'success'
    }
  ];

  const recentProjects = [
    {
      id: 1,
      name: 'E-commerce Platform',
      client: 'TechCommerce',
      status: 'En cours',
      progress: 75,
      deadline: '2024-02-15'
    },
    {
      id: 2,
      name: 'Mobile App',
      client: 'StartupXYZ',
      status: 'En attente',
      progress: 30,
      deadline: '2024-03-01'
    },
    {
      id: 3,
      name: 'Website Redesign',
      client: 'Creative Agency',
      status: 'Terminé',
      progress: 100,
      deadline: '2024-01-20'
    }
  ];

  const recentContacts = [
    {
      id: 1,
      name: 'Marie Dubois',
      email: 'marie@example.com',
      project: 'Site e-commerce',
      date: '2024-01-25',
      status: 'Nouveau'
    },
    {
      id: 2,
      name: 'Thomas Martin',
      email: 'thomas@example.com',
      project: 'App mobile',
      date: '2024-01-24',
      status: 'Contacté'
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      email: 'sophie@example.com',
      project: 'Consulting',
      date: '2024-01-23',
      status: 'Devis envoyé'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'from-primary-500 to-primary-600',
      secondary: 'from-secondary-400 to-secondary-500',
      accent: 'from-accent-400 to-accent-500',
      success: 'from-green-500 to-green-600'
    };
    return colorMap[color] || colorMap.primary;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'En cours':
        return 'bg-blue-100 text-blue-800';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Terminé':
        return 'bg-green-100 text-green-800';
      case 'Nouveau':
        return 'bg-purple-100 text-purple-800';
      case 'Contacté':
        return 'bg-blue-100 text-blue-800';
      case 'Devis envoyé':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-soft p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">ce mois</span>
                </div>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br ${getColorClasses(stat.color)} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <motion.div
          className="bg-white rounded-lg shadow-soft p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Projets récents
          </h3>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Client: {project.client}</p>
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Contacts */}
        <motion.div
          className="bg-white rounded-lg shadow-soft p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Contacts récents
          </h3>
          <div className="space-y-4">
            {recentContacts.map((contact) => (
              <div key={contact.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{contact.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{contact.email}</p>
                <p className="text-sm text-gray-500">Projet: {contact.project}</p>
                <p className="text-xs text-gray-400 mt-1">{contact.date}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'projects':
        return (
          <div className="bg-white rounded-lg shadow-soft p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Gestion des projets</h2>
            <p className="text-gray-600">Interface de gestion des projets en cours de développement...</p>
          </div>
        );
      case 'contacts':
        return (
          <div className="bg-white rounded-lg shadow-soft p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Gestion des contacts</h2>
            <p className="text-gray-600">Interface de gestion des contacts en cours de développement...</p>
          </div>
        );
      case 'users':
        return (
          <div className="bg-white rounded-lg shadow-soft p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Gestion des utilisateurs</h2>
            <p className="text-gray-600">Interface de gestion des utilisateurs en cours de développement...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-soft p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Paramètres</h2>
            <p className="text-gray-600">Interface de paramètres en cours de développement...</p>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
              <p className="text-gray-600">Tableau de bord administrateur</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;