import React from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Target } from "lucide-react";

const Slide2_WhatIsAI = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center text-white overflow-hidden relative bg-gradient-to-br from-blue-900/20 to-purple-900/20">
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
          <span className="text-4xl font-semibold text-blue-400">Artificial Intelligence</span>
        </motion.div>

        <motion.div
          className="mt-4 p-8 rounded-2xl border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Definition</h3>
          <p className="text-lg text-white/80 leading-relaxed">
            The broadest concept — any technique that enables computers to mimic human intelligence
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-6 mt-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        >
          <div className="p-6 rounded-xl border border-blue-400/20 bg-blue-500/5">
            <div className="flex items-center gap-3 mb-3">
              <Cpu className="w-5 h-5 text-blue-400" />
              <h4 className="text-lg font-semibold text-blue-300">Key Characteristic</h4>
            </div>
            <p className="text-white/70">
              Can be rule-based, symbolic, or learning-based systems
            </p>
          </div>

          <div className="p-6 rounded-xl border border-blue-400/20 bg-blue-500/5">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-5 h-5 text-blue-400" />
              <h4 className="text-lg font-semibold text-blue-300">Goal</h4>
            </div>
            <p className="text-white/70">
              Simulate human cognitive functions like reasoning, problem-solving, perception
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 p-6 rounded-xl border border-white/10 bg-white/5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
        >
          <h4 className="text-lg font-semibold text-white/90 mb-3">Examples</h4>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm">Chess-playing programs</span>
            <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm">Expert systems</span>
            <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm">Speech recognition</span>
            <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm">Robot navigation</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide2_WhatIsAI;
