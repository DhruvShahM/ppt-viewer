import React from 'react';
import { motion } from 'framer-motion';
import { Database, Network, Globe } from 'lucide-react';

const capElements = [
  { icon: Database, label: 'Consistency', color: 'blue' },
  { icon: Network, label: 'Availability', color: 'green' },
  { icon: Globe, label: 'Partition Tolerance', color: 'purple' },
];

const Slide4_CAPTheorem = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-8">
      <motion.h2
        className="text-4xl font-bold mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        CAP Theorem
      </motion.h2>
      <div className="relative flex justify-around w-full max-w-2xl">
        {capElements.map((el, index) => (
          <motion.div
            key={index}
            className={`flex flex-col items-center p-4 rounded-lg bg-gradient-to-b from-${el.color}-800 to-${el.color}-600`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.5, duration: 0.8 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            >
              <el.icon size={64} className={`text-${el.color}-300`} />
            </motion.div>
            <p className="mt-4 text-xl">{el.label}</p>
          </motion.div>
        ))}
        <motion.svg
          className="absolute top-1/2 left-0 right-0 mx-auto"
          width="600"
          height="200"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <path d="M100 100 L300 50 L500 100" fill="none" stroke="white" strokeWidth="2" />
        </motion.svg>
      </div>
      <motion.p
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        In distributed systems, you can only guarantee two out of three
      </motion.p>
    </div>
  );
};

export default Slide4_CAPTheorem;