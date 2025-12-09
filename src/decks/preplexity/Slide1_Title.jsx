import React from 'react';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';

const Slide1_Title = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const floatingDatabases = [
    { delay: 0, x: -150, y: -100 },
    { delay: 0.3, x: 150, y: -80 },
    { delay: 0.6, x: -100, y: 100 },
    { delay: 0.9, x: 120, y: 120 }
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-slate-900 to-purple-900/20"
        animate={{
          background: [
            'linear-gradient(to bottom right, rgb(37, 99, 235, 0.2), rgb(15, 23, 42), rgb(88, 28, 135, 0.2))',
            'linear-gradient(to bottom right, rgb(88, 28, 135, 0.2), rgb(15, 23, 42), rgb(37, 99, 235, 0.2))'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating database icons */}
      {floatingDatabases.map((db, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          initial={{ opacity: 0, x: db.x, y: db.y }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            y: [db.y, db.y - 30, db.y]
          }}
          transition={{
            duration: 6,
            delay: db.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Database className="w-24 h-24 text-blue-400 blur-sm" />
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <motion.div
            className="mb-6 flex justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Database className="w-32 h-32 text-blue-400" />
          </motion.div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent"
        >
          How Many Databases
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Exist in the System?
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-xl text-slate-300 max-w-2xl"
        >
          A deep dive into database architectures, discovery patterns, and system complexity
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex justify-center gap-4"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-blue-400"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ delay: i * 0.3, duration: 2, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide1_Title;