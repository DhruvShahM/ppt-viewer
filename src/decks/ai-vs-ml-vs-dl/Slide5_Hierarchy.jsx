import React from "react";
import { motion } from "framer-motion";
import { Circle, ArrowRight } from "lucide-react";

const Slide5_Hierarchy = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center text-white overflow-hidden relative bg-gradient-to-br from-slate-900/30 to-blue-900/30">
      <div className="relative z-10 max-w-6xl px-12 flex flex-col gap-8">
        <motion.h2
          className="text-4xl font-semibold text-white/90 text-center"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          The Hierarchy Relationship
        </motion.h2>

        <motion.div
          className="flex items-center justify-center gap-8 mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* AI Circle - Largest */}
          <motion.div
            className="relative w-[28rem] h-[28rem] rounded-full border-4 border-blue-400 bg-blue-500/20"
            animate={{
              boxShadow: [
                "0 0 0px rgba(59,130,246,0.3)",
                "0 0 60px rgba(59,130,246,0.5)",
                "0 0 0px rgba(59,130,246,0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center z-10">
              <span className="text-3xl font-bold text-blue-300">AI</span>
            </div>

            {/* ML Circle - Nested inside AI */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] rounded-full border-4 border-purple-400 bg-purple-500/40"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(168,85,247,0.3)",
                  "0 0 50px rgba(168,85,247,0.5)",
                  "0 0 0px rgba(168,85,247,0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center z-10">
                <span className="text-2xl font-bold text-purple-300">ML</span>
              </div>

              {/* DL Circle - Nested inside ML */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12rem] h-[12rem] rounded-full border-4 border-cyan-400 bg-cyan-500/60 flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(34,211,238,0.3)",
                    "0 0 40px rgba(34,211,238,0.6)",
                    "0 0 0px rgba(34,211,238,0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-xl font-bold text-cyan-300">DL</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Legend for circle labels */}
          <motion.div
            className="flex flex-col gap-3 ml-12"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-blue-400"></div>
              <span className="text-blue-300 font-semibold">AI</span>
              <span className="text-white/60 text-sm">- Broadest Concept</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-purple-400"></div>
              <span className="text-purple-300 font-semibold">ML</span>
              <span className="text-white/60 text-sm">- Subset of AI</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-cyan-400"></div>
              <span className="text-cyan-300 font-semibold">DL</span>
              <span className="text-white/60 text-sm">- Subset of ML</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 grid grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
        >
          <div className="p-4 rounded-xl border border-blue-400/30 bg-blue-500/10 text-center">
            <p className="text-blue-300 font-semibold">AI</p>
            <p className="text-white/60 text-sm mt-1">All DL is ML</p>
            <p className="text-white/60 text-sm">All ML is AI</p>
          </div>
          <div className="p-4 rounded-xl border border-purple-400/30 bg-purple-500/10 text-center">
            <p className="text-purple-300 font-semibold">ML</p>
            <p className="text-white/60 text-sm mt-1">All DL is ML</p>
            <p className="text-white/60 text-sm">Not all ML is DL</p>
          </div>
          <div className="p-4 rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-center">
            <p className="text-cyan-300 font-semibold">DL</p>
            <p className="text-white/60 text-sm mt-1">Specialized ML</p>
            <p className="text-white/60 text-sm">Neural networks</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide5_Hierarchy;
