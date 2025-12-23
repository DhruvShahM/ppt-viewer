import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Slide5LiveDemo = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const target = 11;
  const [step, setStep] = useState(0);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(array.length - 1);
  const [sum, setSum] = useState(array[0] + array[array.length - 1]);
  const [found, setFound] = useState(false);

  const stepsData = [
    { left: 0, right: 8, sum: 10, action: 'Initial: sum < target, move left →' },
    { left: 1, right: 8, sum: 11, action: '✓ Found! sum == target' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => {
        if (s < stepsData.length - 1) {
          const nextStep = s + 1;
          setLeft(stepsData[nextStep].left);
          setRight(stepsData[nextStep].right);
          setSum(stepsData[nextStep].sum);
          if (stepsData[nextStep].sum === target) {
            setFound(true);
          }
          return nextStep;
        }
        return s;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white mb-12"
        >
          Live Demo: Find Pair (Target = {target})
        </motion.h2>

        {/* Array Visualization */}
        <div className="bg-gray-900 rounded-lg p-8 mb-12">
          <motion.div className="flex gap-2 justify-center items-end mb-8">
            {array.map((num, i) => {
              const isLeft = i === left;
              const isRight = i === right;
              const isBetween = i > left && i < right;

              return (
                <motion.div
                  key={i}
                  className="flex flex-col items-center"
                  animate={{ scale: isLeft || isRight ? 1.2 : 1 }}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl ${
                      isLeft
                        ? 'bg-green-500'
                        : isRight
                          ? 'bg-red-500'
                          : isBetween
                            ? 'bg-blue-500'
                            : 'bg-gray-700'
                    }`}
                    animate={{
                      boxShadow: isLeft || isRight
                        ? ['0 0 0px rgba(0,0,0,0)', '0 0 20px rgba(59, 130, 246, 0.8)', '0 0 0px rgba(0,0,0,0)']
                        : 'none',
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {num}
                  </motion.div>
                  {isLeft && (
                    <motion.span
                      className="text-green-400 text-sm mt-2 font-bold"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      L
                    </motion.span>
                  )}
                  {isRight && (
                    <motion.span
                      className="text-red-400 text-sm mt-2 font-bold"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      R
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Status */}
          <div className="text-center space-y-4">
            <motion.div
              className="text-3xl font-bold"
              animate={{ scale: found ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-gray-300">Sum: </span>
              <span className={found ? 'text-green-400' : 'text-blue-400'}>
                {array[left]} + {array[right]} = {sum}
              </span>
            </motion.div>

            <AnimatePresence>
              {found && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-2xl text-green-400 font-bold"
                >
                  ✓ Solution found!
                </motion.div>
              )}
            </AnimatePresence>

            <motion.p
              className="text-xl text-gray-400 italic"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {stepsData[step]?.action}
            </motion.p>
          </div>
        </div>

        {/* Time Complexity */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-green-900 bg-opacity-30 rounded-lg p-6 border border-green-500 text-center"
        >
          <p className="text-lg text-green-300">
            ✓ Single pass - O(n) time complexity
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide5LiveDemo;