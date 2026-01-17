import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const Slide1_TitleCard = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden">
      {/* Background animated grid */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute inset-0"
          initial={{ backgroundPosition: '0% 0%' }}
          animate={{ backgroundPosition: '100% 100%' }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 text-center space-y-8">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{
              boxShadow: ['0 0 20px rgba(59,130,246,0.5)', '0 0 40px rgba(59,130,246,0.8)', '0 0 20px rgba(59,130,246,0.5)'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-6 rounded-full bg-blue-600/20 border border-blue-500/50"
          >
            <Zap size={64} className="text-blue-400" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold text-white">
            Buffered vs Unbuffered
          </h1>
          <h2 className="text-5xl font-bold text-blue-400 mt-4">
            Go Channels Explained
          </h2>
        </motion.div>

        {/* Subtitle with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl text-slate-300"
        >
          <p>Understanding synchronization and blocking behavior</p>
        </motion.div>

        {/* Animated dots */}
        <motion.div className="flex justify-center gap-2 pt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-400"
              animate={{ y: [0, -8, 0] }}
              transition={{ delay: i * 0.15, duration: 1.5, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Slide1_TitleCard;