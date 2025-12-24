import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

const Slide1_TitleCard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-y-auto relative">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 40, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Icon */}
        <motion.div
          className="mb-8 flex justify-center"
          variants={floatingVariants}
          animate="animate"
        >
          <Code2 className="w-24 h-24 text-cyan-400 drop-shadow-lg" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-7xl font-bold text-white mb-4 tracking-tight"
          variants={itemVariants}
        >
          Go में String Methods
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-3xl text-cyan-300 mb-8"
          variants={itemVariants}
        >
          स्ट्रिंग मैनिपुलेशन का संपूर्ण गाइड
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-xl text-slate-300 max-w-2xl mx-auto mb-12"
          variants={itemVariants}
        >
          Golang के सभी शक्तिशाली string methods को सीखें और उन्हें अपने कोड में इस्तेमाल करें
        </motion.p>

        {/* Animated underscore */}
        <motion.div
          className="h-1 w-40 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 mx-auto rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 text-cyan-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-sm mb-2">अगली स्लाइड पर जाएं</p>
      </motion.div>
    </div>
  );
};

export default Slide1_TitleCard;