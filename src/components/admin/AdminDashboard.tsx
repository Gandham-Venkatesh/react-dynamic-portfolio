import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  FolderOpen, 
  Settings, 
  Eye, 
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit3
} from 'lucide-react';
import { PortfolioData, Project } from '../../types';

interface AdminDashboardProps {
  data: PortfolioData;
  updateData: (newData: Partial<PortfolioData>) => void;
  onLogout: () => void;
  darkMode: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  data, 
  updateData, 
  onLogout, 
  darkMode 
}) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: '',
    description: '',
    link: '',
    tags: [],
    visible: true
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'projects', name: 'Projects', icon: FolderOpen },
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'preview', name: 'Preview', icon: Eye }
  ];

  const handlePersonalInfoUpdate = (field: string, value: string | string[]) => {
    updateData({
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  const handleAddProject = () => {
    if (newProject.name && newProject.description && newProject.link) {
      const project: Project = {
        id: Date.now().toString(),
        name: newProject.name,
        description: newProject.description,
        link: newProject.link,
        tags: newProject.tags || [],
        visible: newProject.visible || true
      };
      
      updateData({
        projects: [...data.projects, project]
      });
      
      setNewProject({
        name: '',
        description: '',
        link: '',
        tags: [],
        visible: true
      });
    }
  };

  const handleDeleteProject = (id: string) => {
    updateData({
      projects: data.projects.filter(p => p.id !== id)
    });
  };

  const handleToggleProjectVisibility = (id: string) => {
    updateData({
      projects: data.projects.map(p => 
        p.id === id ? { ...p, visible: !p.visible } : p
      )
    });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className={`text-2xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Admin Dashboard
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              <LogOut size={16} />
              Logout
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                          : darkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} />
                      {tab.name}
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Profile Information
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Name
                      </label>
                      <input
                        type="text"
                        value={data.personalInfo.name}
                        onChange={(e) => handlePersonalInfoUpdate('name', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={data.personalInfo.email}
                        onChange={(e) => handlePersonalInfoUpdate('email', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        value={data.personalInfo.github}
                        onChange={(e) => handlePersonalInfoUpdate('github', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        value={data.personalInfo.linkedin}
                        onChange={(e) => handlePersonalInfoUpdate('linkedin', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      About
                    </label>
                    <textarea
                      value={data.personalInfo.about}
                      onChange={(e) => handlePersonalInfoUpdate('about', e.target.value)}
                      rows={4}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Professional Summary
                    </label>
                    <textarea
                      value={data.personalInfo.professionalSummary}
                      onChange={(e) => handlePersonalInfoUpdate('professionalSummary', e.target.value)}
                      rows={6}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Projects Management
                    </h2>
                  </div>
                  
                  {/* Add New Project */}
                  <div className={`p-4 rounded-lg border-2 border-dashed ${
                    darkMode ? 'border-gray-600' : 'border-gray-300'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Add New Project
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Project Name"
                        value={newProject.name || ''}
                        onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                        className={`px-4 py-2 rounded-lg border ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      />
                      <input
                        type="url"
                        placeholder="Project Link"
                        value={newProject.link || ''}
                        onChange={(e) => setNewProject({...newProject, link: e.target.value})}
                        className={`px-4 py-2 rounded-lg border ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      />
                    </div>
                    <textarea
                      placeholder="Project Description"
                      value={newProject.description || ''}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      rows={3}
                      className={`w-full px-4 py-2 rounded-lg border mb-4 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    <input
                      type="text"
                      placeholder="Tags (comma separated)"
                      onChange={(e) => setNewProject({
                        ...newProject, 
                        tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                      })}
                      className={`w-full px-4 py-2 rounded-lg border mb-4 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddProject}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                    >
                      <Plus size={16} />
                      Add Project
                    </motion.button>
                  </div>
                  
                  {/* Existing Projects */}
                  <div className="space-y-4">
                    {data.projects.map((project) => (
                      <div
                        key={project.id}
                        className={`p-4 rounded-lg border ${
                          darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={`text-lg font-semibold ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {project.name}
                          </h4>
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleToggleProjectVisibility(project.id)}
                              className={`p-2 rounded-lg ${
                                project.visible
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-500 text-white'
                              }`}
                            >
                              <Eye size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteProject(project.id)}
                              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </div>
                        <p className={`text-sm mb-2 ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded-full text-xs ${
                                darkMode
                                  ? 'bg-gray-600 text-gray-300'
                                  : 'bg-gray-200 text-gray-700'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Settings
                  </h2>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Resume Download Link
                    </label>
                    <input
                      type="url"
                      value={data.personalInfo.resumeLink}
                      onChange={(e) => handlePersonalInfoUpdate('resumeLink', e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'preview' && (
                <div className="space-y-6">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Live Preview
                  </h2>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Open the main site in a new tab to see your changes live.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open('/', '_blank')}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Open Portfolio
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;