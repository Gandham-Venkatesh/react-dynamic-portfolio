import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  FolderOpen, 
  Settings, 
  Eye, 
  LogOut,
  Plus,
  Trash2,
  Wrench,
  Briefcase,      // New Icon
  GraduationCap   // New Icon
} from 'lucide-react';
// Import all the necessary types
import { PortfolioData, Project, Skill, SkillCategory, ExperienceItem, EducationItem } from '../../types';

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
  
  // Existing States
  const [newProject, setNewProject] = useState<Partial<Project>>({ name: '', description: '', link: '', tags: [], visible: true });
  const [newSkill, setNewSkill] = useState({ name: '', level: 80 });
  const [selectedCategory, setSelectedCategory] = useState(data.skills[0]?.category || '');
  const [newCategory, setNewCategory] = useState('');

  // --- NEW STATE FOR EXPERIENCE & EDUCATION ---
  const [newExperience, setNewExperience] = useState<Omit<ExperienceItem, 'id'>>({ role: '', company: '', duration: '', description: [''] });
  const [newEducation, setNewEducation] = useState<Omit<EducationItem, 'id'>>({ institution: '', degree: '', duration: '' });

  // --- FINAL UPDATED TABS ARRAY ---
  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'projects', name: 'Projects', icon: FolderOpen },
    { id: 'skills', name: 'Skills', icon: Wrench },
    { id: 'experience', name: 'Experience', icon: Briefcase }, // New Experience Tab
    { id: 'education', name: 'Education', icon: GraduationCap }, // New Education Tab
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
  
  
    // --- NEW HANDLERS FOR SKILLS ---
    const handleAddSkill = () => {
      if (!newSkill.name) {
        alert("Please enter a skill name.");
        return;
      }
      const targetCategoryName = newCategory.trim() || selectedCategory;
      if (!targetCategoryName) {
        alert("Please select or create a category.");
        return;
      }
  
      let updatedSkills = [...data.skills];
      const categoryIndex = updatedSkills.findIndex(c => c.category === targetCategoryName);
  
      const skillToAdd: Skill = { name: newSkill.name, level: Number(newSkill.level) };
  
      if (categoryIndex > -1) {
        const existingSkills = updatedSkills[categoryIndex].skills.map(s => s.name.toLowerCase());
        if (existingSkills.includes(skillToAdd.name.toLowerCase())) {
          alert(`Skill "${skillToAdd.name}" already exists in this category.`);
          return;
        }
        updatedSkills[categoryIndex].skills.push(skillToAdd);
      } else {
        const newCategoryData: SkillCategory = { category: targetCategoryName, skills: [skillToAdd] };
        updatedSkills.push(newCategoryData);
      }
      
      updateData({ skills: updatedSkills });
      setNewSkill({ name: '', level: 80 });
      setNewCategory('');
      setSelectedCategory(targetCategoryName);
    };
  
    const handleDeleteSkill = (categoryName: string, skillName: string) => {
      let updatedSkills = data.skills.map(category => {
        if (category.category === categoryName) {
          const newSkills = category.skills.filter(skill => skill.name !== skillName);
          return { ...category, skills: newSkills };
        }
        return category;
      });
      // Filter out any categories that are now empty
      updatedSkills = updatedSkills.filter(category => category.skills.length > 0);
      updateData({ skills: updatedSkills });
    };
    const handleAddExperience = () => {
    if (!newExperience.role || !newExperience.company || !newExperience.duration) {
      alert("Please fill all experience fields.");
      return;
    }
    const experienceToAdd: ExperienceItem = {
      id: Date.now().toString(),
      ...newExperience,
      description: newExperience.description.filter(d => d.trim() !== '') // Filter out empty description lines
    };
    updateData({ experiences: [...(data.experiences || []), experienceToAdd] });
    setNewExperience({ role: '', company: '', duration: '', description: [''] }); // Reset form
  };

  const handleDeleteExperience = (id: string) => {
    updateData({ experiences: data.experiences.filter(exp => exp.id !== id) });
  };
  
  const handleExperienceDescriptionChange = (index: number, value: string) => {
    const newDescriptions = [...newExperience.description];
    newDescriptions[index] = value;
    setNewExperience({ ...newExperience, description: newDescriptions });
  };
  
  const addExperienceDescriptionLine = () => {
    setNewExperience({ ...newExperience, description: [...newExperience.description, ''] });
  };


  // --- NEW HANDLERS FOR EDUCATION ---
  const handleAddEducation = () => {
    if (!newEducation.institution || !newEducation.degree || !newEducation.duration) {
      alert("Please fill all education fields.");
      return;
    }
    const educationToAdd: EducationItem = { id: Date.now().toString(), ...newEducation };
    updateData({ education: [...(data.education || []), educationToAdd] });
    setNewEducation({ institution: '', degree: '', duration: '' }); // Reset form
  };

  const handleDeleteEducation = (id: string) => {
    updateData({ education: data.education.filter(edu => edu.id !== id) });
  };


  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Admin Dashboard</h1>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onLogout} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200">
              <LogOut size={16} /> Logout
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 sticky top-24`}>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button key={tab.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${ activeTab === tab.id ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100' }`}>
                      <Icon size={20} /> {tab.name}
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </div>
 {/* Main Content */}
          <div className="lg:col-span-3">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              
              {/* Profile, Projects, Skills Tabs (Your Existing Code) */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Profile Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                      <input type="text" value={data.personalInfo.name} onChange={(e) => handlePersonalInfoUpdate('name', e.target.value)} className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                      <input type="email" value={data.personalInfo.email} onChange={(e) => handlePersonalInfoUpdate('email', e.target.value)} className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>GitHub URL</label>
                      <input type="url" value={data.personalInfo.github} onChange={(e) => handlePersonalInfoUpdate('github', e.target.value)} className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>LinkedIn URL</label>
                      <input type="url" value={data.personalInfo.linkedin} onChange={(e) => handlePersonalInfoUpdate('linkedin', e.target.value)} className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>About</label>
                    <textarea value={data.personalInfo.about} onChange={(e) => handlePersonalInfoUpdate('about', e.target.value)} rows={4} className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Professional Summary</label>
                    <textarea value={data.personalInfo.professionalSummary} onChange={(e) => handlePersonalInfoUpdate('professionalSummary', e.target.value)} rows={6} className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                  </div>
                </div>
              )}
              {activeTab === 'projects' && (
                              <div className="space-y-6">
                                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Projects Management</h2>
                                <div className={`p-4 rounded-lg border-2 border-dashed ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Project</h3>
                                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <input type="text" placeholder="Project Name" value={newProject.name || ''} onChange={(e) => setNewProject({...newProject, name: e.target.value})} className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                                    <input type="url" placeholder="Project Link" value={newProject.link || ''} onChange={(e) => setNewProject({...newProject, link: e.target.value})} className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                                  </div>
                                  <textarea placeholder="Project Description" value={newProject.description || ''} onChange={(e) => setNewProject({...newProject, description: e.target.value})} rows={3} className={`w-full px-4 py-2 rounded-lg border mb-4 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                                  <input type="text" placeholder="Tags (comma separated)" onChange={(e) => setNewProject({...newProject, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})} className={`w-full px-4 py-2 rounded-lg border mb-4 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                                  <motion.button onClick={handleAddProject} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"><Plus size={16} /> Add Project</motion.button>
                                </div>
                                <div className="space-y-4">
                                  {data.projects.map((project) => (
                                    <div key={project.id} className={`p-4 rounded-lg border ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                                      <div className="flex justify-between items-start mb-2">
                                        <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.name}</h4>
                                        <div className="flex gap-2">
                                          <motion.button onClick={() => handleToggleProjectVisibility(project.id)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={`p-2 rounded-lg ${project.visible ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}><Eye size={16} /></motion.button>
                                          <motion.button onClick={() => handleDeleteProject(project.id)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"><Trash2 size={16} /></motion.button>
                                        </div>
                                      </div>
                                      <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                                      <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, index) => (<span key={index} className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>{tag}</span>))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
             {activeTab === 'skills' && (
                             <div className="space-y-6">
                               <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Skills Management</h2>
                               <div className={`p-4 rounded-lg border-2 border-dashed ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                                 <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Skill</h3>
                                 <div className="grid md:grid-cols-2 gap-4">
                                   <input type="text" placeholder="Skill Name (e.g., React Native)" value={newSkill.name} onChange={(e) => setNewSkill({...newSkill, name: e.target.value})} className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                                   <div>
                                     <label className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Level: {newSkill.level}%</label>
                                     <input type="range" min="0" max="100" value={newSkill.level} onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                                   </div>
                                 </div>
                                 <div className="grid md:grid-cols-2 gap-4 mt-4">
                                   <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}>
                                     <option value="" disabled>-- Select Existing Category --</option>
                                     {data.skills.map(cat => <option key={cat.category} value={cat.category}>{cat.category}</option>)}
                                   </select>
                                   <input type="text" placeholder="Or Create New Category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                                 </div>
                                 <motion.button onClick={handleAddSkill} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200">
                                   <Plus size={16} /> Add Skill
                                 </motion.button>
                               </div>
                               <div className="space-y-4">
                                 {data.skills.map((category) => (
                                   <div key={category.category} className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                                     <h3 className={`text-lg font-bold mb-3 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{category.category}</h3>
                                     <div className="space-y-3">
                                       {category.skills.map(skill => (
                                         <div key={skill.name} className="flex items-center justify-between">
                                           <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{skill.name}</span>
                                           <div className="flex items-center gap-4">
                                             <span className="text-sm font-mono px-2 py-1 bg-indigo-100 text-indigo-800 rounded-md">{skill.level}%</span>
                                             <motion.button onClick={() => handleDeleteSkill(category.category, skill.name)} whileHover={{ scale: 1.1, color: '#ef4444' }} whileTap={{ scale: 0.9 }} className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                               <Trash2 size={16} />
                                             </motion.button>
                                           </div>
                                         </div>
                                       ))}
                                     </div>
                                   </div>
                                 ))}
                               </div>
                             </div>
                           )}

              {/* --- NEW EXPERIENCE MANAGEMENT TAB UI --- */}
              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Experience Management</h2>
                  <div className={`p-4 rounded-lg border-2 border-dashed ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Experience</h3>
                    <div className="space-y-4">
                      <input type="text" placeholder="Role (e.g., Software Developer Intern)" value={newExperience.role} onChange={(e) => setNewExperience({...newExperience, role: e.target.value})} className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                      <input type="text" placeholder="Company" value={newExperience.company} onChange={(e) => setNewExperience({...newExperience, company: e.target.value})} className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                      <input type="text" placeholder="Duration (e.g., May 2025 – June 2025)" value={newExperience.duration} onChange={(e) => setNewExperience({...newExperience, duration: e.target.value})} className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description Points</label>
                        {newExperience.description.map((desc, index) => (
                          <input key={index} type="text" placeholder={`Point ${index + 1}`} value={desc} onChange={(e) => handleExperienceDescriptionChange(index, e.target.value)} className={`w-full px-4 py-2 mb-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                        ))}
                        <button onClick={addExperienceDescriptionLine} className="text-sm text-indigo-500 hover:underline">+ Add another point</button>
                      </div>
                    </div>
                    <motion.button onClick={handleAddExperience} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"><Plus size={16} /> Add Experience</motion.button>
                  </div>
                  <div className="space-y-4">
                    {data.experiences?.map((exp) => (
                      <div key={exp.id} className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{exp.role}</h4>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{exp.company} | {exp.duration}</p>
                          </div>
                          <motion.button onClick={() => handleDeleteExperience(exp.id)} whileHover={{ scale: 1.1, color: '#ef4444' }} whileTap={{ scale: 0.9 }} className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}><Trash2 size={16} /></motion.button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- NEW EDUCATION MANAGEMENT TAB UI --- */}
              {activeTab === 'education' && (
                <div className="space-y-6">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Education Management</h2>
                  <div className={`p-4 rounded-lg border-2 border-dashed ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Education</h3>
                    <div className="space-y-4">
                      <input type="text" placeholder="Institution Name" value={newEducation.institution} onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})} className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                      <input type="text" placeholder="Degree (e.g., B.Tech in AI & ML)" value={newEducation.degree} onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})} className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                      <input type="text" placeholder="Duration or Grade (e.g., 2021-2025 or CGPA: 8.85)" value={newEducation.duration} onChange={(e) => setNewEducation({...newEducation, duration: e.target.value})} className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                    </div>
                    <motion.button onClick={handleAddEducation} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"><Plus size={16} /> Add Education</motion.button>
                  </div>
                  <div className="space-y-4">
                    {data.education?.map((edu) => (
                      <div key={edu.id} className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{edu.institution}</h4>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{edu.degree} | {edu.duration}</p>
                          </div>
                          <motion.button onClick={() => handleDeleteEducation(edu.id)} whileHover={{ scale: 1.1, color: '#ef4444' }} whileTap={{ scale: 0.9 }} className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}><Trash2 size={16} /></motion.button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings and Preview Tabs (Your Original Code) */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h2>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Resume Download Link</label>
                    <input type="url" value={data.personalInfo.resumeLink} onChange={(e) => handlePersonalInfoUpdate('resumeLink', e.target.value)} className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                  </div>
                </div>
              )}
               {activeTab === 'preview' && (
                              <div className="space-y-6">
                                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Live Preview</h2>
                                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Open the main site in a new tab to see your changes live.</p>
                                <motion.button onClick={() => window.open('/', '_blank')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
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