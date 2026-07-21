import React from "react";
import { motion } from "framer-motion";
import { Brain, Database, Network, ArrowRight } from "lucide-react";

const Slide7_Summary = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center text-white overflow-hidden relative bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20">
      <div className="relative z-10 max-w-6xl px-12 flex flex-col gap-8">
        <motion.h2
          className="text-4xl font-semibold text-white/90 text-center"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Summary: The Big Picture
        </motion.h2>

        <motion.div
          className="mt-8 space-y-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <div className="flex items-center gap-6 p-6 rounded-xl border border-blue-400/30 bg-blue-500/10">
            <div className="p-3 rounded-full bg-blue-500/30">
              <Brain className="w-8 h-8 text-blue-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-300">AI = The Umbrella</h3>
              <p className="text-white/70 mt-1">Any technique enabling machines to mimic human intelligence</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <ArrowRight className="w-8 h-8 text-white/40" />
          </div>

          <div className="flex items-center gap-6 p-6 rounded-xl border border-purple-400/30 bg-purple-500/10">
            <div className="p-3 rounded-full bg-purple-500/30">
              <Database className="w-8 h-8 text-purple-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-purple-300">ML = Learning from Data</h3>
              <p className="text-white/70 mt-1">AI that improves through experience without explicit programming</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <ArrowRight className="w-8 h-8 text-white/40" />
          </div>

          <div className="flex items-center gap-6 p-6 rounded-xl border border-cyan-400/30 bg-cyan-500/10">
            <div className="p-3 rounded-full bg-cyan-500/30">
              <Network className="w-8 h-8 text-cyan-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-cyan-300">DL = Neural Networks</h3>
              <p className="text-white/70 mt-1">ML using deep neural networks for complex pattern recognition</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 p-6 rounded-xl border border-white/20 bg-white/5 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        >
          <p className="text-xl font-semibold text-white/90">
            All Deep Learning is Machine Learning
          </p>
          <p className="text-xl font-semibold text-white/90 mt-2">
            All Machine Learning is AI
          </p>
          <p className="text-white/60 mt-4">
            But not all AI is Machine Learning, and not all ML is Deep Learning
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide7_Summary;
