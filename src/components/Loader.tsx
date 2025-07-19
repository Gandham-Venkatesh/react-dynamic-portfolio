import React from 'react';
import { motion, Variants } from 'framer-motion'; // Import Variants type for safety
import { Code2 } from 'lucide-react';

const Loader: React.FC = () => {
  // --- CORRECTED VARIANTS STRUCTURE ---
  // We define the animation properties directly under a state name (e.g., "pulsing")
  // The transition is defined as a sibling to the animation properties.
  const loaderVariants: Variants = {
    pulsing: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <motion.div
        variants={loaderVariants}
        animate="pulsing" // We tell framer-motion to use the "pulsing" variant
      >
        <Code2 className="w-16 h-16 text-indigo-400" />
      </motion.div>
      <p className="mt-4 text-lg text-gray-400 font-semibold tracking-wider">
        Building Your Experience...
      </p>
    </div>
  );
};

export default Loader;
