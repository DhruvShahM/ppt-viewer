import React from "react";
import { motion } from "framer-motion";
import { Database, TrendingUp, GitBranch } from "lucide-react";

const Slide3_WhatIsML = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center text-white overflow-hidden relative bg-gradient-to-br from-purple-900/20 to-pink-900/20">
      <div className="relative z-10 max-w-6xl px-12 flex flex-col gap-8">
        <motion.div
          className="inline-flex items-center gap-4"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="p-3 rounded-full border-2 border-purple-400 bg-purple-500/30">
            <Database className="w-6 h-6 text-purple-300" />
          </div>
          <span className="text-4xl font-semibold text-purple-400">Machine Learning</span>
          <span className="text-white/50 text-lg ml-2">(Subset of AI)</span>
        </motion.div>

        <motion.div
          className="mt-4 p-8 rounded-2xl border border-purple-400/30 bg-purple-500/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Definition</h3>
          <p className="text-lg text-white/80 leading-relaxed">
            AI systems that learn from data without being explicitly programmed for every rule
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-6 mt-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        >
          <div className="p-6 rounded-xl border border-purple-400/20 bg-purple-500/5">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <h4 className="text-lg font-semibold text-purple-300">Key Characteristic</h4>
            </div>
            <p className="text-white/70">
              Uses statistical algorithms to find patterns and improve with experience
            </p>
          </div>

          <div className="p-6 rounded-xl border border-purple-400/20 bg-purple-500/5">
            <div className="flex items-center gap-3 mb-3">
              <GitBranch className="w-5 h-5 text-purple-400" />
              <h4 className="text-lg font-semibold text-purple-300">Approach</h4>
            </div>
            <p className="text-white/70">
              Supervised, Unsupervised, and Reinforcement Learning
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
            <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm">Email spam filters</span>
            <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm">Recommendation systems</span>
            <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm">Fraud detection</span>
            <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm">Price prediction</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide3_WhatIsML;
