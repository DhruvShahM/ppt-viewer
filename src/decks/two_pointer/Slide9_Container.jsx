import { motion } from 'framer-motion';
import { Droplet } from 'lucide-react';
import { useState, useEffect } from 'react';

const Slide9Container = () => {
  const heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
  const [highlightLeft, setHighlightLeft] = useState(0);
  const [highlightRight, setHighlightRight] = useState(heights.length - 1);
  const [water, setWater] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const steps = [
      { l: 0, r: 11, w: 0 },
      { l: 1, r: 11, w: 1 },
      { l: 2, r: 10, w: 3 },
      { l: 3, r: 9, w: 2 },
      { l: 4, r: 8, w: 3 },
    ];
    setHighlightLeft(steps[step].l);
    setHighlightRight(steps[step].r);
    setWater(steps[step].w);
  }, [step]);

  const maxHeight = Math.max(...heights);

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <Droplet className="w-10 h-10 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">
            Container With Most Water
          </h2>
        </motion.div>

        {/* Problem Description */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-cyan-900 bg-opacity-30 rounded-lg p-6 border border-cyan-500 mb-12"
        >
          <p className="text-gray-200 text-lg">
            Find two lines that form a container with the maximum area
          </p>
        </motion.div>

        {/* Visualization */}
        <div className="bg-gray-950 rounded-lg p-8 mb-12">
          <motion.div className="flex items-end justify-center gap-1 h-64 mb-8">
            {heights.map((h, i) => {
              const isPointer = i === highlightLeft || i === highlightRight;
              const waterLevel = Math.min(
                heights[highlightLeft],
                heights[highlightRight]
              );

              return (
                <motion.div
                  key={i}
                  className="flex-1 flex flex-col items-center justify-end relative"
                  animate={{ scale: isPointer ? 1.1 : 1 }}
                >
                  {/* Water fill */}
                  {i > highlightLeft &&
                    i < highlightRight &&
                    waterLevel > 0 && (
                      <motion.div
                        className="absolute bottom-0 w-full bg-cyan-500 bg-opacity-40 border-t border-cyan-400"
                        initial={{ height: 0 }}
                        animate={{ height: `${(waterLevel / maxHeight) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                  {/* Bar */}
                  <motion.div
                    className={`w-full rounded-t-md ${
                      isPointer ? 'bg-blue-400' : 'bg-gray-600'
                    }`}
                    style={{
                      height: `${(h / maxHeight) * 100}%`,
                      minHeight: h > 0 ? '20px' : '0px',
                    }}
                    animate={{
                      boxShadow: isPointer
                        ? '0 0 15px rgba(59, 130, 246, 0.8)'
                        : 'none',
                    }}
                  />

                  {isPointer && (
                    <motion.span
                      className="text-blue-400 text-xs mt-2 font-bold"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {i === highlightLeft ? 'L' : 'R'}
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Status */}
          <motion.div
            className="text-center space-y-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <p className="text-2xl font-bold text-cyan-400">
              Water Trapped: {water} units
            </p>
            <p className="text-gray-400">
              Area = min({heights[highlightLeft]}, {heights[highlightRight]}) ×
              width
            </p>
          </motion.div>
        </div>

        {/* Complexity */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 gap-6"
        >
          <div className="bg-red-900 bg-opacity-30 rounded-lg p-6 border border-red-500">
            <h4 className="text-lg text-red-300 font-bold mb-2">Brute Force</h4>
            <p className="text-2xl font-bold text-red-400">O(n²)</p>
          </div>
          <div className="bg-green-900 bg-opacity-30 rounded-lg p-6 border border-green-500">
            <h4 className="text-lg text-green-300 font-bold mb-2">
              Two Pointer
            </h4>
            <p className="text-2xl font-bold text-green-400">O(n)</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide9Container;