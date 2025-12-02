import React from 'react';
import { motion } from 'framer-motion';

const Slide1_Title = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          demo
        </h1>
        <p className="text-2xl text-slate-400">Deep Dive</p>
      </motion.div>
    </div>
  );
};

export default Slide1_Title;
