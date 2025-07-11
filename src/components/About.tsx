import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Code, Lightbulb } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
  personalInfo: any;
}

const About: React.FC<AboutProps> = ({ darkMode, personalInfo }) => {
  const education = [
    {
      institution: "Nalla Narsimha Reddy Group of Institutions",
      degree: "B.Tech (AI & ML)",
      grade: "CGPA 8.85",
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      institution: "Vasundhara Jr. College",
      degree: "Intermediate",
      grade: "91.8%",
      icon: <Award className="w-6 h-6" />
    },
    {
      institution: "Modern High School",
      degree: "Secondary Education",
      grade: "10 CGPA",
      icon: <Award className="w-6 h-6" />
    }
  ];

  return (
    <section id="about" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
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
            About <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className={`p-8 rounded-2xl shadow-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex items-center mb-6">
                <Code className="w-8 h-8 text-indigo-500 mr-3" />
                <h3 className={`text-2xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  My Journey
                </h3>
              </div>
              <p className={`text-lg leading-relaxed mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {personalInfo.about.split('\n\n').map((paragraph: string, index: number) => (
                  <span key={index} className="block mb-4 last:mb-0">
                    {paragraph}
                  </span>
                ))}
              </p>
              
              {/* Currently Exploring */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
                  <h4 className={`text-xl font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Currently Exploring
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.currentlyExploring.map((item: string, index: number) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-md"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className={`text-2xl font-bold mb-8 text-center ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Education Timeline
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-800 hover:bg-gray-750' 
                      : 'bg-white hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className={`p-3 rounded-full ${
                        darkMode ? 'bg-indigo-900' : 'bg-indigo-100'
                      }`}>
                        <div className="text-indigo-500">
                          {edu.icon}
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className={`text-lg font-semibold mb-1 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {edu.institution}
                      </h4>
                      <p className={`text-sm mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {edu.degree}
                      </p>
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-400 to-blue-500 text-white">
                        {edu.grade}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;