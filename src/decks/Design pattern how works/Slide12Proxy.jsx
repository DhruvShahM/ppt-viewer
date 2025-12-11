
import React from 'react';
import { motion } from 'framer-motion';

const Slide = () => (
  <div className="h-full w-full flex items-center justify-center bg-slate-950 text-white p-8">
    <div className="max-w-5xl text-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
      >
        Proxy Pattern
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl text-slate-300 space-y-4"
      >
        <p>Gateway • Cache • Security layer</p>
      </motion.div>
    </div>
  </div>
);

export default Slide;
