import { motion } from 'framer-motion';
import { Zap, Turtle } from 'lucide-react';
import { useState, useEffect } from 'react';

const Slide7FastSlow = () => {
  const listLength = 8;
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 20);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const slowPos = (frame * 1) % listLength;
  const fastPos = (frame * 2) % listLength;

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white mb-4"
        >
          Fast & Slow Pointers
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl text-gray-300 mb-12"
        >
          Detect cycles in linked lists
        </motion.p>

        {/* Concept */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-purple-900 bg-opacity-30 rounded-lg p-6 border border-purple-500 mb-12"
        >
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Turtle className="w-6 h-6 text-yellow-400" />
                <h3 className="text-2xl font-bold text-yellow-300">Slow Pointer</h3>
              </div>
              <p className="text-gray-300">Moves 1 step at a time</p>
              <p className="text-gray-400 text-sm mt-2">Like the tortoise</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-red-400" />
                <h3 className="text-2xl font-bold text-red-300">Fast Pointer</h3>
              </div>
              <p className="text-gray-300">Moves 2 steps at a time</p>
              <p className="text-gray-400 text-sm mt-2">Like the hare</p>
            </div>
          </div>
        </motion.div>

        {/* Visualization */}
        <div className="bg-gray-900 rounded-lg p-12 mb-12">
          <h3 className="text-gray-300 text-lg mb-8">Linked List with Cycle</h3>

          <motion.div className="space-y-12">
            {/* Slow pointer track */}
            <div>
              <p className="text-yellow-400 font-bold mb-4">Slow (1x speed)</p>
              <motion.div className="flex gap-4 items-center relative">
                {[...Array(listLength)].map((_, i) => (
                  <motion.div
                    key={`slow-${i}`}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                      i < 5 ? 'bg-blue-600' : 'bg-purple-600'
                    }`}
                    animate={{
                      scale: i === slowPos ? [1, 1.3, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {i}
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                className="h-1 bg-yellow-400 mt-4 rounded"
                style={{
                  width: `${((slowPos + 1) / listLength) * 100}%`,
                }}
              />
            </div>

            {/* Fast pointer track */}
            <div>
              <p className="text-red-400 font-bold mb-4">Fast (2x speed)</p>
              <motion.div className="flex gap-4 items-center relative">
                {[...Array(listLength)].map((_, i) => (
                  <motion.div
                    key={`fast-${i}`}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                      i < 5 ? 'bg-blue-600' : 'bg-purple-600'
                    }`}
                    animate={{
                      scale: i === fastPos ? [1, 1.3, 1] : 1,
                    }}
                    transition={{ duration: 0.15 }}
                  >
                    {i}
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                className="h-1 bg-red-400 mt-4 rounded"
                style={{
                  width: `${((fastPos + 1) / listLength) * 100}%`,
                }}
              />
            </div>
          </motion.div>

          {/* Meeting point indicator */}
          {slowPos === fastPos && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 text-center"
            >
              <motion.p
                className="text-2xl font-bold text-green-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                ✓ CYCLE DETECTED!
              </motion.p>
            </motion.div>
          )}
        </div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 gap-6"
        >
          {[
            { title: 'Cycle Detection', icon: '🔄' },
            { title: 'Find Middle Node', icon: '⭐' },
            { title: 'Palindrome LL', icon: '🔁' },
            { title: 'Linked List Length', icon: '📏' },
          ].map((use, i) => (
            <motion.div
              key={i}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-2xl mb-2">{use.icon}</p>
              <p className="text-gray-300">{use.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Slide7FastSlow;