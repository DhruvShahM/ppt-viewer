import React from "react";
import { motion } from "framer-motion";
import { Database, Cpu, CheckCircle, ArrowRight } from "lucide-react";

const Slide5_HowItWorks = () => {
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
          How It Works
        </motion.h2>

        <div className="flex items-center justify-between gap-4">
          <motion.div
            className="flex-1 p-6 rounded-xl border border-blue-400/30 bg-blue-500/10"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-blue-500/30 border border-blue-400 mb-4">
                <Database className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-blue-400 mb-2">1. Collect Data</h3>
              <p className="text-white/70 text-sm">
                Gather labeled examples with inputs and correct outputs
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          >
            <ArrowRight className="w-8 h-8 text-green-400" />
          </motion.div>

          <motion.div
            className="flex-1 p-6 rounded-xl border border-purple-400/30 bg-purple-500/10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-purple-500/30 border border-purple-400 mb-4">
                <Cpu className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="text-xl font-bold text-purple-400 mb-2">2. Train Model</h3>
              <p className="text-white/70 text-sm">
                Model learns patterns by minimizing prediction errors
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          >
            <ArrowRight className="w-8 h-8 text-green-400" />
          </motion.div>

          <motion.div
            className="flex-1 p-6 rounded-xl border border-green-400/30 bg-green-500/10"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-green-500/30 border border-green-400 mb-4">
                <CheckCircle className="w-8 h-8 text-green-300" />
              </div>
              <h3 className="text-xl font-bold text-green-400 mb-2">3. Make Predictions</h3>
              <p className="text-white/70 text-sm">
                Use trained model to predict outputs for new data
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 p-6 rounded-xl border border-yellow-400/30 bg-yellow-500/10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.8 }}
        >
          <p className="text-lg text-white/80 text-center">
            <span className="font-semibold text-yellow-400">Key insight:</span> The quality of labeled data directly impacts model performance
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide5_HowItWorks;
