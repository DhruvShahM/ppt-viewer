import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Slide8Palindrome = () => {
  const testCases = ['racecar', 'hello', 'madam', 'world'];
  const [activeCase, setActiveCase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCase((a) => (a + 1) % testCases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentStr = testCases[activeCase];
  const isPalindrome = currentStr === [...currentStr].reverse().join('');

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white mb-12"
        >
          Use Case: Palindrome Check
        </motion.h2>

        {/* Current Test Case */}
        <motion.div
          key={activeCase}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-900 rounded-lg p-8 mb-12 border-2 border-blue-500"
        >
          <p className="text-gray-400 mb-4">String:</p>
          <motion.div className="flex gap-3 justify-center items-center mb-8">
            {currentStr.split('').map((char, i) => {
              const isPointer = i === 0 || i === currentStr.length - 1;
              return (
                <motion.div
                  key={i}
                  className="flex flex-col items-center"
                  animate={{ scale: isPointer ? 1.2 : 1 }}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg ${
                      isPointer ? 'bg-blue-500' : 'bg-gray-700'
                    }`}
                    animate={{
                      boxShadow: isPointer
                        ? '0 0 15px rgba(59, 130, 246, 0.8)'
                        : 'none',
                    }}
                  >
                    {char}
                  </motion.div>
                  {i === 0 && (
                    <span className="text-blue-400 text-xs mt-2 font-bold">
                      L
                    </span>
                  )}
                  {i === currentStr.length - 1 && (
                    <span className="text-blue-400 text-xs mt-2 font-bold">
                      R
                    </span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Result */}
          <motion.div
            className="text-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {isPalindrome ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-3"
              >
                <Check className="w-8 h-8 text-green-400" />
                <p className="text-3xl font-bold text-green-400">
                  IS PALINDROME!
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-3"
              >
                <X className="w-8 h-8 text-red-400" />
                <p className="text-3xl font-bold text-red-400">
                  NOT PALINDROME
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Algorithm Steps */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-4"
        >
          <h3 className="text-2xl text-gray-300 font-bold mb-6">Algorithm</h3>
          {[
            'Compare str[left] == str[right]',
            'If not equal → Not palindrome',
            'Move left++, right--',
            'Continue until left >= right',
          ].map((step, i) => (
            <motion.div
              key={i}
              className="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
            >
              <p className="text-gray-200 text-lg">
                <span className="text-blue-400 font-bold">{i + 1}. </span>
                {step}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Slide8Palindrome;