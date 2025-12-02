import React from 'react';
import { motion } from 'framer-motion';

const Slide2_Summary = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-slate-900 text-white p-8">
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold mb-12 text-blue-400"
      >
        What We'll Cover
      </motion.h2>
      <div className="grid grid-cols-1 gap-6 max-w-4xl w-full">
        {['Overview', 'Core Concepts', 'Advanced Patterns', 'Best Practices'].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4 bg-slate-800 p-4 rounded-lg border border-slate-700"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <span className="text-xl">{item}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Slide2_Summary;
