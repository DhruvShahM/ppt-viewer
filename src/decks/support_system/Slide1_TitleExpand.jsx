import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Slide1_TitleExpand() {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerVariants = {
    initial: { scale: 0.3, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.8, type: 'spring', stiffness: 150 } }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.6 } }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0, transition: { delay: 0.6, duration: 0.7, type: 'spring' } }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-8">
      <motion.div
        layout
        layoutId="title-card"
        className="w-full max-w-2xl"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="rounded-3xl border border-white/20 p-16 text-center backdrop-blur-sm"
          style={{ background: 'rgba(255, 255, 255, 0.05)' }}
        >
          <motion.div variants={iconVariants} className="mb-8 flex justify-center">
            <Heart size={80} className="text-white stroke-1" />
          </motion.div>

          <motion.h1
            variants={textVariants}
            className="text-7xl font-bold text-white mb-6 leading-tight"
          >
            Do you feel you have a
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
              strong support system?
            </span>
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="text-xl text-white/70 max-w-xl mx-auto"
          >
            A journey into understanding the networks that sustain us.
          </motion.p>

          <motion.div
            className="mt-12 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-white/40"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}