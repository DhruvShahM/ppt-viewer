import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const Slide6_KeyDifferences = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center text-white overflow-hidden relative bg-gradient-to-br from-slate-900/30 to-purple-900/30">
      <div className="relative z-10 max-w-7xl px-12 flex flex-col gap-6">
        <motion.h2
          className="text-4xl font-semibold text-white/90 text-center"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Key Differences At A Glance
        </motion.h2>

        <motion.div
          className="mt-6 overflow-x-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left border-b-2 border-white/20 text-white/90">Aspect</th>
                <th className="p-4 text-left border-b-2 border-blue-400 text-blue-300">AI</th>
                <th className="p-4 text-left border-b-2 border-purple-400 text-purple-300">ML</th>
                <th className="p-4 text-left border-b-2 border-cyan-400 text-cyan-300">DL</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="p-4 font-semibold text-white/80">Scope</td>
                <td className="p-4 text-white/70">Broadest - any intelligent system</td>
                <td className="p-4 text-white/70">Subset - learns from data</td>
                <td className="p-4 text-white/70">Subset - neural networks</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-semibold text-white/80">Data Need</td>
                <td className="p-4 text-white/70">Can work without data (rule-based)</td>
                <td className="p-4 text-white/70">Requires data for training</td>
                <td className="p-4 text-white/70">Needs massive amounts of data</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-semibold text-white/80">Human Intervention</td>
                <td className="p-4 text-white/70">High (explicit programming)</td>
                <td className="p-4 text-white/70">Medium (feature engineering)</td>
                <td className="p-4 text-white/70">Low (automatic feature extraction)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-semibold text-white/80">Best For</td>
                <td className="p-4 text-white/70">Simple, rule-based tasks</td>
                <td className="p-4 text-white/70">Structured data, predictions</td>
                <td className="p-4 text-white/70">Unstructured data, complex patterns</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white/80">Hardware</td>
                <td className="p-4 text-white/70">Standard CPU</td>
                <td className="p-4 text-white/70">CPU or GPU</td>
                <td className="p-4 text-white/70">GPU/TPU required</td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        <motion.div
          className="mt-6 flex justify-center gap-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-white/70 text-sm">Choose based on problem complexity and data availability</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide6_KeyDifferences;
