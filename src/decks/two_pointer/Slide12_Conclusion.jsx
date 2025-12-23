import { motion } from 'framer-motion';
import { Star, Award, Zap } from 'lucide-react';

const Slide12Conclusion = () => {
  const keyPoints = [
    'Sorted arrays enable efficient pointer movement',
    'Single-pass O(n) solution vs brute force O(n²)',
    'Applicable to many DSA problems',
    'Interview favorite pattern',
    'Versatile: arrays, linked lists, strings',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-gray-950 to-black">
      <div className="w-11/12 max-w-5xl">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold text-center text-white mb-4"
        >
          Master the Two Pointer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-2xl text-center text-gray-400 mb-16"
        >
          A timeless technique for efficient algorithms
        </motion.p>

        {/* Key Points */}
        <motion.div
          className="space-y-4 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {keyPoints.map((point, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-gray-800 rounded-lg p-5 border-l-4 border-blue-500 flex items-center gap-4 group hover:bg-gray-700 transition"
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              >
                <span className="text-white font-bold text-sm">{i + 1}</span>
              </motion.div>
              <p className="text-gray-200 text-lg group-hover:text-white transition">
                {point}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-3 gap-6 mb-16"
        >
          {[
            { icon: Award, value: '50+', label: 'LeetCode Problems' },
            { icon: Zap, value: 'O(n)', label: 'Time Complexity' },
            { icon: Star, value: '⭐⭐⭐', label: 'Interview Importance' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-6 text-center border border-blue-500 border-opacity-50"
                whileHover={{ scale: 1.1, y: -10 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <Icon className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                </motion.div>
                <p className="text-2xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0px rgba(59, 130, 246, 0)',
                '0 0 40px rgba(59, 130, 246, 0.8)',
                '0 0 0px rgba(59, 130, 246, 0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block bg-blue-600 hover:bg-blue-500 transition rounded-lg px-12 py-4 mb-8"
          >
            <p className="text-white text-2xl font-bold">
              Practice & Master Today
            </p>
          </motion.div>

          <p className="text-gray-400 text-xl">
            Thank you! 🚀
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide12Conclusion;