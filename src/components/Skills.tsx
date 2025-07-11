import React from 'react';
import { motion } from 'framer-motion';
import { SkillCategory } from '../types';

interface SkillsProps {
  darkMode: boolean;
  skills: SkillCategory[];
}

const Skills: React.FC<SkillsProps> = ({ darkMode, skills }) => {
  const getSkillColor = (level: number) => {
    if (level >= 90) return 'from-green-400 to-green-600';
    if (level >= 80) return 'from-blue-400 to-blue-600';
    if (level >= 70) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <section id="skills" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            My <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-2xl shadow-xl transition-all duration-300 ${
                darkMode ? 'bg-gray-900' : 'bg-white'
              }`}
            >
              <h3 className={`text-xl font-bold mb-6 text-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: skillIndex * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className={`font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {skill.name}
                      </span>
                      <span className={`text-sm font-bold ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className={`w-full h-2 rounded-full ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ delay: skillIndex * 0.1, duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className={`h-full rounded-full bg-gradient-to-r ${getSkillColor(skill.level)} shadow-sm`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;