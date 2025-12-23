import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const Slide1Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const floatingArrow = {
    animate: {
      x: [0, 10, 0],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="inline-block"
          >
            <Zap className="w-24 h-24 text-blue-400" />
          </motion.div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-7xl font-bold text-white mb-6"
        >
          Two Pointer
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-5xl text-blue-300 mb-8 font-light"
        >
          The Art of Convergence
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-2xl text-gray-300 mb-16"
        >
          Master the most elegant technique in DSA
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-blue-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        <motion.div
          variants={floatingArrow}
          className="mt-16 text-gray-400"
        >
          ↓
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide1Hero;