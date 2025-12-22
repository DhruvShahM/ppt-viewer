import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Code } from 'lucide-react';

const Slide12_ResourcesAndLinks = () => {
  const resources = [
    { title: 'Go Concurrency Patterns', url: 'https://go.dev/blog/pipelines', icon: Code },
    { title: 'Effective Go - Channels', url: 'https://go.dev/doc/effective_go#channels', icon: BookOpen },
    { title: 'Rob Pike - Concurrency Talk', url: 'https://go.dev/blog/io2013-talk-concurrency', icon: ExternalLink },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-4xl w-full space-y-12">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white"
        >
          Learn More
        </motion.h1>

        {/* Resource cards */}
        <div className="space-y-4">
          {resources.map((resource, idx) => {
            const Icon = resource.icon;
            return (
              <motion.a
                key={idx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.15 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-center gap-4 p-6 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-all cursor-pointer group"
              >
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-3 rounded-lg bg-blue-600/20 group-hover:bg-blue-600/40"
                >
                  <Icon size={24} className="text-blue-400" />
                </motion.div>

                <div className="flex-1">
                  <p className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">
                    {resource.title}
                  </p>
                  <p className="text-slate-400 text-sm font-mono">{resource.url}</p>
                </div>

                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-slate-400 group-hover:text-blue-400"
                >
                  <ExternalLink size={20} />
                </motion.div>
              </motion.a>
            );
          })}
        </div>

        {/* Practice section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-8 rounded-lg border border-green-500/50 bg-green-600/10 space-y-4"
        >
          <h3 className="text-2xl font-bold text-green-400">Practice & Experiment</h3>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">→</span>
              <span>Try creating unbuffered and buffered channels in the Go Playground</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">→</span>
              <span>Build a simple producer-consumer with both types and see the difference</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">→</span>
              <span>Intentionally create deadlocks and learn how to fix them</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide12_ResourcesAndLinks;