import React from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRightCircle } from 'lucide-react';

const flowSteps = [
  { icon: User, label: 'User Requests Access' },
  { icon: ArrowRightCircle, label: 'Redirect to Auth Server' },
  { icon: Lock, label: 'Grant Token' },
  { icon: ArrowRightCircle, label: 'Access Resource' },
];

const Slide5_OAuth = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-8">
      <motion.h2
        className="text-4xl font-bold mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        OAuth 2.0 Pattern
      </motion.h2>
      <div className="flex space-x-8">
        {flowSteps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.5, duration: 0.8 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.5 }}
            >
              <step.icon size={48} className="text-indigo-400 mb-4" />
            </motion.div>
            <p className="text-center">{step.label}</p>
          </motion.div>
        ))}
      </div>
      <motion.p
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        Secure authorization framework for delegated access
      </motion.p>
    </div>
  );
};

export default Slide5_OAuth;