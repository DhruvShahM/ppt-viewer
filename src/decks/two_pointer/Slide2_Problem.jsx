import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const Slide2Problem = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const target = 11;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const elementVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <AlertCircle className="w-10 h-10 text-yellow-400" />
            <h2 className="text-5xl font-bold text-white">The Problem</h2>
          </div>
          <p className="text-2xl text-gray-300">
            Find two numbers in a sorted array that sum to a target
          </p>
        </motion.div>

        <div className="bg-gray-900 rounded-lg p-8 mb-12">
          <p className="text-xl text-gray-300 mb-4">Array: {JSON.stringify(array)}</p>
          <motion.p
            className="text-3xl font-bold text-blue-400"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Target Sum: {target}
          </motion.p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl text-gray-300 mb-6">Brute Force Approach (❌ O(n²))</h3>
          <motion.div
            className="flex gap-1 flex-wrap"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {array.map((num, i) => (
              <motion.div
                key={i}
                variants={elementVariants}
                className="flex flex-col items-center"
              >
                <motion.div
                  className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-2"
                  animate={{
                    boxShadow: ['0 0 0px rgba(239, 68, 68, 0)', '0 0 20px rgba(239, 68, 68, 0.8)', '0 0 0px rgba(239, 68, 68, 0)'],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {num}
                </motion.div>
                <span className="text-gray-400 text-sm">O(n) checks</span>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-gray-400 text-sm mt-4">Each element compared with all others</p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-xl text-yellow-300 font-semibold">
            Can we do better? ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide2Problem;