import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';
import { Internship } from '../types';

interface ExperienceProps {
  darkMode: boolean;
  internship: Internship;
}

const Experience: React.FC<ExperienceProps> = ({ darkMode, internship }) => {
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

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`rounded-2xl shadow-2xl overflow-hidden ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
              <div className="flex items-center text-white">
                <Briefcase className="w-8 h-8 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold">{internship.company}</h3>
                  <p className="text-indigo-100">{internship.role}</p>
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
                  {internship.duration}
                </span>
              </div>
              
              <div className="space-y-4">
                {internship.description.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
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
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-8 p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800"
              >
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <p className={`font-medium ${
                    darkMode ? 'text-green-400' : 'text-green-700'
                  }`}>
                    Completed early with excellent team feedback
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;