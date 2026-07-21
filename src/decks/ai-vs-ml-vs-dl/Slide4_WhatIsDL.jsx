import React from "react";
import { motion } from "framer-motion";
import { Network, Layers, Zap } from "lucide-react";

const Slide4_WhatIsDL = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center text-white overflow-hidden relative bg-gradient-to-br from-cyan-900/20 to-blue-900/20">
      <div className="relative z-10 max-w-6xl px-12 flex flex-col gap-8">
        <motion.div
          className="inline-flex items-center gap-4"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="p-3 rounded-full border-2 border-cyan-400 bg-cyan-500/30">
            <Network className="w-6 h-6 text-cyan-300" />
          </div>
          <span className="text-4xl font-semibold text-cyan-400">Deep Learning</span>
          <span className="text-white/50 text-lg ml-2">(Subset of ML)</span>
        </motion.div>

        <motion.div
          className="mt-4 p-8 rounded-2xl border border-cyan-400/30 bg-cyan-500/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Definition</h3>
          <p className="text-lg text-white/80 leading-relaxed">
            ML using multi-layered neural networks to learn complex representations from data
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-6 mt-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        >
          <div className="p-6 rounded-xl border border-cyan-400/20 bg-cyan-500/5">
            <div className="flex items-center gap-3 mb-3">
              <Layers className="w-5 h-5 text-cyan-400" />
              <h4 className="text-lg font-semibold text-cyan-300">Key Characteristic</h4>
            </div>
            <p className="text-white/70">
              Neural networks with 3+ layers that automatically extract features
            </p>
          </div>

          <div className="p-6 rounded-xl border border-cyan-400/20 bg-cyan-500/5">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h4 className="text-lg font-semibold text-cyan-300">Power</h4>
            </div>
            <p className="text-white/70">
              Excels with unstructured data: images, audio, text, video
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
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">Image recognition</span>
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">Natural language processing</span>
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">Self-driving cars</span>
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">Voice assistants</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide4_WhatIsDL;
