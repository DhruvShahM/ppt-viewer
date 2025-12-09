import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const keyPoints = [
  'Understand core patterns for robust systems',
  'Apply theorems like CAP for trade-offs',
  'Implement security with OAuth',
  'Scale with microservices and AI patterns',
];

const Slide8_Conclusion = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-8">
      <motion.h2
        className="text-4xl font-bold mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Conclusion
      </motion.h2>
      <AnimatePresence>
        <ul className="space-y-4">
          {keyPoints.map((point, index) => (
            <motion.li
              key={index}
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.5, duration: 0.8 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
              >
                <CheckCircle size={24} className="text-green-400" />
              </motion.div>
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>
    </div>
  );
};

export default Slide8_Conclusion;