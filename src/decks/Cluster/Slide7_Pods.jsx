import React from 'react';
import { motion } from 'framer-motion';
import { Container } from 'lucide-react';

const Slide7_Pods = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex flex-col items-center justify-center overflow-hidden p-20">
      <motion.h2
        className="text-5xl font-bold text-white mb-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Pods: The Smallest Unit
      </motion.h2>

      {/* Pod visualization */}
      <div className="relative w-full max-w-5xl mb-12">
        {/* Single Pod */}
        <motion.div
          className="mx-auto w-72 h-72 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-400 rounded-xl p-8 mb-12 flex flex-col items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-white font-bold text-2xl mb-8">Pod</h3>

          {/* Containers inside pod */}
          <div className="flex gap-4 w-full justify-center">
            {[0, 1].map((idx) => (
              <motion.div
                key={idx}
                className="w-20 h-20 bg-slate-700 border-2 border-green-400 rounded-lg flex flex-col items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.3,
                }}
              >
                <Container className="w-6 h-6 text-green-400 mb-1" />
                <span className="text-green-300 text-xs font-bold">Container</span>
              </motion.div>
            ))}
          </div>

          {/* Shared resources indicator */}
          <motion.div
            className="absolute bottom-6 left-6 right-6 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="absolute bottom-2 text-green-300 text-xs font-semibold">Shared Network & Storage</p>
        </motion.div>

        {/* Pod details */}
        <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
          {[
            { title: 'Network', desc: 'All containers share IP' },
            { title: 'Ephemeral', desc: 'Temporary, replaced often' },
            { title: 'Atomic', desc: 'Deployed as one unit' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.15 }}
              whileHover={{ scale: 1.05, borderColor: '#22d3ee' }}
            >
              <h4 className="text-cyan-400 font-bold mb-2">{item.title}</h4>
              <p className="text-slate-300 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key insight */}
      <motion.div
        className="mt-12 bg-slate-800/50 border-l-4 border-green-400 pl-8 py-6 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <p className="text-white text-lg">
          A <span className="text-green-400 font-bold">Pod</span> is the smallest deployable unit in Kubernetes. Usually one container per pod, but can contain multiple tightly-coupled containers.
        </p>
      </motion.div>
    </div>
  );
};

export default Slide7_Pods;