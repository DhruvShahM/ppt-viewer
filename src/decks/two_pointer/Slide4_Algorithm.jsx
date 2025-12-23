import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

const Slide4Algorithm = () => {
  const steps = [
    'left = 0, right = n-1',
    'while left < right:',
    '  sum = arr[left] + arr[right]',
    '  if sum == target: return true',
    '  if sum < target: left++',
    '  if sum > target: right--',
    'return false',
  ];

  const highlightLine = (index) => {
    return [0, 2, 3, 4, 5].includes(index);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <Code2 className="w-10 h-10 text-purple-400" />
          <h2 className="text-5xl font-bold text-white">The Algorithm</h2>
        </motion.div>

        <div className="bg-gray-950 rounded-lg p-8 border border-purple-500 border-opacity-50 font-mono">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className={`text-lg py-2 ${
                highlightLine(i)
                  ? 'text-green-400 font-bold'
                  : 'text-gray-500'
              }`}
            >
              <motion.span
                className={`inline-block ${
                  highlightLine(i) ? 'bg-green-500 bg-opacity-20' : ''
                } px-2 rounded`}
                whileHover={{ scale: 1.05 }}
              >
                {step}
              </motion.span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 grid grid-cols-2 gap-6"
        >
          <div className="bg-blue-900 bg-opacity-30 rounded-lg p-6 border border-blue-500">
            <h4 className="text-lg text-blue-300 font-bold mb-3">✓ Conditions</h4>
            <ul className="text-gray-200 space-y-2">
              <li>• Array must be sorted</li>
              <li>• Works left-to-right</li>
              <li>• Single pass solution</li>
            </ul>
          </div>

          <div className="bg-green-900 bg-opacity-30 rounded-lg p-6 border border-green-500">
            <h4 className="text-lg text-green-300 font-bold mb-3">
              ✓ Why It Works
            </h4>
            <ul className="text-gray-200 space-y-2">
              <li>• Sorted array property</li>
              <li>• Sum guides pointer movement</li>
              <li>• Never miss a solution</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide4Algorithm;