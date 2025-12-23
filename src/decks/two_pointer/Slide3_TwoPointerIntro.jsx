import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Slide3TwoPointerIntro = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white mb-12"
        >
          Two Pointer Solution (✓ O(n))
        </motion.h2>

        <div className="space-y-12">
          {/* Key Idea */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-blue-900 bg-opacity-30 rounded-lg p-6 border border-blue-500"
          >
            <div className="flex items-center gap-4 mb-4">
              <ArrowRight className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-bold text-blue-300">Core Idea</h3>
            </div>
            <p className="text-xl text-gray-200">
              Start from both ends and move pointers toward each other based on the sum
            </p>
          </motion.div>

          {/* Visualization */}
          <div>
            <h3 className="text-xl text-gray-300 mb-6">Initial Setup</h3>
            <motion.div className="flex gap-2 justify-start items-end">
              {array.map((num, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-lg ${
                      i === 0
                        ? 'bg-green-500'
                        : i === array.length - 1
                          ? 'bg-red-500'
                          : 'bg-gray-700'
                    }`}
                    animate={{
                      scale:
                        i === 0 || i === array.length - 1
                          ? [1, 1.15, 1]
                          : 1,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {num}
                  </motion.div>
                  {i === 0 && (
                    <motion.span
                      className="text-green-400 text-sm mt-2 font-bold"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      LEFT
                    </motion.span>
                  )}
                  {i === array.length - 1 && (
                    <motion.span
                      className="text-red-400 text-sm mt-2 font-bold"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      RIGHT
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Key Properties */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              { label: 'Requires', value: 'Sorted Array' },
              { label: 'Time', value: 'O(n)' },
              { label: 'Space', value: 'O(1)' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-gray-400 text-sm">{item.label}</p>
                <p className="text-white text-xl font-bold mt-2">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide3TwoPointerIntro;