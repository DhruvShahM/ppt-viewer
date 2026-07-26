import React from "react";
import { motion } from "framer-motion";
import { Brain, LineChart, TreeDeciduous, Network } from "lucide-react";

const Slide6_Algorithms = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center text-white overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-green-400/20"
            initial={{
              x: Math.random() * 1920 - 960,
              y: Math.random() * 1080 - 540,
              opacity: 0,
            }}
            animate={{
              x: [
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
              ],
              y: [
                Math.random() * 300 - 150,
                Math.random() * 300 - 150,
                Math.random() * 300 - 150,
              ],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl px-12">
        <motion.h2
          className="text-5xl font-bold text-green-400 mb-12"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Common Algorithms
        </motion.h2>

        <div className="grid grid-cols-2 gap-6">
          <motion.div
            className="p-6 rounded-xl border border-blue-400/30 bg-blue-500/10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-blue-500/30 border border-blue-400">
                <LineChart className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-2xl font-semibold text-blue-400">Linear Regression</h3>
            </div>
            <p className="text-white/70 mb-2">Predicts continuous values using a linear relationship</p>
            <p className="text-white/50 text-sm">Best for: Simple regression tasks</p>
          </motion.div>

          <motion.div
            className="p-6 rounded-xl border border-purple-400/30 bg-purple-500/10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-purple-500/30 border border-purple-400">
                <TreeDeciduous className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-2xl font-semibold text-purple-400">Decision Trees</h3>
            </div>
            <p className="text-white/70 mb-2">Makes decisions by splitting data based on features</p>
            <p className="text-white/50 text-sm">Best for: Classification and regression</p>
          </motion.div>

          <motion.div
            className="p-6 rounded-xl border border-green-400/30 bg-green-500/10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-green-500/30 border border-green-400">
                <Network className="w-6 h-6 text-green-300" />
              </div>
              <h3 className="text-2xl font-semibold text-green-400">Neural Networks</h3>
            </div>
            <p className="text-white/70 mb-2">Complex models inspired by human brain structure</p>
            <p className="text-white/50 text-sm">Best for: Complex patterns and large datasets</p>
          </motion.div>

          <motion.div
            className="p-6 rounded-xl border border-red-400/30 bg-red-500/10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-red-500/30 border border-red-400">
                <Brain className="w-6 h-6 text-red-300" />
              </div>
              <h3 className="text-2xl font-semibold text-red-400">Support Vector Machines</h3>
            </div>
            <p className="text-white/70 mb-2">Finds optimal hyperplane to separate classes</p>
            <p className="text-white/50 text-sm">Best for: Classification tasks</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide6_Algorithms;
