import React from "react";
import { motion } from "framer-motion";
import { SunMedium, Sparkles } from "lucide-react";

const Slide1_Title = () => {
  return (
    <div className="w-full h-screen bg-slate-900 text-white flex items-center justify-center overflow-hidden">
      {/* animated gradient background (particle-ish) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-sky-700/10 via-purple-800/10 to-rose-700/5 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* central card */}
      <motion.div
        className="relative z-10 max-w-3xl w-[90%] p-10 rounded-2xl bg-gradient-to-br from-slate-800/70 to-slate-900/60 backdrop-blur-sm shadow-2xl border border-white/5"
        initial={{ y: 30, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            className="p-3 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500"
          >
            <SunMedium className="w-9 h-9 text-white" />
          </motion.div>

          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Types of Design Patterns in System Design
            </h1>
            <p className="mt-2 text-slate-300">
              Visual, animated explainer — Rate Limiting · CAP · OAuth2 · Microservices · Resilience
            </p>
          </div>
        </div>

        {/* animated packet stream */}
        <div className="mt-8 h-44 relative overflow-hidden">
          <motion.div
            className="absolute left-0 top-8 flex gap-3"
            initial={{ x: -400 }}
            animate={{ x: 1200 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-6 h-3 rounded-full bg-white/90 shadow"
                initial={{ scale: [0.6, 1, 0.8] }}
                animate={{ y: [0, -8, 0] }}
                transition={{ delay: i * 0.08, duration: 1.2, repeat: Infinity }}
              />
            ))}
          </motion.div>

          <motion.div
            className="absolute right-4 bottom-4 px-3 py-1 rounded-full bg-white/5 border border-white/6 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Sparkles className="w-4 h-4 text-white/80" />
            <span className="text-sm text-slate-300">Animated overview</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Slide1_Title;