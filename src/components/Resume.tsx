import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Award, Target } from 'lucide-react';

interface ResumeProps {
  darkMode: boolean;
  personalInfo: any;
}

const Resume: React.FC<ResumeProps> = ({ darkMode, personalInfo }) => {
  return (
    <section id="resume" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
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
            My <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Resume</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Professional Summary */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className={`p-8 rounded-2xl shadow-xl ${
                darkMode ? 'bg-gray-900' : 'bg-gray-50'
              }`}>
                <div className="flex items-center mb-6">
                  <Target className="w-8 h-8 text-indigo-500 mr-3" />
                  <h3 className={`text-2xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Professional Summary
                  </h3>
                </div>
                <div className={`text-lg leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {(personalInfo.professionalSummary ?? '').split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Download Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className={`p-8 rounded-2xl shadow-xl ${
                  darkMode ? 'bg-gray-900' : 'bg-gray-50'
                }`}
              >
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6"
                >
                  <FileText className="w-12 h-12 text-white" />
                </motion.div>
                
                <h3 className={`text-2xl font-bold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Download My Resume
                </h3>
                
                <p className={`text-lg mb-8 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Get the complete overview of my skills, experience, and projects
                </p>

                <motion.a
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 0 30px rgba(99, 102, 241, 0.6)' 
                  }}
                  whileTap={{ scale: 0.95 }}
                  href={personalInfo.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Download size={24} />
                  Download Resume
                </motion.a>

                <div className="mt-6 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <Award className={`w-5 h-5 ${
                      darkMode ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <span className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Updated Recently
                    </span>
                  </div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    PDF Format
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;