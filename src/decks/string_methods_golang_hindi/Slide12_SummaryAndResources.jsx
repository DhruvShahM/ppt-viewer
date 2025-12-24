import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code2, Star, Github } from 'lucide-react';

const Slide12_SummaryAndResources = () => {
  const categories = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Transformation',
      methods: ['ToUpper', 'ToLower', 'Title'],
      color: 'cyan',
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Searching',
      methods: ['Contains', 'HasPrefix', 'Index'],
      color: 'blue',
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Splitting',
      methods: ['Split', 'Fields', 'SplitN'],
      color: 'purple',
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Joining',
      methods: ['Join', 'Repeat', 'Replace'],
      color: 'pink',
    },
  ];

  const keyTakeaways = [
    'Go strings UTF-8 encoded हैं',
    'StringBuilder बड़े strings के लिए बेहतर है',
    'सही method चुनने से performance में सुधार होता है',
    'strings.NewReplacer() batch replacements के लिए use करें',
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-y-auto p-12">
      {/* Animated background particles */}
      <motion.div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <motion.div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Star className="w-12 h-12 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">
            सारांश और संसाधन
          </h2>
        </motion.div>

        {/* Method categories */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-cyan-400/50 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`text-${cat.color}-400 mb-3`}>{cat.icon}</div>
              <h3 className={`text-xl font-bold text-${cat.color}-300 mb-3`}>
                {cat.title}
              </h3>
              <div className="space-y-2">
                {cat.methods.map((method, i) => (
                  <motion.p
                    key={i}
                    className="text-sm text-slate-300 flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 + i * 0.05 }}
                  >
                    <span className={`text-${cat.color}-400`}>•</span>
                    {method}()
                  </motion.p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key takeaways */}
        <motion.div
          className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-8 border border-cyan-400/30 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            मुख्य बातें याद रखें:
          </h3>

          <div className="space-y-3">
            {keyTakeaways.map((takeaway, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
              >
                <motion.span
                  className="text-cyan-400 text-xl flex-shrink-0"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.2,
                  }}
                >
                  ✓
                </motion.span>
                <p className="text-slate-300">{takeaway}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resources */}
        <motion.div
          className="grid grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.a
            href="https://pkg.go.dev/strings"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-400 transition-all group"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Github className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-cyan-300 font-bold">Official Docs</span>
            </div>
            <p className="text-sm text-slate-400">
              pkg.go.dev/strings पर जाएं
            </p>
          </motion.a>

          <motion.div
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-lg p-6"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Code2 className="w-6 h-6 text-purple-400" />
              <span className="text-purple-300 font-bold">Practice करें</span>
            </div>
            <p className="text-sm text-slate-400">
              LeetCode या HackerRank पर strings problems solve करें
            </p>
          </motion.div>
        </motion.div>

        {/* Thank you */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.h3
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            धन्यवाद! 🙏
          </motion.h3>
          <p className="text-slate-400">
            Go में String Methods को master करने के लिए सफर पूरा हुआ!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide12_SummaryAndResources;