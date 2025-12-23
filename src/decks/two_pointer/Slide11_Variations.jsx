import { motion } from 'framer-motion';
import { GitBranch } from 'lucide-react';

const Slide11Variations = () => {
  const variations = [
    {
      title: 'Opposite Direction',
      desc: 'Left and right moving toward each other',
      icon: '↔️',
      color: 'from-blue-500 to-purple-500',
      examples: ['Two Sum', 'Container Max Water', 'Palindrome'],
    },
    {
      title: 'Same Direction',
      desc: 'Both pointers moving right (sliding window)',
      icon: '→→',
      color: 'from-cyan-500 to-blue-500',
      examples: ['Longest Substring', 'Min Window', 'Consecutive Ones'],
    },
    {
      title: 'Fast & Slow',
      desc: 'Different speeds on linked lists',
      icon: '🐢⚡',
      color: 'from-yellow-500 to-red-500',
      examples: ['Cycle Detection', 'Find Middle', 'Palindrome LL'],
    },
    {
      title: 'Multiple Arrays',
      desc: 'Pointers on different sorted arrays',
      icon: '📚',
      color: 'from-green-500 to-emerald-500',
      examples: ['Merge Sorted', 'Intersection', 'Union'],
    },
  ];

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <GitBranch className="w-10 h-10 text-pink-400" />
          <h2 className="text-5xl font-bold text-white">Variations & Patterns</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {variations.map((variant, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`bg-gradient-to-br ${variant.color} bg-opacity-10 rounded-lg p-6 border border-opacity-30 border-white cursor-pointer group`}
            >
              {/* Icon */}
              <motion.p
                className="text-5xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {variant.icon}
              </motion.p>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {variant.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 mb-4 text-sm">{variant.desc}</p>

              {/* Examples */}
              <div className="space-y-2">
                {variant.examples.map((example, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12 + j * 0.05 }}
                    className="flex items-center gap-2 text-gray-200 text-sm group-hover:text-white transition"
                  >
                    <motion.span
                      className="w-2 h-2 rounded-full bg-white"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    {example}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Slide11Variations;