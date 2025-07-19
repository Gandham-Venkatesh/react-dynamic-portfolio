import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';
import { ExperienceItem } from '../types';

interface ExperienceProps {
  darkMode: boolean;
  experiences: ExperienceItem[];
}

const Experience: React.FC<ExperienceProps> = ({ darkMode, experiences }) => {
  return (
    <section id="experience" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
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
            Industry <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Safety Check: We use '(experiences || [])' to prevent crashes if data is missing */}
          {(experiences || []).map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`rounded-2xl shadow-2xl overflow-hidden ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                <div className="flex items-center text-white">
                  <Briefcase className="w-8 h-8 mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold">{exp.company}</h3>
                    <p className="text-indigo-100">{exp.role}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <Calendar className={`w-5 h-5 mr-2 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`} />
                  <span className={`font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {exp.duration}
                  </span>
                </div>
                
                <div className="space-y-4">
                  {(exp.description || []).map((item, descIndex) => (
                    <motion.div
                      key={descIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: descIndex * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <p className={`${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
