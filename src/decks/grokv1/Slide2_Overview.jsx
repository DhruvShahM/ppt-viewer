import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Zap, Shield } from 'lucide-react';

const overviewItems = [
  { icon: BookOpen, text: 'Reusable solutions to common problems' },
  { icon: Zap, text: 'Enhance scalability and performance' },
  { icon: Shield, text: 'Improve reliability and security' },
];

const Slide2_Overview = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-8">
      <motion.h2
        className="text-4xl font-bold mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Overview of Design Patterns
      </motion.h2>
      <AnimatePresence>
        <div className="grid grid-cols-3 gap-8">
          {overviewItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.5, duration: 0.8 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <item.icon size={48} className="text-teal-400 mb-4" />
              </motion.div>
              <p className="text-center">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Slide2_Overview;