import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Code, Database } from 'lucide-react';

const Slide1_Title = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
      <motion.h1
        className="text-6xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Types of Design Patterns in System Design
      </motion.h1>
      <div className="flex space-x-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <Layout size={64} className="text-blue-400" />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        >
          <Code size={64} className="text-green-400" />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Database size={64} className="text-purple-400" />
        </motion.div>
      </div>
    </div>
  );
};

export default Slide1_Title;