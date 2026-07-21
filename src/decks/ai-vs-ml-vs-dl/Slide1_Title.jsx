import React from "react";
import { motion } from "framer-motion";
import { Brain, Zap, Layers } from "lucide-react";

const Slide1_Title = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center text-white overflow-hidden relative">
      {/* Animated background with connecting nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-400/30"
            initial={{
              x: Math.random() * 1920 - 960,
              y: Math.random() * 1080 - 540,
              opacity: 0,
            }}
            animate={{
              x: [
                Math.random() * 800 - 400,
                Math.random() * 800 - 400,
                Math.random() * 800 - 400,
              ],
              y: [
                Math.random() * 400 - 200,
                Math.random() * 400 - 200,
                Math.random() * 400 - 200,
              ],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl px-12 flex flex-col gap-8">
        <motion.div
          className="inline-flex items-center gap-4"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="p-3 rounded-full border-2 border-blue-400 bg-blue-500/30">
            <Brain className="w-6 h-6 text-blue-300" />
          </div>
          <span className="text-4xl font-semibold text-blue-400">AI vs ML vs DL</span>
        </motion.div>

        <motion.p
          className="text-xl text-white/80 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
        >
          Clear distinctions between Artificial Intelligence, Machine Learning, and Deep Learning
        </motion.p>

        <motion.div
          className="flex items-center gap-8 mt-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        >
          <motion.div
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-blue-400/30 bg-blue-500/10"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Layers className="w-5 h-5 text-blue-400" />
            <span className="text-sm uppercase tracking-[0.18em] text-blue-300">
              Nested Concepts
            </span>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-purple-400/30 bg-purple-500/10"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-sm uppercase tracking-[0.18em] text-purple-300">
              Evolution of Intelligence
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide1_Title;
