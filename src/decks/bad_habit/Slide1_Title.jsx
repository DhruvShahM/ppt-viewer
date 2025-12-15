import React from 'react';
import { Smartphone, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const Slide1_Title = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-6 mb-12"
      >
        <Moon className="w-16 h-16 text-blue-400" />
        <div className="w-1 h-16 bg-gray-700"></div>
        <Smartphone className="w-16 h-16 text-amber-400" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-6xl font-bold text-white text-center mb-6 tracking-tight"
      >
        Do You Sleep with Your Phone Near Your Bed?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-2xl text-gray-300 text-center max-w-3xl mb-12"
      >
        Understanding the Science, Psychology, and Impact on Sleep Quality
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-lg text-gray-400"
      >
        A Technical Deep Dive into Digital Sleep Architecture
      </motion.div>
    </div>
  );
};

export default Slide1_Title;