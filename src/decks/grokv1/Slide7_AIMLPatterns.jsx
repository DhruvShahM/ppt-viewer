import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Zap, Database } from 'lucide-react';

const mlFlow = [
  { icon: Database, label: 'Data Ingestion' },
  { icon: Zap, label: 'Model Training' },
  { icon: BrainCircuit, label: 'Inference' },
];

const Slide7_AIMLPatterns = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-8">
      <motion.h2
        className="text-4xl font-bold mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        AI/ML Design Patterns
      </motion.h2>
      <div className="flex space-x-12">
        {mlFlow.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center bg-gradient-to-b from-cyan-800 to-cyan-600 p-6 rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.5, duration: 0.8 }}
          >
            <motion.div
              animate={{ opacity: [1, 0.5, 1], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <step.icon size={64} className="text-cyan-300" />
            </motion.div>
            <p className="mt-4">{step.label}</p>
          </motion.div>
        ))}
      </div>
      <motion.p
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        Patterns like model serving, pipeline orchestration for scalable AI systems
      </motion.p>
    </div>
  );
};

export default Slide7_AIMLPatterns;