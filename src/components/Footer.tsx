import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`py-8 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Made with
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-5 h-5 text-red-500 fill-current" />
            </motion.div>
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              and
            </span>
            <Code className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              by Gandham Venkatesh
            </span>
          </div>
          
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;