import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Slide10RemovedDuplicates = () => {
  const array = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [result, setResult] = useState([0]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => {
        const next = s + 1;
        if (next >= 6) return 0;

        const steps = [
          { l: 0, r: 0, res: [0] },
          { l: 1, r: 1, res: [0] },
          { l: 2, r: 2, res: [0, 1] },
          { l: 3, r: 3, res: [0, 1] },
          { l: 4, r: 4, res: [0, 1, 2] },
          { l: 5, r: 5, res: [0, 1, 2, 3] },
        ];

        setLeft(steps[next].l);
        setRight(steps[next].r);
        setResult(steps[next].res);
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <Trash2 className="w-10 h-10 text-orange-400" />
          <h2 className="text-5xl font-bold text-white">
            Remove Duplicates (In-place)
          </h2>
        </motion.div>

        {/* Problem */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-orange-900 bg-opacity-30 rounded-lg p-6 border border-orange-500 mb-12"
        >
          <p className="text-gray-200 text-lg">
            Modify array in-place to remove duplicates with O(1) space
          </p>
        </motion.div>

        {/* Input Array */}
        <div className="bg-gray-900 rounded-lg p-8 mb-8">
          <h3 className="text-gray-300 text-lg mb-6">Input Array (has duplicates)</h3>
          <motion.div className="flex gap-2 flex-wrap mb-8">
            {array.map((num, i) => {
              const isWrite = i === left;
              const isRead = i === right;

              return (
                <motion.div
                  key={i}
                  className="flex flex-col items-center"
                  animate={{ scale: isWrite || isRead ? 1.2 : 1 }}
                >
                  <motion.div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold ${
                      isWrite
                        ? 'bg-green-500'
                        : isRead
                          ? 'bg-blue-500'
                          : 'bg-gray-700'
                    }`}
                    animate={{
                      boxShadow:
                        isWrite || isRead
                          ? '0 0 15px rgba(59, 130, 246, 0.8)'
                          : 'none',
                    }}
                  >
                    {num}
                  </motion.div>
                  {isWrite && (
                    <span className="text-green-400 text-xs mt-2 font-bold">
                      WRITE
                    </span>
                  )}
                  {isRead && (
                    <span className="text-blue-400 text-xs mt-2 font-bold">
                      READ
                    </span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Result */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-green-900 bg-opacity-30 rounded-lg p-8 border border-green-500"
        >
          <h3 className="text-green-300 text-lg mb-6">Output (duplicates removed)</h3>
          <motion.div className="flex gap-2 flex-wrap">
            {result.map((num, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  className="w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold bg-green-500"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(34, 197, 94, 0)',
                      '0 0 20px rgba(34, 197, 94, 0.8)',
                      '0 0 0px rgba(34, 197, 94, 0)',
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {num}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-green-300 text-lg mt-6">
            ✓ Length: {result.length} | Space: O(1)
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide10RemovedDuplicates;