import React from "react";
import { motion } from "framer-motion";
import { Divide, BarChart3, Hash } from "lucide-react";

const Slide3_Types = () => {
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
          Two Main Types
        </motion.h2>

        <div className="grid grid-cols-2 gap-8">
          <motion.div
            className="p-8 rounded-2xl border-2 border-blue-400/30 bg-blue-500/10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-blue-500/30 border border-blue-400">
                <Divide className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-3xl font-bold text-blue-400">Classification</h3>
            </div>
            <p className="text-lg text-white/80 mb-4">
              Predict discrete categories or classes
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Binary: Yes/No, Spam/Not Spam
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Multi-class: Cat/Dog/Bird
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Output: Class label
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="p-8 rounded-2xl border-2 border-purple-400/30 bg-purple-500/10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-purple-500/30 border border-purple-400">
                <BarChart3 className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="text-3xl font-bold text-purple-400">Regression</h3>
            </div>
            <p className="text-lg text-white/80 mb-4">
              Predict continuous numerical values
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                House prices
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                Temperature prediction
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                Output: Number
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 p-6 rounded-xl border border-green-400/30 bg-green-500/10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <Hash className="w-6 h-6 text-green-400" />
            <p className="text-lg text-white/80">
              <span className="font-semibold text-green-400">Key difference:</span> Classification predicts categories, Regression predicts numbers
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide3_Types;
