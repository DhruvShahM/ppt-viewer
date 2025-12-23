import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';
import { useState, useEffect } from 'react';

const Slide6SlidingWindow = () => {
  const array = [2, 1, 1, 3, 2, 3];
  const target = 6;
  const [windowStart, setWindowStart] = useState(0);
  const [windowEnd, setWindowEnd] = useState(0);
  const [sum, setSum] = useState(2);
  const [step, setStep] = useState(0);

  const stepsData = [
    { start: 0, end: 0, sum: 2, desc: 'Start with window at index 0' },
    { start: 0, end: 1, sum: 3, desc: 'Expand: sum < target' },
    { start: 0, end: 2, sum: 4, desc: 'Expand: sum < target' },
    { start: 0, end: 3, sum: 7, desc: 'Expand: sum ≥ target, now shrink' },
    { start: 1, end: 3, sum: 5, desc: 'Shrink: found [1, 3] = 4' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => {
        if (s < stepsData.length - 1) {
          const next = s + 1;
          setWindowStart(stepsData[next].start);
          setWindowEnd(stepsData[next].end);
          setSum(stepsData[next].sum);
          return next;
        }
        return s;
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
          <Wind className="w-10 h-10 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">Sliding Window Variant</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-cyan-900 bg-opacity-30 rounded-lg p-6 border border-cyan-500 mb-12"
        >
          <h3 className="text-2xl text-cyan-300 font-bold mb-3">
            Variant: Find Subarray with Sum ≥ K
          </h3>
          <p className="text-gray-200">
            Two pointers move in the same direction, creating a dynamic window
          </p>
        </motion.div>

        {/* Array with sliding window */}
        <div className="bg-gray-900 rounded-lg p-8 mb-12">
          <motion.div className="flex gap-2 justify-start mb-8">
            {array.map((num, i) => {
              const inWindow = i >= windowStart && i <= windowEnd;
              return (
                <motion.div
                  key={i}
                  className="flex flex-col items-center"
                  animate={{
                    scale: inWindow ? 1.15 : 1,
                  }}
                >
                  <motion.div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold ${
                      inWindow ? 'bg-cyan-500' : 'bg-gray-700'
                    }`}
                    animate={{
                      boxShadow: inWindow
                        ? '0 0 20px rgba(34, 211, 238, 0.8)'
                        : 'none',
                    }}
                  >
                    {num}
                  </motion.div>
                  <span className="text-gray-400 text-xs mt-2">{i}</span>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.p
            className="text-center text-2xl font-bold text-cyan-400 mb-6"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Window Sum: {sum} | Target: ≥{target}
          </motion.p>

          <motion.p
            className="text-center text-lg text-gray-300"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {stepsData[step]?.desc}
          </motion.p>
        </div>

        {/* Key Applications */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 gap-6"
        >
          {[
            'Longest substring without repeating',
            'Minimum window substring',
            'Max consecutive ones',
            'Product of subarray',
          ].map((app, i) => (
            <motion.div
              key={i}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-gray-300">{app}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Slide6SlidingWindow;