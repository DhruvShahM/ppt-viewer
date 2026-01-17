import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Slide4_HierarchyBreakdown() {
  const [isExpanded, setIsExpanded] = useState(false);

  const pillars = [
    { title: 'Trust', icon: '🤝', color: 'from-red-500 to-pink-500' },
    { title: 'Communication', icon: '💬', color: 'from-blue-500 to-cyan-500' },
    { title: 'Consistency', icon: '⚙️', color: 'from-purple-500 to-indigo-500' },
    { title: 'Reciprocity', icon: '🔄', color: 'from-green-500 to-emerald-500' }
  ];

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-8">
      <motion.h2
        className="text-5xl font-bold text-white mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Pillars</span> of a Support System
      </motion.h2>

      <div className="w-full max-w-4xl">
        <AnimatePresence>
          {!isExpanded ? (
            <motion.div
              key="collapsed"
              layoutId="pillar-container"
              className="rounded-3xl border border-white/20 p-16 text-center cursor-pointer"
              style={{ background: 'rgba(255, 255, 255, 0.05)' }}
              onClick={() => setIsExpanded(true)}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                layoutId="pillar-title"
                className="text-4xl font-bold text-white mb-6"
              >
                The 4 Pillars
              </motion.div>

              <motion.p className="text-white/60 mb-8">
                Click to expand and explore each pillar
              </motion.p>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ChevronDown size={40} className="text-white/60 mx-auto" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              layoutId="pillar-container"
              className="grid grid-cols-2 gap-6"
              onClick={() => setIsExpanded(false)}
            >
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  layout
                  layoutId={`pillar-${idx}`}
                  className="rounded-2xl border border-white/20 p-8 cursor-pointer group"
                  style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    delay: idx * 0.1
                  }}
                  whileHover={{ scale: 1.08 }}
                >
                  <motion.div
                    className="text-5xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, delay: idx * 0.5 }}
                  >
                    {pillar.icon}
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white">
                    {pillar.title}
                  </h3>

                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-15 transition-opacity`}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="mt-12 text-center text-white/50 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {isExpanded ? '← Click to collapse' : 'Each pillar strengthens the others →'}
      </motion.div>
    </div>
  );
}